# Navbar Monogram Upgrade, Sticky Scroll Polish & Playground Tooltip Fix

This update resolves the clipped `Verify` and `Copy` tooltips in the code playground, simplifies the Hero role status line, replaces the full name in the top navigation bar with the minimal serif `N` monogram badge, and upgrades the navigation bar into a sticky editorial header with active section tracking.

## User Review & Critical Decisions

> [!IMPORTANT]
> All design preferences have been confirmed from your answers and screenshot feedback:

- **Confirmed Decision 1 (Brand Mark in Navbar)**: Replace the full `"Naymul Islam"` text in the navbar with the **Minimal serif `N` monogram badge** matching the favicon (dark espresso badge `#1C1917`, warm cream serif `N` `#F6EFE2`, and terracotta dot `#C85A32`), paired with a clean hover tooltip (`"Naymul Islam · Home"`).
- **Confirmed Decision 2 (Sticky Editorial Navbar & Active Highlight)**: Upgrade the navbar into a **sticky editorial header** with warm paper / dark espresso backdrop blur on scroll and automatic **active section highlighting** (`Systems`, `Experience`, `Craft`, `Writing`, `Contact`) as the user scrolls through the page.
- **Confirmed Decision 3 (Hero Role Line Simplification)**: Remove `· Next.js · TypeScript · Supabase · MERN` from the Hero status line so it reads concisely as:
  `Full-Stack & AI Systems Engineer · Remote or Dhaka`
- **Confirmed Decision 4 (Verify & Copy Tooltip Clipping Fix)**: Remove `overflow-hidden` from the outer Stack Playground container (applying `rounded-t-2xl` and `rounded-b-2xl` directly to its header and footer bars) so the `Verify` and `Copy` tooltips render above the buttons with zero clipping.

---

## 1. Overview & Core Concept

- **What It Does**:
  1. **Unclipped Playground Tooltips**: Ensures the `Verify` and `Copy` buttons in the Hero Stack Playground display their full tooltip bubbles above the card without being cut off by the card's top border.
  2. **Concise Hero Role Line**: Eliminates repetitive stack keywords from the Hero role line (`Full-Stack & AI Systems Engineer · Remote or Dhaka`), reducing visual noise.
  3. **Monogram Brand Mark**: Uses the bespoke `N` monogram emblem in the navbar instead of repeating the full name right above the Hero headline.
  4. **Sticky Editorial Navigation**: Keeps navigation effortlessly accessible while scrolling with a refined translucent paper/espresso blur, compact vertical profile, and real-time active section indicator.
- **Target Audience / Persona**: Technical recruiters, engineering leads, and founders reviewing Naymul Islam's portfolio.
- **Key Value**: Cleaner visual hierarchy at the top of the page, unobstructed micro-interactions, and effortless section navigation throughout the portfolio.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Playground Tooltip Inspection**: Hovering over `▷ Verify` or `Copy` in the Stack Playground smoothly reveals the full editorial tooltip above the button with no top-edge clipping.
  2. **Brand Monogram Interaction**: Clicking the `N` monogram badge in the top-left smoothly scrolls back to `#home` (`window.scrollTo({ top: 0, behavior: "smooth" })`).
  3. **Sticky Scroll & Section Spy**: As the user scrolls down the page, the header stays pinned at the top with a subtle bottom hairline border and backdrop blur, while the active section link (`Systems`, `Experience`, `Craft`, `Writing`, or `Contact`) highlights with a terracotta underline indicator.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Warm architectural monograph & handcrafted studio aesthetic.
  - *Color Palette & Mood*: Warm paper (`#F6EFE2` / `#EFE6D8`) in daytime modes and deep espresso (`#161412` / `#1E1C1A`) in night mode, accented with terracotta (`#9A4E24` / `#C85A32`) and warm amber (`#F59E0B`).
  - *Typography & Hierarchy*: Classic serif monogram mark, clean medium sans navigation links with single-line discipline (`whitespace-nowrap`), and tabular monospace metadata.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Removing Container `overflow-hidden` vs Changing Tooltip Direction**
  - *Chosen Approach*: Remove `overflow-hidden` from the outer Stack Playground wrapper and apply explicit `rounded-t-2xl` / `rounded-b-2xl` to the header and footer sections.
  - *Why*: Allows tooltips on `Verify` and `Copy` to pop cleanly above the top bar (`position="top"`) without covering the code block below or getting sliced off by CSS overflow clipping.
- **Decision 2: Scroll-Spy Active Section Highlighting**
  - *Chosen Approach*: Lightweight scroll listener / `IntersectionObserver` tracking `#projects`, `#experience`, `#about`, `#writing`, and `#contact`.
  - *Why*: Gives immediate visual orientation as the reader moves through the long-form portfolio while respecting the 15% mobile sticky height cap.

---

## 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         STICKY EDITORIAL HEADER                          │
│  ┌────────────────┐   ┌──────────────────────────────────┐   ┌────────┐  │
│  │  [N.] Monogram │   │ Systems · Experience · Craft ... │   │  Mood  │  │
│  │  (Home Anchor) │   │ (Scroll-Spy Active Underline)    │   │ Picker │  │
│  └────────────────┘   └──────────────────────────────────┘   └────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                              HERO SECTION                                │
│  • Concise Role Line: "Full-Stack & AI Systems Engineer · Remote/Dhaka"  │
│  • Stack Playground Card (overflow-visible outer shell, rounded inner    │
│    header/footer so "Verify" & "Copy" tooltips never clip at top edge)   │
└──────────────────────────────────────────────────────────────────────────┘
```

- **Interactive Component & State Mapping**:
  - **Header Component**:
    - Tracks `isScrolled` (`window.scrollY > 16`) to toggle compact sticky padding, backdrop blur, and subtle bottom border.
    - Tracks `activeSection` (`projects`, `experience`, `about`, `writing`, `contact`) based on viewport scroll position and highlights the matching link with a terracotta active state and bottom indicator bar.
    - Renders the SVG `N` monogram badge with terracotta dot inside the brand anchor link.
  - **Hero Component**:
    - Simplifies the role & location status line by removing `PROFILE.tagline`.
    - Updates the Stack Playground card container classes so top-aligned tooltips on `Verify` and `Copy` are never clipped.
