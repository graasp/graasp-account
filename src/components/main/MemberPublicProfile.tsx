import { Link } from 'react-router-dom';

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
        <Grid item xs={6} sm={6}>
          <Typography variant="h5">{t('PUBLIC_PROFILE_TITLE')}</Typography>
        </Grid>
        <Grid item xs={6} sm={6} container justifyContent="flex-end">
          <Link to={PUBLIC_PROFILE_PATH} className="link">
            <Button variant="contained" color="primary">
              {t('EDIT_BUTTON')}
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Stack direction="column" spacing={2}>
        <Box>
          <Typography variant="body1" color="textSecondary">
            {t('PUBLIC_PROFILE_BIO')}
          </Typography>
          {data?.bio ? (
            <Typography variant="body1" id={PUBLIC_PROFILE_BIO_ID}>
              {data.bio}
            </Typography>
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              id={PUBLIC_PROFILE_BIO_ID}
            >
              {t('PUBLIC_PROFILE_BIO_EMPTY_MSG')}
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={2}>
          <Typography variant="body1" color="textSecondary">
            <LinkedInIcon />
          </Typography>
          {data?.linkedinID ? (
            <Typography variant="body1" id={PUBLIC_PROFILE_LINKEDIN_ID}>
              {data?.linkedinID}
            </Typography>
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              id={PUBLIC_PROFILE_LINKEDIN_ID}
            >
              {t('PUBLIC_PROFILE_LINKEDIN_EMPTY_MSG')}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="body1" color="textSecondary">
            <TwitterIcon />
          </Typography>

          {data?.twitterID ? (
            <Typography variant="body1" id={PUBLIC_PROFILE_TWITTER_ID}>
              {data?.twitterID}
            </Typography>
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              id={PUBLIC_PROFILE_TWITTER_ID}
            >
              {t('PUBLIC_PROFILE_TWITTER_EMPTY_MSG')}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="body1" color="textSecondary">
            <FacebookIcon />
          </Typography>

          {data?.facebookID ? (
            <Typography variant="body1" id={PUBLIC_PROFILE_FACEBOOK_ID}>
              {data?.facebookID}
            </Typography>
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              id={PUBLIC_PROFILE_FACEBOOK_ID}
            >
              {t('PUBLIC_PROFILE_FACEBOOK_EMPTY_MSG')}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default MemberPublicProfile;
