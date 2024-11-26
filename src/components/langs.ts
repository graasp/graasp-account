import { DEFAULT_LANG } from '@graasp/translations';

import { Locale } from 'date-fns';
import { ar } from 'date-fns/locale/ar';
import { de } from 'date-fns/locale/de';
import { enUS } from 'date-fns/locale/en-US';
import { es } from 'date-fns/locale/es';
import { fr } from 'date-fns/locale/fr';
import { it } from 'date-fns/locale/it';

const dateFnsLocales = {
  en: enUS,
  fr: fr,
  de: de,
  it: it,
  es: es,
  ar: ar,
} as const;

export function getLocalForDateFns(i18nLocale: string): Locale {
  if (Object.keys(dateFnsLocales).includes(i18nLocale)) {
    const locale = i18nLocale as keyof typeof dateFnsLocales;
    return dateFnsLocales[locale];
  } else {
    return dateFnsLocales[DEFAULT_LANG];
  }
}
