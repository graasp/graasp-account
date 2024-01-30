import { useState } from 'react';

import { Stack, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Button } from '@graasp/ui';

import {
  DELETE_MEMBER_DIALOG_DESCRIPTION_ID,
  DELETE_MEMBER_DIALOG_TITLE_ID,
} from '@/config/selectors';

import { useAccountTranslation } from '../../config/i18n';
import { mutations } from '../../config/queryClient';

type Props = {
  id: string;
  closeModal: () => void;
};

const DeleteMemberDialogContent = ({ id, closeModal }: Props): JSX.Element => {
  const { t: translateAccount } = useAccountTranslation();
  const [confirmationDeleteValue, setConfirmationDeleteValue] = useState('');

  const { mutate: deleteMember } = mutations.useDeleteMember();

  const confirmationDeleteTextToCompare = translateAccount('DELETE_CONFIRMATION_VALUE');

  return (
    <>
      <DialogTitle id={DELETE_MEMBER_DIALOG_TITLE_ID}>
        {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_TITLE')}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText id={DELETE_MEMBER_DIALOG_DESCRIPTION_ID}>
            {translateAccount('PROFILE_DELETE_ACCOUNT_MODAL_INFORMATION')}
          </DialogContentText>
          <DialogContentText variant="body2">
            {translateAccount('PROFILE_DELETE_TYPE_CONFIRMATION_TEXT', {
              text: confirmationDeleteTextToCompare,
            })}
          </DialogContentText>
        </Stack>
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
        <Button onClick={closeModal}>
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
    </>
  );
};

export default DeleteMemberDialogContent;
