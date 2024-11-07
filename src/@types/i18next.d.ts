// import the original type declarations
import 'i18next';

import account from '../../public/locales/en/account.json';
import enums from '../../public/locales/en/enums.json';
import landing from '../../public/locales/en/landing.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      account: typeof account;
      landing: typeof landing;
      enums: typeof enums;
    };
  }
}
