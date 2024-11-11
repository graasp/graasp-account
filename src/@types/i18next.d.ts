// import the original type declarations
import 'i18next';

import account from '../../public/locales/en/account.json';
import common from '../../public/locales/en/common.json';
import enums from '../../public/locales/en/enums.json';
import landing from '../../public/locales/en/landing.json';
import messages from '../../public/locales/en/messages.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      account: typeof account;
      landing: typeof landing;
      enums: typeof enums;
      common: typeof common;
      messages: typeof messages;
    };
  }
}
export type MessageKeys = typeof messages;
