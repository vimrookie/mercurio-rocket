'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { Locale, MessageTree, translate } from '@/i18n/config';

interface IntlContextValue {
  locale: Locale;
  t: (key: string) => string;
}

const IntlContext = createContext<IntlContextValue | null>(null);

interface IntlProviderProps {
  locale: Locale;
  messages: MessageTree;
  children: React.ReactNode;
}

/**
 * Provides the active locale and a `t(key)` lookup to client components.
 * Messages are passed from the server `[locale]` layout, so the statically
 * exported HTML is already translated for each locale.
 */
export function IntlProvider({ locale, messages, children }: IntlProviderProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<IntlContextValue>(
    () => ({ locale, t: (key: string) => translate(messages, key) }),
    [locale, messages]
  );

  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
}

export function useIntl(): IntlContextValue {
  const ctx = useContext(IntlContext);
  if (!ctx) {
    throw new Error('useIntl must be used within an IntlProvider');
  }
  return ctx;
}
