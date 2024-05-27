import { Container, Stack } from '@mui/material';

import GraaspIcons from '@/components/main/GraaspIcons';
import MemberCard from '@/components/main/MemberCard';
import PersonalizationNotificationCard from '@/components/main/PersonalizationNotificationCard';

const HomePage = (): JSX.Element => (
  <Container>
    <Stack spacing={8} marginTop={5}>
      <MemberCard />
      <PersonalizationNotificationCard />
      <GraaspIcons />
    </Stack>
  </Container>
);

export default HomePage;
