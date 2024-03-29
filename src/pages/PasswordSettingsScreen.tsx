import React, { ChangeEvent, useState } from 'react';

import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { isPasswordStrong } from '@graasp/sdk';
import { FAILURE_MESSAGES } from '@graasp/translations';

import Main from '@/components/main/Main';
import { useAccountTranslation } from '@/config/i18n';
import { mutations } from '@/config/queryClient';

const PasswordSettings = (): JSX.Element => {
  const { t: translateAccount } = useAccountTranslation();

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
        return setNewPasswordError(FAILURE_MESSAGES.PASSWORD_EQUAL_ERROR);
      }
      if (newPassword !== confirmPassword) {
        return setConfirmPasswordError(FAILURE_MESSAGES.PASSWORD_CONFIRM_ERROR);
      }

      // check password strength for new password
      if (!isPasswordStrong(newPassword)) {
        return setNewPasswordError(FAILURE_MESSAGES.PASSWORD_WEAK_ERROR);
      }

      // perform password update
      updatePassword({
        password: newPassword,
        currentPassword,
      });
    }

    return onClose();
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
    <Main>
      <Grid container spacing={1} direction="column">
        <Grid item xs={12}>
          <Typography variant="h4" component="h1">
            {translateAccount('PASSWORD_SETTINGS_TITLE')}
          </Typography>
          <Typography variant="body1">
            {translateAccount('PASSWORD_SETTINGS_CONFIRM_INFORMATION')}
          </Typography>
        </Grid>
        <Grid container spacing={2} my={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              label={translateAccount('PASSWORD_SETTINGS_CURRENT_LABEL')}
              variant="outlined"
              value={currentPassword}
              onChange={handleCurrentPasswordInput}
              type="password"
            />
            <Typography variant="subtitle2">
              {translateAccount('PASSWORD_SETTINGS_CURRENT_INFORMATION')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label={translateAccount('PASSWORD_SETTINGS_NEW_LABEL')}
              variant="outlined"
              value={newPassword}
              error={Boolean(newPasswordError)}
              helperText={newPasswordError}
              onChange={handleNewPasswordInput}
              type="password"
              sx={{ mr: 2 }}
            />
            <TextField
              required
              label={translateAccount('PASSWORD_SETTINGS_NEW_CONFIRM_LABEL')}
              variant="outlined"
              value={confirmPassword}
              error={Boolean(confirmPasswordError)}
              helperText={confirmPasswordError}
              onChange={handleConfirmPasswordInput}
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              disabled
              sx={{ mr: 2 }}
              // TO DO:
              // onClick={() => handleChangePassword()}
            >
              {translateAccount('PASSWORD_SETTINGS_REQUEST_RESET_BUTTON')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleChangePassword()}
              sx={{ my: 1 }}
            >
              {translateAccount('PASSWORD_SETTINGS_CONFIRM_BUTTON')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Main>
  );
};

export default PasswordSettings;
