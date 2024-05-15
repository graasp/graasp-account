import { Container, Stack } from '@mui/material';

import GraaspIcons from '@/components/main/GraaspIcons';
import MemberCard from '@/components/main/MemberCard';
import NotifCard from '@/components/main/NotifCard';

const HomePage = (): JSX.Element => (
  <Container>
    <Stack spacing={8} marginTop={5}>
      <MemberCard />
      <NotifCard />
      <GraaspIcons />
    </Stack>
  </Container>
);

export default HomePage;
