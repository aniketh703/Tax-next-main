# TaxNext.in — Complete Design System
**Version 1.0 · VNAV Associates · Feb 2026**

> A premium financial-services UI system. Serious, modern, readable, trustworthy.
> "Your compliance, handled properly."

---

## 1. Principles

| Principle | Application |
|---|---|
| **Authority** | Serif headings, strong text contrast, generous whitespace |
| **Legibility** | Inter at 16px base, 1.6–1.75 line height, no colour-as-only-differentiator |
| **Restraint** | Accent colour used sparingly; no gradients, neon, or animation overload |
| **Consistency** | 8px spacing grid, 4-step radius scale, named semantic tokens throughout |
| **Accessibility** | AA contrast minimum, visible focus rings, keyboard-navigable all components |

---

## 2. Typography

### 2.1 Font Pairing

| Role | Family | Weights | Import |
|---|---|---|---|
| **Display / Heading** | Playfair Display (Serif) | 400, 600, 700, Italic 400 | Google Fonts |
| **Body / UI** | Inter (Sans-serif) | 400, 500, 600 | Google Fonts |

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
```

**Rationale:** Playfair Display carries editorial authority — the same visual weight seen in financial publications (FT, Bloomberg, The Economist). Inter is the benchmark for UI legibility: neutral, rational, excellent at small sizes.

### 2.2 Type Scale

| Token | Tailwind class | Size | Weight | Line-height | Use |
|---|---|---|---|---|---|
| `display` | `text-5xl lg:text-6xl font-semibold` | 48–60px | 600 | 1.05 | Hero H1 |
| `h1` | `text-4xl sm:text-5xl font-semibold tracking-tight` | 36–48px | 600 | 1.1 | Page title |
| `h2` | `text-[1.875rem] sm:text-[2.25rem] font-medium tracking-tight` | 30–36px | 500 | 1.2 | Section heading |
| `h3` | `text-xl sm:text-2xl font-medium tracking-tight` | 20–24px | 500 | 1.3 | Card/block heading |
| `h4` | `text-lg font-medium` | 18px | 500 | 1.4 | Sub-section label |
| `body-lg` | `text-[1.0625rem] leading-[1.75]` | 17px | 400 | 1.75 | Hero subheading, about text |
| `body` | `text-base leading-relaxed` | 16px | 400 | 1.625 | Standard prose |
| `body-sm` | `text-[0.9375rem] leading-relaxed` | 15px | 400 | 1.625 | Card desc, secondary copy |
| `caption` | `text-sm` | 14px | 400 | 1.5 | Meta, dates, helper |
| `label` | `text-sm font-medium` | 14px | 500 | 1.4 | Form labels, button text |
| `eyebrow` | `text-[11px] uppercase tracking-[0.14em] font-semibold` | 11px | 600 | 1.4 | Section category labels |
| `helper` | `text-xs` | 12px | 400 | 1.5 | Form helper, fine print |
| `micro` | `text-[0.6875rem]` | 11px | 400 | 1.4 | Badges, article tags |

**Rules:**
- All headings (H1–H6) use `font-heading` (Playfair Display)
- All body, labels, buttons, inputs use `font-body` (Inter)
- Never use decorative fonts below 14px
- Maximum line length (measure): 65–72 characters for prose, 45 for narrow columns

### 2.3 Font Application in Tailwind

```jsx
// Section heading
<h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] tracking-tight text-[#1C201E]">

// Body paragraph
<p className="font-body text-[0.9375rem] text-[#4E5A54] leading-[1.75]">

// Eyebrow label
<span className="font-body text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E]">

// Form label
<label className="font-body text-sm font-medium text-[#1C201E] block mb-1.5">
```

---

## 3. Colour System

### 3.1 Named Semantic Tokens

All colours are defined as CSS custom properties on `:root` (light) and `.dark` (dark mode). Tailwind classes reference these via `hsl(var(--token))`.

### 3.2 Light Mode Palette

| Token | CSS Variable | Hex Equivalent | Use |
|---|---|---|---|
| `--background` | `hsl(60 17% 98%)` | `#FBFBF9` | Page background |
| `--foreground` | `hsl(150 7% 11%)` | `#1C201E` | Primary text |
| `--card` | `hsl(0 0% 100%)` | `#FFFFFF` | Card surface |
| `--card-foreground` | same as foreground | `#1C201E` | Card text |
| `--primary` | `hsl(143 49% 20%)` | `#1A4D2E` | Brand green — buttons, links, accents |
| `--primary-foreground` | `hsl(0 0% 100%)` | `#FFFFFF` | Text on primary green |
| `--secondary` | `hsl(144 18% 95%)` | `#F2F5F3` | Section backgrounds, muted surfaces |
| `--secondary-foreground` | `hsl(143 49% 20%)` | `#1A4D2E` | Text/icons on secondary |
| `--muted` | `hsl(144 18% 95%)` | `#F2F5F3` | Subdued backgrounds |
| `--muted-foreground` | `hsl(150 7% 33%)` | `#4E5A54` | Secondary/muted text |
| `--border` | `hsl(144 14% 91%)` | `#E8EDE9` | All borders |
| `--input` | same as border | `#E8EDE9` | Input field border |
| `--ring` | `hsl(143 49% 20%)` | `#1A4D2E` | Focus ring colour |
| `--destructive` | `hsl(0 84% 60%)` | `#F03A3A` | Error states |
| `--destructive-foreground` | `hsl(0 0% 100%)` | `#FFFFFF` | Text on destructive |
| `--radius` | `0.5rem` | `8px` | Base border radius |

**Additional named hex constants (for direct use in Tailwind):**

| Name | Value | Use |
|---|---|---|
| Forest green | `#1A4D2E` | Primary brand colour |
| Forest hover | `#133b23` | Primary button hover state |
| Forest light | `#e8eee9` | Icon backgrounds, subtle tints |
| Forest faint | `#1A4D2E/[0.04]` | Highlighted card backgrounds |
| Ink dark | `#1C201E` | Body, headings |
| Ink secondary | `#4E5A54` | Secondary text, descriptions |
| Ink tertiary | `#8A9490` | Placeholders, disabled |
| Surface base | `#FBFBF9` | Page BG |
| Surface muted | `#F2F5F3` | Alternate section BG |
| Surface paper | `#FFFFFF` | Cards |
| Border default | `#E8EDE9` | All borders |
| Border strong | `#D4DAD6` | Pressed/active borders |

### 3.3 Dark Mode Palette

| Token | Value | Use |
|---|---|---|
| `--background` | `hsl(150 7% 8%)` | Page background (~`#121412`) |
| `--foreground` | `hsl(144 18% 95%)` | Primary text (`#F2F5F3`) |
| `--card` | `hsl(150 7% 12%)` | Card surface |
| `--primary` | `hsl(143 35% 55%)` | Soft green — still readable on dark |
| `--primary-foreground` | `hsl(150 7% 8%)` | Dark text on green button |
| `--secondary` | `hsl(150 7% 18%)` | Muted surfaces |
| `--muted-foreground` | `hsl(144 14% 70%)` | Secondary text, readable on dark |
| `--border` | `hsl(150 7% 20%)` | Subtle borders |
| `--ring` | `hsl(143 35% 55%)` | Focus ring — same as primary |

### 3.4 Feedback / Status Colours

| State | Background | Text | Border | Tailwind example |
|---|---|---|---|---|
| **Error** | `#FEF2F2` | `#991B1B` | `#FECACA` | `bg-red-50 text-red-800 border-red-200` |
| **Warning** | `#FFFBEB` | `#92400E` | `#FDE68A` | `bg-amber-50 text-amber-800 border-amber-200` |
| **Success** | `#F0FDF4` | `#166534` | `#BBF7D0` | `bg-green-50 text-green-800 border-green-200` |
| **Info** | `#EFF6FF` | `#1E40AF` | `#BFDBFE` | `bg-blue-50 text-blue-800 border-blue-200` |

**Rule:** All status states use muted tones — never saturated red/green backgrounds. Text must maintain 4.5:1 contrast.

### 3.5 Accent Usage Rules

- The Forest Green (`#1A4D2E`) is the **only** accent colour.
- Use it for: active nav underlines, primary buttons, icon backgrounds (faint tint), eyebrow labels, focus rings, checkmarks, CTA sections.
- **Do not use** green as a general background for content sections. One dark-green CTA band per page maximum.
- Secondary highlights (tint backgrounds on hover cards): `#1A4D2E/[0.04]` — nearly invisible.

---

## 4. Spacing System

Based on an **8px (0.5rem) base grid**. Every space value is a multiple of 4px or 8px.

| Token | rem | px | Tailwind | Use |
|---|---|---|---|---|
| `space-1` | 0.25rem | 4px | `p-1` / `gap-1` | Tight micro-spacing |
| `space-2` | 0.5rem | 8px | `p-2` / `gap-2` | Icon gap, tag gap |
| `space-3` | 0.75rem | 12px | `p-3` / `gap-3` | Button internal padding |
| `space-4` | 1rem | 16px | `p-4` / `gap-4` | Standard gap |
| `space-5` | 1.25rem | 20px | `p-5` | Card padding (compact) |
| `space-6` | 1.5rem | 24px | `p-6` | Card padding (standard) |
| `space-7` | 1.75rem | 28px | `p-7` | Card padding (generous) |
| `space-8` | 2rem | 32px | `p-8` | Card padding (large) |
| `space-10` | 2.5rem | 40px | `p-10` | Section CTA padding |
| `space-12` | 3rem | 48px | `py-12` | Section top/bottom (compact) |
| `space-14` | 3.5rem | 56px | `py-14` | |
| `space-16` | 4rem | 64px | `py-16` | Standard section rhythm |
| `space-20` | 5rem | 80px | `py-20` | Generous section rhythm |
| `space-24` | 6rem | 96px | `py-24` | Hero/landing sections |

**Section vertical rhythm:** Alternate between `py-16` and `py-20` for content sections. Hero uses `py-12 lg:py-20`.

**Max-width containers:**
- Full-site container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Narrow prose: `max-w-2xl`
- Medium column: `max-w-3xl`

---

## 5. Border Radius

| Token | Value | Use |
|---|---|---|
| `rounded-sm` | `calc(0.5rem - 4px)` = 4px | Badges, tags, chips |
| `rounded-md` | `calc(0.5rem - 2px)` = 6px | Inputs, small buttons |
| `rounded-lg` | `0.5rem` = 8px | Primary buttons, cards (default) |
| `rounded-xl` | `0.75rem` = 12px | Feature cards, modal dialogs |
| `rounded-2xl` | `1rem` = 16px | Hero image frames, large cards |
| `rounded-full` | `9999px` | Avatars, stat badges, pills |

**Rule:** Cards use `rounded-xl`. Inputs use `rounded-lg`. Primary buttons use `rounded-lg`. Tags/badges use `rounded-full` or `rounded-sm`. Never use sharp `rounded-none` on interactive elements.

---

## 6. Shadow System

All shadows are **soft and diffused** — no hard box-shadows or coloured glows.

| Token | Value | Use |
|---|---|---|
| `shadow-none` | none | Flat cards, bordered only |
| `shadow-sm` | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | Default card elevation |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)` | Hovered cards, popovers |
| `soft` (custom) | `0 4px 20px -2px rgba(0,0,0,0.05)` | Floating badges, trust strip |
| `soft-lg` (custom) | `0 10px 30px -4px rgba(0,0,0,0.08)` | Modals, dropdowns |

**Rule:** Never use `shadow-lg` or heavier on cards. Maximum shadow is `shadow-md` on interactive cards at hover. Floating elements (dropdown, modal) use `soft-lg`.

---

## 7. Components

### 7.1 Buttons

**Height:** `h-12` (48px) on mobile · `h-10` (40px) on desktop  
**Radius:** `rounded-lg`  
**Font:** Inter, `text-sm font-medium`  
**Focus:** `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`  
**Disabled:** `opacity-50 pointer-events-none`

#### Variant Reference

| Variant | Normal | Hover | Pressed | Disabled |
|---|---|---|---|---|
| **Primary** | `bg-[#1A4D2E] text-white` | `bg-[#133b23]` | `bg-[#0f2d1a] scale-[0.99]` | `opacity-50` |
| **Secondary** | `bg-[#F2F5F3] text-[#1C201E] border border-[#E8EDE9]` | `border-[#1A4D2E] text-[#1A4D2E]` | `bg-[#E8EDE9]` | `opacity-50` |
| **Ghost** | `bg-transparent text-[#1C201E]` | `bg-[#F2F5F3] text-[#1A4D2E]` | `bg-[#E8EDE9]` | `opacity-50` |
| **Tertiary / Outline** | `bg-transparent border border-[#D4DAD6] text-[#4E5A54]` | `border-[#1A4D2E] text-[#1A4D2E]` | `bg-[#F2F5F3]` | `opacity-50` |
| **Destructive** | `bg-red-600 text-white` | `bg-red-700` | `bg-red-800` | `opacity-50` |

#### Implementation

```jsx
// Primary
<button className="inline-flex items-center justify-center gap-2 h-12 md:h-10 px-6 rounded-lg bg-[#1A4D2E] text-white font-body text-sm font-medium hover:bg-[#133b23] transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
  Book a Consultation <ArrowRight size={15} strokeWidth={1.5} />
</button>

// Secondary (outlined)
<button className="inline-flex items-center justify-center h-12 md:h-10 px-6 rounded-lg border border-[#D4DAD6] text-[#1C201E] font-body text-sm font-medium hover:border-[#1A4D2E] hover:text-[#1A4D2E] transition-colors focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-2">
  See Our Services
</button>

// Ghost (inline link-style)
<button className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1A4D2E] font-body hover:gap-2.5 transition-all focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-2 rounded">
  Learn more <ArrowRight size={14} strokeWidth={1.5} />
</button>
```

**Button sizes:**
- `sm` — `h-8 px-3 text-xs`
- `md` (default) — `h-10 px-5 text-sm`
- `lg` — `h-12 px-7 text-[0.9375rem]`

### 7.2 Form Inputs

**Full-width on mobile. Labels sit above the field.**

```jsx
// Standard text input
<div>
  <label className="block font-body text-sm font-medium text-[#1C201E] mb-1.5">
    Full Name
  </label>
  <input
    type="text"
    placeholder="e.g. Rajesh Sharma"
    className="w-full h-12 md:h-10 px-4 rounded-lg border border-[#E8EDE9] bg-white font-body text-sm text-[#1C201E] placeholder:text-[#8A9490] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-2 hover:border-[#D4DAD6]"
  />
  <span className="block font-body text-xs text-[#4E5A54] mt-1">
    As per your PAN card
  </span>
</div>
```

**Input states:**

| State | Border | Ring |
|---|---|---|
| Default | `border-[#E8EDE9]` | none |
| Hover | `border-[#D4DAD6]` | none |
| Focus | `border-[#1A4D2E]` | `ring-2 ring-[#1A4D2E] ring-offset-2` |
| Error | `border-red-400` | `ring-2 ring-red-400 ring-offset-2` |
| Disabled | `border-[#E8EDE9] bg-[#F2F5F3] opacity-60` | none |
| Success | `border-green-400` | none |

**Helper text rule:** Always present below the field. Error text replaces helper text — never both.

```jsx
// Error state
<p className="block font-body text-xs text-red-600 mt-1 flex items-center gap-1">
  <AlertCircle size={12} /> This field is required
</p>

// Success state
<p className="block font-body text-xs text-green-600 mt-1 flex items-center gap-1">
  <CheckCircle size={12} /> Looks good
</p>
```

### 7.3 Cards

```jsx
// Standard card
<div className="bg-white rounded-xl border border-[#E8EDE9] p-6 shadow-sm hover:shadow-md transition-shadow">

// Highlighted card (e.g. notice, important service)
<div className="bg-[#1A4D2E]/[0.04] rounded-xl border border-[#1A4D2E]/20 p-6">

// Stat/trust card (floating)
<div className="bg-white/95 backdrop-blur-sm rounded-xl border border-[#E8EDE9] shadow-md px-5 py-3.5">
```

**Card padding scale:**
- Compact: `p-5`
- Standard: `p-6`
- Generous: `p-7`
- Large: `p-8 lg:p-10`

**Card grouping rule:** Related items in one card. One concept per card. Never more than 4 bullets in a card body.

### 7.4 Tables

```jsx
<table className="w-full text-sm font-body border-collapse">
  <thead>
    <tr className="border-b border-[#E8EDE9]">
      <th className="text-left text-[11px] uppercase tracking-[0.1em] font-semibold text-[#4E5A54] py-3 pr-6">Due Date</th>
      <th className="text-left text-[11px] uppercase tracking-[0.1em] font-semibold text-[#4E5A54] py-3 pr-6">Compliance</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-[#E8EDE9]">
    <tr className="hover:bg-[#F2F5F3] transition-colors">
      <td className="py-3.5 pr-6 text-[#1C201E] font-medium">31 March</td>
      <td className="py-3.5 text-[#4E5A54]">Advance Tax (Q4)</td>
    </tr>
  </tbody>
</table>
```

**Table rules:**
- Always use `divide-y` between rows — not alternating row colours
- Hover highlight: `hover:bg-[#F2F5F3]`
- Sticky header for long tables
- Column headers: UPPERCASE, 11px, tracked, muted — not bold full-size text
- Numeric columns: right-aligned (`text-right`)

### 7.5 Badges / Chips / Tags

**Rule:** Small, single-line, rounded. Use neutral colours. Reserve green for "active" or "success" states only.

```jsx
// Article category tag
<span className="bg-white/90 text-[#1A4D2E] text-[0.6875rem] font-semibold font-body px-2 py-0.5 rounded-full">
  Budget 2025
</span>

// Status badge — active
<span className="bg-[#e8eee9] text-[#1A4D2E] text-xs font-medium font-body px-2.5 py-0.5 rounded-full">
  Active
</span>

// Status badge — neutral
<span className="bg-[#F2F5F3] text-[#4E5A54] text-xs font-medium font-body px-2.5 py-0.5 rounded-full">
  Pending
</span>

// Status badge — notice/warning
<span className="bg-amber-50 text-amber-700 text-xs font-medium font-body px-2.5 py-0.5 rounded-full border border-amber-200">
  Action Required
</span>
```

### 7.6 Navigation

**Desktop header:**
- Height: `h-16` (64px)
- Background: `bg-white border-b border-[#E8EDE9]`
- Logo: `font-heading font-semibold` with brand accent on `.in`
- Nav links: `font-body text-sm font-medium` with `hover:text-[#1A4D2E]` and `underline` active indicator
- Active indicator: `border-b-2 border-[#1A4D2E]` on current page link
- CTA button: Primary button, `h-9 px-4` (compact for nav)

**Mobile nav:**
- Full-screen slide-in drawer
- Links: `text-base font-medium py-4 border-b border-[#E8EDE9]`
- CTA: Full-width primary button at bottom

**Sticky behaviour:**
- Header stays sticky at `top-0 z-50`
- Background: `bg-white/95 backdrop-blur-sm` for scroll elegance
- Add `shadow-sm` after first scroll (`scrollY > 4`)

### 7.7 Accordion / FAQ

```jsx
// Trigger button (accessible)
<button
  onClick={onToggle}
  aria-expanded={open}
  className="w-full flex items-start justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-inset"
>
  <span className="font-heading font-medium text-base text-[#1C201E] leading-snug pr-2">
    {question}
  </span>
  <ChevronDown className={`shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
</button>
```

- Container: `border-b border-[#E8EDE9] last:border-0`
- Answer text: `font-body text-sm text-[#4E5A54] leading-[1.75] pb-5 pr-8`
- Animation: `transition-all duration-200` on height

### 7.8 Testimonial Cards

```jsx
<div className="bg-white rounded-xl border border-[#E8EDE9] p-7 shadow-sm flex flex-col">
  {/* Stars */}
  <div className="flex gap-0.5 mb-5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} fill="#1A4D2E" strokeWidth={0} className="text-[#1A4D2E]" />
    ))}
  </div>
  {/* Quote */}
  <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-[1.75] mb-5 flex-1">
    "{quote}"
  </p>
  {/* Attribution */}
  <div className="border-t border-[#E8EDE9] pt-4">
    <p className="font-heading font-medium text-[#1C201E] text-sm">{name}</p>
    <p className="font-body text-[0.75rem] text-[#4E5A54] mt-0.5">{role}</p>
  </div>
</div>
```

### 7.9 Section CTA Band

Used once per page maximum. Full-width, dark green.

```jsx
<section className="bg-[#1A4D2E]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="font-heading font-semibold text-[1.875rem] sm:text-[2.25rem] text-white tracking-tight mb-3">
        {heading}
      </h2>
      <p className="font-body text-[0.9375rem] text-white/70 mb-8 leading-relaxed">
        {subtext}
      </p>
      {/* CTA buttons */}
      <p className="font-body text-[0.75rem] text-white/40">
        {trust note}
      </p>
    </div>
  </div>
</section>
```

### 7.10 Trust / Stat Strip

```jsx
<section className="bg-[#F2F5F3] border-y border-[#E8EDE9]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
      <div className="text-center">
        <p className="font-heading font-semibold text-[2rem] lg:text-[2.5rem] text-[#1C201E] tracking-tight leading-none">
          {value}
        </p>
        <p className="font-heading font-medium text-[#1A4D2E] text-sm mt-1">{label}</p>
        <p className="font-body text-[0.75rem] text-[#4E5A54] mt-0.5 leading-snug">{sub}</p>
      </div>
    </div>
  </div>
</section>
```

---

## 8. Layout System

### 8.1 Grid

```jsx
// 2-col content layout
<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

// 3-col card grid
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

// 4-col stats
<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">

// 5-col (FAQ: 2 + 3)
<div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
```

### 8.2 Section Anatomy

Every section follows the same structure:

```jsx
<section className="bg-{surface} {optional border}">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
    {/* Section header — always left-aligned unless it's a CTA/stat */}
    <div className="max-w-2xl mb-10 lg:mb-14">
      <span className="eyebrow">Category Label</span>
      <h2 className="h2">Section Heading</h2>
      <p className="body-sm text-muted">Subheading sentence.</p>
    </div>
    {/* Content */}
    {/* Section footer CTA — optional */}
  </div>
</section>
```

**Section background rotation (light mode):**
1. `#FBFBF9` (base off-white)
2. `#F2F5F3 border-y border-[#E8EDE9]` (muted)
3. `#FBFBF9`
4. `#F2F5F3 border-y`
... alternating

### 8.3 Mobile Rules

- Column count: max 2 on mobile (`grid-cols-2`), prefer 1 (`grid-cols-1`)
- No more than 3 elements in a flex row on mobile (use `flex-wrap`)
- Forms: `flex-col gap-3` on mobile, `sm:flex-row` on desktop
- Hero: Stack copy above image on mobile, side-by-side on `lg:`
- Tables: Consider horizontal scroll on mobile with `overflow-x-auto`

---

## 9. Iconography

**Library:** Lucide React (already installed)  
**Style:** `strokeWidth={1.5}` — thin, elegant, consistent  
**Size scale:**

| Context | Size |
|---|---|
| In-text / inline | `size={14}` |
| Button icon | `size={15}` or `size={16}` |
| Card icon | `size={18}` |
| Feature icon | `size={20}` |
| Nav icon | `size={18}` |
| Hero / large callout | `size={24}` |

**Icon backgrounds (in cards):**
```jsx
// Default
<div className="w-10 h-10 rounded-lg bg-[#F2F5F3] flex items-center justify-center">
  <FileText size={18} strokeWidth={1.5} className="text-[#1A4D2E]" />
</div>

// On hover (via group)
<div className="w-10 h-10 rounded-lg bg-[#F2F5F3] group-hover:bg-[#1A4D2E] transition-colors flex items-center justify-center">
  <FileText size={18} strokeWidth={1.5} className="text-[#1A4D2E] group-hover:text-white transition-colors" />
</div>
```

**Rules:**
- Never use emoji as icons in UI
- Never mix icon libraries in the same page
- All icons must be `aria-hidden` unless used without adjacent text label

---

## 10. Motion & Transitions

**Principle:** Functional, not decorative. Motion communicates state change — not entertainment.

| Type | Duration | Easing | Use |
|---|---|---|---|
| Colour transition | `150ms` | `ease-in-out` | Button hover, link hover |
| Size/scale | `200ms` | `ease-out` | Hover scale on cards |
| Height (accordion) | `200ms` | `ease-out` | FAQ open/close |
| Transform | `200ms` | `ease-in-out` | Chevron rotation |
| Shadow | `200ms` | `ease-out` | Card hover shadow |
| Page transitions | `150ms` | `ease-in-out` | Opacity fade on route change |
| Scroll-based | — | — | Use IntersectionObserver, CSS `animation-delay` |

**Tailwind shorthand:** Always use `transition-colors` not `transition-all` (prevents broken transforms).

```jsx
// Correct
className="transition-colors duration-150"

// Wrong — breaks transforms
className="transition-all"
```

**Entrance animations (sections):** Use `animation-delay` with a simple fade-up for page-load sections only:
```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
Apply to hero copy only. Not to every card or section (too busy).

---

## 11. Focus States

All interactive elements must have a visible keyboard focus indicator.

**Standard focus pattern:**
```css
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-2
```

**Global rule (in index.css):**
```css
*:focus-visible {
  @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
}
```

**Never use `outline: none` without providing a custom focus indicator.**

---

## 12. Feedback & Notification Patterns

### Inline form validation
- Error message: below the field, `text-xs text-red-600`, with icon
- Never use red backgrounds — use only red text and border

### Toast notifications (Sonner)
- Use for transient feedback only (form submitted, copy to clipboard)
- Never use for errors that require action — use inline error instead
- Duration: `4000ms` for success, `6000ms` for warning/error

### Status banners
```jsx
// Error banner
<div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-800 font-body">
  <AlertCircle size={16} className="shrink-0 mt-0.5" />
  <span>Your session has expired. Please sign in again.</span>
</div>
```

---

## 13. Anti-Patterns — What NOT to Do

| Do Not | Reason |
|---|---|
| Purple/violet gradients | Off-brand, looks like generic SaaS |
| Neon green or saturated colour accents | Undermines the professional CA-firm tone |
| `transition-all` on elements with transforms | Causes jank |
| Glassmorphism on more than 1 floating element | Visually noisy at scale |
| Multiple hero animations or parallax | Distracting for a service website |
| Centred section headings (when left-aligned fits) | Left-aligned headings read more naturally |
| Labels beside inputs on mobile | Breaks on small screens, fails accessibility |
| 4+ column grids on mobile | Too dense |
| Star ratings on every card | Reserve for testimonials only |
| CTA band more than once per page | Loses impact |
| All-caps body text (only for eyebrows) | Reduces legibility |
| `text-sm` for body prose | Too small; use `text-base` minimum for paragraphs |
| Stock-photo "happy people at laptops" | Undermines professional tone |
| Exclamation marks in headings | CA firms do not use them |
| "Smart", "AI-powered", "effortless" | Brand-banned language |
| Multiple font families | Stick to Playfair Display + Inter only |

---

## 14. Responsive Breakpoints

Follows Tailwind defaults:

| Prefix | Width | Target |
|---|---|---|
| *(base)* | `< 640px` | Mobile phones |
| `sm:` | `≥ 640px` | Large phones, small tablets |
| `md:` | `≥ 768px` | Tablets |
| `lg:` | `≥ 1024px` | Laptops, desktops |
| `xl:` | `≥ 1280px` | Wide desktops |

**Approach:** Mobile-first. Write base styles for smallest screens, override up.

---

## 15. Implementation Reference

### CSS Custom Properties (in `/app/frontend/src/index.css`)
All design tokens live as CSS custom properties on `:root` and `.dark`.

### Tailwind Config Extensions (`/app/frontend/tailwind.config.js`)
- `fontFamily.heading` → Playfair Display
- `fontFamily.body` → Inter
- `colors.forest` → Forest green set
- `colors.surface` → Surface set
- `colors.ink` → Text set
- `boxShadow.soft` + `boxShadow.soft-lg` → custom shadows
- `borderRadius` → mapped to `--radius` CSS variable

### Component Utilities (in `index.css`)
- `.form-input` — standard input style
- `.form-label` — label above field
- `.form-helper` — helper text below field
- `.btn-generous` — mobile-friendly button height

### Icon source
`lucide-react` — installed. Always use `strokeWidth={1.5}`.

---

*End of Design System v1.0 — TaxNext.in / VNAV Associates*
