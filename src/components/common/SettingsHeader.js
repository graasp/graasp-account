import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { API_ROUTES } from '@graasp/query-client';

import truncate from 'lodash.truncate';

import {
  AUTHENTICATION_HOST,
  USERNAME_MAX_LENGTH,
} from '../../config/constants';
import { HOME_PATH } from '../../config/paths';
import { hooks, mutations } from '../../config/queryClient';
import {
  HEADER_USER_ID,
  USER_MENU_SIGN_OUT_OPTION_ID,
} from '../../config/selectors';
import Loader from './Loader';

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
  },
}));

const UsernameTitle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 2),
  maxWidth: 100,
}));

const SettingsHeader = () => {
  const { data: user, isLoading } = hooks.useCurrentMember();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const { mutate: signOut } = mutations.useSignOut();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  const goToProfile = () => {
    navigate(HOME_PATH);
  };

  const renderMenu = () => {
    if (!user) {
      return (
        <MenuItem
          component="a"
          href={`${AUTHENTICATION_HOST}/${API_ROUTES.SIGN_IN_ROUTE}`}
        >
          {t('Sign In')}
        </MenuItem>
      );
    }

    return [
      <MenuItem key="profile" onClick={goToProfile}>
        {t('Profile')}
      </MenuItem>,
      <MenuItem
        key="signout"
        onClick={handleSignOut}
        id={USER_MENU_SIGN_OUT_OPTION_ID}
      >
        {t('Sign Out')}
      </MenuItem>,
    ];
  };

  if (isLoading) {
    return <Loader />;
  }

  const username = user?.get('name');
  // todo: necessary broken image to display a letter
  const avatarImage = 'a missing avatar';

  return (
    <>
      <StyledBox onClick={handleClick} id={HEADER_USER_ID}>
        <Tooltip title={username ?? t('You are not signed in.')}>
          <Avatar alt={username} src={avatarImage} />
        </Tooltip>
        {username && (
          <UsernameTitle variant="subtitle1">
            {truncate(username, { length: USERNAME_MAX_LENGTH })}
          </UsernameTitle>
        )}
      </StyledBox>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {renderMenu()}
      </Menu>
    </>
  );
};

export default SettingsHeader;
