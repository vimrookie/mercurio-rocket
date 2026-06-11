'use client';

import React, { useEffect } from 'react';
import { defaultLocale } from '@/i18n/config';

/**
 * Root entry. The site is locale-routed (`/es`, `/en`); the bare root forwards
 * to the default locale (Spanish — the primary market). Visitors can switch to
 * English from the navbar. This static `/index.html` also doubles as the
 * CloudFront 404/403 fallback (see infrastructure.yml).
 */
export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(`/${defaultLocale}/`);
  }, []);

  return (
    <>
      <noscript>
        {/* No-JS fallback: forward to the default locale. */}
        <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
      </noscript>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#181C23',
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        <a href={`/${defaultLocale}/`} style={{ color: '#BDBDBD' }}>
          Mercurio →
        </a>
      </div>
    </>
  );
}
