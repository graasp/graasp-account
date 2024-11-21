import { useTranslation } from 'react-i18next';

import { Alert, LinearProgress, Stack, Typography } from '@mui/material';

import { createFileRoute, retainSearchParams } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { z } from 'zod';

import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';

import { LeftContentContainer } from '~auth/components/LeftContentContainer';
import { RegisterForm } from '~auth/components/register/RegisterForm';

const registerSearchSchema = z.object({
  invitationId: z.string().uuid().optional(),
  url: z.string().url().optional(),
  m: z.string().optional(),
});

export const Route = createFileRoute('/auth/register')({
  validateSearch: zodSearchValidator(registerSearchSchema),
  search: { middlewares: [retainSearchParams(['url'])] },
  component: RegisterPage,
});

function RegisterWithoutInvitation(): JSX.Element {
  const search = Route.useSearch();
  return (
    <LeftContentContainer>
      <RegisterForm search={search} initialData={{}} />
    </LeftContentContainer>
  );
}

function RegisterWithInvitation() {
  const search = Route.useSearch();
  const { t } = useTranslation(NS.Auth);

  const {
    data: invitation,
    isPending: isLoadingInvitations,
    error,
  } = hooks.useInvitation(search.invitationId);

  if (invitation) {
    return (
      <LeftContentContainer>
        <RegisterForm
          search={search}
          initialData={{ name: invitation.name, email: invitation.email }}
        />
      </LeftContentContainer>
    );
  }

  // invitations loading
  if (isLoadingInvitations) {
    return (
      <LeftContentContainer>
        <Stack direction="column" spacing={1}>
          <Typography>{t('INVITATIONS_LOADING_MESSAGE')}</Typography>
          <LinearProgress />
        </Stack>
      </LeftContentContainer>
    );
  }

  return <Alert severity="error">{error.message}</Alert>;
}

function RegisterPage() {
  const { invitationId } = Route.useSearch();
  if (invitationId) {
    return <RegisterWithInvitation />;
  }

  return <RegisterWithoutInvitation />;
}
