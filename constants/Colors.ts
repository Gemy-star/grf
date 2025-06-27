// constants/Colors.ts
export const Colors: Record<ColorScheme, ThemeColors> = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    tabBarBackground: '#F0F0F0',
    tabBarBorder: '#E0E0E0',
    tabBarActive: '#007AFF',
    tabBarInactive: '#8E8E93',
    fontFamily: 'System',
    fontFamilyArabic: 'IBM Plex Sans Arabic',
  },
  dark: {
    background: '#000000',
    text: '#FFFFFF',
    tabBarBackground: '#1C1C1E',
    tabBarBorder: '#333333',
    tabBarActive: '#5EF1CA',
    tabBarInactive: '#8E8E93',
    fontFamily: 'System',
    fontFamilyArabic: 'IBM Plex Sans Arabic',
  },
};

export type ThemeColors = {
  background: string;
  text: string;
  tabBarBackground: string;
  tabBarBorder: string;
  tabBarActive: string;
  tabBarInactive: string;
  fontFamily: string;
  fontFamilyArabic: string;
};

export type ColorScheme = 'light' | 'dark';
