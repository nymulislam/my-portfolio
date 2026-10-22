/**
 * ============================================================================
 * MASTER PORTFOLIO DATA STORE (Single Source of Truth for Web & ATS Resume)
 * ============================================================================
 * Any update made here automatically updates the live portfolio, the interactive
 * Resume Preview Modal, and the generated A4 ATS-friendly PDF Resume.
 */

export const PROFILE = {
  name: "Naymul Islam",
  shortName: "Naymul",
  role: "Full-Stack & AI Systems Engineer",
  hiringStatus: "Open to Full-Stack & AI Engineer roles (Remote or Dhaka)",
  tagline: "Next.js · TypeScript · Supabase · MERN",
  location: "Dhaka, Bangladesh",
  shortBio:
    "I architect fast, reliable web and mobile applications using Next.js, TypeScript, Supabase, BetterAuth, HeroUI, and the MERN stack.",
  expandedBio:
    "Across 40 repositories and 2 GitHub organizations—learnhikmah (private LMS monorepo) and balzo-app (solo multi-financial mobile & web suite)—I pair formal analytical logic with practical Agentic AI workflows.",
  bio: "I architect fast, reliable web and mobile applications using Next.js, TypeScript, Supabase, BetterAuth, HeroUI, and the MERN stack. Across 40 repositories and 2 organizations (learnhikmah & balzo-app), I focus on clean system boundaries and practical AI workflows.",
  email: "naymulislam241@gmail.com",
  phone: "+8801822667737",
  phoneFormatted: "+880 182-2667737",
  whatsappUrl: "https://wa.me/8801822667737",
  githubUrl: "https://github.com/nymulislam",
  linkedinUrl: "https://linkedin.com/in/nymulislam",
  portfolioUrl: "https://github.com/nymulislam",
  repoCount: "40",
  orgCount: "2",
  organizations: [
    {
      name: "learnhikmah",
      url: "https://learnhikmah.com",
      description: "Private monorepo powering LearnHikmah Platform & LMS",
    },
    {
      name: "balzo-app",
      url: "https://github.com/nymulislam",
      description: "Solo-engineered multi-financial mobile & web application suite",
    },
  ],
};

export const STACK_PLAYGROUND = [
  {
    id: "nextjs",
    label: "Next.js",
    fullLabel: "Next.js · HeroUI",
    file: "app/courses/[slug]/page.tsx",
    architectureNote: "Streaming SSR with parallel fetching, HeroUI primitives & zero waterfall",
    verifyOutput: "✓ SSR stream ready in 38ms · Cache-Control: s-maxage=3600",
    code: `export default async function CoursePage({ params }: Props) {
  const [course, progress] = await Promise.all([
    getCourseBySlug(params.slug),
    getLearnerProgress(params.slug),
  ]);
  return <WorkspaceView course={course} progress={progress} />;
}`,
  },
  {
    id: "auth-supabase",
    label: "Supabase",
    fullLabel: "BetterAuth · Supabase",
    file: "lib/auth/session-guard.ts",
    architectureNote: "Type-safe BetterAuth session verification backed by Supabase RLS policies",
    verifyOutput: "✓ BetterAuth session & Supabase RLS policy verified (0 implicit any)",
    code: `export async function requireOrgSession(headers: Headers) {
  const session = await auth.api.getSession({ headers });
  if (!session?.user) return { ok: false as const, code: "UNAUTHORIZED" };
  const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
  return { ok: true as const, user: session.user, profile: data };
}`,
  },
  {
    id: "mern",
    label: "MERN Stack",
    fullLabel: "MERN Lock",
    file: "services/inventory.ts",
    architectureNote: "Atomic conditional updates preventing double-booking races",
    verifyOutput: "✓ Atomic lock verified: 100 concurrent requests → 0 oversold",
    code: `export async function reserveBook(bookId: string, userId: string) {
  const item = await Book.findOneAndUpdate(
    { _id: bookId, stockCount: { $gt: 0 } },
    { $inc: { stockCount: -1 }, $push: { holds: { userId } } },
    { new: true }
  );
  if (!item) throw new Error("Out of stock");
  return item;
}`,
  },
  {
    id: "ai",
    label: "Agentic AI",
    fullLabel: "Agentic AI",
    file: "agents/runner.ts",
    architectureNote: "Deterministic schema validation around LLM tool calls",
    verifyOutput: "✓ Tool schema validated · Structured JSON output confirmed",
    code: `const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: userPrompt,
  config: {
    tools: [{ functionDeclarations: [queryDbTool, notifyTool] }],
    temperature: 0.1,
  },
});`,
  },
];

export const CASE_STUDIES = [
  {
    id: "learnhikmah-web",
    name: "LearnHikmah Platform",
    url: "https://learnhikmah.com",
    liveLabel: "Live Site ↗",
    repoUrl: null,
    repoLabel: "Private Monorepo",
    repoTooltip: "learnhikmah · Private organization monorepo engineered solo",
    role: "Solo Architect",
    stack: "Next.js · TS · HeroUI · Tailwind",
    cvSelected: true,
    defaultArchOpen: false,
    defaultExpanded: true,
    shortSummary:
      "Public education portal engineered solo in the private learnhikmah monorepo with fast SSR course catalogs.",
    expandedDetails:
      "Built for global reading performance with server-rendered curriculum pages, shared monorepo UI primitives, and sub-50ms edge caching.",
    summary:
      "Public education and community portal engineered solo inside the private learnhikmah monorepo with server-rendered pages and sub-50ms edge caching.",
    impact: "Sub-50ms edge cached course catalog & mobile-first reading layout.",
    architecture: {
      pipeline: ["Next.js App Router (SSR)", "Shared Monorepo UI & Types", "Edge Content Cache"],
      invariant: "Zero layout shift (CLS 0.00) · Server-streamed curriculum modules",
    },
  },
  {
    id: "learnhikmah-lms",
    name: "LearnHikmah LMS",
    url: "https://app.learnhikmah.com",
    liveLabel: "Live Site ↗",
    repoUrl: null,
    repoLabel: "Private Monorepo",
    repoTooltip: "learnhikmah · Private organization monorepo engineered solo",
    role: "Solo Full-Stack",
    stack: "Next.js · BetterAuth · RBAC",
    cvSelected: true,
    defaultArchOpen: true,
    defaultExpanded: true,
    shortSummary:
      "Dedicated learning management system in the learnhikmah monorepo with student dashboards and role-based permissions.",
    expandedDetails:
      "Enforces strict role isolation across students, instructors, and admins using BetterAuth session guards and atomic lesson progression tracking.",
    summary:
      "Dedicated learning management system in the learnhikmah private monorepo handling student dashboards, lesson progression, and strict RBAC permissions.",
    impact: "Strict role isolation across students, instructors, and admins.",
    architecture: {
      pipeline: ["BetterAuth Session Guard", "RBAC Policy Middleware", "Progress State Engine"],
      invariant: "Server-enforced route guards · Atomic lesson completion tracking",
    },
  },
  {
    id: "annujum-foundation",
    name: "An-Nujum Foundation",
    url: "https://an-nujum-foundation.vercel.app/",
    liveLabel: "Live Site ↗",
    repoUrl: "https://github.com/nymulislam/an-nujum-foundation",
    repoLabel: "Source Code ↗",
    repoTooltip: "View open-source repository on GitHub",
    role: "Lead Engineer",
    stack: "Next.js · TS · HeroUI · Supabase",
    cvSelected: true,
    defaultArchOpen: false,
    defaultExpanded: false,
    shortSummary:
      "Official web platform for An-Nujum Foundation managing charitable initiatives and transparent donation workflows.",
    expandedDetails:
      "Engineered with Next.js, TypeScript, HeroUI, and Supabase to streamline program publishing, donor transparency, and mobile-first community outreach.",
    summary:
      "Official web platform for An-Nujum Foundation built to manage charitable initiatives, transparent donation workflows, and community outreach programs.",
    impact: "Streamlined program publishing, donor transparency & mobile-first performance.",
    architecture: {
      pipeline: ["Next.js App Router & HeroUI", "BetterAuth Session Layer", "Supabase Database & RLS"],
      invariant: "Type-safe donation tracking & accessible bilingual-ready layout",
    },
  },
  {
    id: "balzo-financial",
    name: "Balzo Financial App",
    url: "https://github.com/nymulislam",
    liveLabel: "GitHub Org ↗",
    repoUrl: null,
    repoLabel: "balzo-app (Private)",
    repoTooltip: "balzo-app · Solo-engineered multi-financial mobile & web suite",
    role: "Solo Founder & Engineer",
    stack: "React Native · Supabase · BetterAuth",
    cvSelected: true,
    defaultArchOpen: false,
    defaultExpanded: false,
    shortSummary:
      "Multi-financial mobile application engineered solo under the balzo-app organization with an upcoming web suite.",
    expandedDetails:
      "Designed for unified multi-account ledger tracking using React Native/Expo, BetterAuth multi-session management, and Supabase Row-Level Security.",
    summary:
      "Multi-financial mobile application engineered solo under the balzo-app organization for unified multi-account tracking with an upcoming companion web app.",
    impact: "Shared TypeScript financial contracts across mobile and upcoming web clients.",
    architecture: {
      pipeline: ["React Native / Expo Client", "BetterAuth Multi-Session", "Supabase Ledger & RLS"],
      invariant: "Strict row-level security isolation per user financial account",
    },
  },
  {
    id: "epage-commerce",
    name: "E-Page Commerce",
    url: "https://e-page.vercel.app",
    liveLabel: "Live Site ↗",
    repoUrl: "https://github.com/nymulislam/e-page-client",
    repoLabel: "Source Code ↗",
    repoTooltip: "View MERN bookstore source repository on GitHub",
    role: "Full-Stack Engineer",
    stack: "React · Node · MongoDB",
    cvSelected: false,
    defaultArchOpen: false,
    defaultExpanded: false,
    shortSummary:
      "Full-stack MERN bookstore featuring instant catalog filtering, reactive cart persistence, and atomic inventory locks.",
    expandedDetails:
      "Prevents double-selling under concurrent checkout requests using conditional MongoDB atomic stock decrements and optimistic UI updates.",
    summary:
      "Full-stack MERN bookstore featuring instant catalog filtering, reactive cart persistence, and a friction-free checkout pipeline.",
    impact: "Race-condition-free inventory mutations & instant search filtering.",
    architecture: {
      pipeline: ["React Optimistic Cart", "Express REST API", "MongoDB Atomic Lock"],
      invariant: "Conditional stock decrement ($gt: 0) prevents double-selling",
    },
  },
  {
    id: "ilmmed-suite",
    name: "IlmMed & Web Suite",
    url: "https://ilm-med-solution.vercel.app/",
    liveLabel: "Live Site ↗",
    repoUrl: "https://github.com/nymulislam",
    repoLabel: "All 40 Repos ↗",
    repoTooltip: "Explore all 40 repositories & 2 organizations on GitHub",
    role: "Web Suite",
    stack: "React · Express · Tailwind",
    cvSelected: false,
    defaultArchOpen: false,
    defaultExpanded: false,
    shortSummary:
      "Production web suite spanning healthcare services (IlmMed), recruitment workflows (Job Heaven), and 40 GitHub repositories.",
    expandedDetails:
      "Architected with modular React views, normalized REST API clients, and resilient fallback states for low-bandwidth mobile networks.",
    summary:
      "Production web suite spanning healthcare services (IlmMed), recruitment workflows (Job Heaven), and interactive catalog apps across 40 GitHub repositories.",
    impact: "Clean component boundaries & resilient API error handling.",
    architecture: {
      pipeline: ["Modular React Views", "Normalized API Client", "Schema Validation"],
      invariant: "Graceful fallback states on slow 3G mobile networks",
    },
  },
];

export const EARLIER_BUILDS = [
  { name: "An-Nujum Foundation", url: "https://an-nujum-foundation.vercel.app/" },
  { name: "Job Heaven", url: "https://job-heaven.vercel.app/" },
  { name: "Car Universe", url: "https://car-universe.vercel.app/" },
  { name: "Training Ninja", url: "https://training-ninja.vercel.app/" },
];

export const EXPERIENCE_TIMELINE = [
  {
    id: "exp-learnhikmah",
    period: "2024 — Present",
    role: "Solo Full-Stack & Monorepo Architect",
    organization: "LearnHikmah (learnhikmah org)",
    location: "Remote · Dhaka",
    stack: "Next.js · TypeScript · BetterAuth · HeroUI · RBAC",
    shortSummary:
      "Architected the private learnhikmah monorepo powering both the public education portal and the RBAC learning management system.",
    summary:
      "Architected the private learnhikmah monorepo powering both the public education portal (learnhikmah.com) and the RBAC learning management system (app.learnhikmah.com).",
    highlights: [
      "Engineered a private monorepo architecture powering learnhikmah.com (SSR course portal) and app.learnhikmah.com (interactive LMS) solo from scratch.",
      "Implemented strict role-based access control (RBAC) across student, instructor, and admin views with BetterAuth, HeroUI, and atomic lesson progression tracking.",
    ],
  },
  {
    id: "exp-balzo",
    period: "2024 — Present",
    role: "Founder & Solo Mobile/Web Engineer",
    organization: "Balzo (balzo-app org)",
    location: "Dhaka",
    stack: "React Native · Expo · Next.js · Supabase · BetterAuth",
    shortSummary:
      "Building a multi-financial mobile application solo inside the balzo-app organization with Supabase, BetterAuth, and an upcoming web suite.",
    summary:
      "Building a multi-financial mobile application solo inside the balzo-app organization with Supabase, BetterAuth, and an upcoming companion web platform.",
    highlights: [
      "Architecting a multi-financial mobile application solo under the balzo-app organization using React Native/Expo, TypeScript, Supabase, and BetterAuth.",
      "Designing unified multi-account ledger schemas, row-level security (RLS) policies, and shared TypeScript contracts for the upcoming companion web app.",
    ],
  },
  {
    id: "exp-fullstack",
    period: "2023 — Present",
    role: "Full-Stack & AI Systems Engineer",
    organization: "An-Nujum Foundation & Open Source",
    location: "Dhaka",
    stack: "Next.js · Supabase · HeroUI · MERN · Agentic AI",
    shortSummary:
      "Delivered 40 repositories including the An-Nujum Foundation platform, E-Page MERN bookstore, and deterministic LLM tool-calling workflows.",
    summary:
      "Delivered 40 repositories including the An-Nujum Foundation platform, E-Page MERN bookstore, IlmMed web suite, and deterministic LLM tool-calling workflows.",
    highlights: [
      "Developed the An-Nujum Foundation platform for managing charitable initiatives, transparent donation workflows, and community outreach programs.",
      "Shipped 40 repositories spanning full-stack MERN commerce (E-Page with atomic inventory locks), healthcare/recruitment web suites (IlmMed, Job Heaven), and Agentic AI tools.",
    ],
  },
  {
    id: "exp-education",
    period: "Graduated 2025",
    role: "Takmil (Master's) & Hafiz-ul-Quran",
    organization: "Jamia Arabia Imdadul Uloom, Faridabad",
    location: "Dhaka",
    stack: "Haiyatul Ulya Board · Classical Logic (Mantiq) · Jurisprudence",
    shortSummary:
      "Completed Takmil (Master's in Islamic Studies & Arabic) in 2025 under the Al-Haiatul Ulya board alongside being Hafiz-ul-Quran.",
    summary:
      "Completed Takmil (Master's in Islamic Studies & Arabic) in 2025 under the Al-Haiatul Ulya board from Jamia Arabia Imdadul Uloom, Faridabad, alongside being Hafiz-ul-Quran and trained in formal logic at Jamia Rahmania.",
    highlights: [
      "Completed Takmil (Master's Equivalent in Islamic Studies & Arabic) in 2025 under Al-Haiatul Ulya Lil-Jamiatil Qawmia Bangladesh at Jamia Arabia Imdadul Uloom, Faridabad, Dhaka.",
      "Hafiz-ul-Quran with rigorous training in classical Arabic grammar (Nahw/Sarf) and formal syllogistic logic (Mantiq) at Jamia Rahmania Arabia, Dhaka.",
    ],
  },
];

export const EDUCATION_CREDENTIALS = [
  {
    id: "edu-takmil",
    degree: "Takmil (Master's in Islamic Studies & Classical Arabic) & Hafiz-ul-Quran",
    institution: "Jamia Arabia Imdadul Uloom, Faridabad, Dhaka",
    board: "Al-Haiatul Ulya Lil-Jamiatil Qawmia Bangladesh",
    year: "2025",
    details:
      "Post-graduate specialization in Hadith, Jurisprudence (Fiqh), and Arabic Literature; Certified Hafiz-ul-Quran.",
  },
  {
    id: "edu-rahmania",
    degree: "Higher Classical Arabic Grammar (Nahw/Sarf) & Formal Logic (Mantiq)",
    institution: "Jamia Rahmania Arabia, Dhaka",
    board: "Befaqul Madarisil Arabia Bangladesh",
    year: "2022",
    details:
      "Intensive training in formal syllogistic logic, classical deductive systems, and close textual analysis.",
  },
];

export const RESUME_SNAPSHOT = {
  executiveSummary:
    "Full-Stack Software Engineer across 40 repositories and 2 GitHub organizations (learnhikmah & balzo-app). Experienced in architecting fast, reliable web and mobile systems solo using Next.js (App Router), TypeScript, Supabase, BetterAuth, HeroUI, React Native, the MERN stack, and deterministic Agentic AI workflows.",
  skillGroups: [
    {
      category: "Frontend & UI",
      items: "Next.js (App Router, SSR), TypeScript, React 18, HeroUI, Tailwind CSS, Accessible UI",
    },
    {
      category: "Backend & Data",
      items: "Supabase (PostgreSQL, RLS), BetterAuth, Node.js, Express.js, MongoDB, REST APIs, RBAC",
    },
    {
      category: "Mobile, AI & Ops",
      items: "React Native / Expo (Balzo App), Monorepos, Agentic AI Tool Calling, Git, Vercel, Linux",
    },
  ],
};

export const FOUNDATION_CATEGORIES = [
  { id: "all", label: "All", shortLabel: "All" },
  { id: "logic", label: "Education & Logic", shortLabel: "Education" },
  { id: "architecture", label: "Systems & Stack", shortLabel: "Systems" },
  { id: "ai", label: "Agentic AI", shortLabel: "AI" },
  { id: "craft", label: "Engineering Craft", shortLabel: "Craft" },
];

export const FOUNDATIONS_INITIAL_LIMIT = 4;

export const FOUNDATIONS = [
  {
    id: "takmil-master",
    category: "logic",
    index: "01. Master's & Hifz",
    title: "Takmil (2025) & Hafiz-ul-Quran",
    meta: "Faridabad, Dhaka · Haiyatul Ulya",
    description:
      "Completed Takmil (Master's) in 2025 from Jamia Arabia Imdadul Uloom, Faridabad under Haiyatul Ulya board, alongside being Hafiz-ul-Quran.",
  },
  {
    id: "systems-craft",
    category: "architecture",
    index: "02. Modern Stack",
    title: "Next.js, Supabase & BetterAuth",
    meta: "HeroUI · TypeScript · MERN",
    description:
      "Engineering full-stack web & mobile apps across 40 repos and 2 orgs (learnhikmah & balzo-app) with Supabase, BetterAuth, and HeroUI.",
  },
  {
    id: "classical-logic",
    category: "logic",
    index: "03. Classical Logic",
    title: "Mantiq & Rule-Based Systems",
    meta: "Jamia Rahmania, Dhaka",
    description:
      "Trained in classical Arabic grammar (Nahw/Sarf) and formal logic (Mantiq)—the foundation of how I model strict TypeScript contracts.",
  },
  {
    id: "autonomous-workflows",
    category: "ai",
    index: "04. Agentic Workflows",
    title: "Practical Agentic AI",
    meta: "Tool Calling · JSON Schemas",
    description:
      "Connecting language models to deterministic tools, strict JSON schemas, and real application actions instead of chat wrappers.",
  },
  {
    id: "atomic-concurrency",
    category: "architecture",
    index: "05. Data Integrity",
    title: "Concurrency & RLS Security",
    meta: "Supabase RLS · MongoDB Locks",
    description:
      "Guarding financial ledgers, donations, and inventory holds with Supabase Row-Level Security and atomic database conditions.",
  },
  {
    id: "editorial-ux",
    category: "craft",
    index: "06. Human Interface",
    title: "Calm & Accessible Web Craft",
    meta: "HeroUI · Tailwind · Zero-Bloat",
    description:
      "Prioritizing crisp typography, fast initial server paint, and keyboard-first accessibility across desktop and mobile viewports.",
  },
];

export const ARTICLES = [
  {
    id: "auth-code",
    title: "How Does My Authenticator App Know The Code?",
    date: "Jul 31, 2026",
    readTime: "2 min read",
    takeaway: "Time + shared secret = identical 6-digit code on both phone and server without internet.",
    content: [
      "Every 30 seconds, your authenticator app shows a new 6-digit code—even when your phone is in airplane mode. How does the server know the exact same number without talking to your phone?",
      "When you first scan a setup QR code, the website shares a secret key with your phone. From that moment on, both your phone and the server look at the current clock time, divide it into 30-second slices, and run the same math formula (HMAC-SHA1) using that secret key.",
      "Because both clocks tell the same time, both sides calculate the exact same 6-digit number at the exact same moment. No network request needed.",
    ],
  },
  {
    id: "seat-race",
    title: "Who Sold My Seat Twice?",
    date: "Jul 18, 2026",
    readTime: "2 min read",
    takeaway: "Never check availability and update in two separate steps—use a single atomic database lock.",
    content: [
      "Imagine one concert seat is left. Two people click 'Buy' at the exact same millisecond. If your server checks 'is the seat free?' and then marks it sold in a second step, both users will pass the check and buy the same seat.",
      "To fix this, database updates must be atomic. Instead of reading first and writing later, you ask the database to mark the seat as sold only if it is currently free—in one single locked operation.",
      "The first request wins the lock; the second request immediately sees zero seats left and fails safely.",
    ],
  },
  {
    id: "proxy-server",
    title: "A tale of proxy server",
    date: "Feb 14, 2024",
    readTime: "2 min read",
    takeaway: "A forward proxy hides the user; a reverse proxy protects and scales the server.",
    content: [
      "When you visit a modern website, you rarely talk directly to the application server. Instead, you talk to a reverse proxy like Nginx or Cloudflare.",
      "Think of a reverse proxy as a calm receptionist. It handles SSL encryption, blocks bad traffic, serves cached files, and forwards real work to healthy backend servers.",
      "If one backend server crashes, the proxy quietly routes visitors to another one so nobody notices a thing.",
    ],
  },
  {
    id: "bloom-filter",
    title: "Probabilistic Data Structures: Bloom filter",
    date: "Feb 7, 2024",
    readTime: "2 min read",
    takeaway: "A Bloom filter tells you 'definitely not here' or 'probably here' using just a few megabytes.",
    content: [
      "Checking whether a username exists in a list of 1 billion users can eat gigabytes of RAM if you store every single string in memory.",
      "A Bloom filter uses a tiny row of bits (0s and 1s) and a few fast hash functions. When a username is added, it flips a few specific bits to 1.",
      "Later, if any of those bits is still 0, you know immediately the username is 100% free—without ever touching the slow disk database.",
    ],
  },
];

export const DEV_COMMANDS = {
  stack: {
    cmd: "naymul --stack",
    output: "Next.js · TypeScript · Supabase · BetterAuth · HeroUI · React Native · MERN · Agentic AI",
  },
  orgs: {
    cmd: "naymul --orgs",
    output: "learnhikmah (Private LMS Monorepo) · balzo-app (Multi-Financial Mobile & Web App) · 40 Repos",
  },
  status: {
    cmd: "naymul --status",
    output: `${PROFILE.hiringStatus} · Dhaka (UTC+6)`,
  },
  contact: {
    cmd: "naymul --contact",
    output: `${PROFILE.email} · github.com/nymulislam · ${PROFILE.phoneFormatted}`,
  },
};
