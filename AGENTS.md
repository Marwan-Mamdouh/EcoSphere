# AGENTS.md

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript; Tailwind CSS 4 (no `tailwind.config`), shadcn/ui ("new-york"); `@/*` → `./src/*`
- MongoDB via Mongoose 9 (db name `EcoSphere`), NextAuth v5 beta (JWT sessions), TSyringe DI, Stripe, next-intl
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`)

## Commands
- `npm run dev` — dev server (requires `.env`, see Setup)
- `npm run typecheck` — `tsc --noEmit` (this is what CI runs)
- `npm run lint` — ESLint (flat config `eslint.config.mjs`)
- `npm run build` / `npm run start`
- `npm run seed` — idempotent DB seed; loads `.env` via Node's `--env-file` flag (needs Node 20+). Never overwrites existing docs; skips Orders/Subscriptions (require real Stripe IDs).
- No test framework or test files exist; CI's `npm test --if-present` is a no-op.

## Setup
- `.env` is gitignored but required (MONGO_URI, AUTH_SECRET, Stripe, S3, AI keys). Many frontend API clients build URLs from `NEXT_PUBLIC_APP_URL`.
- NextAuth v5 uses `AUTH_SECRET`, not `NEXTAUTH_SECRET`.
- CI (`.github/workflows/node.js.yml`): branch `master`, Node 24 — `npm audit --audit-level=high` → `npm ci` → `npm run typecheck`.

## Architecture
- All UI routes live under `src/app/[locale]/…`; `src/app/api/…` is outside the locale segment. `src/i18n/routing.ts` sets `localePrefix: "always"`, so every UI link/route must include the locale (use the `next-intl` `Link`/`useRouter` from `src/i18n/routing.ts`, not Next's).
- i18n: routing declares `en`/`ar`/`fr`, but `src/messages/` only ships `en.json` and `ar.json` — a `fr` request crashes next-intl. Don't touch `fr` unless you add `src/messages/fr.json`.
- Middleware is `src/proxy.ts` exporting `proxy` (Next.js 16 renamed `middleware.ts` to `proxy.ts`). Auth rules + locale handling both run here. Do not create `middleware.ts`.
- Backend is layered per feature under `src/backend/features/<feature>/`: `*.controller.ts` → `*.service.ts` → `*.repository.ts` → `*.model.ts`. Every DI binding is registered by hand in `src/backend/config/container.ts` (TSyringe; `experimentalDecorators` + `reflect-metadata` required). API route files are thin wrappers that resolve a controller from `rootContainer` and delegate.
- Registration uses the Strategy Pattern: `src/backend/features/auth/registration/` has endUser / shop / organizer / recycleAgent strategies resolved via `RegistrationFactory`.
- API responses use a `{ success, data, message?, pagination? }` / `{ success: false, error, statusCode? }` envelope — new endpoints should follow it.
- Frontend state: Redux Toolkit in `src/frontend/redux/` (redux-persist whitelists `cart` and `fav`), Zod schemas in `src/frontend/schema/`, API client in `src/frontend/api/`, server actions in `src/frontend/actions/`.

## Gotchas
- `tsconfig.json` `include` has a stray literal path `"src/components/layout/Dashboard/Events/DisplayEvents"` — deleting/renaming that folder breaks `npm run typecheck`.
- Seed accounts (all password `Password123!`): `admin@ecosphere.com`, `customer1@example.com`, `customer2@example.com`, `organizer@ecosphere.com`, `agent@ecosphere.com`.
- Stripe webhook testing needs `stripe listen`/a public tunnel for `STRIPE_WEBHOOK_SECRET` events.
- Uploads go to AWS S3 (`BUCKET_NAME`); `next.config.ts` `images.remotePatterns` whitelists only the S3 bucket, Unsplash, and Google avatar hosts — new image sources won't render via `next/image` until added there.
