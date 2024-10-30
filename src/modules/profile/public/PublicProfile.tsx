import { useState } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button, Typography } from '@mui/material';

import SocialLinks from 'social-links';

import BorderedSection from '@/components/layout/BorderedSection';
import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import {
  PUBLIC_PROFILE_BIO_ID,
  PUBLIC_PROFILE_DISPLAY_CONTAINER_ID,
  PUBLIC_PROFILE_EDIT_BUTTON_ID,
  PUBLIC_PROFILE_FACEBOOK_HREF_ID,
  PUBLIC_PROFILE_FACEBOOK_ID,
  PUBLIC_PROFILE_LINKEDIN_HREF_ID,
  PUBLIC_PROFILE_LINKEDIN_ID,
  PUBLIC_PROFILE_TWITTER_HREF_ID,
  PUBLIC_PROFILE_TWITTER_ID,
} from '@/config/selectors';
import { ACCOUNT } from '@/langs/constants';

import DisplayLinks from './DisplayLinks';
import EditPublicProfile from './EditPublicProfile';

const MemberPublicProfile = (): JSX.Element => {
  const socialLinks = new SocialLinks();

  const { t } = useAccountTranslation();
  const { data: publicProfile } = hooks.useOwnProfile();

  const { bio, linkedinID, twitterID, facebookID } = publicProfile || {};

  const [isEditing, setIsEditing] = useState(false);

  const onClose = () => setIsEditing(false);
  const onOpen = () => setIsEditing(true);

  if (isEditing) {
    return <EditPublicProfile onClose={onClose} />;
  }
  return (
    <BorderedSection
      id={PUBLIC_PROFILE_DISPLAY_CONTAINER_ID}
      title={t(ACCOUNT.PUBLIC_PROFILE_TITLE)}
      topActions={[
        <Button
          key="edit"
          variant="contained"
          onClick={onOpen}
          id={PUBLIC_PROFILE_EDIT_BUTTON_ID}
          size="small"
        >
          {t(ACCOUNT.EDIT_BUTTON_LABEL)}
        </Button>,
      ]}
    >
      <Typography variant="body1" color="textSecondary">
        {t('PUBLIC_PROFILE_BIO')}
      </Typography>
      <Typography variant="body1" id={PUBLIC_PROFILE_BIO_ID}>
        {bio || t(ACCOUNT.PUBLIC_PROFILE_BIO_EMPTY_MSG)}
      </Typography>
      {linkedinID ? (
        <DisplayLinks
          icon={<LinkedInIcon />}
          contentId={PUBLIC_PROFILE_LINKEDIN_ID}
          href={socialLinks.sanitize('linkedin', linkedinID)}
          content={linkedinID}
          hrefId={PUBLIC_PROFILE_LINKEDIN_HREF_ID}
        />
      ) : (
        <DisplayLinks
          icon={<LinkedInIcon />}
          contentId={PUBLIC_PROFILE_LINKEDIN_ID}
          content={t(ACCOUNT.PUBLIC_PROFILE_LINKEDIN_EMPTY_MSG)}
        />
      )}

      {twitterID ? (
        <DisplayLinks
          icon={<TwitterIcon />}
          contentId={PUBLIC_PROFILE_TWITTER_ID}
          href={socialLinks.sanitize('twitter', twitterID)}
          content={twitterID}
          hrefId={PUBLIC_PROFILE_TWITTER_HREF_ID}
        />
      ) : (
        <DisplayLinks
          icon={<TwitterIcon />}
          contentId={PUBLIC_PROFILE_TWITTER_ID}
          content={t(ACCOUNT.PUBLIC_PROFILE_TWITTER_EMPTY_MSG)}
        />
      )}
      {facebookID ? (
        <DisplayLinks
          icon={<FacebookIcon />}
          contentId={PUBLIC_PROFILE_FACEBOOK_ID}
          href={socialLinks.sanitize('facebook', facebookID)}
          content={facebookID}
          hrefId={PUBLIC_PROFILE_FACEBOOK_HREF_ID}
        />
      ) : (
        <DisplayLinks
          icon={<FacebookIcon />}
          contentId={PUBLIC_PROFILE_FACEBOOK_ID}
          content={t(ACCOUNT.PUBLIC_PROFILE_FACEBOOK_EMPTY_MSG)}
        />
      )}
    </BorderedSection>
  );
};

export default MemberPublicProfile;
