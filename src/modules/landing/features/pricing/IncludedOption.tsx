import { Stack, Typography } from '@mui/material';

import { useButtonColor } from '@graasp/ui';

import { CheckIcon } from 'lucide-react';

export function IncludedOption({ text }: Readonly<{ text: string }>) {
  const { color } = useButtonColor('success');

  return (
    <Stack direction="row" gap={1}>
      <CheckIcon
        style={{ verticalAlign: 'text-bottom', flexShrink: 0 }}
        color={color}
      />
      <Typography>{text}</Typography>
    </Stack>
  );
}
