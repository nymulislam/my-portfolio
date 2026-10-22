# Naymul Islam — Architect's Studio & Developer Monograph

An original, literary-editorial developer portfolio for **Naymul Islam** (Full-Stack Software Engineer & AI Systems Architect based in Dhaka, Bangladesh).

Designed around an **Architect's Studio Desk & Window Light** motif—combining a warm monograph aesthetic with interactive system architecture blueprints, a live code playground, a scalable foundations filter, and a terminal workbench.

---

## ✨ Signature Features

- **Single Master Content Store (`src/data/portfolioData.js`)**
  - All profile details, WhatsApp/phone contact (`+8801822667737`), Hero code snippets, Case Studies, Foundations & Craft items, and Writing essays live in one structured file for zero-touch UI maintenance.
- **Interactive Studio Desk & Window Light (`StudioDeskVignette.jsx`)**
  - Custom SVG studio scene featuring a framed Venetian-blind window (whose sky transitions across **Morning**, **Afternoon**, **Evening**, and **Night**), an **Articulated Architect's Desk Lamp** (click to toggle the warm golden light cone), a **65% Custom Mechanical Keyboard** (click keys to cycle stack snippets), and a steaming ceramic mug.
- **Live Stack & Code Snippet Playground (`Hero.jsx`)**
  - Interactive architectural snippets for `Next.js App Router`, `TypeScript Contracts`, `MERN Concurrency`, and `Agentic AI Tools`, complete with one-click invariant verification (`Verify`) and clipboard copy.
- **Interactive Case Study Cards (`Story` ↔ `Arch`)**
  - Flagship systems (*LearnHikmah Platform*, *LearnHikmah LMS*, *E-Page Commerce*, and *IlmMed & Web Suite*) each include an interactive **`Story` | `Arch`** toggle that flips between a plain-English impact summary and a `JetBrains Mono` request/data pipeline diagram.
- **Scalable Foundations & Engineering Craft (`TwoColumnSection.jsx`)**
  - Domain category filter tabs (`All`, `Logic & Studies`, `Systems & Stack`, `Agentic AI`, `Engineering Craft`) paired with automatic progressive disclosure (`Show all N foundations` / `Show fewer items`) when entries exceed 4 items.
- **Distraction-Free Engineering Essay Reader (`Writing.jsx`)**
  - Simple-English essays on TOTP authentication, database concurrency locks, reverse proxies, and Bloom filters with adjustable reading font scale (`A-` / `Aa` / `A+`) and key takeaway callouts.
- **Interactive Footer Console Workbench (`Footer.jsx`)**
  - Terminal workbench (`~/naymul git:(main)`) supporting `--stack`, `--status`, `--contact`, and `--mood` flags alongside the `⌘K` Studio Command Palette.

---

## 🗂 Project Structure

```text
├── index.html                        # Google Fonts (Fraunces, Plus Jakarta Sans, JetBrains Mono) & SEO meta
├── README.md                         # Project overview & setup instructions
├── AGENT.md                          # Architectural & design constitution for AI agents
├── src/
│   ├── App.jsx                       # Root layout orchestrating studio header, hero, case studies & footer
│   ├── index.css                     # Ambient mood variables, window light rays & mug steam keyframes
│   ├── main.jsx                      # React 18 entry point
│   ├── data/
│   │   └── portfolioData.js          # Single master content & contact store (+8801822667737, projects, essays)
│   ├── context/
│   │   └── TimeOfDayContext.jsx      # Studio light state, desk lamp toggle & localStorage persistence
│   └── Components/
│       ├── Header/
│       │   └── Header.jsx            # Responsive top bar with brand wordmark, nav links & studio light pill
│       ├── Editorial/
│       │   ├── Hero.jsx              # Split hero with StudioDeskVignette & Live Stack Playground
│       │   ├── TwoColumnSection.jsx  # Interactive Case Study Cards (Story/Arch) & Scalable Foundations
│       │   ├── Writing.jsx           # Engineering essays list & distraction-free reader modal
│       │   └── Footer.jsx            # Say Hello modal & interactive ~/naymul git:(main) console
│       ├── Handcrafted/
│       │   └── StudioDeskVignette.jsx # Interactive studio window, desk lamp & 65% keyboard SVG
│       └── UI/
│           ├── CommandPalette.jsx    # Keyboard-accessible studio actions modal (⌘K)
│           └── Toast.jsx             # Minimal notification toast
```

---

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Lint codebase**
   ```bash
   npm run lint
   ```
