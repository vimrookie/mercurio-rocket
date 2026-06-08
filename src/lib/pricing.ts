/**
 * Pricing source of truth for the marketing site.
 *
 * Synced to the Culqi PEN plan contract published by Lane 2 (B1) in
 * RELEASE-TASKS.md and to `BillingPlan` / `CULQI_PLAN_PRICES` in
 * mercurio-api (`src/types/billing.types.ts`): the only billable plans are
 * `free` (S/0), `pro` (S/49.00/mo → 4900 céntimos) and `enterprise` (custom).
 * Legacy starter/growth map to pro and business maps to enterprise.
 *
 * When Culqi plan amounts change, update `pricePen` here only.
 */

export const PEN_SYMBOL = 'S/';

export type PlanId = 'free' | 'pro' | 'enterprise';

export interface PricingPlan {
  id: PlanId;
  nameKey: string;
  descKey: string;
  /** Monthly price in PEN. `null` means custom/contact (enterprise). */
  pricePen: number | null;
  /** i18n key for the billing period, or `null` for custom plans. */
  periodKey: 'pricing.perMonth' | 'pricing.forever' | null;
  featureKeys: string[];
  buttonKey: string;
  /** Where the plan CTA points: the signup flow or a sales contact. */
  ctaTarget: 'signup' | 'contact';
  popular: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    nameKey: 'pricing.free',
    descKey: 'pricing.freeDesc',
    pricePen: 0,
    periodKey: 'pricing.forever',
    featureKeys: [
      'pricing.freeFeature1',
      'pricing.freeFeature2',
      'pricing.freeFeature3',
      'pricing.freeFeature4',
      'pricing.freeFeature5',
      'pricing.freeFeature6',
    ],
    buttonKey: 'pricing.freeButton',
    ctaTarget: 'signup',
    popular: false,
  },
  {
    id: 'pro',
    nameKey: 'pricing.pro',
    descKey: 'pricing.proDesc',
    pricePen: 49,
    periodKey: 'pricing.perMonth',
    featureKeys: [
      'pricing.proFeature1',
      'pricing.proFeature2',
      'pricing.proFeature3',
      'pricing.proFeature4',
      'pricing.proFeature5',
      'pricing.proFeature6',
      'pricing.proFeature7',
    ],
    buttonKey: 'pricing.proButton',
    ctaTarget: 'signup',
    popular: true,
  },
  {
    id: 'enterprise',
    nameKey: 'pricing.enterprise',
    descKey: 'pricing.enterpriseDesc',
    pricePen: null,
    periodKey: null,
    featureKeys: [
      'pricing.enterpriseFeature1',
      'pricing.enterpriseFeature2',
      'pricing.enterpriseFeature3',
      'pricing.enterpriseFeature4',
      'pricing.enterpriseFeature5',
      'pricing.enterpriseFeature6',
      'pricing.enterpriseFeature7',
    ],
    buttonKey: 'pricing.enterpriseButton',
    ctaTarget: 'contact',
    popular: false,
  },
];

export const CONTACT_EMAIL = 'hello@mercuriohub.io';
