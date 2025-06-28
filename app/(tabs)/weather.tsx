import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function WeatherScreen() {
  const { colors } = useTheme() || { colors: {} };
  const { t } = useLanguage() || { t: (key: string) => key };

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: colors.background || '#fff' },
      ]}
    >
      <ThemedText style={[styles.title, { color: colors.text || '#000' }]}>
        {t('weather.title') || 'Weather Screen'}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
