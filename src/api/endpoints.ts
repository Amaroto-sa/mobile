export const BASE_URL = 'https://cardswaphub.xyz';

export const endpoints = {
  auth: {
    login: 'api/auth/login.php',
    register: 'api/auth/register.php',
    logout: 'api/auth/logout.php',
    forgot: 'api/auth/password_reset.php',
    verifyEmail: '',
  },
  dashboard: 'api/user/profile.php',
  payments: {
    initialize: 'api/payments/initialize.php',
    verify: 'api/payments/verify.php',
  },
  giftcards: {
    list: 'api/giftcards/list.php',
    submit: 'api/giftcards/submit.php',
    history: '',
  },
  bankAccounts: 'api/user/bank_account.php',
  withdrawals: 'api/withdrawals/request.php',
  bills: {
    pay: 'api/bills/pay.php',
    bundles: 'api/bills/bundles.php',
  },
  rewards: {
    summary: 'api/user/profile.php',
    history: 'api/user/profile.php',
  },
  notifications: {
    list: 'api/notifications/get.php',
    markRead: 'api/notifications/mark-read.php',
    markAll: 'api/notifications/mark-all-read.php',
  },
};
