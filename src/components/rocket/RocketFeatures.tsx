'use client';

import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { 
  Psychology, 
  WhatsApp, 
  TableChart, 
  CloudQueue, 
  Security, 
  Group
} from '@mui/icons-material';

const features = [
  {
    icon: <Psychology />,
    title: 'Intelligent OCR Engine',
    description: 'Advanced AI processes BCP, Yape, and custom receipts with 99%+ accuracy. Automatic classification and data extraction.',
    color: '#BDBDBD',
  },
  {
    icon: <WhatsApp />,
    title: 'WhatsApp Integration',
    description: 'Submit documents directly via WhatsApp. Real-time processing with instant notifications and status updates.',
    color: '#00bcd4',
  },
  {
    icon: <TableChart />,
    title: 'Google Sheets Sync',
    description: 'Automatic export to Google Sheets. Real-time data synchronization for seamless accounting workflows.',
    color: '#4CAF50',
  },
  {
    icon: <CloudQueue />,
    title: 'AWS Serverless',
    description: 'Scalable cloud infrastructure. Auto-scaling Lambda functions with 99.9% uptime guarantee.',
    color: '#FF9500',
  },
  {
    icon: <Security />,
    title: 'Enterprise Security',
    description: 'Multi-tenant architecture with complete data isolation. SOC 2 compliant with end-to-end encryption.',
    color: '#F44336',
  },
  {
    icon: <Group />,
    title: 'Team Management',
    description: 'Role-based access control. Organization management with user permissions and audit trails.',
    color: '#9C27B0',
  },
];

const stats = [
  { number: '90%', label: 'Reduction in Manual Work' },
  { number: '50%', label: 'Faster Processing' },
  { number: '99.9%', label: 'System Uptime' },
  { number: '1000+', label: 'Documents Processed Daily' },
];

const RocketFeatures: React.FC = () => {
  return (
    <Box
      sx={{
        py: 12,
        background: 'linear-gradient(180deg, #181C23 0%, #232733 100%)',
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
            Rocket-Powered Features
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
            Everything you need to automate your document processing workflow.
            Built with modern technology for maximum performance and reliability.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 10 }}>
          {features.map((feature, index) => (
            <Box key={index} sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' }, minWidth: '300px' }}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(35, 39, 51, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${feature.color}20`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    border: `1px solid ${feature.color}60`,
                    boxShadow: `0 20px 40px rgba(0,0,0,0.2), 0 0 20px ${feature.color}30`,
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: 2,
                      background: `${feature.color}20`,
                      color: feature.color,
                      mb: 3,
                    }}
                  >
                    {React.cloneElement(feature.icon, { fontSize: 'large' })}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      color: 'white',
                      fontWeight: 600,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Stats Section */}
        <Box
          sx={{
            background: 'rgba(189, 189, 189, 0.1)',
            borderRadius: 4,
            p: 6,
            border: '1px solid rgba(189, 189, 189, 0.2)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: 'white',
              fontWeight: 600,
            }}
          >
            Trusted by Businesses Worldwide
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
            {stats.map((stat, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 45%', md: '1 1 22%' }, minWidth: '150px', textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RocketFeatures;