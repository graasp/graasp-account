import { Divider, Stack, Typography } from '@mui/material';

import MemberPersonalInformation from '@/components/main/MemberPersonalInformation';
import MemberPublicProfile from '@/components/main/MemberPublicProfile';
import { useAccountTranslation } from '@/config/i18n';

const MemberProfileScreen = (): JSX.Element | null => {
  const { t } = useAccountTranslation();
  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        {t('PROFILE_TITLE')}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <MemberPersonalInformation />
      <MemberPublicProfile />
    </Stack>
  );
};

export default MemberProfileScreen;
