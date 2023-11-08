import React, { FormEvent, useState } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { LoadingButton } from '@mui/lab';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';

import Main from './Main';

const isValidUrl = (urlString: string) => {
  let url;
  if (urlString === '') {
    return true;
  }
  try {
    url = new URL(urlString);
  } catch (e) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};
const LibraryProfileScreen = (): JSX.Element => {
  const { t } = useAccountTranslation();

  const [form, setForm] = useState({
    bio: '',
    linkedinLink: '',
    twitterLink: '',
    facebookLink: '',
    visibility: false,
  });
  const [dirtyFields, setDirtyFields] = useState({
    bio: false,
    linkedinLink: false,
    twitterLink: false,
    facebookLink: false,
    visibility: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const saveSettings = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // here should go settings submit
    console.log(form);
    setIsLoading(true);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    setDirtyFields({ ...dirtyFields, [name]: true });
    if (type === 'checkbox') {
      const { checked } = e.target;
      setForm({ ...form, [name]: checked });
    } else {
      const { value } = e.target;
      setForm({ ...form, [name]: value });
    }
  };

  return (
    <Main>
      <Grid container spacing={3}>
        <Grid item sm={12} md={6} lg={6}>
          <Typography variant="h4">{t('LIBRARY_PROFILE_TITLE')}</Typography>
          <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
            {t('LIBRARY_PROFILE_DESCRIPTION')}
          </Typography>
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
                    !form.bio.trim() &&
                    t('LIBRARY_PROFILE_BIO_ERROR_MSG')
                  }
                  error={dirtyFields.bio && !form.bio.trim()}
                  margin="dense"
                  fullWidth
                  multiline
                  rows={4}
                  required
                  name="bio"
                  value={form.bio}
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
                  value={form.linkedinLink}
                  helperText={
                    dirtyFields.linkedinLink &&
                    !isValidUrl(form.linkedinLink) &&
                    t('LIBRARY_PROFILE_LINKEDIN_LINK_ERROR_MSG')
                  }
                  error={
                    dirtyFields.linkedinLink && !isValidUrl(form.linkedinLink)
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
                  value={form.twitterLink}
                  helperText={
                    dirtyFields.twitterLink &&
                    !isValidUrl(form.twitterLink) &&
                    t('LIBRARY_PROFILE_TWITTER_LINK_ERROR_MSG')
                  }
                  error={
                    dirtyFields.twitterLink && !isValidUrl(form.twitterLink)
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
                  value={form.facebookLink}
                  helperText={
                    dirtyFields.facebookLink &&
                    !isValidUrl(form.facebookLink) &&
                    t('LIBRARY_PROFILE_FACEBOOK_LINK_ERROR_MSG')
                  }
                  error={
                    dirtyFields.facebookLink && !isValidUrl(form.facebookLink)
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
                      checked={form.visibility}
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
                    !form.bio.trim() ||
                    !isValidUrl(form.facebookLink) ||
                    !isValidUrl(form.twitterLink) ||
                    !isValidUrl(form.linkedinLink)
                  }
                  loading={isLoading}
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
