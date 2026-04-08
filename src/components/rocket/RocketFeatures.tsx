'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import {
  Psychology,
  WhatsApp,
  TableChart,
  CloudQueue,
  Security,
  Group,
  SmartToy
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface FeatureItem {
  icon: React.ReactElement;
  titleKey: string;
  descriptionKey: string;
  color: string;
}

const featureDefinitions: FeatureItem[] = [
  {
    icon: <Psychology />,
    titleKey: 'features.intelligentOcr',
    descriptionKey: 'features.intelligentOcrDesc',
    color: '#BDBDBD',
  },
  {
    icon: <WhatsApp />,
    titleKey: 'features.whatsappIntegration',
    descriptionKey: 'features.whatsappIntegrationDesc',
    color: '#00bcd4',
  },
  {
    icon: <TableChart />,
    titleKey: 'features.googleSheetsSync',
    descriptionKey: 'features.googleSheetsSyncDesc',
    color: '#4CAF50',
  },
  {
    icon: <CloudQueue />,
    titleKey: 'features.awsServerless',
    descriptionKey: 'features.awsServerlessDesc',
    color: '#FF9500',
  },
  {
    icon: <Security />,
    titleKey: 'features.enterpriseSecurity',
    descriptionKey: 'features.enterpriseSecurityDesc',
    color: '#F44336',
  },
  {
    icon: <Group />,
    titleKey: 'features.teamManagement',
    descriptionKey: 'features.teamManagementDesc',
    color: '#9C27B0',
  },
  {
    icon: <SmartToy />,
    titleKey: 'features.customParsers',
    descriptionKey: 'features.customParsersDesc',
    color: '#2196F3',
  },
];

interface StatItem {
  number: string;
  labelKey: string;
}

const statDefinitions: StatItem[] = [
  { number: '90%', labelKey: 'features.statReduction' },
  { number: '50%', labelKey: 'features.statFaster' },
  { number: '99.9%', labelKey: 'features.statUptime' },
  { number: '1000+', labelKey: 'features.statDocuments' },
];

const RocketFeatures: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: 12,
        background: 'linear-gradient(180deg, #181C23 0%, #232733 100%)',
        position: 'relative',
      }}
    >
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
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1.25rem',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            {t('features.sectionSubtitle')}
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 10 }}>
          {featureDefinitions.map((feature, index) => (
            <Box key={index} sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' }, minWidth: '300px' }}>
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
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: 2,
                      background: `${feature.color}20`,
                      color: feature.color,
                      mb: 3,
                    }}
                  >
                    {React.cloneElement(feature.icon as React.ReactElement<Record<string, unknown>>, { fontSize: 'large' })}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      color: 'white',
                      fontWeight: 600,
                    }}
                  >
                    {t(feature.titleKey)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                    }}
                  >
                    {t(feature.descriptionKey)}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Stats Section */}
        <Box
          sx={{
            background: 'rgba(189, 189, 189, 0.1)',
            borderRadius: 4,
            p: 6,
            border: '1px solid rgba(189, 189, 189, 0.2)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: 'white',
              fontWeight: 600,
            }}
          >
            {t('features.statsTitle')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
            {statDefinitions.map((stat, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 45%', md: '1 1 22%' }, minWidth: '150px', textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                  }}
                >
                  {t(stat.labelKey)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RocketFeatures;
