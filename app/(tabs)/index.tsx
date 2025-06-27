import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useTypography } from '@/hooks/useTypography';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { t, language } = useLanguage();
  const { getTextStyle } = useTypography();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text
        style={[
          styles.title,
          getTextStyle('xl', 'bold'),
          {
            color: colors.text,
            textAlign: language === 'ar' ? 'right' : 'left',
            writingDirection: language === 'ar' ? 'rtl' : 'ltr',
          },
        ]}
      >
        {t('home.title') || 'Home'}
      </Text>
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
  title: {
    // base size and weight are overridden by getTextStyle
    fontSize: 24,
    fontWeight: 'bold',
  },
});
