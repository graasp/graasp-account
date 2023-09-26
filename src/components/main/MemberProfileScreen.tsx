import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
  Alert,
  Grid,
  IconButton,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';

import { formatDate } from '@graasp/sdk';
import { Loader } from '@graasp/ui';

import {
  DEFAULT_EMAIL_FREQUENCY,
  DEFAULT_LANG,
  DEFAULT_MEMBER_PROFILE_SAVE_ACTIONS_SETTING,
} from '../../config/constants';
import i18n, { useAccountTranslation } from '../../config/i18n';
import notifier from '../../config/notifier';
import { hooks, mutations } from '../../config/queryClient';
import { COPY_MEMBER_ID_TO_CLIPBOARD } from '../../types/clipboard';
import { copyToClipboard } from '../../utils/clipboard';
import DeleteMemberDialog from './DeleteMemberDialog';
import EmailPreferenceSwitch from './EmailPreferenceSwitch';
import LanguageSwitch from './LanguageSwitch';
import Main from './Main';

const MemberProfileScreen = (): JSX.Element => {
  const { t } = useAccountTranslation();
  const { t: translateAccount } = useAccountTranslation();
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { mutate: editMember } = mutations.useEditMember();

  if (isLoading) {
    return <Loader />;
  }

  if (!member) {
    return <Alert severity="error">{t('User is not unauthenticated')}</Alert>;
  }

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
      extra: {
        enableSaveActions: event.target.checked,
      },
    });
  };

  return (
    <Main>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">{member.name}</Typography>
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
                lang={(member.extra?.lang as string) || DEFAULT_LANG}
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
                <span>
                  <Switch
                    onChange={handleOnToggle}
                    checked={
                      member.extra?.enableSaveActions ??
                      DEFAULT_MEMBER_PROFILE_SAVE_ACTIONS_SETTING
                    }
                    color="primary"
                    disabled
                  />
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DeleteMemberDialog id={member?.id} />
    </Main>
  );
};

export default MemberProfileScreen;