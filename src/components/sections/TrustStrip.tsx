'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { ReceiptLong } from '@mui/icons-material';
import { useIntl } from '@/i18n/IntlProvider';

/**
 * Receipt types Mercurio can read today. Keep in sync with the parser
 * templates shipped in mercurio-api (`templates/*-preview.jpeg`).
 */
const RECEIPT_KEYS = [
  'receipts.yape',
  'receipts.plinBbva',
  'receipts.plinInterbank',
  'receipts.plinScotiabank',
  'receipts.bcp',
  'receipts.binance',
] as const;

const TrustStrip: React.FC = () => {
  const { t } = useIntl();

  return (
    <Box
      component="section"
      aria-labelledby="receipts-title"
      sx={{ py: 5, background: '#13161c', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <Container maxWidth="lg">
        <Typography
          id="receipts-title"
          variant="body2"
          component="h2"
          sx={{ textAlign: 'center', color: 'text.disabled', mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}
        >
          {t('receipts.title')}
        </Typography>
        <Box
          component="ul"
          sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexWrap: 'wrap', gap: { xs: 2.5, md: 5 }, justifyContent: 'center', alignItems: 'center' }}
        >
          {RECEIPT_KEYS.map((key) => (
            <Box component="li" key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <ReceiptLong sx={{ color: 'primary.main', fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {t(key)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TrustStrip;
