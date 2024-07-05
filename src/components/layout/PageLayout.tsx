import { ReactNode } from 'react';

import { Container, Divider, Stack, Typography } from '@mui/material';

type PageLayoutProps = {
  id?: string;
  title: string;
  children: ReactNode;
};
const PageLayout = ({ id, title, children }: PageLayoutProps): JSX.Element => (
  <Container id={id}>
    <Stack spacing={2}>
      <Typography variant="h2" component="h1">
        {title}
      </Typography>
      <Divider />
      {children}
    </Stack>
  </Container>
);
export default PageLayout;
