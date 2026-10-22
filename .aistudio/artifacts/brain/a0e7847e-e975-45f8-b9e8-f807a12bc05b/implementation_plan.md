# Default `Auto` Time-of-Day Fix, Ambient Studio Backdrop & Purposeful Micro-Motion

This update resolves the issue where deployed builds defaulted to `Evening` instead of `Auto`, introduces a subtle time-reactive studio light aura with a faint architectural blueprint grid, and adds high-craft micro-motion across interactive tabs, cards, and sections.

## User Review & Critical Decisions

> [!IMPORTANT]
> Your preferences have been locked in based on our discussion:

- **Confirmed Decision 1 (Default `Auto` Time-of-Day & Cache Migration)**: Change the default state in `TimeOfDayContext` from `"evening"` to `"auto"`, clear the legacy `"portfolio_time_mood"` key from `localStorage`, and use `"portfolio_time_mood_v2"` so all existing and new visitors on Vercel immediately start in `Auto` mode synced with their real clock.
- **Confirmed Decision 2 (Subtle Time-Reactive Studio Light Aura & Blueprint Grid)**: Add a zero-distraction ambient background layer featuring a faint architectural dot/blueprint grid ($3\%–4\%$ opacity) and a slow-breathing radial studio light aura that shifts color temperature across `Morning`, `Afternoon`, `Evening`, and `Night` (and intensifies warmly when the studio desk lamp is toggled `ON`).
- **Confirmed Decision 3 (Subtle Interactive Micro-Motion & Smooth Transitions)**: Add hardware-accelerated (`transform` / `opacity`) transitions to code playground tab changes, `Story ↔ Arch` card switches, progressive `Read more` expansions, and subtle card hover elevation, with full `prefers-reduced-motion` accessibility compliance.

---

## 1. Overview & Core Concept

- **What It Does**:
  1. **True `Auto` Default on Load**: Automatically detects the visitor's local hour (`Morning` 05:00–11:59, `Afternoon` 12:00–16:59, `Evening` 17:00–20:59, `Night` 21:00–04:59) by default, clears stale `"evening"` cache entries, and updates live every minute.
  2. **Clear `Auto` Indicator in Navbar**: Shows `Auto · Morning` (or the current period) in the top-right Studio Light pill when `Auto` mode is selected, so it is immediately obvious that `Auto` is active.
  3. **Architectural Studio Backdrop**: Renders a fixed, pointer-events-none background canvas behind the portfolio with an ultra-subtle architectural blueprint grid and a soft, breathing sunbeam/lamp glow that adapts to the time of day.
  4. **Editorial Micro-Motion**: Smooth cross-fade and slide settling (`cubic-bezier(0.16, 1, 0.3, 1)`) when switching Stack Playground tabs, toggling `Story | Arch` views, expanding case studies, and hovering project cards.
- **Target Audience / Persona**: Senior engineers, hiring managers, and technical recruiters evaluating frontend craft, system thinking, and attention to detail.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **First Load / Hard Reload on Vercel**: The site boots in `Auto` mode (`Auto · Morning` / `Afternoon` / `Evening` / `Night` based on local time). If the user clicks the Studio Window or picks a specific mood from the dropdown, that choice is respected; clicking `Auto` returns to real-time sync.
  2. **Ambient Studio Atmosphere**: As the mood shifts (or when the user toggles the Desk Lamp on/off in the Hero vignette), the subtle background light aura smoothly transitions its warmth and position without reducing text contrast.
  3. **Tactile Tab & Card Switching**: Clicking any stack tab (`Next.js`, `Supabase`, `MERN`, `Agentic AI`) or `Story | Arch` toggle animates the newly revealed content with a crisp 180ms upward settle (`animate-editorial-fade`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Pure CSS Compositor Animations vs Heavy JS Animation Runtime**
  - *Chosen Approach*: Use hardware-accelerated CSS keyframe and transition utilities (`transform`, `opacity`, `cubic-bezier(0.16, 1, 0.3, 1)`) with `prefers-reduced-motion` media queries.
  - *Why*: Guarantees 60fps performance, zero bundle bloat, and immediate DOM availability for all text and links (preventing scroll-jacking or invisible content delays when recruiters skim fast).
- **Decision 2: Migrating `localStorage` Key (`portfolio_time_mood_v2`)**
  - *Chosen Approach*: Remove the old `portfolio_time_mood` key on mount and read/write `portfolio_time_mood_v2`, defaulting to `"auto"`.
  - *Why*: Because the previous code wrote `"evening"` to `localStorage` on initial load, even a hard reload (`Ctrl+Shift+R`) kept reading `"evening"` from browser storage. Migrating the key immediately fixes the issue on your live Vercel URL without requiring visitors to clear site data manually.

---

## 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        TimeOfDayContext (Auto Default)                   │
│  • Default: "auto" (clears legacy "portfolio_time_mood" key)             │
│  • 60s live clock sync → activePeriod ("morning"|"afternoon"|"evening"|"night") │
└──────────────────┬───────────────────────────────────────┬───────────────┘
                   │                                       │
                   ▼                                       ▼
┌─────────────────────────────────────┐ ┌──────────────────────────────────┐
│   AmbientStudioBackdrop Component   │ │   Interactive UI Micro-Motion    │
│ • Faint 28px architectural grid     │ │ • Header: "Auto · {Period}" pill │
│ • Time-reactive radial light aura   │ │ • Hero Playground tab cross-fade │
│ • Reacts to studioLampOn state      │ │ • Case Study Story/Arch transition│
└─────────────────────────────────────┘ └──────────────────────────────────┘
```

- **Component & File Updates**:
  - `src/context/TimeOfDayContext.jsx`: Set initial fallback to `"auto"`, remove legacy `"portfolio_time_mood"` storage item, persist under `"portfolio_time_mood_v2"`, and add a 60-second interval to refresh `getSystemPeriod()` when in `"auto"` mode.
  - `src/Components/Header/Header.jsx`: Display `Auto · {currentDetails.label}` when `selectedMood === "auto"` so the active automatic state is crystal clear in the navbar.
  - `src/Components/UI/AmbientStudioBackdrop.jsx`: New lightweight component rendering the subtle architectural blueprint grid mask and time-of-day + desk-lamp reactive ambient glow.
  - `src/index.css` & Section Components (`Hero.jsx`, `TwoColumnSection.jsx`, `Writing.jsx`): Add refined `animate-editorial-fade`, subtle card lift transitions, and `@media (prefers-reduced-motion: reduce)` safeguards.
