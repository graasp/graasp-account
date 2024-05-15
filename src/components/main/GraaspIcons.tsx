import { Link } from 'react-router-dom';

import { Box, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { Context } from '@graasp/sdk';
import {
  AccentColors,
  AnalyticsIcon,
  BuildIcon,
  LibraryIcon,
  Platform,
  PlayIcon,
  usePlatformNavigation,
} from '@graasp/ui';

import { platformsHostsMap } from '@/pages/PageWrapper';

const DEFAULT_ICON_SIZE = 100;

type PlatformProps = {
  text: string;
  href: string;
  color: string;
  icon: JSX.Element;
};
const PlatformIcon = ({ text, href, color, icon }: PlatformProps) => (
  <Stack spacing={2} justifyContent="center" alignItems="center">
    <Box
      p={1}
      // allow users to click on the icons to navigate
      component={Link}
      to={href}
      // set the background color to the platform color
      bgcolor={color}
      // make the background round
      borderRadius="50%"
      // this is needed to allow perfect circles. It looks like otherwise the <a> tag makes it a weird oval
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {icon}
    </Box>
    <Typography variant="h5" color={color}>
      {text}
    </Typography>
  </Stack>
);
const GraaspIcons = (): JSX.Element => {
  const getNavigationEvents = usePlatformNavigation(platformsHostsMap);

  return (
    <Grid2 container spacing={4}>
      <Grid2 xs={6} sm={3}>
        <PlatformIcon
          color={AccentColors[Context.Builder]}
          text={Platform.Builder}
          href={getNavigationEvents(Platform.Builder).href}
          icon={<BuildIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />}
        />
      </Grid2>
      <Grid2 xs={6} sm={3}>
        <PlatformIcon
          color={AccentColors[Context.Player]}
          text={Platform.Player}
          href={getNavigationEvents(Platform.Player).href}
          icon={<PlayIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />}
        />
      </Grid2>
      <Grid2 xs={6} sm={3}>
        <PlatformIcon
          color={AccentColors[Context.Library]}
          text={Platform.Library}
          href={getNavigationEvents(Platform.Library).href}
          icon={<LibraryIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />}
        />
      </Grid2>
      <Grid2 xs={6} sm={3}>
        <PlatformIcon
          color={AccentColors[Context.Analytics]}
          text={Platform.Analytics}
          href={getNavigationEvents(Platform.Analytics).href}
          icon={<AnalyticsIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />}
        />
      </Grid2>
    </Grid2>
  );
};

export default GraaspIcons;
