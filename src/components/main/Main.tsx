import React, { useContext } from 'react';

import { CssBaseline, styled } from '@mui/material';
import Drawer from '@mui/material/Drawer';

import { DRAWER_WIDTH } from '@graasp/ui';

import { HEADER_HEIGHT, LEFT_MENU_WIDTH } from '../../config/constants';
import { LayoutContext } from '../context/LayoutContext';
import Header from '../layout/Header';
import MainMenu from './MainMenu';

const Blank = styled('main')(() => ({ height: HEADER_HEIGHT }));

const StyledMain = styled('main')<{ isMainMenuOpen: boolean }>(
  ({ theme, isMainMenuOpen }) => ({
    position: 'relative',
    padding: theme.spacing(3),
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -LEFT_MENU_WIDTH,
    height: '100vh',
    ...(isMainMenuOpen
      ? {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        }
      : {}),
  }),
);

type Props = {
  children?: React.ReactNode;
};

const Main = ({ children }: Props): JSX.Element => {
  const { isMainMenuOpen, setIsMainMenuOpen } = useContext(LayoutContext);

  const toggleDrawer = (isOpen: boolean) => {
    setIsMainMenuOpen(isOpen);
  };

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Header toggleMenu={toggleDrawer} isMenuOpen={isMainMenuOpen} />
      <Drawer
        sx={{ width: DRAWER_WIDTH }}
        variant="persistent"
        open={isMainMenuOpen}
      >
        <Blank />
        <div role="presentation">
          <MainMenu />
        </div>
      </Drawer>

      <StyledMain isMainMenuOpen={isMainMenuOpen}>
        <Blank />
        {children}
      </StyledMain>
    </div>
  );
};

export default Main;
