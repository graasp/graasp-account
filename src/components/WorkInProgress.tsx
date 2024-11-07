import { Button, Stack, Typography } from '@mui/material';

import { useButtonColor } from '@graasp/ui';

import { ArrowLeftIcon, ConstructionIcon, HomeIcon } from 'lucide-react';

import { ConstructionAnimation } from './ConstructionTruck';
import { ButtonLink } from './ui/ButtonLink';

function ActionButtons(): JSX.Element {
  return (
    <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
      <Button
        variant="contained"
        onClick={() => history.back()}
        startIcon={<ArrowLeftIcon />}
      >
        Back
      </Button>
      <Typography>or</Typography>
      <ButtonLink variant="contained" to="/" endIcon={<HomeIcon />}>
        Home
      </ButtonLink>
    </Stack>
  );
}

export function WorkInProgress(): JSX.Element {
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
          <Typography variant="h1">This page is under construction</Typography>
          <Typography color="textSecondary">
            We are working on improving this part of the app. We ask for your
            comprehension while we make the necessary changes.
          </Typography>
        </Stack>
        <ActionButtons />
        <ConstructionAnimation />
      </Stack>
    </Stack>
  );
}
