import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { Entypo, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from './ThemedText';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = Platform.OS === 'ios' ? 110 : 90;

const Sidebar = ({ userName = 'عبدالرحمن' }) => {
  const { isVisible, toggleSidebar } = useSidebar(); // add hideSidebar for overlay click
  const { language, t } = useLanguage();
  const insets = useSafeAreaInsets();
  const isRTL = language === 'ar';

  if (!isVisible) return null;

  const menuItems = [
    {
      label: t('sidebar.eventSchedule'),
      icon: <FontAwesome5 name="calendar-alt" size={20} color="#fff" />,
    },
    {
      label: t('sidebar.speakers'),
      icon: <Ionicons name="mic" size={20} color="#fff" />,
    },
    {
      label: t('sidebar.attendees'),
      icon: <MaterialCommunityIcons name="account-group" size={20} color="#fff" />,
    },
    {
      label: t('sidebar.exhibitions'),
      icon: <Ionicons name="book" size={20} color="#fff" />,
    },
    {
      label: t('sidebar.floorPlan'),
      icon: <Entypo name="map" size={20} color="#fff" />,
    },
    {
      label: t('sidebar.location'),
      icon: <Ionicons name="location-sharp" size={20} color="#fff" />,
    },
  ];

  return (
    <>
      {/* Overlay to close sidebar */}
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={toggleSidebar} />

      {/* Sidebar */}
      <LinearGradient
        colors={['#002524', '#0a3a34']}
        style={[
          styles.sidebar,
          {
            top: HEADER_HEIGHT,
            height: SCREEN_HEIGHT - HEADER_HEIGHT - insets.bottom,
            [isRTL ? 'right' : 'left']: 0,
          },
        ]}
      >
        <ScrollView contentContainerStyle={[styles.menu, { paddingBottom: insets.bottom + 20 }]}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, isRTL && { flexDirection: 'row-reverse' }]}
            >
              <View style={styles.icon}>{item.icon}</View>
              <ThemedText style={styles.menuText}>{item.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 9998,
  },
  sidebar: {
    position: 'absolute',
    width: 250,
    paddingHorizontal: 16,
    paddingTop: 24,
    zIndex: 9999, // on top of overlay and tab bar
    elevation: 20, // Android elevation
    overflow: 'hidden',
  },
  menu: {
    gap: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  icon: {
    width: 24,
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'IBM Plex Sans Arabic',
  },
});

export default Sidebar;
