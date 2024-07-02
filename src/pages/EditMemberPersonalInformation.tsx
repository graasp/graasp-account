import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Alert,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
  isPasswordStrong,
} from '@graasp/sdk';
import { FAILURE_MESSAGES } from '@graasp/translations';
import { Loader } from '@graasp/ui';

import RoundedStack from '@/components/common/RoundedStack';
import { useAccountTranslation } from '@/config/i18n';
import { PROFILE_PATH } from '@/config/paths';
import { hooks, mutations } from '@/config/queryClient';
import { USERNAME_INPUT_FIELD_ID } from '@/config/selectors';

const verifyUsername = (username: string) => {
  const trimmedUsername = username.trim();
  if (trimmedUsername === '') {
    return 'USERNAME_EMPTY_ERROR';
  }

  if (
    trimmedUsername.length < MIN_USERNAME_LENGTH ||
    trimmedUsername.length > MAX_USERNAME_LENGTH
  ) {
    return 'USERNAME_LENGTH_ERROR';
  }
  return null;
};

const EditMemberPersonalInformation = (): JSX.Element | false => {
  const { t } = useAccountTranslation();
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { mutate: editMember } = mutations.useEditMember();
  const [newUserName, setNewUserName] = useState(member?.name);
  const [error, setError] = useState<string | null>();
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setNewUserName(value);
    const errorMessage = verifyUsername(value);
    setError(
      errorMessage
        ? t(errorMessage, {
            min: MIN_USERNAME_LENGTH,
            max: MAX_USERNAME_LENGTH,
          })
        : null,
    );
  };

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

  // const handleChangePassword = () => {};

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

  // save changes
  const handleSave = () => {
    const errorMessage = verifyUsername(newUserName ?? '');

    if (!errorMessage) {
      if (member) {
        editMember({
          id: member?.id,
          name: newUserName?.trim(),
        });
      }
    }
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

  if (member) {
    return (
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <Typography variant="h2" component="h1">
            {t('PROFILE_TITLE')}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <RoundedStack>
            <Typography variant="h5" component="h1">
              {t('PERSONAL_INFORMATION_TITLE')}
            </Typography>

            <TextField
              label={t('PROFILE_MEMBER_NAME')}
              id={USERNAME_INPUT_FIELD_ID}
              variant="outlined"
              type="text"
              name="username"
              value={newUserName}
              error={Boolean(error)}
              helperText={error}
              onChange={handleChange}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label={t('PASSWORD_SETTINGS_CURRENT_LABEL')}
                required
                variant="outlined"
                value={currentPassword}
                onChange={handleCurrentPasswordInput}
                type="password"
              />
            </Stack>
            <Typography variant="body1">
              {t('PASSWORD_SETTINGS_CONFIRM_INFORMATION')}
            </Typography>
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

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button component={Link} to={PROFILE_PATH} variant="outlined">
                {t('CLOSE_BUTTON')}
              </Button>
              <Button variant="contained" color="primary" onClick={handleSave}>
                {t('PASSWORD_SETTINGS_CONFIRM_BUTTON')}
              </Button>
            </Stack>
          </RoundedStack>
        </Stack>
      </Container>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!member) {
    return <Alert severity="error">{t('User is not unauthenticated')}</Alert>;
  }

  return false;
};

export default EditMemberPersonalInformation;
