import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import { Alert, Box, Dialog, Grid, Stack, Typography } from '@mui/material';

import { ThumbnailSize, formatDate } from '@graasp/sdk';
import { Avatar, Button, Loader } from '@graasp/ui';

import { AVATAR_SIZE } from '@/config/constants';
import i18n, { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';

import defaultImage from '../../resources/defaultAvatar.svg';
import CropModal, { MODAL_TITLE_ARIA_LABEL_ID } from './CropModal';
import useAvatarUpload from './useAvatarUpload';

const MemberCard = (): JSX.Element | null => {
  const avatarUpload = useAvatarUpload();
  const { t } = useAccountTranslation();
  const {
    inputRef,
    uppy,
    showCropModal,
    fileSource,
    isLoadingMember,
    memberId,
    onSelectFile,
    onClose,
    onConfirmCrop,
    StatusBarComponent,
  } = avatarUpload;

  const { data: member } = hooks.useCurrentMember();

  const { data: avatarUrl, isLoading: isLoadingAvatar } = hooks.useAvatarUrl({
    id: member?.id,
    size: ThumbnailSize.Medium,
  });

  if (!uppy) {
    return null;
  }

  if (isLoadingMember) {
    return <Loader />;
  }

  if (!memberId) {
    return <Alert severity="error">{t('User is not unauthenticated')}</Alert>;
  }

  return (
    <>
      <Box>
        {StatusBarComponent}
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack alignItems="center">
            <Grid item sm={6}>
              <Avatar
                component="avatar"
                isLoading={isLoadingAvatar}
                url={avatarUrl ?? defaultImage}
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
            <Typography variant="h4">{member?.name}</Typography>
            <Typography display="flex" alignItems="center" gap={1} variant="h5">
              <AlarmOnIcon fontSize="small" />
              {t('PROFILE_CREATED_AT_TITLE')}
              {formatDate(member?.createdAt, { locale: i18n.language })}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {StatusBarComponent}
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

export default MemberCard;
