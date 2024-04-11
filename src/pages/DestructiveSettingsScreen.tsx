import { Box, Stack, Typography } from '@mui/material';

import DeleteMemberSection from '@/components/main/DeleteMemberSection';
import { useAccountTranslation } from '@/config/i18n';

const DestructiveSettingsScreen = (): JSX.Element => {
  const { t: translateAccount } = useAccountTranslation();

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" component="h1">
          {translateAccount('MAIN_MENU_DESTRUCTIVE_SETTINGS')}
        </Typography>
        <Typography variant="body1" maxWidth="80ch">
          {translateAccount('DESTRUCTIVE_SETTINGS_DETAILS')}
        </Typography>
      </Box>
      <DeleteMemberSection />
    </Stack>
  );
};

export default DestructiveSettingsScreen;
