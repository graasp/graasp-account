import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';

import { SUBSCRIPTIONS_PATH } from '../../config/paths';
import { mutations } from '../../config/queryClient';

type Props = {
  cardId: string;
  priceId: string;
  planName: string;
};

const CheckoutModal = ({ cardId, priceId, planName }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate: changePlan } = mutations.useChangePlan();

  const onOpen = () => {
    setOpen(true);
  };

  const onConfirm = () => {
    changePlan({ planId: priceId, cardId });
    setOpen(false);
    navigate(SUBSCRIPTIONS_PATH);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{`${t(
          'Checkout - Subscribing to',
        )} ${planName}`}</DialogTitle>
        <DialogContent>
          <Typography>
            {t('Please confirm that you wish to subscribe to this plan.')}
          </Typography>
          <Typography>{t('You will be charged upon confirmation.')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={onConfirm} color="primary">
            {t('Confirm')}
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={!priceId}
        onClick={onOpen}
      >
        {t('Subscribe')}
      </Button>
    </>
  );
};

export default CheckoutModal;
