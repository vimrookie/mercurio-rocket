import type { Metadata } from 'next';
import { getMessages, isLocale, translate, Locale } from '@/i18n/config';
import { buildMetadata } from '@/lib/seo';
import SignupForm from '@/components/signup/SignupForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : 'es';
  const m = getMessages(loc);
  return buildMetadata({
    locale: loc,
    path: 'signup',
    title: translate(m, 'meta.signupTitle'),
    description: translate(m, 'meta.signupDescription'),
  });
}

export default function SignupPage() {
  return <SignupForm />;
}
