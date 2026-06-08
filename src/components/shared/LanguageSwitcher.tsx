'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { Language } from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';
import { useIntl } from '@/i18n/IntlProvider';
import { isLocale, Locale } from '@/i18n/config';

/**
 * Route-based language toggle: swaps the locale segment of the current path
 * (`/es/pricing/` ⇄ `/en/pricing/`) so each language stays a real, crawlable
 * URL. The URL — not localStorage — is the source of truth.
 */
const LanguageSwitcher: React.FC = () => {
  const { locale } = useIntl();
  const pathname = usePathname();
  const router = useRouter();
  const other: Locale = locale === 'es' ? 'en' : 'es';

  const toggleLanguage = () => {
    const segments = pathname.split('/');
    if (segments[1] && isLocale(segments[1])) {
      segments[1] = other;
    } else {
      segments.splice(1, 0, other);
    }
    const next = segments.join('/');
    router.push(next || `/${other}/`);
  };

  return (
    <Box
      onClick={toggleLanguage}
      role="button"
      aria-label="Toggle language"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleLanguage();
        }
      }}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        background: 'rgba(35, 39, 51, 0.85)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        border: '1px solid rgba(189, 189, 189, 0.2)',
        px: 1.25,
        py: 0.5,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          border: '1px solid rgba(189, 189, 189, 0.5)',
          background: 'rgba(35, 39, 51, 0.95)',
        },
      }}
    >
      <Language sx={{ color: 'primary.main', fontSize: 18 }} />
      <Typography
        variant="body2"
        sx={{ color: 'white', fontWeight: 600, fontSize: '0.8rem', userSelect: 'none' }}
      >
        {other.toUpperCase()}
      </Typography>
    </Box>
  );
};

export default LanguageSwitcher;
