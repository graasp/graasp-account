import React, { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

// import { TextEditor } from '@graasp/ui';
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
  const saveSettings = (e: any) => {
    e.preventDefault();
    // here should go settings submit
    console.log(form);
    setIsLoading(true);
  };

  const onInputChange = (e: any) => {
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
        <Grid item xs={4} md={6} sm={12}>
          <Typography variant="h4">{t('LIBRARY_PROFILE_TITLE')}</Typography>
          <form noValidate onSubmit={saveSettings}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* <TextEditor
                  //   id={id}
                  placeholderText="Bio"
                  value="hello"
                  edit
                  //   onChange={onChange}
                  showActions={false}
                  maxHeight="300px"
                /> */}
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
              <Grid item xs={12} sm={6}>
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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

              <Grid item xs={6}>
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
