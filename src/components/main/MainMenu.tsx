import { useLocation, useNavigate } from 'react-router-dom';

import List from '@mui/material/List';

import { DRAWER_WIDTH, MenuItem } from '@graasp/ui';

import {
  CircleUserRoundIcon,
  HardDriveIcon,
  HouseIcon,
  SettingsIcon,
} from 'lucide-react';

import { useAccountTranslation } from '../../config/i18n';
import {
  HOME_PATH,
  PROFILE_PATH,
  SETTINGS_PATH,
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
      <MenuItem
        icon={<HouseIcon />}
        text={t('MAIN_MENU_HOME_PAGE')}
        onClick={() => goTo(HOME_PATH)}
        selected={pathname === HOME_PATH}
      />
      <MenuItem
        icon={<CircleUserRoundIcon />}
        text={t('MAIN_MENU_PROFILE')}
        onClick={() => goTo(PROFILE_PATH)}
        selected={pathname === PROFILE_PATH}
      />
      <MenuItem
        icon={<HardDriveIcon />}
        text={t('MAIN_MENU_STORAGE')}
        onClick={() => goTo(STORAGE_PATH)}
        selected={pathname === STORAGE_PATH}
      />
      <MenuItem
        icon={<SettingsIcon />}
        text={t('MAIN_MENU_SETTINGS')}
        onClick={() => goTo(SETTINGS_PATH)}
        selected={pathname === SETTINGS_PATH}
      />
    </List>
  );
};

export default MainMenu;
