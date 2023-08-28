// eslint-disable-next-line import/prefer-default-export
export const formatCurrency = (currency) =>
  Intl.NumberFormat(window.navigator.language, {
    style: 'currency',
    currency: currency.currency,
  }).format(currency.price);
