interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

interface ProjectLink {
  label: string;
  href: string;
  kind: "live" | "github" | "profile";
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  layer: "client" | "orchestration" | "data" | "ai";
}

export interface FeaturedProject {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: "AI & RAG" | "MCP & Agentic" | "Full-Stack" | "Enterprise ERP";
  year: string;
  image: string;
  summary: string;
  problem: string;
  solution: string;
  engineeringDecisions: string[];
  metrics: ProjectMetric[];
  tech: string[];
  links: ProjectLink[];
  architecture: ArchitectureNode[];
  featuredTag: string;
}

interface AdditionalProject {
  name: string;
  fileCode: string;
  category: "Full-Stack" | "Trading & Data" | "Utilities";
  tags: string[];
  image: string;
  focus: string;
  href: string;
  featured?: boolean;
}

interface ExperienceItem {
  id: string;
  index: string;
  role: string;
  company: string;
  period: string;
  locationOrMode: string;
  image: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
}

interface ConsoleLine {
  kind: "comment" | "keyval" | "pass" | "metric" | "code";
  label?: string;
  value: string;
  note?: string;
}

interface AiWorkflowStage {
  id: string;
  step: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  tools: string[];
  command: string;
  terminalTitle: string;
  artifactTitle: string;
  artifactLanguage: string;
  statusLine: string;
  readableFlow: {
    input: string;
    process: string;
    verified: string;
  };
  consoleLines: ConsoleLine[];
  artifactLines: string[];
  outcome: string;
}

interface SkillGroup {
  id: string;
  filterKey: string;
  badge: string;
  label: string;
  description: string;
  items: string[];
}

interface LeadershipItem {
  role: string;
  organization: string;
  period: string;
  summary: string;
  link?: string;
}

export const PROFILE = {
  fullName: "M. Vicky Mosafan",
  displayName: "Vicky Mosafan",
  roleTitle: "Full-Stack Web Developer & AI-Augmented Engineer",
  shortRole: "Full-Stack Developer",
  location: "Situbondo, East Java, Indonesia",
  availability: "Open to Full-Stack, Frontend & Backend Roles",
  email: "mvickymosafan@gmail.com",
  phone: "+62 851-7955-6798",
  phoneHref: "tel:+6285179556798",
  cvPdfPath: "/CV-M-Vicky-Mosafan.pdf",
  heroHeadlineTop: "Full-Stack Craft.",
  heroHeadlineMid: "AI-Augmented Speed.",
  heroHeadlineAccent: "Reliable Production.",
  summary:
    "Writing code faster with AI is easy. Keeping it clean, secure, and reliable in production is the real engineering challenge. I am Vicky Mosafan, a Full-Stack Web Developer pairing Next.js, NestJS/Express, TypeScript, Prisma, and PostgreSQL with disciplined AI workflows.",
  aboutEyebrow: "ABOUT ME",
  aboutHeadline: "Classic Software Fundamentals, Paired with Craftrig MCP",
  aboutStory:
    "I am a Full-Stack Web Developer (Next.js, NestJS/Express, TypeScript, Prisma, PostgreSQL) who pairs classic software fundamentals with AI-augmented workflows. Every project starts with structured PRDs, database ERDs, and clear module boundaries, never blind prompting.",
  aboutParagraphs: [
    "I am a Full-Stack Web Developer (Next.js, NestJS/Express, TypeScript, Prisma, PostgreSQL) who pairs classic software fundamentals with AI-augmented workflows. Every project starts with structured PRDs, database ERDs, and clear module boundaries, never blind prompting.",
    "To make that workflow truly dependable day to day, I built Craftrig, an open-source TypeScript MCP server that I rely on across my own projects. It keeps AI agents like Claude Code and Google Antigravity aligned through dependency-ordered task plans, file write locks, and automated Playwright browser and accessibility audits, turning AI assistance into repeatable engineering output.",
    "That same discipline carries directly into projects like BuildFlow ERP and NexaPip Marketplace, from architecting a 12-module construction ERP (BOQ costing, 3-way procurement, and double-entry finance) to building a full-stack MT5 Expert Advisor marketplace.",
  ],
  aboutShortBio:
    "B.S. in Information Systems, Universitas Muhammadiyah Jember (GPA 3.94/4.00). Full-Stack Web Developer pairing Next.js, NestJS/Express, TypeScript, Prisma, and PostgreSQL with Craftrig MCP for structured plans, file locks, and Playwright QA.",
  motto: "Structure first. Verify everything. Ship cleanly.",
  socials: {
    github: "https://github.com/vickyymosafan",
    linkedin: "https://www.linkedin.com/in/vickymosafan/",
    craftrig: "https://github.com/vickyymosafan/mcp-craftrig",
    generalPortfolio: "https://vickylabs.vercel.app",
    portfolio3d: "https://iamvicky.vercel.app",
    mql5: "https://www.mql5.com/en/users/vickymosafan",
    googleSkills:
      "https://www.skills.google/public_profiles/9bc91f79-a2fd-4b45-88ba-bd3f6da6acb3",
    portfolio: "https://vickylabs.vercel.app",
    himaforsi: "https://www.instagram.com/himaforsi_umjember/",
  },
  heroProofMetrics: [
    {
      value: "2+",
      label: "Years Hands-On",
      sub: "Full-Stack & AI",
    },
    {
      value: "8",
      label: "Flagship Systems",
      sub: "ERP, Marketplace & MCP",
    },
    {
      value: "3.94",
      label: "GPA / 4.00",
      sub: "Info Systems · UMJ",
    },
  ],
  journeyHighlights: [
    { value: "12", label: "ERP Modules" },
    { value: "50/50", label: "Craftrig Tests" },
    { value: "91.67%", label: "RAG Recall" },
  ],
  coreStackPills: [
    "Next.js",
    "React",
    "TypeScript",
    "NestJS",
    "Express",
    "PostgreSQL",
    "Prisma",
    "Redis",
    "Playwright",
  ],
} as const;

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "hybrid-rag-thesis",
    index: "01",
    title: "Hybrid Retrieval Academic Chatbot",
    subtitle: "Undergraduate Thesis · Weighted RRF RAG Engine",
    category: "AI & RAG",
    year: "2026",
    image: "/images/redesign/proj-hybrid-rag.jpg",
    featuredTag: "91.67% Recall · 26× Cache Speedup",
    summary:
      "Academic assistant PWA pairing semantic vector search with BM25 keyword reranking and Redis caching so students get cited answers in under a second.",
    problem:
      "Dense semantic search alone frequently missed exact course codes and academic policy clauses, while uncached LLM calls took ~18.3 seconds per answer.",
    solution:
      "Built an n8n hybrid retrieval pipeline pulling top-50 semantic chunks from Supabase pgvector, reranking with BM25 via weighted Reciprocal Rank Fusion (wRRF) for Cohere Aya 32B, backed by Redis caching and a Next.js 16 PWA with voice input.",
    engineeringDecisions: [
      "Benchmarked 3 retrieval setups on real university documents: raised Recall from 75% to 91.67% and MRR from 0.71 to 1.00 using wRRF.",
      "Added Redis response caching + session memory, cutting median latency from 18.3s down to 694ms (~26× faster).",
      "Shipped a mobile-ready Next.js 16 PWA with Supabase chat history, speech-to-text input, and guided onboarding.",
    ],
    metrics: [
      { label: "Recall", value: "91.67%", detail: "up from 75.0%" },
      { label: "MRR Score", value: "1.00", detail: "up from 0.71" },
      { label: "Cached Latency", value: "694ms", detail: "26× vs 18.3s" },
    ],
    tech: ["Next.js 16", "Supabase pgvector", "BM25 + wRRF", "Redis", "n8n", "Cohere Aya 32B"],
    links: [
      { label: "Live Demo", href: "https://ai-smartchat.vercel.app/", kind: "live" },
      {
        label: "GitHub",
        href: "https://github.com/vickyymosafan/FullStack_ai-smartchat",
        kind: "github",
      },
    ],
    architecture: [
      { id: "ui", label: "Next.js 16 PWA", sublabel: "Voice + History", layer: "client" },
      { id: "ret", label: "pgvector + BM25", sublabel: "Top-50 → wRRF", layer: "data" },
      { id: "llm", label: "Cohere Aya 32B", sublabel: "Top-5 Context", layer: "ai" },
      { id: "cache", label: "Redis Cache", sublabel: "694ms Fast Path", layer: "orchestration" },
    ],
  },
  {
    id: "beyond-rag",
    index: "02",
    title: "Beyond RAG: Agentic Search Platform",
    subtitle: "Multi-Hop Retrieval & Self-Critic Verification",
    category: "AI & RAG",
    year: "2026",
    image: "/images/redesign/proj-beyond-rag.jpg",
    featuredTag: "Self-Critic Loop · 4-LLM Fallback",
    summary:
      "Edge-deployed AI document engine that breaks complex questions into sub-queries, checks its own citations, and fails over across 4 LLM providers automatically.",
    problem:
      "Single-pass RAG chatbots struggle with multi-step analytical questions and break silently whenever one LLM API hits rate limits.",
    solution:
      "Engineered an edge API on Cloudflare Workers + Hono with Neon PostgreSQL, multi-provider LLM fallback (Gemini, Groq, Cohere, OpenRouter), admin PDF/DOCX ingestion, and a citation-aware Next.js chat interface.",
    engineeringDecisions: [
      "Built query rewriting, multi-hop decomposition, reranking, and a self-critic loop that flags and repairs ungrounded claims.",
      "Wired automatic 4-provider failover (Gemini → Groq → Cohere → OpenRouter) with edge rate limiting and response caching.",
      "Delivered virtualized chat history, inline citations, Markdown/LaTeX math rendering, and PDF/DOCX upload workflows.",
    ],
    metrics: [
      { label: "Runtime", value: "Edge", detail: "Cloudflare Workers" },
      { label: "LLM Providers", value: "4×", detail: "Automatic fallback" },
      { label: "Ingestion", value: "PDF/DOCX", detail: "Admin pipeline" },
    ],
    tech: ["Cloudflare Workers", "Hono", "Neon Postgres", "Next.js", "Multi-LLM", "LaTeX"],
    links: [
      {
        label: "Backend Repo",
        href: "https://github.com/vickyymosafan/BE_Beyond-RAG-Artificial-Super-Intelligence",
        kind: "github",
      },
      {
        label: "Frontend Repo",
        href: "https://github.com/vickyymosafan/FE_Beyond-RAG-Artificial-Super-Intelligence",
        kind: "github",
      },
    ],
    architecture: [
      { id: "chat", label: "Next.js Chat UI", sublabel: "Citations + LaTeX", layer: "client" },
      { id: "edge", label: "Hono @ Workers", sublabel: "Rewrite + Multi-Hop", layer: "orchestration" },
      { id: "critic", label: "Self-Critic Loop", sublabel: "Grounding Check", layer: "ai" },
      { id: "neon", label: "Neon Postgres", sublabel: "4-LLM Fallback", layer: "data" },
    ],
  },
  {
    id: "mcp-craftrig",
    index: "03",
    title: "Craftrig MCP Governance Rig",
    subtitle: "vickyymosafan/mcp-craftrig · Multi-Agent Orchestrator",
    category: "MCP & Agentic",
    year: "2026",
    image: "/images/redesign/proj-mcp-craftrig.jpg",
    featuredTag: "MCP SDK v2 · 50/50 Tests · 13-VP QA",
    summary:
      "Open-source TypeScript MCP server I rely on across my own projects to keep Claude Code and Google Antigravity aligned with dependency-ordered task plans, file write locks, and Playwright browser and accessibility audits.",
    problem:
      "Autonomous coding agents often drift off-spec, overwrite each other's files, or claim UI checks passed without ever inspecting a live browser.",
    solution:
      "Built Craftrig MCP (Strict TypeScript, MCP SDK v2, Node 22+, 50/50 passing tests) with Kahn critical-path DAG scheduling, lease-based file locks, SQLite WAL evidence gates, and automated 13-viewport Playwright responsive & WCAG contrast QA.",
    engineeringDecisions: [
      "Implemented Kahn topological critical-path scheduling so parallel agents execute high-impact work without race conditions.",
      "Added exclusive path-level write locks with stale lease recovery and SQLite WAL evidence gates requiring real test proof.",
      "Built automated 13-viewport responsive, dual-theme contrast, and interaction audits directly inside the MCP workflow.",
    ],
    metrics: [
      { label: "MCP Core", value: "22+ Tools", detail: "Task DAG, locks & QA" },
      { label: "Test Suite", value: "50/50", detail: "Strict TypeScript" },
      { label: "QA Matrix", value: "13 VPs", detail: "320px → 1920px" },
    ],
    tech: ["TypeScript", "MCP SDK v2", "Playwright", "SQLite WAL", "Topological DAG", "Node 22"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/vickyymosafan/mcp-craftrig",
        kind: "github",
      },
      {
        label: "Visual QA MCP",
        href: "https://github.com/vickyymosafan/mcp_threejs-visual-qa",
        kind: "github",
      },
    ],
    architecture: [
      { id: "agent", label: "Claude / Antigravity", sublabel: "Parallel Subagents", layer: "ai" },
      { id: "dag", label: "Craftrig DAG + Locks", sublabel: "Kahn Critical Path", layer: "orchestration" },
      { id: "qa", label: "Playwright 13-VP", sublabel: "Dual-Theme A11y QA", layer: "client" },
      { id: "gate", label: "Evidence Gate", sublabel: "SQLite WAL + Brotli", layer: "data" },
    ],
  },
  {
    id: "buildflow-erp",
    index: "04",
    title: "BuildFlow Construction ERP",
    subtitle: "vickyymosafan/fullstack_buildflow-erp · 12-Module Platform",
    category: "Enterprise ERP",
    year: "2026",
    image: "/images/redesign/proj-buildflow-erp.jpg",
    featuredTag: "12 Vertical Slices · Outbox Pattern",
    summary:
      "Modular monolith ERP tailored for mid-size contractors (50–300 staff) unifying BOQ cost baselines, 3-way procurement, warehouse stock, and double-entry accounting.",
    problem:
      "Construction firms lose visibility when field logs, BOQ budgets, purchase orders, and ledgers live in disconnected spreadsheets.",
    solution:
      "Architected a 12-module Next.js 15 + NestJS CQRS modular monolith backed by PostgreSQL 16, Prisma/Drizzle, Redis 7 + BullMQ transactional outbox queues, S3/R2 document vaults, and offline PWA daily site reporting.",
    engineeringDecisions: [
      "Separated 12 vertical slices: Multi-Tenant RBAC, CRM, Project WBS, BOQ/RAB Costing, 3-Way Procurement, Stock Ledger, Double-Entry GL, HR Timesheets, Offline Site Ops, Docs, QC/HSE Safety, and Executive BI.",
      "Used Redis 7 + BullMQ transactional outbox queues for reliable event propagation across procurement, stock, and accounting.",
      "Locked full architecture contracts up front: ERD, OpenAPI spec, module boundaries, and RBAC security matrix.",
    ],
    metrics: [
      { label: "Domain Modules", value: "12", detail: "Vertical Slices" },
      { label: "Procurement", value: "3-Way", detail: "PO · GR · Invoice" },
      { label: "Async Engine", value: "Outbox", detail: "Redis 7 + BullMQ" },
    ],
    tech: ["Next.js 15", "NestJS CQRS", "PostgreSQL 16", "Redis + BullMQ", "Prisma", "Turborepo"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/vickyymosafan/fullstack_buildflow-erp",
        kind: "github",
      },
    ],
    architecture: [
      { id: "web", label: "Next.js 15 + shadcn", sublabel: "12 Modules + PWA", layer: "client" },
      { id: "api", label: "NestJS CQRS API", sublabel: "OpenAPI + RBAC", layer: "orchestration" },
      { id: "queue", label: "BullMQ Outbox", sublabel: "Redis 7 Events", layer: "ai" },
      { id: "db", label: "PostgreSQL 16 + S3", sublabel: "Double-Entry Ledger", layer: "data" },
    ],
  },
  {
    id: "arven-ecommerce",
    index: "05",
    title: "Arven Luxury E-Commerce",
    subtitle: "D2C Fashion Storefront & Atomic Checkout Engine",
    category: "Full-Stack",
    year: "2026",
    image: "/images/redesign/proj-arven-ecommerce.jpg",
    featuredTag: "Atomic Inventory · Midtrans Webhooks",
    summary:
      "End-to-end luxury D2C fashion platform engineered with atomic inventory locks and idempotent Midtrans payment processing to survive high-traffic drops.",
    problem:
      "Limited luxury product releases risk overselling during concurrent checkouts and duplicate order states when payment webhooks retry.",
    solution:
      "Built a pnpm + Turborepo monorepo combining a Next.js storefront & admin dashboard, NestJS commerce API, PostgreSQL + Prisma, Redis/BullMQ queues, Midtrans adapter, and RBAC security controls.",
    engineeringDecisions: [
      "Implemented atomic stock reservation windows so concurrent checkouts can never oversell limited SKU inventory.",
      "Added idempotency keys on Midtrans webhooks paired with a transactional outbox for dependable order fulfillment.",
      "Documented complete business & technical PRDs, RBAC policies, and CI pipelines across the monorepo.",
    ],
    metrics: [
      { label: "Checkout Safety", value: "Atomic", detail: "Stock reservation" },
      { label: "Payments", value: "Midtrans", detail: "Idempotent webhook" },
      { label: "Monorepo", value: "Turbo", detail: "Storefront + Admin" },
    ],
    tech: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Redis / BullMQ", "Midtrans"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/vickyymosafan/arven-ecommerce",
        kind: "github",
      },
    ],
    architecture: [
      { id: "store", label: "Next.js Storefront", sublabel: "Catalog + Admin", layer: "client" },
      { id: "nest", label: "NestJS Commerce", sublabel: "Atomic Stock Lock", layer: "orchestration" },
      { id: "pay", label: "Midtrans Adapter", sublabel: "Idempotent Hooks", layer: "ai" },
      { id: "pg", label: "Prisma + BullMQ", sublabel: "Transactional Outbox", layer: "data" },
    ],
  },
  {
    id: "digital-posyandu",
    index: "06",
    title: "Digital Posyandu Healthcare PWA",
    subtitle: "Offline-First Elderly Health Monitoring · UM Jember",
    category: "Full-Stack",
    year: "2026",
    image: "/images/redesign/proj-digital-posyandu.jpg",
    featuredTag: "Offline-First PWA · Tested REST API",
    summary:
      "Community health web app enabling Posyandu cadres to record elderly biometrics offline with automatic clinical risk classification and trend dashboards.",
    problem:
      "Community health cadres frequently work in areas with unreliable mobile signal while classifying blood pressure, glucose, and cholesterol by hand on paper.",
    solution:
      "Delivered a Next.js + Dexie IndexedDB offline-first PWA with Recharts trend visualizations connected to a hardened Express.js + TypeScript + Prisma + PostgreSQL REST API.",
    engineeringDecisions: [
      "Hardened backend with httpOnly cookie JWT auth, Admin/Petugas RBAC, Zod schema validation, and request rate limiting.",
      "Covered critical API endpoints with automated Jest and Supertest integration tests.",
      "Built Dexie IndexedDB local caching so checkups keep working offline and sync smoothly once reconnected.",
    ],
    metrics: [
      { label: "Biometrics", value: "5+", detail: "Auto-classification" },
      { label: "Offline Sync", value: "Dexie", detail: "IndexedDB PWA" },
      { label: "API QA", value: "Jest", detail: "+ Supertest + Zod" },
    ],
    tech: ["Next.js", "Express.js", "TypeScript", "Prisma", "PostgreSQL", "Dexie PWA"],
    links: [
      {
        label: "Live Demo",
        href: "https://fe-posyandu-digital.vercel.app/",
        kind: "live",
      },
      {
        label: "Frontend",
        href: "https://github.com/vickyymosafan/fe_posyandu-digital",
        kind: "github",
      },
      {
        label: "Backend",
        href: "https://github.com/vickyymosafan/be_posyandu-digital",
        kind: "github",
      },
    ],
    architecture: [
      { id: "pwa", label: "Next.js + Dexie", sublabel: "Offline-First PWA", layer: "client" },
      { id: "rest", label: "Express + TS API", sublabel: "Zod + Rate Limit", layer: "orchestration" },
      { id: "auth", label: "httpOnly JWT", sublabel: "Admin / Petugas", layer: "ai" },
      { id: "db", label: "Prisma + Postgres", sublabel: "Jest/Supertest QA", layer: "data" },
    ],
  },
  {
    id: "destino-copytrade",
    index: "07",
    title: "Destino Copytrade Portal",
    subtitle: "Financial Transparency Platform & Risk Simulator",
    category: "Full-Stack",
    year: "2026",
    image: "/images/redesign/proj-destino-copytrade.jpg",
    featuredTag: "Next.js 16 · Live Feeds & Risk Calc",
    summary:
      "5-page client portal for a TMGM copytrading partner delivering live market tickers, verified Myfxbook performance tables, and an interactive lot-sizing calculator.",
    problem:
      "Investors needed clear, verifiable historical PnL reporting and risk simulation that stays online even when third-party market APIs lag.",
    solution:
      "Shipped 5 responsive pages (Home, Strategies, Performance Ledger, Risk Calculator, Testimonials) in Next.js 16, React 19, and Tailwind CSS 4 backed by resilient API routes with deterministic fallbacks.",
    engineeringDecisions: [
      "Engineered Next.js API routes for live market tickers and Myfxbook feeds with automatic fallback snapshots for 100% availability.",
      "Built an interactive risk & multiplier calculator giving instant drawdown and lot-sizing estimates.",
      "Structured mobile-friendly financial ledger tables and smooth transitions across all 5 routes.",
    ],
    metrics: [
      { label: "Routes", value: "5", detail: "Thematic pages" },
      { label: "Data Feed", value: "Live", detail: "Myfxbook + fallback" },
      { label: "Stack", value: "Next 16", detail: "React 19 + TW 4" },
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "API Routes", "Myfxbook"],
    links: [
      {
        label: "Live Website",
        href: "https://destinocopytrade.com/",
        kind: "live",
      },
    ],
    architecture: [
      { id: "pages", label: "5 Thematic Pages", sublabel: "Responsive Portal", layer: "client" },
      { id: "calc", label: "Risk Calculator", sublabel: "Multiplier Engine", layer: "ai" },
      { id: "api", label: "Next.js Routes", sublabel: "Ticker + Myfxbook", layer: "orchestration" },
      { id: "fb", label: "Fallback Dataset", sublabel: "Zero-Downtime UI", layer: "data" },
    ],
  },
  {
    id: "nexapip-marketplace",
    index: "08",
    title: "NexaPip Marketplace",
    subtitle: "vickyymosafan/nexapip-marketplace · MT5 Expert Advisor Store",
    category: "Full-Stack",
    year: "2026",
    image: "/images/redesign/proj-nexapip-marketplace.jpg",
    featuredTag: "Lifetime IDR · SHA-256 .ex5 Vault",
    summary:
      "Full-stack Indonesian MetaTrader 5 Expert Advisor marketplace built with Next.js 16, Prisma 7, and PostgreSQL, pairing one-time lifetime IDR checkout via Mayar with a SHA-256 verified .ex5 vault.",
    problem:
      "Indonesian traders buy EAs through scattered chats and rental schemes, with no trusted way to pay in Rupiah, verify the binary, or re-download purchases later.",
    solution:
      "Built a Next.js 16 + Prisma 7 + PostgreSQL storefront with Mayar IDR checkout (QRIS, e-wallet, virtual account), a validated .ex5 binary vault, a permanent buyer library, and an admin studio for catalog and version updates.",
    engineeringDecisions: [
      "Stored .ex5 files outside public/ and validated extension, binary header, size limit, and SHA-256 checksum, rejecting .ex4 and .mq5 uploads.",
      "Split the codebase into domain, application, infrastructure, and app layers so pricing, checkout, and library logic stay testable without the framework.",
      "Secured access with HTTP-only sessions, scrypt password hashing, and a route-guard proxy, and added an admin studio to publish new EA versions straight to buyers' libraries.",
    ],
    metrics: [
      { label: "License", value: "Lifetime", detail: "One-time IDR price" },
      { label: "Binary Check", value: "SHA-256", detail: ".ex5 only vault" },
      { label: "Payments", value: "Mayar", detail: "QRIS · E-Wallet · VA" },
    ],
    tech: ["Next.js 16", "React 19", "Prisma 7", "PostgreSQL", "Zod", "Tailwind CSS 4"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/vickyymosafan/nexapip-marketplace",
        kind: "github",
      },
    ],
    architecture: [
      { id: "app", label: "Next.js 16 App Router", sublabel: "Store + Library", layer: "client" },
      { id: "usecase", label: "Use-Case Layer", sublabel: "Checkout + Catalog", layer: "orchestration" },
      { id: "mayar", label: "Mayar Payments", sublabel: "IDR Verification", layer: "ai" },
      { id: "vault", label: "PostgreSQL + .ex5 Vault", sublabel: "SHA-256 Checksums", layer: "data" },
    ],
  },
];

export const ADDITIONAL_PROJECTS: AdditionalProject[] = [
  {
    name: "SIM Architect & Company Site",
    fileCode: "SIM-ARCH.php",
    category: "Full-Stack",
    tags: ["Full-Stack", "PHP MVC"],
    image: "/images/redesign/icon-architecture-building.jpg",
    focus: "3-role architecture project & RAB management platform with custom PHP MVC, MySQL, and automated Railway CI/CD.",
    href: "https://github.com/vickyymosafan/antosa-architect",
    featured: true,
  },
  {
    name: "MQL5 Algorithmic Trading Suite",
    fileCode: "MQL5-SUITE.mq5",
    category: "Trading & Data",
    tags: ["Trading & Data", "11 Products · 5.0★"],
    image: "/images/redesign/proj-destino-copytrade.jpg",
    focus: "11 published MetaTrader 5 products (2 Expert Advisors, 9 custom indicators) earning a 5.0★ global trader rating.",
    href: "https://www.mql5.com/en/users/vickymosafan",
  },
  {
    name: "POS API for PT IndoAugust",
    fileCode: "POS-API.ts",
    category: "Full-Stack",
    tags: ["Backend", "REST API"],
    image: "/images/redesign/icon-pos-terminal.jpg",
    focus: "Retail point-of-sale backend API managing product catalogs, stock updates, and transactional sales services.",
    href: "https://github.com/vickyymosafan",
  },
  {
    name: "CommOS & Sistem Pemerintahan",
    fileCode: "COMM-OS.sys",
    category: "Full-Stack",
    tags: ["Community", "Web App"],
    image: "/images/redesign/icon-civic-platform.jpg",
    focus: "Community operations and public administration web tools focused on structured data workflows.",
    href: "https://github.com/vickyymosafan",
  },
  {
    name: "Ngopi Jember & Analytical XAUUSD",
    fileCode: "XAUUSD-LAB.py",
    category: "Trading & Data",
    tags: ["Analytics", "Discovery"],
    image: "/images/redesign/icon-coffee-analytics.jpg",
    focus: "Local specialty coffee discovery platform alongside quantitative XAUUSD gold market analytics tooling.",
    href: "https://github.com/vickyymosafan",
  },
  {
    name: "Utilities & Desktop / CLI Apps",
    fileCode: "DEV-UTILS.cli",
    category: "Utilities",
    tags: ["Desktop", "Automation"],
    image: "/images/redesign/icon-mobile-kotlin.jpg",
    focus: "Everyday productivity tools: Instagram Unfollower Checker, Windows Alarm App, Playlist Downloader & Image Converter.",
    href: "https://github.com/vickyymosafan",
  },
];

export const AI_WORKFLOW_STAGES: AiWorkflowStage[] = [
  {
    id: "prd",
    step: "01",
    title: "Clear Specs & Architecture Blueprint",
    shortTitle: "PRD & Blueprint",
    tagline: "Zero guesswork before a single line of code is written",
    description:
      "Every project starts with structured PRDs, database ERDs, OpenAPI contracts, security roles, and clear module boundaries, never blind prompting. Proven across BuildFlow ERP's 12 domain modules.",
    tools: ["Structured PRDs", "OpenAPI 3.1", "Database ERD", "RBAC Matrix"],
    command: "craftrig blueprint compile --project buildflow-erp --strict",
    terminalTitle: "architecture.yaml",
    artifactTitle: "docs/architecture/buildflow-erp.blueprint.yaml",
    artifactLanguage: "YAML",
    statusLine: "Blueprint Linter: 0 errors · 12 domain boundaries locked",
    readableFlow: {
      input: "Business requirements, user roles, and edge-case constraints.",
      process: "Draft relational ERD, OpenAPI contract, and module ownership rules.",
      verified: "Shared single source of truth for both engineers and AI coding assistants.",
    },
    consoleLines: [
      { kind: "comment", value: "# Compile 12 vertical-slice modules & invariants for BuildFlow ERP" },
      { kind: "keyval", label: "modules", value: "12 slices (BOQ, 3-Way Procurement, Double-Entry GL, Site PWA, BI)" },
      { kind: "keyval", label: "invariant.01", value: "Atomic inventory reservation enforced before payment capture" },
      { kind: "keyval", label: "invariant.02", value: "Redis 7 + BullMQ transactional outbox with idempotent retries" },
      { kind: "pass", label: "CONTRACT", value: "ERD + OpenAPI 3.1 + RBAC Threat Matrix validated (0 drift)" },
    ],
    artifactLines: [
      "project: buildflow-erp",
      "modules:",
      "  - name: core-rbac",
      "    scope: Multi-tenant authentication & audit permissions",
      "  - name: procurement-3way",
      "    scope: Purchase Order, Goods Receipt & Invoice matching",
      "  - name: ledger-gl",
      "    scope: Double-entry accounting via BullMQ outbox",
      "gates: [typecheck, jest_supertest, playwright_13vp]",
    ],
    outcome: "Eliminates scope drift and aligns design, backend, and AI-assisted coding on one clear contract.",
  },
  {
    id: "mcp",
    step: "02",
    title: "Multi-Agent Orchestration via Craftrig MCP",
    shortTitle: "MCP Tooling",
    tagline: "Tool-enforced discipline instead of chaotic chat prompting",
    description:
      "To make AI-augmented workflows truly dependable day to day, I built Craftrig (vickyymosafan/mcp-craftrig), an open-source TypeScript MCP server that keeps Claude Code and Google Antigravity aligned through dependency-ordered task plans and exclusive file write locks.",
    tools: ["mcp-craftrig", "Claude Code", "Google Antigravity", "21 Agent Skills"],
    command: "claude mcp add craftrig -- node dist/src/index.js",
    terminalTitle: "execution-plan.dag.json",
    artifactTitle: ".craftrig/execution-plan.dag.json",
    artifactLanguage: "JSON",
    statusLine: "Craftrig MCP · 50/50 tests pass · 0 lock collisions",
    readableFlow: {
      input: "Approved blueprint split into independent, dependency-aware tasks.",
      process: "Critical-path DAG scheduler assigns exclusive write locks per task.",
      verified: "Parallel implementation completes cleanly with zero file overwrite conflicts.",
    },
    consoleLines: [
      { kind: "comment", value: "# Register vickyymosafan/mcp-craftrig & launch parallel wave" },
      { kind: "keyval", label: "mcp_server", value: "vickyymosafan/mcp-craftrig (MCP SDK v2 · Strict TS)" },
      { kind: "keyval", label: "scheduler", value: "Kahn topological DAG + reverse DP critical path" },
      { kind: "keyval", label: "wave_locks", value: "Agent-A [src/api/*]  |  Agent-B [src/components/*]" },
      { kind: "pass", label: "LOCK GUARD", value: "Exclusive write leases active · stale lock recovery ON" },
    ],
    artifactLines: [
      "{",
      '  "server": "vickyymosafan/mcp-craftrig",',
      '  "protocol": "MCP SDK v2 (Strict TypeScript)",',
      '  "scheduler": "kahn_topological_critical_path",',
      '  "locks": {',
      '    "api_worker": "src/api/*",',
      '    "ui_worker": "src/components/*"',
      "  },",
      '  "tests": "50/50 passing"',
      "}",
    ],
    outcome: "Fast parallel execution with predictable architecture boundaries and auditable task handoffs.",
  },
  {
    id: "fullstack",
    step: "03",
    title: "Modular Full-Stack & Hybrid RAG Build",
    shortTitle: "Full-Stack Build",
    tagline: "Typed end-to-end from UI components to PostgreSQL & vector search",
    description:
      "Clean vertical modules keep features easy to read and extend, whether tuning weighted RRF retrieval on pgvector, building NexaPip Marketplace's SHA-256 .ex5 vault, or structuring NestJS and Next.js services.",
    tools: ["Next.js 16 / React 19", "NestJS / Express / Hono", "PostgreSQL + Prisma", "pgvector + Redis"],
    command: "pnpm --filter @rag/engine benchmark --cache redis",
    terminalTitle: "weighted-rrf.pipeline.ts",
    artifactTitle: "src/rag/weighted-rrf.pipeline.ts",
    artifactLanguage: "TypeScript",
    statusLine: "Recall 91.67% · MRR 1.00 · Cached Latency 694ms (26× faster)",
    readableFlow: {
      input: "User query enters Next.js PWA and hits typed retrieval API.",
      process: "Fuses Supabase pgvector semantic Top-50 + BM25 lexical rerank via wRRF.",
      verified: "Recall improves 75% → 91.67%, MRR 0.71 → 1.00, Redis cuts 18.3s → 694ms.",
    },
    consoleLines: [
      { kind: "comment", value: "# Hybrid Retrieval Pipeline: Dense Semantic + Sparse Lexical Fusion" },
      { kind: "code", value: "const semanticTop50 = await pgvector.search(geminiEmbed, { limit: 50 });" },
      { kind: "code", value: "const fusedTop5 = weightedRRF(semanticTop50, bm25.rerank(query));" },
      { kind: "metric", label: "ACCURACY", value: "Recall 91.67% (↑ from 75.0%) · MRR 1.00 (↑ from 0.71)" },
      { kind: "pass", label: "REDIS CACHE", value: "Median E2E latency cut 18,300ms → 694ms (26× speedup)" },
    ],
    artifactLines: [
      "export async function retrieveAcademicContext(query: string) {",
      "  const semanticTop50 = await pgvector.search(query, { limit: 50 });",
      "  const lexicalRanked = bm25.rerank(query, semanticTop50);",
      "  const fusedTop5 = weightedRRF(semanticTop50, lexicalRanked, { k: 60 });",
      "  return cache.wrap(query, () => generateCitedAnswer(fusedTop5));",
      "}",
      "// Benchmarked: Recall 91.67% | MRR 1.00 | Cached 694ms (26x faster)",
    ],
    outcome: "Production code that stays readable, fast, and maintainable long after launch.",
  },
  {
    id: "qa",
    step: "04",
    title: "Automated Visual, Contrast & API QA",
    shortTitle: "Automated QA",
    tagline: "Verified in real headless Chrome across 13 screen sizes",
    description:
      "Nothing ships on assumptions. Playwright automatically inspects 13 viewports (320px to 1920px) in both Dark and Light themes for layout overflow, WCAG contrast, keyboard accessibility, and runtime errors, alongside Jest API suites.",
    tools: ["Playwright 13-VP", "axe-core Contrast", "Jest & Supertest", "TypeScript Strict"],
    command: "craftrig localhost audit --themes dark,light --viewports 13",
    terminalTitle: "visual-a11y.receipt.json",
    artifactTitle: ".craftrig/evidence/visual-a11y.receipt.json",
    artifactLanguage: "JSON",
    statusLine: "Quality Gate: PASS · 13/13 viewports · 0 overflow · 0 console errors",
    readableFlow: {
      input: "Live local production build + Express/NestJS integration test suite.",
      process: "Playwright verifies 13 viewports, dark/light contrast, and interactive flows.",
      verified: "Objective evidence receipts unlock release only when every check passes.",
    },
    consoleLines: [
      { kind: "comment", value: "# Automated Dual-Theme Visual, Contrast & Responsive Scan" },
      { kind: "keyval", label: "viewports", value: "320 · 360 · 375 · 390 · 414 · 430 · 768 · 844 · 1024 · 1280 · 1366 · 1440 · 1920" },
      { kind: "keyval", label: "a11y_audit", value: "@axe-core/playwright + WCAG AA/AAA contrast verification" },
      { kind: "metric", label: "DEFECTS", value: "0 horizontal overflow · 0 console/page errors · 0 broken assets" },
      { kind: "pass", label: "QUALITY GATE", value: "ALL CHECKPOINTS PASSED, evidence archived cleanly" },
    ],
    artifactLines: [
      "{",
      '  "viewports_tested": 13,',
      '  "range_px": "320px -> 1920px",',
      '  "themes": ["dark", "light"],',
      '  "horizontal_overflow": 0,',
      '  "axe_violations": 0,',
      '  "console_errors": 0,',
      '  "quality_gate": "PASS"',
      "}",
    ],
    outcome: "Catches responsive breaks, contrast bugs, and API regressions before any user sees them.",
  },
  {
    id: "ship",
    step: "05",
    title: "Resilient Deployment & Failover Ready",
    shortTitle: "Production Ship",
    tagline: "Fast edge delivery engineered for real-world networks",
    description:
      "Deployed via GitHub Actions to Vercel, Cloudflare Workers, and Railway with practical safeguards: multi-LLM fallbacks, Redis fast paths, offline IndexedDB queues, and fallback datasets.",
    tools: ["GitHub Actions", "Vercel Edge", "Cloudflare Workers", "Railway CI/CD"],
    command: "gh workflow run deploy-production.yml --ref main",
    terminalTitle: "resilience-manifest.md",
    artifactTitle: "deploy/resilience-manifest.md",
    artifactLanguage: "Checklist",
    statusLine: "Production Live · Edge 200 OK · Fallbacks Verified",
    readableFlow: {
      input: "Verified commit passes TypeScript, ESLint, build, and browser checks.",
      process: "GitHub Actions deploys cleanly to Vercel Edge, Workers, or Railway.",
      verified: "Resilient caching & fallback layers keep UX fast on slow mobile networks.",
    },
    consoleLines: [
      { kind: "comment", value: "# Production Resilience Verification Checklist" },
      { kind: "pass", label: "LLM CHAIN", value: "Gemini → Groq → Cohere → OpenRouter automatic edge fallback" },
      { kind: "pass", label: "CACHE PATH", value: "Redis response cache active (18.3s → 694ms on academic RAG)" },
      { kind: "pass", label: "OFFLINE PWA", value: "Dexie IndexedDB local sync active for field Posyandu & Site Ops" },
      { kind: "metric", label: "DEPLOY", value: "Vercel Edge + Cloudflare Workers live · Core Web Vitals green" },
    ],
    artifactLines: [
      "[PASS] Multi-LLM failover: Gemini -> Groq -> Cohere -> OpenRouter",
      "[PASS] Redis hot-cache path: 18.3s -> 694ms (26x faster academic RAG)",
      "[PASS] Deterministic market fallback prevents blank fintech tables",
      "[PASS] Offline IndexedDB (Dexie) sync for field healthcare PWAs",
      "[PASS] Automated GitHub Actions deployment -> Vercel / Railway / Edge",
    ],
    outcome: "Fast, resilient web products designed to hold up under real mobile and network conditions.",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "destino",
    index: "01",
    role: "Web Developer",
    company: "Destino Copytrade",
    period: "Oct 2026",
    locationOrMode: "Client Project · Fintech Web",
    image: "/images/redesign/proj-destino-copytrade.jpg",
    summary:
      "Built the 5-page company profile and financial transparency portal for a TMGM copytrading partner with live market feeds and an interactive risk calculator.",
    highlights: [
      "Shipped 5 responsive pages (Home, Strategies, Performance/PnL Ledger, Risk Calculator, Testimonials) with smooth transitions.",
      "Built Next.js API routes for live market tickers and Myfxbook performance feeds with an automatic fallback dataset.",
      "Created an interactive risk & multiplier calculator so investors can simulate lot sizing clearly.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "API Routes"],
    links: [{ label: "destinocopytrade.com", href: "https://destinocopytrade.com/", kind: "live" }],
  },
  {
    id: "mql5",
    index: "02",
    role: "Algorithmic Trading Developer",
    company: "MQL5 Market",
    period: "Aug 2026 – Oct 2026",
    locationOrMode: "Independent Seller · Quantitative Tooling",
    image: "/images/redesign/proj-mcp-craftrig.jpg",
    summary:
      "Developed, shipped, and maintained 11 commercial MetaTrader 5 trading products for global retail traders, sustaining a 5.0★ rating.",
    highlights: [
      "Published 11 products on the official MQL5 Market (2 automated Expert Advisors and 9 custom technical indicators).",
      "Earned a 5.0 / 5.0 customer rating through fast support, bug fixes, feature iterations, and clean releases.",
    ],
    stack: ["MQL5", "MetaTrader 5", "Algorithmic Systems", "Release Management"],
    links: [
      {
        label: "MQL5 Profile",
        href: "https://www.mql5.com/en/users/vickymosafan",
        kind: "profile",
      },
    ],
  },
  {
    id: "posyandu",
    index: "03",
    role: "Full-Stack Web Developer",
    company: "Digital Posyandu · Universitas Muhammadiyah Jember",
    period: "Jul 2026 – Aug 2026",
    locationOrMode: "Healthcare Initiative · Offline-First PWA",
    image: "/images/redesign/proj-digital-posyandu.jpg",
    summary:
      "Engineered an offline-capable elderly health monitoring PWA with automated medical threshold classification and a tested TypeScript REST API.",
    highlights: [
      "Tracks BMI, blood pressure, cholesterol, uric acid, and blood sugar with automated clinical classification and trend charts.",
      "Built Express.js + TypeScript REST API with Prisma, PostgreSQL, httpOnly JWT auth, RBAC, Zod validation, and Jest/Supertest tests.",
      "Implemented Dexie IndexedDB local storage so field cadres can log visits seamlessly without signal.",
    ],
    stack: ["Next.js", "Express.js", "TypeScript", "Prisma", "PostgreSQL", "Dexie", "Jest"],
    links: [
      { label: "Live Demo", href: "https://fe-posyandu-digital.vercel.app/", kind: "live" },
      { label: "Frontend", href: "https://github.com/vickyymosafan/fe_posyandu-digital", kind: "github" },
      { label: "Backend", href: "https://github.com/vickyymosafan/be_posyandu-digital", kind: "github" },
    ],
  },
  {
    id: "antosa",
    index: "04",
    role: "Web Developer Intern",
    company: "PT Antosa Architect",
    period: "Apr 2025 – Jul 2025",
    locationOrMode: "Internship · Architecture & Agency Web",
    image: "/images/redesign/icon-architecture-building.jpg",
    summary:
      "Built SIM Architect, a 3-role architecture project management system, plus the firm's custom PHP MVC company website with automated Railway deployment.",
    highlights: [
      "Delivered 3-role workflow (Admin, Project Staff, Client): task tracking, RAB estimate verification, design vault, and client revision quotas.",
      "Designed a 10-table MySQL database with secure password hashing, session regeneration, and login audit logs.",
      "Shipped the company website on custom PHP MVC + Tailwind CSS with automated GitHub-to-Railway CI/CD.",
    ],
    stack: ["PHP", "Custom MVC", "MySQL", "Tailwind CSS", "Railway"],
    links: [
      { label: "GitHub", href: "https://github.com/vickyymosafan/antosa-architect", kind: "github" },
    ],
  },
  {
    id: "mandiri",
    index: "05",
    role: "Mobile Developer Virtual Intern",
    company: "Bank Mandiri × Rakamin Academy",
    period: "Feb 2025 – Mar 2025",
    locationOrMode: "Virtual Internship · Android / Kotlin",
    image: "/images/redesign/icon-mobile-kotlin.jpg",
    summary:
      "Built the NewsApp Android client in Kotlin integrating external REST news APIs with unit testing and structured GitLab workflows.",
    highlights: [
      "Developed NewsApp mobile news client in Kotlin connected to live REST news endpoints.",
      "Practiced automated unit testing, clean API integration architecture, and disciplined GitLab merge workflows.",
    ],
    stack: ["Kotlin", "Android", "REST API", "Unit Testing", "GitLab"],
    links: [],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "ai-augmented",
    filterKey: "AI & Agents",
    badge: "AI & Agents",
    label: "AI-Augmented Engineering",
    description: "Structured specs, MCP tooling, and hybrid RAG systems that amplify delivery without losing rigor.",
    items: [
      "Claude Code",
      "Google Antigravity",
      "Deterministic PRDs",
      "MCP Server Dev",
      "Agent Skills",
      "Hybrid & Agentic RAG",
    ],
  },
  {
    id: "frontend",
    filterKey: "Frontend",
    badge: "Frontend",
    label: "Frontend Architecture",
    description: "Fast, accessible, motion-crafted web interfaces and offline-capable PWAs built with modern React.",
    items: ["React 19", "Next.js 16", "Vue.js", "Tailwind CSS 4", "Framer Motion", "PWA & Recharts"],
  },
  {
    id: "backend",
    filterKey: "Backend",
    badge: "Backend",
    label: "Backend & APIs",
    description: "Clean-boundary REST APIs, edge workers, transactional queues, and modular enterprise services.",
    items: ["Node.js", "NestJS", "Express.js", "Hono", "Laravel", "OpenAPI & RBAC"],
  },
  {
    id: "database",
    filterKey: "Database & Cache",
    badge: "Database & Cache",
    label: "Database, Vector & Cache",
    description: "Relational schemas, pgvector semantic search, offline IndexedDB, and sub-second Redis caching.",
    items: [
      "PostgreSQL",
      "MySQL",
      "Prisma ORM",
      "Supabase pgvector",
      "Neon Postgres",
      "Redis + BullMQ",
      "IndexedDB (Dexie)",
    ],
  },
  {
    id: "languages",
    filterKey: "Languages",
    badge: "Languages",
    label: "Programming Languages",
    description: "Polyglot engineering across full-stack web, backend services, mobile apps, and trading scripts.",
    items: ["TypeScript", "JavaScript", "PHP", "Python", "HTML & CSS", "Kotlin", "MQL5"],
  },
  {
    id: "testing-devops",
    filterKey: "Testing & DevOps",
    badge: "Testing & DevOps",
    label: "Testing & Deployment",
    description: "Automated API suites, 13-viewport Playwright visual QA, and reliable cloud/edge deployments.",
    items: [
      "Jest & Supertest",
      "Playwright QA",
      "GitHub Actions",
      "Git & GitLab",
      "Vercel Edge",
      "Cloudflare Workers",
      "Railway",
    ],
  },
];

export const EDUCATION = [
  {
    institution: "Universitas Muhammadiyah Jember",
    degree: "Bachelor of Information Systems",
    period: "2022 – 2026",
    highlight: "GPA 3.94 / 4.00",
    detail:
      "Thesis: Implementation of Hybrid Retrieval Using Weighted Reciprocal Rank Fusion in an Academic Chatbot",
  },
  {
    institution: "SMAN 1 Situbondo",
    degree: "Science Major",
    period: "2018 – 2020",
    highlight: "ScanIT Designer · 3 Years",
    detail:
      "Designer at Smasa Computer and Networking IT (ScanIT) student technology organization.",
  },
] as const;

export const CERTIFICATIONS = [
  "Agent Fundamentals",
  "Enterprise Search on Generative AI App Builder",
  "Generate and Edit Media in Vertex AI",
  "Gen AI: Unlock Foundational Concept",
  "Generative AI for Healthcare",
  "AI Boost Bites",
  "Content Generation with Gemini Made Easy",
  "The Modern Data Platform and LookML",
] as const;

export const LEADERSHIP: LeadershipItem[] = [
  {
    role: "Head of MediaTech Department",
    organization: "HIMAFORSI UMJ",
    period: "2022 – 2024",
    summary:
      "Led digital media platforms, brand identity consistency, and communication campaigns for Information Systems students.",
    link: "https://www.instagram.com/himaforsi_umjember/",
  },
  {
    role: "Guest Speaker & Session Leader",
    organization: "Information Systems Diklat, UM Jember",
    period: "2024",
    summary:
      "Taught design and programming fundamentals and shared practical software engineering lessons with incoming students.",
  },
  {
    role: "Event Coordinator",
    organization: "Sisfo Insinco",
    period: "2024",
    summary:
      "Directed a cybersecurity-themed design competition covering logistics, judging criteria, participant comms, and outreach.",
  },
  {
    role: "Volunteer & Programming Tutor",
    organization: "Relawan TIK Jember (RTIK)",
    period: "2024",
    summary:
      "Mentored 5th-grade students building Scratch games and promoted digital literacy at SDN 2 Plalangan.",
  },
];
