import { createFileRoute } from '@tanstack/react-router';

import { WorkInProgress } from '@/components/WorkInProgress';

export const Route = createFileRoute('/terms')({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkInProgress />;
}
