import { Box, Divider, Typography } from '@mui/material';

import MemberPersonalInformation from '@/components/main/MemberPersonalInformation';
import MemberPublicProfile from '@/components/main/MemberPublicProfile';
import { useAccountTranslation } from '@/config/i18n';

const MemberProfileScreen = (): JSX.Element | null => {
  const { t } = useAccountTranslation();
  return (
    <Box p={3}>
      <Typography variant="h3">{t('PROFILE_TITLE')}</Typography>
      <Divider sx={{ my: 2 }} />
      <MemberPersonalInformation />
      <MemberPublicProfile />
    </Box>
  );
};

export default MemberProfileScreen;
