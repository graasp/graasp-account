import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Stack, TextField } from '@mui/material';

import {
  CompleteMember,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
  MemberConstants,
} from '@graasp/sdk';

import { BorderedSection } from '@/components/layout/BorderedSection';
import FormProperty from '@/components/layout/FormProperty';
import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import {
  PERSONAL_INFO_CANCEL_BUTTON_ID,
  PERSONAL_INFO_EDIT_CONTAINER_ID,
  PERSONAL_INFO_INPUT_EMAIL_ID,
  PERSONAL_INFO_INPUT_USERNAME_ID,
  PERSONAL_INFO_SAVE_BUTTON_ID,
} from '@/config/selectors';

import i18n from '~landing/i18next';

const USER_NAME_REGEX = MemberConstants.USERNAME_FORBIDDEN_CHARS_REGEX;

const verifyUsername = (username: string): string | null => {
  const trimmedUsername = username.trim();
  if (trimmedUsername === '') {
    return i18n.t('USERNAME_EMPTY_ERROR', { ns: NS.Account });
  }

  if (
    trimmedUsername.length < MIN_USERNAME_LENGTH ||
    trimmedUsername.length > MAX_USERNAME_LENGTH
  ) {
    return i18n.t(
      'USERNAME_LENGTH_ERROR',
      { ns: NS.Account },
      // {
      //   min: MIN_USERNAME_LENGTH,
      //   max: MAX_USERNAME_LENGTH,
      // },
    );
  }

  if (USER_NAME_REGEX.test(trimmedUsername)) {
    return i18n.t('USERNAME_SPECIAL_CHARACTERS_ERROR', { ns: NS.Account });
  }

  return null;
};

type EditMemberPersonalInformationProp = {
  member: CompleteMember;
  onEmailUpdate: (newEmail: string) => void;
  onClose: () => void;
};

const EditPersonalInformation = ({
  member,
  onEmailUpdate,
  onClose,
}: EditMemberPersonalInformationProp): JSX.Element => {
  const { t } = useTranslation(NS.Account);
  const { t: translateCommon } = useTranslation(NS.Common);
  const { mutate: editMember } = mutations.useEditCurrentMember();
  const { mutate: updateEmail } = mutations.useUpdateMemberEmail();
  const [newUserName, setNewUserName] = useState(member.name);
  const [newEmail, setNewEmail] = useState(member.email);
  const [error, setError] = useState<string | null>();

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
      setError(errorMessage);
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
          {translateCommon('CANCEL.BUTTON_TEXT')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={Boolean(error) || !hasModifications}
          id={PERSONAL_INFO_SAVE_BUTTON_ID}
          size="small"
        >
          {translateCommon('SAVE.BUTTON_TEXT')}
        </Button>
      </Stack>
    </BorderedSection>
  );
};

export default EditPersonalInformation;
