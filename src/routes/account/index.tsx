import { Stack } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import GraaspIcons from '@/components/main/GraaspIcons';
import MemberCard from '@/components/main/MemberCard';
import PersonalizationNotificationCard from '@/components/main/PersonalizationNotificationCard';

export const Route = createFileRoute('/account/')({
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <Stack gap={4} alignItems="center">
      <MemberCard />
      <PersonalizationNotificationCard />
      <GraaspIcons />
    </Stack>
  );
}
