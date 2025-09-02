'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { Check, RocketLaunch, Star } from '@mui/icons-material';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for testing our capabilities',
    features: [
      '50 documents/month',
      '2 team members',
      '100 MB storage',
      'OCR processing',
      'Google Sheets integration',
      'Community support',
    ],
    buttonText: 'Start Free',
    buttonVariant: 'outlined' as const,
    popular: false,
  },
  {
    name: 'Basic',
    price: '$25',
    period: 'month',
    description: 'Ideal for growing businesses',
    features: [
      '500 documents/month',
      '10 team members',
      '1 GB storage',
      'Everything in Free',
      'API access',
      'Email support',
    ],
    buttonText: 'Launch Basic',
    buttonVariant: 'contained' as const,
    popular: true,
  },
  {
    name: 'Premium',
    price: '$50',
    period: 'month',
    description: 'Advanced features for serious users',
    features: [
      '2,000 documents/month',
      '50 team members',
      '5 GB storage',
      'Everything in Basic',
      'Advanced analytics',
      'Data export',
      'Priority support',
    ],
    buttonText: 'Launch Premium',
    buttonVariant: 'contained' as const,
    popular: false,
  },
  {
    name: 'Enterprise',
    price: '$100',
    period: 'month',
    description: 'Complete solution for large organizations',
    features: [
      '10,000 documents/month',
      '200 team members',
      '25 GB storage',
      'Everything in Premium',
      'Webhooks',
      'Single Sign-On (SSO)',
      'Custom integrations',
      'Dedicated support',
    ],
    buttonText: 'Launch Enterprise',
    buttonVariant: 'contained' as const,
    popular: false,
  },
];

const FuelPricing: React.FC = () => {
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
            Choose Your Fuel Plan
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
            Power your business with the right amount of rocket fuel. 
            Start free and scale as you grow.
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 8 }}>
          {plans.map((plan, index) => (
            <Box key={index} sx={{ flex: { xs: '1 1 100%', md: '1 1 45%', lg: '1 1 22%' }, minWidth: '280px' }}>
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
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: plan.popular
                      ? '0 20px 40px rgba(189, 189, 189, 0.3)'
                      : '0 20px 40px rgba(0,0,0,0.2)',
                  },
                }}
              >
                {plan.popular && (
                  <Chip
                    label="Most Popular"
                    icon={<Star />}
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)',
                      color: '#000',
                      fontWeight: 700,
                    }}
                  />
                )}

                <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1,
                      color: 'white',
                      fontWeight: 600,
                    }}
                  >
                    {plan.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mb: 3,
                      color: 'text.secondary',
                      minHeight: '40px',
                    }}
                  >
                    {plan.description}
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
                        {plan.price}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          ml: 1,
                          color: 'text.secondary',
                        }}
                      >
                        /{plan.period}
                      </Typography>
                    </Box>
                  </Box>

                  <List sx={{ flexGrow: 1, py: 0 }}>
                    {plan.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Check sx={{ color: 'primary.main', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
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
                    sx={{
                      mt: 4,
                      py: 1.5,
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
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
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
            Need a Custom Solution?
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
            Contact our team for enterprise-grade features, custom integrations, 
            and volume pricing for large organizations.
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
            Contact Sales
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FuelPricing;