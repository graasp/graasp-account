import { useTranslation } from 'react-i18next';

import { Stack } from '@mui/material';

import { useAuth } from '@/AuthContext';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';

import LanguageSwitch from '../../../components/common/LanguageSwitch';
import { UserAvatar } from './UserAvatar';

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
        <UserAvatar user={user} logout={logout} />
      </Stack>
    );
  }

  return (
    <Stack gap={2} direction="row" id="leftTitleWrapper" alignItems="center">
      <LanguageSwitch lang={i18n.language} onChange={handleLanguageChange} />
      <ButtonLink to="/auth/login" search={{ url: window.location.toString() }}>
        {t('LOG_IN.BUTTON_TEXT')}
      </ButtonLink>
      <ButtonLink
        to="/auth/register"
        search={{ url: window.location.toString() }}
      >
        {t('REGISTER.BUTTON_TEXT')}
      </ButtonLink>
    </Stack>
  );
}
