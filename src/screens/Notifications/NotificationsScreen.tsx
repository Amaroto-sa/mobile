import React from 'react';
import {ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import GradientBackground from '@components/GradientBackground';
import GlassCard from '@components/GlassCard';
import {useFetch} from '@hooks/useFetch';
import {fetchNotifications, markNotificationRead} from '@api/notifications';
import {theme} from '@theme/index';

const NotificationsScreen: React.FC = () => {
  const {data, loading, refetch} = useFetch(fetchNotifications, []);

  const handleRead = async (id: number) => {
    await markNotificationRead(id);
    refetch();
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Notifications</Text>
        {loading ? (
          <GlassCard>
            <Text style={styles.muted}>Fetching updates…</Text>
          </GlassCard>
        ) : data?.data?.length ? (
          data.data.map(item => (
            <GlassCard key={item.id} style={styles.card}>
              <View style={{flex: 1}}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.muted}>{item.body}</Text>
                <Text style={styles.timestamp}>{item.created_at}</Text>
              </View>
              {!item.is_read ? (
                <TouchableOpacity onPress={() => handleRead(item.id)}>
                  <Text style={styles.link}>Mark read</Text>
                </TouchableOpacity>
              ) : null}
            </GlassCard>
          ))
        ) : (
          <GlassCard>
            <Text style={styles.muted}>You are up to date.</Text>
          </GlassCard>
        )}
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing(1.5),
    paddingBottom: theme.spacing(3),
  },
  title: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
  },
  card: {
    flexDirection: 'row',
    gap: theme.spacing(1),
    alignItems: 'flex-start',
  },
  cardTitle: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
  muted: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  timestamp: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 12,
    marginTop: theme.spacing(0.5),
  },
  link: {
    color: theme.palette.cyan,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
});

export default NotificationsScreen;
