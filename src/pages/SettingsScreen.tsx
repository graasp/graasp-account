import ScreenLayout from '@/components/layout/ScreenLayout';
import DeleteMemberSection from '@/components/main/DeleteMemberSection';
import MemberPreferences from '@/components/main/MemberPreferences';
import { useAccountTranslation } from '@/config/i18n';
import { SETTINGS_PAGE_CONTAINER_ID } from '@/config/selectors';

const SettingsScreen = (): JSX.Element => {
  const { t: translateAccount } = useAccountTranslation();

  return (
    <ScreenLayout
      id={SETTINGS_PAGE_CONTAINER_ID}
      title={translateAccount('MAIN_MENU_SETTINGS')}
    >
      <MemberPreferences />
      <DeleteMemberSection />
    </ScreenLayout>
  );
};

export default SettingsScreen;
