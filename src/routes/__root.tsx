import { Stack } from '@mui/material';

import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { AuthContextType } from '@/auth';
import { NotFoundComponent } from '@/components/NotFoundComponent';
import { ReactQueryDevtools } from '@/config/queryClient';

export const Route = createRootRouteWithContext<{ auth: AuthContextType }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <Stack id="__root">
      <Outlet />
      {import.meta.env.MODE !== 'test' && (
        <>
          <ReactQueryDevtools />
          <TanStackRouterDevtools />
        </>
      )}
    </Stack>
  );
}
