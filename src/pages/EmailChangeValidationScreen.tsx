import { Link, useSearchParams } from 'react-router-dom';

import {
  Alert,
  AlertTitle,
  Button,
  Card,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { buildSignInPath } from '@graasp/sdk';
import { DEFAULT_BACKGROUND_COLOR } from '@graasp/ui';

import { HttpStatusCode, isAxiosError } from 'axios';

import { GRAASP_AUTH_HOST } from '@/config/env';
import { useAccountTranslation } from '@/config/i18n';
import { EDIT_MEMBER_INFO } from '@/config/paths';
import { mutations } from '@/config/queryClient';

const Content = (): JSX.Element => {
  const [search] = useSearchParams();
  const jwtToken = search.get('t');
  const { t: translate } = useAccountTranslation();
  const {
    mutateAsync: validateEmail,
    error,
    isSuccess,
  } = mutations.useValidateEmailUpdate();

  if (jwtToken) {
    const handleEmailValidation = () => {
      validateEmail(jwtToken);
    };

    if (isSuccess) {
      const loginLink = buildSignInPath({
        host: GRAASP_AUTH_HOST,
        redirectionUrl: window.location.toString(),
      });
      return (
        <>
          <Alert severity="success" sx={{ width: '100%' }}>
            <AlertTitle>{translate('Success')}</AlertTitle>
            {translate('Email successfully updated !')}
          </Alert>
          <Button component={Link} to={loginLink}>
            {translate('Login with my new email')}
          </Button>
        </>
      );
    }

    if (error && isAxiosError(error)) {
      const statusCode = error.response?.status;
      if (statusCode === HttpStatusCode.Unauthorized) {
        return (
          <Alert severity="error">
            <AlertTitle>
              {translate(
                'We were unable to validate your email, the link might be outdated',
              )}
            </AlertTitle>
            <Stack direction="column" gap={1}>
              <Typography>
                {translate(
                  'The link sent via email is valid for 24 hours only. Please ensure that you are using a fresh link.',
                )}
              </Typography>
              <Typography>
                {translate(
                  'You can generate a new link by editing your email in your profile.',
                )}
              </Typography>
              <Button component={Link} to={EDIT_MEMBER_INFO}>
                {translate('Edit my email in account settings')}
              </Button>
            </Stack>
          </Alert>
        );
      }
      if (statusCode === HttpStatusCode.Conflict) {
        <Alert severity="error">
          <AlertTitle>{translate('Email already registered')}</AlertTitle>
          {translate(
            'The email you are trying to validate is not available anymore because it has been registered with a different Graasp account.',
          )}
        </Alert>;
      }
    }

    return (
      <>
        <Typography variant="h2" component="h1">
          {translate('VALIDATE_EMAIL_TITLE')}
        </Typography>
        <Card>
          <Stack direction="column" alignItems="center" gap={1} p={2}>
            <Typography>{translate('VALIDATE_EMAIL_TEXT')}</Typography>
            <Button
              onClick={handleEmailValidation}
              sx={{ width: 'min-content' }}
            >
              {translate('VALIDATE_EMAIL_BUTTON_TEXT')}
            </Button>
          </Stack>
        </Card>
      </>
    );
  }
  return <Typography>{translate('No token was found')}</Typography>;
};

const EmailChangeValidationScreen = (): JSX.Element => (
  <Stack height="100vh" bgcolor={DEFAULT_BACKGROUND_COLOR}>
    <Container sx={{ my: 5, height: '100%' }}>
      <Stack
        height="100%"
        direction="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        gap={2}
      >
        <Content />
      </Stack>
    </Container>
  </Stack>
);
export default EmailChangeValidationScreen;
