import { FieldError, SubmitHandler, useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import { isPasswordStrong } from '@graasp/sdk';
import { COMMON, FAILURE_MESSAGES } from '@graasp/translations';

import axios from 'axios';

import BorderedSection from '@/components/layout/BorderedSection';
import {
  useAccountTranslation,
  useCommonTranslation,
  useMessagesTranslation,
} from '@/config/i18n';
import { mutations } from '@/config/queryClient';
import {
  PASSWORD_CREATE_CONTAINER_ID,
  PASSWORD_INPUT_CONFIRM_PASSWORD_ID,
  PASSWORD_INPUT_NEW_PASSWORD_ID,
  PASSWORD_SAVE_BUTTON_ID,
} from '@/config/selectors';
import { ACCOUNT } from '@/langs/constants';

import PasswordField from './PasswordField';

type CreatePasswordProps = {
  onClose: () => void;
};

type Inputs = {
  newPassword: string;
  confirmNewPassword: string;
};

export const getValidationMessage = (
  fieldError?: FieldError,
): string | undefined => {
  if (fieldError?.type === 'required') {
    return 'REQUIRED_FIELD_ERROR';
  }
  return fieldError?.message;
};

const CreatePassword = ({ onClose }: CreatePasswordProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { t } = useAccountTranslation();
  const { t: translateMessage } = useMessagesTranslation();
  const { t: translateCommon } = useCommonTranslation();

  const {
    mutateAsync: createPassword,
    error: createPasswordError,
    isPending: isCreatePasswordLoading,
  } = mutations.useCreatePassword();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await createPassword({ password: data.newPassword });
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const newPasswordErrorMessage = getValidationMessage(errors.newPassword);
  const confirmNewPasswordErrorMessage = getValidationMessage(
    errors.confirmNewPassword,
  );
  const hasErrors = Boolean(
    newPasswordErrorMessage || confirmNewPasswordErrorMessage,
  );

  const createNetworkError = axios.isAxiosError(createPasswordError)
    ? translateMessage(
        createPasswordError.response?.data.name ??
          FAILURE_MESSAGES.UNEXPECTED_ERROR,
      )
    : null;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <BorderedSection
        id={PASSWORD_CREATE_CONTAINER_ID}
        title={t('PASSWORD_SETTINGS_TITLE')}
      >
        <Typography variant="body1">
          {t('PASSWORD_SETTINGS_CONFIRM_INFORMATION')}
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <PasswordField
              label={t('PASSWORD_SETTINGS_NEW_LABEL')}
              error={Boolean(newPasswordErrorMessage)}
              helperText={newPasswordErrorMessage && t(newPasswordErrorMessage)}
              id={PASSWORD_INPUT_NEW_PASSWORD_ID}
              form={register('newPassword', {
                required: true,
                validate: {
                  strong: (value) =>
                    isPasswordStrong(value) || 'PASSWORD_WEAK_ERROR',
                },
              })}
            />
            <PasswordField
              label={t('PASSWORD_SETTINGS_NEW_CONFIRM_LABEL')}
              error={Boolean(confirmNewPasswordErrorMessage)}
              helperText={
                confirmNewPasswordErrorMessage &&
                t(confirmNewPasswordErrorMessage)
              }
              id={PASSWORD_INPUT_CONFIRM_PASSWORD_ID}
              form={register('confirmNewPassword', {
                required: true,
                validate: {
                  match: (confirmPassword, formState) =>
                    confirmPassword === formState.newPassword ||
                    ACCOUNT.PASSWORD_DO_NOT_MATCH_ERROR,
                },
              })}
            />
          </Stack>
        </Stack>
        {Boolean(createNetworkError) && (
          <Alert severity="error">{createNetworkError}</Alert>
        )}
        <Stack direction="row" gap={1} justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose} size="small">
            {translateCommon(COMMON.CANCEL_BUTTON)}
          </Button>
          <LoadingButton
            variant="contained"
            color="primary"
            id={PASSWORD_SAVE_BUTTON_ID}
            disabled={hasErrors}
            size="small"
            type="submit"
            loading={isCreatePasswordLoading}
          >
            {translateCommon(COMMON.SAVE_BUTTON)}
          </LoadingButton>
        </Stack>
      </BorderedSection>
    </Box>
  );
};

export default CreatePassword;
