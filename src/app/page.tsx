'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

import theme from '@/lib/theme';
import LaunchPad from '@/components/rocket/LaunchPad';
import RocketFeatures from '@/components/rocket/RocketFeatures';
import FuelPricing from '@/components/rocket/FuelPricing';
import BlastOff from '@/components/rocket/BlastOff';

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: 'background.default' }}>
        <LaunchPad />
        <RocketFeatures />
        <FuelPricing />
        <BlastOff />
      </Box>
    </ThemeProvider>
  );
}