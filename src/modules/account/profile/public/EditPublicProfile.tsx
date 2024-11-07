import React, { useEffect, useMemo, useState } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';

import { Config, SocialLinks } from 'social-links';

import { BorderedSection } from '@/components/layout/BorderedSection';
import {
  FACEBOOK_DOMAIN,
  LINKEDIN_DOMAIN,
  TWITTER_DOMAIN,
} from '@/config/constants';
import { GRAASP_LIBRARY_HOST } from '@/config/env';
import { useAccountTranslation, useCommonTranslation } from '@/config/i18n';
import { hooks, mutations } from '@/config/queryClient';
import {
  PUBLIC_PROFILE_BIO_ID,
  PUBLIC_PROFILE_FACEBOOK_ID,
  PUBLIC_PROFILE_LINKEDIN_ID,
  PUBLIC_PROFILE_SAVE_BUTTON_ID,
  PUBLIC_PROFILE_TWITTER_ID,
} from '@/config/selectors';
import { ACCOUNT } from '@/langs/account';
import { CustomTextField } from '@/modules/account/profile/public/CustomTextField';

const config: Config = {
  usePredefinedProfiles: true,
  trimInput: true,
  allowQueryParams: true,
};
const socialLinks = new SocialLinks(config);

const isValidUrl = (urlString: string) => {
  const profileName = socialLinks.detectProfile(urlString);

  if (urlString === '') {
    return true;
  }

  return socialLinks.isValid(profileName, urlString);
};

const initialDirtyFieldsState = {
  bio: false,
  linkedinID: false,
  twitterID: false,
  facebookID: false,
  visibility: false,
};
type EditPublicProfileProps = {
  onClose: () => void;
};

const EditPublicProfile = ({
  onClose,
}: EditPublicProfileProps): JSX.Element => {
  const { t } = useAccountTranslation();
  const { t: translateCommon } = useCommonTranslation();

  const { data: ownProfile } = hooks.useOwnProfile();
  const { mutate: postProfile, isPending: isAddLoading } =
    mutations.usePostPublicProfile();
  const { mutate: patchProfile, isPending: isEditLoading } =
    mutations.usePatchPublicProfile();

  const [profileData, setProfileData] = useState({
    bio: '',
    linkedinID: '',
    twitterID: '',
    facebookID: '',
    visibility: false,
  });
  const [dirtyFields, setDirtyFields] = useState(initialDirtyFieldsState);

  const saveSettings = () => {
    const { facebookID, linkedinID, twitterID } = profileData;
    const fbProfile = socialLinks.detectProfile(facebookID);
    const linkedinProfile = socialLinks.detectProfile(linkedinID);
    const twitterProfile = socialLinks.detectProfile(twitterID);

    const body = {
      ...profileData,
      facebookID: facebookID
        ? socialLinks.getProfileId(fbProfile, facebookID)
        : '',
      twitterID: twitterID
        ? socialLinks.getProfileId(twitterProfile, twitterID)
        : '',
      linkedinID: linkedinID
        ? socialLinks.getProfileId(linkedinProfile, linkedinID)
        : '',
    };
    if (ownProfile) {
      patchProfile(body);
    } else {
      postProfile(body);
    }
    onClose();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    setDirtyFields({ ...dirtyFields, [name]: true });
    if (type === 'checkbox') {
      const { checked } = e.target;
      setProfileData({ ...profileData, [name]: checked });
    } else {
      const { value } = e.target;
      setProfileData({ ...profileData, [name]: value });
    }
  };

  useEffect(() => {
    // TODO: remove need for synching state
    // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setProfileData({
      bio: ownProfile?.bio || '',
      linkedinID: ownProfile?.linkedinID
        ? socialLinks.sanitize(LINKEDIN_DOMAIN, ownProfile?.linkedinID)
        : '',
      twitterID: ownProfile?.twitterID
        ? socialLinks.sanitize(TWITTER_DOMAIN, ownProfile?.twitterID)
        : '',
      facebookID: ownProfile?.facebookID
        ? socialLinks.sanitize(FACEBOOK_DOMAIN, ownProfile?.facebookID)
        : '',
      visibility: ownProfile?.visibility || false,
    });
  }, [ownProfile]);

  // to control button disable as if one of form values changed we can check other fields
  const formChanged = useMemo(
    () => Object.values(dirtyFields).some((ele) => ele),
    [dirtyFields],
  );

  return (
    <BorderedSection title={t(ACCOUNT.PUBLIC_PROFILE_TITLE)}>
      <Typography variant="body1">
        {t(ACCOUNT.PUBLIC_PROFILE_DESCRIPTION)}
      </Typography>
      {ownProfile && (
        <a href={`${GRAASP_LIBRARY_HOST}/members/${ownProfile.member.id}`}>
          {t(ACCOUNT.PUBLIC_PROFILE_CHECK_TEXT)}
        </a>
      )}

      <Stack direction="column">
        <CustomTextField
          name="bio"
          value={profileData.bio}
          helperText={
            dirtyFields.bio &&
            !profileData.bio.trim() &&
            t(ACCOUNT.PUBLIC_PROFILE_BIO_ERROR_MSG)
          }
          isError={dirtyFields.bio && !profileData.bio.trim()}
          label={t(ACCOUNT.PUBLIC_PROFILE_BIO)}
          onChange={onInputChange}
          required
          multiline
          id={PUBLIC_PROFILE_BIO_ID}
        />
        <CustomTextField
          Icon={<LinkedInIcon />}
          name="linkedinID"
          value={profileData.linkedinID}
          helperText={
            dirtyFields.linkedinID &&
            !isValidUrl(profileData.linkedinID) &&
            t(ACCOUNT.PUBLIC_PROFILE_LINKEDIN_LINK_ERROR_MSG)
          }
          isError={
            dirtyFields.linkedinID && !isValidUrl(profileData.linkedinID)
          }
          label={t(ACCOUNT.PUBLIC_PROFILE_LINKEDIN_LINK)}
          onChange={onInputChange}
          id={PUBLIC_PROFILE_LINKEDIN_ID}
        />
        <CustomTextField
          Icon={<TwitterIcon />}
          label={t(ACCOUNT.PUBLIC_PROFILE_TWITTER_LINK)}
          onChange={onInputChange}
          name="twitterID"
          value={profileData.twitterID}
          helperText={
            dirtyFields.twitterID &&
            !isValidUrl(profileData.twitterID) &&
            t(ACCOUNT.PUBLIC_PROFILE_TWITTER_LINK_ERROR_MSG)
          }
          isError={dirtyFields.twitterID && !isValidUrl(profileData.twitterID)}
          id={PUBLIC_PROFILE_TWITTER_ID}
        />
        <CustomTextField
          name="facebookID"
          label={t(ACCOUNT.PUBLIC_PROFILE_FACEBOOK_LINK)}
          onChange={onInputChange}
          Icon={<FacebookIcon />}
          helperText={
            dirtyFields.facebookID &&
            !isValidUrl(profileData.facebookID) &&
            t(ACCOUNT.PUBLIC_PROFILE_FACEBOOK_LINK_ERROR_MSG)
          }
          isError={
            dirtyFields.facebookID && !isValidUrl(profileData.facebookID)
          }
          value={profileData.facebookID}
          id={PUBLIC_PROFILE_FACEBOOK_ID}
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              name="visibility"
              checked={profileData.visibility}
              onChange={onInputChange}
            />
          }
          label={t(ACCOUNT.PUBLIC_PROFILE_VISIBILITY)}
        />
        <Stack direction="row" gap={1} justifyContent="flex-end">
          <Button onClick={onClose} variant="outlined" size="small">
            {translateCommon('CANCEL_BUTTON')}
          </Button>

          <LoadingButton
            variant="contained"
            color="primary"
            size="small"
            disabled={
              !formChanged ||
              !profileData.bio.trim() ||
              !isValidUrl(profileData.facebookID) ||
              !isValidUrl(profileData.twitterID) ||
              !isValidUrl(profileData.linkedinID)
            }
            loading={isAddLoading || isEditLoading}
            onClick={saveSettings}
            id={PUBLIC_PROFILE_SAVE_BUTTON_ID}
          >
            {translateCommon('SAVE_BUTTON')}
          </LoadingButton>
        </Stack>
      </Stack>
    </BorderedSection>
  );
};

export default EditPublicProfile;
