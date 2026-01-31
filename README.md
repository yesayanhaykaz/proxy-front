# Proxiesseller Frontend (Next.js + Tailwind)

This folder is the new **Next.js frontend** for **proxiesseller.cc**.

## Key decisions (as requested)
- Tailwind CSS ✅
- Same domain deployment ✅ (keeps SEO and cookies)
- Keep PHP sessions ✅ (`credentials: include`)

## Environment
Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://proxiesseller.cc
NEXT_PUBLIC_API_BASE=/api
```

> `NEXT_PUBLIC_API_BASE=/api` is important so browser requests go to the **PHP API** and keep the session cookie.

## Required PHP JSON endpoints
Next.js currently expects:
- `GET /api/plans.php` → returns plans for Pricing

A minimal implementation is provided in `../backend_patch/api/plans.php` in this repository build output (see below).

## Install / build

```bash
pnpm i     # or npm i
pnpm build
pnpm start
```

## Nginx routing (same domain)
Route:
- `/api/*` (and legacy `/pages/*`) → PHP-FPM
- `/` → Next.js (node) server

Example (simplified):

```nginx
location ^~ /api/ {
  include fastcgi_params;
  fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
  fastcgi_pass unix:/run/php/php8.2-fpm.sock;
}

location ^~ /pages/ {
  include fastcgi_params;
  fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
  fastcgi_pass unix:/run/php/php8.2-fpm.sock;
}

location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
}
```

## SEO notes
- Marketing pages are under `app/(marketing)`.
- Dashboard pages are **noindex**.
- Redirects from legacy php routes are defined in `next.config.mjs`.

