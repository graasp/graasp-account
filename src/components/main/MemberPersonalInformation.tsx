import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Grid, Typography } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';
import { EDIT_MEMBER_INFO } from '@/config/paths';
import { hooks } from '@/config/queryClient';
import {
  MEMBER_PROFILE_EMAIL_ID,
  USERNAME_DISPLAY_ID,
} from '@/config/selectors';

const MemberPersonalInformation = (): JSX.Element => {
  const { data: member } = hooks.useCurrentMember();
  const { t } = useAccountTranslation();
  const push = useNavigate();

  const goTo = (path: string) => {
    push(path);
  };
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        p: 2,
        mb: 2,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">
            {t('PERSONAL_INFORMATION_TITLE')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => goTo(EDIT_MEMBER_INFO)}
          >
            {t('EDIT_BUTTON')}
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1" color="textSecondary">
            {t('PROFILE_MEMBER_NAME')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body1" id={USERNAME_DISPLAY_ID}>
            {member?.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1" color="textSecondary">
            {t('PROFILE_EMAIL_TITLE')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body1" id={MEMBER_PROFILE_EMAIL_ID}>
            {member?.email}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body1" color="textSecondary">
            {t('PASSWORD_TITLE')}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MemberPersonalInformation;
