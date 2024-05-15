import { useLocation, useNavigate } from 'react-router-dom';

import { Whatshot } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import HomeIcon from '@mui/icons-material/Home';
import PasswordIcon from '@mui/icons-material/Password';
import ProfileIcon from '@mui/icons-material/Person2';
import { ListItemButton } from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { DRAWER_WIDTH } from '@graasp/ui';

import { useAccountTranslation } from '../../config/i18n';
import {
  AVATAR_SETTINGS_PATH,
  HOME_PATH,
  MANAGE_ACCOUNT_PATH,
  PASSWORD_SETTINGS_PATH,
  PROFILE_PATH,
  PUBLIC_PROFILE_PATH,
  STORAGE_PATH,
} from '../../config/paths';

const MainMenu = (): JSX.Element => {
  const { t } = useAccountTranslation();
  const push = useNavigate();
  const { pathname } = useLocation();

  const goTo = (path: string) => {
    push(path);
  };

  return (
    <List sx={{ width: DRAWER_WIDTH }}>
      <ListItemButton
        onClick={() => goTo(HOME_PATH)}
        selected={pathname === HOME_PATH}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>

        <ListItemText primary={t('MAIN_MENU_HOME_PAGE')} />
      </ListItemButton>

      <ListItemButton
        onClick={() => goTo(PROFILE_PATH)}
        selected={pathname === PROFILE_PATH}
      >
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>

        <ListItemText primary={t('MAIN_MENU_PROFILE')} />
      </ListItemButton>
      <ListItemButton
        onClick={() => goTo(AVATAR_SETTINGS_PATH)}
        selected={pathname === AVATAR_SETTINGS_PATH}
      >
        <ListItemIcon>
          <CameraAltIcon />
        </ListItemIcon>

        <ListItemText primary={t('MAIN_MENU_AVATAR')} />
      </ListItemButton>
      <ListItemButton
        onClick={() => goTo(PASSWORD_SETTINGS_PATH)}
        selected={pathname === PASSWORD_SETTINGS_PATH}
      >
        <ListItemIcon>
          <PasswordIcon />
        </ListItemIcon>

        <ListItemText primary={t('MAIN_MENU_PASSWORD')} />
      </ListItemButton>
      <ListItemButton
        onClick={() => goTo(STORAGE_PATH)}
        selected={pathname === STORAGE_PATH}
      >
        <ListItemIcon>
          <DataUsageIcon />
        </ListItemIcon>

        <ListItemText primary={t('MAIN_MENU_STORAGE')} />
      </ListItemButton>
      <ListItemButton
        onClick={() => goTo(PUBLIC_PROFILE_PATH)}
        selected={pathname === PUBLIC_PROFILE_PATH}
      >
        <ListItemIcon>
          <ProfileIcon />
        </ListItemIcon>

        <ListItemText primary={t('MAIN_MENU_PUBLIC_PROFILE')} />
      </ListItemButton>
      <ListItemButton
        onClick={() => goTo(MANAGE_ACCOUNT_PATH)}
        selected={pathname === MANAGE_ACCOUNT_PATH}
      >
        <ListItemIcon>
          <Whatshot />
        </ListItemIcon>

        <ListItemText primary={t('MAIN_MENU_DESTRUCTIVE_SETTINGS')} />
      </ListItemButton>
      {/* <ListItemButton
        button
        onClick={() => goTo(SUBSCRIPTIONS_PATH)}
        selected={pathname === SUBSCRIPTIONS_PATH}
      >
        <ListItemIcon>
          <SubscriptionsIcon />
        </ListItemIcon>
        <ListItemText primary={t('Subscriptions')} />
      </ListItemButton>
      <ListItemButton
        button
        onClick={() => goTo(PAYMENT_OPTIONS_PATH)}
        selected={pathname === PAYMENT_OPTIONS_PATH}
      >
        <ListItemIcon>
          <PaymentIcon />
        </ListItemIcon>
        <ListItemText primary={t('Payment Options')} />
      </ListItemButton> */}
      {/* <ListItemButton>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary={t('Preferences')} />
      </ListItemButton> */}
    </List>
  );
};

export default MainMenu;
