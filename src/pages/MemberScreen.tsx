import { Box, Divider, Typography } from '@mui/material';

import MemberPersonalInformation from '@/components/main/MemberPersonalInformation';
import MemberPublicProfile from '@/components/main/MemberPublicProfile';

const MemberProfileScreen = (): JSX.Element | null => (
  <Box p={3}>
    <Typography variant="h3" gutterBottom>
      My Profile
    </Typography>
    <Divider sx={{ my: 2 }} />
    <MemberPersonalInformation />
    <MemberPublicProfile />
  </Box>
);

export default MemberProfileScreen;
