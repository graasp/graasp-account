import { Box, Stack, Typography } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';

import DeleteAccount from './DeleteMemberSection';
import Main from './Main';

const DestructiveSettingsScreen = (): JSX.Element => {
  const { t: translateAccount } = useAccountTranslation();

  return (
    <Main>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4">
            {translateAccount('MAIN_MENU_DESTRUCTIVE_SETTINGS')}
          </Typography>
          <Typography variant="body1" maxWidth="80ch">
            {translateAccount('DESTRUCTIVE_SETTINGS_DETAILS')}
          </Typography>
        </Box>
        <DeleteAccount />
      </Stack>
    </Main>
  );
};

export default DestructiveSettingsScreen;
