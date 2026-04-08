'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { Check, RocketLaunch, Star } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface PlanDefinition {
  nameKey: string;
  price: string;
  periodKey: string;
  descriptionKey: string;
  featureKeys: string[];
  buttonTextKey: string;
  buttonVariant: 'outlined' | 'contained';
  popular: boolean;
  savingsKey: string | null;
}

const planDefinitions: PlanDefinition[] = [
  {
    nameKey: 'pricing.free',
    price: '$0',
    periodKey: 'pricing.freePeriod',
    descriptionKey: 'pricing.freeDesc',
    featureKeys: [
      'pricing.freeFeature1',
      'pricing.freeFeature2',
      'pricing.freeFeature3',
      'pricing.freeFeature4',
      'pricing.freeFeature5',
      'pricing.freeFeature6',
    ],
    buttonTextKey: 'pricing.freeButton',
    buttonVariant: 'outlined',
    popular: false,
    savingsKey: null,
  },
  {
    nameKey: 'pricing.starter',
    price: '$15',
    periodKey: 'pricing.starterPeriod',
    descriptionKey: 'pricing.starterDesc',
    featureKeys: [
      'pricing.starterFeature1',
      'pricing.starterFeature2',
      'pricing.starterFeature3',
      'pricing.starterFeature4',
      'pricing.starterFeature5',
      'pricing.starterFeature6',
    ],
    buttonTextKey: 'pricing.starterButton',
    buttonVariant: 'contained',
    popular: false,
    savingsKey: null,
  },
  {
    nameKey: 'pricing.growth',
    price: '$49',
    periodKey: 'pricing.growthPeriod',
    descriptionKey: 'pricing.growthDesc',
    featureKeys: [
      'pricing.growthFeature1',
      'pricing.growthFeature2',
      'pricing.growthFeature3',
      'pricing.growthFeature4',
      'pricing.growthFeature5',
      'pricing.growthFeature6',
      'pricing.growthFeature7',
    ],
    buttonTextKey: 'pricing.growthButton',
    buttonVariant: 'contained',
    popular: true,
    savingsKey: 'pricing.growthSavings',
  },
  {
    nameKey: 'pricing.business',
    price: '$149',
    periodKey: 'pricing.businessPeriod',
    descriptionKey: 'pricing.businessDesc',
    featureKeys: [
      'pricing.businessFeature1',
      'pricing.businessFeature2',
      'pricing.businessFeature3',
      'pricing.businessFeature4',
      'pricing.businessFeature5',
      'pricing.businessFeature6',
      'pricing.businessFeature7',
    ],
    buttonTextKey: 'pricing.businessButton',
    buttonVariant: 'contained',
    popular: false,
    savingsKey: 'pricing.businessSavings',
  },
  {
    nameKey: 'pricing.enterprise',
    price: '',
    periodKey: 'pricing.enterprisePeriod',
    descriptionKey: 'pricing.enterpriseDesc',
    featureKeys: [
      'pricing.enterpriseFeature1',
      'pricing.enterpriseFeature2',
      'pricing.enterpriseFeature3',
      'pricing.enterpriseFeature4',
      'pricing.enterpriseFeature5',
      'pricing.enterpriseFeature6',
      'pricing.enterpriseFeature7',
      'pricing.enterpriseFeature8',
    ],
    buttonTextKey: 'pricing.enterpriseButton',
    buttonVariant: 'contained',
    popular: false,
    savingsKey: null,
  },
];

const FuelPricing: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: 12,
        background: 'linear-gradient(135deg, #232733 0%, #181C23 100%)',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            {t('pricing.sectionTitle')}
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
            {t('pricing.sectionSubtitle')}
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(5, 1fr)'
            },
            gap: 3,
            mb: 8,
            maxWidth: '1400px',
            mx: 'auto',
            pt: 5,
          }}
        >
          {planDefinitions.map((plan, index) => {
            const isEnterprise = plan.nameKey === 'pricing.enterprise';
            const displayPrice = isEnterprise ? t('pricing.enterprisePrice') : plan.price;

            return (
              <Box key={index} sx={{ position: 'relative' }}>
                {plan.popular && (
                  <Chip
                    label={t('pricing.mostPopular')}
                    icon={<Star />}
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)',
                      color: '#000',
                      fontWeight: 700,
                      zIndex: 20,
                      px: 2,
                      py: 0.5,
                      fontSize: '0.85rem',
                      height: 'auto',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                  />
                )}
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: plan.popular
                      ? 'linear-gradient(135deg, rgba(189, 189, 189, 0.1) 0%, rgba(35, 39, 51, 0.9) 100%)'
                      : 'rgba(35, 39, 51, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: plan.popular
                      ? '2px solid #BDBDBD'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: plan.popular
                        ? '0 20px 40px rgba(189, 189, 189, 0.3)'
                        : '0 20px 40px rgba(0,0,0,0.2)',
                    },
                  }}
                >

                  <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 1,
                        color: 'white',
                        fontWeight: 600,
                      }}
                    >
                      {t(plan.nameKey)}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        color: 'text.secondary',
                        minHeight: '40px',
                      }}
                    >
                      {t(plan.descriptionKey)}
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
                        <Typography
                          variant="h3"
                          sx={{
                            color: plan.popular ? 'primary.main' : 'white',
                            fontWeight: 700,
                          }}
                        >
                          {displayPrice}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            ml: 1,
                            color: 'text.secondary',
                          }}
                        >
                          /{t(plan.periodKey)}
                        </Typography>
                      </Box>
                    </Box>

                    <List sx={{ flexGrow: 1, py: 0 }}>
                      {plan.featureKeys.map((featureKey, featureIndex) => (
                        <ListItem key={featureIndex} sx={{ py: 0.5, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Check sx={{ color: 'primary.main', fontSize: 20 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={t(featureKey)}
                            primaryTypographyProps={{
                              variant: 'body2',
                              color: 'text.secondary',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>

                    <Button
                      variant={plan.buttonVariant}
                      size="large"
                      fullWidth
                      startIcon={<RocketLaunch />}
                      component="a"
                      href={plan.nameKey === 'pricing.free' ? '/signup' : undefined}
                      sx={{
                        mt: 4,
                        py: 1.5,
                        textDecoration: 'none',
                        ...(plan.buttonVariant === 'contained' && {
                          background: plan.popular
                            ? 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)'
                            : 'linear-gradient(135deg, #9E9E9E 0%, #757575 100%)',
                          color: '#000',
                          fontWeight: 700,
                          '&:hover': {
                            background: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)',
                            transform: 'translateY(-1px)',
                          },
                        }),
                        ...(plan.buttonVariant === 'outlined' && {
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          '&:hover': {
                            borderColor: 'primary.light',
                            backgroundColor: 'rgba(189, 189, 189, 0.08)',
                          },
                        }),
                      }}
                    >
                      {t(plan.buttonTextKey)}
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>

        {/* Bottom CTA */}
        <Box
          sx={{
            textAlign: 'center',
            p: 6,
            background: 'rgba(189, 189, 189, 0.05)',
            borderRadius: 4,
            border: '1px solid rgba(189, 189, 189, 0.1)',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              color: 'white',
              fontWeight: 600,
            }}
          >
            {t('pricing.customSolutionTitle')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: 'text.secondary',
              maxWidth: '500px',
              mx: 'auto',
            }}
          >
            {t('pricing.customSolutionDesc')}
          </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              '&:hover': {
                borderColor: 'primary.light',
                backgroundColor: 'rgba(189, 189, 189, 0.08)',
              },
            }}
          >
            {t('pricing.contactSales')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FuelPricing;
