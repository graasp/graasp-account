import { ReactNode } from 'react';

import { Stack, Typography } from '@mui/material';

import RoundedStack from '../common/RoundedStack';

type BorderedSectionProps = {
  id?: string;
  title: string;
  actions: ReactNode[];
  children: ReactNode;
};
export const BorderedSection = ({
  id,
  title,
  actions,
  children,
}: BorderedSectionProps): JSX.Element => (
  <RoundedStack id={id}>
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h5">{title}</Typography>
      <Stack direction="row" gap={1}>
        {actions}
      </Stack>
    </Stack>
    {children}
  </RoundedStack>
);

export default BorderedSection;
