import React, {useState} from 'react';
import {ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import GradientBackground from '@components/GradientBackground';
import GlassCard from '@components/GlassCard';
import PrimaryButton from '@components/PrimaryButton';
import {requestWithdrawal, listWithdrawals, WithdrawalChannel} from '@api/withdrawals';
import {useFetch} from '@hooks/useFetch';
import {theme} from '@theme/index';

const WithdrawalsScreen: React.FC = () => {
  const {data, refetch} = useFetch(listWithdrawals, []);
  const [amount, setAmount] = useState('');
  const [channel, setChannel] = useState<WithdrawalChannel>('bank');
  const [destination, setDestination] = useState('');
  const [bankAccountId, setBankAccountId] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await requestWithdrawal({
        amount: Number(amount),
        channel,
        destination,
        bank_account_id: bankAccountId ? Number(bankAccountId) : undefined,
      });
      setMessage('Withdrawal created. We will update you shortly.');
      refetch();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Unable to withdraw');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Withdraw</Text>
        <GlassCard style={styles.card}>
          <Text style={styles.label}>Method</Text>
          <View style={styles.methodRow}>
            {(['bank', 'paypal', 'crypto'] as WithdrawalChannel[]).map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  channel === item && {backgroundColor: theme.palette.surface},
                ]}
                onPress={() => setChannel(item)}>
                <Text style={styles.chipText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            placeholder="Amount"
            placeholderTextColor={theme.palette.textSecondary}
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <TextInput
            placeholder="Destination (bank/PayPal/crypto)"
            placeholderTextColor={theme.palette.textSecondary}
            style={styles.input}
            value={destination}
            onChangeText={setDestination}
          />
          {channel === 'bank' ? (
            <TextInput
              placeholder="Bank account ID"
              placeholderTextColor={theme.palette.textSecondary}
              style={styles.input}
              keyboardType="numeric"
              value={bankAccountId}
              onChangeText={setBankAccountId}
            />
          ) : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <PrimaryButton
            label="Create request"
            onPress={handleSubmit}
            loading={loading}
            disabled={!amount || !destination || (channel === 'bank' && !bankAccountId)}
          />
        </GlassCard>

        <Text style={styles.subtitle}>Recent withdrawals</Text>
        {data?.data?.length ? (
          data.data.map(item => (
            <GlassCard key={item.id} style={styles.row}>
              <View>
                <Text style={styles.label}>{item.destination}</Text>
                <Text style={styles.muted}>{item.status}</Text>
              </View>
              <Text style={styles.value}>₦{item.amount}</Text>
            </GlassCard>
          ))
        ) : (
          <GlassCard>
            <Text style={styles.muted}>No withdrawals yet.</Text>
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
  card: {
    gap: theme.spacing(1),
  },
  input: {
    backgroundColor: theme.palette.surface,
    borderRadius: theme.radii.md,
    padding: theme.spacing(1.5),
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  message: {
    color: theme.palette.cyan,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  methodRow: {
    flexDirection: 'row',
    gap: theme.spacing(1),
  },
  chip: {
    paddingVertical: theme.spacing(0.5),
    paddingHorizontal: theme.spacing(1.5),
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.palette.stroke,
  },
  chipText: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
  muted: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  value: {
    color: theme.palette.cyan,
    fontFamily: 'SpaceGrotesk-Bold',
  },
});

export default WithdrawalsScreen;
