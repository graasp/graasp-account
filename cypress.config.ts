import setupCoverage from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // needed for redirection tests to pass
    chromeWebSecurity: false,
    env: {
      VITE_GRAASP_DOMAIN: process.env.VITE_GRAASP_DOMAIN,
      VITE_GRAASP_API_HOST: process.env.VITE_GRAASP_API_HOST,
      VITE_SHOW_NOTIFICATIONS: false,
      VITE_GRAASP_PLAYER_HOST: process.env.VITE_GRAASP_PLAYER_HOST,
      VITE_GRAASP_ANALYZER_HOST: process.env.VITE_GRAASP_ANALYZER_HOST,
      VITE_GRAASP_LIBRARY_HOST: process.env.VITE_GRAASP_LIBRARY_HOST,
      VITE_GRAASP_ACCOUNT_HOST: process.env.VITE_GRAASP_ACCOUNT_HOST,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      setupCoverage(on, config);
      return config;
    },
    baseUrl: `http://localhost:${process.env.VITE_PORT || 3333}`,
  },
});
