import { ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';
import { Box, styled, useTheme } from '@mui/material';

import { Context } from '@graasp/sdk';
import {
  Main,
  Platform,
  PlatformSwitch,
  PlatformSwitchProps,
  useMobileView,
  usePlatformNavigation,
} from '@graasp/ui';

import UserSwitchWrapper from '@/components/common/UserSwitchWrapper';
import MainMenu from '@/components/main/MainMenu';
import { platformsHostsMap } from '@/config/hostMapper';
import { useAccountTranslation } from '@/config/i18n';
import { HOME_PATH } from '@/config/paths';

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
}));

const LinkComponent = ({ children }: { children: ReactNode }): JSX.Element => (
  <StyledLink to={HOME_PATH}>{children}</StyledLink>
);

const AccountIcon: PlatformSwitchProps['CustomMobileIcon'] = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <PersonIcon {...props} />
);

const PageWrapper = (): JSX.Element => {
  const { t } = useAccountTranslation();
  const theme = useTheme();
  const { isMobile } = useMobileView();
  const getNavigationEvents = usePlatformNavigation(platformsHostsMap);
  const platformProps = {
    [Platform.Builder]: {
      ...getNavigationEvents(Platform.Builder),
    },
    [Platform.Player]: {
      ...getNavigationEvents(Platform.Player),
    },
    [Platform.Library]: {
      ...getNavigationEvents(Platform.Library),
    },
    [Platform.Analytics]: {
      ...getNavigationEvents(Platform.Analytics),
    },
  };

  return (
    <Main
      open
      context={Context.Account}
      drawerContent={<MainMenu />}
      drawerOpenAriaLabel={t('Open Drawer')}
      LinkComponent={LinkComponent}
      PlatformComponent={
        <PlatformSwitch
          CustomMobileIcon={AccountIcon}
          platformsProps={platformProps}
          color={
            isMobile ? theme.palette.primary.main : theme.palette.secondary.main
          }
          accentColor={
            isMobile ? theme.palette.secondary.main : theme.palette.primary.main
          }
        />
      }
      headerRightContent={<UserSwitchWrapper />}
    >
      <Box p={2} height="100%">
        <Outlet />
      </Box>
    </Main>
  );
};
export default PageWrapper;
