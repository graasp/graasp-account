import { useTranslation } from 'react-i18next';

import { Button, Stack } from '@mui/material';

import { buildSignInPath } from '@graasp/sdk';
import { Avatar } from '@graasp/ui';

import { Link } from '@tanstack/react-router';

import { useAuth } from '@/AuthContext';
import { NS } from '@/config/constants';
import { GRAASP_AUTH_HOST } from '@/config/env';
import { mutations } from '@/config/queryClient';

import LanguageSwitch from '~account/common/LanguageSwitch';

export function LeftHeaderWrapper(): JSX.Element {
  const { isAuthenticated, user, logout } = useAuth();
  const { t, i18n } = useTranslation(NS.Account);
  const { mutate } = mutations.useEditCurrentMember();

  const handleLanguageChange = (lang: string) => {
    mutate({ extra: { lang } });
    i18n.changeLanguage(lang);
  };
  if (isAuthenticated) {
    return (
      <Stack direction="row" alignItems="center">
        <Avatar alt={user.name} />
        <Button onClick={logout}>{t('LOGOUT_BUTTON')}</Button>
      </Stack>
    );
  }

  return (
    <Stack gap={2} direction="row" id="leftTitleWrapper">
      <LanguageSwitch lang={i18n.language} onChange={handleLanguageChange} />
      <Button
        component={Link}
        to={buildSignInPath({
          host: GRAASP_AUTH_HOST,
          redirectionUrl: window.location.href,
          lang: i18n.language,
        })}
      >
        {t('LOG_IN_BUTTON')}
      </Button>
      <Button component={Link} to="/register">
        {t('REGISTER_BUTTON')}
      </Button>
    </Stack>
  );
}
