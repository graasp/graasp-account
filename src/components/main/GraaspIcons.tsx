import React from 'react';
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
      component={Link}
      to={href}
      bgcolor={color}
      borderRadius="50%"
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
  const platforms = [
    {
      color: AccentColors[Context.Builder],
      text: Platform.Builder,
      href: getNavigationEvents(Platform.Builder).href,
      icon: <BuildIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />,
    },
    {
      color: AccentColors[Context.Player],
      text: Platform.Player,
      href: getNavigationEvents(Platform.Player).href,
      icon: <PlayIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />,
    },
    {
      color: AccentColors[Context.Library],
      text: Platform.Library,
      href: getNavigationEvents(Platform.Library).href,
      icon: <LibraryIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />,
    },
    {
      color: AccentColors[Context.Analytics],
      text: Platform.Analytics,
      href: getNavigationEvents(Platform.Analytics).href,
      icon: <AnalyticsIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />,
    },
  ];
  return (
    <Grid2 container spacing={4}>
      {platforms.map((platform) => (
        <Grid2 xs={6} sm={3} key={platform.text}>
          <PlatformIcon
            color={platform.color}
            text={platform.text}
            href={platform.href}
            icon={platform.icon}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default GraaspIcons;
