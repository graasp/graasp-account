import { useState } from 'react';

import { ModeEdit } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';

import {
  USERNAME_DISPLAY_ID,
  USERNAME_EDIT_BUTTON_ID,
} from '@/config/selectors';

import EditingUserNameField from './EditingNameField';

type MemberPropertyFormProps = {
  value: string;
  onSave: (newValue: string) => void;
};

export const MemberPropertyForm = ({
  value,
  onSave,
}: MemberPropertyFormProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newValue: string) => {
    setIsEditing(false);
    onSave(newValue);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditingUserNameField
        name={value}
        onSave={handleSave}
        onCancel={cancelEditing}
      />
    );
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box id={USERNAME_DISPLAY_ID}>{value}</Box>
      <IconButton
        onClick={() => setIsEditing(true)}
        id={USERNAME_EDIT_BUTTON_ID}
      >
        <ModeEdit />
      </IconButton>
    </Stack>
  );
};
export default MemberPropertyForm;
