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

export interface AiWorkflowStage {
  id: string;
  step: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  tools: string[];
  artifactTitle: string;
  artifactLanguage: string;
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
    "Full-Stack Web Developer (Bachelor of Information Systems, GPA 3.94/4.00) building production web systems with Next.js, NestJS/Express, Prisma, and PostgreSQL — accelerated by AI coding agents, deterministic PRDs, and custom TypeScript MCP servers.",
  subSummary:
    "From hybrid retrieval RAG engines (91.67% Recall, 26× faster cached responses) and offline-first healthcare PWAs to 12-module construction ERPs and multi-agent engineering harnesses.",
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
      value: "43+",
      label: "MCP Tools Built",
      sub: "2 TypeScript Servers",
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
    id: "mcp-servers",
    index: "03",
    title: "Principal Agentic Harness & 3D QA MCP",
    subtitle: "Two TypeScript Model Context Protocol Servers",
    category: "MCP & Agentic",
    year: "2026",
    featuredTag: "43+ MCP Tools · 21 Agent Skills",
    summary:
      "Two Clean Architecture TypeScript MCP servers powering autonomous multi-agent software engineering, 13-viewport Playwright QA, and automated Three.js/WebGL scene auditing.",
    problem:
      "AI coding agents frequently drift out of scope, overwrite concurrent files, skip real browser checks, or fabricate UI/3D verification passes without objective evidence.",
    solution:
      "Authored Principal Agentic Harness (23 tools: DAG planning, exclusive file locking, evidence registry, quality gates, 13-viewport Playwright localhost QA, 21 Agent Skills) and Three.js Visual QA (20+ WebGL inspection & screenshot diffing tools).",
    engineeringDecisions: [
      "Enforced strict task DAG dependencies, atomic file locks, and evidence-backed quality gates so agents cannot self-attest unverified completions.",
      "Automated Playwright responsive & visual accessibility audits across 13 viewport profiles (320px to 1920px) with deduplicated screenshot artifacts.",
      "Built 20+ Three.js/WebGL diagnostic tools inspecting geometry collisions, mesh integrity, WebGL health, FPS budgets, and visual reference diffs.",
    ],
    metrics: [
      { label: "Agentic Harness", value: "23 Tools", detail: "+ 21 Agent Skills" },
      { label: "Three.js QA", value: "20+ Tools", detail: "WebGL + Ref Diff" },
      { label: "QA Viewports", value: "13", detail: "320px → 1920px" },
    ],
    tech: [
      "TypeScript",
      "Model Context Protocol",
      "Clean Architecture",
      "Playwright",
      "Three.js / WebGL",
      "Agent Skills",
    ],
    links: [
      {
        label: "Agentic Harness",
        href: "https://github.com/vickyymosafan/mcp_principal-agentic-harness",
        kind: "github",
      },
      {
        label: "Three.js Visual QA",
        href: "https://github.com/vickyymosafan/mcp_threejs-visual-qa",
        kind: "github",
      },
    ],
    architecture: [
      { id: "agent", label: "AI Coding Agent", sublabel: "Claude / Antigravity", layer: "ai" },
      { id: "dag", label: "Task DAG + Locks", sublabel: "23 Harness Tools", layer: "orchestration" },
      { id: "qa", label: "Playwright + 3D QA", sublabel: "13 Viewports + Diff", layer: "client" },
      { id: "gate", label: "Evidence Gate", sublabel: "Verified Pass Only", layer: "data" },
    ],
  },
  {
    id: "buildflow-erp",
    index: "04",
    title: "BuildFlow ERP",
    subtitle: "Construction Enterprise Management System",
    category: "Enterprise ERP",
    year: "2026",
    featuredTag: "12 Domain Modules · Outbox Pattern",
    summary:
      "Modular monolith ERP designed for mid-size construction enterprises spanning 12 tightly bounded business modules from BOQ cost control to double-entry finance and BI.",
    problem:
      "Construction teams suffer from fragmented spreadsheets across field operations, procurement invoices, and accounting ledgers, causing budget overruns and reconciliation drift.",
    solution:
      "Architected a 12-module Next.js + NestJS ERP backed by PostgreSQL, Prisma, Redis + BullMQ transactional outbox, MinIO document storage, OpenAPI contracts, ERD, and an RBAC security matrix.",
    engineeringDecisions: [
      "Structured 12 clear domain boundaries: project management, BOQ cost control, procurement with 3-way matching, inventory, double-entry finance, site operations, and BI.",
      "Used Redis + BullMQ with a transactional outbox pattern for reliable async workflows and event consistency.",
      "Documented full pnpm workspace architecture, relational ERD, RBAC/security matrix, and OpenAPI-first contracts.",
    ],
    metrics: [
      { label: "Domain Modules", value: "12", detail: "Modular Monolith" },
      { label: "Procurement", value: "3-Way", detail: "PO · GRN · Invoice" },
      { label: "Reliability", value: "Outbox", detail: "Redis + BullMQ" },
    ],
    tech: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "Prisma",
      "Redis + BullMQ",
      "MinIO",
      "shadcn/ui",
      "OpenAPI",
    ],
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/vickyymosafan/fullstack_buildflow-erp",
        kind: "github",
      },
    ],
    architecture: [
      { id: "web", label: "Next.js + shadcn", sublabel: "12 ERP Modules", layer: "client" },
      { id: "api", label: "NestJS Monolith", sublabel: "OpenAPI + RBAC", layer: "orchestration" },
      { id: "queue", label: "BullMQ Outbox", sublabel: "Async Events", layer: "ai" },
      { id: "db", label: "PostgreSQL + MinIO", sublabel: "Double-Entry + Files", layer: "data" },
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
    tagline: "Zero guesswork before the first line of code",
    description:
      "Every project starts with a machine-readable engineering blueprint: domain modules, relational ERD, RBAC threat model, OpenAPI contracts, and measurable acceptance criteria.",
    tools: ["Deterministic PRDs", "OpenAPI Spec", "ERD & RBAC Matrix", "Threat Modeling"],
    artifactTitle: "blueprint/buildflow-erp.contract.yaml",
    artifactLanguage: "YAML",
    artifactLines: [
      "domain_modules: 12 # BOQ, Procurement 3-Way, Double-Entry, BI",
      "invariants:",
      "  - id: INV-01",
      "    rule: atomic_inventory_reservation_before_payment_capture",
      "  - id: INV-02",
      "    rule: idempotent_webhook_with_transactional_outbox",
      "acceptance_gates: [typecheck, jest_supertest, playwright_13vp]",
    ],
    outcome: "Eliminates prompt drift and aligns humans + coding agents on one source of truth.",
  },
  {
    id: "mcp",
    step: "02",
    title: "Multi-Agent Orchestration via Custom MCP",
    shortTitle: "MCP Orchestration",
    tagline: "Tool-enforced engineering discipline, not raw chat prompting",
    description:
      "Using Claude Code, Google Antigravity, and my own Principal Agentic Harness MCP server (23 tools + 21 Agent Skills), work decomposes into parallel task DAGs with exclusive file locks.",
    tools: ["Claude Code", "Google Antigravity", "Principal Agentic Harness", "21 Agent Skills"],
    artifactTitle: "mcp/craftrig.task-dag.json",
    artifactLanguage: "JSON",
    artifactLines: [
      '{ "mcp_server": "principal-agentic-harness", "tools": 23, "skills": 21 }',
      '{ "task": "frontend-workstream", "ownedPaths": ["src/components/sections"] }',
      '{ "task": "motion-workstream",   "ownedPaths": ["src/components/motion"] }',
      '{ "guard": "file_lock_exclusive", "anti_gaming": "evidence_required" }',
    ],
    outcome: "Parallel execution with zero merge collisions and auditable task handoffs.",
  },
  {
    id: "fullstack",
    step: "03",
    title: "Clean Architecture Full-Stack Build",
    shortTitle: "Full-Stack Build",
    tagline: "Typed end-to-end from UI micro-interactions to PostgreSQL & Edge",
    description:
      "AI accelerates scaffolding and iteration while human engineering governs clean boundaries, database indexing, offline IndexedDB caching, and hybrid RAG retrieval tuning.",
    tools: ["Next.js 16 / React 19", "NestJS / Express / Hono", "Prisma + PostgreSQL", "Redis + BullMQ"],
    artifactTitle: "rag/weighted-rrf.pipeline.ts",
    artifactLanguage: "TypeScript",
    artifactLines: [
      "const semanticTop50 = await pgvector.search(geminiEmbedding, { limit: 50 });",
      "const lexicalRanked = bm25.rerank(query, semanticTop50);",
      "const fusedTop5 = weightedRRF(semanticTop50, lexicalRanked, { k: 60 });",
      "// Benchmarked: Recall 75% -> 91.67% | MRR 0.71 -> 1.00 | Redis 694ms",
    ],
    outcome: "Production-grade code that stays readable, modular, and maintainable.",
  },
  {
    id: "qa",
    step: "04",
    title: "Autonomous Verification & Visual QA",
    shortTitle: "Autonomous QA",
    tagline: "Real browsers, real contrast math, real 3D & API tests",
    description:
      "Never trust self-attestation. Every feature runs through Jest/Supertest suites, Playwright across 13 viewport profiles (320px–1920px), axe-core contrast audits, and Three.js Visual QA.",
    tools: ["Playwright (13 Viewports)", "Jest & Supertest", "axe-core A11y", "Three.js Visual QA MCP"],
    artifactTitle: "qa/localhost-verification.receipt.json",
    artifactLanguage: "JSON",
    artifactLines: [
      '{ "viewports_checked": [320, 360, 375, 390, 414, 430, 768, 844, 1024, 1280, 1366, 1440, 1920] }',
      '{ "horizontal_overflow": 0, "console_errors": 0, "wcag_contrast": "AA/AAA" }',
      '{ "themes_verified": ["dark", "light"], "reduced_motion": "verified" }',
      '{ "quality_gate": "PASS", "evidence_linked": true }',
    ],
    outcome: "Catches layout regressions, contrast issues, and runtime bugs before shipping.",
  },
  {
    id: "ship",
    step: "05",
    title: "Measured Delivery & Continuous Reliability",
    shortTitle: "Measured Delivery",
    tagline: "Shipped to edge & cloud with fallbacks and observable proof",
    description:
      "Deployed via GitHub Actions to Vercel, Cloudflare Workers, or Hostinger with resilient fallback datasets, multi-LLM failover chains, and clear engineering documentation.",
    tools: ["GitHub Actions", "Vercel", "Cloudflare Workers", "Multi-LLM Failover"],
    artifactTitle: "deploy/resilience-checklist.md",
    artifactLanguage: "Markdown",
    artifactLines: [
      "- [x] Multi-LLM fallback: Gemini -> Groq -> Cohere -> OpenRouter",
      "- [x] Redis cache path: 18.3s -> 694ms (26x faster academic QA)",
      "- [x] Market feed fallback dataset guarantees zero blank charts",
      "- [x] Offline IndexedDB (Dexie) sync for field health workers",
    ],
    outcome: "Fast, resilient web products engineered for real-world network conditions.",
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
