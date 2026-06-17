'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/**
 * Shared chrome for the static legal pages (Términos, Privacidad, Reembolsos).
 * Renders the standard Navbar/Footer and a readable prose container. The legal
 * documents are governed in Spanish, so their body text is authored once and
 * shown identically across locales.
 */
interface LegalPageProps {
  title: string;
  updated: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ py: { xs: 6, md: 10 }, background: '#181C23' }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 1.5, fontSize: { xs: '1.9rem', md: '2.6rem' } }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled', mb: 5 }}>
            Última actualización: {updated}
          </Typography>
          <Box
            sx={{
              color: 'text.secondary',
              lineHeight: 1.75,
              '& a': { color: 'primary.main' },
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

/** Section heading (h2). */
export const LegalSection: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography
    variant="h5"
    component="h2"
    sx={{ color: 'white', fontWeight: 700, mt: 5, mb: 2, fontSize: { xs: '1.2rem', md: '1.4rem' } }}
  >
    {children}
  </Typography>
);

/** Body paragraph. */
export const LegalParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.75 }}>
    {children}
  </Typography>
);

/** Bulleted list from an array of nodes. */
export const LegalList: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <List sx={{ listStyleType: 'disc', pl: 4, mb: 2, py: 0 }}>
    {items.map((item, i) => (
      <ListItem key={i} sx={{ display: 'list-item', color: 'text.secondary', px: 0, py: 0.5 }}>
        {item}
      </ListItem>
    ))}
  </List>
);

/** Internal site link. */
export const LegalInternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <MuiLink component={Link} href={href} sx={{ color: 'primary.main' }}>
    {children}
  </MuiLink>
);

/** Simple table with a header row and string cells. */
export const LegalTable: React.FC<{ head: string[]; rows: string[][] }> = ({ head, rows }) => (
  <TableContainer component={Paper} sx={{ my: 3, background: '#232733', border: '1px solid rgba(255,255,255,0.08)' }}>
    <Table size="small">
      <TableHead>
        <TableRow>
          {head.map((h) => (
            <TableCell key={h} sx={{ color: 'white', fontWeight: 700, borderColor: 'rgba(255,255,255,0.08)' }}>
              {h}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            {row.map((cell, j) => (
              <TableCell key={j} sx={{ color: 'text.secondary', borderColor: 'rgba(255,255,255,0.06)' }}>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
