export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface ProjectLink {
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

export interface AdditionalProject {
  name: string;
  fileCode: string;
  category: "Full-Stack" | "Trading & Data" | "Utilities";
  stackBadge: string;
  focus: string;
  href: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  locationOrMode: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links: ProjectLink[];
}

export interface ConsoleLine {
  kind: "comment" | "keyval" | "pass" | "metric" | "code";
  label?: string;
  value: string;
  note?: string;
}

export interface AiWorkflowStage {
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

export interface SkillGroup {
  id: string;
  label: string;
  description: string;
  items: string[];
}

export interface LeadershipItem {
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
  shortRole: "Full-Stack × AI-Augmented Engineering",
  location: "Situbondo, East Java, Indonesia",
  availability: "Open to Full-Stack / Frontend & Backend Roles",
  email: "mvickymosafan@gmail.com",
  phone: "+62 851-7955-6798",
  phoneHref: "tel:+6285179556798",
  cvPdfPath: "/CV-M-Vicky-Mosafan.pdf",
  summary:
    "Full-Stack Web Developer (Bachelor of Information Systems, GPA 3.94/4.00) building production web systems with Next.js, NestJS/Express, Prisma, and PostgreSQL — accelerated by AI coding agents, deterministic PRDs, and Craftrig MCP.",
  subSummary:
    "From hybrid retrieval RAG engines (91.67% Recall, 26× faster cached responses) and offline-first healthcare PWAs to 12-module BuildFlow ERP and Craftrig multi-agent MCP servers.",
  socials: {
    github: "https://github.com/vickyymosafan",
    linkedin: "https://www.linkedin.com/in/vickymosafan/",
    mql5: "https://www.mql5.com/en/users/vickymosafan",
    googleSkills:
      "https://www.skills.google/public_profiles/9bc91f79-a2fd-4b45-88ba-bd3f6da6acb3",
    portfolio: "https://iamvicky.vercel.app/",
    himaforsi: "https://www.instagram.com/himaforsi_umjember/",
  },
  heroProofMetrics: [
    {
      value: "91.67%",
      label: "Hybrid RAG Recall",
      sub: "wRRF · MRR 1.00",
    },
    {
      value: "26×",
      label: "Faster w/ Redis",
      sub: "18.3s → 694ms",
    },
    {
      value: "45+",
      label: "MCP Tools Built",
      sub: "Craftrig + 3D QA",
    },
    {
      value: "3.94",
      label: "GPA / 4.00",
      sub: "Info Systems · UMJ",
    },
  ],
  marqueeCapabilities: [
    "Full-Stack TypeScript Systems",
    "AI-Augmented Software Engineering",
    "Custom MCP Server Architecture",
    "Hybrid & Agentic RAG Pipelines",
    "Next.js 16 & React 19 UI Craft",
    "NestJS · Express · Hono APIs",
    "Deterministic PRDs & Agent Skills",
    "Playwright 13-Viewport Visual QA",
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
    featuredTag: "91.67% Recall · 26× Cache Speedup",
    summary:
      "Production academic RAG PWA combining Gemini pgvector semantic search with BM25 lexical reranking fused via weighted Reciprocal Rank Fusion (wRRF) and Redis response caching.",
    problem:
      "Dense semantic search alone frequently missed exact academic codes, course names, and policy clauses, while uncached LLM inference took ~18.3 seconds per query.",
    solution:
      "Engineered an n8n hybrid retrieval pipeline retrieving top-50 semantic chunks from Supabase pgvector, reranking via BM25, fusing with tuned wRRF into top-5 contexts for Cohere Aya Expanse 32B, backed by Redis caching and a Next.js 16 PWA with voice input.",
    engineeringDecisions: [
      "Benchmarked 3 retrieval scenarios on official study program documents: raised Recall from 75% to 91.67% and MRR from 0.71 to 1.00 using wRRF.",
      "Implemented Redis caching + session chat memory, cutting median end-to-end latency from 18.3s down to 694ms (~26× speedup).",
      "Shipped Next.js 16 PWA with Supabase chat history persistence, speech-to-text input, and guided onboarding wizard.",
    ],
    metrics: [
      { label: "Recall", value: "91.67%", detail: "up from 75.0%" },
      { label: "MRR Score", value: "1.00", detail: "up from 0.71" },
      { label: "Cached Latency", value: "694ms", detail: "26× vs 18.3s" },
    ],
    tech: [
      "Next.js 16 PWA",
      "n8n",
      "Supabase pgvector",
      "BM25 + wRRF",
      "Gemini Embeddings",
      "Cohere Aya 32B",
      "Redis",
    ],
    links: [
      { label: "Live Demo", href: "https://ai-smartchat.vercel.app/", kind: "live" },
      {
        label: "Frontend Repo",
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
    title: "Beyond RAG: Agentic RAG Platform",
    subtitle: "Multi-Hop Retrieval & Self-Critic Grounding Loop",
    category: "AI & RAG",
    year: "2026",
    featuredTag: "Self-Critic Loop · Multi-LLM Fallback",
    summary:
      "Edge-deployed agentic RAG system featuring query rewriting, multi-hop retrieval, reranking, and an autonomous self-critic grounding loop to eliminate hallucinations across PDF/DOCX corpora.",
    problem:
      "Single-pass RAG pipelines fail on multi-part analytical questions and silently hallucinate when primary LLM providers rate-limit or degrade.",
    solution:
      "Built an edge API on Cloudflare Workers + Hono with Neon PostgreSQL, multi-provider LLM fallback (Gemini, Groq, Cohere, OpenRouter), document ingestion, and a Next.js citation-aware chat UI with Markdown/LaTeX rendering.",
    engineeringDecisions: [
      "Added query rewriting, multi-hop sub-query decomposition, reranking, and a self-critic verification loop that auto-corrects ungrounded claims.",
      "Architected multi-LLM fallback chain (Gemini → Groq → Cohere → OpenRouter) with edge rate limiting and response caching.",
      "Built virtualized chat list, inline source citations, Markdown/LaTeX math renderer, PWA offline shell, and admin PDF/DOCX ingestion panel.",
    ],
    metrics: [
      { label: "Runtime", value: "Edge", detail: "Cloudflare Workers" },
      { label: "LLM Providers", value: "4×", detail: "Automatic fallback" },
      { label: "Ingestion", value: "PDF/DOCX", detail: "Admin pipeline" },
    ],
    tech: [
      "Cloudflare Workers",
      "Hono",
      "Neon PostgreSQL",
      "Next.js",
      "Gemini / Groq / Cohere",
      "OpenRouter",
      "Markdown + LaTeX",
    ],
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
    title: "Craftrig MCP & 3D Visual QA",
    subtitle: "vickyymosafan/mcp-craftrig · Multi-Agent Governance Rig",
    category: "MCP & Agentic",
    year: "2026",
    featuredTag: "MCP SDK v2 · 50/50 Tests · 13-VP QA",
    summary:
      "Open-source TypeScript MCP server (vickyymosafan/mcp-craftrig) orchestrating multi-agent workflows with topological critical-path DAG scheduling, exclusive file locks, blueprint autopilot, and 13-viewport Playwright visual/a11y QA.",
    problem:
      "AI coding agents frequently drift out of scope, overwrite concurrent files, skip real browser checks, or fabricate UI/3D verification passes without objective evidence.",
    solution:
      "Authored Craftrig MCP (MCP SDK v2, Strict TypeScript, Node 22+, 50/50 tests pass) with Kahn's topological DAG planner, stale lock recovery, SQLite WAL evidence registry, Brotli plan archival, and 13-viewport Playwright dual-theme QA — paired with Three.js Visual QA MCP.",
    engineeringDecisions: [
      "Engineered topological critical-path DAG scheduling (Kahn's algorithm + reverse DP) to prioritize high-impact tasks and minimize parallel makespan.",
      "Implemented exclusive path-level write locks with stale lease recovery and auditable SQLite WAL evidence gates blocking unverified self-attestation.",
      "Built automated localhost Playwright 13-viewport responsive & dual-theme axe-core contrast audits alongside 20+ Three.js/WebGL scene inspection tools.",
    ],
    metrics: [
      { label: "MCP Suite", value: "45+ Tools", detail: "Craftrig + 3D QA" },
      { label: "Test Suite", value: "50/50", detail: "Strict TypeScript" },
      { label: "QA Matrix", value: "13 VPs", detail: "320px → 1920px" },
    ],
    tech: [
      "TypeScript Strict",
      "MCP SDK v2",
      "Topological DAG",
      "Playwright QA",
      "SQLite WAL + Brotli",
      "Three.js Visual QA",
    ],
    links: [
      {
        label: "vickyymosafan/mcp-craftrig",
        href: "https://github.com/vickyymosafan/mcp-craftrig",
        kind: "github",
      },
      {
        label: "Three.js Visual QA",
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
    title: "BuildFlow ERP",
    subtitle: "vickyymosafan/fullstack_buildflow-erp · Construction ERP",
    category: "Enterprise ERP",
    year: "2026",
    featuredTag: "12 Vertical Slices · Outbox Pattern",
    summary:
      "Modular monolith Construction ERP (vickyymosafan/fullstack_buildflow-erp) engineered for mid-size contractors (50–300 staff, multi-branch, multi-warehouse) across 12 tightly bounded vertical-slice business modules.",
    problem:
      "Construction teams suffer from fragmented spreadsheets across field operations, BOQ cost baselines, procurement 3-way matching, and double-entry ledgers, causing budget overruns and reconciliation drift.",
    solution:
      "Architected a 12-module Next.js 15 + NestJS CQRS modular monolith backed by PostgreSQL 16 (Decimal precision, UUIDs), Prisma/Drizzle, Redis 7 + BullMQ transactional outbox, MinIO/R2/S3 document storage, offline PWA daily site reports, and OpenAPI + RBAC governance.",
    engineeringDecisions: [
      "Structured 12 strict vertical slices: Multi-Tenant Core/RBAC, CRM, Project WBS/Gantt, BOQ/RAB Cost Baseline, 3-Way Procurement, Immutable Stock Ledger, Double-Entry GL, HR Timesheets, Offline Site Ops, CAD/BIM Docs, QC/NCR/HSE Safety, and Executive BI.",
      "Engineered Redis 7 + BullMQ transactional outbox queues for reliable event-driven workflows across procurement, warehouse transfers, and accounting postings.",
      "Codified full contract governance: SYSTEM_ARCHITECTURE, MODULE_BOUNDARIES, DATABASE_ERD, API_CONTRACT (OpenAPI), DESIGN tokens, and SECURITY RBAC threat matrix.",
    ],
    metrics: [
      { label: "Domain Modules", value: "12", detail: "Vertical Slices" },
      { label: "Procurement", value: "3-Way", detail: "PO · GR · Invoice" },
      { label: "Async Engine", value: "Outbox", detail: "Redis 7 + BullMQ" },
    ],
    tech: [
      "Next.js 15 PWA",
      "NestJS CQRS",
      "PostgreSQL 16",
      "Prisma / Drizzle",
      "Redis 7 + BullMQ",
      "MinIO / R2 / S3",
      "shadcn/ui",
      "pnpm + Turborepo",
    ],
    links: [
      {
        label: "vickyymosafan/fullstack_buildflow-erp",
        href: "https://github.com/vickyymosafan/fullstack_buildflow-erp",
        kind: "github",
      },
    ],
    architecture: [
      { id: "web", label: "Next.js 15 + shadcn", sublabel: "12 Modules + PWA", layer: "client" },
      { id: "api", label: "NestJS CQRS API", sublabel: "OpenAPI + RBAC", layer: "orchestration" },
      { id: "queue", label: "BullMQ Outbox", sublabel: "Redis 7 Events", layer: "ai" },
      { id: "db", label: "PostgreSQL 16 + S3", sublabel: "Double-Entry + BIM", layer: "data" },
    ],
  },
  {
    id: "arven-ecommerce",
    index: "05",
    title: "Arven Luxury E-Commerce",
    subtitle: "D2C Fashion Platform with 3D Product Viewer",
    category: "Full-Stack",
    year: "2026",
    featuredTag: "3D Viewer · Atomic Inventory",
    summary:
      "End-to-end product, business, and technical architecture for a luxury D2C fashion platform featuring a 3D product viewer, atomic inventory reservation, and idempotent Midtrans webhooks.",
    problem:
      "High-demand luxury drops risk overselling during concurrent checkouts and duplicate payment state transitions when payment webhooks retry.",
    solution:
      "Designed a pnpm + Turborepo monorepo combining Next.js storefront/admin, NestJS API, PostgreSQL + Prisma, Redis/BullMQ, Midtrans adapter, RBAC, threat model, and automated CI workflows.",
    engineeringDecisions: [
      "Engineered atomic inventory reservation windows to eliminate race-condition overselling under peak checkout traffic.",
      "Implemented idempotency keys on Midtrans payment webhooks paired with a transactional outbox for order fulfillment.",
      "Authored complete business + technical PRD, RBAC permissions, and security threat model alongside Turborepo CI pipelines.",
    ],
    metrics: [
      { label: "Checkout Safety", value: "Atomic", detail: "Stock reservation" },
      { label: "Payments", value: "Midtrans", detail: "Idempotent webhook" },
      { label: "Monorepo", value: "Turbo", detail: "Storefront + Admin" },
    ],
    tech: [
      "Next.js",
      "NestJS",
      "PostgreSQL + Prisma",
      "Redis / BullMQ",
      "Midtrans",
      "3D Viewer",
      "Turborepo + CI",
    ],
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/vickyymosafan/arven-ecommerce",
        kind: "github",
      },
    ],
    architecture: [
      { id: "store", label: "Storefront + 3D", sublabel: "Next.js + Admin", layer: "client" },
      { id: "nest", label: "NestJS Commerce", sublabel: "Atomic Stock Lock", layer: "orchestration" },
      { id: "pay", label: "Midtrans Adapter", sublabel: "Idempotent Hooks", layer: "ai" },
      { id: "pg", label: "Prisma + BullMQ", sublabel: "Transactional Outbox", layer: "data" },
    ],
  },
  {
    id: "digital-posyandu",
    index: "06",
    title: "Digital Posyandu PWA",
    subtitle: "Offline-First Elderly Health Monitoring · UM Jember",
    category: "Full-Stack",
    year: "2026",
    featuredTag: "Offline-First PWA · Tested REST API",
    summary:
      "Community healthcare PWA tracking elderly BMI, systolic/diastolic blood pressure, cholesterol, uric acid, and blood sugar with automated clinical classification and trend charts.",
    problem:
      "Field health cadres at Posyandu often operate in unstable mobile connectivity zones while manually calculating health thresholds on paper forms.",
    solution:
      "Delivered a Next.js + IndexedDB (Dexie) offline-capable PWA with Recharts trend dashboards backed by a hardened Express.js + TypeScript + Prisma + PostgreSQL API.",
    engineeringDecisions: [
      "Implemented httpOnly cookie JWT authentication, Admin/Petugas RBAC, Zod request validation, and API rate limiting.",
      "Verified critical backend endpoints with Jest and Supertest automated integration suites.",
      "Added Dexie IndexedDB local storage so health checkups stay usable offline and sync cleanly.",
    ],
    metrics: [
      { label: "Biometrics", value: "5+", detail: "Auto-classification" },
      { label: "Offline Sync", value: "Dexie", detail: "IndexedDB PWA" },
      { label: "API QA", value: "Jest", detail: "+ Supertest + Zod" },
    ],
    tech: [
      "Next.js",
      "Tailwind CSS",
      "Recharts",
      "IndexedDB (Dexie)",
      "Express.js + TS",
      "Prisma + PostgreSQL",
      "Jest / Supertest",
    ],
    links: [
      {
        label: "Live Demo",
        href: "https://fe-posyandu-digital.vercel.app/",
        kind: "live",
      },
      {
        label: "Frontend Repo",
        href: "https://github.com/vickyymosafan/fe_posyandu-digital",
        kind: "github",
      },
      {
        label: "Backend Repo",
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
    title: "Destino Copytrade Platform",
    subtitle: "Financial Transparency Portal & Risk Calculator",
    category: "Full-Stack",
    year: "2026",
    featuredTag: "Next.js 16 · Live Ticker & Risk Calc",
    summary:
      "5-page company profile and transparency platform for a TMGM copytrading partner featuring live market tickers, Myfxbook performance ledger with fallback datasets, and an interactive risk calculator.",
    problem:
      "Copytrading investors need verifiable performance transparency and clear lot/risk simulation without broken pages when upstream market APIs hiccup.",
    solution:
      "Built 5 thematic responsive pages (Home, Strategies, Performance/PnL Ledger, Risk Calculator, Testimonials) in Next.js 16, React 19, TypeScript, and Tailwind CSS 4 with resilient API routes.",
    engineeringDecisions: [
      "Engineered Next.js API routes fetching live market ticker and Myfxbook performance data with deterministic fallback datasets for 100% uptime.",
      "Built an interactive risk & multiplier calculator giving real-time position sizing feedback.",
      "Crafted smooth route transitions and responsive financial ledger tables across mobile and desktop viewports.",
    ],
    metrics: [
      { label: "Pages", value: "5", detail: "Thematic routes" },
      { label: "Data Feed", value: "Live", detail: "Myfxbook + fallback" },
      { label: "Stack", value: "Next 16", detail: "React 19 + TW 4" },
    ],
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "API Routes",
      "Myfxbook Feed",
    ],
    links: [
      {
        label: "Live Website",
        href: "https://destinocopytrade.com/",
        kind: "live",
      },
    ],
    architecture: [
      { id: "pages", label: "5 Thematic Pages", sublabel: "Smooth Transitions", layer: "client" },
      { id: "calc", label: "Risk Calculator", sublabel: "Multiplier Engine", layer: "ai" },
      { id: "api", label: "Next.js Routes", sublabel: "Ticker + Myfxbook", layer: "orchestration" },
      { id: "fb", label: "Fallback Dataset", sublabel: "Zero-Downtime UI", layer: "data" },
    ],
  },
];

export const ADDITIONAL_PROJECTS: AdditionalProject[] = [
  {
    name: "SIM Architect & Company Site",
    fileCode: "SIM-ARCH.php",
    category: "Full-Stack",
    stackBadge: "PHP MVC · MySQL",
    focus: "3-role project & RAB management (PHP MVC, MySQL, Tailwind, Railway)",
    href: "https://github.com/vickyymosafan/antosa-architect",
  },
  {
    name: "MQL5 Algorithmic Trading Suite",
    fileCode: "MQL5-SUITE.mq5",
    category: "Trading & Data",
    stackBadge: "11 Products · 5.0★",
    focus: "11 published MT5 products (2 EAs, 9 Indicators) · 5.0★ rating",
    href: "https://www.mql5.com/en/users/vickymosafan",
  },
  {
    name: "POS PT IndoAugust (Backend)",
    fileCode: "POS-API.ts",
    category: "Full-Stack",
    stackBadge: "REST API · Inventory",
    focus: "Retail point-of-sale API & inventory backend services",
    href: "https://github.com/vickyymosafan",
  },
  {
    name: "CommOS & Sistem Pemerintahan",
    fileCode: "COMM-OS.sys",
    category: "Full-Stack",
    stackBadge: "Gov & Community",
    focus: "Community operations & public administration web systems",
    href: "https://github.com/vickyymosafan",
  },
  {
    name: "Ngopi Jember & Analytical XAUUSD",
    fileCode: "XAUUSD-LAB.py",
    category: "Trading & Data",
    stackBadge: "Analytics · Discovery",
    focus: "Local discovery platform & gold market analytics tooling",
    href: "https://github.com/vickyymosafan",
  },
  {
    name: "Utilities & Desktop/CLI Apps",
    fileCode: "DEV-UTILS.cli",
    category: "Utilities",
    stackBadge: "Desktop · Automation",
    focus: "Instagram Unfollower Checker, Windows Alarm App, Playlist Downloader, Image Converter",
    href: "https://github.com/vickyymosafan",
  },
];

export const AI_WORKFLOW_STAGES: AiWorkflowStage[] = [
  {
    id: "prd",
    step: "01",
    title: "Deterministic PRD & Architecture Blueprint",
    shortTitle: "Deterministic PRD",
    tagline: "Zero guesswork before a single line of code is written",
    description:
      "Every build starts with a structured, machine-readable blueprint: domain module boundaries, relational ERD, OpenAPI 3.1 contracts, RBAC threat model, and testable acceptance gates — proven across BuildFlow ERP's 12 modules.",
    tools: ["Deterministic PRDs", "Craftrig Blueprint", "OpenAPI 3.1", "ERD & RBAC Matrix"],
    command: "craftrig blueprint compile --project fullstack_buildflow-erp --strict",
    terminalTitle: "craftrig-blueprint · bash",
    artifactTitle: "docs/architecture/buildflow-erp.blueprint.yaml",
    artifactLanguage: "CLI + YAML",
    statusLine: "Blueprint Linter: 0 errors · 12 domain boundaries locked",
    readableFlow: {
      input: "Business requirements, user roles, and failure invariants.",
      process: "Craftrig Blueprint Interview compiles ERD, OpenAPI spec & REQ-IDs.",
      verified: "Locked machine-readable contract shared by humans & AI agents.",
    },
    consoleLines: [
      { kind: "comment", value: "# Compile 12 vertical-slice modules & invariants for BuildFlow ERP" },
      { kind: "keyval", label: "modules", value: "12 slices (BOQ, 3-Way Procurement, Double-Entry GL, Site PWA, BI)" },
      { kind: "keyval", label: "invariant.01", value: "Atomic inventory reservation enforced before payment capture" },
      { kind: "keyval", label: "invariant.02", value: "Redis 7 + BullMQ transactional outbox with idempotent retries" },
      { kind: "pass", label: "CONTRACT", value: "ERD + OpenAPI 3.1 + RBAC Threat Matrix validated (0 drift)" },
    ],
    artifactLines: [
      "$ craftrig blueprint compile --project fullstack_buildflow-erp --strict",
      "modules: 12 # BOQ, 3-Way Procurement, Double-Entry GL, Site PWA, BI",
      "invariants:",
      "  - INV-01: atomic_inventory_reservation_before_payment_capture",
      "  - INV-02: redis_bullmq_transactional_outbox_with_idempotency",
      "gates: [typecheck, jest_supertest, playwright_13vp] -> LOCKED",
    ],
    outcome: "Eliminates prompt drift and aligns human engineers + AI coding agents on one strict source of truth.",
  },
  {
    id: "mcp",
    step: "02",
    title: "Multi-Agent Orchestration via Craftrig MCP",
    shortTitle: "Craftrig MCP",
    tagline: "Tool-enforced engineering discipline, never raw chat prompting",
    description:
      "Claude Code and Google Antigravity run in parallel waves governed by my open-source TypeScript MCP server (vickyymosafan/mcp-craftrig) — enforcing Kahn's critical-path task DAGs, exclusive file write locks, and 21 modular Agent Skills.",
    tools: ["vickyymosafan/mcp-craftrig", "Claude Code", "Google Antigravity", "21 Agent Skills"],
    command: "claude mcp add craftrig -- node dist/src/index.js && craftrig autopilot next",
    terminalTitle: "mcp-craftrig · autopilot",
    artifactTitle: ".craftrig/execution-plan.dag.json",
    artifactLanguage: "MCP SDK v2",
    statusLine: "Craftrig MCP · 50/50 tests pass · 0 lock collisions",
    readableFlow: {
      input: "Compiled blueprint REQ-IDs split into dependency-aware tasks.",
      process: "Kahn topological critical-path scheduler assigns exclusive file locks.",
      verified: "Parallel Claude Code + Antigravity waves finish with zero merge conflicts.",
    },
    consoleLines: [
      { kind: "comment", value: "# Register vickyymosafan/mcp-craftrig & launch parallel wave" },
      { kind: "keyval", label: "mcp_server", value: "vickyymosafan/mcp-craftrig (MCP SDK v2 · Strict TS)" },
      { kind: "keyval", label: "scheduler", value: "Kahn topological DAG + reverse DP critical path" },
      { kind: "keyval", label: "wave_locks", value: "Agent-A [src/api/*]  |  Agent-B [src/components/*]" },
      { kind: "pass", label: "LOCK GUARD", value: "Exclusive write leases active · stale lock auto-recovery ON" },
    ],
    artifactLines: [
      "$ claude mcp add craftrig -- node dist/src/index.js",
      '{ "repo": "vickyymosafan/mcp-craftrig", "protocol": "MCP SDK v2", "tests": "50/50" }',
      '{ "scheduler": "kahn_topological_critical_path", "skills_routed": 21 }',
      '{ "locks": { "agent_a": "src/api/*", "agent_b": "src/components/*" } }',
      '{ "guard": "exclusive_file_locks", "anti_gaming": "evidence_required" }',
    ],
    outcome: "Parallel multi-agent execution with zero overwrite collisions, minimal token waste, and auditable handoffs.",
  },
  {
    id: "fullstack",
    step: "03",
    title: "Clean Architecture Full-Stack & Hybrid RAG Build",
    shortTitle: "Full-Stack + RAG",
    tagline: "Typed end-to-end from 3D/PWA UI to PostgreSQL, pgvector & Edge",
    description:
      "AI accelerates scaffolding and iteration while human engineering governs clean vertical boundaries, SQL decimal precision, offline Dexie IndexedDB caching, and weighted RRF hybrid retrieval tuning.",
    tools: ["Next.js 16 / React 19", "NestJS / Hono / Express", "PostgreSQL + Prisma", "pgvector + BM25 + Redis"],
    command: "pnpm --filter @rag/engine benchmark --dataset academic-policy --cache redis",
    terminalTitle: "hybrid-rag · benchmark",
    artifactTitle: "src/rag/weighted-rrf.pipeline.ts",
    artifactLanguage: "TypeScript",
    statusLine: "Recall 91.67% · MRR 1.00 · Cached Latency 694ms (26× faster)",
    readableFlow: {
      input: "User query hitting Next.js PWA -> Hono/n8n retrieval pipeline.",
      process: "Fuses Supabase pgvector semantic Top-50 + BM25 lexical rerank via wRRF.",
      verified: "Recall rises 75% → 91.67%, MRR 0.71 → 1.00, Redis cuts 18.3s → 694ms.",
    },
    consoleLines: [
      { kind: "comment", value: "# Hybrid Retrieval Pipeline: Dense Semantic + Sparse Lexical Fusion" },
      { kind: "code", value: "const semanticTop50 = await pgvector.search(geminiEmbed, { limit: 50 });" },
      { kind: "code", value: "const fusedTop5 = weightedRRF(semanticTop50, bm25.rerank(query));" },
      { kind: "metric", label: "ACCURACY", value: "Recall 91.67% (↑ from 75.0%) · MRR 1.00 (↑ from 0.71)" },
      { kind: "pass", label: "REDIS CACHE", value: "Median E2E latency cut 18,300ms → 694ms (26× speedup)" },
    ],
    artifactLines: [
      "$ pnpm --filter @rag/engine benchmark --dataset academic-policy --cache redis",
      "const semanticTop50 = await pgvector.search(geminiEmbed, { limit: 50 });",
      "const lexicalRanked = bm25.rerank(query, semanticTop50);",
      "const fusedTop5 = weightedRRF(semanticTop50, lexicalRanked, { k: 60 });",
      "// Result: Recall 91.67% | MRR 1.00 | Redis Cached Path 694ms (26x faster)",
    ],
    outcome: "Production-grade code that stays readable, modular, benchmarked, and effortless to maintain.",
  },
  {
    id: "qa",
    step: "04",
    title: "Autonomous Verification & 13-Viewport Visual QA",
    shortTitle: "Autonomous QA",
    tagline: "Real headless Chrome, real contrast math, zero guesswork",
    description:
      "Never trust an AI agent saying 'looks good'. Craftrig automatically drives Playwright across 13 viewport profiles (320px–1920px) in both Dark & Light modes, checking WCAG contrast, overflow, console errors, and WebGL health.",
    tools: ["Craftrig Localhost QA", "Playwright 13-VP", "axe-core Contrast", "Jest & Supertest"],
    command: "craftrig localhost audit --themes dark,light --viewports 13 --axe wcag2aa",
    terminalTitle: "craftrig-qa · playwright",
    artifactTitle: ".craftrig/evidence/visual-a11y.receipt.json",
    artifactLanguage: "Playwright QA",
    statusLine: "Quality Gate: PASS · 13/13 viewports · 0 overflow · 0 console errors",
    readableFlow: {
      input: "Running localhost Next.js production server + API test suite.",
      process: "Playwright audits 13 screen sizes in Dark & Light themes + Jest API tests.",
      verified: "Deduplicated screenshots & SQLite WAL receipts unlock the release gate.",
    },
    consoleLines: [
      { kind: "comment", value: "# Automated Dual-Theme Visual, Contrast & Responsive Scan (< 4s)" },
      { kind: "keyval", label: "viewports", value: "320 · 360 · 375 · 390 · 414 · 430 · 768 · 844 · 1024 · 1280 · 1366 · 1440 · 1920" },
      { kind: "keyval", label: "a11y_audit", value: "@axe-core/playwright + alpha-composited WCAG AA/AAA contrast" },
      { kind: "metric", label: "DEFECTS", value: "0 horizontal overflow · 0 console/page errors · 0 broken assets" },
      { kind: "pass", label: "QUALITY GATE", value: "ALL CHECKPOINTS PASSED — evidence archived (Brotli + WAL)" },
    ],
    artifactLines: [
      "$ craftrig localhost audit --themes dark,light --viewports 13 --axe wcag2aa",
      '{ "viewports": [320, 360, 375, 390, 414, 430, 768, 844, 1024, 1280, 1366, 1440, 1920] }',
      '{ "themes": ["dark", "light"], "horizontal_overflow": 0, "console_errors": 0 }',
      '{ "wcag_contrast": "AA/AAA", "reduced_motion": "verified" }',
      '{ "quality_gate": "PASS", "evidence_stored": ".craftrig/archive/plan.json.br" }',
    ],
    outcome: "Catches responsive breaks, contrast bugs, and runtime regressions automatically before deployment.",
  },
  {
    id: "ship",
    step: "05",
    title: "Resilient Edge Delivery & Failover Proof",
    shortTitle: "Resilient Ship",
    tagline: "Shipped to edge & cloud with zero-downtime fallbacks",
    description:
      "Deployed via GitHub Actions to Vercel, Cloudflare Workers, Railway, or Hostinger with automatic multi-LLM provider failovers, offline-first IndexedDB queues, and deterministic fallback datasets.",
    tools: ["GitHub Actions", "Vercel Edge", "Cloudflare Workers", "Multi-LLM Failover"],
    command: "gh workflow run deploy-production.yml --ref main --verify-edge",
    terminalTitle: "deploy-edge · ci/cd",
    artifactTitle: "deploy/resilience-manifest.md",
    artifactLanguage: "CI/CD Log",
    statusLine: "Production Live · Edge 200 OK · Multi-LLM Failover Armed",
    readableFlow: {
      input: "Green quality gate commit pushed to main branch.",
      process: "GitHub Actions builds & deploys to Vercel Edge & Cloudflare Workers.",
      verified: "Resilient failover chains keep apps fast even during API or offline hiccups.",
    },
    consoleLines: [
      { kind: "comment", value: "# Production Resilience Verification Checklist" },
      { kind: "pass", label: "LLM CHAIN", value: "Gemini → Groq → Cohere → OpenRouter automatic edge fallback" },
      { kind: "pass", label: "CACHE PATH", value: "Redis response cache active (18.3s → 694ms on academic RAG)" },
      { kind: "pass", label: "OFFLINE PWA", value: "Dexie IndexedDB local sync active for field Posyandu & Site Ops" },
      { kind: "metric", label: "DEPLOY", value: "Vercel Edge + Cloudflare Workers live · Core Web Vitals green" },
    ],
    artifactLines: [
      "$ gh workflow run deploy-production.yml --ref main --verify-edge",
      "[PASS] Multi-LLM fallback: Gemini -> Groq -> Cohere -> OpenRouter",
      "[PASS] Redis cache path: 18.3s -> 694ms (26x faster academic RAG)",
      "[PASS] Market feed fallback dataset guarantees zero blank financial charts",
      "[PASS] Offline IndexedDB (Dexie) sync for field healthcare & construction ops",
    ],
    outcome: "Fast, resilient web products engineered to thrive under real-world mobile and network conditions.",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "destino",
    role: "Web Developer",
    company: "Destino Copytrade",
    period: "Oct 2026",
    locationOrMode: "Client Project · Fintech Web",
    summary:
      "Built the 5-page company profile and financial transparency platform for a TMGM copytrading partner with live market API routes and an interactive risk/multiplier simulator.",
    highlights: [
      "Shipped 5 thematic pages (Home, Strategies, Performance/PnL Ledger, Risk Calculator, Testimonials) with responsive layouts and smooth route transitions.",
      "Built Next.js API routes for live market tickers and Myfxbook performance feeds with an automatic fallback dataset.",
      "Implemented an interactive risk/multiplier calculator for investor lot-sizing simulations.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "API Routes"],
    links: [{ label: "destinocopytrade.com", href: "https://destinocopytrade.com/", kind: "live" }],
  },
  {
    id: "mql5",
    role: "Algorithmic Trading Developer",
    company: "MQL5 Market",
    period: "Aug 2026 – Oct 2026",
    locationOrMode: "Freelance · Quantitative Tooling",
    summary:
      "Developed and published commercial MetaTrader 5 Expert Advisors and custom technical indicators in MQL5, maintaining live versions for global traders.",
    highlights: [
      "Published 11 products on the official MQL5 Market (2 Expert Advisors and 9 custom Technical Indicators).",
      "Earned a 5.0 / 5.0 rating across customer reviews through responsive maintenance, bug fixes, feature additions, and version upgrades.",
    ],
    stack: ["MQL5", "MetaTrader 5", "Algorithmic Systems", "Release Management"],
    links: [
      {
        label: "MQL5 Seller Profile",
        href: "https://www.mql5.com/en/users/vickymosafan",
        kind: "profile",
      },
    ],
  },
  {
    id: "posyandu",
    role: "Full-Stack Web Developer",
    company: "Digital Posyandu · Universitas Muhammadiyah Jember",
    period: "Jul 2026 – Aug 2026",
    locationOrMode: "University Healthcare Initiative",
    summary:
      "Engineered an offline-capable elderly health monitoring PWA with automated medical threshold classification and a tested TypeScript REST API.",
    highlights: [
      "Tracks BMI, systolic/diastolic blood pressure, cholesterol, uric acid, and blood sugar with automated status classification and trend summaries.",
      "Built Express.js + TypeScript REST API with Prisma ORM, PostgreSQL, httpOnly cookie JWT auth, Admin/Petugas RBAC, Zod validation, rate limiting, and Jest/Supertest tests.",
      "Built Next.js + Tailwind CSS + Recharts frontend with Dexie IndexedDB for offline field operations.",
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
    role: "Web Developer Intern",
    company: "PT Antosa Architect",
    period: "Apr 2025 – Jul 2025",
    locationOrMode: "Internship · Enterprise & Agency Web",
    summary:
      "Built SIM Architect — a 3-role architecture project management information system — plus the company's custom PHP MVC marketing website with automated Railway deployment.",
    highlights: [
      "Built 3-role workflow (Admin, Project Staff, Client): project & daily task tracking, RAB cost estimate upload with verification log, design file vault, and client revision requests with quota & review.",
      "Designed 10-table MySQL database with secure password hashing, session ID regeneration, login audit logs, and password reset.",
      "Delivered company website on a custom PHP MVC framework + Tailwind CSS with automatic GitHub-to-Railway CI/CD.",
    ],
    stack: ["PHP", "Custom MVC", "MySQL", "Bootstrap", "Tailwind CSS", "Railway"],
    links: [
      { label: "GitHub", href: "https://github.com/vickyymosafan/antosa-architect", kind: "github" },
    ],
  },
  {
    id: "mandiri",
    role: "Mobile Developer Virtual Intern",
    company: "Bank Mandiri × Rakamin Academy",
    period: "Feb 2025 – Mar 2025",
    locationOrMode: "Virtual Internship · Android / Kotlin",
    summary:
      "Built NewsApp in Kotlin integrating live news APIs while practicing unit testing and disciplined GitLab project workflows.",
    highlights: [
      "Developed NewsApp mobile news client in Kotlin connected to an external REST news API.",
      "Practiced automated unit testing, clean API integration patterns, and GitLab merge/issue workflows.",
    ],
    stack: ["Kotlin", "Android", "REST API", "Unit Testing", "GitLab"],
    links: [],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "ai-augmented",
    label: "AI-Augmented Engineering",
    description: "Agentic workflows, MCP tooling, and deterministic specs that multiply velocity without losing rigor.",
    items: [
      "Claude Code",
      "Google Antigravity",
      "Deterministic PRDs",
      "MCP Server Development",
      "Agent Skills Prompt Engineering",
      "Hybrid & Agentic RAG",
    ],
  },
  {
    id: "frontend",
    label: "Frontend Architecture",
    description: "Accessible, motion-rich, offline-ready interfaces crafted with modern React & TypeScript.",
    items: ["React 19", "Next.js 16", "Vue.js", "Tailwind CSS 4", "Framer Motion", "PWA & Recharts"],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    description: "Clean-boundary REST APIs, edge workers, queues, and enterprise domain services.",
    items: ["Node.js", "NestJS", "Express.js", "Hono", "Laravel", "OpenAPI & RBAC"],
  },
  {
    id: "database",
    label: "Database, Vector & Cache",
    description: "Relational schemas, vector search, offline IndexedDB, and high-speed caching.",
    items: [
      "PostgreSQL",
      "MySQL",
      "Prisma ORM",
      "Supabase Vector (pgvector)",
      "Neon Postgres",
      "Redis + BullMQ",
      "IndexedDB (Dexie)",
    ],
  },
  {
    id: "languages",
    label: "Languages",
    description: "Polyglot foundation across web, backend, mobile, and quantitative scripting.",
    items: ["TypeScript", "JavaScript", "PHP", "Python", "HTML", "CSS", "Kotlin", "MQL5"],
  },
  {
    id: "testing-devops",
    label: "Testing & DevOps",
    description: "Automated test suites, browser QA matrices, and reliable edge/cloud deployments.",
    items: [
      "Jest",
      "Supertest",
      "Playwright",
      "Unit Testing",
      "Git & GitHub Actions",
      "GitLab",
      "Vercel",
      "Cloudflare Workers",
      "Hostinger",
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
      "Taught design and programming fundamentals and shared practical software engineering insights with incoming cohorts.",
  },
  {
    role: "Event Coordinator",
    organization: "Sisfo Insinco",
    period: "2024",
    summary:
      "Directed a cybersecurity-themed design competition covering logistics, judging criteria, participant comms, and marketing.",
  },
  {
    role: "Volunteer & Programming Tutor",
    organization: "Relawan TIK Jember (RTIK)",
    period: "2024",
    summary:
      "Mentored 5th-grade students building Scratch games (Catch Me, Dino Chrome) and promoted digital literacy at SDN2 Plalangan.",
  },
];
