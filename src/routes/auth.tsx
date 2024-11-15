import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

import { RECAPTCHA_SITE_KEY } from '@/config/env';

import { RecaptchaProvider } from '~auth/context/RecaptchaContext';

export const Route = createFileRoute('/auth')({
  beforeLoad: ({ context }) => {
    // check if the user is authenticated.
    // if already authenticated, redirect to `/account`
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/account',
      });
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  return (
    <RecaptchaProvider siteKey={RECAPTCHA_SITE_KEY}>
      <Outlet />
    </RecaptchaProvider>
  );
}
