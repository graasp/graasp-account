import { ReactNode } from 'react';

import { Stack, Typography } from '@mui/material';

import RoundedStack from './RoundedStack';

type BorderedSectionProps = {
  id?: string;
  title: string;
  topActions?: ReactNode[];
  children: ReactNode;
};
export const BorderedSection = ({
  id,
  title,
  topActions,
  children,
}: BorderedSectionProps): JSX.Element => (
  <RoundedStack id={id}>
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h5">{title}</Typography>
      <Stack direction="row" gap={1}>
        {topActions}
      </Stack>
    </Stack>
    {children}
  </RoundedStack>
);

export default BorderedSection;
