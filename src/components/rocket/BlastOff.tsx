'use client';

import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { RocketLaunch, Email } from '@mui/icons-material';
import Link from 'next/link';
import { useIntl } from '@/i18n/IntlProvider';
import { localeHref } from '@/lib/urls';
import { CONTACT_EMAIL } from '@/lib/pricing';

const BlastOff: React.FC = () => {
  const { t, locale } = useIntl();

  const stats = [
    { value: t('cta.setupTime'), label: t('cta.setupTimeLabel'), color: 'primary.main' },
    { value: t('cta.noCreditCard'), label: t('cta.noCreditCardLabel'), color: 'secondary.main' },
    { value: t('cta.bilingual'), label: t('cta.bilingualLabel'), color: 'primary.main' },
  ];

  return (
    <Box component="section" id="cta" sx={{ py: 12, background: 'linear-gradient(135deg, #181C23 0%, #232733 50%, #181C23 100%)', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(189, 189, 189, 0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <Box sx={{ position: 'absolute', bottom: '10%', right: '10%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 188, 212, 0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            mb: 3,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #BDBDBD 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 700,
          }}
        >
          {t('cta.title')}{' '}
          <Box component="span" sx={{ color: 'primary.main', display: { xs: 'block', sm: 'inline' } }}>
            {t('cta.titleHighlight')}
          </Box>
        </Typography>

        <Typography variant="body1" sx={{ mb: 5, color: 'text.secondary', fontSize: '1.25rem', lineHeight: 1.6, maxWidth: 620, mx: 'auto' }}>
          {t('cta.subtitle')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', justifyContent: 'center', mb: 7 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<RocketLaunch />}
            component={Link}
            href={localeHref(locale, 'signup')}
            sx={{
              background: 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)',
              color: '#000',
              fontWeight: 700,
              px: 6,
              py: 2,
              fontSize: '1.125rem',
              '&:hover': { background: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)', transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(189, 189, 189, 0.4)' },
            }}
          >
            {t('cta.startFree')}
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Email />}
            component="a"
            href={`mailto:${CONTACT_EMAIL}`}
            sx={{
              borderColor: 'secondary.main',
              color: 'secondary.main',
              px: 6,
              py: 2,
              fontSize: '1.125rem',
              '&:hover': { borderColor: 'secondary.light', backgroundColor: 'rgba(0, 188, 212, 0.08)' },
            }}
          >
            {t('cta.contactSales')}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'center' }}>
          {stats.map((stat) => (
            <Box key={stat.label} sx={{ minWidth: 120 }}>
              <Typography variant="h4" sx={{ color: stat.color, fontWeight: 700, mb: 0.5, fontSize: '1.6rem' }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default BlastOff;
