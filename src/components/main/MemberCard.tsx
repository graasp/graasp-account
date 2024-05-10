import { FormEventHandler, useEffect, useRef, useState } from 'react';

import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { Alert, Box, Dialog, Grid, Stack, Typography } from '@mui/material';

import { ThumbnailSize, formatDate } from '@graasp/sdk';
import { Avatar, Button, Loader } from '@graasp/ui';

import Uppy from '@uppy/core';

import { AVATAR_SIZE } from '@/config/constants';
import i18n, { useAccountTranslation } from '@/config/i18n';
import { hooks, mutations } from '@/config/queryClient';
import { configureAvatarUppy } from '@/utils/uppy';

import CropModal, { CropProps, MODAL_TITLE_ARIA_LABEL_ID } from './CropModal';
import StatusBar from './StatusBar';

const MemberCard = (): JSX.Element | null => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uppy, setUppy] = useState<Uppy>();
  const [showCropModal, setShowCropModal] = useState(false);
  const [fileSource, setFileSource] = useState<string>();
  const [openStatusBar, setOpenStatusBar] = useState(false);
  const { t } = useAccountTranslation();
  const { mutate: onUploadAvatar } = mutations.useUploadAvatar();
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { mutate: editMember } = mutations.useEditMember();
  const memberId = member?.id;
  const { data: avatarUrl, isLoading: isLoadingAvatar } = hooks.useAvatarUrl({
    id: member?.id,
    size: ThumbnailSize.Medium,
  });
  // const memberId = member?.id;
  useEffect(() => {
    if (!member) {
      return;
    }
    setUppy(
      configureAvatarUppy({
        itemId: memberId,
        onUpload: () => {
          setOpenStatusBar(true);
        },
        onError: (error: Error) => {
          onUploadAvatar({ id: member.id, error });
        },
        onComplete: (result: {
          successful: { response: { body: unknown } }[];
        }) => {
          // update app on complete
          // todo: improve with websockets or by receiving corresponding items
          if (result?.successful?.length) {
            const data = result.successful[0].response.body;
            onUploadAvatar({ id: member.id, data });
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

  const onSelectFile: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setFileSource(reader.result as string),
      );
      reader.readAsDataURL(target.files[0]);
      setShowCropModal(true);
    }
  };

  const onClose = () => {
    setShowCropModal(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onConfirmCrop: CropProps['onConfirm'] = (croppedImage) => {
    onClose();

    // submit cropped image
    try {
      if (!croppedImage || !memberId) {
        throw new Error('cropped image is not defined');
      }

      // Call the edit member mutation to update the avatar
      editMember({
        id: memberId,
        extra: {
          hasAvatar: true,
        },
      });
      // remove waiting files
      uppy.cancelAll();
      uppy.addFile({
        type: croppedImage.type,
        data: croppedImage,
      });
    } catch (error) {
      console.error(error);
    }
  };
  if (member) {
    return (
      <>
        <Box>
          {uppy && (
            <StatusBar
              uppy={uppy}
              handleClose={handleClose}
              open={openStatusBar}
            />
          )}
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack alignItems="center">
              <Grid item sm={6}>
                <Avatar
                  component="avatar"
                  isLoading={isLoadingAvatar}
                  url={avatarUrl}
                  alt={t('PROFILE_AVATAR_CURRENT_ALT')}
                  sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
                />
              </Grid>
              <Box marginTop={1} alignItems="center" justifyContent="center">
                <Button variant="contained" component="label">
                  {t('UPLOAD_PICTURE_TEXT')}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    ref={inputRef}
                    hidden
                  />
                </Button>
              </Box>
            </Stack>

            <Stack spacing={3}>
              <Typography variant="h4">Welcome,</Typography>
              <Typography variant="h4">{member.name}</Typography>
              <Typography
                display="flex"
                alignItems="center"
                gap={1}
                variant="h5"
              >
                <AlarmOnIcon fontSize="small" />
                {t('PROFILE_CREATED_AT_TITLE')}{' '}
                {formatDate(member.createdAt, { locale: i18n.language })}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        {fileSource && (
          <Dialog
            open={showCropModal}
            onClose={onClose}
            aria-labelledby={MODAL_TITLE_ARIA_LABEL_ID}
          >
            <CropModal
              onClose={onClose}
              src={fileSource}
              onConfirm={onConfirmCrop}
            />
          </Dialog>
        )}
      </>
    );
  }
  if (isLoading) {
    return <Loader />;
  }

  if (!member) {
    return <Alert severity="error">{t('User is not unauthenticated')}</Alert>;
  }

  return null;
};

export default MemberCard;
