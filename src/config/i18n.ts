import { initReactI18next, useTranslation } from 'react-i18next';

import { DEFAULT_LANG, namespaces } from '@graasp/translations';

import i18n from 'i18next';

import ar from '../langs/ar.json';
import de from '../langs/de.json';
import en from '../langs/en.json';
import es from '../langs/es.json';
import fr from '../langs/fr.json';
import it from '../langs/it.json';

const buildI18n = (defaultNamespace = namespaces.messages, debug?: boolean) => {
  i18n.init({
    resources: {
      en,
      fr,
      de,
      it,
      ar,
    },
    lng: DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    // debug only when not in production
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    debug: debug ?? process.env.NODE_ENV !== 'production',
    // define accessible namespaces
    ns: Object.values(namespaces),
    // define default namespace
    defaultNS: defaultNamespace,
    // keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
  });

  return i18n;
};
const i18nInstance = buildI18n().use(initReactI18next);

export const TRANS_NS = {
  ACCOUNT: 'account',
  LANDING: 'landing',
} as const;
i18nInstance.addResourceBundle('en', TRANS_NS.ACCOUNT, en);
i18nInstance.addResourceBundle('fr', TRANS_NS.ACCOUNT, fr);
i18nInstance.addResourceBundle('it', TRANS_NS.ACCOUNT, it);
i18nInstance.addResourceBundle('de', TRANS_NS.ACCOUNT, de);
i18nInstance.addResourceBundle('es', TRANS_NS.ACCOUNT, es);
i18nInstance.addResourceBundle('ar', TRANS_NS.ACCOUNT, ar);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCommonTranslation = () => useTranslation(namespaces.common);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useEnumsTranslation = () => useTranslation(namespaces.enums);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAccountTranslation = () => useTranslation(TRANS_NS.ACCOUNT);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useMessagesTranslation = () => useTranslation(namespaces.messages);

export default i18nInstance;
