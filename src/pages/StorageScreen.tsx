import { Trans } from 'react-i18next';

import { Alert, Skeleton, Stack, Typography, styled } from '@mui/material';

import { formatFileSize } from '@graasp/sdk';
import { FAILURE_MESSAGES } from '@graasp/translations';

import ScreenLayout from '@/components/layout/ScreenLayout';
import { ADMIN_CONTACT } from '@/config/constants';
import { useAccountTranslation, useMessagesTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import { STORAGE_PROGRESS_BAR_ID } from '@/config/selectors';

const BAR_WIDTH = window.innerWidth / 3;
const BAR_HEIGHT = 25;

const StorageBarIndicator = styled('progress')(({ theme }) => ({
  // reset appearance of the progress bar
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  appearance: 'none',
  /* Get rid of default border in Firefox. */
  border: 'none',

  // border radius are the same as the inside element but prevent the bar from bleeding out
  overflow: 'hidden',
  borderRadius: theme.spacing(1),

  // apply some height to it
  height: theme.spacing(4),

  '&::-webkit-progress-bar': {
    backgroundColor: '#eee',
    // this border radius is necessary to maintain the shadow around the corners
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25) inset',
  },
  '&::-webkit-progress-value': {
    backgroundColor: theme.palette.primary.main,
    // this border radius is not necessary if we keep the border radius and overflow hidden on the real progress element
    // borderRadius: theme.spacing(1, 0, 0, 1),
  },
  '&::-moz-progress-bar': {
    backgroundColor: theme.palette.primary.main,
    // do not use border radius on firebox, as we
    // can not modify the background to also use border radius
    // borderRadius: theme.spacing(1, 0, 0, 1),
  },
  flexGrow: 1,
}));

const StorageBar = () => {
  const { t: translateMessages } = useMessagesTranslation();
  const { data: storage, isLoading } = hooks.useMemberStorage();
  if (storage) {
    const { current, maximum } = storage;
    const storageUsed = (current / maximum) * 100;
    return (
      <Stack direction="row" alignItems="center" width="100%" spacing={1}>
        <StorageBarIndicator
          id={STORAGE_PROGRESS_BAR_ID}
          value={storageUsed}
          max={100}
        >
          {storageUsed}
        </StorageBarIndicator>
        <label htmlFor={STORAGE_PROGRESS_BAR_ID}>
          {formatFileSize(current)} / {formatFileSize(maximum)}
        </label>
      </Stack>
    );
  }

  if (isLoading) {
    return <Skeleton width={BAR_WIDTH} height={BAR_HEIGHT} />;
  }

  return (
    <Alert severity="error">
      {translateMessages(FAILURE_MESSAGES.UNEXPECTED_ERROR)}
    </Alert>
  );
};

const StorageScreen = (): JSX.Element => {
  const { t } = useAccountTranslation();

  return (
    <ScreenLayout title={t('STORAGE_TITLE')}>
      <Stack gap={2}>
        <Typography variant="body1">
          <Trans
            t={t}
            i18nKey="STORAGE_TEXT"
            values={{
              email: ADMIN_CONTACT,
            }}
            components={[<a href={`mailto:${ADMIN_CONTACT}`}>this email</a>]}
          />
        </Typography>
        <Alert severity="info">{t('STORAGE_INFO')}</Alert>
      </Stack>
      <StorageBar />
    </ScreenLayout>
  );
};

export default StorageScreen;
