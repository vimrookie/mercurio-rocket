'use client';

import React from 'react';
import { Box, Container, Typography, Link as MuiLink, Stack } from '@mui/material';
import Link from 'next/link';
import { useIntl } from '@/i18n/IntlProvider';
import { appUrl, localeHref } from '@/lib/urls';
import { CONTACT_EMAIL } from '@/lib/pricing';
import MercurioLogo from '@/components/shared/MercurioLogo';

interface FooterColumn {
  titleKey: string;
  links: Array<{ labelKey: string; href: string; external?: boolean }>;
}

const Footer: React.FC = () => {
  const { t, locale } = useIntl();
  const year = 2026;

  const columns: FooterColumn[] = [
    {
      titleKey: 'footer.productTitle',
      links: [
        { labelKey: 'footer.features', href: `${localeHref(locale)}#features` },
        { labelKey: 'footer.pricing', href: localeHref(locale, 'pricing') },
        { labelKey: 'footer.signup', href: localeHref(locale, 'signup') },
        { labelKey: 'footer.login', href: appUrl('/login'), external: true },
      ],
    },
    {
      titleKey: 'footer.companyTitle',
      links: [{ labelKey: 'footer.contact', href: `mailto:${CONTACT_EMAIL}`, external: true }],
    },
    {
      titleKey: 'footer.legalTitle',
      links: [
        { labelKey: 'footer.privacy', href: `${localeHref(locale)}#faq` },
        { labelKey: 'footer.terms', href: `${localeHref(locale)}#faq` },
      ],
    },
  ];

  const linkSx = {
    color: 'text.secondary',
    textDecoration: 'none',
    fontSize: '0.95rem',
    '&:hover': { color: 'primary.main' },
  } as const;

  return (
    <Box
      component="footer"
      sx={{
        background: '#13161c',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            justifyContent: 'space-between',
            mb: 6,
          }}
        >
          {/* Brand blurb */}
          <Box sx={{ maxWidth: 320 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2 }}>
              <MercurioLogo size={32} animated={false} />
              <Box component="span" sx={{ color: 'white', fontWeight: 700, fontSize: '1.15rem' }}>
                Mercurio
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              {t('footer.tagline')}
            </Typography>
            <MuiLink href={`mailto:${CONTACT_EMAIL}`} sx={{ ...linkSx, display: 'inline-block', mt: 2 }}>
              {CONTACT_EMAIL}
            </MuiLink>
          </Box>

          {/* Link columns */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {columns.map((col) => (
              <Box key={col.titleKey}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: 'white', fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.8rem' }}
                >
                  {t(col.titleKey)}
                </Typography>
                <Stack spacing={1.25}>
                  {col.links.map((link) =>
                    link.external ? (
                      <MuiLink key={link.labelKey} href={link.href} sx={linkSx}>
                        {t(link.labelKey)}
                      </MuiLink>
                    ) : (
                      <MuiLink key={link.labelKey} component={Link} href={link.href} sx={linkSx}>
                        {t(link.labelKey)}
                      </MuiLink>
                    )
                  )}
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            © {year} Mercurio. {t('footer.rights')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            {t('cta.footerTagline')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
