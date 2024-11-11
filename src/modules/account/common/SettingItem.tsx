import { ReactNode } from 'react';

import { Stack, Typography } from '@mui/material';

type Props = {
  readonly title: string;
  readonly content?: ReactNode;
  readonly contentId: string;
};
export function SettingItem({ title, content, contentId }: Props): JSX.Element {
  return (
    <Stack direction="row" gap={2} alignItems="center">
      <Typography variant="body1" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="body1" id={contentId}>
        {content}
      </Typography>
    </Stack>
  );
}
