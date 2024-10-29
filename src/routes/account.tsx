import { Container } from '@mui/material';

import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import { LOGIN_PAGE_PATH } from '@/config/paths';

import { PageWrapper } from '~account/PageWrapper';

export const Route = createFileRoute('/account')({
  beforeLoad: ({ context, location }) => {
    // check if the user is authenticated.
    // if not, redirect to `/login` which has a link to `auth.graasp.org`
    // we can not currently redirect to an external url, this is why we need to have a login page.
    // Once we integrate the login page in the project we will be able to do the redirect directly
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: LOGIN_PAGE_PATH,
        search: {
          url: `${window.location.origin}${location.href}`,
        },
      });
    }
  },
  component: () => (
    <PageWrapper>
      <Container maxWidth="xl" sx={{ p: 2, height: '100%' }}>
        <Outlet />
      </Container>
    </PageWrapper>
  ),
});
