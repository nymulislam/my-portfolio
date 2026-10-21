# Dynamic Time-of-Day Shelf & Ultra-Premium Developer Experience

A significant evolution of Naymul Islam's handcrafted portfolio. This update makes the wooden shelf dynamically reflect the real day-to-night rhythm of a software engineer, infuses developer micro-animations, scales seamlessly across all devices, and refines the reading typography.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following confirmed decisions guide this implementation:

- **Dynamic 4-Period Shelf Transformation**:
  1. **Morning (সকাল)**: Hot fresh morning espresso cup with rising steam + a small green potted succulent/desk plant.
  2. **Afternoon (দুপুর)**: A leather developer notebook with a metallic fountain pen, glasses, and a cool water tumbler.
  3. **Evening (সন্ধ্যা)**: The iconic rustic metal kettle & glass of spiced Bangladeshi milk tea (doodh cha) with animated steam.
  4. **Night (রাত)**: A cozy vintage brass desk lamp casting a warm downward glow + midnight studio headphones.
- **Developer & Code Micro-Interactions**:
  - Interactive syntax tags (e.g. `const stack = ['Next.js', 'TypeScript', 'AgenticAI'];`) with subtle hover glow.
  - Interactive copy-to-clipboard code snippets and animated copy toasts.
  - Tactile animated button press physics (`transform: translateY(-2px)`, active click compression, and subtle cursor feedback).
- **Full Responsive Mobile & Desktop Presence**:
  - Responsive wooden shelf layout that gracefully scales in size on mobile viewports so it remains visible without colliding with the headline text.
- **Refined Reading Typography**:
  - Enhanced line-height, elegant drop caps, balanced headline wraps, and smooth reading drawers for all essays.

---

### 1. Detailed Component Updates

#### A. Dynamic Handcrafted Shelf (`DynamicShelf.jsx`)
- Replaces static tea shelf with a time-reactive container that smoothly transitions based on `activePeriod`:
  - `activePeriod === 'morning'`: Espresso cup + steam + green succulent plant.
  - `activePeriod === 'afternoon'`: Open code notebook + pen + glasses + tumbler.
  - `activePeriod === 'evening'`: Classic kettle + hot doodh cha + steam waves.
  - `activePeriod === 'night'`: Desk lamp with illuminated light cone + headphones.
- Scaled smoothly on mobile devices (`scale-75 sm:scale-90 md:scale-100`) with appropriate margin spacing.

#### B. Developer Micro-Animations & Code Tags
- Interactive code-styled tags in projects and hero sections (`font-mono text-xs`).
- Quick copy snippet helper: clicking email, phone, or code snippets triggers an animated toast.
- Smooth transitions on time-of-day selector.

#### C. Reading Experience & Layout Polish
- Deep editorial readability across `Writing`, `Projects & open source`, and `Books & foundations`.
- Fully responsive across mobile (375px+), tablet, and desktop (1440px+).

---

### 2. Architecture & State Mapping

```
┌────────────────────────────────────────────────────────────────────────┐
│                               App.jsx                                  │
│         (TimeOfDayProvider: Morning / Afternoon / Evening / Night)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼──────────────────────────────┐
    ▼                               ▼                              ▼
┌──────────────────┐    ┌───────────────────────────┐    ┌──────────────────┐
│ HangingClock.jsx │    │         Header.jsx        │    │ DynamicShelf.jsx │
│ (Real-Time Hands,│    │ (Dropdown Pill, 4 Moods)  │    │ (Morning/Noon/   │
│  Dhaka Tooltip)  │    └───────────┬───────────────┘    │  Evening/Night)  │
└──────────────────┘                │                    └──────────────────┘
                                    ▼
                        ┌───────────────────────────┐
                        │          Hero.jsx         │
                        │ (Hi I'm Naymul, Tag, Bio) │
                        └───────────┬───────────────┘
                                    │
                                    ▼
                        ┌───────────────────────────┐
                        │        Writing.jsx        │
                        │ (Articles, Reading Modal) │
                        └───────────┬───────────────┘
                                    │
                                    ▼
                        ┌───────────────────────────┐
                        │   TwoColumnSection.jsx    │
                        │ · Left: Projects (Solo)   │
                        │ · Right: Journey & Stack  │
                        └───────────┬───────────────┘
                                    │
                                    ▼
                        ┌───────────────────────────┐
                        │         Footer.jsx        │
                        │ (Say hello ↗, Socials)    │
                        └───────────┬───────────────┘
                                    │
                                    ▼
                        ┌───────────────────────────┐
                        │     RooftopSkyline.jsx    │
                        │ (Dynamic Day/Night Light) │
                        └───────────────────────────┘
```
