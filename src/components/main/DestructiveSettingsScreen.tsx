import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';

import DeleteAccount from './DeleteAccount';
import Main from './Main';

const DestructiveSettingsScreen = (): JSX.Element => {
  const { t: translateAccount } = useAccountTranslation();

  return (
    <Main>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Box mb={4}>
            <Typography variant="h4">
              {translateAccount('MAIN_MENU_DESTRUCTIVE_SETTINGS')}
            </Typography>
            <Typography variant="body1">
              {translateAccount('DESTRUCTIVE_SETTINGS_DETAILS')}
            </Typography>
          </Box>
          <DeleteAccount />
        </Grid>
      </Grid>
    </Main>
  );
};

export default DestructiveSettingsScreen;
