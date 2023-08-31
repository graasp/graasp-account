import { Trans } from 'react-i18next';

import { Alert, Skeleton, Stack, Typography, useTheme } from '@mui/material';

import { FAILURE_MESSAGES } from '@graasp/translations';

import { ADMIN_CONTACT } from '../../config/constants';
import {
  useAccountTranslation,
  useMessagesTranslation,
} from '../../config/i18n';
import { hooks } from '../../config/queryClient';
import { humanFileSize } from '../../utils/filesize';
import Main from './Main';

const BAR_WIDTH = window.innerWidth / 3;
const BAR_HEIGHT = 25;

const StockageScreen = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useAccountTranslation();
  const { t: translateMessages } = useMessagesTranslation();

  const { data: stockage, isLoading } = hooks.useMemberStorage();

  const renderComponent = () => {
    if (stockage) {
      const { current, maximum } = stockage;

      return (
        <>
          <Stack direction="row" alignItems="center">
            <Stack>
              <div
                style={{
                  background: theme.palette.primary.main,
                  width: Math.min((current / maximum) * BAR_WIDTH, BAR_WIDTH),
                  height: BAR_HEIGHT,
                }}
              />
            </Stack>
            <Stack>
              <div
                style={{
                  background: 'lightgrey',
                  width: BAR_WIDTH - (current / maximum) * BAR_WIDTH,
                  height: BAR_HEIGHT,
                }}
              />
            </Stack>
          </Stack>
          <Stack>
            {humanFileSize(current)}/{humanFileSize(maximum)}
          </Stack>
        </>
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

  return (
    <Main>
      <Stack spacing={2}>
        <Stack direction="column">
          <Stack>
            <Typography variant="h5">{t('STORAGE_TITLE')}</Typography>
          </Stack>
          <Stack>
            <Typography variant="body1">
              {/* { */}
              <Trans
                t={t}
                i18nKey="STORAGE_INFO"
                values={{
                  email: ADMIN_CONTACT,
                }}
                components={[
                  <a href={`mailto:${ADMIN_CONTACT}`}>this email</a>,
                ]}
              />
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          {renderComponent()}
        </Stack>
      </Stack>
    </Main>
  );
};

export default StockageScreen;
