import { FieldError, SubmitHandler, useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Skeleton, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

import { isPasswordStrong } from '@graasp/sdk';
import { FAILURE_MESSAGES } from '@graasp/translations';

import axios from 'axios';

import BorderedSection from '@/components/layout/BorderedSection';
import {
  useAccountTranslation,
  useCommonTranslation,
  useMessagesTranslation,
} from '@/config/i18n';
import { hooks, mutations } from '@/config/queryClient';
import {
  PASSWORD_EDIT_CONTAINER_ID,
  PASSWORD_INPUT_CONFIRM_PASSWORD_ID,
  PASSWORD_INPUT_CURRENT_PASSWORD_ID,
  PASSWORD_INPUT_NEW_PASSWORD_ID,
  PASSWORD_SAVE_BUTTON_ID,
} from '@/config/selectors';
import { ACCOUNT } from '@/langs/constants';

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

  const { data: passwordStatus } = hooks.usePasswordStatus();
  const {
    mutateAsync: updatePassword,
    error: updatePasswordError,
    isPending: isUpdatePasswordLoading,
  } = mutations.useUpdatePassword();
  const {
    mutateAsync: createPassword,
    error: createPasswordError,
    isPending: isCreatePasswordLoading,
  } = mutations.useCreatePassword();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (passwordStatus?.hasPassword) {
        // perform password update
        await updatePassword({
          password: data.newPassword,
          currentPassword: data.currentPassword,
        });
      } else {
        await createPassword({ password: data.newPassword });
      }
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
  const createNetworkError = axios.isAxiosError(createPasswordError)
    ? translateMessage(
        createPasswordError.response?.data.name ??
          FAILURE_MESSAGES.UNEXPECTED_ERROR,
      )
    : null;

  const networkError = createNetworkError || updateNetworkError;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <BorderedSection
        id={PASSWORD_EDIT_CONTAINER_ID}
        title={t('PASSWORD_SETTINGS_TITLE')}
      >
        <Typography variant="body1">
          {t('PASSWORD_SETTINGS_CONFIRM_INFORMATION')}
        </Typography>
        {passwordStatus ? (
          <Stack spacing={2}>
            {passwordStatus?.hasPassword && (
              <Box>
                <TextField
                  required
                  id={PASSWORD_INPUT_CURRENT_PASSWORD_ID}
                  label={t('PASSWORD_SETTINGS_CURRENT_LABEL')}
                  variant="outlined"
                  size="small"
                  type="password"
                  error={Boolean(currentPasswordErrorMessage)}
                  helperText={
                    currentPasswordErrorMessage &&
                    t(currentPasswordErrorMessage)
                  }
                  autoComplete="current-password"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...register('currentPassword', {
                    required: true,
                    validate: {
                      strong: (value) =>
                        isPasswordStrong(value) || 'PASSWORD_WEAK_ERROR',
                    },
                  })}
                />
                <Typography variant="subtitle2">
                  {t('PASSWORD_SETTINGS_CURRENT_INFORMATION')}
                </Typography>
              </Box>
            )}
            <Stack direction="row" spacing={2}>
              <TextField
                required
                label={t('PASSWORD_SETTINGS_NEW_LABEL')}
                variant="outlined"
                size="small"
                error={Boolean(newPasswordErrorMessage)}
                helperText={
                  newPasswordErrorMessage && t(newPasswordErrorMessage)
                }
                type="password"
                id={PASSWORD_INPUT_NEW_PASSWORD_ID}
                autoComplete="new-password"
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('newPassword', {
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
              <TextField
                required
                label={t('PASSWORD_SETTINGS_NEW_CONFIRM_LABEL')}
                variant="outlined"
                size="small"
                error={Boolean(confirmNewPasswordErrorMessage)}
                helperText={
                  confirmNewPasswordErrorMessage &&
                  t(confirmNewPasswordErrorMessage)
                }
                type="password"
                autoComplete="new-password"
                id={PASSWORD_INPUT_CONFIRM_PASSWORD_ID}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('confirmNewPassword', {
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
        ) : (
          <Stack direction="row" gap={1}>
            <Skeleton>
              <TextField />
            </Skeleton>
            <Skeleton>
              <TextField />
            </Skeleton>
          </Stack>
        )}
        {Boolean(networkError) && (
          <Alert severity="error">{networkError}</Alert>
        )}
        <Stack direction="row" gap={1} justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose} size="small">
            {translateCommon('CANCEL_BUTTON')}
          </Button>
          <LoadingButton
            variant="contained"
            color="primary"
            id={PASSWORD_SAVE_BUTTON_ID}
            disabled={hasErrors}
            size="small"
            type="submit"
            loading={isUpdatePasswordLoading || isCreatePasswordLoading}
          >
            {translateCommon('SAVE_BUTTON')}
          </LoadingButton>
        </Stack>
      </BorderedSection>
    </Box>
  );
};

export default EditPassword;
