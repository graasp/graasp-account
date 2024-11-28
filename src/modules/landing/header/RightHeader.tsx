import { useTranslation } from 'react-i18next';

import { Stack } from '@mui/material';

import { ArrowRightIcon } from 'lucide-react';

import { useAuth } from '@/AuthContext';
import { ButtonLink } from '@/components/ui/ButtonLink';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import { NS } from '@/config/constants';
import { mutations } from '@/config/queryClient';

export function RightHeader(): JSX.Element {
  const { isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation(NS.Common);
  const { t: translateLanding } = useTranslation(NS.Landing);
  const { mutate } = mutations.useEditCurrentMember();

  const handleLanguageChange = (lang: string) => {
    mutate({ extra: { lang } });
    i18n.changeLanguage(lang);
  };

  if (isAuthenticated) {
    return (
      <Stack gap={2} direction="row" alignItems="center">
        <LanguageSwitch lang={i18n.language} onChange={handleLanguageChange} />
        <ButtonLink to="/account" endIcon={<ArrowRightIcon />}>
          {translateLanding('NAV.GO_TO_GRAASP')}
        </ButtonLink>
      </Stack>
    );
  }

  return (
    <Stack gap={2} direction="row" id="leftTitleWrapper" alignItems="center">
      <LanguageSwitch lang={i18n.language} onChange={handleLanguageChange} />
      <ButtonLink to="/auth/login">{t('LOG_IN.BUTTON_TEXT')}</ButtonLink>
      <ButtonLink to="/auth/register">{t('REGISTER.BUTTON_TEXT')}</ButtonLink>
    </Stack>
  );
}
