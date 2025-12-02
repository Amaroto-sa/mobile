import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import GradientBackground from '@components/GradientBackground';
import BalanceCard from '@components/BalanceCard';
import TransactionList from '@components/TransactionList';
import GlassCard from '@components/GlassCard';
import {useFetch} from '@hooks/useFetch';
import {fetchWalletSummary} from '@api/dashboard';
import {theme} from '@theme/index';

const DashboardScreen: React.FC = () => {
  const {data, loading, error} = useFetch(fetchWalletSummary, []);

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your day, elevated</Text>
        {data ? (
          <BalanceCard
            balance={data.data?.balance ?? 'NGN 0.00'}
            rewards={`${data.data?.reward_points ?? 0} pts`}
          />
        ) : (
          <GlassCard>
            <Text style={styles.muted}>
              {loading ? 'Loading balance…' : 'Balance unavailable'}
            </Text>
          </GlassCard>
        )}

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>Recent activity</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>
          <TransactionList
            items={data?.data?.recent_transactions ?? []}
            loading={loading}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending gift cards</Text>
          <GlassCard>
            {data?.data?.pending_giftcards?.length ? (
              data.data.pending_giftcards.map(card => (
                <View key={card.id} style={styles.pendingRow}>
                  <View>
                    <Text style={styles.cardTitle}>{card.card_type}</Text>
                    <Text style={styles.muted}>{card.status}</Text>
                  </View>
                  <Text style={styles.cardAmount}>₦{card.amount}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.muted}>No pending redemptions.</Text>
            )}
          </GlassCard>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  title: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 26,
  },
  section: {
    gap: theme.spacing(1),
  },
  sectionTitle: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-SemiBold',
    fontSize: 18,
  },
  muted: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  error: {
    color: theme.palette.danger,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  pendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing(0.5),
  },
  cardTitle: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
  cardAmount: {
    color: theme.palette.cyan,
    fontFamily: 'SpaceGrotesk-Bold',
  },
});

export default DashboardScreen;
