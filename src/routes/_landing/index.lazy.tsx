import { createLazyFileRoute } from '@tanstack/react-router'

import { OurMissionSection } from '~landing/home/OurMissionSection'
import { PuzzleSection } from '~landing/home/PuzzleSection'
import { TitleSection } from '~landing/home/TitleSection'
import { UserStorySection } from '~landing/home/UserStorySection'

export const Route = createLazyFileRoute('/_landing/')({
  component: Index,
})

function Index() {
  return (
    <>
      <TitleSection />
      <PuzzleSection />
      <UserStorySection />
      <OurMissionSection />
    </>
  )
}
