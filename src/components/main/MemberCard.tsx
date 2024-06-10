import { useEffect, useState } from 'react';

import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { Alert, Stack, Typography } from '@mui/material';

import { ThumbnailSize, formatDate } from '@graasp/sdk';
import { Loader } from '@graasp/ui';

import Uppy from '@uppy/core';

import i18n, { useAccountTranslation } from '@/config/i18n';
import { hooks, mutations } from '@/config/queryClient';
import { MEMBER_CREATED_AT_ID, USERNAME_DISPLAY_ID } from '@/config/selectors';
import { configureAvatarUppy } from '@/utils/uppy';

import AvatarUploader from './AvatarUploader';
import StatusBar from './StatusBar';

const MemberCard = (): JSX.Element | null => {
  const { t } = useAccountTranslation();

  const [uppy, setUppy] = useState<Uppy>();
  const [openStatusBar, setOpenStatusBar] = useState(false);
  const { mutate: onUploadAvatar } = mutations.useUploadAvatar();
  const { data: member } = hooks.useCurrentMember();

  const { isLoading: isLoadingMember } = hooks.useCurrentMember();
  const { data: avatarUrl } = hooks.useAvatarUrl({
    id: member?.id,
    size: ThumbnailSize.Medium,
  });
  const memberId = member?.id;

  useEffect(() => {
    if (!member) {
      return;
    }
    setUppy(
      configureAvatarUppy({
        memberId,
        onUpload: () => {
          setOpenStatusBar(true);
        },
        onError: (error: Error) => {
          onUploadAvatar({ id: member?.id, error });
        },
        onComplete: (result: {
          successful: { response: { body: unknown } }[];
        }) => {
          if (result?.successful?.length) {
            const data = result.successful[0].response.body;
            onUploadAvatar({ id: member.id, data });
            setOpenStatusBar(false);
          }
          return false;
        },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId]);
  if (!uppy) {
    return null;
  }
  const handleClose = () => {
    setOpenStatusBar(false);
  };

  if (isLoadingMember) {
    return <Loader />;
  }

  if (!memberId) {
    return <Alert severity="error">{t('User is not unauthenticated')}</Alert>;
  }
  const onThumbnailUpload = (payload: { avatar: Blob }) => {
    const { avatar } = payload;
    if (!avatar) {
      return;
    }
    try {
      // remove waiting files
      uppy?.cancelAll();
      uppy?.addFile({
        type: avatar.type,
        data: avatar,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Stack alignItems="center" spacing={2}>
        <AvatarUploader
          currentAvatar={avatarUrl}
          setChanges={onThumbnailUpload}
        />
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h4">{t('GENERAL_PAGE_WELCOME_TEXT')},</Typography>
        <Typography variant="h4" id={USERNAME_DISPLAY_ID}>
          {member?.name}
        </Typography>
        <Typography
          display="flex"
          alignItems="center"
          gap={1}
          variant="h5"
          id={MEMBER_CREATED_AT_ID}
        >
          <AlarmOnIcon fontSize="small" />

          {t('PROFILE_CREATED_AT_INFO', {
            date: formatDate(member?.createdAt, { locale: i18n.language }),
          })}
        </Typography>
      </Stack>
      {uppy && (
        <StatusBar uppy={uppy} handleClose={handleClose} open={openStatusBar} />
      )}
    </Stack>
  );
};

export default MemberCard;
