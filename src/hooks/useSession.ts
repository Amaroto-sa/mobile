import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  restoreSessionCookies,
  clearStoredSession,
  storeSessionCookies,
} from '@api/session';

type SessionContextValue = {
  authenticated: boolean;
  loading: boolean;
  hydrate: () => Promise<void>;
  reset: () => Promise<void>;
  setAuthenticated: (value: boolean) => void;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const SessionProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const hydrate = useCallback(async () => {
    setLoading(true);
    const restored = await restoreSessionCookies(true);
    setAuthenticated(restored);
    setLoading(false);
  }, []);

  const reset = useCallback(async () => {
    await clearStoredSession();
    setAuthenticated(false);
  }, []);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const value = useMemo(
    () => ({authenticated, loading, hydrate, reset, setAuthenticated}),
    [authenticated, loading, hydrate, reset],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return ctx;
};

export const persistAfterAuth = async () => {
  await storeSessionCookies();
};
