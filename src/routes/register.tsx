import { Button, Stack, Typography } from '@mui/material';

import { useButtonColor } from '@graasp/ui';

import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { ArrowRightIcon, UserPlus2Icon } from 'lucide-react';
import { z } from 'zod';

import { GRAASP_AUTH_HOST } from '@/config/env';
import { useAccountTranslation } from '@/config/i18n';
import { ACCOUNT } from '@/langs/constants';

const registerSearchSchema = z.object({
  url: z.string().url().optional(),
});

export const Route = createFileRoute('/register')({
  validateSearch: zodSearchValidator(registerSearchSchema),

  component: RegisterPage,
});

function buildRegisterUrl({
  host,
  redirectionUrl,
  lang,
}: {
  host: string;
  redirectionUrl?: string;
  lang?: string;
}) {
  const registerUrl = new URL('/register', host);
  if (redirectionUrl) {
    registerUrl.searchParams.set('url', redirectionUrl);
  }
  if (lang) {
    registerUrl.searchParams.set('lang', lang);
  }
  return registerUrl.toString();
}

function RegisterPage() {
  const { url } = Route.useSearch();
  const { t, i18n } = useAccountTranslation();
  const { color } = useButtonColor('primary');

  return (
    <Stack height="100vh" alignItems="center" justifyContent="center" gap={2}>
      <UserPlus2Icon color={color} />
      <Typography>{t(ACCOUNT.LOGIN_REQUIRED_TEXT)}</Typography>
      <Button
        component="a"
        variant="contained"
        sx={{ textTransform: 'none' }}
        href={buildRegisterUrl({
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
