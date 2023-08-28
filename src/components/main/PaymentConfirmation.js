import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { CardContent, CardHeader, FormControl, Select } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { hooks } from '../../config/queryClient';
import { formatCurrency } from '../../utils/currency';
import CardList from '../common/CardList';
import CheckoutModal from '../context/CheckoutModalContext';
import Main from './Main';

const { useCurrentCustomer, usePlan } = hooks;

const PayementConfirmation = () => {
  const { t } = useTranslation();

  const { data: customer } = useCurrentCustomer();

  const { id } = useParams();
  const { data: plan } = usePlan({ planId: id });

  const [currency, setCurrency] = useState(null);

  const handleChange = (event) => {
    setCurrency(
      plan
        ?.get('prices')
        .find(({ currency: curr }) => curr === event.target.value),
    );
  };

  const [selectedCardId, setSelectedCardId] = React.useState(
    customer?.get('defaultCard') ?? null,
  );

  if (!selectedCardId && customer && customer.get('defaultCard')) {
    setSelectedCardId(customer.get('defaultCard'));
  }

  if (!plan) {
    return null;
  }

  if (!currency) {
    setCurrency(plan.get('prices')[0]);
    return null;
  }

  const handleCardSelection = (card) => () => setSelectedCardId(card.id);

  return (
    <Main>
      <CssBaseline />
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        {t('Payment Options')}
      </Typography>

      <Grid container p={2}>
        <FormControl fullWidth>
          <Select
            id="id"
            native
            value={currency.currency}
            onChange={handleChange}
          >
            {plan.get('prices').map(({ currency: curr }) => (
              <option value={curr}>{curr}</option>
            ))}
          </Select>
        </FormControl>

        <Grid item xs={6}>
          <>
            <CardHeader
              title={plan.get('name')}
              subheader={plan.get('subheader')}
              titleTypographyProps={{ align: 'center' }}
              subheaderTypographyProps={{ align: 'center' }}
            />
            <CardContent>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                <Typography component="h2" variant="h3" color="textPrimary">
                  {formatCurrency(currency)}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {t('/mo')}
                </Typography>
              </div>
              <Typography variant="subtitle1" align="center">
                {plan.get('description')}
              </Typography>
            </CardContent>
          </>
        </Grid>
        <Grid item xs={6} p={2}>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p"
          >
            {t('Choose your payment option')}
          </Typography>

          <CardList
            selected={selectedCardId}
            handleCardSelection={handleCardSelection}
          />
        </Grid>
      </Grid>

      <CheckoutModal
        cardId={
          selectedCardId !== customer?.get('defaultCard')
            ? selectedCardId
            : undefined
        }
        priceId={currency.id}
        planName={plan.get('name')}
      />

      <Typography align="center" color="textPrimary" gutterBottom>
        {t(
          "All payments are securely processed by Stripe. View Stripe's terms and privacy policies.",
        )}
      </Typography>
    </Main>
  );
};

export default PayementConfirmation;
