import { ChangeEvent, useState } from 'react';

import {
  Button,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import { MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH, Member } from '@graasp/sdk';

import RoundedStack from '@/components/common/RoundedStack';
import { useAccountTranslation } from '@/config/i18n';
import { mutations } from '@/config/queryClient';
import {
  PERSONAL_INFO_CANCEL_BUTTON_ID,
  PERSONAL_INFO_SAVE_BUTTON_ID,
  USERNAME_INPUT_FIELD_ID,
} from '@/config/selectors';

const verifyUsername = (username: string): string | null => {
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

type EditMemberPersonalInformationProp = {
  member: Member;
  onClose: () => void;
};

const EditMemberPersonalInformation = ({
  member,
  onClose,
}: EditMemberPersonalInformationProp): JSX.Element | false => {
  const { t } = useAccountTranslation();
  const { mutate: editMember } = mutations.useEditMember();
  const [newUserName, setNewUserName] = useState(member.name);
  const [error, setError] = useState<string | null>();
  const [hasModifications, setHasModifications] = useState(false);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setNewUserName(value);
    setHasModifications(value !== member.name);
    const errorMessage = verifyUsername(value);
    if (errorMessage) {
      setError(
        t(errorMessage, {
          min: MIN_USERNAME_LENGTH,
          max: MAX_USERNAME_LENGTH,
        }),
      );
    } else {
      setError(null);
    }
  };

  // save changes
  const handleSave = () => {
    const errorMessage = verifyUsername(newUserName ?? '');

    if (!errorMessage) {
      if (member) {
        editMember({
          id: member.id,
          name: newUserName.trim(),
        });
      }
    }

    onClose();
  };

  return (
    <RoundedStack>
      <Typography variant="h5" component="h1">
        {t('PERSONAL_INFORMATION_TITLE')}
      </Typography>

      <Grid container alignItems="center">
        <Grid item xs={4}>
          <Typography color="textSecondary">
            {t('PROFILE_MEMBER_NAME')}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            id={USERNAME_INPUT_FIELD_ID}
            variant="standard"
            type="text"
            name="username"
            value={newUserName}
            error={Boolean(error)}
            helperText={error}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <Typography color="textSecondary">
            {t('PROFILE_EMAIL_TITLE')}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Tooltip title={t('EDIT_EMAIL_TOOLTIP')}>
            <TextField
              variant="standard"
              type="text"
              name="email"
              value={member.email}
              disabled
            />
          </Tooltip>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          onClick={onClose}
          variant="outlined"
          id={PERSONAL_INFO_CANCEL_BUTTON_ID}
          size="small"
        >
          {t('CLOSE_BUTTON')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={Boolean(error) || !hasModifications}
          id={PERSONAL_INFO_SAVE_BUTTON_ID}
          size="small"
        >
          {t('SAVE_CHANGES_TEXT')}
        </Button>
      </Stack>
    </RoundedStack>
  );
};

export default EditMemberPersonalInformation;
