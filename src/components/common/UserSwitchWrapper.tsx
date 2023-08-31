import { MemberRecord } from '@graasp/sdk/frontend';
import { UserSwitchWrapper as GraaspUserSwitch } from '@graasp/ui';

import { hooks, mutations } from '../../config/queryClient';


import MemberAvatar from '../main/MemberAvatar';
import { HOME_PATH } from '../../config/paths';
import { AUTHENTICATION_HOST } from '../../config/constants';

type Props = {
  ButtonContent?: JSX.Element;
};

const UserSwitchWrapper = ({ ButtonContent }: Props): JSX.Element => {
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { mutateAsync: signOut } = mutations.useSignOut();
  // todo: does not exist on mutations since we use httpOnly Cookie
  // const { mutate: switchMember } = mutations.useSwitchMember();

  const renderAvatar = (m?: MemberRecord) => <MemberAvatar id={m?.id} />;

  return (
    <GraaspUserSwitch
      ButtonContent={ButtonContent}
      signOut={signOut}
      currentMember={member}
      isCurrentMemberLoading={isLoading}
      renderAvatar={renderAvatar}
      profilePath={HOME_PATH}
      redirectPath={AUTHENTICATION_HOST}
    />
  );
};

export default UserSwitchWrapper;
