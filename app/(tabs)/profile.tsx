import { LanguageSelector } from '@/components/LanguageSelector'; // adjust path if needed
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function ProfileScreen() {
  const { colors = { background: '#fff', text: '#000' } } = useTheme() || {};
  const { t = (key: string) => key } = useLanguage() || {};

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ThemedText style={[styles.title, { color: colors.text }]}>
        {t('profile.title')}
      </ThemedText>

      <LanguageSelector />
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
    marginBottom: 20,
  },
});
