import {apiFetch} from './client';
import {endpoints} from './endpoints';
import {BillPayment} from './types';

export const fetchBundles = (type: string) =>
  apiFetch<Record<string, unknown>>(endpoints.bills.bundles, {
    method: 'GET',
    headers: {'X-Bill-Type': type},
  });

export const payBill = (params: {
  type: BillPayment['type'];
  amount: number;
  customer: string;
  bundle_code?: string;
  provider?: 'flutterwave';
}) =>
  apiFetch<BillPayment>(endpoints.bills.pay, {
    body: JSON.stringify(params),
    headers: {'Content-Type': 'application/json'},
  });
