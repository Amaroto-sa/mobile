import {apiFetch} from './client';
import {endpoints} from './endpoints';
import {ApiResponse, User} from './types';
import {storeSessionCookies, clearStoredSession} from './session';

export const validateReferralCode = (code?: string) =>
  code ? /^CSH\d{3,}$/i.test(code.trim()) : true;

export const login = async (
  email: string,
  password: string,
  twoFactorCode?: string,
) => {
  const payload = await apiFetch<User>(endpoints.auth.login, {
    body: JSON.stringify({
      email,
      password,
      ...(twoFactorCode ? {'2fa_code': twoFactorCode} : {}),
    }),
    headers: {'Content-Type': 'application/json'},
  });
  await storeSessionCookies();
  return payload;
};

export const register = async (params: {
  email: string;
  password: string;
  referral?: string;
}) => {
  if (!validateReferralCode(params.referral)) {
    throw new Error('Referral code must match CSH#### format');
  }
  const payload = await apiFetch<User>(endpoints.auth.register, {
    body: JSON.stringify({
      email: params.email,
      password: params.password,
      referral_code: params.referral,
    }),
    headers: {'Content-Type': 'application/json'},
  });
  await storeSessionCookies();
  return payload;
};

export const logout = async (): Promise<ApiResponse<null>> => {
  const res = await apiFetch<null>(endpoints.auth.logout, {
    method: 'POST',
  });
  await clearStoredSession();
  return res;
};

export const requestPasswordReset = (email: string) =>
  apiFetch<null>(endpoints.auth.forgot, {
    body: JSON.stringify({email}),
    headers: {'Content-Type': 'application/json'},
  });

export const verifyEmail = (code: string) => {
  if (!endpoints.auth.verifyEmail) {
    return Promise.resolve({
      success: true,
      message: `Code ${code} captured. Complete verification on the web portal if required.`,
      data: null,
    } as ApiResponse<null>);
  }

  return apiFetch<null>(endpoints.auth.verifyEmail, {
    body: JSON.stringify({code}),
    headers: {'Content-Type': 'application/json'},
  });
};

export const verifyTwoFactor = (email: string, password: string, token: string) =>
  login(email, password, token);
