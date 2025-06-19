import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemedText } from './ThemedText';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { Globe } from 'lucide-react-native';

export function LanguageSelector() {
  const { language, changeLanguage, t } = useLanguage();
  const { colors } = useTheme();

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: t('languages.english') },
    { code: 'ar', name: t('languages.arabic') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Globe color={colors.primary} size={20} strokeWidth={2} />
        <ThemedText weight="medium">{t('profile.language')}</ThemedText>
      </View>
      
      <View style={styles.languageOptions}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageOption,
              {
                backgroundColor: language === lang.code ? colors.primary : colors.surface,
                borderColor: colors.border,
              }
            ]}
            onPress={() => changeLanguage(lang.code)}
          >
            <ThemedText
              color={language === lang.code ? colors.textInverse : colors.text}
              weight="medium"
            >
              {lang.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  languageOptions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  languageOption: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
});