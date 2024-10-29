import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button, Typography } from '@mui/material';

import SocialLinks from 'social-links';

import { BorderedSection } from '@/components/layout/BorderedSection';
import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';
import {
  PUBLIC_PROFILE_BIO_ID,
  PUBLIC_PROFILE_DISPLAY_CONTAINER_ID,
  PUBLIC_PROFILE_EDIT_BUTTON_ID,
  PUBLIC_PROFILE_FACEBOOK_ID,
  PUBLIC_PROFILE_LINKEDIN_ID,
  PUBLIC_PROFILE_TWITTER_ID,
} from '@/config/selectors';

import { DisplayLink } from './DisplayLink';
import { EditPublicProfile } from './EditPublicProfile';

export function PublicProfile(): JSX.Element {
  const socialLinks = new SocialLinks();

  const { t } = useTranslation(NS.Account);
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
      title={t('PUBLIC_PROFILE_TITLE')}
      topActions={[
        <Button
          key="edit"
          variant="contained"
          onClick={onOpen}
          id={PUBLIC_PROFILE_EDIT_BUTTON_ID}
          size="small"
        >
          {t('EDIT_BUTTON_LABEL')}
        </Button>,
      ]}
    >
      <Typography variant="body1" color="textSecondary">
        {t('PUBLIC_PROFILE_BIO')}
      </Typography>
      <Typography variant="body1" id={PUBLIC_PROFILE_BIO_ID}>
        {bio || t('PUBLIC_PROFILE_BIO_EMPTY_MSG')}
      </Typography>
      {linkedinID ? (
        <DisplayLink
          icon={<LinkedInIcon />}
          contentId={PUBLIC_PROFILE_LINKEDIN_ID}
          href={socialLinks.sanitize('linkedin', linkedinID)}
          content={linkedinID}
        />
      ) : (
        <DisplayLink
          icon={<LinkedInIcon />}
          contentId={PUBLIC_PROFILE_LINKEDIN_ID}
          content={t('PUBLIC_PROFILE_LINKEDIN_EMPTY_MSG')}
        />
      )}

      {twitterID ? (
        <DisplayLink
          icon={<TwitterIcon />}
          contentId={PUBLIC_PROFILE_TWITTER_ID}
          href={socialLinks.sanitize('twitter', twitterID)}
          content={twitterID}
        />
      ) : (
        <DisplayLink
          icon={<TwitterIcon />}
          contentId={PUBLIC_PROFILE_TWITTER_ID}
          content={t('PUBLIC_PROFILE_TWITTER_EMPTY_MSG')}
        />
      )}
      {facebookID ? (
        <DisplayLink
          icon={<FacebookIcon />}
          contentId={PUBLIC_PROFILE_FACEBOOK_ID}
          href={socialLinks.sanitize('facebook', facebookID)}
          content={facebookID}
        />
      ) : (
        <DisplayLink
          icon={<FacebookIcon />}
          contentId={PUBLIC_PROFILE_FACEBOOK_ID}
          content={t('PUBLIC_PROFILE_FACEBOOK_EMPTY_MSG')}
        />
      )}
    </BorderedSection>
  );
}
