import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { SITE_URL, localePath } from '@/lib/seo';

export const dynamic = 'force-static';

const PATHS = ['', 'pricing', 'signup'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      languages[locale] = `${SITE_URL}${localePath(locale, path)}`;
    }
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}${localePath(locale, path)}`,
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
