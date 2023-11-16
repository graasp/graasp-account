import React from 'react';

import { IconButton, InputAdornment, SvgIcon, TextField } from '@mui/material';

interface Props {
  label: string;
  value: string;
  name: string;
  helperText: string | false;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?: typeof SvgIcon;
  isError: boolean;
  rows?: number;
  multiline?: boolean;
  required?: boolean;
}
const TextFieldWithValidation = ({
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
}: Props): JSX.Element => (
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
          <InputAdornment position="start">
            <IconButton edge="end">
              <Icon />
            </IconButton>
          </InputAdornment>
        ),
      }
    }
  />
);

export default TextFieldWithValidation;
