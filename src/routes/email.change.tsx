import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/email/change')({
  component: () => <div>Hello /email/change!</div>,
})
