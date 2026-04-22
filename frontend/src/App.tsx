import React from 'react';
import { 
  ThemeProvider, 
  CssBaseline,
  GlobalStyles
} from '@mui/material';
import ChatInterface from './components/chat-interface';
import './styles/main.scss';
import { designTokens, theme } from './utils/theme';



const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          ':root': {
            '--primary-color': designTokens.primary,
            '--primary-light': designTokens.primaryLight,
            '--primary-dark': designTokens.primaryDark,
            '--secondary-color': designTokens.secondary,
            '--secondary-light': designTokens.secondaryLight,
            '--secondary-dark': designTokens.secondaryDark,
            '--background-light': designTokens.backgroundLight,
            '--background-white': designTokens.backgroundWhite,
            '--background-gray': designTokens.backgroundGray,
            '--text-primary': designTokens.textPrimary,
            '--text-secondary': designTokens.textSecondary,
            '--text-light': designTokens.textLight,
            '--spacing-xs': designTokens.spacingXs,
            '--spacing-sm': designTokens.spacingSm,
            '--spacing-md': designTokens.spacingMd,
            '--spacing-lg': designTokens.spacingLg,
            '--spacing-xl': designTokens.spacingXl,
            '--border-radius-sm': designTokens.borderRadiusSm,
            '--border-radius-md': designTokens.borderRadiusMd,
            '--border-radius-lg': designTokens.borderRadiusLg,
            '--border-radius-xl': designTokens.borderRadiusXl,
            '--shadow-sm': designTokens.shadowSm,
            '--shadow-md': designTokens.shadowMd,
            '--shadow-lg': designTokens.shadowLg,
            '--transition-fast': designTokens.transitionFast,
            '--transition-normal': designTokens.transitionNormal,
            '--transition-slow': designTokens.transitionSlow,
          }
        }}
      />
      <CssBaseline />
      <div className="App">
        <ChatInterface />
      </div>
    </ThemeProvider>
  );
};

export default App;
