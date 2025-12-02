import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import GradientBackground from '@components/GradientBackground';
import GlassCard from '@components/GlassCard';
import {useFetch} from '@hooks/useFetch';
import {fetchRewardsHistory, fetchRewardsSummary} from '@api/rewards';
import {theme} from '@theme/index';

const RewardsScreen: React.FC = () => {
  const {data: summary} = useFetch(fetchRewardsSummary, []);
  const {data: history} = useFetch(fetchRewardsHistory, []);

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Rewards</Text>
        <GlassCard>
          <Text style={styles.points}>{summary?.data?.points ?? 0} pts</Text>
          <Text style={styles.muted}>
            Referral code {summary?.data?.referral_code ?? 'CSH----'}
          </Text>
        </GlassCard>

        <Text style={styles.subtitle}>History</Text>
        {history?.data?.length ? (
          history.data.map(item => (
            <GlassCard key={item.id} style={styles.row}>
              <Text style={styles.label}>{item.description || item.points_type}</Text>
              <Text style={styles.value}>{item.points} pts</Text>
            </GlassCard>
          ))
        ) : (
          <GlassCard>
            <Text style={styles.muted}>No reward movements yet.</Text>
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
  subtitle: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
  points: {
    color: theme.palette.cyan,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 28,
  },
  muted: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  value: {
    color: theme.palette.cyan,
    fontFamily: 'SpaceGrotesk-Bold',
  },
});

export default RewardsScreen;
