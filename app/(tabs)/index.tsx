import { ScrollView, StyleSheet, View, RefreshControl, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Card } from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useApi } from '@/hooks/useApi';
import { api, Post, User } from '@/services/api';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Spacing } from '@/constants/Spacing';
import { Clock, Users, FileText, TrendingUp } from 'lucide-react-native';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();
  const { t, isRTL } = useLanguage();
  
  const { data: posts, loading: postsLoading, error: postsError, refetch: refetchPosts } = useApi(
    () => api.getPosts(5)
  );
  
  const { data: users, loading: usersLoading, error: usersError, refetch: refetchUsers } = useApi(
    () => api.getUsers()
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchPosts(), refetchUsers()]);
    setRefreshing(false);
  };

  const isLoading = postsLoading || usersLoading;
  const hasError = postsError || usersError;

  if (isLoading && !refreshing) {
    return <LoadingSpinner />;
  }

  if (hasError && !posts && !users) {
    return (
      <ErrorMessage 
        message={postsError || usersError || t('common.error')} 
        onRetry={onRefresh}
      />
    );
  }

  const styles = createStyles(colors, isRTL);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <ThemedText variant="title" color={colors.textInverse} center>
              {t('home.title')}
            </ThemedText>
            <ThemedText variant="subtitle" color={colors.textInverse} center style={styles.heroSubtitle}>
              {t('home.subtitle')}
            </ThemedText>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={[styles.statItem, { backgroundColor: colors.surface }]}>
            <FileText color={colors.primary} size={24} strokeWidth={2} />
            <ThemedText variant="heading" style={styles.statNumber}>
              {posts?.length || 0}
            </ThemedText>
            <ThemedText size="xs" color={colors.textSecondary}>
              {t('home.recentPosts')}
            </ThemedText>
          </View>
          
          <View style={[styles.statItem, { backgroundColor: colors.surface }]}>
            <Users color={colors.secondary} size={24} strokeWidth={2} />
            <ThemedText variant="heading" style={styles.statNumber}>
              {users?.length || 0}
            </ThemedText>
            <ThemedText size="xs" color={colors.textSecondary}>
              {t('home.activeUsers')}
            </ThemedText>
          </View>
          
          <View style={[styles.statItem, { backgroundColor: colors.surface }]}>
            <TrendingUp color={colors.accent} size={24} strokeWidth={2} />
            <ThemedText variant="heading" style={styles.statNumber}>
              24%
            </ThemedText>
            <ThemedText size="xs" color={colors.textSecondary}>
              {t('home.growth')}
            </ThemedText>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <ThemedText variant="heading" style={styles.sectionTitle}>
            {t('home.recentActivity')}
          </ThemedText>
          
          {posts?.map((post: Post) => (
            <Card key={post.id}>
              <View style={[styles.postHeader, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
                <Clock color={colors.textTertiary} size={16} strokeWidth={2} />
                <ThemedText size="xs" color={colors.textTertiary}>
                  {t('home.hoursAgo', { count: 2 })}
                </ThemedText>
              </View>
              <ThemedText variant="subtitle" style={styles.postTitle}>
                {post.title}
              </ThemedText>
              <ThemedText size="sm" color={colors.textSecondary} numberOfLines={2}>
                {post.body}
              </ThemedText>
            </Card>
          ))}
        </View>
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
  heroSection: {
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  heroSubtitle: {
    marginTop: Spacing.sm,
  },
  statsContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-around',
    marginHorizontal: Spacing.base,
    marginVertical: Spacing.xl,
  },
  statItem: {
    borderRadius: 16,
    padding: Spacing.lg,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    marginTop: Spacing.sm,
  },
  section: {
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    textAlign: isRTL ? 'right' : 'left',
  },
  postHeader: {
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: 4,
  },
  postTitle: {
    marginBottom: Spacing.sm,
    lineHeight: 22,
    textAlign: isRTL ? 'right' : 'left',
  },
});