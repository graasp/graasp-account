import {
  FormEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import Uppy from '@uppy/core';

import { hooks, mutations } from '@/config/queryClient';
import { configureAvatarUppy } from '@/utils/uppy';

import { CropProps } from './CropModal';
import StatusBar from './StatusBar';

// Define a type for the return values
type UseAvatarUploadReturnType = {
  inputRef: RefObject<HTMLInputElement>;
  uppy?: Uppy;
  showCropModal: boolean;
  fileSource?: string;
  openStatusBar: boolean;
  isLoadingMember: boolean;
  memberId?: string;
  onSelectFile: FormEventHandler<HTMLInputElement>;
  onClose: () => void;
  onConfirmCrop: CropProps['onConfirm'];
  setFileSource: (open: string) => void;
  setShowCropModal: (open: boolean) => void;
  StatusBarComponent: JSX.Element | null;
};

const useAvatarUpload = (): UseAvatarUploadReturnType => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uppy, setUppy] = useState<Uppy>();
  const [showCropModal, setShowCropModal] = useState(false);
  const [fileSource, setFileSource] = useState<string>();
  const [openStatusBar, setOpenStatusBar] = useState(false);

  const { mutate: onUploadAvatar } = mutations.useUploadAvatar();
  const { data: member, isLoading: isLoadingMember } = hooks.useCurrentMember();

  const memberId = member?.id;

  useEffect(() => {
    if (!member) {
      return;
    }
    setUppy(
      configureAvatarUppy({
        memberId: member.id,
        onUpload: () => {
          setOpenStatusBar(true);
        },
        onError: (error: Error) => {
          onUploadAvatar({ id: member.id, error });
        },
        onComplete: (result: {
          successful: { response: { body: unknown } }[];
        }) => {
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
    try {
      if (!croppedImage || !memberId) {
        throw new Error('cropped image is not defined');
      }
      uppy?.cancelAll();
      uppy?.addFile({
        type: croppedImage.type,
        data: croppedImage,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpenStatusBar(false);
  };

  const StatusBarComponent: JSX.Element | null = uppy ? (
    <StatusBar uppy={uppy} handleClose={handleClose} open={openStatusBar} />
  ) : null;

  return {
    inputRef,
    uppy,
    showCropModal,
    fileSource,
    openStatusBar,
    isLoadingMember,
    memberId,
    onSelectFile,
    onClose,
    onConfirmCrop,
    setFileSource,
    setShowCropModal,

    StatusBarComponent,
  };
};

export default useAvatarUpload;
