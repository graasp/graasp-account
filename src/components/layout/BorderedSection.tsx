import { ReactNode } from 'react';

import { Stack, Typography } from '@mui/material';

type BorderedSectionProps = {
  id?: string;
  title: string;
  topActions?: ReactNode[];
  children: ReactNode;
};
export function BorderedSection({
  id,
  title,
  topActions,
  children,
}: Readonly<BorderedSectionProps>): JSX.Element {
  return (
    <Stack
      id={id}
      border="1px solid"
      borderColor="divider"
      borderRadius={1}
      p={2}
      spacing={1}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">{title}</Typography>
        <Stack direction="row" gap={1}>
          {topActions}
        </Stack>
      </Stack>
      {children}
    </Stack>
  );
}
