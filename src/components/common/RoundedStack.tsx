import { ReactNode } from 'react';

import { Stack } from '@mui/material';

type Props = {
  children: ReactNode;
};
const RoundedStack = ({ children }: Props): JSX.Element => (
  <Stack
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
