import { ReactNode } from 'react';

import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

type FormPropertyProps = {
  title: string;
  children: ReactNode;
};
const FormProperty = ({ title, children }: FormPropertyProps): JSX.Element => (
  <Grid2
    container
    direction={{ xs: 'column', sm: 'row' }}
    alignItems={{ xs: 'flex-start', sm: 'center' }}
    spacing={{ xs: 1, sm: 2 }}
  >
    <Grid2 xs={12} sm={4} p={0}>
      <Typography color="textSecondary">{title}</Typography>
    </Grid2>
    <Grid2 xs={12} sm={8} p={0}>
      {children}
    </Grid2>
  </Grid2>
);
export default FormProperty;
