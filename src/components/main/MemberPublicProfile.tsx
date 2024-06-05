import { Link } from 'react-router-dom';

import { Button, Stack, Typography } from '@mui/material';

import { Facebook, Linkedin, Twitter } from 'lucide-react';
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

import MemberPublicProfileItem from './MemberPublicProfileItem';
import RoundedStack from './RoundedStack';

const MemberPublicProfile = (): JSX.Element | null => {
  const socialLinks = new SocialLinks();

  const { t } = useAccountTranslation();
  const { data: publicProfile } = hooks.useOwnProfile();

  const { bio, linkedinID, twitterID, facebookID } = publicProfile || {};

  return (
    <RoundedStack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">{t('PUBLIC_PROFILE_TITLE')}</Typography>
        <Link to={PUBLIC_PROFILE_PATH} className="link">
          <Button variant="contained" color="primary">
            {t('EDIT_BUTTON_LABEL')}
          </Button>
        </Link>
      </Stack>

      <MemberPublicProfileItem
        title={t('PUBLIC_PROFILE_BIO')}
        content={bio}
        emptyMessage={t('PUBLIC_PROFILE_BIO_EMPTY_MSG')}
        contentId={PUBLIC_PROFILE_BIO_ID}
        href=""
      />
      <MemberPublicProfileItem
        icon={<Linkedin fill="grey" strokeWidth={0} />}
        content={linkedinID ? socialLinks.sanitize('linkedin', linkedinID) : ''}
        emptyMessage={t('PUBLIC_PROFILE_LINKEDIN_EMPTY_MSG')}
        contentId={PUBLIC_PROFILE_LINKEDIN_ID}
        stackDirection="row"
        href={linkedinID ? socialLinks.sanitize('linkedin', linkedinID) : ''}
      />
      <MemberPublicProfileItem
        icon={<Twitter fill="grey" strokeWidth={0} />}
        content={twitterID ? socialLinks.sanitize('twitter', twitterID) : ''}
        emptyMessage={t('PUBLIC_PROFILE_TWITTER_EMPTY_MSG')}
        contentId={PUBLIC_PROFILE_TWITTER_ID}
        stackDirection="row"
        href={twitterID ? socialLinks.sanitize('twitter', twitterID) : ''}
      />
      <MemberPublicProfileItem
        icon={<Facebook fill="grey" strokeWidth={0} />}
        content={facebookID ? socialLinks.sanitize('facebook', facebookID) : ''}
        emptyMessage={t('PUBLIC_PROFILE_FACEBOOK_EMPTY_MSG')}
        contentId={PUBLIC_PROFILE_FACEBOOK_ID}
        stackDirection="row"
        href={facebookID ? socialLinks.sanitize('facebook', facebookID) : ''}
      />
    </RoundedStack>
  );
};

export default MemberPublicProfile;
