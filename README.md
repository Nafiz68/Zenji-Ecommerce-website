# Storefront

Frontend for an Australian online store selling original graphic tees. Brand name, contact email and social links live in `src/brand.ts` (currently placeholders).

Planning docs are in [`docs/`](docs/): audit and backend design, rebrand plan, 3-week delivery plan.

## Stack

React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Lenis (smooth scroll), Lucide icons.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the build at http://localhost:4173
```

## Status

Products, images, reviews, checkout and login are placeholders until the backend described in `docs/01-audit-and-backend-design.md` is built.
