import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NS } from '@/config/constants';

import { AUTH } from '~auth/langs';
import { emailValidator } from '~auth/validation';

import { StyledTextField } from '../common/StyledTextField';
import { EmailAdornment } from '../common/adornments';

type Props = {
  required?: boolean;
  value: string;
  id?: string;
  disabled?: boolean;
  setValue: (str: string) => void;
  shouldValidate: boolean;
  autoFocus?: boolean;
};

export function EmailInput({
  required = false,
  value = '',
  id,
  disabled = false,
  setValue,
  shouldValidate = true,
  autoFocus = false,
}: Props) {
  const { t } = useTranslation(NS.Auth);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shouldValidate) {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setError(emailValidator(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldValidate]);

  const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e?.target?.value;
    setValue?.(newEmail);
    if (shouldValidate) {
      setError(emailValidator(newEmail));
    }
  };

  return (
    <StyledTextField
      slotProps={{
        input: {
          startAdornment: EmailAdornment,
        },
      }}
      variant="outlined"
      value={value}
      error={Boolean(error)}
      helperText={
        error &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        t(error)
      }
      placeholder={t(
        `${AUTH.EMAIL_INPUT_PLACEHOLDER}${required ? '_REQUIRED' : ''}`,
      )}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
      onChange={handleEmailOnChange}
      id={id}
      type="email"
      disabled={disabled}
    />
  );
}
