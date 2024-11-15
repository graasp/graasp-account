import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Box, Button, Stack, Typography } from '@mui/material';

import { RecaptchaAction } from '@graasp/sdk';

import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { MailIcon } from 'lucide-react';
import { z } from 'zod';

import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';
import { SUCCESS_CONTENT_ID } from '@/config/selectors';

import { LeftContentContainer } from '~auth/components/LeftContentContainer';
import { useRecaptcha } from '~auth/context/RecaptchaContext';

const signInSuccessSchema = z.object({
  email: z.string().email(),
  url: z.string().url().optional(),
});

export const Route = createFileRoute('/auth/login/success')({
  validateSearch: zodSearchValidator(signInSuccessSchema),
  component: RouteComponent,
});

function RouteComponent() {
  const { email, url } = Route.useSearch();
  const { t } = useTranslation(NS.Auth);
  const { executeCaptcha } = useRecaptcha();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { mutate: signIn } = mutations.useSignIn();

  if (!email) {
    console.error('Missing email query param');
    return null;
  }

  // used for resend email
  const handleResendEmail = async () => {
    const lowercaseEmail = email.toLowerCase();
    const token = await executeCaptcha(RecaptchaAction.SignIn);
    // this call resets the queries and thus we get a loading animation ...
    // not sure why we need to reset the queries when doing this ...
    signIn({
      email: lowercaseEmail,
      captcha: token,
      url,
    });
  };

  const onClickResendEmail = () => {
    setIsEmailSent(true);
    handleResendEmail();
  };

  return (
    <LeftContentContainer>
      <Box maxWidth="sm" id={SUCCESS_CONTENT_ID}>
        <Stack direction="column" spacing={2}>
          <Typography
            variant="h4"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <MailIcon size={30} />
            {t('SIGN_IN_SUCCESS_TITLE')}
          </Typography>
          <Typography variant="body1" align="justify">
            <Trans
              ns={NS.Auth}
              i18nKey={'SIGN_IN_SUCCESS_TEXT'}
              values={{ email }}
              components={{ bold: <strong /> }}
            />
          </Typography>
          <Typography variant="body1" align="justify">
            {t('SIGN_IN_SUCCESS_EMAIL_PROBLEM')}
          </Typography>
          <Stack direction="row" justifyContent="center" spacing={1}>
            <ButtonLink variant="text" color="primary" to="/auth/login">
              {t('BACK_BUTTON')}
            </ButtonLink>
            <Button
              variant="outlined"
              color="primary"
              onClick={onClickResendEmail}
              disabled={isEmailSent}
            >
              {t('RESEND_EMAIL_BUTTON')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </LeftContentContainer>
  );
}
