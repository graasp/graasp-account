import React from 'react';

import { Box, Grid, Stack, Tooltip, Typography } from '@mui/material';

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
      sx={{
        bgcolor: color,
        borderRadius: '50%',
        height: '125px',
        width: '125px',
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Tooltip placement="bottom-end" title={text}>
        <a href={href} aria-label={text}>
          {icon}
        </a>
      </Tooltip>
    </Box>
    <Typography color={color} fontWeight="bold">
      {text}
    </Typography>
  </Stack>
);
const GraaspIcons = (): JSX.Element => {
  const getNavigationEvents = usePlatformNavigation(platformsHostsMap);

  return (
    <Grid container spacing={4}>
      <Grid item xs={6} sm={3}>
        <PlatformIcon
          color={AccentColors[Context.Builder]}
          text={Platform.Builder}
          href={getNavigationEvents(Platform.Builder).href}
          icon={<BuildIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <PlatformIcon
          color={AccentColors[Context.Player]}
          text={Platform.Player}
          href={getNavigationEvents(Platform.Player).href}
          icon={<PlayIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <PlatformIcon
          color={AccentColors[Context.Library]}
          text={Platform.Library}
          href={getNavigationEvents(Platform.Library).href}
          icon={<LibraryIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <PlatformIcon
          color={AccentColors[Context.Analytics]}
          text={Platform.Analytics}
          href={getNavigationEvents(Platform.Analytics).href}
          icon={<AnalyticsIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />}
        />
      </Grid>
    </Grid>
  );
};

export default GraaspIcons;
