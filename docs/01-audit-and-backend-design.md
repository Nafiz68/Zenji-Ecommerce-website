# 01 — Frontend Audit & Backend Design

Status: draft, 2026-10-30. Brand name below is `<BRAND>` until the rebrand (see `02-rebrand-plan.md`) picks one.

---

## Part A — Frontend audit

### A1. What exists

| Area | Implementation | Notes |
|---|---|---|
| Stack | React 18 + Vite 5 + TypeScript + Tailwind 3 | Fine for production. Keep. |
| Animation | Framer Motion, Lenis smooth scroll | `gsap` is in `package.json` but never imported — remove it. |
| Routing | Hand-rolled `pushState` switch in `src/App.tsx` | Works. Unknown routes fall back to Home (no 404). |
| State | One `CartContext` (`src/context/CartContext.tsx`) holds cart **and** all UI state (drawers, modals, toasts) | OK for this size. |
| Data | `src/data/products.ts` — 10 hard-coded tees, prices, size chart | Must move to the backend. |
| Images | Hot-linked from `res.cloudinary.com/diqbikizp/.../zenji/products/*` | Not our account / not our photos — must be replaced (see 02). |
| Pages | Home, Drop (countdown + waitlist), Collection, Product detail (`/drop/:slug`), Lookbook, Our Story, FAQ, Reviews, Contact, Returns, Privacy, Terms, Login | |
| Global UI | Splash intro, katana cursor, marquee ticker, navbar, cart drawer, quick view, search, size guide, toasts, footer | |

### A2. Everything that is fake today (needs the backend)

| Feature | Where | Today | Needs |
|---|---|---|---|
| Product catalogue | `data/products.ts` | Static array | `GET /api/products` |
| Stock | `inStock: true` everywhere | Never changes | Per-size inventory |
| Checkout | `CartDrawer.tsx:49` | `setTimeout` → "SIMULATED CHECKOUT" toast, clears cart | Stripe Checkout |
| Promo codes | `CartDrawer.tsx:36` | Hard-coded `ZENJI10/AWAKENING15/ORIGIN15` in client | Stripe promotion codes |
| Shipping | `CartContext.tsx:152` | Free over A$150, client-only | Server-calculated |
| Drop countdown | `DropPage.tsx:40` | Target = "now + 18 days" on every visit (never arrives) | `drops.starts_at` from DB |
| Waitlist | `DropPage.tsx:70` | Toast only | Store subscriber + consent |
| Contact form | `PoliciesPage.tsx:20` | Toast only | Store + email to support |
| Login | `PoliciesPage.tsx:30` | Accepts any email/password | Real auth (or remove for v1) |
| Reviews | `PoliciesPage.tsx:119` | 4 invented reviews labelled "verified" | Real reviews or remove — **fabricated reviews are illegal under Australian Consumer Law** |

### A3. Bugs and risks found

1. **SPA deep links will 404 on Vercel.** No `vercel.json` rewrite, so refreshing `/collection` or `/drop/bushido-tee` hits a missing file. Fix: add `{"rewrites":[{"source":"/((?!api/).*)","destination":"/"}]}`.
2. **Promo toast lies** — always says "15% OFF" even for the 10% code (`CartDrawer.tsx:41`).
3. **Discount is frozen** — calculated once on apply; changing the cart afterwards leaves a stale amount.
4. **State mutation in `addToCart`** — `next[existingIdx].quantity += quantity` mutates the previous state object; React StrictMode double-invokes the updater in dev, so quantity can jump by 2.
5. **Cart restore picks the wrong product** — an unknown stored id silently becomes `PRODUCTS[0]` (`CartContext.tsx:52`). Should be dropped instead.
6. **Terms page shows the privacy policy** — `privacy-policy` and `terms` render the same text.
7. **Return policy conflicts with ACL** — "within 7 days" cap on defective items; statutory guarantees can't be time-limited like that.
8. **No 404 page**; unknown product slug behaviour should be checked.
9. **SEO** — one static `<title>`/description for every route; no per-product meta, no sitemap, no OG images.
10. **Accessibility** — custom katana cursor hides the native cursor; splash intro blocks content; nothing in `src/` honours `prefers-reduced-motion`; check focus traps in drawers/modals.
11. **Prices are trusted from the client** — fine for a demo, fatal with real payments. The backend must re-price every line.

Not checked: build (`npm run build`), Lighthouse score, mobile layout, each page's full copy.

---

## Part B — Backend design

### B1. Principle

Build the least backend that takes real money safely. Let paid services do the hard, risky parts:

- **Stripe Checkout** (hosted page) — card data, Apple/Google Pay, Afterpay, promo codes, receipts, refunds. We never touch card data (keeps us at PCI SAQ-A).
- **Supabase** — Postgres + Auth + row-level security in one service.
- **Resend** — transactional email (order confirmation, contact form, drop alerts).
- **Cloudinary (our own account)** — product images.
- **Vercel Functions** — API lives in `/api` of this same repo; one deploy.

> Smaller option, named for the record: Shopify (Basic) + this frontend via the Storefront API removes most of this backend (inventory, checkout, admin, tax, email). Trade-off: monthly fee + transaction fees + less control. Worth a 30-minute look before week 1 starts.

No custom admin panel in v1: products/stock are edited in the Supabase table editor, orders/refunds in the Stripe dashboard.

### B2. Architecture

```
Browser (React SPA on Vercel)
   │  GET products / POST checkout / forms
   ▼
Vercel Functions  /api/*  (TypeScript)
   ├── Supabase Postgres (products, stock, orders, subscribers…)
   ├── Stripe API  ──►  Stripe Checkout (hosted)
   │        ▲
   │        └── POST /api/webhooks/stripe  (signed events)
   └── Resend (email)
Supabase Auth  ◄── browser (login / magic link)
Cloudinary CDN ◄── browser (images)
```

### B3. Data model (Postgres)

```sql
create table drops (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  starts_at   timestamptz not null,        -- powers the countdown
  ends_at     timestamptz,
  is_public   boolean not null default false
);

create table products (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  description   text not null,
  details       text[] not null default '{}',
  colorway      text,
  badge         text check (badge in ('SALE','LIMITED','NEW')),
  price_cents   int  not null check (price_cents > 0),   -- AUD, GST inclusive
  sale_cents    int  check (sale_cents > 0 and sale_cents < price_cents),
  drop_id       uuid references drops(id),
  is_active     boolean not null default true,
  created_at    timestamptz not null default now()
);

create table product_images (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references products(id) on delete cascade,
  kind        text not null check (kind in ('front','back','side','graphic','model')),
  url         text not null,
  sort        int  not null default 0
);

create table variants (                     -- one row per size
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references products(id) on delete cascade,
  size        text not null,
  sku         text unique not null,
  stock       int  not null default 0 check (stock >= 0),
  unique (product_id, size)
);

create table orders (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references auth.users(id),     -- null for guest
  email               text not null,
  status              text not null check (status in ('pending','paid','fulfilled','cancelled','refunded')),
  stripe_session_id   text unique not null,
  stripe_payment_intent text,
  subtotal_cents      int not null,
  discount_cents      int not null default 0,
  shipping_cents      int not null default 0,
  total_cents         int not null,
  shipping_address    jsonb,
  tracking_number     text,
  created_at          timestamptz not null default now(),
  expires_at          timestamptz not null                  -- stock reservation deadline
);

create table order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders(id) on delete cascade,
  variant_id  uuid not null references variants(id),
  name        text not null,          -- snapshot at purchase time
  size        text not null,
  unit_cents  int  not null,
  quantity    int  not null check (quantity > 0)
);

create table subscribers (                  -- waitlist / newsletter (Spam Act: keep consent proof)
  email        text primary key,
  source       text not null,           -- 'drop_waitlist' | 'footer'
  consented_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

create table contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null check (length(message) <= 5000),
  created_at timestamptz not null default now()
);

create table reviews (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references products(id),
  order_id    uuid not null references orders(id),   -- only buyers can review → genuinely "verified"
  rating      int  not null check (rating between 1 and 5),
  body        text not null check (length(body) <= 2000),
  display_name text not null,
  is_approved boolean not null default false,
  created_at  timestamptz not null default now(),
  unique (order_id, product_id)
);
```

Row-level security: public `select` on `drops` (where `is_public`), `products` (where `is_active`), `product_images`, `variants` (size + stock only), approved `reviews`. Users can `select` their own `orders`/`order_items`. Everything else is written only by the API with the service-role key.

Promo codes are **not** a table — they live in Stripe (Coupons + Promotion Codes) and Checkout shows the field.

### B4. API

All under `/api`, JSON, TypeScript, validated with `zod` at the boundary.

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/api/products` | – | Active products + images + per-size stock. Cached (`s-maxage=60`). |
| GET | `/api/products/:slug` | – | One product. |
| GET | `/api/drops/current` | – | Next/active drop with `starts_at` for the countdown. |
| POST | `/api/checkout` | optional | Body `{ items: [{ variantId, quantity }] }` → returns `{ url }` of a Stripe Checkout session. |
| POST | `/api/webhooks/stripe` | Stripe signature | Order state machine (below). |
| POST | `/api/subscribe` | – | `{ email, source }` → upsert subscriber. |
| POST | `/api/contact` | – | Store message + email support via Resend. |
| GET | `/api/orders` | user | Signed-in user's orders. |
| POST | `/api/reviews` | user | Review a product from one of the user's paid orders. |

### B5. Checkout flow (the part that must be right)

1. Client sends only `variantId` + `quantity`. Never prices.
2. `/api/checkout`, in one DB transaction:
   - Load variants + products; reject inactive products, drops not yet started, quantity < 1 or > 10.
   - **Reserve stock**: `update variants set stock = stock - $q where id = $id and stock >= $q` for each line; if any update hits 0 rows → rollback, return 409 "sold out" with which size.
   - Insert `orders` (status `pending`, `expires_at = now() + 30 min`) + `order_items` with server prices.
3. Create Stripe Checkout session: `mode=payment`, `currency=aud`, line items from DB prices, `allow_promotion_codes=true`, `shipping_address_collection={allowed_countries:['AU']}`, shipping option chosen server-side (free if subtotal ≥ A$150 else flat rate), `expires_at` = 30 min, `metadata.order_id`. Save `stripe_session_id`.
4. Redirect the browser to `session.url`. Success page `/order/success?session_id=…` reads the order; cancel returns to cart.
5. Webhook (verify signature with `STRIPE_WEBHOOK_SECRET`; make every handler idempotent by checking current status):
   - `checkout.session.completed` → status `paid`, store totals/discount/address from the session, send confirmation email.
   - `checkout.session.expired` → if still `pending`: return reserved stock, status `cancelled`.
   - `charge.refunded` → status `refunded` (stock is not auto-restored; restock by hand).
6. Fulfilment v1: owner marks orders `fulfilled` + enters tracking in Supabase; a DB webhook or a tiny `/api/admin/fulfil` sends the shipping email. (Manual is fine at launch volume.)

Why reserve at step 2 instead of decrementing on payment: drops are limited and sell fast; decrement-on-payment oversells and then needs refunds.

### B6. Auth

Supabase Auth with email magic link (no passwords to store or reset). Guest checkout stays the default; login only adds order history and reviews. If week 2 runs late, **remove the Login page for v1** rather than ship the fake one.

### B7. Security checklist

- Stripe webhook signature verified; raw body used for verification.
- Service-role key and Stripe secret only in Vercel env vars (server). Only the Supabase anon key + publishable Stripe key reach the browser.
- RLS on every table, default deny.
- `zod` validation on every request body; length caps on free text.
- Rate-limit / bot-protect `/api/contact`, `/api/subscribe`, `/api/checkout` (Vercel WAF rate-limit rule, or Cloudflare Turnstile on the two forms).
- No HTML from users rendered unescaped (reviews, names).
- CORS: same origin only.

### B8. Compliance notes (Australia — confirm with a professional)

- **Australian Consumer Law**: no fabricated reviews; refund policy must not exclude statutory guarantees for faulty goods; sale prices must be genuine (a "was" price that was actually charged).
- **Spam Act 2003**: marketing email needs consent (record it — `subscribers.consented_at`) and a working unsubscribe.
- **Privacy**: publish a real privacy policy saying what is collected (email, address, orders) and which processors get it (Stripe, Supabase, Resend, Vercel).
- **GST**: prices are GST-inclusive; register for GST once turnover reaches A$75k. Stripe receipts can show ABN once you have one.

### B9. Environment variables

```
SUPABASE_URL, SUPABASE_ANON_KEY (public), SUPABASE_SERVICE_ROLE_KEY (server)
STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, VITE_STRIPE_PUBLISHABLE_KEY (only if Stripe.js is used)
RESEND_API_KEY, SUPPORT_EMAIL, PUBLIC_SITE_URL
```

### B10. Frontend changes to plug in the backend

| File | Change |
|---|---|
| `src/data/products.ts` | Keep the `Product` type (add `variants: {id,size,stock}[]`), delete the array. Keep `SIZE_CHART` (it's our data). |
| new `src/api.ts` | ~30 lines of `fetch` helpers. No client library needed. |
| `CartContext.tsx` | Load products from API; cart stores `variantId`; drop unknown ids instead of falling back to `PRODUCTS[0]`; fix the mutation bug; remove hard-coded threshold (read from config/API). |
| `CartDrawer.tsx` | Delete promo-code form (Stripe handles it); checkout button → `POST /api/checkout` → `location.href = url`. |
| `DropPage.tsx` | Countdown from `/api/drops/current`; waitlist → `/api/subscribe` with a consent checkbox. |
| `PoliciesPage.tsx` | Contact → `/api/contact`; reviews from DB (or hide page); real Terms text; login via Supabase or removed. |
| `App.tsx` | Add `/order/success`, `/account`, 404. |
| new `vercel.json` | SPA rewrite (A3.1). |
| `ProductCard`, `ProductDetailPage`, `QuickViewModal` | Show per-size sold-out state from `variants.stock`. |
