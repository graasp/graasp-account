import React from 'react';

import { Button, Stack, Typography } from '@mui/material';

import BorderedSection from '@/components/layout/BorderedSection';
import { useAccountTranslation } from '@/config/i18n';

const ExportData = (): JSX.Element => {
  const { t } = useAccountTranslation();
  return (
    <BorderedSection title={t('EXPORT_INFORMATIONS_TITLE')}>
      <Stack direction="column" spacing={2}>
        <Typography variant="body2">
          {t('EXPORT_INFORMATIONS_DESCRIPTION')}
        </Typography>
        <Button
          variant="contained"
          sx={{ textWrap: 'nowrap', maxWidth: 'min-content' }}
        >
          {t('EXPORT_INFORMATIONS_BUTTON_TEXT')}
        </Button>
      </Stack>
    </BorderedSection>
  );
};

export default ExportData;
