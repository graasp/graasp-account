import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextField } from '@mui/material';
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
  open: boolean;
  setOpen: (val: boolean) => void;
};

const DeleteMemberDialog = ({ id, open, setOpen }: Props): JSX.Element => {
  const { t: translateAccount } = useAccountTranslation();
  const [confirmationDeleteValue, setConfirmationDeleteValue] = useState('');

  const { mutate: deleteMember } = mutations.useDeleteMember();

  const alertDialogTitle = 'alert-dialog-title';
  const alertDialogDescription = 'alert-dialog-description';

  const confirmationDeleteTextToCompare = translateAccount('DELETE');

  const closeModal = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={closeModal}
      aria-labelledby={alertDialogTitle}
      aria-describedby={alertDialogDescription}
      maxWidth="sm"
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle id={alertDialogTitle} sx={{ paddingBottom: 1 }}>
        {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_TITLE')}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={closeModal}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ paddingTop: 0 }}>
        <DialogContentText id={alertDialogDescription} mb={2}>
          {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_INFORMATION')}
        </DialogContentText>
        <DialogContentText my={1} variant="body2">
          {translateAccount('PROFILE_DELETE_TYPE_CONFIRMATION_TEXT', {
            text: confirmationDeleteTextToCompare,
          })}
        </DialogContentText>
        <TextField
          value={confirmationDeleteValue}
          fullWidth
          variant="outlined"
          placeholder={confirmationDeleteTextToCompare}
          onChange={(event) => {
            setConfirmationDeleteValue(event.target.value);
          }}
          autoFocus
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={closeModal} color="primary">
          {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_CANCEL_BUTTON')}
        </Button>
        <Button
          onClick={() => deleteMember({ id })}
          color="error"
          variant="text"
          disabled={confirmationDeleteValue !== confirmationDeleteTextToCompare}
        >
          {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_CONFIRM_BUTTON')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMemberDialog;
