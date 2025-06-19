import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Colors, ColorScheme, ThemeColors } from '@/constants/Colors';

interface ThemeContextType {
  colorScheme: ColorScheme;
  colors: ThemeColors;
  toggleColorScheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(systemColorScheme || 'light');

  useEffect(() => {
    if (systemColorScheme) {
      setColorSchemeState(systemColorScheme);
    }
  }, [systemColorScheme]);

  const colors = Colors[colorScheme];

  const toggleColorScheme = () => {
    setColorSchemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme);
  };

  return (
    <ThemeContext.Provider value={{
      colorScheme,
      colors,
      toggleColorScheme,
      setColorScheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}