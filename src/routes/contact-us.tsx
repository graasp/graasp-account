import { createFileRoute } from '@tanstack/react-router';

import { WorkInProgress } from '@/components/WorkInProgress';

export const Route = createFileRoute('/contact-us')({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkInProgress />;
}
