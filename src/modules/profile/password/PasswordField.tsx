import { UseFormRegisterReturn } from 'react-hook-form';

import { TextField } from '@mui/material';

type Props<T extends string> = {
  id: string;
  label: string;
  error: boolean;
  helperText?: string;
  form: UseFormRegisterReturn<T>;
};

const PasswordField = <T extends string>({
  id,
  label,
  error,
  helperText,
  form,
}: Props<T>): JSX.Element => (
  <TextField
    required
    label={label}
    variant="outlined"
    size="small"
    error={error}
    helperText={helperText}
    type="password"
    id={id}
    {...form}
  />
);

export default PasswordField;
