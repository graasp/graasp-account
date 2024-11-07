import { useTranslation } from 'react-i18next';

import { Button, Stack, Typography } from '@mui/material';

import { useButtonColor } from '@graasp/ui';

import { ArrowLeftIcon, ConstructionIcon, HomeIcon } from 'lucide-react';

import { NS } from '@/config/constants';

import { ConstructionAnimation } from './ConstructionTruck';
import { ButtonLink } from './ui/ButtonLink';

function ActionButtons(): JSX.Element {
  const { t } = useTranslation(NS.Common);
  return (
    <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
      <Button
        variant="contained"
        onClick={() => history.back()}
        startIcon={<ArrowLeftIcon />}
      >
        {t('BACK.BUTTON_TEXT')}
      </Button>
      <Typography>{t('CONJONCTION.OR')}</Typography>
      <ButtonLink variant="contained" to="/" endIcon={<HomeIcon />}>
        {t('HOME.BUTTON_TEXT')}
      </ButtonLink>
    </Stack>
  );
}

export function WorkInProgress(): JSX.Element {
  const { t } = useTranslation(NS.Common);
  const { color } = useButtonColor('warning');
  return (
    <Stack
      direction="column"
      height="100svh"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Stack gap={3}>
        <ConstructionIcon size={80} color={color} />
        <Stack maxWidth="60ch" alignItems="center" gap={2}>
          <Typography variant="h1">{t('CONSTRUCTION.TITLE')}</Typography>
          <Typography color="textSecondary">
            {t('CONSTRUCTION.DESCRIPTION')}
          </Typography>
        </Stack>
        <ActionButtons />
        <ConstructionAnimation />
      </Stack>
    </Stack>
  );
}
