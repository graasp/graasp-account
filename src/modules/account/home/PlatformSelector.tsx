import { useTranslation } from 'react-i18next';

import { Box, Grid2 as Grid, Stack, Typography } from '@mui/material';

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

import { Link } from '@tanstack/react-router';

import { NS } from '@/config/constants';
import { platformsHostsMap } from '@/config/hostMapper';

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

export function PlatformSelector(): JSX.Element {
  const { t } = useTranslation(NS.Enums);
  const getNavigationEvents = usePlatformNavigation(platformsHostsMap);
  const platforms = [
    {
      color: AccentColors[Context.Builder],
      text: t(Context.Builder),
      href: getNavigationEvents(Platform.Builder).href,
      icon: <BuildIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />,
    },
    {
      color: AccentColors[Context.Player],
      text: t(Context.Player),
      href: getNavigationEvents(Platform.Player).href,
      icon: <PlayIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />,
    },
    {
      color: AccentColors[Context.Library],
      text: t(Context.Library),
      href: getNavigationEvents(Platform.Library).href,
      icon: <LibraryIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />,
    },
    {
      color: AccentColors[Context.Analytics],
      text: t(Context.Analytics),
      href: getNavigationEvents(Platform.Analytics).href,
      icon: <AnalyticsIcon size={DEFAULT_ICON_SIZE} primaryColor="white" />,
    },
  ];
  return (
    <Grid container spacing={4}>
      {platforms.map((platform) => (
        <Grid size={{ xs: 6, sm: 3 }} key={platform.text}>
          <PlatformIcon
            color={platform.color}
            text={platform.text}
            href={platform.href}
            icon={platform.icon}
          />
        </Grid>
      ))}
    </Grid>
  );
}
