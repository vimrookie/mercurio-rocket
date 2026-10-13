'use client';

import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Chip } from '@mui/material';
import { RocketLaunch, ArrowDownward, CheckCircle, Schedule, ErrorOutline } from '@mui/icons-material';
import Link from 'next/link';
import { useIntl } from '@/i18n/IntlProvider';
import { localeHref } from '@/lib/urls';
import MercurioLogo from '../shared/MercurioLogo';

type PaymentStatus = 'paid' | 'due' | 'overdue';

interface BoardRow {
  labelKey: string;
  amount: string;
  status: PaymentStatus;
  statusKey: string;
}

/** Illustrative data for the hero board. Totals must match `hero.board.summary`. */
const BOARD_ROWS: BoardRow[] = [
  { labelKey: 'hero.board.row1', amount: '1,200', status: 'paid', statusKey: 'hero.board.paidYape' },
  { labelKey: 'hero.board.row2', amount: '450', status: 'due', statusKey: 'hero.board.dueToday' },
  { labelKey: 'hero.board.row3', amount: '950', status: 'overdue', statusKey: 'hero.board.overdue' },
  { labelKey: 'hero.board.row4', amount: '2,000', status: 'paid', statusKey: 'hero.board.paidBcp' },
];

const STATUS_STYLES: Record<PaymentStatus, { color: string; icon: React.ReactElement }> = {
  paid: { color: '#4CAF50', icon: <CheckCircle fontSize="small" /> },
  due: { color: '#FFB300', icon: <Schedule fontSize="small" /> },
  overdue: { color: '#F44336', icon: <ErrorOutline fontSize="small" /> },
};

const LaunchPad: React.FC = () => {
  const { t, locale } = useIntl();

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: { xs: 'auto', md: '88vh' },
        py: { xs: 8, md: 6 },
        background: 'linear-gradient(135deg, #181C23 0%, #232733 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Space background elements */}
      <Box sx={{ position: 'absolute', top: '10%', right: '10%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(189, 189, 189, 0.1) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <Box sx={{ position: 'absolute', bottom: '20%', left: '5%', width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 188, 212, 0.1) 0%, transparent 70%)', filter: 'blur(30px)' }} />

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Hero Content */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <MercurioLogo size={64} animated />
              <Chip
                label={t('hero.badge')}
                sx={{
                  background: 'rgba(189, 189, 189, 0.1)',
                  border: '1px solid rgba(189, 189, 189, 0.25)',
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              />
            </Box>

            <Typography
              variant="h1"
              sx={{
                mb: 3,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #BDBDBD 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 700,
              }}
            >
              {t('hero.title')}{' '}
              <Box component="span" sx={{ color: 'primary.main', display: 'block' }}>
                {t('hero.titleHighlight')}
              </Box>
            </Typography>

            <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', fontSize: '1.25rem', lineHeight: 1.6, maxWidth: 540 }}>
              {t('hero.subtitle')} <strong>{t('hero.subtitleHighlight')}</strong>
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<RocketLaunch />}
                component={Link}
                href={localeHref(locale, 'signup')}
                sx={{
                  background: 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)',
                  color: '#000',
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  '&:hover': { background: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)', transform: 'translateY(-2px)' },
                }}
              >
                {t('hero.startFree')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                endIcon={<ArrowDownward />}
                component="a"
                href="#how-it-works"
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  '&:hover': { borderColor: 'primary.light', color: 'primary.light', backgroundColor: 'rgba(189, 189, 189, 0.08)' },
                }}
              >
                {t('hero.seeHowItWorks')}
              </Button>
            </Box>

            <Typography variant="body2" sx={{ mt: 2.5, color: 'text.disabled' }}>
              {t('hero.noCreditCard')}
            </Typography>
          </Box>

          {/* Example receivables board: shows the outcome, not the technology */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Card
              role="img"
              aria-label={t('hero.board.ariaLabel')}
              sx={{
                background: 'rgba(35, 39, 51, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(189, 189, 189, 0.2)',
                boxShadow: '0 24px 48px rgba(0, 0, 0, 0.35)',
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
                <Typography variant="h6" component="p" sx={{ color: 'white', fontWeight: 700 }}>
                  {t('hero.board.title')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5 }}>
                  {t('hero.board.summary')}
                </Typography>
                {BOARD_ROWS.map((row) => {
                  const status = STATUS_STYLES[row.status];
                  return (
                    <Box
                      key={row.labelKey}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        py: 1.5,
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }} noWrap>
                          {t(row.labelKey)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          S/ {row.amount}
                        </Typography>
                      </Box>
                      <Chip
                        size="small"
                        icon={status.icon}
                        label={t(row.statusKey)}
                        sx={{
                          color: status.color,
                          background: `${status.color}1F`,
                          border: `1px solid ${status.color}55`,
                          fontWeight: 600,
                          '& .MuiChip-icon': { color: status.color },
                        }}
                      />
                    </Box>
                  );
                })}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LaunchPad;
