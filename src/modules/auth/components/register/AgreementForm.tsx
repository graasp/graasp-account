import { Trans, useTranslation } from 'react-i18next';

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';

import { Link } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import { SIGN_UP_AGREEMENTS_CHECKBOX_ID } from '@/config/selectors';

import { AUTH } from '~auth/langs';

import { UseAgreementForm } from '../../hooks/useAgreementForm';

type Props = {
  useAgreementForm: UseAgreementForm;
};

export function AgreementForm({ useAgreementForm }: Props) {
  const { t } = useTranslation(NS.Auth);

  const { userHasAcceptedAllTerms, updateUserAgreements, hasError } =
    useAgreementForm;

  const errorColor = 'error';

  return (
    <FormGroup>
      <FormControlLabel
        checked={userHasAcceptedAllTerms}
        onChange={(_, checked) => updateUserAgreements(checked)}
        required
        control={
          <Checkbox
            color={hasError ? errorColor : 'primary'}
            data-cy={SIGN_UP_AGREEMENTS_CHECKBOX_ID}
            size="small"
          />
        }
        label={
          <Typography
            display="inline"
            fontSize="small"
            color={hasError ? errorColor : 'default'}
          >
            <Trans
              i18nKey={AUTH.USER_AGREEMENTS_CHECKBOX_LABEL}
              values={{
                sign_up_btn: t(AUTH.SIGN_UP_BUTTON),
                terms_of_service: t(AUTH.USER_AGREEMENTS_TERMS_OF_SERVICE),
                privacy_policy: t(AUTH.USER_AGREEMENTS_PRIVACY_POLICY),
              }}
              components={[
                <strong key="sign_up_btn"></strong>,
                <Link
                  key="terms_of_service_link"
                  to="/terms"
                  target="_blank"
                  rel="noreferrer"
                >
                  _
                </Link>,
                <Link
                  key="privacy_policy_link"
                  to="/policy"
                  target="_blank"
                  rel="noreferrer"
                >
                  _
                </Link>,
              ]}
              t={t}
            />
          </Typography>
        }
      />
    </FormGroup>
  );
}
