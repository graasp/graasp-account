import { ChangeEvent, useState } from 'react';

import { Box, Button, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

import { isPasswordStrong } from '@graasp/sdk';
import { FAILURE_MESSAGES } from '@graasp/translations';

import BorderedSection from '@/components/layout/BorderedSection';
import { useAccountTranslation, useCommonTranslation } from '@/config/i18n';
import { mutations } from '@/config/queryClient';
import {
  PASSWORD_EDIT_CONTAINER_ID,
  PASSWORD_INPUT_CONFIRM_PASSWORD_ID,
  PASSWORD_INPUT_NEW_PASSWORD_ID,
  PASSWORD_SAVE_BUTTON_ID,
} from '@/config/selectors';

type EditPasswordProps = {
  onClose: () => void;
};

const EditPassword = ({ onClose }: EditPasswordProps): JSX.Element => {
  const { t } = useAccountTranslation();
  const { t: translateCommon } = useCommonTranslation();

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

      // perform password update
      updatePassword({
        password: newPassword,
        currentPassword,
      });
    }
    onClose();
  };

  const handleCurrentPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    const passwordTarget = event.target.value;
    setCurrentPassword(passwordTarget);
  };

  const handleNewPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newPasswordTarget = event.target.value;
    setNewPassword(newPasswordTarget);

    if (!newPasswordTarget) {
      setNewPasswordError(FAILURE_MESSAGES.PASSWORD_EMPTY_ERROR);
    } else if (!isPasswordStrong(newPasswordTarget)) {
      setNewPasswordError(FAILURE_MESSAGES.PASSWORD_WEAK_ERROR);
    } else {
      setNewPasswordError(null);
    }
  };
  const handleConfirmPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    const confirmPasswordTarget = event.target.value;
    setConfirmPassword(confirmPasswordTarget);

    setConfirmPasswordError(confirmPasswordTarget ? null : 'Password is empty');
  };

  const hasChanged =
    newPasswordError === null && newPassword === confirmPassword;

  return (
    <BorderedSection
      id={PASSWORD_EDIT_CONTAINER_ID}
      title={t('PASSWORD_SETTINGS_TITLE')}
    >
      <Typography variant="body1">
        {t('PASSWORD_SETTINGS_CONFIRM_INFORMATION')}
      </Typography>
      <Stack spacing={2}>
        <Box>
          <TextField
            required
            label={t('PASSWORD_SETTINGS_CURRENT_LABEL')}
            variant="outlined"
            size="small"
            value={currentPassword}
            onChange={handleCurrentPasswordInput}
            type="password"
          />
          <Typography variant="subtitle2">
            {t('PASSWORD_SETTINGS_CURRENT_INFORMATION')}
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <TextField
            required
            label={t('PASSWORD_SETTINGS_NEW_LABEL')}
            variant="outlined"
            size="small"
            value={newPassword}
            error={Boolean(newPasswordError)}
            helperText={newPasswordError}
            onChange={handleNewPasswordInput}
            type="password"
            id={PASSWORD_INPUT_NEW_PASSWORD_ID}
          />
          <TextField
            required
            label={t('PASSWORD_SETTINGS_NEW_CONFIRM_LABEL')}
            variant="outlined"
            size="small"
            value={confirmPassword}
            error={Boolean(confirmPasswordError)}
            helperText={confirmPasswordError}
            onChange={handleConfirmPasswordInput}
            type="password"
            id={PASSWORD_INPUT_CONFIRM_PASSWORD_ID}
          />
        </Stack>
      </Stack>
      <Stack direction="row" gap={1} justifyContent="flex-end">
        <Button variant="outlined" onClick={onClose} size="small">
          {translateCommon('CANCEL_BUTTON')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleChangePassword}
          id={PASSWORD_SAVE_BUTTON_ID}
          disabled={Boolean(newPasswordError) || !hasChanged}
          size="small"
        >
          {translateCommon('SAVE_BUTTON')}
        </Button>
      </Stack>
    </BorderedSection>
  );
};

export default EditPassword;
