import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANG } from '@graasp/translations';

import i18n from 'i18next';
import Fetch from 'i18next-fetch-backend';

i18n
  .use(Fetch)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANG,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
