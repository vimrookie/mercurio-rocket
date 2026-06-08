'use client';

import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/lib/theme';
import { IntlProvider } from '@/i18n/IntlProvider';
import { Locale, MessageTree } from '@/i18n/config';

interface ProvidersProps {
  locale: Locale;
  messages: MessageTree;
  children: React.ReactNode;
}

/**
 * Client-side providers wired for the App Router static export:
 * Emotion SSR cache (no FOUC) → MUI theme → CssBaseline → i18n dictionary.
 */
export default function Providers({ locale, messages, children }: ProvidersProps) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <IntlProvider locale={locale} messages={messages}>
          {children}
        </IntlProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
