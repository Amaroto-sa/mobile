import CookieManager from '@react-native-cookies/cookies';
import {ApiResponse} from './types';
import {BASE_URL} from './endpoints';
import {restoreSessionCookies, storeSessionCookies, clearStoredSession} from './session';

type HttpMethod = 'GET' | 'POST';

export type RequestOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  timeoutMs?: number;
};

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

let restored = false;

const ensureSessionRestored = async () => {
  if (!restored) {
    await restoreSessionCookies();
    restored = true;
  }
};

const mergeHeaders = (
  input?: Record<string, string>,
): Record<string, string> => ({
  Accept: 'application/json',
  ...(input || {}),
});

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> {
  await ensureSessionRestored();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 20000);
  const url = path.startsWith('http') ? path : `${BASE_URL}/${path}`;
  const headers = mergeHeaders(options.headers);

  const response = await fetch(url, {
    method: options.method ?? 'POST',
    body: options.body,
    headers,
    credentials: 'include',
    signal: controller.signal,
  }).catch(err => {
    clearTimeout(timeout);
    throw new ApiError(err.message, 0);
  });
  clearTimeout(timeout);

  const setCookie = response.headers.get('set-cookie');
  if (setCookie) {
    await CookieManager.setFromResponse(BASE_URL, setCookie);
    await storeSessionCookies();
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const payload: ApiResponse<T> = isJson
    ? await response.json()
    : ({success: response.ok, message: await response.text()} as ApiResponse<T>);

  if (response.status === 401) {
    await clearStoredSession();
    throw new ApiError(payload.message || 'Session expired', response.status);
  }

  if (!response.ok || payload.success === false) {
    throw new ApiError(payload.message || 'Request failed', response.status);
  }

  if (payload.data === undefined && isJson) {
    return {...payload, data: undefined};
  }

  return payload;
}

export {ApiError};
