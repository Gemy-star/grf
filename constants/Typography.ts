import { Platform } from 'react-native';

export const Typography = {
  // Font Families
  fontFamily: {
    regular: Platform.select({
      ios: 'Inter-Regular',
      android: 'Inter-Regular',
      web: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }),
    medium: Platform.select({
      ios: 'Inter-Medium',
      android: 'Inter-Medium', 
      web: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }),
    semiBold: Platform.select({
      ios: 'Inter-SemiBold',
      android: 'Inter-SemiBold',
      web: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }),
    bold: Platform.select({
      ios: 'Inter-Bold',
      android: 'Inter-Bold',
      web: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }),
  },
  
  // Arabic Font Families
  fontFamilyArabic: {
    regular: Platform.select({
      ios: 'Cairo-Regular',
      android: 'Cairo-Regular',
      web: 'Cairo, "Segoe UI", Tahoma, Arial, sans-serif',
    }),
    medium: Platform.select({
      ios: 'Cairo-Medium',
      android: 'Cairo-Medium',
      web: 'Cairo, "Segoe UI", Tahoma, Arial, sans-serif',
    }),
    semiBold: Platform.select({
      ios: 'Cairo-SemiBold', 
      android: 'Cairo-SemiBold',
      web: 'Cairo, "Segoe UI", Tahoma, Arial, sans-serif',
    }),
    bold: Platform.select({
      ios: 'Cairo-Bold',
      android: 'Cairo-Bold',
      web: 'Cairo, "Segoe UI", Tahoma, Arial, sans-serif',
    }),
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
    '5xl': 36,
    '6xl': 48,
    '7xl': 64,
  },

  // Line Heights
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 32,
    '2xl': 36,
    '3xl': 40,
    '4xl': 44,
    '5xl': 48,
    '6xl': 60,
    '7xl': 80,
  },

  // Font Weights
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export type FontFamily = keyof typeof Typography.fontFamily;
export type FontSize = keyof typeof Typography.fontSize;
export type LineHeight = keyof typeof Typography.lineHeight;
export type FontWeight = keyof typeof Typography.fontWeight;