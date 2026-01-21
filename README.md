# Next.js Boilerplate (Prisma + Auth + MFA)

Starter skeleton:

- Next.js (App Router) + TypeScript
- Tailwind with configurable theme variables (`app/globals.css`)
- Prisma ORM
- SQLite for local dev
- Postgres-ready schema + scripts
- Auth.js / NextAuth credentials login stored in DB
- Optional MFA (TOTP) with QR setup + OTP check during login
- User dashboard + Admin dashboard

## Quick start

```bash
cp .env.example .env
npm install

npm run db:dev:generate
npm run db:dev:migrate
npm run db:dev:seed

npm run dev
```

Seeded admin (created by `prisma/seed.ts`):
- `admin@example.com`
- `Admin123!`

## MFA
- Go to `/settings/mfa`
- Click **Enable MFA**
- Scan QR in your authenticator app
- Enter the 6-digit code to verify
- Next login: OTP becomes required

## Switching to Postgres
1. Update `.env` `DATABASE_URL` for Postgres
2. Use the Postgres schema:

```bash
npm run db:pg:generate
npm run db:pg:migrate
```

## Notes / upgrades
- Encrypt MFA secrets at rest (recommended)
- Add backup codes and admin CRUD
- Add audit logging
