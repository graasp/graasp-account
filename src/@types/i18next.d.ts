// import the original type declarations
import 'i18next';

import account from '../locales/en/account.json';
import auth from '../locales/en/auth.json';
import common from '../locales/en/common.json';
import enums from '../locales/en/enums.json';
import landing from '../locales/en/landing.json';
import messages from '../locales/en/messages.json';
import player from '../locales/en/player.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      account: typeof account;
      auth: typeof auth;
      landing: typeof landing;
      player: typeof player;
      enums: typeof enums;
      common: typeof common;
      messages: typeof messages;
    };
  }
}
export type MessageKeys = typeof messages;
