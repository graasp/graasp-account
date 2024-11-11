// import the original type declarations
import { FAILURE_MESSAGES } from '@graasp/translations';

import 'i18next';

import account from '../../public/locales/en/account.json';
import common from '../../public/locales/en/common.json';
import enums from '../../public/locales/en/enums.json';
import landing from '../../public/locales/en/landing.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      account: typeof account;
      landing: typeof landing;
      enums: typeof enums;
      common: typeof common;
      // TODO: make it work with the messages from translations
      messages: typeof FAILURE_MESSAGES;
    };
  }
}
