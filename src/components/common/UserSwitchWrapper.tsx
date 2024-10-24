import { UserSwitchWrapper as GraaspUserSwitch } from '@graasp/ui';

import { GRAASP_AUTH_HOST } from '@/config/env';

import { ACCOUNT_HOME_PATH } from '../../config/paths';
import { hooks, mutations } from '../../config/queryClient';
import MemberAvatar from '../main/MemberAvatar';

type Props = {
  ButtonContent?: JSX.Element;
};

const UserSwitchWrapper = ({ ButtonContent }: Props): JSX.Element => {
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { mutateAsync: signOut } = mutations.useSignOut();

  return (
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
  );
};

export default UserSwitchWrapper;
