import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { CssBaseline } from '@mui/material';

import { AccountType } from '@graasp/sdk';
import { langs } from '@graasp/translations';
import { ThemeProvider } from '@graasp/ui';

import App from './App';
import i18nConfig from './config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  hooks,
  queryClient,
} from './config/queryClient';

const ThemeWrapper = () => {
  const { data: currentMember } = hooks.useCurrentMember();

  return (
    <ThemeProvider
      langs={langs}
      languageSelectSx={{ mb: 2, mr: 2 }}
      i18n={i18nConfig}
      defaultDirection={i18nConfig.dir(
        currentMember?.type === AccountType.Individual
          ? currentMember?.extra?.lang
          : 'ltr',
      )}
    >
      <CssBaseline />
      <ToastContainer stacked position="bottom-left" />
      <I18nextProvider i18n={i18nConfig}>
        <Router>
          <App />
        </Router>
      </I18nextProvider>
    </ThemeProvider>
  );
};
const Root = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <ThemeWrapper />
    {import.meta.env.DEV && <ReactQueryDevtools />}
  </QueryClientProvider>
);

export default Root;
