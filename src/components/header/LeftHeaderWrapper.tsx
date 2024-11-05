import { Button, Stack } from '@mui/material';

import { buildSignInPath } from '@graasp/sdk';
import { Avatar } from '@graasp/ui';

import { Link } from '@tanstack/react-router';

import { useAuth } from '@/AuthContext';
import { GRAASP_AUTH_HOST } from '@/config/env';
import { useAccountTranslation } from '@/config/i18n';
import { mutations } from '@/config/queryClient';
import { ACCOUNT } from '@/langs/constants';

import LanguageSwitch from '../main/LanguageSwitch';

export function LeftHeaderWrapper(): JSX.Element {
  const { isAuthenticated, user, logout } = useAuth();
  const { t, i18n } = useAccountTranslation();
  const { mutate } = mutations.useEditCurrentMember();

  const handleLanguageChange = (lang: string) => {
    mutate({ extra: { lang } });
    i18n.changeLanguage(lang);
  };
  if (isAuthenticated) {
    return (
      <Stack direction="row" alignItems="center">
        <Avatar alt={user.name} />
        <Button onClick={logout}>{t(ACCOUNT.LOGOUT_BUTTON)}</Button>
      </Stack>
    );
  }

  return (
    <Stack gap={2} direction="row" id="leftTitleWrapper" alignItems="center">
      <LanguageSwitch lang={i18n.language} onChange={handleLanguageChange} />
      <Button
        component={Link}
        to={buildSignInPath({
          host: GRAASP_AUTH_HOST,
          redirectionUrl: window.location.href,
          lang: i18n.language,
        })}
      >
        {t(ACCOUNT.LOG_IN_BUTTON)}
      </Button>
      <Button component={Link} to="/register">
        {t(ACCOUNT.REGISTER_BUTTON)}
      </Button>
    </Stack>
  );
}
