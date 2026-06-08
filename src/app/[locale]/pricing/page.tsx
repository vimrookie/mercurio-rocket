import type { Metadata } from 'next';
import { getMessages, isLocale, translate, Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingHero from '@/components/sections/PricingHero';
import FuelPricing from '@/components/rocket/FuelPricing';
import FAQ from '@/components/sections/FAQ';
import BlastOff from '@/components/rocket/BlastOff';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'es';
  const m = getMessages(loc);
  return buildMetadata({
    locale: loc,
    path: 'pricing',
    title: translate(m, 'meta.pricingTitle'),
    description: translate(m, 'meta.pricingDescription'),
    keywords: translate(m, 'meta.keywords'),
  });
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PricingHero />
        <FuelPricing showHeader={false} />
        <FAQ />
        <BlastOff />
      </main>
      <Footer />
    </>
  );
}
