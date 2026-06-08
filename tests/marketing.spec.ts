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

    await expect(page.getByRole('heading', { name: /procesa tus comprobantes/i })).toBeVisible();
    // Nav present with a pricing link
    await expect(page.getByRole('link', { name: /precios/i }).first()).toBeVisible();
    // Pricing section shows the real Culqi PEN price for Pro
    await expect(page.getByText('S/49').first()).toBeVisible();
    await expect(page.getByText(/culqi/i).first()).toBeVisible();
  });

  test('English home renders translated hero', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.getByRole('heading', { name: /process your receipts/i })).toBeVisible();
  });

  test('dedicated pricing page lists the three plans', async ({ page }) => {
    await page.goto('/es/pricing/');
    await expect(page.getByRole('heading', { name: /gratis/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /^pro$/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /empresarial/i }).first()).toBeVisible();
    await expect(page.getByText('S/49').first()).toBeVisible();
  });

  test('language switch swaps locale and URL', async ({ page }) => {
    await page.goto('/es/');
    await expect(page.getByRole('heading', { name: /procesa tus comprobantes/i })).toBeVisible();

    await page.getByRole('button', { name: /toggle language/i }).first().click();

    await page.waitForURL(/\/en\/?$/, { timeout: 10000 });
    await expect(page.getByRole('heading', { name: /process your receipts/i })).toBeVisible();
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
