import { useState } from 'react';

import { Button, Dialog, Stack, Typography } from '@mui/material';

import BorderedSection from '@/components/layout/BorderedSection';
import { useAccountTranslation } from '@/config/i18n';
import {
  DELETE_MEMBER_BUTTON_ID,
  DELETE_MEMBER_DIALOG_DESCRIPTION_ID,
  DELETE_MEMBER_DIALOG_TITLE_ID,
  DELETE_MEMBER_SECTION_ID,
} from '@/config/selectors';
import { ACCOUNT } from '@/langs/constants';

import { DeleteMemberDialogContent } from './DeleteMemberDialogContent';

export function DeleteMemberSection(): JSX.Element {
  const [open, setOpen] = useState(false);

  const { t } = useAccountTranslation();

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <BorderedSection
      title={t(ACCOUNT.PROFILE_DESTRUCTIVE_SETTINGS_TITLE)}
      id={DELETE_MEMBER_SECTION_ID}
    >
      <Stack direction="column" spacing={2}>
        <Typography variant="body2">
          {t(ACCOUNT.PROFILE_DELETE_ACCOUNT_INFORMATION)}
        </Typography>

        <Button
          id={DELETE_MEMBER_BUTTON_ID}
          variant="outlined"
          color="error"
          onClick={() => setOpen(true)}
          sx={{ textWrap: 'nowrap', maxWidth: 'min-content' }}
        >
          {t(ACCOUNT.PROFILE_DELETE_ACCOUNT_BUTTON)}
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
        <DeleteMemberDialogContent closeModal={closeModal} />
      </Dialog>
    </BorderedSection>
  );
}
