'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useIntl } from '@/i18n/IntlProvider';

const PricingHero: React.FC = () => {
  const { t } = useIntl();

  return (
    <Box sx={{ pt: 12, pb: 2, background: '#181C23', textAlign: 'center' }}>
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '3rem' },
            mb: 2,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #BDBDBD 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 700,
          }}
        >
          {t('pricingPage.heroTitle')}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.25rem', maxWidth: 560, mx: 'auto' }}>
          {t('pricingPage.heroSubtitle')}
        </Typography>
      </Container>
    </Box>
  );
};

export default PricingHero;
