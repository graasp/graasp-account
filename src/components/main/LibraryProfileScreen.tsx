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
  IconButton,
  InputAdornment,
  TextField,
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
const LibraryProfileScreen = (): JSX.Element => {
  const { t } = useAccountTranslation();

  const { data, refetch } = hooks.useOwnProfile();
  const {
    mutate: saveProfile,
    isLoading: isAddLoading,
    isSuccess,
  } = mutations.usePostProfile();
  const {
    mutate: editProfile,
    isLoading: isEditLoading,
    isSuccess: isEditSuccess,
  } = mutations.useEditProfile();

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
      editProfile(body);
    } else {
      saveProfile(body);
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
            <Typography variant="h4">{t('LIBRARY_PROFILE_TITLE')}</Typography>
            <Typography variant="body1">
              {t('LIBRARY_PROFILE_DESCRIPTION')}
            </Typography>
            {data && (
              <a href={`${GRAASP_LIBRARY_HOST}/members/${data?.member?.id}`}>
                {t('LIBRARY_PROFILE_CHECK_TEXT')}
              </a>
            )}
          </Box>
          <form noValidate onSubmit={saveSettings}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label={t('LIBRARY_PROFILE_BIO')}
                  variant="outlined"
                  onChange={onInputChange}
                  type="text"
                  helperText={
                    dirtyFields.bio &&
                    !profileData.bio.trim() &&
                    t('LIBRARY_PROFILE_BIO_ERROR_MSG')
                  }
                  error={dirtyFields.bio && !profileData.bio.trim()}
                  margin="dense"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  name="bio"
                  value={profileData.bio}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t('LIBRARY_PROFILE_LINKEDIN_LINK')}
                  variant="outlined"
                  onChange={onInputChange}
                  type="text"
                  margin="dense"
                  fullWidth
                  name="linkedinLink"
                  value={profileData.linkedinLink}
                  helperText={
                    dirtyFields.linkedinLink &&
                    !isValidUrl(profileData.linkedinLink) &&
                    t('LIBRARY_PROFILE_LINKEDIN_LINK_ERROR_MSG')
                  }
                  error={
                    dirtyFields.linkedinLink &&
                    !isValidUrl(profileData.linkedinLink)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          <LinkedInIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t('LIBRARY_PROFILE_TWITTER_LINK')}
                  variant="outlined"
                  onChange={onInputChange}
                  type="text"
                  margin="dense"
                  fullWidth
                  name="twitterLink"
                  value={profileData.twitterLink}
                  helperText={
                    dirtyFields.twitterLink &&
                    !isValidUrl(profileData.twitterLink) &&
                    t('LIBRARY_PROFILE_TWITTER_LINK_ERROR_MSG')
                  }
                  error={
                    dirtyFields.twitterLink &&
                    !isValidUrl(profileData.twitterLink)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          <TwitterIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t('LIBRARY_PROFILE_FACEBOOK_LINK')}
                  variant="outlined"
                  onChange={onInputChange}
                  type="text"
                  margin="dense"
                  fullWidth
                  name="facebookLink"
                  value={profileData.facebookLink}
                  helperText={
                    dirtyFields.facebookLink &&
                    !isValidUrl(profileData.facebookLink) &&
                    t('LIBRARY_PROFILE_FACEBOOK_LINK_ERROR_MSG')
                  }
                  error={
                    dirtyFields.facebookLink &&
                    !isValidUrl(profileData.facebookLink)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          <FacebookIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                      name="visibility"
                      checked={profileData.visibility}
                      onChange={onInputChange}
                    />
                  }
                  label={t('LIBRARY_PROFILE_VISIBILITY')}
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
                  {t('LIBRARY_PROFILE_SUBMIT_TEXT')}
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Main>
  );
};

export default LibraryProfileScreen;
