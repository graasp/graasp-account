import { ChangeEvent, useEffect, useState } from 'react';

import { Button, Stack, TextField } from '@mui/material';

import {
  CompleteMember,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '@graasp/sdk';

import BorderedSection from '@/components/layout/BorderedSection';
import FormProperty from '@/components/layout/FormProperty';
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
}: EditMemberPersonalInformationProp): JSX.Element => {
  const { t } = useAccountTranslation();
  const { t: translateCommon } = useCommonTranslation();
  const { mutate: editMember } = mutations.useEditCurrentMember();
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
      <FormProperty title={t('PROFILE_MEMBER_NAME')}>
        <TextField
          id={PERSONAL_INFO_INPUT_USERNAME_ID}
          variant="outlined"
          size="small"
          type="text"
          name="username"
          value={newUserName}
          error={Boolean(error)}
          helperText={error}
          fullWidth
          onChange={handleChange}
        />
      </FormProperty>
      <FormProperty title={t('PROFILE_EMAIL_TITLE')}>
        <TextField
          id={PERSONAL_INFO_INPUT_EMAIL_ID}
          variant="outlined"
          size="small"
          type="text"
          name="email"
          value={newEmail}
          fullWidth
          onChange={handleEmailChange}
        />
      </FormProperty>
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
