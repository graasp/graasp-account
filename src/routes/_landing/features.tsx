import { createFileRoute } from '@tanstack/react-router'

import { WorkInProgress } from '@/components/WorkInProgress'

export const Route = createFileRoute('/_landing/features')({
  component: RouteComponent,
})

function RouteComponent() {
  return <WorkInProgress />
}
