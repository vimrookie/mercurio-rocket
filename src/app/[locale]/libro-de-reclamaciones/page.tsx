import type { Metadata } from 'next';
import { isLocale, Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ComplaintForm from '@/components/complaints/ComplaintForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'es';
  return buildMetadata({
    locale: loc,
    path: 'libro-de-reclamaciones',
    title: 'Libro de Reclamaciones — Mercurio',
    description: 'Libro de Reclamaciones virtual de Mercurio, conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571).',
  });
}

export default function LibroDeReclamacionesPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: '#181C23' }}>
        <ComplaintForm />
      </main>
      <Footer />
    </>
  );
}
