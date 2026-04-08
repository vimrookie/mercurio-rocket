'use client';

import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { Language } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        background: 'rgba(35, 39, 51, 0.85)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        border: '1px solid rgba(189, 189, 189, 0.2)',
        px: 1,
        py: 0.5,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          border: '1px solid rgba(189, 189, 189, 0.5)',
          background: 'rgba(35, 39, 51, 0.95)',
        },
      }}
      onClick={toggleLanguage}
      role="button"
      aria-label="Toggle language"
    >
      <IconButton
        size="small"
        sx={{
          color: 'primary.main',
          p: 0.5,
        }}
      >
        <Language fontSize="small" />
      </IconButton>
      <Typography
        variant="body2"
        sx={{
          color: 'white',
          fontWeight: 600,
          fontSize: '0.8rem',
          userSelect: 'none',
          pr: 0.5,
        }}
      >
        {i18n.language === 'es' ? 'EN' : 'ES'}
      </Typography>
    </Box>
  );
};

export default LanguageSwitcher;
