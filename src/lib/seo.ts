import type { Metadata } from 'next';
import { Locale, defaultLocale } from '@/i18n/config';

/** Canonical marketing domain (the rocket site). */
export const SITE_URL = 'https://mercuriohub.io';

/**
 * Shared static OG/Twitter card. Served from `public/` with a real extension so
 * the CloudFront directory-index function (infrastructure.yml) doesn't rewrite
 * it to `/index.html`. Regenerate by temporarily restoring the
 * `app/[locale]/opengraph-image.tsx` generator and copying its output here.
 */
const OG_IMAGE = '/og.png';

/**
 * Build a locale-prefixed, trailing-slashed path. Every indexable page lives
 * under its locale segment (`/es/...`, `/en/...`); the bare root `/` is only a
 * redirect, so it never appears as a canonical URL.
 */
export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  const suffix = clean ? `/${clean}` : '';
  return `/${locale}${suffix}/`;
}

interface BuildMetadataParams {
  locale: Locale;
  /** Path without the locale prefix, e.g. `''`, `'pricing'`, `'signup'`. */
  path?: string;
  title: string;
  description: string;
  keywords?: string;
}

/**
 * Produce per-locale `Metadata` with canonical + hreflang alternates and
 * OpenGraph/Twitter tags. The OG image is injected automatically by the
 * `opengraph-image` file convention under `app/[locale]`.
 */
export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  keywords,
}: BuildMetadataParams): Metadata {
  const canonical = localePath(locale, path);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        es: localePath('es', path),
        en: localePath('en', path),
        'x-default': localePath(defaultLocale, path),
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Mercurio',
      locale: locale === 'es' ? 'es_PE' : 'en_US',
      url: canonical,
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Mercurio' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: { index: true, follow: true },
  };
}
