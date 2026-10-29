# 02 — Rebrand Plan (removing everything copied from ZENJI)

Status: draft, 2026-10-30. Not legal advice — book a one-hour consult with an Australian IP lawyer before launch; it is cheap next to a takedown or a demand letter.

## The rule we follow

Copyright and trademark protect **expression and identity**, not **function**. A cart drawer, a size guide, a countdown, a product grid and a quick-view modal are ordinary e-commerce features anyone may build. What we may not reuse is what makes the site recognisably ZENJI's: name, logo, photos, written copy, product names/designs, social accounts, and the overall look-and-feel (trade dress). Copying the identity also risks "passing off" and misleading-conduct claims under the Australian Consumer Law, not just copyright.

So the plan is: **keep the code and the features, replace every asset, every word and the visual identity.**

## What is copied today (found in the code)

| # | Item | Where | Risk | Action |
|---|---|---|---|---|
| 1 | Brand name **ZENJI** (135 occurrences in 17 files) | everywhere, `package.json`, `index.html`, localStorage key `zenji_cart` | Trademark / passing off | New name. Put it in one constant `src/brand.ts` and replace all 135 uses. |
| 2 | **ZJ monogram logo** `public/wm_logo.webp` (also the favicon) | Navbar, favicon | Copyright + trademark | New logo from a designer, or self-made. |
| 3 | **Product photos** — 50 images hot-linked from `res.cloudinary.com/diqbikizp/.../zenji/products/` + 3 hero backgrounds in `HomePage.tsx` / `DropPage.tsx` | `products.ts`, pages | Copyright (photographer/brand) | Delete every URL. Shoot our own product photos; upload to our own Cloudinary. |
| 4 | **Product names & descriptions** (Blue Flame, Demon Blood, Bushido, …) | `products.ts` | Copyright on text, brand identity | Our own products, our own names, our own descriptions. |
| 5 | **Anime-franchise terms** — "Domain Expansion", "Limitless" (Jujutsu Kaisen), "Water Breathing", "Will of the Sun" (Demon Slayer) | product names | Trademark/copyright of the anime publishers — a risk even for ZENJI | Do not use franchise terms or characters. Original artwork only. |
| 6 | **Social links** `@zenji_.shop` TikTok/Instagram, ZENJI Facebook page | `Footer.tsx` (×2 each) | Points customers to another business | Replace with our accounts (or hide until created). |
| 7 | **Email** `support@zenji.shop` | Contact, Returns pages | Sends customers to another business | Our domain email. |
| 8 | **All marketing copy** — Our Story ("founded in 2024"), FAQ, marquee, splash text, drop names "The Origin Drop" / "Awakening", "No restocks. Ever." slogan, toasts ("SECTOR DROP", "operative", "Cyber-Ronin") | pages, components | Copyright on text, brand voice | Rewrite in our own voice. Don't paraphrase line by line — write from scratch. |
| 9 | **Policies text** (returns, privacy, terms) | `PoliciesPage.tsx` | Copied legal text, and partly non-compliant | Write our own from a lawyer/generator template (see doc 01, B8). |
| 10 | **Fake reviews** with names and cities | `PoliciesPage.tsx` | Illegal under ACL regardless of copying | Delete. Real reviews only (doc 01 `reviews` table). |
| 11 | **Promo codes** `ZENJI10`, `AWAKENING15`, `ORIGIN15` | `CartDrawer.tsx` | Brand reference | Removed anyway — codes move to Stripe. |
| 12 | **SEO meta** "Anime Streetwear Australia — ZENJI", keyword list | `index.html` | Brand reference | New title/description/keywords. |
| 13 | **Signature visual identity** — black/white with `#BC0100` red, Anton headlines + mono body, katana cursor with blade trail, splash "awakening" intro, marquee ticker | `tailwind.config.js`, `index.css`, `KatanaCursor.tsx`, `SplashIntro.tsx` | Trade dress (if these copy the original site) | Change — see below. Ask the friend which of these were taken from the original site; keep only what they invented. |
| 14 | README says "fictional brand"; live demo at `zenji-ecommerce-website.vercel.app` | `README.md`, Vercel | It isn't fictional; the public demo carries their brand | Take the demo down (or password-protect it) now, before anything else. |

## Visual redesign (keeps every feature, changes the look)

Aim: someone who knows ZENJI's site should not recognise ours.

1. **Palette** — new primary + accent. Drop the `#BC0100` red on black/white. Define it once in `tailwind.config.js` as `brand.*` tokens and replace the 155 hard-coded `#BC0100` / `rgba(188,1,0,…)` uses across 19 files (a find-and-replace to `brand-accent`).
2. **Typography** — new headline + body pair (Google Fonts are free to use commercially; the issue is only looking the same). Remove the five-font load in `index.html`; two families are enough.
3. **Home page structure** — reorder and re-shape sections (e.g. hero → featured drop → category grid → lookbook strip → story → newsletter), different hero composition, different card style (rounded vs sharp, shadow vs border, etc.).
4. **Signature interactions** — replace the katana cursor and "awakening" splash with our own idea, or remove them. (They also hurt accessibility and load time; the native cursor is the lazy, safe default.) Respect `prefers-reduced-motion`.
5. **Product card / PDP layout** — new image ratio, badge style, button style, info order.
6. **Microcopy voice** — retire the "sector / operative / transmission / crate" vocabulary; pick our own tone.
7. **Logo & favicon** — new, with an SVG source file we own.

## Ownership hygiene

- Keep receipts/briefs for every asset (designer contract assigning copyright to the business, photographer release, model release for on-model shots).
- Check the new name on **IP Australia** (trade mark search), domain availability, and Instagram/TikTok handles before committing. Consider filing a trade mark for the name + logo (class 25 clothing, class 35 online retail).
- Use only licensed fonts/icons (Google Fonts + Lucide are fine).
- After the rebrand, run `grep -ri zenji` and search for `cloudinary.com/diqbikizp` — both must return nothing.

## Definition of done

- [ ] Zero matches for `zenji` (case-insensitive) and `diqbikizp` across repo and deployed site.
- [ ] Every image is ours, stored in our Cloudinary.
- [ ] Every sentence of copy written by us; policies reviewed.
- [ ] New palette, fonts, logo, home layout, cursor/intro replaced or removed.
- [ ] No anime-franchise names or characters on products or pages.
- [ ] Old Vercel demo taken down.
- [ ] Lawyer consult done (name + overall look-and-feel).
