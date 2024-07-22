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
  const newEmail = search.get('email');
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
        // redirect to the home page of account
        redirectionUrl: new URL('/', window.location.origin).toString(),
      });
      return (
        <>
          <Alert id={EMAIL_VALIDATION_SUCCESS_MESSAGE_ID} severity="success">
            <AlertTitle>{translate('EMAIL_UPDATE_SUCCESS_TITLE')}</AlertTitle>
            {translate('EMAIL_UPDATE_SUCCESS_TEXT')}
          </Alert>
          <Button component={Link} to={loginLink}>
            {translate('EMAIL_UPDATE_SUCCESS_BUTTON_TEXT')}
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
              {translate('EMAIL_UPDATE_UNAUTHORIZED_TITLE')}
            </AlertTitle>
            <Stack direction="column" gap={1}>
              <Typography>
                {translate('EMAIL_UPDATE_UNAUTHORIZED_TEXT_LINK_VALIDITY')}
              </Typography>
              <Typography>
                {translate('EMAIL_UPDATE_UNAUTHORIZED_TEXT_LINK_GENERATION')}
              </Typography>
              <Button component={Link} to={EDIT_MEMBER_INFO}>
                {translate(
                  'EMAIL_UPDATE_UNAUTHORIZED_TEXT_LINK_GENERATION_BUTTON',
                )}
              </Button>
            </Stack>
          </Alert>
        );
      }

      if (statusCode === HttpStatusCode.Conflict) {
        return (
          <Alert severity="error" id={EMAIL_VALIDATION_CONFLICT_MESSAGE_ID}>
            <AlertTitle>{translate('EMAIL_UPDATE_CONFLICT_TITLE')}</AlertTitle>
            {translate('EMAIL_UPDATE_CONFLICT_TEXT')}
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
            <Typography fontWeight="bold">{newEmail}</Typography>
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
  return <Typography>{translate('EMAIL_UPDATE_MISSING_TOKEN')}</Typography>;
};

const EmailChangeValidationScreen = (): JSX.Element => (
  <CenteredContainer>
    <Content />
  </CenteredContainer>
);
export default EmailChangeValidationScreen;
