import { initReactI18next, useTranslation } from 'react-i18next';

import buildI18n, { namespaces } from '@graasp/translations';

import en from '../langs/en.json';
import fr from '../langs/fr.json';

const i18n = buildI18n().use(initReactI18next);

export const ACCOUNT_NAMESPACE = 'account';
i18n.addResourceBundle('en', ACCOUNT_NAMESPACE, en);
i18n.addResourceBundle('fr', ACCOUNT_NAMESPACE, fr);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCommonTranslation = () => useTranslation(namespaces.common);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAccountTranslation = () => useTranslation(ACCOUNT_NAMESPACE);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useMessagesTranslation = () => useTranslation(namespaces.messages);

export default i18n;
