import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import GradientBackground from '@components/GradientBackground';
import GlassCard from '@components/GlassCard';
import PrimaryButton from '@components/PrimaryButton';
import {verifyTwoFactor} from '@api/auth';
import {persistAfterAuth, useSession} from '@hooks/useSession';
import {theme} from '@theme/index';

type Props = {
  route?: {params?: {email: string; password: string}};
};

const TwoFAScreen: React.FC<Props> = ({route}) => {
  const {setAuthenticated} = useSession();
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const email = route?.params?.email;
  const password = route?.params?.password;

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!email || !password) {
        throw new Error('Missing credentials for 2FA verification.');
      }
      await verifyTwoFactor(email, password, token);
      await persistAfterAuth();
      setAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <Text style={styles.title}>Enter authenticator code</Text>
        <Text style={styles.subtitle}>
          {email ? `For ${email}` : 'Use your Google Authenticator code.'}
        </Text>
      </View>
      <GlassCard style={styles.card}>
        <TextInput
          placeholder="6-digit code"
          placeholderTextColor={theme.palette.textSecondary}
          style={styles.input}
          keyboardType="numeric"
          value={token}
          onChangeText={setToken}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton
          label="Verify"
          onPress={handleSubmit}
          loading={loading}
          disabled={!token}
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
    letterSpacing: 2,
  },
  error: {
    color: theme.palette.danger,
    fontFamily: 'SpaceGrotesk-Regular',
  },
});

export default TwoFAScreen;
