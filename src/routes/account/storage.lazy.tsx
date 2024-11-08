import { Trans, useTranslation } from 'react-i18next';

import { Alert, Stack, Typography } from '@mui/material';

import { createLazyFileRoute } from '@tanstack/react-router';

import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { ADMIN_CONTACT, NS } from '@/config/constants';

import { StorageBar } from '~account/storage/StorageBar';
import { StorageFiles } from '~account/storage/StorageFiles';

export const Route = createLazyFileRoute('/account/storage')({
  component: StorageRoute,
});

function StorageRoute(): JSX.Element {
  const { t } = useTranslation(NS.Account);

  return (
    <ScreenLayout title={t('STORAGE_TITLE')}>
      <Stack gap={2}>
        <Typography variant="body1">
          <Trans
            t={t}
            i18nKey={'STORAGE_TEXT'}
            values={{
              email: ADMIN_CONTACT,
            }}
            components={
              // eslint-disable-next-line jsx-a11y/anchor-has-content
              [<a key="email" href={`mailto:${ADMIN_CONTACT}`} />]
            }
          />
        </Typography>
        <Alert severity="info">{t('STORAGE_INFO')}</Alert>
      </Stack>
      <StorageBar />
      <StorageFiles />
    </ScreenLayout>
  );
}
