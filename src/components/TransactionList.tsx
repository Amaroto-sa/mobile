import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {Transaction} from '@api/types';
import {theme} from '@theme/index';
import GlassCard from './GlassCard';

type Props = {
  items: Transaction[];
  loading?: boolean;
  emptyText?: string;
};

const statusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return theme.palette.success;
    case 'failed':
      return theme.palette.danger;
    default:
      return theme.palette.warning;
  }
};

export const TransactionList: React.FC<Props> = ({
  items,
  loading = false,
  emptyText = 'No recent activity yet.',
}) => {
  if (loading) {
    return (
      <GlassCard>
        <Text style={styles.muted}>Loading transactions…</Text>
      </GlassCard>
    );
  }

  if (!items.length) {
    return (
      <GlassCard>
        <Text style={styles.muted}>{emptyText}</Text>
      </GlassCard>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={item => `${item.id}-${item.created_at}`}
      renderItem={({item}) => (
        <GlassCard style={styles.item}>
          <View style={styles.row}>
            <View>
              <Text style={styles.title}>{item.transaction_type}</Text>
              <Text style={styles.muted}>{item.description || item.status}</Text>
            </View>
            <Text style={[styles.amount, {color: statusColor(item.status)}]}>
              {item.amountFormatted ?? item.amount}
            </Text>
          </View>
          <Text style={styles.date}>{item.created_at}</Text>
        </GlassCard>
      )}
      ItemSeparatorComponent={() => <View style={{height: theme.spacing(1)}} />}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    gap: 4,
  },
  title: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-SemiBold',
    fontSize: 16,
  },
  muted: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 13,
  },
  amount: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
  },
  date: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 12,
  },
});

export default TransactionList;
