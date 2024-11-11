import { useState } from 'react';

import { Button } from '@mui/material';

import { AccountType } from '@graasp/sdk';
import { DEFAULT_LANG, langs } from '@graasp/translations';

import BorderedSection from '@/components/layout/BorderedSection';
import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import {
  PREFERENCES_ANALYTICS_SWITCH_ID,
  PREFERENCES_EDIT_BUTTON_ID,
  PREFERENCES_EMAIL_FREQUENCY_ID,
  PREFERENCES_LANGUAGE_DISPLAY_ID,
} from '@/config/selectors';
import { ACCOUNT } from '@/langs/constants';

import { SettingItem } from '~account/common/SettingItem';

import { EditPreferences } from './EditPreferences';

export const Preferences = (): JSX.Element | null => {
  const { data: member } = hooks.useCurrentMember();

  const { t } = useAccountTranslation();
  const [isEditing, setIsEditing] = useState(false);

  // in case there is no member or they are not of the individual type, we render nothing
  if (!member || member?.type !== AccountType.Individual) {
    return null;
  }

  const languageCode = (member.extra?.lang ??
    DEFAULT_LANG) as keyof typeof langs;
  const languageName = langs[languageCode];

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return <EditPreferences member={member} onClose={handleClose} />;
  }
  return (
    <BorderedSection
      title={t(ACCOUNT.PROFILE_PREFERENCES_TITLE)}
      topActions={[
        <Button
          key="edit"
          variant="contained"
          onClick={handleEditClick}
          id={PREFERENCES_EDIT_BUTTON_ID}
          size="small"
        >
          {t(ACCOUNT.EDIT_BUTTON_LABEL)}
        </Button>,
      ]}
    >
      <SettingItem
        title={t(ACCOUNT.PROFILE_LANGUAGE_TITLE)}
        content={languageName}
        contentId={PREFERENCES_LANGUAGE_DISPLAY_ID}
      />
      <SettingItem
        title={t(ACCOUNT.PROFILE_EMAIL_FREQUENCY_TITLE)}
        content={
          member.extra?.emailFreq === 'always'
            ? t(ACCOUNT.ALWAYS_RECEIVE_EMAILS)
            : t(ACCOUNT.DISABLE_EMAILS)
        }
        contentId={PREFERENCES_EMAIL_FREQUENCY_ID}
      />
      <SettingItem
        title={t(ACCOUNT.PROFILE_SAVE_ACTIONS_TITLE)}
        content={
          member.enableSaveActions
            ? t(ACCOUNT.PROFILE_SAVE_ACTIONS_ENABLED)
            : t(ACCOUNT.PROFILE_SAVE_ACTIONS_DISABLED)
        }
        contentId={PREFERENCES_ANALYTICS_SWITCH_ID}
      />
    </BorderedSection>
  );
};
