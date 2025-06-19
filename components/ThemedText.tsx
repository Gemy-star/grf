import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useTypography } from '@/hooks/useTypography';
import { Typography } from '@/constants/Typography';

interface ThemedTextProps extends TextProps {
  variant?: 'body' | 'caption' | 'heading' | 'title' | 'subtitle';
  size?: keyof typeof Typography.fontSize;
  weight?: keyof typeof Typography.fontWeight;
  color?: string;
  center?: boolean;
}

export function ThemedText({
  variant = 'body',
  size,
  weight,
  color,
  center,
  style,
  children,
  ...props
}: ThemedTextProps) {
  const { colors } = useTheme();
  const { getTextStyle } = useTypography();

  const getVariantStyle = () => {
    switch (variant) {
      case 'title':
        return getTextStyle('4xl', 'bold');
      case 'heading':
        return getTextStyle('2xl', 'semibold');
      case 'subtitle':
        return getTextStyle('lg', 'medium');
      case 'caption':
        return getTextStyle('sm', 'normal');
      default:
        return getTextStyle('base', 'normal');
    }
  };

  const variantStyle = getVariantStyle();
  const customStyle = size || weight ? getTextStyle(size, weight) : {};

  return (
    <Text
      style={[
        variantStyle,
        customStyle,
        {
          color: color || colors.text,
          textAlign: center ? 'center' : 'left',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}