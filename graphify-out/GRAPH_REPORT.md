# Graph Report - zenji-business  (2026-10-30)

## Corpus Check
- Corpus is ~17,870 words - fits in a single context window. You may not need a graph.

## Summary
- 166 nodes · 319 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.81)
- Token cost: 137,834 input · 0 output

## Community Hubs (Navigation)
- App Shell & Motion UI
- Package Dependencies
- HTML Entry & Docs
- Cart & Product Data
- Navbar, Drawers & Modals
- TypeScript Config
- Dev Dependencies
- Home Page Scroll Stack
- ZJ Logo Brand Mark

## God Nodes (most connected - your core abstractions)
1. `react` - 24 edges
2. `useCart()` - 21 edges
3. `AppContent()` - 20 edges
4. `compilerOptions` - 16 edges
5. `lucide-react` - 12 edges
6. `ProductCard()` - 10 edges
7. `Product` - 9 edges
8. `Technologies Used` - 9 edges
9. `index.html (SPA entry document)` - 8 edges
10. `PRODUCTS` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Navbar()` --references--> `wm_logo.webp (Zenji ZJ monogram logo)`  [AMBIGUOUS]
  Zenji-Ecommerce-website/src/components/Navbar.tsx → Zenji-Ecommerce-website/public/wm_logo.webp
- `Material Symbols Outlined` --semantically_similar_to--> `Lucide React`  [INFERRED] [semantically similar]
  Zenji-Ecommerce-website/index.html → Zenji-Ecommerce-website/README.md
- `AppContent()` --calls--> `CartDrawer()`  [EXTRACTED]
  Zenji-Ecommerce-website/src/App.tsx → Zenji-Ecommerce-website/src/components/CartDrawer.tsx
- `AppContent()` --calls--> `Navbar()`  [EXTRACTED]
  Zenji-Ecommerce-website/src/App.tsx → Zenji-Ecommerce-website/src/components/Navbar.tsx
- `AppContent()` --calls--> `QuickViewModal()`  [EXTRACTED]
  Zenji-Ecommerce-website/src/App.tsx → Zenji-Ecommerce-website/src/components/QuickViewModal.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Animation and motion stack** — zenji_ecommerce_website_readme_framer_motion, zenji_ecommerce_website_readme_gsap, zenji_ecommerce_website_readme_lenis [INFERRED 0.85]
- **Vite build lifecycle (dev, build, preview)** — zenji_ecommerce_website_readme_development_server, zenji_ecommerce_website_readme_production_build, zenji_ecommerce_website_readme_preview_build, zenji_ecommerce_website_readme_vite [EXTRACTED 1.00]

## Communities (11 total, 2 thin omitted)

### Community 0 - "App Shell & Motion UI"
Cohesion: 0.12
Nodes (22): framer-motion, lenis, react, App(), AppContent(), Footer(), FooterProps, KatanaCursor() (+14 more)

### Community 1 - "Package Dependencies"
Cohesion: 0.08
Nodes (24): autoprefixer, gsap, postcss, tailwindcss, @types/react, @types/react-dom, typescript, vite (+16 more)

### Community 2 - "HTML Entry & Docs"
Cohesion: 0.10
Nodes (23): react-dom, Dark Theme (black bg, #BC0100 selection accent), Favicon wm_logo.webp, Google Fonts (Anton, Archivo, IBM Plex Mono, JetBrains Mono, Space Mono), index.html (SPA entry document), Material Symbols Outlined, #root mount element, SEO Metadata (Anime Streetwear Australia) (+15 more)

### Community 3 - "Cart & Product Data"
Cohesion: 0.19
Nodes (16): ProductCard(), ProductCardProps, SearchModalProps, CartContext, CartContextType, CartItem, ToastMessage, Product (+8 more)

### Community 4 - "Navbar, Drawers & Modals"
Cohesion: 0.17
Nodes (13): lucide-react, CartDrawer(), CartDrawerProps, Navbar(), NavbarProps, QuickViewModal(), QuickViewModalProps, SizeGuideModal() (+5 more)

### Community 5 - "TypeScript Config"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 6 - "Dev Dependencies"
Cohesion: 0.22
Nodes (9): devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, typescript, vite (+1 more)

### Community 7 - "Home Page Scroll Stack"
Cohesion: 0.39
Nodes (6): ScrollStack(), ScrollStackItem(), ScrollStackItemProps, ScrollStackProps, HomePage(), HomePageProps

### Community 8 - "ZJ Logo Brand Mark"
Cohesion: 0.50
Nodes (4): wm_logo.webp (Zenji ZJ monogram logo), Sharp angular blade-like stroke style, White/light mark for dark backgrounds (watermark variant), ZJ monogram symbol (interlocked Z and J)

## Ambiguous Edges - Review These
- `Navbar()` → `wm_logo.webp (Zenji ZJ monogram logo)`  [AMBIGUOUS]
  Zenji-Ecommerce-website/public/wm_logo.webp · relation: references

## Knowledge Gaps
- **15 isolated node(s):** `gsap`, `@types/react`, `@types/react-dom`, `autoprefixer`, `postcss` (+10 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 76 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App Shell & Motion UI` to `Package Dependencies`, `HTML Entry & Docs`, `Cart & Product Data`, `Navbar, Drawers & Modals`, `Home Page Scroll Stack`?**
  _High betweenness centrality (0.262) - this node is a cross-community bridge._
- **What connects `gsap`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _15 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Shell & Motion UI` be split into smaller, more focused modules?**
  _Cohesion score 0.11827956989247312 - nodes in this community are weakly interconnected._
- **Should `Package Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `HTML Entry & Docs` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Navbar()` and `wm_logo.webp (Zenji ZJ monogram logo)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._