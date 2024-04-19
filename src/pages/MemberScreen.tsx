import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
  Alert,
  Box,
  Grid,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';

import { formatDate } from '@graasp/sdk';
import { DEFAULT_LANG } from '@graasp/translations';
import { Loader } from '@graasp/ui';

import EmailPreferenceSwitch from '@/components/main/EmailPreferenceSwitch';
import LanguageSwitch from '@/components/main/LanguageSwitch';
import UsernameForm from '@/components/main/UsernameForm';
import { DEFAULT_EMAIL_FREQUENCY } from '@/config/constants';
import { useAccountTranslation } from '@/config/i18n';
import notifier from '@/config/notifier';
import { hooks, mutations } from '@/config/queryClient';
import { MEMBER_PROFILE_ANALYTICS_SWITCH_ID } from '@/config/selectors';
import { COPY_MEMBER_ID_TO_CLIPBOARD } from '@/types/clipboard';
import { copyToClipboard } from '@/utils/clipboard';

const MemberProfileScreen = (): JSX.Element | null => {
  const { t, i18n } = useAccountTranslation();
  const { t: translateAccount } = useAccountTranslation();
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { mutate: editMember } = mutations.useEditMember();

  if (member) {
    const copyIdToClipboard = () => {
      copyToClipboard(member.id, {
        onSuccess: () => {
          notifier({ type: COPY_MEMBER_ID_TO_CLIPBOARD.SUCCESS, payload: {} });
        },
        onError: () => {
          notifier({ type: COPY_MEMBER_ID_TO_CLIPBOARD.FAILURE, payload: {} });
        },
      });
    };

    const handleOnToggle = (event: { target: { checked: boolean } }): void => {
      editMember({
        id: member.id,
        enableSaveActions: event.target.checked,
      });
    };

    return (
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" component="h1">
            {t('PROFILE_TITLE')}
          </Typography>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              {t('PROFILE_MEMBER_NAME')}
            </Grid>
            <Grid item xs={8}>
              <UsernameForm member={member} />
            </Grid>
          </Grid>

          {/* todo: display only as light user */}

          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Typography>{t('PROFILE_MEMBER_ID_TITLE')}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {member.id}
                <IconButton onClick={copyIdToClipboard}>
                  <FileCopyIcon />
                </IconButton>
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Typography>{t('PROFILE_EMAIL_TITLE')}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{member.email}</Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Typography>{t('PROFILE_CREATED_AT_TITLE')}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {formatDate(member.createdAt, { locale: i18n.language })}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Typography>{t('PROFILE_LANGUAGE_TITLE')}</Typography>
            </Grid>
            <Grid item xs={8}>
              <LanguageSwitch
                memberId={member.id}
                lang={member.extra?.lang ?? DEFAULT_LANG}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Typography>{t('PROFILE_EMAIL_FREQUENCY_TITLE')}</Typography>
            </Grid>
            <Grid item xs={8}>
              <EmailPreferenceSwitch
                memberId={member.id}
                emailFreq={member.extra?.emailFreq || DEFAULT_EMAIL_FREQUENCY}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Typography>{t('PROFILE_SAVE_ACTIONS_TITLE')}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Tooltip title={translateAccount('SAVE_ACTIONS_TOGGLE_TOOLTIP')}>
                <Switch
                  data-cy={MEMBER_PROFILE_ANALYTICS_SWITCH_ID}
                  onChange={handleOnToggle}
                  checked={member.enableSaveActions}
                  color="primary"
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
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

export default MemberProfileScreen;
