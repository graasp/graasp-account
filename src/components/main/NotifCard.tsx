import React, { useEffect, useRef, useState } from 'react';

import { Card, CardActionArea, Dialog, Grid, Typography } from '@mui/material';

import Uppy from '@uppy/core';
import { ImageUp } from 'lucide-react';

// import { ImageUp, ShieldAlert } from 'lucide-react';
import { useAccountTranslation } from '@/config/i18n';
import { hooks, mutations } from '@/config/queryClient';
import { configureAvatarUppy } from '@/utils/uppy';

import CropModal, { CropProps, MODAL_TITLE_ARIA_LABEL_ID } from './CropModal';
import StatusBar from './StatusBar';

const NotifCard = (): JSX.Element | null => {
  const { t } = useAccountTranslation();
  const [showCropModal, setShowCropModal] = useState(false);
  const [openStatusBar, setOpenStatusBar] = useState(false);

  const [fileSource, setFileSource] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uppy, setUppy] = useState<Uppy>();
  const { mutate: onUploadAvatar } = mutations.useUploadAvatar();
  const { data: member } = hooks.useCurrentMember();

  const memberId = member?.id;

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
  const handleClickProfilePicture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        setFileSource(reader.result as string);
        setShowCropModal(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    };
    input.click();
  };
  const onClose = () => {
    setShowCropModal(false);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  const handleClose = () => {
    setOpenStatusBar(false);
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
    <Grid justifyContent="center" container spacing={2}>
      {/* <Grid xs={12} md={6} item>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardActionArea sx={{ padding: 3 }}>
            <Typography
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              variant="h5"
            >
              <ShieldAlert fontSize="large" />
              {t('SECURITY_TIPS_TITLE')}
            </Typography>
            <Typography variant="body1" textAlign="center" marginTop={2}>
              {t('SECURITY_TIPS_INFORMATION')}
            </Typography>
          </CardActionArea>
        </Card>
      </Grid> */}
      {uppy && (
        <StatusBar uppy={uppy} handleClose={handleClose} open={openStatusBar} />
      )}
      <Grid xs={12} md={6} item>
        <Card variant="outlined" sx={{ height: '100%' }}>
          <CardActionArea
            sx={{ padding: 3 }}
            onClick={handleClickProfilePicture}
          >
            <Typography
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={2}
              variant="h5"
            >
              <ImageUp fontSize="large" />
              {t('PERSONALISATION_TITLE')}
            </Typography>
            <Typography variant="body1" textAlign="center" marginTop={2}>
              {t('PERSONALISATION_INFORMATION')}
            </Typography>
          </CardActionArea>
        </Card>
      </Grid>
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
    </Grid>
  );
};

export default NotifCard;
