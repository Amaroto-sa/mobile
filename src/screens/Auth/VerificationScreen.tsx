import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import GradientBackground from '@components/GradientBackground';
import GlassCard from '@components/GlassCard';
import PrimaryButton from '@components/PrimaryButton';
import {verifyEmail} from '@api/auth';
import {theme} from '@theme/index';

const VerificationScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await verifyEmail(code);
      setMessage(res.message || 'Email verified');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Unable to verify email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <Text style={styles.title}>Verify your email</Text>
        <Text style={styles.subtitle}>
          Enter the code sent to your inbox to finish onboarding.
        </Text>
      </View>
      <GlassCard style={styles.card}>
        <TextInput
          placeholder="Verification code"
          placeholderTextColor={theme.palette.textSecondary}
          style={styles.input}
          value={code}
          onChangeText={setCode}
        />
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <PrimaryButton
          label="Confirm"
          onPress={handleSubmit}
          loading={loading}
          disabled={!code}
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

export default VerificationScreen;
