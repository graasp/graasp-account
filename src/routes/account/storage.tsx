import { Trans } from 'react-i18next';

import { Alert, Stack, Typography } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { StorageFiles } from '@/components/StorageFiles';
import { StorageBar } from '@/components/account/StorageBar';
import ScreenLayout from '@/components/layout/ScreenLayout';
import { ADMIN_CONTACT } from '@/config/constants';
import { useAccountTranslation } from '@/config/i18n';
import { ACCOUNT } from '@/langs/constants';

export const Route = createFileRoute('/account/storage')({
  component: StorageRoute,
});

function StorageRoute(): JSX.Element {
  const { t } = useAccountTranslation();

  return (
    <ScreenLayout title={t(ACCOUNT.STORAGE_TITLE)}>
      <Stack gap={2}>
        <Typography variant="body1">
          <Trans
            t={t}
            i18nKey={ACCOUNT.STORAGE_TEXT}
            values={{
              email: ADMIN_CONTACT,
            }}
            components={
              // eslint-disable-next-line jsx-a11y/anchor-has-content
              [<a key="email" href={`mailto:${ADMIN_CONTACT}`} />]
            }
          />
        </Typography>
        <Alert severity="info">{t(ACCOUNT.STORAGE_INFO)}</Alert>
      </Stack>
      <StorageBar />
      <StorageFiles />
    </ScreenLayout>
  );
}
