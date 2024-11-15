import { ChangeEventHandler, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LoadingButton } from '@mui/lab';
import { FormControl, LinearProgress, Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
  RecaptchaAction,
} from '@graasp/sdk';
import { GraaspLogo } from '@graasp/ui';

import { Link, useNavigate } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import { hooks, mutations } from '@/config/queryClient';
import {
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  SIGN_UP_BUTTON_ID,
  SIGN_UP_HEADER_ID,
} from '@/config/selectors';

import { useRecaptcha } from '~auth/context/RecaptchaContext';
import { useAgreementForm } from '~auth/hooks/useAgreementForm';
import { useMobileAppLogin } from '~auth/hooks/useMobileAppLogin';
import { AUTH } from '~auth/langs';
import { emailValidator, nameValidator } from '~auth/validation';

import { EmailAdornment } from '../common/Adornments';
import { ErrorDisplay } from '../common/ErrorDisplay';
import { StyledTextField } from '../common/StyledTextField';
import { AgreementForm } from '../register/AgreementForm';
import { EmailInput } from './EmailInput';
import { EnableAnalyticsForm } from './EnableAnalyticsForm';

const {
  SIGN_IN_LINK_TEXT,
  SIGN_IN_LINK_TEXT_BUTTON,
  SIGN_UP_HEADER,
  NAME_FIELD_LABEL,
  SIGN_UP_BUTTON,
  INVITATIONS_LOADING_MESSAGE,
} = AUTH;

type RegisterProps = {
  search: {
    url?: string;
    invitationId?: string;
  };
};

export function Register({ search }: RegisterProps) {
  const { t, i18n } = useTranslation(NS.Auth);

  const navigate = useNavigate();
  const { executeCaptcha } = useRecaptcha();
  const theme = useTheme();

  const { isMobile, challenge } = useMobileAppLogin();

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);
  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);
  const [enableSaveActions, setEnableSaveActions] = useState<boolean>(true);

  const agreementFormHook = useAgreementForm();
  const { verifyUserAgreements, userHasAcceptedAllTerms } = agreementFormHook;

  const {
    mutateAsync: signUp,
    isPending: isLoadingSignUp,
    error: webRegisterError,
  } = mutations.useSignUp();
  const {
    mutateAsync: mobileSignUp,
    isPending: isLoadingMobileSignUp,
    error: mobileRegisterError,
  } = mutations.useMobileSignUp();

  const {
    data: invitation,
    isSuccess: isInvitationSuccess,
    isLoading: isLoadingInvitations,
  } = hooks.useInvitation(search.invitationId);

  useEffect(() => {
    if (isInvitationSuccess && invitation) {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setEmail(invitation.email);
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setName(invitation.name ?? '');
    }
  }, [invitation, isInvitationSuccess]);

  // loading invitation
  if (isLoadingInvitations) {
    return (
      <Stack direction="column" spacing={1}>
        <Typography>{t(INVITATIONS_LOADING_MESSAGE)}</Typography>
        <LinearProgress />
      </Stack>
    );
  }

  const registerError = webRegisterError || mobileRegisterError;

  const handleNameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (shouldValidate) {
      setNameError(nameValidator(newName));
    }
  };

  const handleRegister = async () => {
    const lowercaseEmail = email.toLowerCase();
    const checkingEmail = emailValidator(lowercaseEmail);
    const checkingUsername = nameValidator(name);
    if (!verifyUserAgreements()) {
      // should never happen
      return;
    } else if (checkingEmail || checkingUsername) {
      setNameError(checkingUsername);
      setShouldValidate(true);
    } else {
      const token = await executeCaptcha(
        isMobile ? RecaptchaAction.SignUpMobile : RecaptchaAction.SignUp,
      );
      await (isMobile
        ? mobileSignUp({
            name: name.trim(),
            email: lowercaseEmail,
            captcha: token,
            challenge,
            lang: i18n.language,
            enableSaveActions,
          })
        : signUp({
            name: name.trim(),
            email: lowercaseEmail,
            captcha: token,
            url: search.url,
            lang: i18n.language,
            enableSaveActions,
          }));

      // navigate to success path
      navigate({
        to: '/auth/login/success',
        search: { email },
      });
    }
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack spacing={1}>
        <GraaspLogo height={90} sx={{ fill: theme.palette.primary.main }} />
        <Typography
          variant="h4"
          component="h2"
          id={SIGN_UP_HEADER_ID}
          textAlign="center"
        >
          {t(SIGN_UP_HEADER)}
        </Typography>
      </Stack>
      <FormControl>
        <Stack direction="column" spacing={1}>
          <StyledTextField
            InputProps={{
              startAdornment: EmailAdornment,
            }}
            required
            placeholder={t(NAME_FIELD_LABEL)}
            variant="outlined"
            value={name}
            error={Boolean(nameError)}
            helperText={
              nameError &&
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              t(nameError, {
                min: MIN_USERNAME_LENGTH,
                max: MAX_USERNAME_LENGTH,
              })
            }
            onChange={handleNameOnChange}
            id={NAME_SIGN_UP_FIELD_ID}
            disabled={Boolean(invitation?.name)}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <EmailInput
            required
            value={email}
            setValue={setEmail}
            id={EMAIL_SIGN_UP_FIELD_ID}
            disabled={Boolean(invitation?.email)}
            shouldValidate={shouldValidate}
          />
          <Stack>
            <EnableAnalyticsForm
              enableSaveActions={enableSaveActions}
              onUpdateSaveActions={(enabled) => setEnableSaveActions(enabled)}
            />

            <AgreementForm useAgreementForm={agreementFormHook} />
          </Stack>
          <ErrorDisplay error={registerError} />
          <LoadingButton
            variant="contained"
            id={SIGN_UP_BUTTON_ID}
            loading={isLoadingSignUp || isLoadingMobileSignUp}
            onClick={handleRegister}
            fullWidth
            disabled={!userHasAcceptedAllTerms || !email.length || !name.length}
          >
            {t(SIGN_UP_BUTTON)}
          </LoadingButton>
        </Stack>
      </FormControl>
      <Typography>{t(SIGN_IN_LINK_TEXT)}</Typography>
      <Link to="/auth/login" search={search}>
        {t(SIGN_IN_LINK_TEXT_BUTTON)}
      </Link>
    </Stack>
  );
}
