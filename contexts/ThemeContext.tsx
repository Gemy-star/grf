import { Colors, ColorScheme, ThemeColors } from '@/constants/Colors'; // Adjust import path as needed
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ThemeContextType {
  colors: ThemeColors;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark'); // Default to dark theme

  const colors = Colors[colorScheme];

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        colors,
        colorScheme,
        setColorScheme,
        toggleColorScheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.warn('useTheme must be used within a ThemeProvider');
    return {
      colors: Colors.dark, // Default fallback to dark theme
      colorScheme: 'dark' as ColorScheme,
      setColorScheme: () => {},
      toggleColorScheme: () => {},
    };
  }
  return context;
};
