import { ThumbnailSize } from '@graasp/sdk';
import { COMMON } from '@graasp/translations';
import { Avatar } from '@graasp/ui';

import { AVATAR_SIZE } from '../../config/constants';
import { useCommonTranslation } from '../../config/i18n';
import { hooks } from '../../config/queryClient';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import defaultImage from '../../resources/defaultAvatar.svg';

type Props = {
  id?: string;
  maxWidth?: number;
  maxHeight?: number;
  component?: 'avatar' | 'img';
};

const MemberAvatar = ({
  id,
  maxWidth = AVATAR_SIZE,
  maxHeight = AVATAR_SIZE,
  component = 'avatar',
}: Props): JSX.Element => {
  const { t } = useCommonTranslation();
  const { data: member, isLoading } = hooks.useMember(id);
  const { data: avatarUrl, isLoading: isLoadingAvatar } = hooks.useAvatarUrl({
    id,
    size: ThumbnailSize.Medium,
  });
  return (
    <Avatar
      url={avatarUrl ?? defaultImage}
      isLoading={isLoading || isLoadingAvatar}
      alt={member?.name ?? t(COMMON.AVATAR_DEFAULT_ALT)}
      component={component}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      sx={{ mx: 1 }}
    />
  );
};

export default MemberAvatar;
