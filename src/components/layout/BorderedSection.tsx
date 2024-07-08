import { ReactNode } from 'react';

import { Button, Stack, Typography } from '@mui/material';

import RoundedStack from '../common/RoundedStack';

type BorderedSectionProps = {
  title: string;
  onEdit: () => void;
  editButtonText: string;
  children: ReactNode;
  editButtonId?: string;
};
export const BorderedSection = ({
  title,
  onEdit,
  editButtonText,
  children,
  editButtonId,
}: BorderedSectionProps): JSX.Element => (
  <RoundedStack>
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h5">{title}</Typography>
      <Button
        id={editButtonId}
        onClick={onEdit}
        variant="contained"
        size="small"
      >
        {editButtonText}
      </Button>
    </Stack>
    {children}
  </RoundedStack>
);

export default BorderedSection;
