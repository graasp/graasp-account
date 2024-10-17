import { Stack, Typography } from '@mui/material';

import { DEFAULT_LIGHT_PRIMARY_COLOR, GraaspLogo } from '@graasp/ui';

import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { useAuth } from '@/auth';
import { LeftHeaderWrapper } from '@/components/header/LeftHeaderWrapper';
import { ReactQueryDevtools } from '@/config/queryClient';

export const Route = createRootRoute({
  component: RootComponent,
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
  const { isAuthenticated } = useAuth();
  return (
    <Stack alignItems="center" height="100svh" id="pageWrapper">
      <Stack
        id="titleWrapper"
        direction="row"
        // take maximum width
        width="100%"
        // separate the logo part from the buttons part
        justifyContent="space-between"
        // make some room around the buttons
        p={2}
        gap={2}
        bgcolor={DEFAULT_LIGHT_PRIMARY_COLOR.main}
      >
        <Stack
          direction="row"
          alignItems="center"
          id="rightTitleWrapper"
          component={Link}
          to={isAuthenticated ? '/account' : '/'}
          // override link styling
          sx={{ 'text-decoration': 'none', color: 'inherit' }}
          gap={1}
        >
          <GraaspLogo height={44} />
          <Typography fontWeight="bold" variant="h2">
            Graasp
          </Typography>
        </Stack>
        <LeftHeaderWrapper />
      </Stack>
      <Stack
        id="bodyWrapper"
        direction="column"
        alignItems="center"
        p={2}
        gap={2}
      >
        <Outlet />
      </Stack>
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </Stack>
  );
}
