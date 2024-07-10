import { useState } from 'react';

import { Button } from '@mui/material';

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

const MemberPreferences = (): JSX.Element => {
  const { data: member } = hooks.useCurrentMember();
  const languageCode = (member?.extra?.lang ??
    DEFAULT_LANG) as keyof typeof langs;
  const languageName = langs[languageCode];

  const { t } = useAccountTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return <EditMemberPreferences onClose={handleClose} />;
  }
  return (
    <BorderedSection
      title={t('PROFILE_PREFERENCES_TITLE')}
      topActions={[
        <Button
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

export default MemberPreferences;
