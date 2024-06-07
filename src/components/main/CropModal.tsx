import { ReactEventHandler, useRef, useState } from 'react';
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import {
  Alert,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { Button } from '@graasp/ui';

import { useAccountTranslation } from '@/config/i18n';
import { CROP_MODAL_CONFIRM_BUTTON_ID } from '@/config/selectors';

import { THUMBNAIL_ASPECT } from '../../config/constants';

export const MODAL_TITLE_ARIA_LABEL_ID = 'crop-modal-title';

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export type CropProps = {
  onClose: () => void;
  src: string;
  onConfirm: (blob: Blob | null) => void;
};

const CropModal = ({ onConfirm, onClose, src }: CropProps): JSX.Element => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isError, setIsError] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { t } = useAccountTranslation();

  const handleOnConfirm = async () => {
    // get the image html element
    const image = imageRef.current;

    if (!image || !completedCrop) {
      // this should never happen but we better check
      setIsError(true);
      throw new Error('Crop canvas does not exist, this should never happen');
    }

    // declare the canvas that will be used to render the cropped image
    // we use an off-screen canvas to not overload the main thread
    const offscreen = new OffscreenCanvas(
      completedCrop.width,
      completedCrop.height,
    );
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    /**
     *  compute the relative width and height
     * They link the
     */
    const relativeCrop = {
      width: completedCrop.width / image.width,
      height: completedCrop.height / image.height,
    };

    /**
     * The scaling factor between the "real" media size and the size shown in the preview window
     * We need to compute this as the crop is expressed in terms of the preview size but we want to apply the crop to the "real" image
     * `image.width` is the size of the preview
     * `image.naturalWidth` is the size of the uploaded media
     */
    const uiScalingFactor = image.naturalWidth / image.width;

    // console.log(scaleY);
    // const pixelRatio = window.devicePixelRatio;
    // console.log('pixelRatio', pixelRatio);
    // const pixelRatio = 1;

    const finalCanvasWidth = Math.floor(
      relativeCrop.width * image.naturalWidth,
    );
    const finalCanvasHeight = Math.floor(
      relativeCrop.height * image.naturalHeight,
    );

    offscreen.width = finalCanvasWidth;
    offscreen.height = finalCanvasHeight;
    console.log(offscreen.width, offscreen.height);
    // ctx.scale(pixelRatio, pixelRatio);

    // smoothing factor used
    ctx.imageSmoothingQuality = 'high';

    const sourceOffsetX = completedCrop.x * uiScalingFactor;
    const sourceOffsetY = completedCrop.y * uiScalingFactor;
    const sourceWidth = image.naturalWidth * relativeCrop.width;
    const sourceHeight = image.naturalHeight * relativeCrop.height;
    // const centerX = image.naturalWidth / 2;
    // const centerY = image.naturalHeight / 2;
    console.log(sourceOffsetX, sourceOffsetY, sourceWidth, sourceHeight);

    ctx.drawImage(
      image,
      sourceOffsetX,
      sourceOffsetY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      finalCanvasWidth,
      finalCanvasHeight,
    );

    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/webp',
      quality: 0.8,
    });
    onConfirm(blob);
  };

  // If you setState the crop in here you should return false.
  const onImageLoaded: ReactEventHandler<HTMLImageElement> = (event) => {
    if (!imageRef.current) {
      imageRef.current = event.currentTarget;
    }

    const { width: imgWidth, height: imgHeight } = event.currentTarget;
    setCrop(centerAspectCrop(imgWidth, imgHeight, THUMBNAIL_ASPECT));
  };

  return (
    <>
      <DialogTitle id={MODAL_TITLE_ARIA_LABEL_ID}>
        {t('CROP_IMAGE_MODAL_TITLE')}
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <DialogContentText>
          {t('CROP_IMAGE_MODAL_CONTENT_TEXT')}
        </DialogContentText>
        <ReactCrop
          crop={crop}
          onChange={(_, percentageCrop) => setCrop(percentageCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={THUMBNAIL_ASPECT}
          // circularCrop
          ruleOfThirds
        >
          <img
            ref={imageRef}
            alt={t('CROP_IMAGE_MODAL_IMAGE_ALT_TEXT')}
            width="100%"
            height="100%"
            src={src}
            onLoad={onImageLoaded}
          />
        </ReactCrop>
        {isError && (
          <Alert severity="error">
            {t('CROP_IMAGE_MODAL_UNEXPECTED_ERROR')}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          {t('CANCEL_BUTTON')}
        </Button>
        <Button
          onClick={handleOnConfirm}
          disabled={isError}
          id={CROP_MODAL_CONFIRM_BUTTON_ID}
        >
          {t('CONFIRM_BUTTON')}
        </Button>
      </DialogActions>
    </>
  );
};

export default CropModal;
