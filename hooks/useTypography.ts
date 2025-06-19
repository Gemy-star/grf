import { useMemo } from 'react';
import { Typography } from '@/constants/Typography';
import { useLanguage } from '@/contexts/LanguageContext';

export function useTypography() {
  const { language } = useLanguage();
  
  const fontFamily = useMemo(() => {
    return language === 'ar' ? Typography.fontFamilyArabic : Typography.fontFamily;
  }, [language]);

  const getTextStyle = (
    size: keyof typeof Typography.fontSize = 'base',
    weight: keyof typeof Typography.fontWeight = 'normal'
  ) => {
    const fontFamilyKey = weight === 'normal' ? 'regular' : 
                         weight === 'medium' ? 'medium' :
                         weight === 'semibold' ? 'semiBold' : 'bold';

    return {
      fontFamily: fontFamily[fontFamilyKey],
      fontSize: Typography.fontSize[size],
      lineHeight: Typography.lineHeight[size],
      fontWeight: Typography.fontWeight[weight],
    };
  };

  return {
    fontFamily,
    getTextStyle,
    ...Typography,
  };
}