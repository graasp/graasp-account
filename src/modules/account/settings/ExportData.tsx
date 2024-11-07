import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Stack, Typography } from '@mui/material';

import { BorderedSection } from '@/components/layout/BorderedSection';
import { mutations } from '@/config/queryClient';
import { EXPORT_DATA_BUTTON_ID } from '@/config/selectors';
import { ACCOUNT } from '@/langs/account';

const ExportData = (): JSX.Element => {
  const { t } = useTranslation();
  const [isExported, setIsExported] = useState(false);
  const { mutate: exportData } = mutations.useExportMemberData();
  const onClick = () => {
    exportData();
    setIsExported(true);
  };
  return (
    <BorderedSection title={t(ACCOUNT.EXPORT_INFORMATIONS_TITLE)}>
      <Stack direction="column" spacing={2}>
        <Typography variant="body2">
          {t(ACCOUNT.EXPORT_INFORMATIONS_DESCRIPTION)}
        </Typography>
        <Button
          onClick={onClick}
          disabled={isExported}
          id={EXPORT_DATA_BUTTON_ID}
          variant="contained"
          sx={{ textWrap: 'nowrap', maxWidth: 'min-content' }}
        >
          {t(ACCOUNT.EXPORT_INFORMATIONS_BUTTON_TEXT)}
        </Button>
      </Stack>
    </BorderedSection>
  );
};

export default ExportData;
