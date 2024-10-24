import List from '@mui/material/List';

import { DRAWER_WIDTH } from '@graasp/ui';

import { HardDriveIcon, HouseIcon, SettingsIcon } from 'lucide-react';

import { useAccountTranslation } from '../../config/i18n';
import {
  ACCOUNT_HOME_PATH,
  ACCOUNT_SETTINGS_PATH,
  ACCOUNT_STORAGE_PATH,
} from '../../config/paths';
import { MainMenuItem } from '../ui/MainMenuItem';

const MainMenu = (): JSX.Element => {
  const { t } = useAccountTranslation();

  return (
    <List sx={{ width: DRAWER_WIDTH }}>
      <MainMenuItem
        to={ACCOUNT_HOME_PATH}
        icon={<HouseIcon />}
        text={t('MAIN_MENU_HOME_PAGE')}
      />
      <MainMenuItem
        to={ACCOUNT_SETTINGS_PATH}
        icon={<SettingsIcon />}
        text={t('MAIN_MENU_SETTINGS')}
      />
      <MainMenuItem
        to={ACCOUNT_STORAGE_PATH}
        icon={<HardDriveIcon />}
        text={t('MAIN_MENU_STORAGE')}
      />
    </List>
  );
};

export default MainMenu;
