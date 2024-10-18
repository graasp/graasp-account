import { createFileRoute } from '@tanstack/react-router'

import ScreenLayout from '@/components/layout/ScreenLayout'
import DeleteMemberSection from '@/components/main/DeleteMemberSection'
import { MemberPreferences } from '@/components/main/MemberPreferences'
import { useAccountTranslation } from '@/config/i18n'
import { SETTINGS_PAGE_CONTAINER_ID } from '@/config/selectors'
import PersonalInformation from '@/modules/profile/PersonalInformation'
import DisplayPassword from '@/modules/profile/password/DisplayPassword'
import PublicProfile from '@/modules/profile/public/PublicProfile'
import ExportData from '@/modules/settings/ExportData'

export const Route = createFileRoute('/account/settings')({
  component: SettingsRoute,
})

function SettingsRoute(): JSX.Element {
  const { t: translateAccount } = useAccountTranslation()

  return (
    <ScreenLayout
      id={SETTINGS_PAGE_CONTAINER_ID}
      title={translateAccount('MAIN_MENU_SETTINGS')}
    >
      <PersonalInformation />
      <DisplayPassword />
      <PublicProfile />
      <MemberPreferences />
      <ExportData />
      <DeleteMemberSection />
    </ScreenLayout>
  )
}
