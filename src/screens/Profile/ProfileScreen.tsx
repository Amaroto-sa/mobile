import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import GradientBackground from '@components/GradientBackground';
import GlassCard from '@components/GlassCard';
import PrimaryButton from '@components/PrimaryButton';
import {useAuth} from '@hooks/useAuth';
import {useSession} from '@hooks/useSession';
import {theme} from '@theme/index';

const ProfileScreen: React.FC = () => {
  const {user, logout, loading} = useAuth();
  const {reset} = useSession();

  const handleLogout = async () => {
    await logout();
    await reset();
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <GlassCard style={styles.card}>
          <View>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email ?? '—'}</Text>
          </View>
          <View>
            <Text style={styles.label}>Referral code</Text>
            <Text style={styles.value}>{user?.referral_code ?? 'CSH----'}</Text>
          </View>
          <PrimaryButton
            label="Logout"
            onPress={handleLogout}
            loading={loading}
            style={{marginTop: theme.spacing(2)}}
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
    gap: theme.spacing(1.5),
  },
  label: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  value: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
});

export default ProfileScreen;
