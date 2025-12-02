import {useCallback, useState} from 'react';
import {login, register, logout} from '@api/auth';
import {User} from '@api/types';
import {ApiError} from '@api/client';

let sharedUser: User | null = null;

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(sharedUser);
  const [loading, setLoading] = useState(false);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(
    async (email: string, password: string, twoFactorCode?: string) => {
      setLoading(true);
      setError(null);
      setTwoFactorRequired(false);
      try {
        const response = await login(email, password, twoFactorCode);
        setUser(response.data ?? null);
        sharedUser = response.data ?? null;
        return response;
      } catch (err) {
        if (
          err instanceof ApiError &&
          err.status === 401 &&
          err.message.toLowerCase().includes('2fa')
        ) {
          setTwoFactorRequired(true);
        } else {
          setError(err instanceof Error ? err.message : 'Unable to login');
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleRegister = useCallback(
    async (email: string, password: string, referral?: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await register({email, password, referral});
        setUser(response.data ?? null);
        sharedUser = response.data ?? null;
        return response;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to register');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleLogout = useCallback(async () => {
    setLoading(true);
    await logout();
    setUser(null);
    sharedUser = null;
    setLoading(false);
  }, []);

  return {
    user,
    loading,
    error,
    twoFactorRequired,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};
