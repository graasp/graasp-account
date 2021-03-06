import env from "../env.json";

const {
  API_HOST: ENV_API_HOST,
  SHOW_NOTIFICATIONS: ENV_SHOW_NOTIFICATIONS,
  AUTHENTICATION_HOST: ENV_AUTHENTICATION_HOST,
  GRAASP_COMPOSE_HOST: ENV_GRAASP_COMPOSE_HOST,
  NODE_ENV: ENV_NODE_ENV,
} = env;

export const APP_NAME = "Graasp Account";

export const ENV = {
  DEVELOPMENT: "development",
};

export const NODE_ENV =
  ENV_NODE_ENV ||
  process.env.REACT_APP_NODE_ENV ||
  process.env.NODE_ENV ||
  ENV.DEVELOPMENT;

export const API_HOST =
  ENV_API_HOST || process.env.REACT_APP_API_HOST || "http://localhost:3112";

export const SHOW_NOTIFICATIONS =
  ENV_SHOW_NOTIFICATIONS ||
  process.env.REACT_APP_SHOW_NOTIFICATIONS === "true" ||
  false;

export const AUTHENTICATION_HOST =
  ENV_AUTHENTICATION_HOST ||
  process.env.REACT_APP_AUTHENTICATION_HOST ||
  "http://localhost:3112";

export const GRAASP_COMPOSE_HOST =
  ENV_GRAASP_COMPOSE_HOST ||
  process.env.REACT_APP_GRAASP_COMPOSE_HOST ||
  "http://localhost:3111";

export const DEFAULT_LOCALE = "en-US";
export const DEFAULT_LANG = "en";

export const STRIPE_PK = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

export const USERNAME_MAX_LENGTH = 30;

export const GRAASP_LOGO_HEADER_HEIGHT = 40;
export const HEADER_HEIGHT = 64;

export const LEFT_MENU_WIDTH = 250;

export const DEFAULT_CURRENCY = "chf";
