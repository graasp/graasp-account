import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import Fetch from 'i18next-fetch-backend';

i18n
  .use(Fetch)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
