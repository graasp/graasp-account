import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { CssBaseline } from '@mui/material';

import { getCurrentAccountLang } from '@graasp/sdk';
import { langs } from '@graasp/translations';
import { ThemeProvider } from '@graasp/ui';

import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import i18n from '@/config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  hooks,
  queryClient,
} from '@/config/queryClient';

export const Route = createRootRoute({
  component: RootComponent,
});

function ThemeWrapper({ children }: { children: ReactNode }) {
  const { data: currentMember } = hooks.useCurrentMember();

  return (
    <ThemeProvider
      langs={langs}
      languageSelectSx={{ mb: 2, mr: 2 }}
      i18n={i18n}
      defaultDirection={i18n.dir(getCurrentAccountLang(currentMember))}
    >
      {children}
    </ThemeProvider>
  );
}

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeWrapper>
        <CssBaseline />
        <ToastContainer stacked position="bottom-left" />
        <I18nextProvider i18n={i18n}>
          <Outlet />
        </I18nextProvider>
      </ThemeWrapper>
      {import.meta.env.DEV && <ReactQueryDevtools />}
      <TanStackRouterDevtools position="bottom-right" />
    </QueryClientProvider>
  );
}
