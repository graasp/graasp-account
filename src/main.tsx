import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline } from '@mui/material';
import { Direction, ThemeProvider as MuiThemeProvider } from '@mui/material';

import {
  BUILDER_ITEMS_PREFIX,
  ClientHostManager,
  Context,
  getCurrentAccountLang,
} from '@graasp/sdk';
import rtlPlugin from '@graasp/stylis-plugin-rtl';
import { DEFAULT_LANG } from '@graasp/translations';
import { theme } from '@graasp/ui';

import createCache from '@emotion/cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { prefixer } from 'stylis';

import i18n, { useAccountTranslation } from '@/config/i18n';

import { AuthProvider, useAuth } from './auth';
import { GRAASP_BUILDER_HOST } from './config/env';
import { QueryClientProvider, hooks, queryClient } from './config/queryClient';
import { routeTree } from './routeTree.gen';

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

type ThemeWrapperProps = {
  children: ReactNode;
};

const getCacheForDirection = (direction?: Direction): EmotionCache =>
  createCache({
    key: `mui-dir-${direction}`,
    stylisPlugins: [prefixer, ...(direction === 'rtl' ? [rtlPlugin] : [])],
  });

function ThemeWrapper({ children }: ThemeWrapperProps): JSX.Element {
  // use the hook as it allows to use the correct instance of i18n
  const { i18n: i18nInstance } = useAccountTranslation();
  const direction = i18nInstance.dir(i18nInstance.language);

  // needed to set the right attribute on the HTML
  useEffect(
    () => {
      const dir = i18nInstance.dir(i18nInstance.language);
      console.debug(
        `Language changed to ${i18nInstance.language}, updating direction to ${dir}`,
      );
      document.documentElement.setAttribute('dir', dir);
    },
    // here we need to react to the change of the language, the instance does not change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18nInstance.language],
  );

  return (
    <MuiThemeProvider theme={{ ...theme, direction }}>
      <CacheProvider value={getCacheForDirection(direction)}>
        {children}
      </CacheProvider>
    </MuiThemeProvider>
  );
}

function TranslationWrapper({ children }: { children: ReactNode }) {
  const { data: currentMember } = hooks.useCurrentMember();

  // react to member changes and update the language
  useEffect(() => {
    let lang = DEFAULT_LANG;
    if (currentMember) {
      lang = getCurrentAccountLang(currentMember, DEFAULT_LANG) ?? DEFAULT_LANG;
    } else {
      // get the language from the preferred lang of the browser UI
      // this is usually what we take on first render
      const navigatorLang = navigator.language;
      // normalize lang (remove the locale part, "it-CH" -> "it")
      lang = navigatorLang.split('-')[0];
    }
    i18n.changeLanguage(lang);
    console.debug(lang);
  }, [currentMember]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationWrapper>
        <CssBaseline />
        <ThemeWrapper>
          <AuthProvider>
            <ToastContainer stacked position="bottom-left" />
            <InnerApp />
          </AuthProvider>
        </ThemeWrapper>
      </TranslationWrapper>
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
