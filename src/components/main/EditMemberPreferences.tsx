import { useState } from 'react';

import { Button, Stack, Switch, Tooltip } from '@mui/material';

import { CompleteMember } from '@graasp/sdk';
import { DEFAULT_LANG } from '@graasp/translations';

import EmailPreferenceSwitch from '@/components/main/EmailPreferenceSwitch';
import LanguageSwitch from '@/components/main/LanguageSwitch';
import { DEFAULT_EMAIL_FREQUENCY } from '@/config/constants';
import { useAccountTranslation, useCommonTranslation } from '@/config/i18n';
import { mutations } from '@/config/queryClient';
import {
  PREFERENCES_ANALYTICS_SWITCH_ID,
  PREFERENCES_CANCEL_BUTTON_ID,
  PREFERENCES_EDIT_CONTAINER_ID,
  PREFERENCES_EMAIL_FREQUENCY_ID,
  PREFERENCES_LANGUAGE_SWITCH_ID,
  PREFERENCES_SAVE_BUTTON_ID,
} from '@/config/selectors';
import { ACCOUNT } from '@/langs/constants';

import BorderedSection from '../layout/BorderedSection';
import FormProperty from '../layout/FormProperty';

type EditPreferencesProp = {
  member: CompleteMember;
  onClose: () => void;
};
const EditMemberPreferences = ({
  member,
  onClose,
}: EditPreferencesProp): JSX.Element => {
  const { t } = useAccountTranslation();
  const { t: translateCommon } = useCommonTranslation();
  const { mutate: editMember } = mutations.useEditCurrentMember();

  const memberLang = member?.extra?.lang ?? DEFAULT_LANG;
  const memberEmailFreq = member?.extra?.emailFreq ?? DEFAULT_EMAIL_FREQUENCY;
  const memberSaveActions = member?.enableSaveActions ?? true;

  const [selectedLang, setSelectedLang] = useState<string>(memberLang);
  const [selectedEmailFreq, setSelectedEmailFreq] = useState(memberEmailFreq);
  const [switchedSaveActions, setSwitchedSaveActions] =
    useState(memberSaveActions);

  const handleOnToggle = (event: { target: { checked: boolean } }): void => {
    const { checked } = event.target;
    setSwitchedSaveActions(checked);
  };
  const saveSettings = () => {
    editMember({
      extra: {
        lang: selectedLang,
        emailFreq: selectedEmailFreq,
      },
      enableSaveActions: switchedSaveActions,
    });
    onClose();
  };

  const hasChanges =
    selectedLang !== memberLang ||
    selectedEmailFreq !== memberEmailFreq ||
    switchedSaveActions !== memberSaveActions;

  return (
    <BorderedSection
      id={PREFERENCES_EDIT_CONTAINER_ID}
      title={t(ACCOUNT.PROFILE_PREFERENCES_TITLE)}
    >
      <FormProperty title={t(ACCOUNT.PROFILE_LANGUAGE_TITLE)}>
        <LanguageSwitch
          lang={selectedLang}
          id={PREFERENCES_LANGUAGE_SWITCH_ID}
          onChange={setSelectedLang}
        />
      </FormProperty>
      <FormProperty title={t(ACCOUNT.PROFILE_EMAIL_FREQUENCY_TITLE)}>
        <EmailPreferenceSwitch
          emailFreq={member.extra?.emailFreq || DEFAULT_EMAIL_FREQUENCY}
          onChange={setSelectedEmailFreq}
          id={PREFERENCES_EMAIL_FREQUENCY_ID}
        />
      </FormProperty>
      <FormProperty title={t(ACCOUNT.PROFILE_SAVE_ACTIONS_TITLE)}>
        <Tooltip title={t(ACCOUNT.SAVE_ACTIONS_TOGGLE_TOOLTIP)}>
          <Switch
            id={PREFERENCES_ANALYTICS_SWITCH_ID}
            onChange={handleOnToggle}
            checked={switchedSaveActions}
            color="primary"
          />
        </Tooltip>
      </FormProperty>
      <Stack direction="row" gap={2} justifyContent="flex-end">
        <Button
          onClick={onClose}
          variant="outlined"
          id={PREFERENCES_CANCEL_BUTTON_ID}
          size="small"
        >
          {translateCommon('CANCEL_BUTTON')}
        </Button>
        <Button
          variant="contained"
          onClick={saveSettings}
          id={PREFERENCES_SAVE_BUTTON_ID}
          disabled={!hasChanges}
          size="small"
        >
          {translateCommon('SAVE_BUTTON')}
        </Button>
      </Stack>
    </BorderedSection>
  );
};

export default EditMemberPreferences;
