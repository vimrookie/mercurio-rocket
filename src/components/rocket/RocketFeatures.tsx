'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { FactCheck, DocumentScanner, WhatsApp, ContentCopy, Link as LinkIcon, TableChart } from '@mui/icons-material';
import { useIntl } from '@/i18n/IntlProvider';

interface FeatureItem {
  icon: React.ReactElement;
  titleKey: string;
  descriptionKey: string;
  color: string;
}

const featureDefinitions: FeatureItem[] = [
  { icon: <FactCheck />, titleKey: 'features.receivables', descriptionKey: 'features.receivablesDesc', color: '#4CAF50' },
  { icon: <DocumentScanner />, titleKey: 'features.reading', descriptionKey: 'features.readingDesc', color: '#BDBDBD' },
  { icon: <WhatsApp />, titleKey: 'features.whatsapp', descriptionKey: 'features.whatsappDesc', color: '#25D366' },
  { icon: <ContentCopy />, titleKey: 'features.duplicates', descriptionKey: 'features.duplicatesDesc', color: '#FF9500' },
  { icon: <LinkIcon />, titleKey: 'features.matching', descriptionKey: 'features.matchingDesc', color: '#00bcd4' },
  { icon: <TableChart />, titleKey: 'features.sheets', descriptionKey: 'features.sheetsDesc', color: '#2196F3' },
];

const RocketFeatures: React.FC = () => {
  const { t } = useIntl();

  return (
    <Box component="section" id="features" sx={{ py: 12, background: 'linear-gradient(180deg, #232733 0%, #181C23 100%)' }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            {t('features.sectionTitle')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.25rem', maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
            {t('features.sectionSubtitle')}
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {featureDefinitions.map((feature) => (
            <Box key={feature.titleKey} sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' }, minWidth: 280, maxWidth: 360 }}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(35, 39, 51, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${feature.color}20`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    border: `1px solid ${feature.color}60`,
                    boxShadow: `0 20px 40px rgba(0,0,0,0.2), 0 0 20px ${feature.color}30`,
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'inline-flex', p: 2, borderRadius: 2, background: `${feature.color}20`, color: feature.color, mb: 3 }}>
                    {React.cloneElement(feature.icon as React.ReactElement<{ fontSize?: string }>, { fontSize: 'large' })}
                  </Box>
                  <Typography variant="h6" component="h3" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                    {t(feature.titleKey)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {t(feature.descriptionKey)}
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

export default RocketFeatures;
