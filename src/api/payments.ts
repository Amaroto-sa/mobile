import {apiFetch} from './client';
import {endpoints} from './endpoints';
import {ApiResponse} from './types';

export type PaymentProvider = 'paystack' | 'flutterwave';
export type PaymentChannel = 'card' | 'bank_transfer';

export type PaymentInitResponse = {
  provider: PaymentProvider;
  reference: string;
  authorization_url?: string;
  access_code?: string;
  virtual_account?: {
    bank_name: string;
    account_number: string;
    account_name?: string;
    expires_at?: string;
  };
};

export type PaymentVerification = {
  status: 'pending' | 'success' | 'failed';
  reference: string;
  amount: number;
  currency: string;
  provider: PaymentProvider;
  message?: string;
};

export const initializePayment = async (params: {
  amount: number;
  channel: PaymentChannel;
  provider: PaymentProvider;
}) =>
  apiFetch<PaymentInitResponse>(endpoints.payments.initialize, {
    body: JSON.stringify(params),
    headers: {'Content-Type': 'application/json'},
  });

export const verifyPayment = (reference: string) =>
  apiFetch<PaymentVerification>(endpoints.payments.verify, {
    body: JSON.stringify({reference}),
    headers: {'Content-Type': 'application/json'},
  });
