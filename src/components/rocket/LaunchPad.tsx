'use client';

import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent } from '@mui/material';
import { RocketLaunch, AutoAwesome, Speed, Security } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import MercurioLogo from '../shared/MercurioLogo';

const LaunchPad: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #181C23 0%, #232733 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Space background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(189, 189, 189, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 188, 212, 0.1) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Hero Content */}
          <Box sx={{ flex: 1, minWidth: '300px' }}>
            <Box sx={{ mb: 4 }}>
              <MercurioLogo size={80} animated />
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

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: 'text.secondary',
                fontSize: '1.25rem',
                lineHeight: 1.6,
                maxWidth: '500px',
              }}
            >
              {t('hero.subtitle')}{' '}
              <strong>{t('hero.subtitleHighlight')}</strong>
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
                  px: 4,
                  py: 1.5,
                  textDecoration: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t('hero.startFree')}
              </Button>
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
                    color: 'primary.light',
                    backgroundColor: 'rgba(189, 189, 189, 0.08)',
                  },
                }}
              >
                {t('hero.watchDemo')}
              </Button>
            </Box>
          </Box>

          {/* Feature Cards */}
          <Box sx={{ flex: 1, minWidth: '300px' }}>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(35, 39, 51, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(189, 189, 189, 0.2)',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <AutoAwesome sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1, color: 'white' }}>
                      {t('hero.ocrAccuracy')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {t('hero.ocrAccuracyDesc')}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ flex: '1 1 45%', minWidth: '200px' }}>
                <Card
                  sx={{
                    height: '100%',
                    background: 'rgba(35, 39, 51, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 188, 212, 0.3)',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Speed sx={{ fontSize: 40, color: 'secondary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1, color: 'white' }}>
                      {t('hero.realTimeProcessing')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {t('hero.realTimeProcessingDesc')}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ flex: '1 1 100%', minWidth: '200px' }}>
                <Card
                  sx={{
                    background: 'rgba(35, 39, 51, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(189, 189, 189, 0.2)',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Security sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6" sx={{ mb: 1, color: 'white' }}>
                      {t('hero.enterpriseSecurity')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {t('hero.enterpriseSecurityDesc')}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LaunchPad;
