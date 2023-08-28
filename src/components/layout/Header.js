import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { AppBar, Toolbar, Typography, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { GraaspLogo } from '@graasp/ui';

import PropTypes from 'prop-types';

import { APP_NAME, GRAASP_LOGO_HEADER_HEIGHT } from '../../config/constants';
import { HOME_PATH } from '../../config/paths';
import { HEADER_APP_BAR_ID } from '../../config/selectors';
import SettingsHeader from '../common/SettingsHeader';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  zIndex: theme.zIndex.drawer + 1,
}));
const StyledDiv = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
}));

const Header = ({ isMenuOpen, toggleMenu }) => {
  const renderMenuIcon = () => {
    if (isMenuOpen) {
      return (
        <IconButton onClick={() => toggleMenu(false)} color="inherit">
          <MenuOpenIcon />
        </IconButton>
      );
    }
    return (
      <IconButton onClick={() => toggleMenu(true)} color="inherit">
        <MenuIcon />
      </IconButton>
    );
  };

  return (
    <AppBar position="fixed" id={HEADER_APP_BAR_ID}>
      <StyledToolbar>
        <StyledDiv>
          {renderMenuIcon()}
          <StyledLink to={HOME_PATH}>
            <GraaspLogo
              sx={{ fill: 'white' }}
              height={GRAASP_LOGO_HEADER_HEIGHT}
            />
            <Typography variant="h6" color="inherit" m={2}>
              {APP_NAME}
            </Typography>
          </StyledLink>
        </StyledDiv>
        <SettingsHeader />
      </StyledToolbar>
    </AppBar>
  );
};

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

export default Header;
