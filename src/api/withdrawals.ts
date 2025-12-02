import {apiFetch} from './client';
import {endpoints} from './endpoints';
import {Withdrawal} from './types';

export type WithdrawalChannel = 'bank' | 'paypal' | 'crypto';

export const requestWithdrawal = (params: {
  amount: number;
  channel: WithdrawalChannel;
  destination: string;
  bank_account_id?: number;
}) =>
  apiFetch<Withdrawal>(endpoints.withdrawals, {
    body: JSON.stringify({
      amount: params.amount,
      withdrawal_method: params.channel,
      withdrawal_details: params.destination,
      bank_account_id: params.bank_account_id,
    }),
    headers: {'Content-Type': 'application/json'},
  });

export const listWithdrawals = () =>
  apiFetch<Withdrawal[]>(endpoints.withdrawals, {method: 'GET'});
