import { Typography } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <Typography variant="display">Welcome to Graasp</Typography>
      <Typography>This is a temporary page for the landing screen</Typography>
    </>
  );
}
