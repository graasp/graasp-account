import { Stack } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import GraaspIcons from '~account/home/GraaspIcons';
import MemberCard from '~account/home/MemberCard';
import PersonalizationNotificationCard from '~account/home/PersonalizationNotificationCard';

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
