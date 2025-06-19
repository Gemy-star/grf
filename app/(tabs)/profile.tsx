import { ScrollView, StyleSheet, View, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Card } from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LanguageSelector } from '@/components/LanguageSelector';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useApi } from '@/hooks/useApi';
import { api, User } from '@/services/api';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Spacing, BorderRadius } from '@/constants/Spacing';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Globe, 
  Bell, 
  Shield, 
  Moon, 
  ChevronRight,
  Settings,
  LogOut
} from 'lucide-react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { colors, colorScheme, toggleColorScheme } = useTheme();
  const { t, isRTL } = useLanguage();

  const { data: users, loading, error } = useApi(() => api.getUsers());
  const currentUser = users?.[0]; // Use first user as current user for demo

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && !users) {
    return <ErrorMessage message={error} />;
  }

  const styles = createStyles(colors, isRTL);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText variant="title">{t('profile.title')}</ThemedText>
        </View>

        {/* Profile Card */}
        {currentUser && (
          <Card style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                style={styles.avatarImage}
              />
              <View style={styles.userInfo}>
                <ThemedText variant="heading">{currentUser.name}</ThemedText>
                <ThemedText color={colors.textSecondary}>
                  @{currentUser.username}
                </ThemedText>
              </View>
            </View>
          </Card>
        )}

        {/* Personal Information */}
        <View style={styles.section}>
          <ThemedText variant="subtitle" style={styles.sectionTitle}>
            {t('profile.personalInformation')}
          </ThemedText>
          
          {currentUser && (
            <>
              <Card>
                <View style={[styles.infoRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <Mail color={colors.primary} size={20} strokeWidth={2} />
                  <View style={styles.infoContent}>
                    <ThemedText size="sm" color={colors.textSecondary}>
                      {t('profile.email')}
                    </ThemedText>
                    <ThemedText weight="medium">{currentUser.email}</ThemedText>
                  </View>
                </View>
              </Card>

              <Card>
                <View style={[styles.infoRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <Phone color={colors.secondary} size={20} strokeWidth={2} />
                  <View style={styles.infoContent}>
                    <ThemedText size="sm" color={colors.textSecondary}>
                      {t('profile.phone')}
                    </ThemedText>
                    <ThemedText weight="medium">{currentUser.phone}</ThemedText>
                  </View>
                </View>
              </Card>

              <Card>
                <View style={[styles.infoRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <Globe color={colors.accent} size={20} strokeWidth={2} />
                  <View style={styles.infoContent}>
                    <ThemedText size="sm" color={colors.textSecondary}>
                      {t('profile.website')}
                    </ThemedText>
                    <ThemedText weight="medium">{currentUser.website}</ThemedText>
                  </View>
                </View>
              </Card>
            </>
          )}
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <ThemedText variant="subtitle" style={styles.sectionTitle}>
            {t('profile.preferences')}
          </ThemedText>
          
          <Card>
            <View style={[styles.settingRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <View style={[styles.settingLeft, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <Bell color={colors.error} size={20} strokeWidth={2} />
                <ThemedText weight="medium">{t('profile.notifications')}</ThemedText>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.secondary }}
                thumbColor={colors.surface}
              />
            </View>
          </Card>

          <Card>
            <View style={[styles.settingRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <View style={[styles.settingLeft, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <Moon color={colors.info} size={20} strokeWidth={2} />
                <ThemedText weight="medium">{t('profile.darkMode')}</ThemedText>
              </View>
              <Switch
                value={colorScheme === 'dark'}
                onValueChange={toggleColorScheme}
                trackColor={{ false: colors.border, true: colors.secondary }}
                thumbColor={colors.surface}
              />
            </View>
          </Card>

          {/* Language Selector */}
          <Card>
            <LanguageSelector />
          </Card>

          <TouchableOpacity>
            <Card>
              <View style={[styles.settingRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <View style={[styles.settingLeft, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <Shield color={colors.primary} size={20} strokeWidth={2} />
                  <ThemedText weight="medium">{t('profile.privacySecurity')}</ThemedText>
                </View>
                <ChevronRight 
                  color={colors.textTertiary} 
                  size={16} 
                  strokeWidth={2}
                  style={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
                />
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity>
            <Card>
              <View style={[styles.settingRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <View style={[styles.settingLeft, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                  <Settings color={colors.textTertiary} size={20} strokeWidth={2} />
                  <ThemedText weight="medium">{t('profile.appSettings')}</ThemedText>
                </View>
                <ChevronRight 
                  color={colors.textTertiary} 
                  size={16} 
                  strokeWidth={2}
                  style={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
                />
              </View>
            </Card>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.section}>
          <ThemedText variant="subtitle" style={styles.sectionTitle}>
            {t('profile.about')}
          </ThemedText>
          <Card>
            <ThemedText size="sm" color={colors.textSecondary} center>
              {t('profile.aboutText')}
            </ThemedText>
          </Card>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton}>
          <Card>
            <View style={[styles.settingRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
              <View style={[styles.settingLeft, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <LogOut color={colors.error} size={20} strokeWidth={2} />
                <ThemedText weight="medium" color={colors.error}>
                  {t('profile.signOut')}
                </ThemedText>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const createStyles = (colors: any, isRTL: boolean) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  header: {
    padding: Spacing.lg,
    paddingBottom: Spacing.base,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: Spacing.base,
  },
  userInfo: {
    alignItems: 'center',
  },
  section: {
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    textAlign: isRTL ? 'right' : 'left',
  },
  infoRow: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  infoContent: {
    flex: 1,
    textAlign: isRTL ? 'right' : 'left',
  },
  settingRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  signOutButton: {
    marginTop: Spacing.lg,
  },
});