import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '@graasp/ui';

import App from './App';
import i18nConfig from './config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  queryClient,
} from './config/queryClient';

const Root = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18nConfig}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer stacked />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </I18nextProvider>
    {import.meta.env.DEV && <ReactQueryDevtools />}
  </QueryClientProvider>
);

export default Root;
