import { Trans } from 'react-i18next';

import { Alert, Skeleton, Stack, Typography, styled } from '@mui/material';

import { FAILURE_MESSAGES } from '@graasp/translations';

import { ADMIN_CONTACT } from '@/config/constants';
import { useAccountTranslation, useMessagesTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import { STORAGE_PROGRESS_BAR_ID } from '@/config/selectors';
import { humanFileSize } from '@/utils/filesize';

const BAR_WIDTH = window.innerWidth / 3;
const BAR_HEIGHT = 25;

const StorageBarIndicator = styled('progress')(({ theme }) => ({
  // reset appearance of the progress bar
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  appearance: 'none',
  /* Get rid of default border in Firefox. */
  border: 'none',

  // apply some height to it
  height: theme.spacing(4),

  '&::-webkit-progress-bar': {
    backgroundColor: '#eee',
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.25) inset',
  },
  '&::-webkit-progress-value': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(1, 0, 0, 1),
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
          {humanFileSize(current)}/{humanFileSize(maximum)}
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
    <Stack spacing={2} maxWidth="700px">
      <Stack direction="column">
        <Stack>
          <Typography variant="h4" component="h1">
            {t('STORAGE_TITLE')}
          </Typography>
        </Stack>
        <Stack>
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

          <Alert severity="info" sx={{ mt: 2, mb: 1 }}>
            {t('STORAGE_INFO')}
          </Alert>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <StorageBar />
      </Stack>
    </Stack>
  );
};

export default StorageScreen;
