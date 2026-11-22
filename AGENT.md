# AGENT.md — AI Engineering & Design Guide

This document defines the architectural rules, visual constitution, shared UI primitives, and verification standards for AI agents and engineers working on **Naymul Islam's Portfolio**.

---

## 1. Centralized Content Architecture (`src/data/portfolioData.js`)

- **Single Source of Truth**: Never hardcode profile metadata, phone numbers, project descriptions, tech stacks, credentials, foundations, or essays inside React components. All content lives in `src/data/portfolioData.js`:
  - `PROFILE`: Official email (`naymulislam241@gmail.com`), phone/WhatsApp (`+8801822667737` / `https://wa.me/8801822667737`), `proofStats`, and `techMarquee`.
  - `STACK_PLAYGROUND`: Powers the Hero side-by-side Live Architecture Workbench.
  - `CASE_STUDIES` & `EARLIER_BUILDS`: Powers the 3-column interactive `Story | Arch` case study gallery and CV projects.
  - `EXPERIENCE_TIMELINE`, `EDUCATION_CREDENTIALS`, & `RESUME_SNAPSHOT`: Powers the split Engineering Experience section, Formal Logic & Credentials Bento card, `ResumeModal.jsx`, and `generateResumePdf.js`.
  - `FOUNDATION_CATEGORIES` & `FOUNDATIONS`: Powers the category-filterable Foundations & Craft grid with `FOUNDATIONS_INITIAL_LIMIT = 4`.
  - `ARTICLES`: Powers the 2-column Writing section and distraction-free reader modal.
  - `DEV_COMMANDS`: Powers the `~/naymul git:(main)` footer console workbench.

---

## 2. Visual & Aesthetic Identity

- **Architect's Studio & Monograph Aesthetic**: Built around Naymul's signature **Studio Window Light, Mechanical Keyboard, Steaming Mug & Articulated Desk Lamp** motif (`StudioDeskVignette.jsx`) and custom editorial `Tooltip.jsx`. Never introduce cloned elements from external portfolios (such as hanging wall clocks, tea kettle shelves, or rooftop water tanks) or noisy generic SaaS status pills above the hero heading.
- **2+1 Typography System**:
  - **Display & Headings**: `'Fraunces', serif` — warm literary serif with `font-normal` weight and tight tracking.
  - **Body Prose**: `'Plus Jakarta Sans', sans-serif` — clean prose at `14px–17px` with `1.68–1.78` line height.
  - **Architecture Blueprints & Console**: `'JetBrains Mono', monospace` — used for pipeline diagrams, code snippets, timestamps, tech chips, and terminal flags.
- **Wide & 4K Workspace Container Discipline**:
  - All sections (`Header`, `Hero`, `TwoColumnSection`, `Writing`, `Footer`) align to the shared `.studio-container` / `.studio-section` wide drafting frame (`max-w-[1280px] 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8`) with subtle `.studio-frame-rails` hairlines on `xl+` and 4K displays, plus a full-bleed tech marquee band.
  - Reuse shared `@layer components` helpers in `src/index.css` (`.studio-container`, `.studio-section`, `.studio-card`, `.studio-chip`, `.studio-eyebrow`) instead of duplicating long class strings.

---

## 3. Shared UI, Motion & Accessibility Primitives

- **`ModalShell.jsx`**: Always wrap modal dialogs (`ResumeModal`, `ContactModal`, `CommandPalette`, `Writing` reader) in `ModalShell` so body scroll locking, Escape dismissal, backdrop blur, `z-[80]` layering, and `role="dialog" aria-modal="true"` stay consistent.
- **`Toast.jsx`**: Always remains at `z-[100]` so notifications stay visible above open modals.
- **`smoothScroll.js` & `Reveal.jsx`**: Use `smoothScrollToId` / `smoothScrollToTop` for in-page navigation and `<Reveal>` for scroll-triggered entrances; both respect `prefers-reduced-motion: reduce`.
- **Tailwind CSS v3.3.6 Compatibility**: Only use valid Tailwind v3 utility classes (never Tailwind v4-only classes like `shadow-2xs`, `shadow-xs`, `backdrop-blur-xs`, `w-9.5`, or `duration-180`).

---

## 4. Time-of-Day Studio Light Engine (`TimeOfDayContext.jsx`)

| Period | Schedule (Local) | HTML Class | Background | Studio Window & Desk State (`StudioDeskVignette.jsx`) |
| :--- | :--- | :--- | :--- | :--- |
| **Morning** | `05:00 – 11:59` | `html.mood-morning` | `#FAF3E6` | Golden sunrise window + slanting honey sunbeams + steaming mug |
| **Afternoon** | `12:00 – 16:59` | `html.mood-afternoon` | `#F4F5F1` | Crisp daylight alabaster linen + sky-neutral clarity + tactile keyboard |
| **Evening** | `17:00 – 18:59` | `html.mood-evening` | `#E9DAC5` | Rich golden-hour apricot sunset + articulated architect desk lamp ON |
| **Night** | `19:00 – 04:59` | `html.mood-night.dark` | `#141210` | Crescent moon & stars + focused golden desk lamp cone & backlit keys |

---

## 5. Verification Checklist Before Committing

1. Run `npm run lint` (`eslint . --ext js,jsx --max-warnings 0`) and ensure **0 errors and 0 warnings**.
2. Run `npm run build` (`vite build`) to verify clean production bundling.
3. Verify responsive layout and zero horizontal overflow across `320px`, `390px`, `768px`, `1440px`, and `1920px+` (4K) in both Light and Night modes.
