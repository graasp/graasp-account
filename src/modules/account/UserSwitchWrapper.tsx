import { useTranslation } from 'react-i18next';

import { UserSwitchWrapper as GraaspUserSwitch } from '@graasp/ui';

import { NS } from '@/config/constants';
import { GRAASP_AUTH_HOST } from '@/config/env';
import { ACCOUNT_HOME_PATH } from '@/config/paths';
import { hooks, mutations } from '@/config/queryClient';

import MemberAvatar from './MemberAvatar';
import LanguageSwitch from './common/LanguageSwitch';

type Props = {
  ButtonContent?: JSX.Element;
};

const UserSwitchWrapper = ({ ButtonContent }: Props): JSX.Element => {
  const { i18n } = useTranslation(NS.Account);
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
