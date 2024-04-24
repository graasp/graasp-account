import { Button, Stack } from '@mui/material';

import { buildSignInPath } from '@graasp/sdk';
import { Avatar } from '@graasp/ui';

import { Link } from '@tanstack/react-router';

import { useAuth } from '@/auth';
import { GRAASP_AUTH_HOST } from '@/config/env';

export function LeftHeaderWrapper(): JSX.Element {
  const { isAuthenticated, user, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <Stack direction="row" alignItems="center">
        <Avatar alt={user.name} />
        <Button onClick={logout}>Logout</Button>
      </Stack>
    );
  }

  return (
    <Stack gap={2} direction="row" id="leftTitleWrapper">
      <Button
        component={Link}
        to={buildSignInPath({
          host: GRAASP_AUTH_HOST,
          redirectionUrl: window.location.href,
        })}
      >
        Log in
      </Button>
      <Button component={Link} to="/register">
        Register
      </Button>
    </Stack>
  );
}
