import { createFileRoute } from '@tanstack/react-router';

import { WorkInProgress } from '@/components/WorkInProgress';

export const Route = createFileRoute('/support')({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkInProgress />;
}
