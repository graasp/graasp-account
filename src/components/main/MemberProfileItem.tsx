import { ReactNode } from 'react';

import { Grid, Typography } from '@mui/material';

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
  <Grid container alignItems="center">
    <Grid item xs={6}>
      <Typography variant="body1" color="textSecondary">
        {title}
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography
        variant="body1"
        id={contentId}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {content}
      </Typography>
    </Grid>
  </Grid>
);

export default MemberProfileItem;
