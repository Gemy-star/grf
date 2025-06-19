export const Colors = {
  light: {
    // Primary Colors
    primary: '#007AFF',
    primaryLight: '#4DA3FF',
    primaryDark: '#0056CC',
    
    // Secondary Colors
    secondary: '#34C759',
    secondaryLight: '#67D97A',
    secondaryDark: '#248A3D',
    
    // Accent Colors
    accent: '#FF9500',
    accentLight: '#FFB84D',
    accentDark: '#CC7700',
    
    // Status Colors
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#007AFF',
    
    // Neutral Colors
    background: '#F2F2F7',
    surface: '#FFFFFF',
    surfaceSecondary: '#F8F9FA',
    
    // Text Colors
    text: '#1D1D1F',
    textSecondary: '#636366',
    textTertiary: '#8E8E93',
    textInverse: '#FFFFFF',
    
    // Border Colors
    border: '#E5E5EA',
    borderLight: '#F2F2F7',
    
    // Shadow
    shadow: '#000000',
    
    // Tab Bar
    tabBarBackground: '#FFFFFF',
    tabBarBorder: '#E5E5EA',
    tabBarActive: '#007AFF',
    tabBarInactive: '#8E8E93',
  },
  dark: {
    // Primary Colors
    primary: '#0A84FF',
    primaryLight: '#4DA3FF',
    primaryDark: '#0056CC',
    
    // Secondary Colors
    secondary: '#30D158',
    secondaryLight: '#67D97A',
    secondaryDark: '#248A3D',
    
    // Accent Colors
    accent: '#FF9F0A',
    accentLight: '#FFB84D',
    accentDark: '#CC7700',
    
    // Status Colors
    success: '#30D158',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#0A84FF',
    
    // Neutral Colors
    background: '#000000',
    surface: '#1C1C1E',
    surfaceSecondary: '#2C2C2E',
    
    // Text Colors
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textTertiary: '#8E8E93',
    textInverse: '#000000',
    
    // Border Colors
    border: '#38383A',
    borderLight: '#48484A',
    
    // Shadow
    shadow: '#000000',
    
    // Tab Bar
    tabBarBackground: '#1C1C1E',
    tabBarBorder: '#38383A',
    tabBarActive: '#0A84FF',
    tabBarInactive: '#8E8E93',
  },
};

export type ColorScheme = 'light' | 'dark';
export type ThemeColors = typeof Colors.light;