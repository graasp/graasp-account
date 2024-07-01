import { Container, Divider, Stack, Typography } from '@mui/material';

import MemberPersonalInformation from '@/components/main/MemberPersonalInformation';
import MemberPublicProfile from '@/components/main/MemberPublicProfile';
import { useAccountTranslation } from '@/config/i18n';

const MemberProfileScreen = (): JSX.Element => {
  const { t } = useAccountTranslation();
  return (
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Typography variant="h2" component="h1">
          {t('PROFILE_TITLE')}
        </Typography>
        <Divider />
        <MemberPersonalInformation />
        <MemberPublicProfile />
      </Stack>
    </Container>
  );
};

export default MemberProfileScreen;
