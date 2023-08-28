import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { grey } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { ENV, NODE_ENV } from '../config/constants';
import i18nConfig from '../config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  queryClient,
} from '../config/queryClient';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5050d2',
      selected: '#cbcbef',
    },
    secondary: { main: '#ffffff' },
  },
  zIndex: {
    drawer: 1000,
  },
  overrides: {
    MuiAvatar: {
      colorDefault: {
        backgroundColor: grey[400],
      },
    },
  },
});

// const stripe = loadStripe(STRIPE_PK);

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18nConfig}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        {/* <Elements stripe={stripe}> */}
        <App />
        {/* </Elements> */}
      </ThemeProvider>
    </I18nextProvider>
    {NODE_ENV === ENV.DEVELOPMENT && <ReactQueryDevtools initialIsOpen />}
  </QueryClientProvider>
);

export default Root;
