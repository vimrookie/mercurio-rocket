'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { Apartment, School, FitnessCenter, Storefront } from '@mui/icons-material';
import { useIntl } from '@/i18n/IntlProvider';

interface UseCase {
  icon: React.ReactElement;
  color: string;
  titleKey: string;
  descKey: string;
}

const USE_CASES: UseCase[] = [
  { icon: <Apartment />, color: '#00bcd4', titleKey: 'useCases.rentals', descKey: 'useCases.rentalsDesc' },
  { icon: <School />, color: '#FFB300', titleKey: 'useCases.classes', descKey: 'useCases.classesDesc' },
  { icon: <FitnessCenter />, color: '#F44336', titleKey: 'useCases.memberships', descKey: 'useCases.membershipsDesc' },
  { icon: <Storefront />, color: '#4CAF50', titleKey: 'useCases.stores', descKey: 'useCases.storesDesc' },
];

/** Who Mercurio is for: answers "is this for me?" right after the hero. */
const UseCases: React.FC = () => {
  const { t } = useIntl();

  return (
    <Box component="section" id="use-cases" sx={{ py: 12, background: '#181C23' }}>
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
            {t('useCases.sectionTitle')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.25rem', maxWidth: 620, mx: 'auto' }}>
            {t('useCases.sectionSubtitle')}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
          {USE_CASES.map((useCase) => (
            <Card
              key={useCase.titleKey}
              sx={{ height: '100%', background: 'rgba(35, 39, 51, 0.6)', border: `1px solid ${useCase.color}26` }}
            >
              <CardContent sx={{ p: 3.5 }}>
                <Box
                  sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, background: `${useCase.color}1A`, color: useCase.color, mb: 2 }}
                >
                  {React.cloneElement(useCase.icon as React.ReactElement<{ sx?: object }>, { sx: { fontSize: 28 } })}
                </Box>
                <Typography variant="h6" component="h3" sx={{ mb: 1, color: 'white', fontWeight: 600 }}>
                  {t(useCase.titleKey)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {t(useCase.descKey)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default UseCases;
