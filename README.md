# Graasp Account

[![GitHub Release](https://img.shields.io/github/release/graasp/graasp-library)](https://github.com/graasp-account/releases)
![typescript version](https://img.shields.io/github/package-json/dependency-version/graasp/graasp-library/dev/typescript)
[![gitlocalized](https://gitlocalize.com/repo/9965/whole_project/badge.svg)](https://gitlocalize.com/repo/9965?utm_source=badge)

## Translation status

[![gitlocalized-fr](https://gitlocalize.com/repo/9965/fr/badge.svg)](https://gitlocalize.com/repo/9965/fr?utm_source=badge)  
[![gitlocalized-de](https://gitlocalize.com/repo/9965/de/badge.svg)](https://gitlocalize.com/repo/9965/de?utm_source=badge)  
[![gitlocalized-es](https://gitlocalize.com/repo/9965/es/badge.svg)](https://gitlocalize.com/repo/9965/es?utm_source=badge)  
[![gitlocalized-it](https://gitlocalize.com/repo/9965/it/badge.svg)](https://gitlocalize.com/repo/9965/it?utm_source=badge)  
[![gitlocalized-ar](https://gitlocalize.com/repo/9965/ar/badge.svg)](https://gitlocalize.com/repo/9965/ar?utm_source=badge)  

## Environment variables

```sh
# .env.development
VITE_VERSION=local
VITE_PORT=3114
VITE_GRAASP_API_HOST=http://localhost:3000
VITE_SHOW_NOTIFICATIONS=true

VITE_UMAMI_WEBSITE_ID=<the id of your umami project>
VITE_UMAMI_HOST=http://localhost:8000

VITE_SENTRY_ENV= # some value
VITE_SENTRY_DSN= # some value

VITE_RECAPTCHA_SITE_KEY= # some value

VITE_GRAASP_H5P_INTEGRATION_URL= # the origin for the h5p integration
```

## Test setup

```sh
# .env.test
VITE_VERSION=local
VITE_PORT=3333
VITE_GRAASP_API_HOST=http://localhost:3636
VITE_SHOW_NOTIFICATIONS=true
VITE_GRAASP_ANALYZER_HOST=http://localhost:3005

```
