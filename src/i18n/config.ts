import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

/**
 * Locale-routed i18n config. The site is statically exported (no server /
 * middleware), so translation is resolved from a plain dictionary that is
 * injected per-locale at the `[locale]` layout boundary. `es` is the default
 * locale (served at the root via the redirect in `src/app/page.tsx`); `en`
 * lives under `/en`.
 */
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

/** A nested tree of translation strings (leaves are strings). */
export type MessageTree = { [key: string]: string | MessageTree };

const dictionaries: Record<Locale, MessageTree> = {
  es: esMessages,
  en: enMessages,
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getMessages(locale: Locale): MessageTree {
  return dictionaries[locale];
}

/** Resolve a dotted key path (e.g. `"hero.title"`) against a messages tree. */
export function translate(messages: MessageTree, key: string): string {
  const segments = key.split('.');
  let current: string | MessageTree = messages;
  for (const segment of segments) {
    if (typeof current === 'object' && segment in current) {
      current = current[segment];
    } else {
      return key;
    }
  }
  return typeof current === 'string' ? current : key;
}
