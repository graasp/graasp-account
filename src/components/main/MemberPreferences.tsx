import { useState } from 'react';

import { Button } from '@mui/material';

import { AccountType } from '@graasp/sdk';
import { DEFAULT_LANG, langs } from '@graasp/translations';

import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import {
  PREFERENCES_ANALYTICS_SWITCH_ID,
  PREFERENCES_EDIT_BUTTON_ID,
  PREFERENCES_EMAIL_FREQUENCY_ID,
  PREFERENCES_LANGUAGE_DISPLAY_ID,
} from '@/config/selectors';

import BorderedSection from '../layout/BorderedSection';
import EditMemberPreferences from './EditMemberPreferences';
import MemberProfileItem from './MemberProfileItem';

export const MemberPreferences = (): JSX.Element | null => {
  const { data: member } = hooks.useCurrentMember();

  const { t } = useAccountTranslation();
  const [isEditing, setIsEditing] = useState(false);

  // in case there is no member or they are not of the individual type, we render nothing
  if (!member || member?.type !== AccountType.Individual) {
    return null;
  }

  const languageCode = (member?.extra?.lang ??
    DEFAULT_LANG) as keyof typeof langs;
  const languageName = langs[languageCode];

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return <EditMemberPreferences member={member} onClose={handleClose} />;
  }
  return (
    <BorderedSection
      title={t('PROFILE_PREFERENCES_TITLE')}
      topActions={[
        <Button
          key="edit"
          variant="contained"
          onClick={handleEditClick}
          id={PREFERENCES_EDIT_BUTTON_ID}
          size="small"
        >
          {t('EDIT_BUTTON_LABEL')}
        </Button>,
      ]}
    >
      <MemberProfileItem
        title={t('PROFILE_LANGUAGE_TITLE')}
        content={languageName}
        contentId={PREFERENCES_LANGUAGE_DISPLAY_ID}
      />
      <MemberProfileItem
        title={t('PROFILE_EMAIL_FREQUENCY_TITLE')}
        content={
          member?.extra?.emailFreq === 'always'
            ? t('ALWAYS_RECEIVE_EMAILS')
            : t('DISABLE_EMAILS')
        }
        contentId={PREFERENCES_EMAIL_FREQUENCY_ID}
      />
      <MemberProfileItem
        title={t('PROFILE_SAVE_ACTIONS_TITLE')}
        content={t(
          `PROFILE_SAVE_ACTIONS_VALUE_${member?.enableSaveActions?.toString().toUpperCase()}`,
        )}
        contentId={PREFERENCES_ANALYTICS_SWITCH_ID}
      />
    </BorderedSection>
  );
};
