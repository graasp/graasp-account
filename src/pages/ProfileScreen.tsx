import ScreenLayout from '@/components/layout/ScreenLayout';
import { useAccountTranslation } from '@/config/i18n';
import PersonalInformation from '@/modules/profile/PersonalInformation';
import MemberPassword from '@/modules/profile/password/MemberPassword';
import PublicProfile from '@/modules/profile/public/PublicProfile';

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
