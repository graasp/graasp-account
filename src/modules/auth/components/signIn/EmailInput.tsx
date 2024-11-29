import { UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { NS } from '@/config/constants';

import { StyledTextField } from '../common/StyledTextField';
import { EmailAdornment } from '../common/adornments';

type Props = {
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  form: UseFormRegisterReturn<'email'>;
  error?: string;
  placeholder: string;
};

export function EmailInput({
  id,
  disabled = false,
  autoFocus = false,
  form,
  error,
  placeholder,
}: Readonly<Props>): JSX.Element {
  const { t } = useTranslation(NS.Auth);

  return (
    <StyledTextField
      id={id}
      slotProps={{
        input: {
          startAdornment: EmailAdornment,
        },
      }}
      variant="outlined"
      error={Boolean(error)}
      placeholder={placeholder}
      helperText={
        error &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        t(error)
      }
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
      disabled={disabled}
      {...form}
    />
  );
}
