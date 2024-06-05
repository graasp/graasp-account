import { Grid, Typography } from '@mui/material';

type Props = {
  title: string;
  content?: string;
  contentId: string;
};
const MemberProfileItem = ({
  title,
  content,
  contentId,
}: Props): JSX.Element => (
  <>
    <Grid item xs={12} sm={3}>
      <Typography variant="body1" color="textSecondary">
        {title}
      </Typography>
    </Grid>
    <Grid item xs={12} sm={9}>
      <Typography variant="body1" id={contentId}>
        {content}
      </Typography>
    </Grid>
  </>
);

export default MemberProfileItem;
