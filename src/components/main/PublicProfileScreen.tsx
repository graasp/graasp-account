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

import {
  FACEBOOK_DOMAIN,
  GRAASP_LIBRARY_HOST,
  LINKEDIN_DOMAIN,
  TWITTER_DOMAIN,
} from '@/config/constants';
import { useAccountTranslation } from '@/config/i18n';

import { hooks, mutations } from '../../config/queryClient';
import TextFieldWithValidation from '../common/TextField';
import Main from './Main';

const config: Config = {
  usePredefinedProfiles: true,
  trimInput: true,
  allowQueryParams: false,
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
  linkedinLink: false,
  twitterLink: false,
  facebookLink: false,
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
    linkedinLink: '',
    twitterLink: '',
    facebookLink: '',
    visibility: false,
  });
  const [dirtyFields, setDirtyFields] = useState(initialDirtyFieldsState);

  const saveSettings = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { facebookLink, linkedinLink, twitterLink } = profileData;
    const fbProfile = socialLinks.detectProfile(facebookLink);
    const linkedinProfile = socialLinks.detectProfile(linkedinLink);
    const twitterProfile = socialLinks.detectProfile(twitterLink);

    const body = {
      ...profileData,
      facebookLink: facebookLink
        ? socialLinks.getProfileId(fbProfile, facebookLink)
        : '',
      twitterLink: twitterLink
        ? socialLinks.getProfileId(twitterProfile, twitterLink)
        : '',
      linkedinLink: linkedinLink
        ? socialLinks.getProfileId(linkedinProfile, linkedinLink)
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
      linkedinLink: data?.linkedinLink
        ? socialLinks.sanitize(LINKEDIN_DOMAIN, data?.linkedinLink)
        : '',
      twitterLink: data?.twitterLink
        ? socialLinks.sanitize(TWITTER_DOMAIN, data?.twitterLink)
        : '',
      facebookLink: data?.facebookLink
        ? socialLinks.sanitize(FACEBOOK_DOMAIN, data?.facebookLink)
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
      <Grid container spacing={3}>
        <Grid item sm={12} md={6} lg={6}>
          <Box sx={{ mt: 1, mb: 3 }}>
            <Typography variant="h4">{t('PUBLIC_PROFILE_TITLE')}</Typography>
            <Typography variant="body1">
              {t('PUBLIC_PROFILE_DESCRIPTION')}
            </Typography>
            {data && (
              <a href={`${GRAASP_LIBRARY_HOST}/members/${data?.member?.id}`}>
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
                  name="linkedinLink"
                  value={profileData.linkedinLink}
                  helperText={
                    dirtyFields.linkedinLink &&
                    !isValidUrl(profileData.linkedinLink) &&
                    t('PUBLIC_PROFILE_LINKEDIN_LINK_ERROR_MSG')
                  }
                  isError={
                    dirtyFields.linkedinLink &&
                    !isValidUrl(profileData.linkedinLink)
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
                  name="twitterLink"
                  value={profileData.twitterLink}
                  helperText={
                    dirtyFields.twitterLink &&
                    !isValidUrl(profileData.twitterLink) &&
                    t('PUBLIC_PROFILE_TWITTER_LINK_ERROR_MSG')
                  }
                  isError={
                    dirtyFields.twitterLink &&
                    !isValidUrl(profileData.twitterLink)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldWithValidation
                  name="facebook"
                  label={t('PUBLIC_PROFILE_FACEBOOK_LINK')}
                  onChange={onInputChange}
                  Icon={FacebookIcon}
                  helperText={
                    dirtyFields.facebookLink &&
                    !isValidUrl(profileData.facebookLink) &&
                    t('PUBLIC_PROFILE_FACEBOOK_LINK_ERROR_MSG')
                  }
                  isError={
                    dirtyFields.facebookLink &&
                    !isValidUrl(profileData.facebookLink)
                  }
                  value={profileData.facebookLink}
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

              <Grid item xs={12} lg={6}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={
                    !formChanged ||
                    !profileData.bio.trim() ||
                    !isValidUrl(profileData.facebookLink) ||
                    !isValidUrl(profileData.twitterLink) ||
                    !isValidUrl(profileData.linkedinLink)
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
