import { UseFormRegisterReturn } from 'react-hook-form';

import { TextField } from '@mui/material';

type Props = {
  id: string;
  label: string;
  error: boolean;
  helperText?: string;
  form: UseFormRegisterReturn;
};

const PasswordField = ({
  id,
  label,
  error,
  helperText,
  form,
}: Props): JSX.Element => (
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
