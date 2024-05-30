import React from 'react';
import { useNavigate } from 'react-router-dom';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';
import { PUBLIC_PROFILE_PATH } from '@/config/paths';
import { hooks } from '@/config/queryClient';
import {
  PUBLIC_PROFILE_BIO_ID,
  PUBLIC_PROFILE_FACEBOOK_ID,
  PUBLIC_PROFILE_LINKEDIN_ID,
  PUBLIC_PROFILE_TWITTER_ID,
} from '@/config/selectors';

const MemberPublicProfile = (): JSX.Element => {
  const { data } = hooks.useOwnProfile();
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
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Public Profile</Typography>
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="flex-end">
          <Button variant="contained" onClick={() => goTo(PUBLIC_PROFILE_PATH)}>
            {t('EDIT_BUTTON')}
          </Button>
        </Grid>
      </Grid>
      <Stack direction="column" spacing={2}>
        <Box>
          <Typography variant="body1" color="textSecondary">
            {t('PUBLIC_PROFILE_BIO')}
          </Typography>
          <Typography variant="body1" id={PUBLIC_PROFILE_BIO_ID}>
            {data?.bio}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <LinkedInIcon />

          <Typography variant="body1" id={PUBLIC_PROFILE_LINKEDIN_ID}>
            {data?.linkedinID}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="body1" color="textSecondary">
            <TwitterIcon />
          </Typography>

          <Typography variant="body1" id={PUBLIC_PROFILE_TWITTER_ID}>
            {data?.twitterID}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="body1" color="textSecondary">
            <FacebookIcon />
          </Typography>

          <Typography variant="body1" id={PUBLIC_PROFILE_FACEBOOK_ID}>
            {data?.facebookID}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MemberPublicProfile;
