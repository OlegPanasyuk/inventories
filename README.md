# Inventories

Next.js App Router project with PostgreSQL, Sequelize migrations, and a guide-aligned authentication flow based on the official Next.js authentication guide:
https://nextjs.org/docs/app/guides/authentication

## Stack

- Next.js App Router
- PostgreSQL
- Sequelize
- Sequelize CLI migrations and seeders
- Server Actions
- Encrypted HTTP-only cookie sessions

## Environment

Configure `.env`:

```env
SOFTWARE_VERSION_TAG=latest
SOFTWARE_PASSWORD=root
ADMIN_EMAIL=admin@email.com
ADMIN_PASSWORD=root
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=root
SESSION_SECRET=change-this-to-a-long-random-secret
```

`SESSION_SECRET` is required for signing and decrypting session cookies.

## Database

Start PostgreSQL and pgAdmin:

```bash
docker compose up -d
```

pgAdmin is available at `http://127.0.0.1:8080`.

Run migrations:

```bash
pnpm db:migrate
```

Seed the demo user:

```bash
pnpm db:seed:all
```

## Authentication Flow

Implemented pieces:

- Sign up with server-side validation and password hashing
- Sign in with password verification
- Encrypted HTTP-only session cookie
- Proxy-based optimistic route protection for `/dashboard`
- DAL verification before loading protected user data
- Sign out via server action

Routes:

- `/`
- `/login`
- `/signup`
- `/dashboard`

## Demo Account

After running the seeder, use:

- Email: `example@example.com`
- Password: `demo12345`

## Development

```bash
pnpm dev
```

## Verification

```bash
pnpm lint
pnpm exec tsc --noEmit
```