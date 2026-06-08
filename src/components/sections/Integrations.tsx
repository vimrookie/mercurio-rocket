'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { WhatsApp, TableChart, ReceiptLong, Cloud } from '@mui/icons-material';
import { useIntl } from '@/i18n/IntlProvider';

interface Integration {
  icon: React.ReactElement;
  color: string;
  titleKey: string;
  descKey: string;
}

const INTEGRATIONS: Integration[] = [
  { icon: <WhatsApp />, color: '#25D366', titleKey: 'integrations.whatsapp', descKey: 'integrations.whatsappDesc' },
  { icon: <TableChart />, color: '#4CAF50', titleKey: 'integrations.googleSheets', descKey: 'integrations.googleSheetsDesc' },
  { icon: <ReceiptLong />, color: '#BDBDBD', titleKey: 'integrations.receipts', descKey: 'integrations.receiptsDesc' },
  { icon: <Cloud />, color: '#FF9500', titleKey: 'integrations.aws', descKey: 'integrations.awsDesc' },
];

const Integrations: React.FC = () => {
  const { t } = useIntl();

  return (
    <Box component="section" id="integrations" sx={{ py: 12, background: 'linear-gradient(180deg, #181C23 0%, #232733 100%)' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              background: 'linear-gradient(135deg, #FFFFFF 0%, #BDBDBD 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 700,
            }}
          >
            {t('integrations.sectionTitle')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.25rem', maxWidth: 620, mx: 'auto' }}>
            {t('integrations.sectionSubtitle')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          {INTEGRATIONS.map((item) => (
            <Box key={item.titleKey} sx={{ flex: '1 1 220px', maxWidth: 260 }}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  background: 'rgba(35, 39, 51, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${item.color}22`,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-6px)', border: `1px solid ${item.color}66` },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 1.75,
                      borderRadius: 2,
                      background: `${item.color}1A`,
                      color: item.color,
                      mb: 2,
                    }}
                  >
                    {React.cloneElement(item.icon as React.ReactElement<{ sx?: object }>, { sx: { fontSize: 32 } })}
                  </Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                    {t(item.titleKey)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {t(item.descKey)}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Integrations;
