import { createFileRoute } from '@tanstack/react-router';

import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { useAccountTranslation } from '@/config/i18n';
import { SETTINGS_PAGE_CONTAINER_ID } from '@/config/selectors';
import { ACCOUNT } from '@/langs/account';

import DeleteMemberSection from '~account/settings/DeleteMemberSection';
import ExportData from '~account/settings/ExportData';
import { MemberPreferences } from '~account/settings/MemberPreferences';
import PersonalInformation from '~account/settings/PersonalInformation';
import DisplayPassword from '~account/settings/password/DisplayPassword';
import PublicProfile from '~account/settings/public/PublicProfile';

export const Route = createFileRoute('/account/settings')({
  component: SettingsRoute,
});

function SettingsRoute(): JSX.Element {
  const { t: translateAccount } = useAccountTranslation();

  return (
    <ScreenLayout
      id={SETTINGS_PAGE_CONTAINER_ID}
      title={translateAccount(ACCOUNT.MAIN_MENU_SETTINGS)}
    >
      <PersonalInformation />
      <DisplayPassword />
      <PublicProfile />
      <MemberPreferences />
      <ExportData />
      <DeleteMemberSection />
    </ScreenLayout>
  );
}
