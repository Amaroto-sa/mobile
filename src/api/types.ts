export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type User = {
  id: number;
  email: string;
  name: string;
  verified?: boolean;
  referral_code?: string;
};

export type WalletSummary = {
  balance: string;
  reward_points: number;
  recent_transactions: Transaction[];
  pending_giftcards: GiftCardSubmission[];
};

export type Transaction = {
  id: number;
  transaction_type: string;
  amount: number | string;
  amountFormatted?: string;
  status: 'pending' | 'completed' | 'failed';
  description?: string;
  created_at: string;
  gift_card_id?: number;
  balance_before?: number;
  balance_after?: number;
};

export type GiftCardType = {
  id: number;
  name: string;
  min_amount: number;
  max_amount: number;
  rate: number;
  country?: string;
  currency?: string;
  custom?: boolean;
};

export type GiftCardSubmission = {
  id: number;
  card_type: string;
  amount: number;
  rate: number;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  created_at: string;
  reference?: string;
};

export type BankAccount = {
  id: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  is_default?: boolean;
  masked?: string;
};

export type Withdrawal = {
  id: number;
  amount: number;
  destination: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
  reference?: string;
};

export type BillPayment = {
  id: number;
  type: 'airtime' | 'data' | 'tv' | 'electricity';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  meta?: Record<string, unknown>;
};

export type RewardEntry = {
  id: number;
  points: number;
  points_type: 'earned' | 'redeemed';
  description?: string;
  created_at: string;
};

export type NotificationItem = {
  id: number;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
};
