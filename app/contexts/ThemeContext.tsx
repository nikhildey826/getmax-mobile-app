import React, { createContext, useContext, useMemo, useState } from 'react';
import { Appearance } from 'react-native';

type Theme = {
  darkMode: boolean;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    inputBackground: string;
    buttonText: string;
  };
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<Theme | undefined>(undefined);

const lightColors = {
  primary: '#4E6AFF',
  secondary: '#6C757D',
  background: '#FFFFFF',
  cardBackground: '#F8F9FA',
  text: '#212529',
  textSecondary: '#6C757D',
  border: '#DEE2E6',
  success: '#28A745',
  danger: '#DC3545',
  warning: '#FFC107',
  info: '#17A2B8',
  inputBackground: '#FFFFFF',
  buttonText: '#FFFFFF',
};

const darkColors = {
  primary: '#5D7AFF',
  secondary: '#8E8E93',
  background: '#121212',
  cardBackground: '#1E1E1E',
  text: '#E0E0E0',
  textSecondary: '#8E8E93',
  border: '#2C2C2C',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  info: '#0A84FF',
  inputBackground: '#1E1E1E',
  buttonText: '#FFFFFF',
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = Appearance.getColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = useMemo(
    () => ({
      darkMode,
      colors: darkMode ? darkColors : lightColors,
      toggleDarkMode,
    }),
    [darkMode]
  );

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};