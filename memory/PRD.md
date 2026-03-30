# TaxNext.in — Product Requirements Document

## Original Problem Statement
Build a premium Indian tax, GST, and business compliance website for the brand **TaxNext.in**, operated by **VNAV Associates**, founded by **CA. V.V.N.Prasad. Gupta**. Target users: salaried individuals, NRIs, freelancers, SMEs, startup founders.

Create a complete app shell, global navigation, footer, routing structure, and a reusable design foundation. The application is **purely frontend/static** for now.

---

## Brand Essentials
- **Brand promise:** "Your compliance, handled properly."
- **Firm:** VNAV Associates
- **Founder:** CA. V.V.N.Prasad. Gupta (ICAI member, 10+ years in practice)
- **Accent colour:** Deep Forest Green `#1A4D2E`
- **Tone:** Grounded, professional, CA-firm voice. No startup hype. No AI-heavy language.

---

## Tech Stack
- React 18, React Router DOM
- Tailwind CSS
- Lucide React (icons)
- Purely static/frontend — no backend or DB

---

## Architecture
```
/app/frontend/src/
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── Layout.js
│   ├── PageShell.js
│   └── MobileBottomCTA.js
├── pages/
│   ├── Home.js            ✅ Complete
│   ├── Services.js        ✅ Complete (rebuilt)
│   ├── About.js           🔲 Shell only
│   ├── Calculators.js     🔲 Shell only
│   ├── Insights.js        🔲 Shell only
│   ├── ComplianceCalendar.js  🔲 Shell only
│   ├── Resources.js       🔲 Shell only
│   ├── Contact.js         🔲 Shell only
│   ├── AITaxAssistant.js  🔲 Coming soon
│   └── ClientPortal.js    🔲 Coming soon
├── App.js
└── index.css
/app/memory/
├── PRD.md
├── brand_strategy.md
└── test_credentials.md
```

---

## Completed Work

### Session 1 (Initial build)
- Complete React frontend project setup with Tailwind configuration
- Global components: Header (with Services dropdown), Footer, Layout, PageShell, MobileBottomCTA
- Routing for 10 pages
- Full Home page: Hero, Trust Strip, Service Pathways, Why TaxNext, How It Works, Founder, Calculator Teaser, Insights Teaser, Testimonials, FAQ Accordion, Final CTA
- Design guidelines and brand strategy documents

### Session 2 (Tone refinement + Services page)
- **P0 DONE:** Home.js tone refinement completed across all sections
  - Final CTA updated: "Let's get your compliance in order." / "Book a Free Consultation" / "No commitment required · We respond within 24 hours"
- **P1 DONE:** Services page completely rebuilt (2026-03-29)
  - 4 service categories: Individual Taxation, GST & Indirect Tax, Business Compliance, Virtual CFO
  - Sticky category navigation with smooth-scroll anchors
  - 6 service cards per section (24 total)
  - Per-section CTAs after each category
  - Final dark-green CTA block

### Session 3 (Complete Design System — 2026-03-29)
- **DONE:** Complete design system defined and implemented
  - Typography: Playfair Display (heading) + Inter (body/UI) — Google Fonts imported
  - Full token set in `/app/frontend/src/index.css` — light mode + dark mode CSS custom properties
  - Tailwind config extended with `forest`, `surface`, `ink` colour sets, custom shadows, radius tokens
  - Form utility classes: `.form-input`, `.form-label`, `.form-helper`, `.btn-generous`
  - Global focus states, smooth scroll, elegant scrollbar
  - Full documentation in `/app/memory/design_system.md` (15 sections, 400+ lines)
    - Typography scale (11 levels), colour palette (both modes), spacing (8px grid)
    - All 5 button variants with full state table, input states, card patterns
    - Table, badge, nav, accordion, testimonial, CTA band, trust strip component rules
    - Motion rules, focus state standards, 18-point anti-pattern list

### Session 4 (All 7 Pages Built — 2026-03-29)
- **DONE:** About page — Hero, About TaxNext (2-col with stats), Founder (photo + bio + quote + creds), Why TaxNext (4 cards), How We Work (3-step), CTA
- **DONE:** Contact page — Custom hero, WhatsApp CTA strip, 5-field form, "What happens next" sidebar, success state
- **DONE:** Calculators page — 4 category tabs (Income Tax, GST, Financial Planning, Business), 11 calculator cards with links
- **DONE:** CalculatorDetail page — `/calculators/:id` route, static form template per calculator, sidebar CTA, disclaimer
- **DONE:** Insights page — 9 articles, 8 category filter tags (working useState filter), newsletter CTA
- **DONE:** Compliance Calendar — 9 months (Apr 2025–Mar 2026), working category filter (GST/TDS/Tax/ROC), table layout
- **DONE:** Resources page — 8 download cards, 4 category filter tabs (working), 8 government portal links
- App.js updated with `calculators/:id` route

### Session 5 (Remaining Pages — 2026-03-30)
- **DONE:** InsightDetail (`/insights/:slug`) — Full reading layout, complete Budget 2025 article with tax slab table, ToC sidebar, related articles; coming-soon for other slugs
- **DONE:** NotFound (404) — Large serif number, 4 helpful nav links, catches `/*` route
- **DONE:** NoticeHandling (`/notice-handling`) — High-conversion: urgency badge, risk table, 4 notice type cards, 3-step process, FAQ accordion
- **DONE:** AITaxAssistant (`/ai-tax-assistant`) — Rebuilt: premium hero, 4 feature cards, CA oversight framing, notify form
- **DONE:** ClientPortal (`/client-portal`) — Rebuilt: portal wireframe teaser, 4 feature cards, client/non-client CTAs
- Insights.js updated: article cards have slugs, link to `/insights/:slug`, Budget card shows "Full article" badge
- App.js: added `insights/:slug`, `notice-handling`, `*` routes

### Session 7 (Quality & Polish Pass — Feb 2026)
- **DONE:** FAQ accordion animation — smooth `max-height + opacity` CSS transition on Home.js and NoticeHandling.js (was hard open/close)
- **DONE:** Breadcrumb accessibility on all 10 pages — `aria-label="Breadcrumb"`, `aria-current="page"`, `aria-hidden="true"` on separator chevrons
- **DONE:** Filter button tap targets — `py-2` minimum across ComplianceCalendar, Insights, Resources
- **DONE:** Footer social links — `w-10 h-10` (40px) + `focus-visible:ring-2 ring-white ring-offset-[#1C201E]`
- **DONE:** Footer bottom bar contrast — `text-[#7a8c82]` (improved from #4E5A54 on dark bg)
- **DONE:** Footer link items — `py-0.5` spacing for better tap area, `shrink-0` on icons
- **DONE:** Header — `aria-expanded` on hamburger, `aria-label` on close btn, mobile submenu `py-2.5`, `focus-visible:` on all header buttons
- **DONE:** `focus:ring-2` → `focus-visible:ring-2` on all non-form-field interactive elements (Home CTA, Contact submit, Header logo, MobileBottomCTA buttons)
- **DONE:** Resources download button — `py-1.5` for better tap area, `focus-visible:ring-2`
- **DONE:** Contact select — `cursor-pointer` added

---
- **DONE:** Sticky "Share Your Notice" button on `/notice-handling`
  - Scroll-triggered (appears after 420px scroll)
  - Mobile-safe: `bottom-[5.25rem]` clears `MobileBottomCTA` (fixed at bottom-0)
  - Desktop: fixed `bottom-8 right-8`, pill-shaped, forest green
  - Smooth opacity + translate-y entrance animation
- **DONE:** 3 new full articles in `InsightDetail.js`:
  - `gst-compliance-checklist-2025` — GST returns (GSTR-1/3B), QRMP scheme, ITC reconciliation, GSTR-9, action table
  - `nri-itr-filing-guide` — Residential status determination, who must file, ITR forms, DTAA/Form 10F, deadlines
  - `save-tax-deductions-2024-25` — 80C instruments, 80D health insurance, HRA calculation example, 80CCD/24/80E/80TTA, old-vs-new comparison
- `Insights.js` updated: hasFull=true for all 4 articles (Budget 2025, GST, NRI, Tax Planning)
- All articles include TOC sidebar, CA quote blockquotes, data tables, warning callouts

---

## P0 — Active / Immediate

None. All pages complete.

---

## P1 — Future Enhancements

1. **Real contact form backend** — Email delivery on submission (currently client-side only)
2. **Calculator computation logic** — Live tax math for Income Tax, HRA, Capital Gains, GST calculators
3. **Dark mode toggle** — CSS tokens defined; only a ThemeToggle component needed
4. **More full articles** — 5 remaining Insights articles still show "coming soon" (startup-compliance-calendar, gst-input-tax-credit-explained, new-vs-old-tax-regime-comparison, tds-guide-2024-25, nri-banking-fema-nro-nre)

---

## P2 — Future / Backlog

- Backend API + MongoDB (deferred by user — purely static for now)
- Functional calculators (live computation logic)
- AI Tax Assistant page (shell exists at /ai-assistant)
- Client Portal (shell exists at /client-portal)
- Notice Handling dedicated landing page
- Contact form backend (email delivery)
- WhatsApp chat integration

---

## Known Constraints
- User explicitly requested **purely frontend/static** — do not add backend until explicitly asked
- No AI/ML language in copy ("smart", "AI-powered" etc. are banned per brand strategy)
- Phone numbers and email are placeholders (`+91 00000 00000`, `info@taxnext.in`) — user to replace with real details
