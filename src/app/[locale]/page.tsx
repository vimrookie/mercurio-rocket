import type { Metadata } from 'next';
import { getMessages, isLocale, translate, Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LaunchPad from '@/components/rocket/LaunchPad';
import TrustStrip from '@/components/sections/TrustStrip';
import HowItWorks from '@/components/sections/HowItWorks';
import RocketFeatures from '@/components/rocket/RocketFeatures';
import Integrations from '@/components/sections/Integrations';
import FuelPricing from '@/components/rocket/FuelPricing';
import FAQ from '@/components/sections/FAQ';
import BlastOff from '@/components/rocket/BlastOff';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'es';
  const m = getMessages(loc);
  return buildMetadata({
    locale: loc,
    path: '',
    title: translate(m, 'meta.homeTitle'),
    description: translate(m, 'meta.homeDescription'),
    keywords: translate(m, 'meta.keywords'),
  });
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <LaunchPad />
        <TrustStrip />
        <HowItWorks />
        <RocketFeatures />
        <Integrations />
        <FuelPricing />
        <FAQ />
        <BlastOff />
      </main>
      <Footer />
    </>
  );
}
