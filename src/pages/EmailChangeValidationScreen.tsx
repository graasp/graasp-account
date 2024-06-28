import { Link, useSearchParams } from 'react-router-dom';

import {
  Alert,
  AlertTitle,
  Button,
  Card,
  Stack,
  Typography,
} from '@mui/material';

import { buildSignInPath } from '@graasp/sdk';

import { HttpStatusCode, isAxiosError } from 'axios';

import CenteredContainer from '@/components/layout/CenteredContainer';
import { GRAASP_AUTH_HOST } from '@/config/env';
import { useAccountTranslation } from '@/config/i18n';
import { EDIT_MEMBER_INFO } from '@/config/paths';
import { mutations } from '@/config/queryClient';
import {
  EMAIL_VALIDATION_BUTTON_ID,
  EMAIL_VALIDATION_CONFLICT_MESSAGE_ID,
  EMAIL_VALIDATION_SUCCESS_MESSAGE_ID,
  EMAIL_VALIDATION_UNAUTHORIZED_MESSAGE_ID,
} from '@/config/selectors';

const Content = (): JSX.Element => {
  const [search] = useSearchParams();
  const jwtToken = search.get('t');
  const { t: translate } = useAccountTranslation();
  const {
    mutate: validateEmail,
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
          <Alert
            id={EMAIL_VALIDATION_SUCCESS_MESSAGE_ID}
            severity="success"
            sx={{ width: '100%' }}
          >
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
          <Alert severity="error" id={EMAIL_VALIDATION_UNAUTHORIZED_MESSAGE_ID}>
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
        return (
          <Alert severity="error" id={EMAIL_VALIDATION_CONFLICT_MESSAGE_ID}>
            <AlertTitle>{translate('Email already registered')}</AlertTitle>
            {translate(
              'The email you are trying to validate is not available anymore because it has been registered with a different Graasp account.',
            )}
          </Alert>
        );
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
              id={EMAIL_VALIDATION_BUTTON_ID}
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
  <CenteredContainer>
    <Content />
  </CenteredContainer>
);
export default EmailChangeValidationScreen;
