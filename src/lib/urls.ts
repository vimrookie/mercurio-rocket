/** URL helpers shared across the marketing site. */

/** Absolute URL into the Orbit app (login, etc.). Env-driven, prod fallback. */
export function appUrl(path = ''): string {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://app.mercuriohub.io';
  return `${base}${path}`;
}

/** Locale-prefixed, trailing-slashed internal href, e.g. `/es/pricing/`. */
export function localeHref(locale: string, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}
