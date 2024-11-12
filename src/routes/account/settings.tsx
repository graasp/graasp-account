import { createFileRoute } from '@tanstack/react-router';

import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { useAccountTranslation } from '@/config/i18n';
import { SETTINGS_PAGE_CONTAINER_ID } from '@/config/selectors';
import { ACCOUNT } from '@/langs/constants';

import { DeleteMemberSection } from '~account/settings/DeleteMemberSection';
import { ExportData } from '~account/settings/ExportData';
import { Password } from '~account/settings/password/Password';
import { Preferences } from '~account/settings/preferences/Preferences';
import { PersonalInformation } from '~account/settings/profile/PersonalInformation';
import { PublicProfile } from '~account/settings/publicProfile/PublicProfile';

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
      <Password />
      <PublicProfile />
      <Preferences />
      <ExportData />
      <DeleteMemberSection />
    </ScreenLayout>
  );
}
