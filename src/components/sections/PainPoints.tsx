'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { ManageSearch, ChatBubbleOutline, TableChart } from '@mui/icons-material';
import { useIntl } from '@/i18n/IntlProvider';

interface PainPoint {
  icon: React.ReactElement;
  titleKey: string;
  descKey: string;
}

const PAIN_POINTS: PainPoint[] = [
  { icon: <ManageSearch />, titleKey: 'pain.p1Title', descKey: 'pain.p1Desc' },
  { icon: <ChatBubbleOutline />, titleKey: 'pain.p2Title', descKey: 'pain.p2Desc' },
  { icon: <TableChart />, titleKey: 'pain.p3Title', descKey: 'pain.p3Desc' },
];

/** The problem the landlord has today, in their own words. */
const PainPoints: React.FC = () => {
  const { t } = useIntl();

  return (
    <Box component="section" id="problem" sx={{ py: 12, background: 'linear-gradient(180deg, #232733 0%, #181C23 100%)' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            mb: 8,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #BDBDBD 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 700,
          }}
        >
          {t('pain.sectionTitle')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          {PAIN_POINTS.map((point) => (
            <Box key={point.titleKey} sx={{ flex: '1 1 280px', maxWidth: 360 }}>
              <Card sx={{ height: '100%', background: 'rgba(35, 39, 51, 0.6)', border: '1px solid rgba(244, 67, 54, 0.18)' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, background: 'rgba(244, 67, 54, 0.12)', color: '#EF9A9A', mb: 2.5 }}>
                    {React.cloneElement(point.icon as React.ReactElement<{ sx?: object }>, { sx: { fontSize: 28 } })}
                  </Box>
                  <Typography variant="h6" component="h3" sx={{ mb: 1.5, color: 'white', fontWeight: 600 }}>
                    {t(point.titleKey)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {t(point.descKey)}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        <Typography variant="h5" component="p" sx={{ mt: 8, textAlign: 'center', color: 'primary.main', fontWeight: 600 }}>
          {t('pain.closing')}
        </Typography>
      </Container>
    </Box>
  );
};

export default PainPoints;
