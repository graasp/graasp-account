import { Box, Container, Divider, Stack, Typography } from '@mui/material';

import DeleteMemberSection from '@/components/main/DeleteMemberSection';
import MemberPreferences from '@/components/main/MemberPreferences';
import { useAccountTranslation } from '@/config/i18n';

const SettingsScreen = (): JSX.Element => {
  const { t: translateAccount } = useAccountTranslation();

  return (
    <Container>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h4" component="h1">
            {translateAccount('MAIN_MENU_SETTINGS')}
          </Typography>
        </Box>
        <Divider />
        <MemberPreferences />
        <DeleteMemberSection />
      </Stack>
    </Container>
  );
};

export default SettingsScreen;
