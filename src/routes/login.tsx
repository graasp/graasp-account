import { Button, Stack, Typography } from '@mui/material';

import { buildSignInPath } from '@graasp/sdk';
import { useButtonColor } from '@graasp/ui';

import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { ArrowRightIcon, LockIcon } from 'lucide-react';
import { z } from 'zod';

import { GRAASP_AUTH_HOST } from '@/config/env';
import { useAccountTranslation } from '@/config/i18n';
import { ACCOUNT } from '@/langs/constants';

const loginSearchSchema = z.object({
  url: z.string().url().optional(),
});

export const Route = createFileRoute('/login')({
  validateSearch: zodSearchValidator(loginSearchSchema),
  component: LoginRoute,
});

function LoginRoute() {
  const { url } = Route.useSearch();
  const { t } = useAccountTranslation();
  const { color } = useButtonColor('primary');
  return (
    <Stack height="100vh" alignItems="center" justifyContent="center" gap={2}>
      <LockIcon color={color} />
      <Typography>{t(ACCOUNT.LOGIN_REQUIRED_TEXT)}</Typography>
      <Button
        component="a"
        variant="contained"
        sx={{ textTransform: 'none' }}
        href={buildSignInPath({ host: GRAASP_AUTH_HOST, redirectionUrl: url })}
        endIcon={<ArrowRightIcon />}
      >
        {t(ACCOUNT.LOGIN_REQUIRED_BUTTON_TEXT)}
      </Button>
    </Stack>
  );
}
