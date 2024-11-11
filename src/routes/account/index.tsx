import { Stack } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { MemberCard } from '~account/home/MemberCard';
import { PlatformSelector } from '~account/home/PlatformSelector';
import { TipCard } from '~account/home/TipCard';

export const Route = createFileRoute('/account/')({
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <Stack gap={4} alignItems="center">
      <MemberCard />
      <TipCard />
      <PlatformSelector />
    </Stack>
  );
}
