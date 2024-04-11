import { EmailFrequency } from '@graasp/sdk';

export const APP_NAME = 'Graasp';

export const DEFAULT_LOCALE = 'en-US';

export const GRAASP_LOGO_HEADER_HEIGHT = 40;
export const HEADER_HEIGHT = 64;

export const LEFT_MENU_WIDTH = 250;

export const DEFAULT_EMAIL_FREQUENCY = EmailFrequency.Always;

export const emailFrequency = {
  [EmailFrequency.Always]: 'ALWAYS_RECEIVE_EMAILS',
  // todo: schedule a digest of the notifications
  // daily: 'Receive email notifications once per day',
  [EmailFrequency.Never]: 'DISABLE_EMAILS',
};

export const THUMBNAIL_ASPECT = 1;
export const THUMBNAIL_EXTENSION = 'image/jpeg';
export const THUMBNAIL_SETTING_MAX_WIDTH = 200;
export const THUMBNAIL_SETTING_MAX_HEIGHT = 200;

// this is related to the size of the medium thumbnail in the backend.
export const AVATAR_SIZE = 256;
export const FILE_UPLOAD_MAX_FILES = 15;

export const ADMIN_CONTACT = 'admin@graasp.org';

export const LINKEDIN_DOMAIN = 'linkedin';
export const FACEBOOK_DOMAIN = 'facebook';
export const TWITTER_DOMAIN = 'twitter';
