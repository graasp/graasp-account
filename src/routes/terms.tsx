import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
  component: RouteComponent,
})

function RouteComponent() {
  const { lang } = Route.useParams()

  return `Hello /${lang}/terms!`
}
