import React, {useState} from 'react';
import {ScrollView, View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import GradientBackground from '@components/GradientBackground';
import GlassCard from '@components/GlassCard';
import PrimaryButton from '@components/PrimaryButton';
import {useFetch} from '@hooks/useFetch';
import {addBankAccount, deleteBankAccount, fetchBankAccounts, validateBankCode} from '@api/banks';
import {theme} from '@theme/index';

const BankAccountsScreen: React.FC = () => {
  const {data, loading, refetch} = useFetch(fetchBankAccounts, []);
  const [bankCode, setBankCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async () => {
    if (!validateBankCode(bankCode)) {
      return alert('Bank code must be 3–6 digits.');
    }
    setSubmitting(true);
    setMessage(null);
    try {
      await addBankAccount({
        bank_code: bankCode,
        bank_name: bankName,
        account_holder_name: accountHolder,
        account_number: accountNumber,
      });
      setBankCode('');
      setBankName('');
      setAccountNumber('');
      setAccountHolder('');
      setMessage('Bank added.');
      refetch();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Unable to add bank');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setSubmitting(true);
    setMessage(null);
    try {
      await deleteBankAccount(id);
      setMessage('Bank removed');
      refetch();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Unable to remove');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Payout accounts</Text>
        <GlassCard style={styles.card}>
          <TextInput
            placeholder="Bank code (3-6 digits)"
            placeholderTextColor={theme.palette.textSecondary}
            style={styles.input}
            keyboardType="numeric"
            value={bankCode}
            onChangeText={setBankCode}
          />
          <TextInput
            placeholder="Bank name"
            placeholderTextColor={theme.palette.textSecondary}
            style={styles.input}
            value={bankName}
            onChangeText={setBankName}
          />
          <TextInput
            placeholder="Account number"
            placeholderTextColor={theme.palette.textSecondary}
            style={styles.input}
            keyboardType="numeric"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />
          <TextInput
            placeholder="Account holder name"
            placeholderTextColor={theme.palette.textSecondary}
            style={styles.input}
            value={accountHolder}
            onChangeText={setAccountHolder}
          />
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <PrimaryButton
            label="Save account"
            onPress={handleAdd}
            loading={submitting}
            disabled={!bankCode || !accountNumber || !bankName || !accountHolder}
          />
        </GlassCard>

        <Text style={styles.subtitle}>Saved accounts</Text>
        {loading ? (
          <GlassCard>
            <Text style={styles.muted}>Loading…</Text>
          </GlassCard>
        ) : (
          data?.data?.map(account => (
            <GlassCard key={account.id} style={styles.account}>
              <View>
                <Text style={styles.accountName}>{account.bank_name}</Text>
                <Text style={styles.muted}>
                  {account.masked || account.account_number}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(account.id)}>
                <Text style={styles.delete}>Remove</Text>
              </TouchableOpacity>
            </GlassCard>
          ))
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
  account: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accountName: {
    color: theme.palette.textPrimary,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
  muted: {
    color: theme.palette.textSecondary,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  delete: {
    color: theme.palette.danger,
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
  message: {
    color: theme.palette.cyan,
    fontFamily: 'SpaceGrotesk-Regular',
  },
});

export default BankAccountsScreen;
