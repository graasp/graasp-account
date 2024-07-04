import { Container, Divider, Stack, Typography } from '@mui/material';

import MemberPassword from '@/components/main/MemberPassword';
import MemberPersonalInformation from '@/components/main/MemberPersonalInformation';
import MemberPublicProfile from '@/components/main/MemberPublicProfile';
import { useAccountTranslation } from '@/config/i18n';

const MemberProfileScreen = (): JSX.Element => {
  const { t } = useAccountTranslation();
  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Typography variant="h2" component="h1">
          {t('PROFILE_TITLE')}
        </Typography>
        <Divider />
        <MemberPersonalInformation />
        <MemberPassword />
        <MemberPublicProfile />
      </Stack>
    </Container>
  );
};

export default MemberProfileScreen;
