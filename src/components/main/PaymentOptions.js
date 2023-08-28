import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import { hooks, mutations } from '../../config/queryClient';
import CardList from '../common/CardList';
import Main from './Main';

const { useCurrentCustomer } = hooks;

const PaymentOptions = () => {
  const { t } = useTranslation();

  const { data: customer } = useCurrentCustomer();

  const { mutate: setDefaultCard } = mutations.useSetDefaultCard();

  const handleCardSelection = (card) => () => {
    setDefaultCard({ cardId: card.id });
  };

  return (
    <Main>
      <CssBaseline />
      <Container maxWidth="sm" component="main" p={2}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {t('Payment Options')}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          {t('Add new cards & Choose your default payment option')}
        </Typography>
      </Container>
      <Container
        sx={{
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">{t('My Cards')}</Typography>
        <CardList
          selected={customer?.get('defaultCard')}
          handleCardSelection={handleCardSelection}
        />

        {t(
          "All payments are securely processed by Stripe. View Stripe's terms and privacy policies.",
        )}
      </Container>
    </Main>
  );
};

export default PaymentOptions;
