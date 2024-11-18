import { createFileRoute } from '@tanstack/react-router';

import { WorkInProgress } from '@/components/WorkInProgress';

export const Route = createFileRoute('/_landing/about-us')({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkInProgress />;
}
