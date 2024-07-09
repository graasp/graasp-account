export const API_HOST =
  import.meta.env.VITE_GRAASP_API_HOST ?? 'http://localhost:3000';

export const SHOW_NOTIFICATIONS =
  (import.meta.env.VITE_SHOW_NOTIFICATIONS ?? 'true') === 'true';

export const GRAASP_AUTH_HOST =
  import.meta.env.VITE_GRAASP_AUTH_HOST ?? 'http://localhost:3001';
export const GRAASP_BUILDER_HOST =
  import.meta.env.VITE_GRAASP_BUILDER_HOST ?? 'http://localhost:3111';
export const GRAASP_PLAYER_HOST =
  import.meta.env.VITE_GRAASP_PLAYER_HOST ?? 'http://localhost:3112';
export const GRAASP_LIBRARY_HOST =
  import.meta.env.VITE_GRAASP_LIBRARY_HOST ?? 'http://localhost:3005';
export const GRAASP_ANALYTICS_HOST =
  import.meta.env.VITE_GRAASP_ANALYTICS_HOST ?? 'http://localhost:3113';

// export const STRIPE_PK = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
