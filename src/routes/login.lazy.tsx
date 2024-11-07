import { Button, Stack, Typography } from '@mui/material';

import { buildSignInPath } from '@graasp/sdk';
import { useButtonColor } from '@graasp/ui';

import { createLazyFileRoute } from '@tanstack/react-router';
import { ArrowRightIcon, LockIcon } from 'lucide-react';

import { GRAASP_AUTH_HOST } from '@/config/env';
import { useAccountTranslation } from '@/config/i18n';
import {
  LOGIN_REQUIRED_BUTTON_ID,
  LOGIN_REQUIRED_TEXT_ID,
} from '@/config/selectors';
import { ACCOUNT } from '@/langs/account';

export const Route = createLazyFileRoute('/login')({
  component: LoginRoute,
});

function LoginRoute() {
  const { url } = Route.useSearch();
  const { t, i18n } = useAccountTranslation();
  const { color } = useButtonColor('primary');
  return (
    <Stack height="100vh" alignItems="center" justifyContent="center" gap={2}>
      <LockIcon color={color} />
      <Typography id={LOGIN_REQUIRED_TEXT_ID}>
        {t(ACCOUNT.LOGIN_REQUIRED_TEXT)}
      </Typography>
      <Button
        id={LOGIN_REQUIRED_BUTTON_ID}
        component="a"
        variant="contained"
        sx={{ textTransform: 'none' }}
        href={buildSignInPath({
          host: GRAASP_AUTH_HOST,
          redirectionUrl: url,
          lang: i18n.language,
        })}
        endIcon={<ArrowRightIcon />}
      >
        {t(ACCOUNT.LOGIN_REQUIRED_BUTTON_TEXT)}
      </Button>
    </Stack>
  );
}
