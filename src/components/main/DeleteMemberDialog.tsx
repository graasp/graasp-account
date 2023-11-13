import React, { useState } from 'react';

import { Grid, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Button } from '@graasp/ui';

import { useAccountTranslation } from '../../config/i18n';
import { mutations } from '../../config/queryClient';

type Props = {
  id: string;
};

const DeleteMemberDialog = ({ id }: Props): JSX.Element => {
  const { t: translateAccount } = useAccountTranslation();
  const [open, setOpen] = useState(false);
  const { mutate: deleteMember } = mutations.useDeleteMember();

  const alertDialogTitle = 'alert-dialog-title';
  const alertDialogDescription = 'alert-dialog-description';

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby={alertDialogTitle}
        aria-describedby={alertDialogDescription}
      >
        <DialogTitle id={alertDialogTitle}>
          {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_TITLE')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id={alertDialogDescription}>
            {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_INFORMATION')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_CANCEL_BUTTON')}
          </Button>
          <Button
            onClick={() => deleteMember({ id })}
            color="error"
            autoFocus
            variant="text"
          >
            {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_CONFIRM_BUTTON')}
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="flex-start"
        my={1}
      >
        <Grid item xs={8}>
          <Grid item xs={12}>
            <Typography variant="h5">
              {translateAccount('PROFILE_DELETE_ACCOUNT_TITLE')}
            </Typography>
          </Grid>
          <Grid
            container
            spacing={3}
            display="flex"
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            py={1}
            m={0}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(true)}
            >
              {translateAccount('PROFILE_DELETE_ACCOUNT_BUTTON')}
            </Button>
            <Typography variant="caption">
              {translateAccount('PROFILE_DELETE_ACCOUNT_INFORMATION')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DeleteMemberDialog;
