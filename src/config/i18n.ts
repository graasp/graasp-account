/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { initReactI18next, useTranslation } from 'react-i18next';

import buildI18n, { namespaces } from '@graasp/translations';

import en from '../langs/en.json';
import fr from '../langs/fr.json';

const i18n = buildI18n().use(initReactI18next);

export const ACCOUNT_NAMESPACE = 'account';
i18n.addResourceBundle('en', ACCOUNT_NAMESPACE, en);
i18n.addResourceBundle('fr', ACCOUNT_NAMESPACE, fr);

export const useCommonTranslation = () => useTranslation(namespaces.common);
export const useAccountTranslation = () => useTranslation(namespaces.account);
export const useMessagesTranslation = () => useTranslation(namespaces.messages);
export const useEnumsTranslation = () => useTranslation(namespaces.enums);
export const useCategoriesTranslation = () =>
  useTranslation(namespaces.categories);
export const useChatboxTranslation = () => useTranslation(namespaces.chatbox);

export default i18n;