import { Link } from 'react-router-dom';

import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { formatDate } from '@graasp/sdk';
import { Loader } from '@graasp/ui';

import UsernameForm from '@/components/main/UsernameForm';
import { useAccountTranslation } from '@/config/i18n';
import notifier from '@/config/notifier';
import { PROFILE_PATH } from '@/config/paths';
import { hooks } from '@/config/queryClient';
import { COPY_MEMBER_ID_TO_CLIPBOARD } from '@/types/clipboard';
import { copyToClipboard } from '@/utils/clipboard';

const EditMemberPersonalInformation = (): JSX.Element | false => {
  const { t, i18n } = useAccountTranslation();
  const { data: member, isLoading } = hooks.useCurrentMember();
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

    return (
      <Stack>
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
              <Typography>{t('PROFILE_CREATED_AT_LABEL')}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {formatDate(member.createdAt, { locale: i18n.language })}
              </Typography>
            </Grid>
          </Grid>

          <Stack direction="row">
            <Button component={Link} to={PROFILE_PATH} variant="outlined">
              {t('CLOSE_BUTTON')}
            </Button>
          </Stack>
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

  return false;
};

export default EditMemberPersonalInformation;
