import { initReactI18next, useTranslation } from 'react-i18next';

import buildI18n, { namespaces } from '@graasp/translations';

import ar from '../langs/ar.json';
import de from '../langs/de.json';
import en from '../langs/en.json';
import es from '../langs/es.json';
import fr from '../langs/fr.json';
import it from '../langs/it.json';

const i18n = buildI18n().use(initReactI18next);

export const ACCOUNT_NAMESPACE = 'account';
i18n.addResourceBundle('en', ACCOUNT_NAMESPACE, en);
i18n.addResourceBundle('fr', ACCOUNT_NAMESPACE, fr);
i18n.addResourceBundle('it', ACCOUNT_NAMESPACE, it);
i18n.addResourceBundle('de', ACCOUNT_NAMESPACE, de);
i18n.addResourceBundle('es', ACCOUNT_NAMESPACE, es);
i18n.addResourceBundle('ar', ACCOUNT_NAMESPACE, ar);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCommonTranslation = () => useTranslation(namespaces.common);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAccountTranslation = () => useTranslation(ACCOUNT_NAMESPACE);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useMessagesTranslation = () => useTranslation(namespaces.messages);

export default i18n;
