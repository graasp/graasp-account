import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';

import { Config, SocialLinks } from 'social-links';

import RoundedStack from '@/components/common/RoundedStack';
import TextFieldWithValidation from '@/components/common/TextField';
import {
  FACEBOOK_DOMAIN,
  LINKEDIN_DOMAIN,
  TWITTER_DOMAIN,
} from '@/config/constants';
import { GRAASP_LIBRARY_HOST } from '@/config/env';
import { useAccountTranslation } from '@/config/i18n';
import { PROFILE_PATH } from '@/config/paths';
import { hooks, mutations } from '@/config/queryClient';
import {
  PUBLIC_PROFILE_BIO_ID,
  PUBLIC_PROFILE_FACEBOOK_ID,
  PUBLIC_PROFILE_LINKEDIN_ID,
  PUBLIC_PROFILE_SAVE_BUTTON_ID,
  PUBLIC_PROFILE_TWITTER_ID,
} from '@/config/selectors';

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
const EditPublicProfileScreen = (): JSX.Element => {
  const { t } = useAccountTranslation();
  const navigate = useNavigate();

  const { data, refetch } = hooks.useOwnProfile();
  const {
    mutate: postProfile,
    isLoading: isAddLoading,
    isSuccess,
  } = mutations.usePostPublicProfile();
  const {
    mutate: patchProfile,
    isLoading: isEditLoading,
    isSuccess: isEditSuccess,
  } = mutations.usePatchPublicProfile();

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
    if (data) {
      patchProfile(body);
    } else {
      postProfile(body);
    }
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
    setProfileData({
      bio: data?.bio || '',
      linkedinID: data?.linkedinID
        ? socialLinks.sanitize(LINKEDIN_DOMAIN, data?.linkedinID)
        : '',
      twitterID: data?.twitterID
        ? socialLinks.sanitize(TWITTER_DOMAIN, data?.twitterID)
        : '',
      facebookID: data?.facebookID
        ? socialLinks.sanitize(FACEBOOK_DOMAIN, data?.facebookID)
        : '',
      visibility: data?.visibility || false,
    });
  }, [data]);
  useEffect(() => {
    if (isSuccess || isEditSuccess) {
      refetch();
      setDirtyFields(initialDirtyFieldsState);
      // redirect to profile page
      navigate(PROFILE_PATH);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isEditSuccess]);

  // to control button disable as if one of form values changed we can check other fields
  const formChanged = useMemo(
    () => Object.values(dirtyFields).some((ele) => ele),
    [dirtyFields],
  );

  return (
    <Stack spacing={2} maxWidth="1000px">
      <Typography variant="h4" component="h1">
        {t('PROFILE_TITLE')}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <RoundedStack>
        <Typography variant="h5" component="h1">
          {t('PUBLIC_PROFILE_TITLE')}
        </Typography>
        <Typography variant="body1">
          {t('PUBLIC_PROFILE_DESCRIPTION')}
        </Typography>
        {data && (
          <a href={`${GRAASP_LIBRARY_HOST}/members/${data.member?.id}`}>
            {t('PUBLIC_PROFILE_CHECK_TEXT')}
          </a>
        )}

        <Box flexDirection="column" maxWidth="700px">
          <TextFieldWithValidation
            name="bio"
            value={profileData.bio}
            helperText={
              dirtyFields.bio &&
              !profileData.bio.trim() &&
              t('PUBLIC_PROFILE_BIO_ERROR_MSG')
            }
            isError={dirtyFields.bio && !profileData.bio.trim()}
            label={t('PUBLIC_PROFILE_BIO')}
            onChange={onInputChange}
            required
            multiline
            id={PUBLIC_PROFILE_BIO_ID}
          />
          <TextFieldWithValidation
            Icon={<LinkedInIcon fill="grey" strokeWidth={0} />}
            name="linkedinID"
            value={profileData.linkedinID}
            helperText={
              dirtyFields.linkedinID &&
              !isValidUrl(profileData.linkedinID) &&
              t('PUBLIC_PROFILE_LINKEDIN_LINK_ERROR_MSG')
            }
            isError={
              dirtyFields.linkedinID && !isValidUrl(profileData.linkedinID)
            }
            label={t('PUBLIC_PROFILE_LINKEDIN_LINK')}
            onChange={onInputChange}
            id={PUBLIC_PROFILE_LINKEDIN_ID}
          />
          <TextFieldWithValidation
            Icon={<TwitterIcon fill="grey" strokeWidth={0} />}
            label={t('PUBLIC_PROFILE_TWITTER_LINK')}
            onChange={onInputChange}
            name="twitterID"
            value={profileData.twitterID}
            helperText={
              dirtyFields.twitterID &&
              !isValidUrl(profileData.twitterID) &&
              t('PUBLIC_PROFILE_TWITTER_LINK_ERROR_MSG')
            }
            isError={
              dirtyFields.twitterID && !isValidUrl(profileData.twitterID)
            }
            id={PUBLIC_PROFILE_TWITTER_ID}
          />
          <TextFieldWithValidation
            name="facebookID"
            label={t('PUBLIC_PROFILE_FACEBOOK_LINK')}
            onChange={onInputChange}
            Icon={<FacebookIcon fill="grey" strokeWidth={0} />}
            helperText={
              dirtyFields.facebookID &&
              !isValidUrl(profileData.facebookID) &&
              t('PUBLIC_PROFILE_FACEBOOK_LINK_ERROR_MSG')
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
            label={t('PUBLIC_PROFILE_VISIBILITY')}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button component={Link} to={PROFILE_PATH} variant="outlined">
              {t('CLOSE_BUTTON')}
            </Button>

            <LoadingButton
              variant="contained"
              color="primary"
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
              {t('PUBLIC_PROFILE_SUBMIT_TEXT')}
            </LoadingButton>
          </Stack>
        </Box>
      </RoundedStack>
    </Stack>
  );
};

export default EditPublicProfileScreen;
