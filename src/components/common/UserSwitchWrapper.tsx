import { Member } from '@graasp/sdk';
import { UserSwitchWrapper as GraaspUserSwitch } from '@graasp/ui';

import { GRAASP_AUTH_HOST } from '@/config/env';

import { HOME_PATH } from '../../config/paths';
import { hooks, mutations } from '../../config/queryClient';
import MemberAvatar from '../main/MemberAvatar';

type Props = {
  ButtonContent?: JSX.Element;
};

const UserSwitchWrapper = ({ ButtonContent }: Props): JSX.Element => {
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { mutateAsync: signOut } = mutations.useSignOut();
  // todo: does not exist on mutations since we use httpOnly Cookie
  // const { mutate: switchMember } = mutations.useSwitchMember();

  const renderAvatar = (m?: Member | null) => <MemberAvatar id={m?.id} />;

  return (
    <GraaspUserSwitch
      ButtonContent={ButtonContent}
      signOut={signOut}
      currentMember={member}
      isCurrentMemberLoading={isLoading}
      renderAvatar={renderAvatar}
      profilePath={HOME_PATH}
      redirectPath={GRAASP_AUTH_HOST}
      userMenuItems={[]}
    />
  );
};

export default UserSwitchWrapper;
