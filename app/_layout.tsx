import Header from '@/components/header';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'IBM Plex Sans Arabic': require('../assets/fonts/IBMPlexSansArabic-Regular.ttf'),
    'IBM Plex Sans Arabic Bold': require('../assets/fonts/IBMPlexSansArabic-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <View style={{ flex: 1 }}>
          {/* Custom Header */}
          <Header />

          {/* Navigation stack */}
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </LanguageProvider>
    </ThemeProvider>
  );
}
