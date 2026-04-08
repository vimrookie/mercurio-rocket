'use client';

import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent } from '@mui/material';
import { RocketLaunch, WhatsApp, Email, Speed } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import MercurioLogo from '../shared/MercurioLogo';

const BlastOff: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: 12,
        background: 'linear-gradient(135deg, #181C23 0%, #232733 50%, #181C23 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(189, 189, 189, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 188, 212, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {/* Main CTA */}
          <Box sx={{ flex: 2, minWidth: '300px' }}>
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
              {t('cta.title')}
              <Box component="span" sx={{ color: 'primary.main', display: 'block' }}>
                {t('cta.titleHighlight')}
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 6,
                color: 'text.secondary',
                fontSize: '1.25rem',
                lineHeight: 1.6,
                maxWidth: '600px',
              }}
            >
              {t('cta.subtitle')}
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 6 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<RocketLaunch />}
                component="a"
                href="/signup"
                sx={{
                  background: 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)',
                  color: '#000',
                  fontWeight: 700,
                  px: 6,
                  py: 2,
                  fontSize: '1.125rem',
                  textDecoration: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(189, 189, 189, 0.4)',
                  },
                }}
              >
                {t('cta.startFree')}
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<WhatsApp />}
                sx={{
                  borderColor: 'secondary.main',
                  color: 'secondary.main',
                  px: 6,
                  py: 2,
                  fontSize: '1.125rem',
                  '&:hover': {
                    borderColor: 'secondary.light',
                    backgroundColor: 'rgba(0, 188, 212, 0.08)',
                  },
                }}
              >
                {t('cta.tryWhatsApp')}
              </Button>
            </Box>

            {/* Quick stats */}
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <Box sx={{ flex: 1, minWidth: '100px' }}>
                <Typography
                  variant="h4"
                  sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}
                >
                  {t('cta.setupTime')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t('cta.setupTimeLabel')}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: '120px' }}>
                <Typography
                  variant="h4"
                  sx={{ color: 'secondary.main', fontWeight: 700, mb: 1, fontSize: '1.5rem' }}
                >
                  {t('cta.noCreditCard')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t('cta.noCreditCardLabel')}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: '100px' }}>
                <Typography
                  variant="h4"
                  sx={{ color: 'primary.main', fontWeight: 700, mb: 1 }}
                >
                  {t('cta.support')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t('cta.supportLabel')}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Contact Options */}
          <Box sx={{ flex: 1, minWidth: '300px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Card
                  sx={{
                    background: 'rgba(35, 39, 51, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(189, 189, 189, 0.2)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Speed sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                      {t('cta.instantDemo')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                      {t('cta.instantDemoDesc')}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.main',
                      }}
                    >
                      {t('cta.watchNow')}
                    </Button>
                  </CardContent>
                </Card>

              <Card
                  sx={{
                    background: 'rgba(35, 39, 51, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 188, 212, 0.2)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Email sx={{ fontSize: 40, color: 'secondary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                      {t('cta.getInTouch')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                      hello@mercuriohub.io
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: 'secondary.main',
                        color: 'secondary.main',
                      }}
                    >
                      {t('cta.contactUs')}
                    </Button>
                  </CardContent>
                </Card>
            </Box>
          </Box>
        </Box>

        {/* Bottom Logo */}
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <MercurioLogo size={60} animated />
          <Typography
            variant="body2"
            sx={{
              mt: 3,
              color: 'text.disabled',
              fontStyle: 'italic',
            }}
          >
            {t('cta.footerTagline')}
            <br />
            {t('cta.footerSubtitle')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default BlastOff;
