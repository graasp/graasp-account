import { useState } from 'react';

import { Alert, Button, Dialog, Stack, Typography } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import {
  DELETE_MEMBER_DIALOG_DESCRIPTION_ID,
  DELETE_MEMBER_DIALOG_TITLE_ID,
} from '@/config/selectors';

import BorderedSection from '../layout/BorderedSection';
import DeleteMemberDialogContent from './DeleteMemberDialogContent';

const DeleteMemberSection = (): JSX.Element => {
  const { data: member, isLoading } = hooks.useCurrentMember();
  const [open, setOpen] = useState(false);

  const { t } = useAccountTranslation();

  const closeModal = () => {
    setOpen(false);
  };

  if (member) {
    return (
      <BorderedSection title={t('PROFILE_DESTRUCTIVE_SETTINGS_TITLE')}>
        <Stack direction="column" spacing={2}>
          <Typography variant="body2">
            {t('PROFILE_DELETE_ACCOUNT_INFORMATION')}
          </Typography>

          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(true)}
            disabled={isLoading}
            sx={{ textWrap: 'nowrap', maxWidth: 'min-content' }}
          >
            {t('PROFILE_DELETE_ACCOUNT_BUTTON')}
          </Button>
        </Stack>
        <Dialog
          open={open}
          onClose={closeModal}
          aria-labelledby={DELETE_MEMBER_DIALOG_TITLE_ID}
          aria-describedby={DELETE_MEMBER_DIALOG_DESCRIPTION_ID}
          maxWidth="sm"
          fullWidth
          disableRestoreFocus
        >
          <DeleteMemberDialogContent id={member.id} closeModal={closeModal} />
        </Dialog>
      </BorderedSection>
    );
  }

  return <Alert severity="error">{t('User is not authenticated')}</Alert>;
};

export default DeleteMemberSection;
