import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from '@mui/material/styles';

import { theme } from '@graasp/ui';

import i18nConfig from '../config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  queryClient,
} from '../config/queryClient';
import App from './App';

// const stripe = loadStripe(STRIPE_PK);

const Root = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18nConfig}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        {/* <Elements stripe={stripe}> */}
        <App />
        {/* </Elements> */}
      </ThemeProvider>
    </I18nextProvider>
    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen />}
  </QueryClientProvider>
);

export default Root;
