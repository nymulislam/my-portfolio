# AGENT.md — AI Engineering & Design Guide

This document defines the architectural rules, visual constitution, and content standards for AI agents and engineers working on **Naymul Islam's Portfolio**.

---

## 1. Centralized Content Architecture (`src/data/portfolioData.js`)

- **Single Source of Truth**: Never hardcode profile metadata, phone numbers, project descriptions, foundations, or blog posts inside React components. All content lives in `src/data/portfolioData.js`:
  - `PROFILE`: Contains official email (`naymulislam241@gmail.com`) and official phone/WhatsApp (`+8801822667737` / `https://wa.me/8801822667737`).
  - `STACK_PLAYGROUND`: Powers the Hero interactive code playground.
  - `CASE_STUDIES` & `EARLIER_BUILDS`: Powers the interactive `Story | Arch` project cards.
  - `FOUNDATION_CATEGORIES` & `FOUNDATIONS`: Powers the category-filterable Foundations & Engineering Craft grid with automatic `FOUNDATIONS_INITIAL_LIMIT = 4` progressive disclosure (`Show all / Show fewer`).
  - `ARTICLES`: Powers the Writing section and distraction-free reader modal.
  - `DEV_COMMANDS`: Powers the `~/naymul git:(main)` footer console workbench.

---

## 2. Visual & Aesthetic Identity

- **Architect's Studio & Monograph Aesthetic**: Built around Naymul's signature **Studio Window Light, Mechanical Keyboard & Articulated Desk Lamp** motif (`StudioDeskVignette.jsx`). Never re-introduce cloned elements from external portfolios (such as hanging wall clocks, tea kettle shelves, or rooftop water tanks).
- **2+1 Typography System**:
  - **Display & Headings**: `'Fraunces', serif` — warm literary serif with `font-normal` weight and tight tracking.
  - **Body Prose**: `'Plus Jakarta Sans', sans-serif` — clean, effortless prose at `13.5px–16.5px` with `1.62–1.78` line height.
  - **Architecture Blueprints & Console**: `'JetBrains Mono', monospace` — used strictly for pipeline diagrams, code snippets, timestamps, and terminal flags.
- **Workspace Container Discipline**:
  - All sections (`Header`, `Hero`, `TwoColumnSection`, `Writing`, `Footer`) align to a centered `max-w-[780px] mx-auto px-4 sm:px-6` container.
  - Section dividers (`border-t border-[#DCD0C0] dark:border-stone-800/80`) remain contained inside `max-w-[780px]`.

---

## 3. Time-of-Day Studio Light Engine (`TimeOfDayContext.jsx`)

| Period | HTML Class | Background | Studio Window & Desk State (`StudioDeskVignette.jsx`) |
| :--- | :--- | :--- | :--- |
| **Morning** | `html.mood-morning` | `#F6EFE2` | Golden sunrise window + slanting sunbeams + steaming stoneware mug |
| **Afternoon** | `html.mood-afternoon` | `#F8F4EC` | Crisp sky window + daylight blinds + tactile 65% mechanical keyboard |
| **Evening** | `html.mood-evening` | `#EFE6D8` | Warm sunset horizon + articulated architect desk lamp ON |
| **Night** | `html.mood-night.dark` | `#151311` | Crescent moon & stars + focused golden desk lamp cone & backlit keys |

---

## 4. Verification Checklist Before Committing

1. Run `npm run lint` (`eslint . --ext js,jsx --max-warnings 0`) and ensure **0 errors and 0 warnings**.
2. Run `npm run build` (`vite build`) to verify clean production bundling.
