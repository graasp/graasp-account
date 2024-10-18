import { Trans } from 'react-i18next'

import { Alert, Stack, Typography } from '@mui/material'

import { createFileRoute } from '@tanstack/react-router'

import { StorageFiles } from '@/components/StorageFiles'
import { StorageBar } from '@/components/account/StorageBar'
import ScreenLayout from '@/components/layout/ScreenLayout'
import { ADMIN_CONTACT } from '@/config/constants'
import { useAccountTranslation } from '@/config/i18n'

export const Route = createFileRoute('/account/storage')({
  component: StorageRoute,
})

function StorageRoute(): JSX.Element {
  const { t } = useAccountTranslation()

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
            components={[
              <a key="email" href={`mailto:${ADMIN_CONTACT}`}>
                this email
              </a>,
            ]}
          />
        </Typography>
        <Alert severity="info">{t('STORAGE_INFO')}</Alert>
      </Stack>
      <StorageBar />
      <StorageFiles />
    </ScreenLayout>
  )
}
