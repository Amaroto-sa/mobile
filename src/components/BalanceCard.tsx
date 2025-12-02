import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '@theme/index';
import GlassCard from './GlassCard';

type Props = {
  balance: string;
  rewards: string;
  pointsLabel?: string;
};

export const BalanceCard: React.FC<Props> = ({
  balance,
  rewards,
  pointsLabel = 'Reward points',
}) => {
  return (
    <GlassCard style={styles.container}>
      <View>
        <Text style={styles.label}>Wallet balance</Text>
        <Text style={styles.amount}>{balance}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subLabel}>{pointsLabel}</Text>
        <Text style={styles.rewards}>{rewards}</Text>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing(1),
  },
  label: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Medium',
  },
  amount: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 28,
    letterSpacing: 0.4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subLabel: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  rewards: {
    color: theme.palette.cyan,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
});

export default BalanceCard;
