import { useState } from 'react';

import {
  Alert,
  Button,
  Grid,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';

import { EmailFrequency } from '@graasp/sdk';
import { DEFAULT_LANG } from '@graasp/translations';
import { Loader } from '@graasp/ui';

import EmailPreferenceSwitch from '@/components/main/EmailPreferenceSwitch';
import LanguageSwitch from '@/components/main/LanguageSwitch';
import { DEFAULT_EMAIL_FREQUENCY } from '@/config/constants';
import { useAccountTranslation } from '@/config/i18n';
import { hooks, mutations } from '@/config/queryClient';
import {
  MEMBER_PROFILE_ANALYTICS_SWITCH_ID,
  MEMBER_PROFILE_EMAIL_FREQUENCY_ID,
  MEMBER_PROFILE_LANGUAGE_SWITCH_ID,
  PREFERENCES_CLOSE_BUTTON_ID,
  PREFERENCES_SAVE_BUTTON_ID,
} from '@/config/selectors';

type EditPreferencesProp = {
  onCancel: () => void;
};
const EditMemberPreferences = ({
  onCancel,
}: EditPreferencesProp): JSX.Element | null => {
  const { t } = useAccountTranslation();
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { mutate: editMember } = mutations.useEditMember();
  const [selectedLang, setSelectedLang] = useState<string>(
    member?.extra?.lang ?? DEFAULT_LANG,
  );
  const [selectedEmailFreq, setSelectedEmailFreq] =
    useState<`${EmailFrequency}`>(
      member?.extra?.emailFreq ?? DEFAULT_EMAIL_FREQUENCY,
    );
  const [switchedSaveActions, setSwitchedSaveActions] = useState(
    member?.enableSaveActions,
  );

  if (member) {
    const handleOnToggle = (event: { target: { checked: boolean } }): void => {
      const cheked = event.target.checked;
      setSwitchedSaveActions(cheked);
    };
    const saveSettings = () => {
      editMember({
        id: member.id,
        extra: {
          lang: selectedLang,
          emailFreq: selectedEmailFreq,
        },
        enableSaveActions: switchedSaveActions,
      });
      onCancel();
    };

    return (
      <Stack id="editMemberPreferencesFormId">
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">{t('PROFILE_PREFERENCES_TITLE')}</Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              onClick={onCancel}
              variant="outlined"
              id={PREFERENCES_CLOSE_BUTTON_ID}
            >
              {t('CLOSE_BUTTON')}
            </Button>
            <Button
              variant="contained"
              onClick={saveSettings}
              id={PREFERENCES_SAVE_BUTTON_ID}
            >
              {t('SAVE_CHANGES_TEXT')}
            </Button>
          </Stack>
        </Stack>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography color="textSecondary">
              {t('PROFILE_LANGUAGE_TITLE')}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <LanguageSwitch
              lang={member.extra?.lang ?? DEFAULT_LANG}
              id={MEMBER_PROFILE_LANGUAGE_SWITCH_ID}
              onChange={setSelectedLang}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography color="textSecondary">
              {t('PROFILE_EMAIL_FREQUENCY_TITLE')}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <EmailPreferenceSwitch
              emailFreq={member.extra?.emailFreq || DEFAULT_EMAIL_FREQUENCY}
              onChange={setSelectedEmailFreq}
              id={MEMBER_PROFILE_EMAIL_FREQUENCY_ID}
            />
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography color="textSecondary">
              {t('PROFILE_SAVE_ACTIONS_TITLE')}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Tooltip title={t('SAVE_ACTIONS_TOGGLE_TOOLTIP')}>
              <Switch
                data-cy={MEMBER_PROFILE_ANALYTICS_SWITCH_ID}
                onChange={handleOnToggle}
                checked={switchedSaveActions}
                color="primary"
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Stack>
    );
  }
  if (isLoading) {
    return <Loader />;
  }

  if (!member) {
    return <Alert severity="error">{t('User is not unauthenticated')}</Alert>;
  }

  return null;
};

export default EditMemberPreferences;
