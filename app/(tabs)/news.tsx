import { FlatList, Text, StyleSheet, View, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Card } from '@/components/Card';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useApi } from '@/hooks/useApi';
import { api, Post } from '@/services/api';
import { MessageCircle, Heart, Share } from 'lucide-react-native';

export default function NewsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  
  const { data: posts, loading, error, refetch } = useApi(
    () => api.getPosts(20)
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return <LoadingSpinner />;
  }

  if (error && !posts) {
    return (
      <ErrorMessage 
        message={error} 
        onRetry={onRefresh}
      />
    );
  }

  const renderPost = ({ item }: { item: Post }) => (
    <Card>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart color="#8E8E93" size={16} strokeWidth={2} />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle color="#8E8E93" size={16} strokeWidth={2} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share color="#8E8E93" size={16} strokeWidth={2} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Latest News</Text>
        <Text style={styles.subtitle}>Stay informed with recent updates</Text>
      </View>
      
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  listContent: {
    paddingBottom: 20,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 12,
    lineHeight: 24,
  },
  postBody: {
    fontSize: 15,
    color: '#636366',
    lineHeight: 22,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
});