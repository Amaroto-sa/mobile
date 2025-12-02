import fetchMock from 'jest-fetch-mock';
import CookieManager from '@react-native-cookies/cookies';
import {apiFetch, ApiError} from '../src/api/client';
import {clearStoredSession} from '../src/api/session';

fetchMock.enableMocks();

describe('apiFetch', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('persists set-cookie responses', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({success: true, message: 'ok', data: {hello: 'world'}}),
      {
        headers: {'set-cookie': 'PHPSESSID=abc123; Path=/;'},
      },
    );

    const res = await apiFetch<any>('api/test', {method: 'GET'});
    expect(res.success).toBe(true);
    const cookies = await CookieManager.get('https://cardswaphub.xyz');
    expect(cookies.session?.value).toContain('PHPSESSID=abc123');
  });

  it('throws ApiError on 401 and clears session', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({success: false, message: 'Unauthorized'}),
      {status: 401},
    );
    await expect(apiFetch<any>('api/protected', {method: 'GET'})).rejects.toBeInstanceOf(ApiError);
    const cookies = await CookieManager.get('https://cardswaphub.xyz');
    expect(cookies.session).toBeUndefined();
  });
});

afterAll(async () => {
  await clearStoredSession();
});
