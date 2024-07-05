import ScreenLayout from '@/components/layout/ScreenLayout';
import MemberPublicProfile from '@/components/main/MemberPublicProfile';
import PersonalInformation from '@/components/main/PersonalInformation';
import { useAccountTranslation } from '@/config/i18n';

const MemberProfileScreen = (): JSX.Element => {
  const { t } = useAccountTranslation();
  return (
    <ScreenLayout title={t('PROFILE_TITLE')}>
      <PersonalInformation />
      <MemberPublicProfile />
    </ScreenLayout>
  );
};

export default MemberProfileScreen;
