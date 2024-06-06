import { Link } from 'react-router-dom';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button, Stack, Typography } from '@mui/material';

import SocialLinks from 'social-links';

import { useAccountTranslation } from '@/config/i18n';
import { PUBLIC_PROFILE_PATH } from '@/config/paths';
import { hooks } from '@/config/queryClient';
import {
  PUBLIC_PROFILE_BIO_ID,
  PUBLIC_PROFILE_FACEBOOK_ID,
  PUBLIC_PROFILE_LINKEDIN_ID,
  PUBLIC_PROFILE_TWITTER_ID,
} from '@/config/selectors';

import RoundedStack from '../common/RoundedStack';
import DisplayingMemberPublicProfileLinks from './DisplayingMemberPublicProfileLinks';

const MemberPublicProfile = (): JSX.Element => {
  const socialLinks = new SocialLinks();

  const { t } = useAccountTranslation();
  const { data: publicProfile } = hooks.useOwnProfile();

  const { bio, linkedinID, twitterID, facebookID } = publicProfile || {};

  return (
    <RoundedStack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">{t('PUBLIC_PROFILE_TITLE')}</Typography>
        <Button component={Link} to={PUBLIC_PROFILE_PATH} variant="contained">
          {t('EDIT_BUTTON_LABEL')}
        </Button>
      </Stack>
      <Typography variant="body1" color="textSecondary">
        {t('PUBLIC_PROFILE_BIO')}
      </Typography>
      {bio ? (
        <Typography variant="body1" id={PUBLIC_PROFILE_BIO_ID}>
          {bio}
        </Typography>
      ) : (
        <Typography variant="body1" id={PUBLIC_PROFILE_BIO_ID}>
          {t('PUBLIC_PROFILE_BIO_EMPTY_MSG')}
        </Typography>
      )}
      {linkedinID ? (
        <DisplayingMemberPublicProfileLinks
          icon={<LinkedInIcon />}
          contentId={PUBLIC_PROFILE_LINKEDIN_ID}
          href={socialLinks.sanitize('linkedin', linkedinID)}
          content={linkedinID}
        />
      ) : (
        <DisplayingMemberPublicProfileLinks
          icon={<LinkedInIcon />}
          contentId={PUBLIC_PROFILE_LINKEDIN_ID}
          content={t('PUBLIC_PROFILE_LINKEDIN_EMPTY_MSG')}
        />
      )}

      {twitterID ? (
        <DisplayingMemberPublicProfileLinks
          icon={<TwitterIcon />}
          contentId={PUBLIC_PROFILE_TWITTER_ID}
          href={socialLinks.sanitize('linkedin', twitterID)}
          content={twitterID}
        />
      ) : (
        <DisplayingMemberPublicProfileLinks
          icon={<TwitterIcon />}
          contentId={PUBLIC_PROFILE_TWITTER_ID}
          content={t('PUBLIC_PROFILE_TWITTER_EMPTY_MSG')}
        />
      )}
      {facebookID ? (
        <DisplayingMemberPublicProfileLinks
          icon={<FacebookIcon />}
          contentId={PUBLIC_PROFILE_FACEBOOK_ID}
          href={socialLinks.sanitize('linkedin', facebookID)}
          content={facebookID}
        />
      ) : (
        <DisplayingMemberPublicProfileLinks
          icon={<FacebookIcon />}
          contentId={PUBLIC_PROFILE_FACEBOOK_ID}
          content={t('PUBLIC_PROFILE_FACEBOOK_EMPTY_MSG')}
        />
      )}
    </RoundedStack>
  );
};

export default MemberPublicProfile;
