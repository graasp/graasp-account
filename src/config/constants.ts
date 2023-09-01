import { Context, EmailFrequency } from '@graasp/sdk';

import env from '../env.json';

const {
  SHOW_NOTIFICATIONS: ENV_SHOW_NOTIFICATIONS,
  NODE_ENV: ENV_NODE_ENV,
} = env;

export const APP_NAME = 'Graasp Account';

export const ENV = {
  DEVELOPMENT: 'development',
};

export const NODE_ENV =
  ENV_NODE_ENV ||
  process.env.REACT_APP_NODE_ENV ||
  process.env.NODE_ENV ||
  ENV.DEVELOPMENT;

export const API_HOST =
  process.env.REACT_APP_API_HOST || 'http://localhost:3112';

export const SHOW_NOTIFICATIONS =
  ENV_SHOW_NOTIFICATIONS ||
  process.env.REACT_APP_SHOW_NOTIFICATIONS === 'true' ||
  false;

  export const GRAASP_AUTH_HOST =
  import.meta.env.VITE_GRAASP_AUTH_HOST || 'http://localhost:3001';
  export const GRAASP_BUILDER_HOST =
    import.meta.env.VITE_GRAASP_BUILDER_HOST || 'http://localhost:3111';
export const GRAASP_PLAYER_HOST =
  import.meta.env.VITE_GRAASP_PLAYER_HOST || 'http://localhost:3112';
export const GRAASP_LIBRARY_HOST =
  import.meta.env.VITE_GRAASP_LIBRARY_HOST || 'http://localhost:3005';
export const GRAASP_ANALYZER_HOST =
  import.meta.env.VITE_GRAASP_ANALYZER_HOST || 'http://localhost:3113';

export const SIGN_IN_PATH =
  process.env.REACT_APP_GRAASP_AUTH_HOST || 'http://localhost:3001';

export const DEFAULT_LOCALE = 'en-US';
export const DEFAULT_LANG = 'en';

export const STRIPE_PK = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

export const USERNAME_MAX_LENGTH = 30;

export const GRAASP_LOGO_HEADER_HEIGHT = 40;
export const HEADER_HEIGHT = 64;

export const LEFT_MENU_WIDTH = 250;

export const DEFAULT_CURRENCY = 'chf';

export const DEFAULT_MEMBER_PROFILE_SAVE_ACTIONS_SETTING = true;

export const DEFAULT_EMAIL_FREQUENCY = 'always';

export const emailFrequency = {
  [EmailFrequency.Always]: 'Always receive email notifications',
  // todo: schedule a digest of the notifications
  // daily: 'Receive email notifications once per day',
  [EmailFrequency.Never]: 'Disable email notifications',
};

export const THUMBNAIL_ASPECT = 1;
export const THUMBNAIL_EXTENSION = 'image/jpeg';
export const THUMBNAIL_SETTING_MAX_WIDTH = 200;
export const THUMBNAIL_SETTING_MAX_HEIGHT = 200;

export const AVATAR_ICON_HEIGHT = 30;
export const FILE_UPLOAD_MAX_FILES = 15;

export const ADMIN_CONTACT = 'admin@graasp.org';


export const HOST_MAP = {
  [Context.Builder]: GRAASP_BUILDER_HOST,
  [Context.Library]: GRAASP_LIBRARY_HOST,
  [Context.Player]: GRAASP_PLAYER_HOST,
  [Context.Analytics]: GRAASP_ANALYZER_HOST,
};
