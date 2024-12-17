import { Divider, Stack } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { MemberCard } from '~account/home/MemberCard';
import { TipCard } from '~account/home/TipCard';
import { RecentItems } from '~account/home/recentItems/RecentItems';

export const Route = createFileRoute('/account/')({
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <Stack gap={4} alignItems="center">
      <MemberCard />
      <TipCard />
      <Divider flexItem />
      <RecentItems />
    </Stack>
  );
}
