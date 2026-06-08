'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { VerifiedUser, Lock, Translate, Cloud, Bolt } from '@mui/icons-material';
import { useIntl } from '@/i18n/IntlProvider';

const ITEMS: Array<{ icon: React.ReactElement; key: string }> = [
  { icon: <VerifiedUser />, key: 'trust.multiTenant' },
  { icon: <Lock />, key: 'trust.encryption' },
  { icon: <Translate />, key: 'trust.bilingual' },
  { icon: <Cloud />, key: 'trust.aws' },
  { icon: <Bolt />, key: 'trust.serverless' },
];

/**
 * Honest, capability-based trust strip — replaces the previous invented
 * usage statistics (no real customers yet, pre-release).
 */
const TrustStrip: React.FC = () => {
  const { t } = useIntl();

  return (
    <Box sx={{ py: 5, background: '#13161c', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.disabled', mb: 3, textTransform: 'uppercase', letterSpacing: 1 }}>
          {t('trust.title')}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2.5, md: 5 }, justifyContent: 'center', alignItems: 'center' }}>
          {ITEMS.map((item) => (
            <Box key={item.key} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              {React.cloneElement(item.icon as React.ReactElement<{ sx?: object }>, {
                sx: { color: 'primary.main', fontSize: 20 },
              })}
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {t(item.key)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TrustStrip;
