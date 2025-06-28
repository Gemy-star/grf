import { BorderRadius, Spacing } from '@/constants/Spacing';
import { Language, useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Globe } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';

export function LanguageSelector() {
  const { language, changeLanguage, t } = useLanguage();
  const { colors, isDark } = useTheme();

  // Define languages with fallback names
  const languages: { code: Language; name: string; fallback: string }[] = [
    {
      code: 'en',
      name: t('languages.english'), // Changed from 'languages.en' to 'languages.english'
      fallback: 'English',
    },
    {
      code: 'ar',
      name: t('languages.arabic'), // Changed from 'languages.ar' to 'languages.arabic'
      fallback: 'العربية',
    },
  ];

  // Fallback colors in case theme context fails
  const safeColors = {
    primary: colors?.primary || '#002524',
    surface: colors?.surface || (isDark ? '#1C1C1E' : '#F2F2F7'),
    background: colors?.background || (isDark ? '#000000' : '#FFFFFF'),
    border: colors?.border || (isDark ? '#38383A' : '#C6C6C8'),
    text: colors?.text || (isDark ? '#FFFFFF' : '#000000'),
    textInverse: colors?.textInverse || (isDark ? '#000000' : '#FFFFFF'),
  };

  return (
    <View
      style={[styles.container, { backgroundColor: safeColors.background }]}
    >
      <View style={styles.header}>
        <Globe color={safeColors.primary} size={20} strokeWidth={2} />
        <ThemedText weight="medium" color={safeColors.text}>
          {t('profile.language') || 'Language'}
        </ThemedText>
      </View>

      <View style={styles.languageOptions}>
        {languages.map((lang) => {
          // Better fallback logic - if translation key is returned as-is, use fallback
          const translationKey = `languages.${lang.code === 'en' ? 'english' : 'arabic'}`;
          const translatedName = t(translationKey);

          // If translation returns the key itself or is empty, use fallback
          const displayName =
            translatedName === translationKey || !translatedName
              ? lang.fallback
              : translatedName;

          console.log(
            `Language ${lang.code}: key=${translationKey}, translated=${translatedName}, display=${displayName}`,
          );

          return (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageOption,
                {
                  backgroundColor:
                    language === lang.code
                      ? safeColors.primary
                      : safeColors.surface,
                  borderColor: safeColors.border,
                },
              ]}
              onPress={() => changeLanguage(lang.code)}
              activeOpacity={0.7}
            >
              <ThemedText
                color={
                  language === lang.code
                    ? safeColors.textInverse
                    : safeColors.text
                }
                weight="medium"
                style={styles.languageText}
              >
                {displayName}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
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
    justifyContent: 'center',
    minHeight: 48,
  },
  languageText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
