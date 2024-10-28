import { UserSwitchWrapper as GraaspUserSwitch } from '@graasp/ui';

import { GRAASP_AUTH_HOST } from '@/config/env';
import { useAccountTranslation } from '@/config/i18n';

import { ACCOUNT_HOME_PATH } from '../../config/paths';
import { hooks, mutations } from '../../config/queryClient';
import LanguageSwitch from '../main/LanguageSwitch';
import MemberAvatar from '../main/MemberAvatar';

type Props = {
  ButtonContent?: JSX.Element;
};

const UserSwitchWrapper = ({ ButtonContent }: Props): JSX.Element => {
  const { i18n } = useAccountTranslation();
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { mutateAsync: signOut } = mutations.useSignOut();
  const { mutate } = mutations.useEditCurrentMember();

  const handleLanguageChange = (lang: string) => {
    mutate({ extra: { lang } });
    i18n.changeLanguage(lang);
  };
  return (
    <>
      <LanguageSwitch
        lang={i18n.languages[0]}
        onChange={handleLanguageChange}
      />

      <GraaspUserSwitch
        ButtonContent={ButtonContent}
        signOut={signOut}
        currentMember={member}
        isCurrentMemberLoading={isLoading}
        avatar={<MemberAvatar id={member?.id} />}
        profilePath={ACCOUNT_HOME_PATH}
        redirectPath={GRAASP_AUTH_HOST}
        userMenuItems={[]}
      />
    </>
  );
};

export default UserSwitchWrapper;
