import React, {useState} from 'react';
import {ScrollView, View, Text, TextInput, StyleSheet} from 'react-native';
import GradientBackground from '@components/GradientBackground';
import GlassCard from '@components/GlassCard';
import PrimaryButton from '@components/PrimaryButton';
import {payBill} from '@api/bills';
import {theme} from '@theme/index';

const BillsScreen: React.FC = () => {
  const [type, setType] = useState<'airtime' | 'data' | 'tv' | 'electricity'>(
    'airtime',
  );
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await payBill({
        type,
        customer,
        amount: Number(amount),
        provider: 'flutterwave',
      });
      setMessage(res.message || 'Bill payment sent');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bills & Data</Text>
        <GlassCard style={styles.card}>
          <Text style={styles.label}>Service</Text>
          <Text style={styles.value}>{type}</Text>
          <TextInput
            placeholder="Phone/Smartcard/Meter"
            placeholderTextColor={theme.palette.textSecondary}
            style={styles.input}
            value={customer}
            onChangeText={setCustomer}
          />
          <TextInput
            placeholder="Amount"
            placeholderTextColor={theme.palette.textSecondary}
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <PrimaryButton
            label="Pay bill"
            onPress={handlePay}
            loading={loading}
            disabled={!customer || !amount}
          />
        </GlassCard>
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
    gap: theme.spacing(1),
  },
  label: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  value: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-SemiBold',
    marginBottom: theme.spacing(1),
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
});

export default BillsScreen;
