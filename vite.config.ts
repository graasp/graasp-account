/// <reference types="./src/env.d.ts"/>
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { UserConfigExport, defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import istanbul from 'vite-plugin-istanbul';

import umamiPlugin from './umami.plugin';

// https://vitejs.dev/config/
const config = ({ mode }: { mode: string }): UserConfigExport => {
  process.env = {
    VITE_VERSION: 'default',
    VITE_BUILD_TIMESTAMP: new Date().toISOString(),
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };

  const { VITE_PORT, BROWSER, UMAMI_WEBSITE_ID } = process.env;
  // compute the port to use
  const PORT = parseInt(VITE_PORT || '3114', 10);

  // compute whether we should open the browser
  // this defines if we should automatically open the browser
  const shouldOpen = BROWSER && BROWSER !== 'none';

  return defineConfig({
    base: '/',
    server: {
      port: PORT,
      // whether we should open the url on start
      open: shouldOpen,
      watch: {
        ignored: ['**/coverage/**', '**/cypress/downloads/**'],
      },
    },
    preview: {
      port: PORT,
      // forces to use the specified port
      strictPort: true,
    },
    build: {
      outDir: 'build',
    },
    plugins: [
      // the checker plugin is disabled when running the tests
      mode !== 'test'
        ? checker({
            typescript: true,
            eslint: {
              lintCommand: 'eslint "./**/*.{ts,tsx}"',
              useFlatConfig: true,
            },
            overlay: { initialIsOpen: false },
          })
        : undefined,
      react(),
      istanbul({
        include: 'src/*',
        exclude: ['node_modules', 'test/', '.nyc_output', 'coverage'],
        extension: ['.js', '.ts', '.tsx'],
        requireEnv: false,
        // forces to instrument code also in production build only if the mode is test
        // this is useful when we want to build and preview in CI to have faster and more stable tests
        forceBuildInstrument: mode === 'test',
        checkProd: true,
      }),
      // only include umami script when the WEBSITE_ID is set
      UMAMI_WEBSITE_ID
        ? umamiPlugin({ websiteId: UMAMI_WEBSITE_ID })
        : undefined,
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  });
};
export default config;
