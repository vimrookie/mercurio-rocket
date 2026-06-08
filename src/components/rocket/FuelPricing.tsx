'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { Check, RocketLaunch, Star } from '@mui/icons-material';
import Link from 'next/link';
import { useIntl } from '@/i18n/IntlProvider';
import { PRICING_PLANS, PEN_SYMBOL, CONTACT_EMAIL, PricingPlan } from '@/lib/pricing';
import { localeHref } from '@/lib/urls';

interface FuelPricingProps {
  /** Show the section heading/subtitle (true on home, false on the /pricing page which has its own hero). */
  showHeader?: boolean;
}

const FuelPricing: React.FC<FuelPricingProps> = ({ showHeader = true }) => {
  const { t, locale } = useIntl();

  const ctaHref = (plan: PricingPlan): string =>
    plan.ctaTarget === 'contact' ? `mailto:${CONTACT_EMAIL}` : localeHref(locale, 'signup');

  return (
    <Box component="section" id="pricing" sx={{ py: 12, background: 'linear-gradient(135deg, #232733 0%, #181C23 100%)' }}>
      <Container maxWidth="lg">
        {showHeader && (
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
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.25rem', maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
              {t('pricing.sectionSubtitle')}
            </Typography>
          </Box>
        )}

        {/* Pricing Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
            mb: 4,
            maxWidth: 1100,
            mx: 'auto',
            pt: 3,
          }}
        >
          {PRICING_PLANS.map((plan) => {
            const priceLabel = plan.pricePen === null ? t('pricing.custom') : `${PEN_SYMBOL}${plan.pricePen}`;

            return (
              <Box key={plan.id} sx={{ position: 'relative' }}>
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
                    border: plan.popular ? '2px solid #BDBDBD' : '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: plan.popular ? '0 20px 40px rgba(189, 189, 189, 0.3)' : '0 20px 40px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" sx={{ mb: 1, color: 'white', fontWeight: 600 }}>
                      {t(plan.nameKey)}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', minHeight: 40 }}>
                      {t(plan.descKey)}
                    </Typography>

                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'baseline' }}>
                      <Typography variant="h3" sx={{ color: plan.popular ? 'primary.main' : 'white', fontWeight: 700 }}>
                        {priceLabel}
                      </Typography>
                      {plan.periodKey && (
                        <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                          /{t(plan.periodKey)}
                        </Typography>
                      )}
                    </Box>

                    <List sx={{ flexGrow: 1, py: 0 }}>
                      {plan.featureKeys.map((featureKey) => (
                        <ListItem key={featureKey} sx={{ py: 0.5, px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Check sx={{ color: 'primary.main', fontSize: 20 }} />
                          </ListItemIcon>
                          <ListItemText primary={t(featureKey)} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                        </ListItem>
                      ))}
                    </List>

                    <Button
                      variant={plan.popular ? 'contained' : 'outlined'}
                      size="large"
                      fullWidth
                      startIcon={<RocketLaunch />}
                      component={plan.ctaTarget === 'contact' ? 'a' : Link}
                      href={ctaHref(plan)}
                      sx={{
                        mt: 4,
                        py: 1.5,
                        ...(plan.popular
                          ? {
                              background: 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)',
                              color: '#000',
                              fontWeight: 700,
                              '&:hover': { background: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)', transform: 'translateY(-1px)' },
                            }
                          : {
                              borderColor: 'primary.main',
                              color: 'primary.main',
                              '&:hover': { borderColor: 'primary.light', backgroundColor: 'rgba(189, 189, 189, 0.08)' },
                            }),
                      }}
                    >
                      {t(plan.buttonKey)}
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>

        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.disabled' }}>
          {t('pricing.referentialNote')}
        </Typography>
      </Container>
    </Box>
  );
};

export default FuelPricing;
