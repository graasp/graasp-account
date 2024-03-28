import { ChangeEvent, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton, Stack, TextField } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';
import {
  USERNAME_CANCEL_BUTTON_ID,
  USERNAME_INPUT_FIELD_ID,
  USERNAME_SAVE_BUTTON_ID,
} from '@/config/selectors';

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 30;

type EditingUserNameFieldProps = {
  name: string;
  onSave: (newValue: string) => void;
  onCancel: () => void;
};

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

const EditingUserNameField = ({
  name,
  onSave,
  onCancel,
}: EditingUserNameFieldProps): JSX.Element => {
  const [newUserName, setNewUserName] = useState(name);
  const { t } = useAccountTranslation();
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
  const handleSave = () => {
    const errorMessage = verifyUsername(newUserName);

    if (!errorMessage) {
      onSave(newUserName.trim());
    }
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <TextField
        id={USERNAME_INPUT_FIELD_ID}
        variant="standard"
        type="text"
        name="username"
        value={newUserName}
        error={Boolean(error)}
        helperText={error}
        onChange={handleChange}
        autoFocus
      />
      <IconButton
        type="reset"
        onClick={onCancel}
        id={USERNAME_CANCEL_BUTTON_ID}
      >
        <CloseIcon />
      </IconButton>
      <IconButton
        id={USERNAME_SAVE_BUTTON_ID}
        onClick={handleSave}
        disabled={Boolean(error)}
      >
        <DoneIcon />
      </IconButton>
    </Stack>
  );
};

export default EditingUserNameField;
