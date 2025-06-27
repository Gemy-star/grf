import { useLanguage } from '@/contexts/LanguageContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = () => {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const FavoriteIcon = (
    <TouchableOpacity style={styles.iconWrapper}>
      <Ionicons name="bookmark-outline" size={24} color="#fff" />
    </TouchableOpacity>
  );

  const MenuIcon = (
    <TouchableOpacity style={styles.iconWrapper}>
      <Feather name="menu" size={24} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isRTL && styles.rtl]}>
      {isRTL ? MenuIcon : FavoriteIcon}

      <View style={styles.textContainer}>
        <Text
          style={[styles.welcomeText, { textAlign: isRTL ? 'right' : 'left' }]}
        >
          👋 {t('header.welcome', { name: 'عبد الرحمن' }) || 'Welcome'}
        </Text>
        <Text style={[styles.subText, { textAlign: isRTL ? 'right' : 'left' }]}>
          {t('header.subtitle') || 'Global Ranking Conference 2025'}
        </Text>
      </View>

      {isRTL ? FavoriteIcon : MenuIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#002524',
  },
  rtl: {
    flexDirection: 'row-reverse',
  },
  iconWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 16,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'IBM Plex Sans Arabic',
  },
  subText: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'IBM Plex Sans Arabic',
  },
});

export default Header;
