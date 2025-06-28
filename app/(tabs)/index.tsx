import { ThemedView } from '@/components/ThemedView';
import WelcomeCard from '@/components/welcomeCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useTypography } from '@/hooks/useTypography';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { t, language } = useLanguage();
  const { getTextStyle } = useTypography();
  const isRTL = language === 'ar';

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          flexDirection: 'column',
          alignItems: 'stretch',
          writingDirection: isRTL ? 'rtl' : 'ltr',
        },
      ]}
    >
      <WelcomeCard />

      <Text
        style={[
          getTextStyle('xl', 'bold'),
          styles.title,
          {
            color: colors.text,
            textAlign: isRTL ? 'right' : 'left',
            marginTop: 24,
          },
        ]}
      >
        {t('home.title') || 'Home'}
      </Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    // Only spacing or custom tweaks here
  },
});
