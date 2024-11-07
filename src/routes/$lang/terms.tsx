import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$lang/terms')({
  component: RouteComponent,
});

function RouteComponent() {
  const { lang } = Route.useParams();

  return `Hello /${lang}/terms!`;
}
