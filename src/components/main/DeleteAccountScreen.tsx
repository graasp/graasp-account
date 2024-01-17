import React from 'react';

import { Alert, Grid } from '@mui/material';

import { Loader } from '@graasp/ui';

import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';

import DeleteMemberDialog from './DeleteMemberDialog';
import Main from './Main';

const DeleteAccountScreen = (): JSX.Element => {
  const { data: member, isLoading } = hooks.useCurrentMember();
  const { t } = useAccountTranslation();

  if (member) {
    return (
      <Main>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DeleteMemberDialog id={member?.id} />
          </Grid>
        </Grid>
      </Main>
    );
  }
  if (isLoading) {
    return <Loader />;
  }

  return <Alert severity="error">{t('User is not unauthenticated')}</Alert>;
};

export default DeleteAccountScreen;
