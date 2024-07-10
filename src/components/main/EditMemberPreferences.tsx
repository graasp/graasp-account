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
import { useAccountTranslation, useCommonTranslation } from '@/config/i18n';
import { hooks, mutations } from '@/config/queryClient';
import {
  PREFERENCES_ANALYTICS_SWITCH_ID,
  PREFERENCES_CANCEL_BUTTON_ID,
  PREFERENCES_EDIT_CONTAINER_ID,
  PREFERENCES_EMAIL_FREQUENCY_ID,
  PREFERENCES_LANGUAGE_SWITCH_ID,
  PREFERENCES_SAVE_BUTTON_ID,
} from '@/config/selectors';

import BorderedSection from '../layout/BorderedSection';

type EditPreferencesProp = {
  onClose: () => void;
};
const EditMemberPreferences = ({
  onClose,
}: EditPreferencesProp): JSX.Element | null => {
  const { t } = useAccountTranslation();
  const { t: translateCommon } = useCommonTranslation();
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
      const { checked } = event.target;
      setSwitchedSaveActions(checked);
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
      onClose();
    };

    return (
      <BorderedSection
        id={PREFERENCES_EDIT_CONTAINER_ID}
        title={t('PROFILE_PREFERENCES_TITLE')}
      >
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <Typography color="textSecondary">
              {t('PROFILE_LANGUAGE_TITLE')}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <LanguageSwitch
              lang={member.extra?.lang ?? DEFAULT_LANG}
              id={PREFERENCES_LANGUAGE_SWITCH_ID}
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
              id={PREFERENCES_EMAIL_FREQUENCY_ID}
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
                id={PREFERENCES_ANALYTICS_SWITCH_ID}
                onChange={handleOnToggle}
                checked={switchedSaveActions}
                color="primary"
              />
            </Tooltip>
          </Grid>
        </Grid>
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
            size="small"
          >
            {translateCommon('SAVE_BUTTON')}
          </Button>
        </Stack>
      </BorderedSection>
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
