import {
  Alert,
  AlertTitle,
  Button,
  Card,
  Stack,
  Typography,
} from '@mui/material';

import { buildSignInPath } from '@graasp/sdk';

import { Link, createFileRoute } from '@tanstack/react-router';
import { HttpStatusCode, isAxiosError } from 'axios';

import CenteredContainer from '@/components/layout/CenteredContainer';
import { GRAASP_AUTH_HOST } from '@/config/env';
import { useAccountTranslation } from '@/config/i18n';
import { ACCOUNT_SETTINGS_PATH } from '@/config/paths';
import { mutations } from '@/config/queryClient';
import {
  EMAIL_VALIDATION_BUTTON_ID,
  EMAIL_VALIDATION_CONFLICT_MESSAGE_ID,
  EMAIL_VALIDATION_SUCCESS_MESSAGE_ID,
  EMAIL_VALIDATION_UNAUTHORIZED_MESSAGE_ID,
} from '@/config/selectors';
import { ACCOUNT } from '@/langs/account';

type EmailChangeSearch = {
  newEmail: string;
  jwtToken: string;
};
export const Route = createFileRoute('/email/change')({
  validateSearch: (search: Record<string, unknown>): EmailChangeSearch => {
    return {
      newEmail: (search.newEmail as string) || '',
      jwtToken: (search.t as string) || '',
    };
  },
  component: EmailChangeRoute,
});

function EmailChangeRoute() {
  const { newEmail, jwtToken } = Route.useSearch();
  return (
    <CenteredContainer>
      <EmailChangeContent newEmail={newEmail} jwtToken={jwtToken} />
    </CenteredContainer>
  );
}

type EmailChangeContentProps = {
  newEmail: string;
  jwtToken: string;
};
const EmailChangeContent = ({
  newEmail,
  jwtToken,
}: EmailChangeContentProps): JSX.Element => {
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
            <AlertTitle>
              {translate(ACCOUNT.EMAIL_UPDATE_SUCCESS_TITLE)}
            </AlertTitle>
            {translate(ACCOUNT.EMAIL_UPDATE_SUCCESS_TEXT)}
          </Alert>
          <Button component={Link} to={loginLink}>
            {translate(ACCOUNT.EMAIL_UPDATE_SUCCESS_BUTTON_TEXT)}
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
              {translate(ACCOUNT.EMAIL_UPDATE_UNAUTHORIZED_TITLE)}
            </AlertTitle>
            <Stack direction="column" gap={1}>
              <Typography>
                {translate(
                  ACCOUNT.EMAIL_UPDATE_UNAUTHORIZED_TEXT_LINK_VALIDITY,
                )}
              </Typography>
              <Typography>
                {translate(
                  ACCOUNT.EMAIL_UPDATE_UNAUTHORIZED_TEXT_LINK_GENERATION,
                )}
              </Typography>
              <Button component={Link} to={ACCOUNT_SETTINGS_PATH}>
                {translate(
                  ACCOUNT.EMAIL_UPDATE_UNAUTHORIZED_TEXT_LINK_GENERATION_BUTTON,
                )}
              </Button>
            </Stack>
          </Alert>
        );
      }

      if (statusCode === HttpStatusCode.Conflict) {
        return (
          <Alert severity="error" id={EMAIL_VALIDATION_CONFLICT_MESSAGE_ID}>
            <AlertTitle>
              {translate(ACCOUNT.EMAIL_UPDATE_CONFLICT_TITLE)}
            </AlertTitle>
            {translate(ACCOUNT.EMAIL_UPDATE_CONFLICT_TEXT)}
          </Alert>
        );
      }
    }

    return (
      <>
        <Typography variant="h2" component="h1">
          {translate(ACCOUNT.VALIDATE_EMAIL_TITLE)}
        </Typography>
        <Card>
          <Stack direction="column" alignItems="center" gap={1} p={2}>
            <Typography>{translate(ACCOUNT.VALIDATE_EMAIL_TEXT)}</Typography>
            <Typography fontWeight="bold">{newEmail}</Typography>
            <Button
              id={EMAIL_VALIDATION_BUTTON_ID}
              variant="contained"
              onClick={handleEmailValidation}
              sx={{ width: 'min-content' }}
            >
              {translate(ACCOUNT.VALIDATE_EMAIL_BUTTON_TEXT)}
            </Button>
          </Stack>
        </Card>
      </>
    );
  }
  return (
    <Typography>{translate(ACCOUNT.EMAIL_UPDATE_MISSING_TOKEN)}</Typography>
  );
};
