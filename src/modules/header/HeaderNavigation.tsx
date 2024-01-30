import { Link } from 'react-router-dom';

import { Stack, Typography, styled } from '@mui/material';

import {
  GraaspLogo,
  Platform,
  PlatformSwitch,
  defaultHostsMapper,
  useMobileView,
  usePlatformNavigation,
} from '@graasp/ui';

import { APP_NAME, GRAASP_LOGO_HEADER_HEIGHT } from '@/config/constants';
import {
  GRAASP_ANALYTICS_HOST,
  GRAASP_BUILDER_HOST,
  GRAASP_LIBRARY_HOST,
} from '@/config/env';
import {
  APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS,
  APP_NAVIGATION_PLATFORM_SWITCH_ID,
} from '@/config/selectors';

// small converter for HOST_MAP into a usePlatformNavigation mapper
export const platformsHostsMap = defaultHostsMapper({
  [Platform.Builder]: GRAASP_BUILDER_HOST,
  [Platform.Library]: GRAASP_LIBRARY_HOST,
  [Platform.Analytics]: GRAASP_ANALYTICS_HOST,
});

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
}));

interface HeaderNavigationProps {
  rootId?: string;
  topItemName?: string;
}

export const HeaderNavigation = ({
  rootId = undefined, // this makes eslint happy with react/require-default-props
  topItemName = '',
}: HeaderNavigationProps): JSX.Element => {
  const getNavigationEvents = usePlatformNavigation(platformsHostsMap, rootId);
  const { isMobile } = useMobileView();

  const platformProps = {
    [Platform.Builder]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Builder],
      ...getNavigationEvents(Platform.Builder),
    },
    [Platform.Player]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Player],
      href: '/',
    },
    [Platform.Library]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Library],
      ...getNavigationEvents(Platform.Library),
    },
    [Platform.Analytics]: {
      id: APP_NAVIGATION_PLATFORM_SWITCH_BUTTON_IDS[Platform.Analytics],
      ...getNavigationEvents(Platform.Analytics),
    },
  };
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <StyledLink to="/">
        <GraaspLogo height={GRAASP_LOGO_HEADER_HEIGHT} sx={{ fill: 'white' }} />
        {!isMobile && (
          <Typography variant="h6" color="inherit" ml={1}>
            {APP_NAME}
          </Typography>
        )}
      </StyledLink>
      <PlatformSwitch
        id={APP_NAVIGATION_PLATFORM_SWITCH_ID}
        selected={Platform.Player}
        platformsProps={platformProps}
        disabledColor="#999"
      />
      {!isMobile && <Typography>{topItemName}</Typography>}
    </Stack>
  );
};

export default HeaderNavigation;
