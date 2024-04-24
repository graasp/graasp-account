import { Box } from '@mui/material';

import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/account')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          url: location.href,
        },
      });
    }
  },
  component: AccountWrapper,
});
function AccountWrapper() {
  return (
    <Box id="auth-wrapper">
      <Outlet />
    </Box>
  );
}
