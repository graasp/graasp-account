import React from 'react';

import { InputAdornment, TextField } from '@mui/material';

interface Props {
  label: string;
  value: string;
  name: string;
  helperText: string | false;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?: JSX.Element;
  isError: boolean;
  rows?: number;
  multiline?: boolean;
  required?: boolean;
  id: string;
}
export function CustomTextField({
  label,
  onChange,
  value,
  name,
  Icon,
  helperText,
  isError,
  rows = 4,
  multiline = false,
  required = false,
  id,
}: Props): JSX.Element {
  return (
    <TextField
      label={label}
      variant="outlined"
      onChange={onChange}
      type="text"
      margin="dense"
      fullWidth
      name={name}
      value={value}
      helperText={helperText}
      error={isError}
      rows={rows}
      required={required}
      multiline={multiline}
      InputProps={
        Icon && {
          startAdornment: (
            <InputAdornment position="start">{Icon}</InputAdornment>
          ),
        }
      }
      id={id}
    />
  );
}
