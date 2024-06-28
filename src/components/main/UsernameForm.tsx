import { useState } from 'react';

import { ModeEdit } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';

import {
  USERNAME_DISPLAY_ID,
  USERNAME_EDIT_BUTTON_ID,
} from '@/config/selectors';

import { mutations } from '../../config/queryClient';
import EditingUserNameField from './EditingNameField';

type UsernameProps = {
  member: {
    id: string;
    name: string;
  };
};
const UsernameForm = ({ member }: UsernameProps): JSX.Element => {
  const { mutate: editMember } = mutations.useEditMember();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newUserName: string) => {
    editMember({
      id: member.id,
      name: newUserName,
    });

    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditingUserNameField
        name={member.name}
        onSave={handleSave}
        onCancel={cancelEditing}
      />
    );
  }

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box id={USERNAME_DISPLAY_ID}>{member.name}</Box>
      <IconButton
        onClick={() => setIsEditing(true)}
        id={USERNAME_EDIT_BUTTON_ID}
      >
        <ModeEdit />
      </IconButton>
    </Stack>
  );
};
export default UsernameForm;
