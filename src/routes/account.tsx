import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/account')({
  beforeLoad: ({ context, location }) => {
    // check if the user is authenticated.
    // if not, redirect to auth.graasp.org page
    console.log('context', context.auth);
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          url: `${window.location.origin}${location.href}`,
        },
      });
    }
  },
  component: () => (
    <div id="account-wrapper">
      <Outlet />
    </div>
  ),
});
