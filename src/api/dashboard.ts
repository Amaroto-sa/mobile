import {apiFetch} from './client';
import {endpoints} from './endpoints';
import {WalletSummary} from './types';

export const fetchWalletSummary = async () => {
  const res = await apiFetch<any>(endpoints.dashboard, {method: 'GET'});
  const balance = res.data?.balance ?? 0;
  const points = res.data?.reward_points ?? 0;

  const mapped: WalletSummary = {
    balance: `NGN ${Number(balance).toFixed(2)}`,
    reward_points: points,
    recent_transactions: [],
    pending_giftcards: [],
  };

  return {...res, data: mapped};
};
