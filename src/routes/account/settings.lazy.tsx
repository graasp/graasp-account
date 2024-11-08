import { useTranslation } from 'react-i18next';

import { createLazyFileRoute } from '@tanstack/react-router';

import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { NS } from '@/config/constants';
import { SETTINGS_PAGE_CONTAINER_ID } from '@/config/selectors';

import DeleteMemberSection from '~account/settings/DeleteMemberSection';
import ExportData from '~account/settings/ExportData';
import { MemberPreferences } from '~account/settings/MemberPreferences';
import PersonalInformation from '~account/settings/PersonalInformation';
import DisplayPassword from '~account/settings/password/DisplayPassword';
import PublicProfile from '~account/settings/public/PublicProfile';

export const Route = createLazyFileRoute('/account/settings')({
  component: SettingsRoute,
});

function SettingsRoute(): JSX.Element {
  const { t } = useTranslation(NS.Account);

  return (
    <ScreenLayout
      id={SETTINGS_PAGE_CONTAINER_ID}
      title={t('MAIN_MENU_SETTINGS')}
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
