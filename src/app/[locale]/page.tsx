import type { Metadata } from 'next';
import { getMessages, isLocale, translate, Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import { buildHomeStructuredData, serializeJsonLd } from '@/lib/structuredData';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LaunchPad from '@/components/rocket/LaunchPad';
import TrustStrip from '@/components/sections/TrustStrip';
import PainPoints from '@/components/sections/PainPoints';
import HowItWorks from '@/components/sections/HowItWorks';
import RocketFeatures from '@/components/rocket/RocketFeatures';
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

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'es';
  const structuredData = serializeJsonLd(buildHomeStructuredData(loc, getMessages(loc)));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <Navbar />
      <main>
        <LaunchPad />
        <TrustStrip />
        <PainPoints />
        <HowItWorks />
        <RocketFeatures />
        <FuelPricing />
        <FAQ />
        <BlastOff />
      </main>
      <Footer />
    </>
  );
}
