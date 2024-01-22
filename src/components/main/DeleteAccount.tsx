import React, { useState } from 'react';

import { Alert, Button, Grid, Typography, styled } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';

import DeleteMemberDialog from './DeleteMemberDialog';

const StyledGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  // Mobile styles
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));
const DeleteAccount = (): JSX.Element => {
  const { data: member, isLoading } = hooks.useCurrentMember();
  const [open, setOpen] = useState(false);

  const { t } = useAccountTranslation();

  if (member) {
    return (
      <>
        <Grid my={1}>
          <Typography variant="h5">
            {t('PROFILE_DELETE_ACCOUNT_TITLE')}
          </Typography>
          <StyledGrid item>
            <Typography variant="body2" mt={1}>
              {t('PROFILE_DELETE_ACCOUNT_INFORMATION')}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(true)}
              sx={{ display: 'block', paddingY: 1 }}
              disabled={isLoading}
            >
              {t('PROFILE_DELETE_ACCOUNT_BUTTON')}
            </Button>
          </StyledGrid>
        </Grid>
        {open && (
          <DeleteMemberDialog id={member?.id} open={open} setOpen={setOpen} />
        )}
      </>
    );
  }

  return <Alert severity="error">{t('User is not authenticated')}</Alert>;
};

export default DeleteAccount;
