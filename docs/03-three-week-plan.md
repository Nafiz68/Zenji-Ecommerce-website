# 03 — 3-Week Delivery Plan

Status: draft, 2026-10-30. Assumes 2 people (A = backend/payments, B = frontend/rebrand) working most days. With one person, cut the "stretch" items and expect the end of week 3 to slip.

Reads with: `01-audit-and-backend-design.md` (what to build) and `02-rebrand-plan.md` (what to replace).

## Blockers to start on day 1 (they take calendar time, not coding time)

These have the longest lead time. If any one isn't ready by day 15, launch slips no matter how fast the code goes.

| Item | Owner | Needed by |
|---|---|---|
| New brand name chosen + IP Australia search + domain + social handles | both | Day 3 |
| Logo + palette + fonts (designer or self-made) | B | Day 7 |
| **Real products and product photos** (stock, supplier or print-on-demand, photoshoot) | both | Day 12 |
| ABN, business bank account, **Stripe account verified** (can take days) | owner | Day 10 |
| Lawyer consult (name, look, policies) | owner | Day 14 |
| Vercel **Pro** plan — the Hobby plan does not allow commercial use (Cloudflare Pages is a free alternative) | A | Day 15 |
| Take down / password-protect the old `zenji-ecommerce-website.vercel.app` demo | owner | **Day 1** |

## Week 1 — Foundations (days 1–5)

**Goal:** new identity decided, backend skeleton live in staging, no ZENJI material left in the repo.

| Day | A — Backend | B — Frontend / Rebrand |
|---|---|---|
| 1 | Create Supabase project (staging), Stripe **test** account, Resend, own Cloudinary. Add env vars to Vercel. | Take old demo down. Add `src/brand.ts`; replace all 135 `ZENJI` uses with it. Remove `gsap`. Add `vercel.json` SPA rewrite. |
| 2 | Write SQL migration (doc 01 §B3) + RLS policies. Seed with placeholder products. | Remove all `diqbikizp` image URLs → neutral placeholders. Delete fake reviews, fake promo codes, ZENJI socials/email. |
| 3 | `GET /api/products`, `/api/products/:slug`, `/api/drops/current`. | Tailwind `brand.*` tokens; replace the 155 hard-coded red values; new fonts. |
| 4 | `src/api.ts` fetch helpers; product pages read from API. | Remove/replace katana cursor + splash; add `prefers-reduced-motion`. Fix bugs A3.2–A3.6 from doc 01. |
| 5 | **Review + demo on staging.** Fix whatever broke. | New home layout wireframe agreed. |

Exit check: `grep -ri zenji` and `grep -r diqbikizp` return nothing; staging shows products from the DB.

## Week 2 — Money and forms (days 6–10)

**Goal:** a test-mode customer can browse, pay, get an email, and stock goes down.

| Day | A — Backend | B — Frontend / Rebrand |
|---|---|---|
| 6 | `POST /api/checkout` with stock reservation (doc 01 §B5). | Build new home layout. |
| 7 | Stripe webhook: `completed`, `expired`, `refunded`; idempotent; signature check. | New product card + product detail layout; per-size sold-out state. |
| 8 | Order confirmation email (Resend). `/api/subscribe`, `/api/contact` with validation + rate limit. | Cart drawer → real checkout redirect; success + cancel pages; 404 page. |
| 9 | Supabase magic-link auth + `GET /api/orders` (**or** decide to drop login for v1). | Drop page: real countdown + waitlist with consent checkbox. Contact form wired. |
| 10 | **End-to-end test in Stripe test mode**: pay, decline, abandon (session expiry returns stock), promo code, free-shipping threshold, two buyers racing for the last item. | Rewrite all copy in the new voice (Our Story, FAQ, marquee, toasts, microcopy). |

Exit check: the five test scenarios on day 10 pass on staging.

## Week 3 — Content, compliance, launch (days 11–15)

**Goal:** live with real products and real payments.

| Day | A — Backend | B — Frontend / Rebrand |
|---|---|---|
| 11 | Production Supabase + Stripe **live** keys + webhook endpoint; production env vars. | Load real products, sizes, stock, prices and our photos. |
| 12 | Backups on (Supabase), error logging (Vercel logs / Sentry free tier), uptime check. | Policies (returns, privacy, terms, shipping) — our own text, ACL-compliant. Per-page `<title>`/meta, OG image, `sitemap.xml`, `robots.txt`. |
| 13 | Security pass: RLS review, secrets only server-side, webhook verified, rate limits on. | Accessibility + mobile pass; Lighthouse ≥ 90 on mobile for Home and PDP. |
| 14 | **Live smoke test:** one real purchase with a real card, then refund it. | Final rebrand checklist (doc 02 "Definition of done"). Lawyer feedback applied. |
| 15 | **Launch:** domain DNS → Vercel, HTTPS, Stripe live. Watch logs. | Launch announcement on our socials. |

## Cut list (in this order, if behind schedule)

1. Customer accounts / login → guest checkout only (Stripe emails receipts).
2. Reviews → hide the page until real orders exist.
3. Lookbook page → reuse product images, no new layout.
4. Custom cursor / intro animation → native cursor, no splash.
5. Admin tooling → Supabase table editor + Stripe dashboard is enough.

Never cut: webhook signature check, server-side pricing, stock reservation, real policies, removal of every ZENJI asset.

## After launch (week 4+, not in scope)

Small admin page for orders/fulfilment, shipping labels (Australia Post / Shippit), abandoned-cart email, real reviews collection email, analytics.
