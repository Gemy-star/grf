import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedText } from './ThemedText';
import { useLanguage } from '@/contexts/LanguageContext';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  text?: string;
}

export function LoadingSpinner({ size = 'large', text }: LoadingSpinnerProps) {
  const { colors } = useTheme();
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.primary} />
      <ThemedText 
        size="sm" 
        color={colors.textSecondary} 
        style={styles.text}
      >
        {text || t('common.loading')}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 12,
  },
});