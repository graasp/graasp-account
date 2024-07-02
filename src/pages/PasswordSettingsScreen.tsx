import { ChangeEvent, useState } from 'react';

import { Button, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

import { isPasswordStrong } from '@graasp/sdk';
import { FAILURE_MESSAGES } from '@graasp/translations';

import ScreenLayout from '@/components/layout/ScreenLayout';
import { useAccountTranslation } from '@/config/i18n';
import { mutations } from '@/config/queryClient';

const PasswordSettings = (): JSX.Element => {
  const { t } = useAccountTranslation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState<string | null>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >();
  const { mutate: updatePassword } = mutations.useUpdatePassword();

  const verifyEmptyPassword = () => {
    const newPasswordIsNotEmpty = Boolean(newPassword);
    const confirmPasswordIsNotEmpty = Boolean(confirmPassword);
    setNewPasswordError(
      newPasswordIsNotEmpty ? null : FAILURE_MESSAGES.PASSWORD_EMPTY_ERROR,
    );
    setConfirmPasswordError(
      confirmPasswordIsNotEmpty ? null : FAILURE_MESSAGES.PASSWORD_EMPTY_ERROR,
    );

    return newPasswordIsNotEmpty || confirmPasswordIsNotEmpty;
  };

  const onClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleChangePassword = () => {
    // verify there are no empty inputs
    const isValid = verifyEmptyPassword();

    if (isValid) {
      // perform validation when all fields are filled in
      if (currentPassword === newPassword) {
        setNewPasswordError(FAILURE_MESSAGES.PASSWORD_EQUAL_ERROR);
        return;
      }
      if (newPassword !== confirmPassword) {
        setConfirmPasswordError(FAILURE_MESSAGES.PASSWORD_CONFIRM_ERROR);
        return;
      }

      // check password strength for new password
      if (!isPasswordStrong(newPassword)) {
        setNewPasswordError(FAILURE_MESSAGES.PASSWORD_WEAK_ERROR);
        return;
      }

      // perform password update
      updatePassword({
        password: newPassword,
        currentPassword,
      });
    }

    onClose();
  };

  const handleCurrentPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value);
  };
  const handleNewPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
    setNewPasswordError(event.target.value ? null : 'Password is empty');
  };
  const handleConfirmPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError(event.target.value ? null : 'Password is empty');
  };

  return (
    <ScreenLayout title={t('PASSWORD_SETTINGS_TITLE')}>
      <Typography variant="body1">
        {t('PASSWORD_SETTINGS_CONFIRM_INFORMATION')}
      </Typography>
      <Stack spacing={2}>
        <TextField
          required
          label={t('PASSWORD_SETTINGS_CURRENT_LABEL')}
          variant="outlined"
          value={currentPassword}
          onChange={handleCurrentPasswordInput}
          type="password"
          helperText={t('PASSWORD_SETTINGS_CURRENT_INFORMATION')}
        />
        <Stack direction="row" spacing={2}>
          <TextField
            required
            label={t('PASSWORD_SETTINGS_NEW_LABEL')}
            variant="outlined"
            value={newPassword}
            error={Boolean(newPasswordError)}
            helperText={newPasswordError}
            onChange={handleNewPasswordInput}
            type="password"
          />
          <TextField
            required
            label={t('PASSWORD_SETTINGS_NEW_CONFIRM_LABEL')}
            variant="outlined"
            value={confirmPassword}
            error={Boolean(confirmPasswordError)}
            helperText={confirmPasswordError}
            onChange={handleConfirmPasswordInput}
            type="password"
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            disabled
            // TODO: add code to reset password
            // onClick={() => handleChangePassword()}
          >
            {t('PASSWORD_SETTINGS_REQUEST_RESET_BUTTON')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
          >
            {t('PASSWORD_SETTINGS_CONFIRM_BUTTON')}
          </Button>
        </Stack>
      </Stack>
    </ScreenLayout>
  );
};

export default PasswordSettings;
