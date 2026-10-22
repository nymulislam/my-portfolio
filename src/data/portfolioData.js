/**
 * ============================================================================
 * MASTER PORTFOLIO DATA STORE (Single Source of Truth)
 * ============================================================================
 * Edit this file to update contact details, hiring status, hero code snippets,
 * case studies, experience timeline, foundations, or writing essays without touching UI code.
 */

export const PROFILE = {
  name: "Naymul Islam",
  shortName: "Naymul",
  role: "Full-Stack & AI Engineer",
  hiringStatus: "Open to Full-Stack & AI Engineer roles (Remote or Dhaka)",
  tagline: "Solo LMS & Commerce Architect",
  location: "Dhaka, Bangladesh",
  bio: "I build fast web applications and practical AI workflows. I care about clean architecture, simple code, and systems that hold up under real load.",
  email: "naymulislam241@gmail.com",
  phone: "+8801822667737",
  phoneFormatted: "+880 182-2667737",
  whatsappUrl: "https://wa.me/8801822667737",
  githubUrl: "https://github.com/nymulislam",
  linkedinUrl: "https://linkedin.com/in/nymulislam",
  resumeUrl: "https://t.ly/aR09W",
  repoCount: "84+",
};

export const STACK_PLAYGROUND = [
  {
    id: "nextjs",
    label: "Next.js",
    fullLabel: "Next.js SSR",
    file: "app/courses/[slug]/page.tsx",
    architectureNote: "Streaming SSR with parallel fetching & zero client waterfall",
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
    id: "typescript",
    label: "TypeScript",
    fullLabel: "TypeScript",
    file: "lib/contracts/result.ts",
    architectureNote: "Discriminated unions eliminating unhandled runtime errors",
    verifyOutput: "✓ Strict null & exhaustive switch check passed (0 implicit any)",
    code: `export type ActionState<T> =
  | { ok: true; data: T; timestamp: number }
  | { ok: false; code: "UNAUTHORIZED" | "CONFLICT" };

export function verifySession(user: User | null): ActionState<User> {
  if (!user) return { ok: false, code: "UNAUTHORIZED" };
  return { ok: true, data: user, timestamp: Date.now() };
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
    repoUrl: null,
    repoLabel: "Private Org",
    role: "Solo Architect",
    stack: "Next.js · TS · Tailwind",
    defaultArchOpen: false,
    summary:
      "Public education and community portal engineered solo. Built for fast global reading with server-rendered pages and clean typography.",
    impact: "Sub-50ms edge cached course catalog & mobile-first reading layout.",
    architecture: {
      pipeline: ["Next.js App Router (SSR)", "Edge Content Cache", "Structured Course Schema"],
      invariant: "Zero layout shift (CLS 0.00) · Server-streamed curriculum modules",
    },
  },
  {
    id: "learnhikmah-lms",
    name: "LearnHikmah LMS",
    url: "https://app.learnhikmah.com",
    repoUrl: null,
    repoLabel: "Private Org",
    role: "Solo Full-Stack",
    stack: "Next.js · Node · RBAC",
    defaultArchOpen: true,
    summary:
      "Dedicated learning management system in a private organization. Handles student dashboards, lesson progression, and role-based permissions.",
    impact: "Strict role isolation across students, instructors, and admins.",
    architecture: {
      pipeline: ["Session Auth Guard", "RBAC Policy Middleware", "Progress State Engine"],
      invariant: "Server-enforced route guards · Atomic lesson completion tracking",
    },
  },
  {
    id: "epage-commerce",
    name: "E-Page Commerce",
    url: "https://e-page.vercel.app",
    repoUrl: "https://github.com/nymulislam/e-page-client",
    repoLabel: "Source ↗",
    role: "Top Pinned",
    stack: "React · Node · MongoDB",
    defaultArchOpen: false,
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
    repoUrl: "https://github.com/nymulislam",
    repoLabel: "Source ↗",
    role: "Web Suite",
    stack: "React · Express · REST",
    defaultArchOpen: false,
    summary:
      "Production web suite spanning healthcare services (IlmMed), recruitment workflows (Job Heaven), and interactive catalog apps.",
    impact: "Clean component boundaries & resilient API error handling.",
    architecture: {
      pipeline: ["Modular React Views", "Normalized API Client", "Schema Validation"],
      invariant: "Graceful fallback states on slow 3G mobile networks",
    },
  },
];

export const EARLIER_BUILDS = [
  { name: "Job Heaven", url: "https://job-heaven.vercel.app/" },
  { name: "Car Universe", url: "https://car-universe.vercel.app/" },
  { name: "Training Ninja", url: "https://training-ninja.vercel.app/" },
];

export const EXPERIENCE_TIMELINE = [
  {
    id: "exp-learnhikmah",
    period: "2024 — Present",
    role: "Solo Full-Stack & LMS Architect",
    organization: "LearnHikmah (Production EdTech)",
    location: "Dhaka · Remote",
    stack: "Next.js · TypeScript · Node.js · RBAC",
    highlights: [
      "Architected and shipped both the public education portal (learnhikmah.com) and the private organization LMS (app.learnhikmah.com) solo from scratch.",
      "Engineered role-based access control (RBAC) across student, instructor, and admin views with atomic lesson progression tracking.",
    ],
  },
  {
    id: "exp-fullstack",
    period: "2023 — Present",
    role: "Full-Stack & AI Systems Engineer",
    organization: "Independent Product & Open-Source Builds",
    location: "Dhaka, Bangladesh",
    stack: "React · Next.js · Express · MongoDB · Agentic AI",
    highlights: [
      "Built and deployed 84+ repositories spanning full-stack MERN commerce (E-Page), healthcare & recruitment platforms (IlmMed, Job Heaven), and developer tools.",
      "Designed deterministic LLM tool-calling workflows using structured JSON schemas and low-latency API orchestration.",
    ],
  },
  {
    id: "exp-education",
    period: "Foundational Training",
    role: "Classical Arabic Logic (Mantiq) & Jurisprudence",
    organization: "Jamia Rahmania Arabia, Dhaka",
    location: "Dhaka, Bangladesh",
    stack: "Formal Logic · Nahw/Sarf · Analytical Systems",
    highlights: [
      "Completed rigorous training in classical Arabic grammar (Nahw/Sarf), formal syllogistic logic (Mantiq), and close textual analysis.",
      "Translated classical rule-based reasoning directly into strict TypeScript contracts, state machines, and clean software boundaries.",
    ],
  },
];

export const RESUME_SNAPSHOT = {
  executiveSummary:
    "Full-Stack Software Engineer & Solo LMS Architect based in Dhaka, Bangladesh. Experienced in designing, building, and operating end-to-end web systems using Next.js (App Router), TypeScript, the MERN stack, and deterministic Agentic AI workflows.",
  skillGroups: [
    {
      category: "Frontend & SSR",
      items: "Next.js (App Router), TypeScript, React 18, Tailwind CSS, State Architecture, Accessible UI",
    },
    {
      category: "Backend & Data",
      items: "Node.js, Express.js, MongoDB (Atomic Concurrency), REST APIs, Session & RBAC Auth",
    },
    {
      category: "AI & Tooling",
      items: "Agentic AI Workflows, Gemini API Function Calling, Structured JSON Schemas, Git, Vercel, Linux",
    },
  ],
};

export const FOUNDATION_CATEGORIES = [
  { id: "all", label: "All", shortLabel: "All" },
  { id: "logic", label: "Logic & Studies", shortLabel: "Logic" },
  { id: "architecture", label: "Systems & Stack", shortLabel: "Systems" },
  { id: "ai", label: "Agentic AI", shortLabel: "AI" },
  { id: "craft", label: "Engineering Craft", shortLabel: "Craft" },
];

export const FOUNDATIONS_INITIAL_LIMIT = 4;

export const FOUNDATIONS = [
  {
    id: "classical-logic",
    category: "logic",
    index: "01. Classical Logic",
    title: "Islamic Studies & Classical Arabic",
    meta: "Jamia Rahmania, Dhaka",
    description:
      "Years of training in classical Arabic grammar (Nahw/Sarf), formal logic (Mantiq), and close textual analysis—the foundation of how I model strict software rules today.",
  },
  {
    id: "systems-craft",
    category: "architecture",
    index: "02. Systems Craft",
    title: "Modern Full-Stack Architecture",
    meta: "Next.js · TypeScript · MERN",
    description:
      "Designing end-to-end web systems with clear data models, predictable server-client boundaries, and zero unnecessary complexity.",
  },
  {
    id: "autonomous-workflows",
    category: "ai",
    index: "03. Agentic Workflows",
    title: "Practical Agentic AI",
    meta: "Tool Calling · JSON Schemas",
    description:
      "Connecting language models to deterministic tools, strict JSON schemas, and real application actions instead of generic chat wrappers.",
  },
  {
    id: "first-principles",
    category: "craft",
    index: "04. First Principles",
    title: "Paper Before Keyboard",
    meta: "Architecture Discipline",
    description:
      "Mapping entity relationships, state machines, and edge cases in a physical notebook before writing the first line of production code.",
  },
  {
    id: "atomic-concurrency",
    category: "architecture",
    index: "05. Data Integrity",
    title: "Concurrency & Atomic State",
    meta: "MongoDB · REST · Idempotency",
    description:
      "Guarding critical state mutations—like inventory holds, course enrollments, and role transitions—with single-step atomic database conditions.",
  },
  {
    id: "editorial-ux",
    category: "craft",
    index: "06. Human Interface",
    title: "Calm & Accessible Web Craft",
    meta: "Responsive · Zero-Bloat UI",
    description:
      "Building interfaces that respect reader attention across every screen size—prioritizing crisp typography, fast initial paint, and keyboard accessibility.",
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
    output: "Next.js · TypeScript · React · Node.js · MongoDB · Agentic AI",
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
