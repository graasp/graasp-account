import { Stack, Typography } from '@mui/material';

import { Link } from '@tanstack/react-router';

type Props = {
  icon?: JSX.Element;
  contentId: string;
  content?: string;
  href?: string;
  hrefId?: string;
};
const DisplayLinks = ({
  icon,
  contentId,
  content,
  href,
  hrefId,
}: Props): JSX.Element => (
  <Stack direction="row" spacing={1}>
    <Typography variant="body1" color="textSecondary">
      {icon}
    </Typography>

    <Typography variant="body1" id={contentId}>
      {href ? (
        <Link to={href} id={hrefId}>
          {content}
        </Link>
      ) : (
        content
      )}
    </Typography>
  </Stack>
);
export default DisplayLinks;
