import React, { Suspense } from 'react';

import { Stack } from '@mui/material';

import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import { AuthContextType } from '@/AuthContext';
import { NotFoundComponent } from '@/components/NotFoundComponent';
import { ReactQueryDevtools } from '@/config/queryClient';

export const Route = createRootRouteWithContext<{ auth: AuthContextType }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

// this allows to remove the tanstack router dev tools in production
const TanStackRouterDevtools =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

function RootComponent() {
  return (
    <Stack id="__root">
      <Outlet />
      {import.meta.env.MODE !== 'test' && <ReactQueryDevtools />}
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </Stack>
  );
}
