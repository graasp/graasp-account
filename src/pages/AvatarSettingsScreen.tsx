import { FormEventHandler, useEffect, useRef, useState } from 'react';

import { Box, Dialog, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { ThumbnailSize } from '@graasp/sdk';
import { Avatar } from '@graasp/ui';

import Uppy from '@uppy/core';

import CropModal, {
  CropProps,
  MODAL_TITLE_ARIA_LABEL_ID,
} from '@/components/main/CropModal';
import StatusBar from '@/components/main/StatusBar';
import {
  THUMBNAIL_SETTING_MAX_HEIGHT,
  THUMBNAIL_SETTING_MAX_WIDTH,
} from '@/config/constants';
import { useAccountTranslation } from '@/config/i18n';
import { hooks, mutations } from '@/config/queryClient';
import { configureAvatarUppy } from '@/utils/uppy';

const AvatarSettings = (): JSX.Element | null => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uppy, setUppy] = useState<Uppy>();
  const [showCropModal, setShowCropModal] = useState(false);
  const [fileSource, setFileSource] = useState<string>();
  const [openStatusBar, setOpenStatusBar] = useState(false);
  const { t } = useAccountTranslation();
  const { mutate: onUploadAvatar } = mutations.useUploadAvatar();
  const { data: user } = hooks.useCurrentMember();
  const { data: avatarUrl, isLoading: isLoadingAvatar } = hooks.useAvatarUrl({
    id: user?.id,
    size: ThumbnailSize.Medium,
  });

  const userId = user?.id;

  useEffect(() => {
    if (!user) {
      return;
    }
    setUppy(
      configureAvatarUppy({
        memberId: userId,
        onUpload: () => {
          setOpenStatusBar(true);
        },
        onError: (error: Error) => {
          onUploadAvatar({ id: user.id, error });
        },
        onComplete: (result: {
          successful: { response: { body: unknown } }[];
        }) => {
          // update app on complete
          // todo: improve with websockets or by receiving corresponding items
          if (result?.successful?.length) {
            const data = result.successful[0].response.body;
            onUploadAvatar({ id: user.id, data });
          }

          return false;
        },
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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
      if (!croppedImage) {
        throw new Error('cropped image is not defined');
      }
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

  return (
    <>
      {uppy && (
        <StatusBar uppy={uppy} handleClose={handleClose} open={openStatusBar} />
      )}
      <Stack spacing={3} direction="column" alignItems="flex-start">
        <Typography variant="h4" component="h1">
          {t('PROFILE_AVATAR_TITLE')}
        </Typography>
        <Box>
          <Typography variant="body1">
            {t('PROFILE_AVATAR_INFORMATION')}
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            ref={inputRef}
          />
        </Box>
        <Grid item sm={6} xs={12}>
          <Avatar
            component="avatar"
            isLoading={isLoadingAvatar}
            url={avatarUrl}
            alt={t('PROFILE_AVATAR_CURRENT_ALT')}
            maxHeight={THUMBNAIL_SETTING_MAX_HEIGHT}
            maxWidth={THUMBNAIL_SETTING_MAX_WIDTH}
          />
        </Grid>
      </Stack>
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
};

export default AvatarSettings;
