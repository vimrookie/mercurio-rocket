'use client';

import React from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Link as MuiLink } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useIntl } from '@/i18n/IntlProvider';
import { CONTACT_EMAIL } from '@/lib/pricing';

const QUESTION_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

const FAQ: React.FC = () => {
  const { t } = useIntl();

  return (
    <Box component="section" id="faq" sx={{ py: 12, background: '#181C23' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            {t('faq.sectionTitle')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
            {t('faq.sectionSubtitle')}
          </Typography>
        </Box>

        {QUESTION_KEYS.map((q, index) => (
          <Accordion
            key={q}
            disableGutters
            elevation={0}
            sx={{
              background: 'rgba(35, 39, 51, 0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 2,
              mb: 1.5,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ color: 'primary.main' }} />}
              aria-controls={`faq-${index}-content`}
              id={`faq-${index}-header`}
            >
              <Typography sx={{ color: 'white', fontWeight: 600 }}>{t(`faq.${q}`)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                {t(`faq.a${index + 1}`)}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
          <MuiLink href={`mailto:${CONTACT_EMAIL}`} sx={{ color: 'primary.main', textDecoration: 'none' }}>
            {CONTACT_EMAIL}
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
};

export default FAQ;
