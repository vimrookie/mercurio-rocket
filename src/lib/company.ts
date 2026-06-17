/**
 * Legal-entity and contact details for Mercurio, surfaced across the site to
 * satisfy Culqi's merchant-approval checklist (visible contact data) and Peru's
 * consumer-protection requirements (Libro de Reclamaciones, Ley N° 29571).
 *
 * Single source of truth — referenced by the Footer, the legal pages and the
 * Libro de Reclamaciones form. Keep in sync with `legal/*.md` in the workspace.
 */

export const COMPANY = {
  /** Razón social. */
  legalName: 'Mercurio Tech E.I.R.L.',
  ruc: '20615063321',
  /** Domicilio fiscal. */
  address: 'Los Gorriones 273, Condominio Bravo, Dpto. 904-B, Chorrillos, Lima, Perú',
  /** Customer-facing support email (used site-wide). */
  email: 'hello@mercuriohub.io',
  /** Legal / data-protection contact (matches the registered entity). */
  legalEmail: 'mercuriotechio@gmail.com',
  /** Display phone (also the WhatsApp intake number). */
  phone: '+51 913 956 800',
  /** wa.me requires the number without spaces or the leading '+'. */
  whatsappUrl: 'https://wa.me/51913956800',
  /** Last review date of the published legal documents. */
  legalUpdated: '8 de junio de 2026',
} as const;
