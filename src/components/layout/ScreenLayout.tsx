import { ReactNode } from 'react';

import { Divider, Stack, Typography } from '@mui/material';

type ScreenLayoutProps = {
  id?: string;
  title: string;
  children: ReactNode;
};
const ScreenLayout = ({
  id,
  title,
  children,
}: ScreenLayoutProps): JSX.Element => (
  <Stack spacing={2} id={id}>
    <Typography variant="h2" component="h1">
      {title}
    </Typography>
    <Divider />
    {children}
  </Stack>
);
export default ScreenLayout;
