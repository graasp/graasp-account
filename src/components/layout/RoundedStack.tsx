import { ReactNode } from 'react';

import { Stack } from '@mui/material';

type Props = {
  id?: string;
  children: ReactNode;
};
const RoundedStack = ({ children, id }: Props): JSX.Element => (
  <Stack
    id={id}
    border="1px solid"
    borderColor="divider"
    borderRadius={1}
    p={2}
    spacing={1}
  >
    {children}
  </Stack>
);

export default RoundedStack;
