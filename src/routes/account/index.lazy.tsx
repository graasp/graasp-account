import { Stack } from '@mui/material'

import { createLazyFileRoute } from '@tanstack/react-router'

import GraaspIcons from '~account/home/GraaspIcons'
import MemberCard from '~account/home/MemberCard'
import PersonalizationNotificationCard from '~account/home/PersonalizationNotificationCard'

export const Route = createLazyFileRoute('/account/')({
  component: HomeRoute,
})

function HomeRoute() {
  return (
    <Stack gap={4} alignItems="center">
      <MemberCard />
      <PersonalizationNotificationCard />
      <GraaspIcons />
    </Stack>
  )
}
