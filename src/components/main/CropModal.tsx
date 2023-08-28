import React, { useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-image-crop/dist/ReactCrop.css';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { COMMON } from '@graasp/translations';
import { Button } from '@graasp/ui';

import { THUMBNAIL_ASPECT } from '../../config/constants';
import { useAccountTranslation } from '../../config/i18n';
import notifier from '../../config/notifier';
import { getCroppedImg } from '../../utils/image';

export type CropProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  onConfirm: (blob: Blob | null) => void;
};

const CropModal = ({
  onConfirm,
  open,
  onClose,
  src,
}: CropProps): JSX.Element => {
  const [crop, setCrop] = useState<PixelCrop>();
  const imageRef = useRef<HTMLImageElement>();
  const { t } = useAccountTranslation();
  const { t: translateCommon } = useAccountTranslation();

  const makeClientCrop = async (newCrop: PixelCrop) => {
    if (imageRef.current && newCrop.width && newCrop.height) {
      const croppedImage = await getCroppedImg(imageRef.current, newCrop);
      return croppedImage;
    }
    return null;
  };

  const handleOnConfirm = async () => {
    if (!crop) {
      notifier({
        type: 'crop',
        payload: { error: new Error('crop is undefined') },
      });
    } else {
      const final = await makeClientCrop(crop);
      onConfirm(final);
    }
  };

  // If you setState the crop in here you should return false.
  const onImageLoaded = (img: HTMLImageElement) => {
    if (!imageRef.current) {
      imageRef.current = img;
    }
    const { width: imgWidth, height: imgHeight } = img;

    const aspect = THUMBNAIL_ASPECT;
    const outputImageAspectRatio = aspect;
    const inputImageAspectRatio = imgWidth / imgHeight;

    let width = imgWidth;
    let height = imgHeight;
    // if it's bigger than our target aspect ratio
    if (inputImageAspectRatio > outputImageAspectRatio) {
      width = imgHeight * outputImageAspectRatio;
    } else if (inputImageAspectRatio < outputImageAspectRatio) {
      height = imgWidth / outputImageAspectRatio;
    }

    const y = Math.floor((imgHeight - height) / 2);
    const x = Math.floor((imgWidth - width) / 2);

    const newCrop = {
      width,
      height,
      x,
      y,
      aspect,
      unit: 'px',
    } as PixelCrop;
    setCrop(newCrop);

    return false; // Return false if you set crop state in here.
  };

  const onCropChange = (newCrop: Crop, _percentageCrop: Crop) => {
    setCrop(newCrop as PixelCrop);
  };

  const label = 'crop-modal-title';

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby={label}>
      <DialogTitle id={label}>{t('CROP_IMAGE_MODAL_TITLE')}</DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <DialogContentText>
          {t('CROP_IMAGE_MODAL_CONTENT_TEXT')}
        </DialogContentText>
        <ReactCrop
          src={src}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          crop={crop ?? {}}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onChange={onCropChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {translateCommon(COMMON.CANCEL_BUTTON)}
        </Button>
        <Button onClick={handleOnConfirm}>{t('CONFIRM_BUTTON')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CropModal;
