import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Stack, Typography } from '@mui/material';

import { DEFAULT_LANG, langs } from '@graasp/translations';

import { DEFAULT_EMAIL_FREQUENCY } from '@/config/constants';
import { useAccountTranslation } from '@/config/i18n';
import { EDIT_MEMBER_PREFERENCES } from '@/config/paths';
import { hooks } from '@/config/queryClient';
import {
  MEMBER_PROFILE_ANALYTICS_SWITCH_ID,
  MEMBER_PROFILE_EMAIL_ID,
  MEMBER_PROFILE_LANGUAGE_SWITCH_ID,
} from '@/config/selectors';

import RoundedStack from '../common/RoundedStack';
import MemberProfileItem from './MemberProfileItem';

const MemberPreferences = (): JSX.Element => {
  const { data: member } = hooks.useCurrentMember();
  const languageCode = (member?.extra?.lang ??
    DEFAULT_LANG) as keyof typeof langs;
  const languageName = langs[languageCode];

  const { t } = useAccountTranslation();
  return (
    <RoundedStack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">{t('PROFILE_PREFERENCES_TITLE')}</Typography>
        <Button
          component={Link}
          to={EDIT_MEMBER_PREFERENCES}
          variant="contained"
        >
          {t('EDIT_BUTTON_LABEL')}
        </Button>
      </Stack>

      <MemberProfileItem
        title={t('PROFILE_LANGUAGE_TITLE')}
        content={languageName}
        contentId={MEMBER_PROFILE_LANGUAGE_SWITCH_ID}
      />
      {member?.extra?.emailFreq === 'always' ? (
        <MemberProfileItem
          title={t('PROFILE_EMAIL_FREQUENCY_TITLE')}
          content={t('ALWAYS_RECEIVE_EMAILS') || DEFAULT_EMAIL_FREQUENCY}
          contentId={MEMBER_PROFILE_EMAIL_ID}
        />
      ) : (
        <MemberProfileItem
          title={t('PROFILE_EMAIL_FREQUENCY_TITLE')}
          content={t('DISABLE_EMAILS')}
          contentId={MEMBER_PROFILE_EMAIL_ID}
        />
      )}

      <MemberProfileItem
        title={t('PROFILE_SAVE_ACTIONS_TITLE')}
        contentId={MEMBER_PROFILE_ANALYTICS_SWITCH_ID}
      />
    </RoundedStack>
  );
};

export default MemberPreferences;
