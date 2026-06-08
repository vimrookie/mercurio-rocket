import React from 'react';
import { notFound } from 'next/navigation';
import { getMessages, isLocale, locales } from '@/i18n/config';
import Providers from '@/components/layout/Providers';

/** Only `es` and `en` are pre-rendered; any other segment 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  return (
    <Providers locale={locale} messages={getMessages(locale)}>
      {children}
    </Providers>
  );
}
