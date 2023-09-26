/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable no-unused-vars */
import { MouseEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddIcon from '@mui/icons-material/Add';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { hooks, mutations } from '../../config/queryClient';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const AddCardModal = (): JSX.Element => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { data: member } = hooks.useCurrentMember();
  const { mutate: createSetupIntent } = mutations.useCreateSetupIntent();

  // const stripe = useStripe();
  // const elements = useElements();

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    // if (!stripe || !elements) {
    //   return;
    // }

    // createSetupIntent(
    //   { stripe },
    //   {
    //     onSuccess: async ({ clientSecret }) => {
    //       const result = await stripe.confirmCardSetup(clientSecret, {
    //         payment_method: {
    //           card: elements.getElement(CardElement),
    //           billing_details: {
    //             name: member.name,
    //           },
    //         },
    //       });

    //       if (result.error) {
    //         setHasError(true);
    //       } else {
    //         queryClient.invalidateQueries(DATA_KEYS.CARDS_KEY);
    //         setOpen(false);
    //       }
    //     },
    //   }
    // );
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{t('Add Card')}</DialogTitle>
        <DialogContent>
          <Typography>{t('Enter your card details.')}</Typography>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
          {hasError ? (
            <Typography color="error">
              {t('Invalid Card Credentials, Please retry.')}
            </Typography>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={onSubmit} color="primary">
            {t('Submit')}
          </Button>
        </DialogActions>
      </Dialog>
      <ListItemButton onClick={() => setOpen(true)}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText>{t('Add Card')}</ListItemText>
      </ListItemButton>
    </>
  );
};

export default AddCardModal;
