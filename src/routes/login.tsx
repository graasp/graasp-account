import { Box, Button } from '@mui/material';

import { buildSignInPath } from '@graasp/sdk';

import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { z } from 'zod';

import { GRAASP_AUTH_HOST } from '@/config/env';
import { useAccountTranslation } from '@/config/i18n';

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
  console.log('redirect url:', url);
  return (
    <Box>
      Login is required, please got to:
      <Button
        component="a"
        href={buildSignInPath({ host: GRAASP_AUTH_HOST, redirectionUrl: url })}
      >
        {t('LOGIN_REQUIRED_BUTTON_TEXT')}
      </Button>
    </Box>
  );
}
