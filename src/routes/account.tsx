import { Container } from '@mui/material';

import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import { LOG_IN_PAGE_PATH } from '@/config/paths';

import { PageWrapper } from '~account/PageWrapper';

export const Route = createFileRoute('/account')({
  beforeLoad: ({ context, location }) => {
    // check if the user is authenticated.
    // if not, redirect to `/auth/login` so the user can log in their account
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: LOG_IN_PAGE_PATH,
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
