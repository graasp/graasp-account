import { useTranslation } from 'react-i18next';

import { Stack, Typography } from '@mui/material';

import { NS } from '@/config/constants';

export function TitleSection() {
  const { t } = useTranslation(NS.Landing, { keyPrefix: 'SUPPORT' });

  return (
    <Stack
      mt={8}
      maxWidth={{ xs: '600px', md: 'lg' }}
      width="100%"
      alignItems={{ xs: 'center', md: 'flex-start' }}
      gap={4}
    >
      <Typography color="primary" variant="h1">
        {t('TITLE')}
      </Typography>
      <Typography>{t('DESCRIPTION')}</Typography>
    </Stack>
  );
}
