import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
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
import { MANAGE_ACCOUNT_PATH } from '@/config/paths';
import { hooks, mutations } from '@/config/queryClient';
import {
  MEMBER_PROFILE_ANALYTICS_SWITCH_ID,
  MEMBER_PROFILE_EMAIL_FREQUENCY_ID,
  MEMBER_PROFILE_LANGUAGE_SWITCH_ID,
  PREFERENCES_CLOSE_BUTTON_ID,
  PREFERENCES_SAVE_BUTTON_ID,
} from '@/config/selectors';

import RoundedStack from '../common/RoundedStack';

const EditMemberPreferences = (): JSX.Element | null => {
  const { t } = useAccountTranslation();
  const { t: translateAccount } = useAccountTranslation();
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { mutate: editMember } = mutations.useEditMember();
  const [selectedLang, setSelectedLang] = useState<string>(
    member?.extra?.lang ?? DEFAULT_LANG,
  );
  const [selectedEmailFreq, setSelectedEmailFreq] =
    useState<`${EmailFrequency}`>(
      member?.extra?.emailFreq ?? DEFAULT_EMAIL_FREQUENCY,
    );

  if (member) {
    const handleOnToggle = (event: { target: { checked: boolean } }): void => {
      editMember({
        id: member.id,
        enableSaveActions: event.target.checked,
      });
    };
    const saveSettings = () => {
      editMember({
        id: member.id,
        extra: {
          lang: selectedLang,
          emailFreq: selectedEmailFreq,
        },
      });
    };

    return (
      <Container>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h4" component="h1">
              {translateAccount('MAIN_MENU_SETTINGS')}
            </Typography>
          </Box>
          <Divider />
          <RoundedStack>
            <Typography variant="h4" component="h1">
              {t('PROFILE_PREFERENCES_TITLE')}
            </Typography>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Typography>{t('PROFILE_LANGUAGE_TITLE')}</Typography>
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
                <Typography>{t('PROFILE_EMAIL_FREQUENCY_TITLE')}</Typography>
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
                <Typography>{t('PROFILE_SAVE_ACTIONS_TITLE')}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Tooltip
                  title={translateAccount('SAVE_ACTIONS_TOGGLE_TOOLTIP')}
                >
                  <Switch
                    data-cy={MEMBER_PROFILE_ANALYTICS_SWITCH_ID}
                    onChange={handleOnToggle}
                    checked={member.enableSaveActions}
                    color="primary"
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                component={Link}
                to={MANAGE_ACCOUNT_PATH}
                variant="outlined"
                id={PREFERENCES_CLOSE_BUTTON_ID}
              >
                {t('CLOSE_BUTTON')}
              </Button>
              <Button
                component={Link}
                to={MANAGE_ACCOUNT_PATH}
                variant="contained"
                onClick={saveSettings}
                id={PREFERENCES_SAVE_BUTTON_ID}
              >
                {t('SAVE_CHANGES_TEXT')}
              </Button>
            </Stack>
          </RoundedStack>
        </Stack>
      </Container>
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
