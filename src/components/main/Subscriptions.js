import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { FormControl, Select, styled } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { List } from 'immutable';

import { DEFAULT_CURRENCY } from '../../config/constants';
import { PAYMENT_CONFIRM_PATH } from '../../config/paths';
import { hooks } from '../../config/queryClient';
import { formatCurrency } from '../../utils/currency';
import Main from './Main';

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor:
    theme.palette.type === 'light'
      ? theme.palette.grey[200]
      : theme.palette.grey[700],
}));

const { usePlans, useOwnPlan } = hooks;

const Subscriptions = () => {
  const { t } = useTranslation();

  const { data: plans = List() } = usePlans();

  const { data: currentPlan } = useOwnPlan();

  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);

  const currencies =
    plans?.get(0)?.prices?.map((price) => price.currency) ?? [];

  const isSubscribed = (plan) => plan.id === currentPlan?.get('id');

  const getSubscribeButtonText = (plan) => {
    if (isSubscribed(plan)) {
      return t('Subscribed');
    }
    if (plan.level < currentPlan?.get('level')) {
      return t('Downgrade');
    }
    return t('Upgrade');
  };

  const handleChange = (event) => {
    setCurrency(event.target.value);
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
          {t('Subscriptions')}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          {t('Choose the plan most suitable for your needs')}
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <FormControl fullWidth>
            <Select native value={currency} onChange={handleChange}>
              {currencies.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </Select>
          </FormControl>

          {plans.sort().map((plan) => (
            <Grid item key={plan.title} sm={12} md={6} lg={4}>
              <Card>
                <StyledCardHeader
                  title={plan.name}
                  subheader={plan.subheader}
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
                      {formatCurrency(
                        plan.prices.find(
                          ({ currency: curr }) => curr === currency,
                        ),
                      )}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      {t('/mo')}
                    </Typography>
                  </div>
                  <Typography variant="subtitle1" align="center">
                    {plan.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubscribed(plan)}
                    to={`${PAYMENT_CONFIRM_PATH}/${plan.id}`}
                  >
                    {getSubscribeButtonText(plan)}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Main>
  );
};

export default Subscriptions;
