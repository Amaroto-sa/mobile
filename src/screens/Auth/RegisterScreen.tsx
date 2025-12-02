import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '@components/GradientBackground';
import GlassCard from '@components/GlassCard';
import PrimaryButton from '@components/PrimaryButton';
import {useAuth} from '@hooks/useAuth';
import {persistAfterAuth, useSession} from '@hooks/useSession';
import {validateReferralCode} from '@api/auth';
import {RootStackParamList} from '@navigation/index';
import {theme} from '@theme/index';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const {register, loading, error} = useAuth();
  const {setAuthenticated} = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');

  const handleSubmit = async () => {
    if (!validateReferralCode(referral)) {
      return alert('Referral code should follow CSH#### format.');
    }
    const response = await register(email, password, referral || undefined);
    if (response?.data) {
      await persistAfterAuth();
      setAuthenticated(true);
    }
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <Text style={styles.title}>Create your vault</Text>
        <Text style={styles.subtitle}>
          Seamless sessions, biometric unlock, and referral rewards.
        </Text>
      </View>
      <GlassCard style={styles.card}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={theme.palette.textSecondary}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={theme.palette.textSecondary}
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Referral (CSH####)"
          placeholderTextColor={theme.palette.textSecondary}
          style={styles.input}
          autoCapitalize="characters"
          value={referral}
          onChangeText={setReferral}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton
          label="Register"
          onPress={handleSubmit}
          loading={loading}
          disabled={!email || !password}
          style={{marginTop: theme.spacing(2)}}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
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
    fontSize: 28,
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
  link: {
    color: theme.palette.cyan,
    fontFamily: 'SpaceGrotesk-SemiBold',
    marginTop: theme.spacing(1),
  },
  error: {
    color: theme.palette.danger,
    fontFamily: 'SpaceGrotesk-Regular',
  },
});

export default RegisterScreen;
