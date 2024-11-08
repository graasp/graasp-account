import { DEFAULT_LANG, langs } from '@graasp/translations';

import { Locale } from 'date-fns';
import { ar } from 'date-fns/locale/ar';
import { de } from 'date-fns/locale/de';
import { enUS } from 'date-fns/locale/en-US';
import { es } from 'date-fns/locale/es';
import { fr } from 'date-fns/locale/fr';
import { it } from 'date-fns/locale/it';

const dateFnsLocales = {
  [langs.en]: enUS,
  [langs.fr]: fr,
  [langs.de]: de,
  [langs.it]: it,
  [langs.es]: es,
  [langs.ar]: ar,
};

export function getLocalForDateFns(i18nLocale: string): Locale {
  return dateFnsLocales[i18nLocale] ?? dateFnsLocales[DEFAULT_LANG];
}
