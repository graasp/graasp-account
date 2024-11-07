import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { styled, useTheme } from '@mui/material';

import { Context } from '@graasp/sdk';
import {
  Main,
  Platform,
  PlatformSwitch,
  PlatformSwitchProps,
  useMobileView,
  usePlatformNavigation,
} from '@graasp/ui';

import { Link } from '@tanstack/react-router';
import { UserRoundIcon } from 'lucide-react';

import UserSwitchWrapper from '@/components/common/UserSwitchWrapper';
import { platformsHostsMap } from '@/config/hostMapper';
import { ACCOUNT_HOME_PATH } from '@/config/paths';

import MainMenu from '~account/MainMenu';

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
}));

const LinkComponent = ({ children }: { children: ReactNode }): JSX.Element => (
  <StyledLink to={ACCOUNT_HOME_PATH}>{children}</StyledLink>
);

const AccountIcon: PlatformSwitchProps['CustomMobileIcon'] = (props) => (
  <UserRoundIcon {...props} />
);

export function PageWrapper({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { t } = useTranslation();
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
      {children}
    </Main>
  );
}
