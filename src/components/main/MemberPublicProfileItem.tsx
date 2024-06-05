import { Link } from 'react-router-dom';

import { Stack, StackOwnProps, Typography } from '@mui/material';

type Props = {
  icon?: JSX.Element;
  title?: string;
  content?: string;
  emptyMessage: string;
  contentId: string;
  stackDirection?: StackOwnProps['direction'];
  href: string;
};
const MemberPublicProfileItem = ({
  icon,
  title,
  content,
  emptyMessage,
  contentId,
  stackDirection,
  href,
}: Props): JSX.Element => (
  <Stack direction={stackDirection} spacing={1}>
    {title && (
      <Typography variant="body1" color="textSecondary">
        {title}
      </Typography>
    )}
    {icon && (
      <Typography variant="body1" color="textSecondary">
        {icon}
      </Typography>
    )}
    {content ? (
      <Typography variant="body1" id={contentId}>
        {href ? <Link to={href}>{content}</Link> : content}
      </Typography>
    ) : (
      <Typography variant="body1" id={contentId}>
        {emptyMessage}
      </Typography>
    )}
  </Stack>
);
export default MemberPublicProfileItem;
