import { MessageTree, translate, Locale } from '@/i18n/config';
import { COMPANY } from '@/lib/company';
import { FAQ_ITEMS } from '@/lib/faq';
import { PRICING_PLANS } from '@/lib/pricing';
import { SITE_URL, localePath } from '@/lib/seo';

/** A JSON-LD node. Values are restricted to JSON-serialisable shapes. */
export type JsonLdValue = string | number | boolean | JsonLdNode | JsonLdValue[];
export interface JsonLdNode {
  [key: string]: JsonLdValue;
}

/**
 * schema.org graph for the home page: the company, the product with its PEN
 * offers, and the FAQ shown on the page.
 */
export function buildHomeStructuredData(locale: Locale, messages: MessageTree): JsonLdNode {
  const t = (key: string): string => translate(messages, key);
  const pageUrl = `${SITE_URL}${localePath(locale)}`;
  const organizationId = `${SITE_URL}/#organization`;

  const organization: JsonLdNode = {
    '@type': 'Organization',
    '@id': organizationId,
    name: 'Mercurio',
    legalName: COMPANY.legalName,
    url: SITE_URL,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    taxID: COMPANY.ruc,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address,
      addressLocality: 'Lima',
      addressCountry: 'PE',
    },
  };

  const offers: JsonLdNode[] = PRICING_PLANS.filter((plan) => plan.pricePen !== null).map((plan) => ({
    '@type': 'Offer',
    name: t(plan.nameKey),
    price: String(plan.pricePen),
    priceCurrency: 'PEN',
    url: `${SITE_URL}${localePath(locale, 'pricing')}`,
  }));

  const application: JsonLdNode = {
    '@type': 'SoftwareApplication',
    name: 'Mercurio',
    url: pageUrl,
    description: t('meta.appDescription'),
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    inLanguage: locale,
    publisher: { '@id': organizationId },
    offers,
  };

  const faq: JsonLdNode = {
    '@type': 'FAQPage',
    url: pageUrl,
    inLanguage: locale,
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: t(item.questionKey),
      acceptedAnswer: { '@type': 'Answer', text: t(item.answerKey) },
    })),
  };

  return { '@context': 'https://schema.org', '@graph': [organization, application, faq] };
}

/** Serialise JSON-LD for a <script> tag, escaping `<` so content can't close the tag. */
export function serializeJsonLd(data: JsonLdNode): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
