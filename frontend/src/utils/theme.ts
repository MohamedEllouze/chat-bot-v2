import { 
  createTheme
} from '@mui/material';

export const designTokens = {
  primary: '#1976d2',
  primaryLight: '#42a5f5',
  primaryDark: '#1565c0',
  secondary: '#dc004e',
  secondaryLight: '#ff1744',
  secondaryDark: '#b2003d',
  backgroundLight: '#f0f2f5',
  backgroundWhite: '#ffffff',
  backgroundGray: '#f5f5f5',
  textPrimary: '#333333',
  textSecondary: '#666666',
  textLight: '#ffffff',
  spacingXs: '0.5rem',
  spacingSm: '1rem',
  spacingMd: '1.5rem',
  spacingLg: '2rem',
  spacingXl: '3rem',
  borderRadiusSm: '4px',
  borderRadiusMd: '8px',
  borderRadiusLg: '12px',
  borderRadiusXl: '20px',
  shadowSm: '0 2px 4px rgba(0, 0, 0, 0.1)',
  shadowMd: '0 4px 6px rgba(0, 0, 0, 0.1)',
  shadowLg: '0 8px 16px rgba(0, 0, 0, 0.1)',
  transitionFast: '0.2s ease',
  transitionNormal: '0.3s ease',
  transitionSlow: '0.5s ease'
};

export const theme = createTheme({
  palette: {
    primary: {
      main: designTokens.primary,
    },
    secondary: {
      main: designTokens.secondary,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});