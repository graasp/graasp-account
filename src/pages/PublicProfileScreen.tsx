import React, { FormEvent, useEffect, useMemo, useState } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';

import { Config, SocialLinks } from 'social-links';

import TextFieldWithValidation from '@/components/common/TextField';
import Main from '@/components/main/Main';
import {
  FACEBOOK_DOMAIN,
  GRAASP_LIBRARY_HOST,
  LINKEDIN_DOMAIN,
  TWITTER_DOMAIN,
} from '@/config/constants';
import { useAccountTranslation } from '@/config/i18n';
import { hooks, mutations } from '@/config/queryClient';

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
const PublicProfileScreen = (): JSX.Element => {
  const { t } = useAccountTranslation();

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

  const saveSettings = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isEditSuccess]);

  // to control button disable as if one of form values changed we can check other fields
  const formChanged = useMemo(
    () => Object.values(dirtyFields).some((ele) => ele),
    [dirtyFields],
  );

  return (
    <Main>
      <Grid container spacing={3} sx={{ maxWidth: '700px' }}>
        <Grid item xs={12}>
          <Box sx={{ mt: 1, mb: 3 }}>
            <Typography variant="h4" component="h1">
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
          </Box>
          <form noValidate onSubmit={saveSettings}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldWithValidation
                  Icon={LinkedInIcon}
                  name="linkedinID"
                  value={profileData.linkedinID}
                  helperText={
                    dirtyFields.linkedinID &&
                    !isValidUrl(profileData.linkedinID) &&
                    t('PUBLIC_PROFILE_LINKEDIN_LINK_ERROR_MSG')
                  }
                  isError={
                    dirtyFields.linkedinID &&
                    !isValidUrl(profileData.linkedinID)
                  }
                  label={t('PUBLIC_PROFILE_LINKEDIN_LINK')}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldWithValidation
                  Icon={TwitterIcon}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldWithValidation
                  name="facebookID"
                  label={t('PUBLIC_PROFILE_FACEBOOK_LINK')}
                  onChange={onInputChange}
                  Icon={FacebookIcon}
                  helperText={
                    dirtyFields.facebookID &&
                    !isValidUrl(profileData.facebookID) &&
                    t('PUBLIC_PROFILE_FACEBOOK_LINK_ERROR_MSG')
                  }
                  isError={
                    dirtyFields.facebookID &&
                    !isValidUrl(profileData.facebookID)
                  }
                  value={profileData.facebookID}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>

              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  fullWidth
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
                >
                  {t('PUBLIC_PROFILE_SUBMIT_TEXT')}
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Main>
  );
};

export default PublicProfileScreen;
