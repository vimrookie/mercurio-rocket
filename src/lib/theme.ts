import { createTheme } from '@mui/material/styles';

// Shared theme with Mercurio Orbit for brand consistency
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#BDBDBD', // Mercurio gray
            light: '#E0E0E0', // Light Mercurio gray
            dark: '#9E9E9E', // Dark Mercurio gray
        },
        secondary: {
            main: '#00bcd4',
        },
        background: {
            default: '#181C23',
            paper: '#232733',
        },
        divider: 'rgba(255,255,255,0.08)',
        text: {
            primary: '#fff',
            secondary: 'rgba(255,255,255,0.7)',
            disabled: 'rgba(255,255,255,0.5)',
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '3.5rem',
            lineHeight: 1.1,
        },
        h2: {
            fontWeight: 600,
            fontSize: '2.5rem',
            lineHeight: 1.2,
        },
        h3: {
            fontWeight: 600,
            fontSize: '2rem',
            lineHeight: 1.3,
        },
        body1: {
            fontSize: '1.125rem',
            lineHeight: 1.6,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '12px 32px',
                    fontSize: '1rem',
                },
                contained: {
                    boxShadow: '0 4px 14px 0 rgba(189, 189, 189, 0.3)',
                    '&:hover': {
                        boxShadow: '0 6px 20px 0 rgba(189, 189, 189, 0.4)',
                        transform: 'translateY(-1px)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)',
                    border: '1px solid rgba(255,255,255,0.08)',
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    maxWidth: '1200px',
                },
            },
        },
    },
});

export default theme;