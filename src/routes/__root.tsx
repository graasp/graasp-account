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

// function ThemeWrapper({ children }: { children: ReactNode }) {
//   const { data: currentMember } = hooks.useCurrentMember();

//   return (
//     <ThemeProvider
//       langs={langs}
//       languageSelectSx={{ mb: 2, mr: 2 }}
//       i18n={i18n}
//       defaultDirection={i18n.dir(getCurrentAccountLang(currentMember))}
//     >
//       {children}
//     </ThemeProvider>
//   );
// }

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
