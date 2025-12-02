import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '@components/GradientBackground';
import GlassCard from '@components/GlassCard';
import PrimaryButton from '@components/PrimaryButton';
import {useAuth} from '@hooks/useAuth';
import {persistAfterAuth, useSession} from '@hooks/useSession';
import {RootStackParamList} from '@navigation/index';
import {theme} from '@theme/index';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {login, loading, error, twoFactorRequired} = useAuth();
  const {setAuthenticated} = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const handleSubmit = async () => {
    const response = await login(
      email,
      password,
      twoFactorCode || undefined,
    );
    if (response?.data) {
      await persistAfterAuth();
      setAuthenticated(true);
    }
  };

  return (
    <GradientBackground>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Unlock your CardSwapHub session with biometrics and stay signed in.
        </Text>
      </View>
      <GlassCard style={styles.card}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={theme.palette.textSecondary}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
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
        {(twoFactorRequired || twoFactorCode) && (
          <TextInput
            placeholder="2FA code"
            placeholderTextColor={theme.palette.textSecondary}
            style={styles.input}
            keyboardType="numeric"
            value={twoFactorCode}
            onChangeText={setTwoFactorCode}
          />
        )}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {twoFactorRequired ? (
          <Text style={styles.link}>2FA required. Enter your code.</Text>
        ) : null}
        <PrimaryButton
          label="Login"
          onPress={handleSubmit}
          loading={loading}
          disabled={!email || !password}
          style={{marginTop: theme.spacing(2)}}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Create account</Text>
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

export default LoginScreen;
