import { Tabs } from 'expo-router';
import { Chrome as Home, Newspaper, Cloud, User } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTypography } from '@/hooks/useTypography';

export default function TabLayout() {
  const { colors } = useTheme();
  const { t, isRTL } = useLanguage();
  const { getTextStyle } = useTypography();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopWidth: 1,
          borderTopColor: colors.tabBarBorder,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarLabelStyle: {
          ...getTextStyle('xs', 'semibold'),
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('navigation.home'),
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: t('navigation.news'),
          tabBarIcon: ({ color, size }) => (
            <Newspaper color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: t('navigation.weather'),
          tabBarIcon: ({ color, size }) => (
            <Cloud color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('navigation.profile'),
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}