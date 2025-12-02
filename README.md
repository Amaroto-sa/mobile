## CardSwapHub Mobile (React Native, TypeScript)

Android-first client that mirrors the web app while keeping the PHP session cookies intact. Biometric unlock is used when restoring a saved session.

### Setup
- Install dependencies: `yarn` or `npm install` inside `mobile`.
- Android run: `npx react-native run-android`.
- Tests: `npm test` (mocks cookies/secure storage; no network).
- Fonts: add Space Grotesk/Clash Display (see `src/theme/typography.ts`) to native projects or swap to a loaded family.

### Architecture
- `src/api`: typed API wrapper that preserves cookies (`@react-native-cookies/cookies`) and persists them via encrypted storage + Keychain for biometric unlock. Endpoints stay within existing PHP routes; payloads match current schemas.
- `src/hooks/useSession`: global session provider; 401 responses clear cookies and force re-auth; `persistAfterAuth` stores cookies post-login.
- `src/theme`: gradients/glass tokens for dark, atmospheric UI.
- `src/navigation`: bottom tabs + stack for auth and flows.
- Screens: Auth (login/register/2FA/email verify), Dashboard, Funding (Paystack/Flutterwave init + verify), Gift Cards (list + submit), Banks, Withdrawals, Bills, Rewards, Notifications, Profile.
- Components: gradient shells, glass cards, CTA buttons, balance + transaction primitives, skeletons.

### Notes
- Base URL is `https://cardswaphub.xyz`; no secrets or `.env` values are logged or bundled.
- Uploads are guarded for size (≤5MB) and MIME (JPG/PNG/WEBP) before hitting `api/giftcards/submit.php`.
- Bank code validation is enforced at 3–6 digits before posting to `api/user/bank_account.php`.
- Session is cookie-based; no schema changes or token issuance performed.
