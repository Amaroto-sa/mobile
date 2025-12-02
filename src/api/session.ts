import CookieManager from '@react-native-cookies/cookies';
import EncryptedStorage from 'react-native-encrypted-storage';
import * as Keychain from 'react-native-keychain';
import {BASE_URL} from './endpoints';

const SESSION_KEY = 'csh.session.cookies';
const BIOMETRIC_SERVICE = 'csh.session.biometric';

const serializeCookies = (cookies: Record<string, unknown>) =>
  JSON.stringify(cookies);

const hydrateCookies = async (cookies: Record<string, any>) => {
  const entries = Object.keys(cookies || {});
  for (const name of entries) {
    const cookie = cookies[name];
    if (cookie?.value) {
      await CookieManager.set(BASE_URL, {
        name,
        value: cookie.value,
        domain: cookie.domain || '.cardswaphub.xyz',
        path: cookie.path || '/',
        secure: cookie.secure ?? true,
        httpOnly: cookie.httpOnly ?? false,
        expires: cookie.expires,
      });
    }
  }
};

export const storeSessionCookies = async () => {
  try {
    const cookies = await CookieManager.get(BASE_URL);
    const serialized = serializeCookies(cookies);
    await EncryptedStorage.setItem(SESSION_KEY, serialized);
    await Keychain.setGenericPassword('session', serialized, {
      service: BIOMETRIC_SERVICE,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
  } catch (err) {
    // fail silently; storage is best-effort
    console.warn('Unable to persist session', err);
  }
};

export const restoreSessionCookies = async (
  requireBiometric = false,
): Promise<boolean> => {
  try {
    let serialized: string | null = null;

    if (requireBiometric) {
      const result = await Keychain.getGenericPassword({
        service: BIOMETRIC_SERVICE,
        authenticationPrompt: {title: 'Unlock your CardSwapHub session'},
      });
      serialized = result?.password ?? null;
    } else {
      serialized = await EncryptedStorage.getItem(SESSION_KEY);
    }

    if (serialized) {
      const cookies = JSON.parse(serialized);
      await hydrateCookies(cookies);
      return true;
    }
  } catch (err) {
    console.warn('Unable to restore session', err);
  }
  return false;
};

export const clearStoredSession = async () => {
  try {
    await EncryptedStorage.removeItem(SESSION_KEY);
    await Keychain.resetGenericPassword({service: BIOMETRIC_SERVICE});
    await CookieManager.clearAll();
  } catch (err) {
    console.warn('Unable to clear session', err);
  }
};
