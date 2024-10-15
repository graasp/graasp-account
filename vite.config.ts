import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { type UserConfigExport, defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
const config = ({ mode }: { mode: string }): UserConfigExport => {
  process.env = {
    VITE_VERSION: 'default',
    VITE_BUILD_TIMESTAMP: new Date().toISOString(),
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };

  return defineConfig({
    base: '/',
    server: {
      port: parseInt(process.env.VITE_PORT || '3114', 10),
      // only auto open the app when in dev mode
      open: mode === 'dev',
      watch: {
        ignored: ['**/coverage/**', '**/cypress/downloads/**'],
      },
    },
    preview: {
      port: parseInt(process.env.VITE_PORT || '3333', 10),
      strictPort: true,
    },
    build: {
      outDir: 'build',
    },
    plugins: [
      TanStackRouterVite(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./**/*.{ts,tsx}"',
          useFlatConfig: true,
        },
        overlay: { initialIsOpen: false },
      }),
      react(),
      istanbul({
        include: 'src/*',
        exclude: ['node_modules', 'test/', '.nyc_output', 'coverage'],
        extension: ['.js', '.ts', '.tsx'],
        requireEnv: false,
        forceBuildInstrument: mode === 'test',
        checkProd: true,
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  });
};
export default config;
