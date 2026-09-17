# NextByte Journal

Production-oriented Next.js + TypeScript editorial site foundation for **NextByte Journal — Practical ideas for the modern digital world.**

## Stack
Next.js App Router, TypeScript, Tailwind CSS v4, Prisma, PostgreSQL, Lucide. The public article dataset is included as typed seed content; Prisma models provide the scalable persistence layer.

## Installation
1. Install Node.js 20+.
2. Copy `.env.example` to `.env`.
3. Set `DATABASE_URL` to PostgreSQL.
4. Set `ADMIN_EMAIL` and a strong `ADMIN_PASSWORD`.
5. Run `npm install`.
6. Run `npx prisma generate`.
7. Run `npx prisma db push`.
8. Run `npm run db:seed`.
9. Run `npm run dev`.

## Admin
Open `/admin/login`. Credentials are read from `ADMIN_EMAIL` and `ADMIN_PASSWORD`; no password is hardcoded in source. The included admin UI is intentionally separated from the public site. Extend the editor actions to persist new submissions using the existing Prisma schema.

## Environment variables
See `.env.example`. Never commit `.env`. Add real Google verification, Analytics ID, AdSense publisher ID, SMTP and Cloudinary values only when the corresponding service is actually configured.

## AdSense
The site uses visible `ADVERTISEMENT` placeholders only. Replace them with Google's official ad code after approval without altering Google's code. Add the exact publisher line Google supplies to `public/ads.txt`. There is no invented publisher ID.

## SEO
Metadata, canonical-ready fields, robots and sitemap routes are included. For a full production CMS, render Article/Breadcrumb/Organization/WebSite JSON-LD from the Prisma article records and validate it before launch.

## Content
Ten original sample articles are included as seed/demo content. Replace or expand them with the publication's reviewed material before launch. Do not treat sample copy as evidence or copy it elsewhere.

## Deployment
- **Vercel:** connect repository, add environment variables, deploy; use managed PostgreSQL.
- **Netlify:** use the Next.js runtime, configure the same environment variables and database.
- **Cloudflare:** deploy with the supported Next.js adapter/runtime and configure database access.
- **VPS:** `npm run build && npm start`, place behind HTTPS/reverse proxy and use a managed or secured PostgreSQL instance.

## Production checklist
Use HTTPS, secure cookies, strong admin credentials, backups, database migrations, rate limiting at the edge/API, CSP/security headers, a real email provider, consent-aware analytics/advertising, image optimization storage, and a monitored error/logging system. Validate Core Web Vitals and accessibility on real devices.

## Important
AdSense approval is not guaranteed. Approval depends on the live site's content, policies, user experience and Google's current requirements.
