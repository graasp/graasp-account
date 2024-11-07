import { FieldError, SubmitHandler, useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import { isPasswordStrong } from '@graasp/sdk';
import { COMMON, FAILURE_MESSAGES } from '@graasp/translations';

import axios from 'axios';

import { BorderedSection } from '@/components/layout/BorderedSection';
import {
  useAccountTranslation,
  useCommonTranslation,
  useMessagesTranslation,
} from '@/config/i18n';
import { mutations } from '@/config/queryClient';
import {
  PASSWORD_EDIT_CONTAINER_ID,
  PASSWORD_INPUT_CONFIRM_PASSWORD_ID,
  PASSWORD_INPUT_CURRENT_PASSWORD_ID,
  PASSWORD_INPUT_NEW_PASSWORD_ID,
  PASSWORD_SAVE_BUTTON_ID,
} from '@/config/selectors';
import { ACCOUNT } from '@/langs/account';

import { PasswordField } from './PasswordField';

type EditPasswordProps = {
  onClose: () => void;
};

type Inputs = {
  currentPassword: string;
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

const EditPassword = ({ onClose }: EditPasswordProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { t } = useAccountTranslation();
  const { t: translateMessage } = useMessagesTranslation();
  const { t: translateCommon } = useCommonTranslation();

  const {
    mutateAsync: updatePassword,
    error: updatePasswordError,
    isPending: isUpdatePasswordLoading,
  } = mutations.useUpdatePassword();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // perform password update
      await updatePassword({
        password: data.newPassword,
        currentPassword: data.currentPassword,
      });

      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const currentPasswordErrorMessage = getValidationMessage(
    errors.currentPassword,
  );
  const newPasswordErrorMessage = getValidationMessage(errors.newPassword);
  const confirmNewPasswordErrorMessage = getValidationMessage(
    errors.confirmNewPassword,
  );
  const hasErrors = Boolean(
    currentPasswordErrorMessage ||
      newPasswordErrorMessage ||
      confirmNewPasswordErrorMessage,
  );

  const updateNetworkError = axios.isAxiosError(updatePasswordError)
    ? translateMessage(
        updatePasswordError.response?.data.name ??
          FAILURE_MESSAGES.UNEXPECTED_ERROR,
      )
    : null;

  return (
    <BorderedSection
      id={PASSWORD_EDIT_CONTAINER_ID}
      title={t(ACCOUNT.PASSWORD_SETTINGS_TITLE)}
    >
      <Stack
        direction="column"
        gap={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="body1">
          {t(ACCOUNT.PASSWORD_SETTINGS_CONFIRM_INFORMATION)}
        </Typography>
        <Box>
          <PasswordField
            id={PASSWORD_INPUT_CURRENT_PASSWORD_ID}
            label={t(ACCOUNT.PASSWORD_SETTINGS_CURRENT_LABEL)}
            error={Boolean(currentPasswordErrorMessage)}
            helperText={
              currentPasswordErrorMessage && t(currentPasswordErrorMessage)
            }
            form={register('currentPassword', {
              required: true,
              validate: {
                strong: (value) =>
                  isPasswordStrong(value) || 'PASSWORD_WEAK_ERROR',
              },
            })}
          />
        </Box>

        <Stack direction="row" gap={2}>
          <PasswordField
            label={t(ACCOUNT.PASSWORD_SETTINGS_NEW_LABEL)}
            error={Boolean(newPasswordErrorMessage)}
            helperText={newPasswordErrorMessage && t(newPasswordErrorMessage)}
            id={PASSWORD_INPUT_NEW_PASSWORD_ID}
            form={register('newPassword', {
              required: true,
              validate: {
                different: (newPassword, formState) =>
                  newPassword !== formState.currentPassword ||
                  ACCOUNT.NEW_PASSWORD_SHOULD_NOT_MATCH_CURRENT_PASSWORD_ERROR,
                strong: (value) =>
                  isPasswordStrong(value) || 'PASSWORD_WEAK_ERROR',
              },
            })}
          />
          <PasswordField
            label={t(ACCOUNT.PASSWORD_SETTINGS_NEW_CONFIRM_LABEL)}
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
        {Boolean(updateNetworkError) && (
          <Alert severity="error">{updateNetworkError}</Alert>
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
            loading={isUpdatePasswordLoading}
            data-umami-event="update-password"
          >
            {translateCommon(COMMON.SAVE_BUTTON)}
          </LoadingButton>
        </Stack>
      </Stack>
    </BorderedSection>
  );
};

export default EditPassword;
