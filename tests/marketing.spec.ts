import { test, expect } from '@playwright/test';

/**
 * Marketing site smoke tests (no backend required).
 * Covers the locale-routed multi-page restructure: home (es/en), pricing,
 * navigation, and the route-based language switch.
 */

test.describe('Marketing site', () => {
  test('root redirects to a locale home', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL(/\/(es|en)\/?$/, { timeout: 10000 });
    await expect(page.getByRole('link', { name: 'Mercurio' }).first()).toBeVisible();
  });

  test('Spanish home renders hero, nav and pricing', async ({ page }) => {
    await page.goto('/es/');

    await expect(page.getByRole('heading', { name: /sabe quién te pagó/i })).toBeVisible();
    // Nav present with a pricing link
    await expect(page.getByRole('link', { name: /precios/i }).first()).toBeVisible();
    // Pricing section shows the real Culqi PEN price for Pro
    await expect(page.getByText('S/29').first()).toBeVisible();
    await expect(page.getByText(/culqi/i).first()).toBeVisible();
  });

  test('English home renders translated hero', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.getByRole('heading', { name: /know who paid you/i })).toBeVisible();
  });

  test('dedicated pricing page lists the three plans', async ({ page }) => {
    await page.goto('/es/pricing/');
    await expect(page.getByRole('heading', { name: /gratis/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /^pro$/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /^empresas$/i }).first()).toBeVisible();
    await expect(page.getByText('S/29').first()).toBeVisible();
  });

  test('language switch swaps locale and URL', async ({ page }) => {
    await page.goto('/es/');
    await expect(page.getByRole('heading', { name: /sabe quién te pagó/i })).toBeVisible();

    await page.getByRole('button', { name: /toggle language/i }).first().click();

    await page.waitForURL(/\/en\/?$/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /know who paid you/i })).toBeVisible();
  });

  test('home exposes FAQ structured data matching the visible FAQ', async ({ page }) => {
    await page.goto('/es/');
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const data = JSON.parse(raw ?? '{}') as { '@graph': Array<{ '@type': string; mainEntity?: Array<{ name: string }> }> };
    const faq = data['@graph'].find((node) => node['@type'] === 'FAQPage');
    expect(faq?.mainEntity?.length).toBe(8);
    const firstQuestion = faq?.mainEntity?.[0]?.name ?? '';
    await expect(page.getByRole('button', { name: firstQuestion })).toBeVisible();
  });

  test('home lists the use cases beyond rentals', async ({ page }) => {
    await page.goto('/es/');
    for (const name of [/alquileres/i, /clases y academias/i, /gimnasios y membresías/i, /tiendas y emprendimientos/i]) {
      await expect(page.getByRole('heading', { name })).toBeVisible();
    }
  });

  test('primary hero CTA links to signup', async ({ page }) => {
    await page.goto('/es/');
    const cta = page.getByRole('link', { name: /comenzar gratis/i }).first();
    await expect(cta).toHaveAttribute('href', /\/es\/signup\/?$/);
  });

  test('secondary hero CTA is wired to the how-it-works anchor', async ({ page }) => {
    await page.goto('/es/');
    // Guards against re-introducing the old no-op "Watch demo" button.
    const secondary = page.getByRole('link', { name: /ver cómo funciona/i }).first();
    await expect(secondary).toHaveAttribute('href', /#how-it-works$/);
  });
});
