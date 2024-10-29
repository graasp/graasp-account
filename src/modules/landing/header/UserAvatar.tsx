import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';

import { LogOutIcon, SettingsIcon } from 'lucide-react';

import { AuthenticatedMember } from '@/AuthContext';
import { NS } from '@/config/constants';
import { hooks } from '@/config/queryClient';

import { MenuItemLink } from './userMenu/MenuItemLink';

type UserAvatarProps = {
  user: AuthenticatedMember;
  logout: () => void;
};
export function UserAvatar({ user, logout }: UserAvatarProps): JSX.Element {
  const { t } = useTranslation(NS.Common);
  const { data: avatarUrl } = hooks.useAvatarUrl({
    id: user.id,
    size: ThumbnailSize.Small,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar src={avatarUrl} alt={user.name} />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{ paper: { sx: { padding: 0 } } }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItemLink to="/account">
          <Stack direction="row" alignItems="center">
            <ListItemIcon>
              <Avatar
                src={avatarUrl}
                alt={user.name}
                sx={{ width: 24, height: 24 }}
              />
            </ListItemIcon>
            {user.name}
          </Stack>
        </MenuItemLink>
        <MenuItemLink to="/account/settings">
          <Stack direction="row" alignItems="center">
            <ListItemIcon>
              <SettingsIcon size="1.2rem" />
            </ListItemIcon>
            {t('USER_MENU.SETTINGS')}
          </Stack>
        </MenuItemLink>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogOutIcon size="1.2rem" />
          </ListItemIcon>
          {t('LOGOUT.BUTTON_TEXT')}
        </MenuItem>
      </Menu>
    </>
  );
}
