import { Card, CardActionArea, Dialog, Grid, Typography } from '@mui/material';

import { ImageUp } from 'lucide-react';

import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';

import CropModal, { MODAL_TITLE_ARIA_LABEL_ID } from './CropModal';
import useAvatarUpload from './useAvatarUpload';

const NotifCard = (): JSX.Element | null => {
  const { t } = useAccountTranslation();
  const avatarUpload = useAvatarUpload();
  const {
    showCropModal,
    fileSource,
    onClose,
    onConfirmCrop,
    setFileSource,
    setShowCropModal,
    StatusBarComponent,
  } = avatarUpload;
  const { data: member } = hooks.useCurrentMember();

  const { data: avatarUrl } = hooks.useAvatarUrl({
    id: member?.id,
  });
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

  if (avatarUrl) {
    return null;
  }
  return (
    <Grid justifyContent="center" container spacing={2}>
      {StatusBarComponent}
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
