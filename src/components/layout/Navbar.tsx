'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import { Menu as MenuIcon, Close, RocketLaunch } from '@mui/icons-material';
import Link from 'next/link';
import { useIntl } from '@/i18n/IntlProvider';
import { appUrl, localeHref } from '@/lib/urls';
import MercurioLogo from '@/components/shared/MercurioLogo';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

const Navbar: React.FC = () => {
  const { t, locale } = useIntl();
  const [open, setOpen] = useState(false);

  // Anchor links target the home page (with hash) so they work from any route.
  const navLinks = [
    { label: t('nav.features'), href: `${localeHref(locale)}#features` },
    { label: t('nav.howItWorks'), href: `${localeHref(locale)}#how-it-works` },
    { label: t('nav.pricing'), href: localeHref(locale, 'pricing') },
    { label: t('nav.faq'), href: `${localeHref(locale)}#faq` },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(24, 28, 35, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 68, gap: 2 }}>
          {/* Brand */}
          <Link
            href={localeHref(locale)}
            style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginRight: 'auto' }}
          >
            <MercurioLogo size={34} animated={false} />
            <Box component="span" sx={{ color: 'white', fontWeight: 700, fontSize: '1.15rem', letterSpacing: 0.3 }}>
              Mercurio
            </Box>
          </Link>

          {/* Desktop links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                sx={{ color: 'text.secondary', fontWeight: 500, '&:hover': { color: 'white', background: 'transparent' } }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Desktop actions */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
            <LanguageSwitcher />
            <Button
              component="a"
              href={appUrl('/login')}
              sx={{ color: 'text.secondary', fontWeight: 600, '&:hover': { color: 'white' } }}
            >
              {t('nav.login')}
            </Button>
            <Button
              component={Link}
              href={localeHref(locale, 'signup')}
              variant="contained"
              startIcon={<RocketLaunch />}
              sx={{
                background: 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)',
                color: '#000',
                fontWeight: 700,
              }}
            >
              {t('nav.startFree')}
            </Button>
          </Box>

          {/* Mobile menu button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
            <LanguageSwitcher />
            <IconButton aria-label="Open menu" onClick={() => setOpen(true)} sx={{ color: 'white' }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, background: 'background.default', height: '100%', p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton aria-label="Close menu" onClick={() => setOpen(false)} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton component={Link} href={link.href} onClick={() => setOpen(false)}>
                  <ListItemText primary={link.label} primaryTypographyProps={{ color: 'text.secondary' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href={appUrl('/login')} onClick={() => setOpen(false)}>
                <ListItemText primary={t('nav.login')} primaryTypographyProps={{ color: 'text.secondary' }} />
              </ListItemButton>
            </ListItem>
          </List>
          <Button
            component={Link}
            href={localeHref(locale, 'signup')}
            onClick={() => setOpen(false)}
            variant="contained"
            fullWidth
            startIcon={<RocketLaunch />}
            sx={{
              mt: 1,
              background: 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)',
              color: '#000',
              fontWeight: 700,
            }}
          >
            {t('nav.startFree')}
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
