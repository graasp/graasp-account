import {
  Button,
  Grid2,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { Context } from '@graasp/sdk';
import {
  AccentColors,
  AnalyticsIcon,
  BuildIcon,
  LibraryIcon,
  Platform,
  PlayIcon,
} from '@graasp/ui';

import {
  GRAASP_ANALYTICS_HOST,
  GRAASP_BUILDER_HOST,
  GRAASP_LIBRARY_HOST,
  GRAASP_PLAYER_HOST,
} from '@/config/env';
import { useEnumsTranslation } from '@/config/i18n';

const PlatformProps = {
  [Platform.Builder]: {
    color: AccentColors.builder,
    Icon: BuildIcon,
    name: Context.Builder,
    href: GRAASP_BUILDER_HOST,
  },
  [Platform.Player]: {
    color: AccentColors.player,
    Icon: PlayIcon,
    name: Platform.Player,
    href: GRAASP_PLAYER_HOST,
  },
  [Platform.Library]: {
    color: AccentColors.library,
    Icon: LibraryIcon,
    name: Platform.Library,
    href: GRAASP_LIBRARY_HOST,
  },
  [Platform.Analytics]: {
    color: AccentColors.analytics,
    Icon: AnalyticsIcon,
    name: Platform.Analytics,
    href: GRAASP_ANALYTICS_HOST,
  },
};

type PlatformButtonProps = {
  platform: Platform;
  direction: 'left' | 'right';
  buttonText: string;
  description: string;
  caption: string;
};
export function PlatformButton({
  platform,
  direction,
  description,
  caption,
  buttonText,
}: PlatformButtonProps): JSX.Element {
  const { t: translatePlatforms } = useEnumsTranslation();
  const { color, name, Icon, href } = PlatformProps[platform];
  const alignItems = {
    xs: 'center',
    lg: direction === 'left' ? 'flex-start' : 'end',
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const icon = (
    <Icon
      primaryColor={color}
      secondaryColor="transparent"
      sx={{ flexShrink: 0 }}
    />
  );
  return (
    <Grid2
      id="puzzleButtonContainer"
      container
      size={{ xs: 6, lg: 12 }}
      gap={2}
      direction="column"
      alignItems={alignItems}

      // height="100%"
      // flex={1}
    >
      <Stack alignItems={alignItems}>
        {isSmallScreen && icon}
        <Typography variant="caption">{caption}</Typography>
        <Typography
          variant="h4"
          component="p"
          color={color}
          textTransform="capitalize"
        >
          {translatePlatforms(name)}
        </Typography>
      </Stack>
      <Stack
        // icon and text should be in reverse order when on the right side
        direction={direction == 'left' ? 'row' : 'row-reverse'}
        alignItems="center"
        gap={1}
        flex={1}
      >
        {!isSmallScreen && icon}
        <Typography textAlign={{ xs: 'center', lg: direction }}>
          {description}
        </Typography>
      </Stack>

      <Button
        href={href}
        sx={{ backgroundColor: color, color: 'white' }}
        {...(!isSmallScreen ? { fullWidth: true } : {})}
      >
        {buttonText}
      </Button>
    </Grid2>
  );
}
