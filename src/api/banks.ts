import {apiFetch} from './client';
import {endpoints} from './endpoints';
import {BankAccount} from './types';

export const validateBankCode = (code: string) => /^\d{3,6}$/.test(code);

export const fetchBankAccounts = () =>
  apiFetch<BankAccount[]>(endpoints.bankAccounts, {method: 'GET'});

export const addBankAccount = async (params: {
  bank_code: string;
  account_number: string;
  bank_name: string;
  account_holder_name: string;
  is_default?: boolean;
}) => {
  if (!validateBankCode(params.bank_code)) {
    throw new Error('Bank code must be 3–6 digits.');
  }
  return apiFetch<BankAccount>(endpoints.bankAccounts, {
    body: JSON.stringify(params),
    headers: {'Content-Type': 'application/json'},
  });
};

export const deleteBankAccount = (id: number) =>
  apiFetch<null>(endpoints.bankAccounts, {
    method: 'DELETE',
    body: JSON.stringify({id}),
    headers: {'Content-Type': 'application/json'},
  });
