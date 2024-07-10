import ScreenLayout from '@/components/layout/ScreenLayout';
import { useAccountTranslation } from '@/config/i18n';
import MemberPassword from '@/modules/profile/MemberPassword';
import PersonalInformation from '@/modules/profile/PersonalInformation';
import PublicProfile from '@/modules/profile/PublicProfile';

const MemberProfileScreen = (): JSX.Element => {
  const { t } = useAccountTranslation();
  return (
    <ScreenLayout title={t('PROFILE_TITLE')}>
      <PersonalInformation />
      <MemberPassword />
      <PublicProfile />
    </ScreenLayout>
  );
};

export default MemberProfileScreen;
