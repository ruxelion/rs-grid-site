import type i18nData from '../i18n.json';

// The set of translation keys this site defines in i18n.json (consumed by
// Rspress's built-in i18n system). `useI18n<T>()` is generic precisely so
// callers can supply their own key set — passing none defaults to only
// Rspress's built-in I18nText keys, silently accepting any string for every
// site-defined key like 'hero.badge'.
export type SiteI18nKey = keyof typeof i18nData;
