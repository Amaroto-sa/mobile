import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import GradientBackground from '@components/GradientBackground';
import GlassCard from '@components/GlassCard';
import PrimaryButton from '@components/PrimaryButton';
import {submitGiftCard} from '@api/giftcards';
import {theme} from '@theme/index';

const SubmitGiftCardScreen: React.FC = () => {
  const [cardType, setCardType] = useState('');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('1');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await submitGiftCard({
        card_type: cardType,
        amount: Number(amount),
        rate: Number(rate),
        code,
      });
      setMessage(res.message || 'Submitted for review.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <Text style={styles.title}>Submit gift card</Text>
        <Text style={styles.subtitle}>
          Upload codes or photos. We’ll validate size and MIME before sending.
        </Text>
      </View>
      <GlassCard style={styles.card}>
        <TextInput
          placeholder="Card type"
          placeholderTextColor={theme.palette.textSecondary}
          style={styles.input}
          value={cardType}
          onChangeText={setCardType}
        />
        <TextInput
          placeholder="Amount"
          placeholderTextColor={theme.palette.textSecondary}
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TextInput
          placeholder="Rate"
          placeholderTextColor={theme.palette.textSecondary}
          style={styles.input}
          keyboardType="numeric"
          value={rate}
          onChangeText={setRate}
        />
        <TextInput
          placeholder="Code (optional)"
          placeholderTextColor={theme.palette.textSecondary}
          style={styles.input}
          value={code}
          onChangeText={setCode}
        />
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <PrimaryButton
          label="Submit"
          onPress={handleSubmit}
          loading={loading}
          disabled={!cardType || !amount || !rate}
        />
      </GlassCard>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: theme.spacing(2),
  },
  title: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
  },
  subtitle: {
    color: theme.palette.textSecondary,
    marginTop: theme.spacing(0.5),
    fontFamily: 'SpaceGrotesk-Regular',
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
  message: {
    color: theme.palette.cyan,
    fontFamily: 'SpaceGrotesk-Regular',
  },
});

export default SubmitGiftCardScreen;
