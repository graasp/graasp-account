import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { BUILDER_ITEMS_PREFIX, ClientHostManager, Context } from '@graasp/sdk';
import { buildTheme } from '@graasp/ui';

import { RouterProvider, createRouter } from '@tanstack/react-router';

import i18n from '@/config/i18n';

import { AuthProvider, useAuth } from './auth';
import { GRAASP_BUILDER_HOST } from './config/env';
import { QueryClientProvider, queryClient } from './config/queryClient';
import { routeTree } from './routeTree.gen';

// import * as serviceWorker from './serviceWorker';

ClientHostManager.getInstance()
  .addPrefix(Context.Builder, BUILDER_ITEMS_PREFIX)
  .addHost(Context.Builder, new URL(GRAASP_BUILDER_HOST));

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <ThemeProvider theme={buildTheme()}>
        <AuthProvider>
          <ToastContainer stacked position="bottom-left" />
          <I18nextProvider i18n={i18n}>
            <InnerApp />
          </I18nextProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
