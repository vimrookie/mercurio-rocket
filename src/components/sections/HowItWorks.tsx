'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { WhatsApp, AutoAwesome, TableChart } from '@mui/icons-material';
import { useIntl } from '@/i18n/IntlProvider';

interface Step {
  icon: React.ReactElement;
  color: string;
  titleKey: string;
  descKey: string;
}

const STEPS: Step[] = [
  { icon: <WhatsApp />, color: '#00bcd4', titleKey: 'howItWorks.step1Title', descKey: 'howItWorks.step1Desc' },
  { icon: <AutoAwesome />, color: '#BDBDBD', titleKey: 'howItWorks.step2Title', descKey: 'howItWorks.step2Desc' },
  { icon: <TableChart />, color: '#4CAF50', titleKey: 'howItWorks.step3Title', descKey: 'howItWorks.step3Desc' },
];

const HowItWorks: React.FC = () => {
  const { t } = useIntl();

  return (
    <Box component="section" id="how-it-works" sx={{ py: 12, background: '#181C23' }}>
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
            {t('howItWorks.sectionTitle')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.25rem', maxWidth: 620, mx: 'auto' }}>
            {t('howItWorks.sectionSubtitle')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {STEPS.map((step, index) => (
            <Box
              key={step.titleKey}
              sx={{ flex: '1 1 280px', maxWidth: 360, position: 'relative', textAlign: 'center', px: 2 }}
            >
              <Box
                sx={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  mx: 'auto',
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `${step.color}1A`,
                  border: `1px solid ${step.color}55`,
                  color: step.color,
                  position: 'relative',
                }}
              >
                {React.cloneElement(step.icon as React.ReactElement<{ sx?: object }>, { sx: { fontSize: 32 } })}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {index + 1}
                </Box>
              </Box>
              <Typography variant="h6" sx={{ mb: 1.5, color: 'white', fontWeight: 600 }}>
                {t(step.titleKey)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                {t(step.descKey)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
