import { ChangeEvent, useState } from 'react';

import { Alert, Button, Stack, TextField, Typography } from '@mui/material';

import { MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from '@graasp/sdk';
import { Loader } from '@graasp/ui';

import RoundedStack from '@/components/common/RoundedStack';
import { useAccountTranslation } from '@/config/i18n';
import { hooks, mutations } from '@/config/queryClient';
import {
  PERSONAL_INFO_EDIT_CANCEL_BUTTON_ID,
  PERSONAL_INFO_EDIT_SAVE_BUTTON_ID,
  USERNAME_INPUT_FIELD_ID,
} from '@/config/selectors';

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
type onCloseProp = {
  onClose: () => void;
};

const EditMemberPersonalInformation = ({
  onClose,
}: onCloseProp): JSX.Element | false => {
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

    onClose();
  };

  if (member) {
    return (
      <RoundedStack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5" component="h1">
            {t('PERSONAL_INFORMATION_TITLE')}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              onClick={onClose}
              variant="outlined"
              id={PERSONAL_INFO_EDIT_CANCEL_BUTTON_ID}
            >
              {t('CLOSE_BUTTON')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={Boolean(error)}
              id={PERSONAL_INFO_EDIT_SAVE_BUTTON_ID}
            >
              {' '}
              {t('SAVE_CHANGES_TEXT')}
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={2}>
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
          <TextField
            label={t('PROFILE_EMAIL_TITLE')}
            variant="outlined"
            type="text"
            name="email"
            value={member.email}
            disabled
          />
        </Stack>
      </RoundedStack>
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
