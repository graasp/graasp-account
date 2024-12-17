import { Stack, Typography } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { HomeMessage } from '~analytics/HomeMessage';

export const Route = createFileRoute('/analytics/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack
      width="100%"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography>
        There is nothing here, select an item and check out the analytics
      </Typography>
      <HomeMessage />
    </Stack>
  );
}
