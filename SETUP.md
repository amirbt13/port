# Backend + Admin Panel — Setup

This portfolio now stores its content in **Supabase** (Postgres + Storage) and
ships a protected **`/admin`** panel to manage projects and personal info.
Everything runs inside this one Next.js app — there is no separate server.

## 1. Create a Supabase project

1. Sign up at [supabase.com](https://supabase.com) and create a project.
2. In **Project Settings → API**, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (secret — server only)
3. In **SQL Editor**, paste and run [`supabase/schema.sql`](supabase/schema.sql).
   This creates the `projects` and `site_settings` tables, RLS read policies,
   and the `project-images` + `assets` storage buckets (both public).

## 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in the Supabase values above, then set the admin login:

```bash
# generate the Auth.js secret
npx auth secret          # prints AUTH_SECRET — paste into NEXTAUTH_SECRET

# hash your admin password
npm run hash-password -- "your-strong-password"   # prints ADMIN_PASSWORD_HASH
```

Set `ADMIN_EMAIL` to the email you'll log in with, and `NEXTAUTH_URL` to
`http://localhost:3000` for local dev.

## 3. Install & migrate

```bash
npm install
npm run migrate     # uploads the existing 7 projects + images + CV/avatar/bio to Supabase
npm run dev
```

- Public site: http://localhost:3000
- Admin panel: http://localhost:3000/admin  (redirects to `/admin/login`)

The admin panel lets you:
- **Projects** — add / edit / delete, upload multiple images, pick the cover,
  remove images, set display order.
- **Personal info** — name, role label, hero intro, Persian bio, Instagram,
  email, and upload a new avatar / hero background / CV (PDF).

Saving revalidates the public pages, so changes appear immediately.

## 4. Deploy to Vercel

1. Add **all** the variables from `.env.local` to your Vercel project
   (**Settings → Environment Variables**), and set `NEXTAUTH_URL` to your
   production URL (e.g. `https://your-portfolio.vercel.app`).
2. Push to GitHub — Vercel redeploys automatically.

> The `service_role` key is only ever imported in server-only modules
> (`src/lib/supabase/admin.ts`, guarded by `server-only`), so it never reaches
> the browser bundle.

## 5. Retire the old static content (optional, after verifying)

Once the site reads correctly from Supabase, you can delete:
- `src/data/staticData.json`
- the per-project folders under `public/images/` (keep `avatar.jpg`,
  `teh_uni.jpg`, and `afra/2.jpg` only if you still reference them as fallbacks)

Commit first so you have a backup.

## Architecture at a glance

| Concern | Where |
|---|---|
| Data model / SQL | `supabase/schema.sql` |
| Public read client | `src/lib/supabase/client.ts` (anon key) |
| Admin write client | `src/lib/supabase/admin.ts` (service role, server-only) |
| Data access | `src/lib/data/{projects,settings,storage}.ts` |
| Auth | `src/auth.ts`, `src/auth.config.ts`, `src/middleware.ts` |
| Mutations | `src/app/admin/actions.ts` (server actions) |
| Admin UI | `src/app/admin/**` |
| Migration | `scripts/migrate.ts` |
