import { useTranslation } from 'react-i18next';

import { Button, Stack } from '@mui/material';

import { buildSignInPath } from '@graasp/sdk';
import { Avatar } from '@graasp/ui';

import { Link } from '@tanstack/react-router';

import { useAuth } from '@/AuthContext';
import { NS } from '@/config/constants';
import { GRAASP_AUTH_HOST } from '@/config/env';
import { mutations } from '@/config/queryClient';

import LanguageSwitch from '../../../components/common/LanguageSwitch';

export function RightHeader(): JSX.Element {
  const { isAuthenticated, user, logout } = useAuth();
  const { t, i18n } = useTranslation(NS.Common);
  const { mutate } = mutations.useEditCurrentMember();

  const handleLanguageChange = (lang: string) => {
    mutate({ extra: { lang } });
    i18n.changeLanguage(lang);
  };
  if (isAuthenticated) {
    return (
      <Stack direction="row" alignItems="center">
        <Avatar alt={user.name} />
        <Button onClick={logout}>{t('LOGOUT.BUTTON_TEXT')}</Button>
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
        {t('LOG_IN.BUTTON_TEXT')}
      </Button>
      <Button component={Link} to="/register">
        {t('REGISTER.BUTTON_TEXT')}
      </Button>
    </Stack>
  );
}
