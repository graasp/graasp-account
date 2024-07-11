import { ChangeEvent, useEffect, useState } from 'react';

import { Button, Stack, TextField, Typography } from '@mui/material';

import {
  CompleteMember,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '@graasp/sdk';

import BorderedSection from '@/components/layout/BorderedSection';
import { useAccountTranslation, useCommonTranslation } from '@/config/i18n';
import { mutations } from '@/config/queryClient';
import {
  PERSONAL_INFO_CANCEL_BUTTON_ID,
  PERSONAL_INFO_EDIT_CONTAINER_ID,
  PERSONAL_INFO_INPUT_EMAIL_ID,
  PERSONAL_INFO_INPUT_USERNAME_ID,
  PERSONAL_INFO_SAVE_BUTTON_ID,
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
  member: CompleteMember | null | undefined;
  onEmailUpdate: (newEmail: string) => void;
  onClose: () => void;
};

const EditPersonalInformation = ({
  member,
  onEmailUpdate,
  onClose,
}: EditMemberPersonalInformationProp): JSX.Element | false => {
  const { t } = useAccountTranslation();
  const { t: translateCommon } = useCommonTranslation();
  const { mutate: editMember } = mutations.useEditMember();
  const { mutate: updateEmail } = mutations.useUpdateMemberEmail();
  const [newUserName, setNewUserName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    if (member) {
      if (member.name) {
        setNewUserName(member.name);
      }
      if (member.email) {
        setNewEmail(member.email);
      }
    }
  }, [member]);

  const handleEmailChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const newEmailValue = target.value;
    setNewEmail(newEmailValue);
    onEmailUpdate(newEmailValue);
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setNewUserName(value);
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
      const name = newUserName.trim();
      if (member && name !== member.name) {
        editMember({
          id: member.id,
          name,
        });
      }
    }
    if (newEmail !== member?.email) {
      updateEmail(newEmail);
    }

    onClose();
  };

  const onCancel = () => {
    setNewEmail('');
    // send update to parent
    onEmailUpdate('');
    onClose();
  };

  const hasModifications =
    newUserName !== member?.name || newEmail !== member?.email;

  return (
    <BorderedSection
      id={PERSONAL_INFO_EDIT_CONTAINER_ID}
      title={t('PERSONAL_INFORMATION_TITLE')}
    >
      <Stack direction="row" gap={2} alignItems="center">
        <Typography color="textSecondary">
          {t('PROFILE_MEMBER_NAME')}
        </Typography>
        <TextField
          id={PERSONAL_INFO_INPUT_USERNAME_ID}
          variant="standard"
          type="text"
          name="username"
          value={newUserName}
          error={Boolean(error)}
          helperText={error}
          onChange={handleChange}
        />
      </Stack>
      <Stack direction="row" gap={2} alignItems="center">
        <Typography color="textSecondary">
          {t('PROFILE_EMAIL_TITLE')}
        </Typography>
        <TextField
          id={PERSONAL_INFO_INPUT_EMAIL_ID}
          variant="standard"
          type="text"
          name="email"
          value={newEmail}
          onChange={handleEmailChange}
        />
      </Stack>
      <Stack direction="row" gap={1} justifyContent="flex-end">
        <Button
          onClick={onCancel}
          variant="outlined"
          id={PERSONAL_INFO_CANCEL_BUTTON_ID}
          size="small"
        >
          {translateCommon('CANCEL_BUTTON')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={Boolean(error) || !hasModifications}
          id={PERSONAL_INFO_SAVE_BUTTON_ID}
          size="small"
        >
          {translateCommon('SAVE_BUTTON')}
        </Button>
      </Stack>
    </BorderedSection>
  );
};

export default EditPersonalInformation;
