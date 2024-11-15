import { useTranslation } from 'react-i18next';

import { Divider, Stack, Typography, useTheme } from '@mui/material';

import { GraaspLogo } from '@graasp/ui';

import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { z } from 'zod';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import { LOG_IN_HEADER_ID } from '@/config/selectors';

import { LeftContentContainer } from '~auth/components/LeftContentContainer';
import { MagicLinkLoginForm } from '~auth/components/signIn/MagicLinkLoginForm';
import { PasswordLoginForm } from '~auth/components/signIn/PasswordLoginForm';

const loginSearchSchema = z.object({
  url: z.string().url().optional(),
  m: z.string().optional(),
});

export const Route = createFileRoute('/auth/login')({
  validateSearch: zodSearchValidator(loginSearchSchema),
  component: LoginRoute,
});

function LoginRoute() {
  const search = Route.useSearch();
  const { t } = useTranslation(NS.Auth);
  const theme = useTheme();
  return (
    <LeftContentContainer>
      <Stack direction="column" alignItems="center" gap={3}>
        <Stack spacing={1} id={LOG_IN_HEADER_ID}>
          <GraaspLogo height={90} sx={{ fill: theme.palette.primary.main }} />
          <Typography textAlign="center" variant="h4" component="h2">
            {t('SIGN_IN_HEADER')}
          </Typography>
        </Stack>

        <Stack
          direction="column"
          alignItems="center"
          divider={<Divider flexItem>{t('LOGIN_METHODS_DIVIDER')}</Divider>}
          gap={3}
        >
          <MagicLinkLoginForm search={search} />
          <PasswordLoginForm search={search} />
          <ButtonLink
            variant="contained"
            fullWidth
            to="/auth/register"
            search={search}
          >
            {t('SIGN_UP_LINK_TEXT')}
          </ButtonLink>
        </Stack>
      </Stack>
    </LeftContentContainer>
  );
}
