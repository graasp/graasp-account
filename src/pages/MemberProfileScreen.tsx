import ScreenLayout from '@/components/layout/ScreenLayout';
import MemberPersonalInformation from '@/components/main/MemberPersonalInformation';
import MemberPublicProfile from '@/components/main/MemberPublicProfile';
import { useAccountTranslation } from '@/config/i18n';

const MemberProfileScreen = (): JSX.Element => {
  const { t } = useAccountTranslation();
  return (
    <ScreenLayout title={t('PROFILE_TITLE')}>
      <MemberPersonalInformation />
      <MemberPublicProfile />
    </ScreenLayout>
  );
};

export default MemberProfileScreen;
