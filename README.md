# Naymul Islam — Wide Architect's Studio & Developer Monograph

An original, literary-editorial developer portfolio for **Naymul Islam** (Full-Stack & AI Systems Engineer based in Dhaka, Bangladesh), engineered for crisp presentation across **320px small mobile, tablet, desktop, ultrawide, and 4K displays**.

Built around an **Architect's Studio Desk & Window Light** motif — pairing warm monograph typography with an interactive studio desk vignette, a wide drafting-rail canvas (`1280px` / `1400px`), silky scroll animations, interactive architecture blueprints, and a single-source-of-truth ATS PDF resume generator.

---

## ✨ Signature Features

- **Single Source of Truth (`src/data/portfolioData.js`)**
  - Profile metadata, contact channels (`+8801822667737` / `naymulislam241@gmail.com`), tech marquee items, code playground patterns, 6 case studies, experience timeline, formal credentials, foundations, and essays all live in one structured store — powering the live portfolio, interactive CV modal, and downloadable A4 PDF simultaneously.
- **Wide & 4K Architect's Drafting Studio Layout**
  - Responsive `1280px` (`2xl`/4K: `1400px`) studio frame with subtle vertical drafting rails (`.studio-frame-rails`), floating pill header navigation, asymmetric 2-column Hero + Flagship Spotlight, full-bleed infinite tech marquee, side-by-side Live Architecture Workbench, 3-column Case Study gallery, and asymmetric Capabilities & Formal Logic Bento.
- **Interactive Studio Desk & 4-Mood Studio Light (`StudioDeskVignette.jsx`, `TimeOfDayContext.jsx`)**
  - Custom interactive SVG desk featuring a Venetian-blind window (transitioning smoothly via the GPU View Transitions API across **Morning**, **Afternoon**, **Evening**, and **Night**), an articulated desk lamp toggle, a steaming stoneware mug, and a 65% mechanical keyboard that cycles live code snippets.
- **Silky Smooth Scroll & Scroll-Reveal Engine (`smoothScroll.js`, `Reveal.jsx`)**
  - Interruptible `requestAnimationFrame` cubic-out smooth scrolling for all navigation jumps, a razor-thin GPU reading progress hairline on the sticky header, and lightweight `IntersectionObserver` scroll-reveal motion (fully honoring `prefers-reduced-motion`).
- **Interactive Case Studies (`Story` ↔ `Arch`)**
  - Six production systems (*LearnHikmah Platform*, *LearnHikmah LMS*, *An-Nujum Foundation*, *Balzo Financial App*, *E-Page Commerce*, *IlmMed & Web Suite*) with wrap-friendly tech stack chips, always-visible `Outcome` callouts, and an interactive `Story | Arch` pipeline blueprint switcher.
- **1-Click Executive CV & ATS-Friendly A4 PDF (`ResumeModal.jsx`, `generateResumePdf.js`)**
  - Direct 1-click PDF download (`Naymul_Islam_Resume.pdf`) with clickable URI hyperlinks plus an interactive Web Overview and exact 1-page A4 Print Preview portal.
- **Unified Accessible Modals & Developer Workbench (`ModalShell.jsx`, `Footer.jsx`, `CommandPalette.jsx`)**
  - Shared ARIA-compliant modal portal (`role="dialog"`, `aria-modal="true"`, Escape dismissal, scroll lock) powering the CV modal, global Contact modal, Essay Reader (`A- / Aa / A+`), and `⌘K` Command Palette alongside the `~/naymul git:(main)` terminal workbench.

---

## 🗂 Project Structure

```text
├── index.html                        # Google Fonts, SEO, OpenGraph, Twitter Card & JSON-LD Person schema
├── public/
│   ├── favicon.svg                   # Serif N. monogram favicon
│   └── og-cover.svg                  # Branded 1200×630 OpenGraph preview card
├── README.md                         # Project overview & setup guide
├── AGENT.md                          # Engineering & design constitution for AI agents
└── src/
    ├── main.jsx                      # React 18 entry point
    ├── App.jsx                       # Root layout orchestrating modals, toasts & sections
    ├── index.css                     # Mood surfaces, .studio-* primitives, marquee & reveal CSS
    ├── data/
    │   └── portfolioData.js          # Single master content & resume data store
    ├── context/
    │   └── TimeOfDayContext.jsx      # 4-mood studio light engine, View Transitions & lamp toggle
    ├── utils/
    │   ├── generateResumePdf.js      # Zero-dependency 1-page A4 ATS PDF generator with URI links
    │   └── smoothScroll.js           # Interruptible rAF cubic-out smooth scroll helpers
    └── Components/
        ├── Header/
        │   └── Header.jsx            # 3-zone sticky bar, floating pill nav, reading progress bar & mobile nav
        ├── Editorial/
        │   ├── Hero.jsx              # Asymmetric Hero, Studio Showcase, Tech Marquee & Code Workbench
        │   ├── TwoColumnSection.jsx  # 3-col Case Studies, Capabilities/Logic Bento, Experience & Foundations
        │   ├── Writing.jsx           # 2-col Essays list & distraction-free reader modal
        │   └── Footer.jsx            # Closing Hiring CTA, ~/naymul git:(main) console & social links
        ├── Handcrafted/
        │   └── StudioDeskVignette.jsx # Interactive studio window, desk lamp, mug & 65% keyboard SVG
        └── UI/
            ├── AmbientStudioBackdrop.jsx # Time-reactive radial studio light wash
            ├── CommandPalette.jsx    # ⌘K quick navigation, mood & hiring actions modal
            ├── ContactModal.jsx      # Global direct message (EmailJS) & quick-copy modal
            ├── ModalShell.jsx        # Shared accessible portal dialog shell (Escape + scroll lock)
            ├── ResumeModal.jsx       # Interactive CV Overview, 1-click PDF download & A4 print preview
            ├── Reveal.jsx            # Lightweight IntersectionObserver scroll-reveal wrapper
            ├── Toast.jsx             # Top-layer (z-[100]) notification toast
            └── Tooltip.jsx           # Pointer-hover editorial tooltip
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

3. **Run ESLint (0 warnings policy)**
   ```bash
   npm run lint
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production bundle**
   ```bash
   npm run preview
   ```
