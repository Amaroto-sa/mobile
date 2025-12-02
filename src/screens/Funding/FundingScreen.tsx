import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import GradientBackground from '@components/GradientBackground';
import GlassCard from '@components/GlassCard';
import PrimaryButton from '@components/PrimaryButton';
import {
  PaymentProvider,
  PaymentChannel,
  initializePayment,
  verifyPayment,
} from '@api/payments';
import {theme} from '@theme/index';

const FundingScreen: React.FC = () => {
  const [amount, setAmount] = useState('5000');
  const [provider, setProvider] = useState<PaymentProvider>('paystack');
  const [channel, setChannel] = useState<PaymentChannel>('card');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const handleInitialize = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await initializePayment({
        amount: Number(amount),
        channel,
        provider,
      });
      setReference(res.data?.reference ?? null);
      if (res.data?.virtual_account) {
        setMessage(
          `Virtual account: ${res.data.virtual_account.bank_name} ${res.data.virtual_account.account_number}`,
        );
      } else if (res.data?.authorization_url) {
        setMessage('Complete payment in the opened sheet or webview.');
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Unable to start payment');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!reference) return;
    setLoading(true);
    setMessage(null);
    try {
      const res = await verifyPayment(reference);
      setMessage(res.message || res.data?.status || 'Verified');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <Text style={styles.title}>Add funds</Text>
      <GlassCard style={styles.card}>
        <TextInput
          placeholder="Amount (NGN)"
          placeholderTextColor={theme.palette.textSecondary}
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Text style={styles.label}>Provider</Text>
        <View style={styles.chipRow}>
          {(['paystack', 'flutterwave'] as PaymentProvider[]).map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.chip,
                provider === item && {backgroundColor: theme.palette.surface},
              ]}
              onPress={() => setProvider(item)}>
              <Text style={styles.value}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Channel</Text>
        <View style={styles.chipRow}>
          {(['card', 'bank_transfer'] as PaymentChannel[]).map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.chip,
                channel === item && {backgroundColor: theme.palette.surface},
              ]}
              onPress={() => setChannel(item)}>
              <Text style={styles.value}>{item.replace('_', ' ')}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <PrimaryButton
          label="Initialize"
          onPress={handleInitialize}
          loading={loading}
        />
        <PrimaryButton
          label="Verify payment"
          onPress={handleVerify}
          disabled={!reference}
          style={{marginTop: theme.spacing(1)}}
        />
      </GlassCard>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    marginBottom: theme.spacing(1),
  },
  card: {
    gap: theme.spacing(1.5),
  },
  input: {
    backgroundColor: theme.palette.surface,
    borderRadius: theme.radii.md,
    padding: theme.spacing(1.5),
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipRow: {
    flexDirection: 'row',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  chip: {
    paddingVertical: theme.spacing(0.75),
    paddingHorizontal: theme.spacing(1.5),
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.palette.stroke,
  },
  label: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  value: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
  message: {
    color: theme.palette.cyan,
    fontFamily: 'SpaceGrotesk-Regular',
  },
});

export default FundingScreen;
