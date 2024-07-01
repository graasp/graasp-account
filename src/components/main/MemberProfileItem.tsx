import { ReactNode } from 'react';

import { Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  content?: ReactNode;
  contentId: string;
};
const MemberProfileItem = ({
  title,
  content,
  contentId,
}: Props): JSX.Element => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Typography variant="body1" color="textSecondary">
      {title}
    </Typography>
    <Typography variant="body1" id={contentId}>
      {content}
    </Typography>
  </Stack>
);

export default MemberProfileItem;
