import { createFileRoute } from '@tanstack/react-router';

import { WorkInProgress } from '@/components/WorkInProgress';

export const Route = createFileRoute('/about-us')({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkInProgress />;
}
