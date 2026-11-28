import type { ArchitectureNode } from "@/data/portfolio";

export type FlagshipCaseStudySlug =
  | "buildflow-erp"
  | "arven-ecommerce"
  | "nexapip-marketplace"
  | "mcp-craftrig"
  | "beyond-rag";

export const CASE_STUDY_SLUGS: readonly FlagshipCaseStudySlug[] = [
  "buildflow-erp",
  "arven-ecommerce",
  "nexapip-marketplace",
  "mcp-craftrig",
  "beyond-rag",
] as const;

export function isCaseStudySlug(value: string): value is FlagshipCaseStudySlug {
  return (CASE_STUDY_SLUGS as readonly string[]).includes(value);
}

export function hasCaseStudyPage(projectId: string): boolean {
  return isCaseStudySlug(projectId);
}

export interface CaseStudyMetric {
  value: string;
  label: string;
  detail: string;
}

export interface StoryChapter {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  calloutLabel: string;
  calloutValue: string;
}

export interface ColorTokenSwatch {
  name: string;
  hex: string;
  role: string;
  onHex: string;
}

export interface TypographyPair {
  role: string;
  family: string;
  usage: string;
  sample: string;
}

export interface DesignSystemSpec {
  themeLabel: string;
  philosophy: string;
  geometryRule: string;
  densityRule: string;
  swatches: ColorTokenSwatch[];
  typography: TypographyPair[];
  uxPrinciples: string[];
}

export type MockupScreenId =
  | "buildflow-exec-dashboard"
  | "buildflow-mobile-pwa"
  | "buildflow-procurement-3way"
  | "buildflow-process-erd"
  | "arven-storefront-editorial"
  | "arven-outfit-studio"
  | "arven-admin-ops"
  | "arven-worker-queues"
  | "nexapip-catalog-tester"
  | "nexapip-ex5-vault"
  | "nexapip-buyer-library"
  | "nexapip-mayar-circuit"
  | "craftrig-dag-locks"
  | "craftrig-playwright-qa"
  | "craftrig-blueprint-sqlite"
  | "craftrig-quality-gate"
  | "beyond-rag-chat-ui"
  | "beyond-rag-admin-dashboard"
  | "beyond-rag-asi-pipeline"
  | "beyond-rag-llm-cascade";

export interface UiScreenShowcase {
  id: MockupScreenId;
  tabLabel: string;
  title: string;
  routeBadge: string;
  summary: string;
  uxHighlights: string[];
}

export interface WorkflowStep {
  step: string;
  phase: string;
  title: string;
  actor: string;
  userAction: string;
  systemAction: string;
  guarantee: string;
}

export interface FunctionalModule {
  code: string;
  name: string;
  group: string;
  summary: string;
  capabilities: string[];
}

export interface SystemInvariant {
  title: string;
  category: string;
  detail: string;
}

export interface CaseStudyRecord {
  slug: FlagshipCaseStudySlug;
  index: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  scopeBadge: string;
  heroImage: string;
  repoUrl: string;
  repoLabel: string;
  secondaryLink?: {
    label: string;
    href: string;
  };
  stats: CaseStudyMetric[];
  storyIntro: string;
  storyChapters: StoryChapter[];
  designSystem: DesignSystemSpec;
  uiScreens: UiScreenShowcase[];
  workflowTitle: string;
  workflowSubtitle: string;
  workflowSteps: WorkflowStep[];
  moduleGroups: string[];
  modules: FunctionalModule[];
  architecture: ArchitectureNode[];
  invariants: SystemInvariant[];
  techStack: string[];
}

export const CASE_STUDIES: Record<FlagshipCaseStudySlug, CaseStudyRecord> = {
  "buildflow-erp": {
    slug: "buildflow-erp",
    index: "01",
    title: "BuildFlow Construction ERP",
    shortTitle: "BuildFlow ERP",
    subtitle: "12 Core Vertical Slices + 21 Enterprise Extensions for Mid-Size Contractors",
    tagline:
      "Unifying RAB/BOQ budget baselines, 3-way procurement matching, multi-warehouse stock ledgers, offline PWA daily site reports, and double-entry accounting in one calm enterprise workspace.",
    category: "Enterprise Construction ERP",
    year: "2026",
    role: "Lead Full-Stack Architect & UI/UX Designer",
    scopeBadge: "33 NestJS Modules · 34 Dashboard Routes",
    heroImage: "/images/redesign/proj-buildflow-erp.jpg",
    repoUrl: "https://github.com/vickyymosafan/fullstack_buildflow-erp",
    repoLabel: "View BuildFlow Repository",
    stats: [
      {
        value: "12 + 21",
        label: "ERP Modules",
        detail: "12 core slices + 21 enterprise extensions",
      },
      {
        value: "3-Way",
        label: "Procurement Lock",
        detail: "PO · Goods Receipt · Vendor Invoice",
      },
      {
        value: "NUMERIC(18,4)",
        label: "Ledger Precision",
        detail: "Double-entry GL with zero float drift",
      },
      {
        value: "Offline PWA",
        label: "Field Reporting",
        detail: "Site reports, weather & photo queue",
      },
    ],
    storyIntro:
      "Mid-size construction contractors (50 to 300 staff) rarely fail because they lack engineering skill on site. They bleed margin because the job site, purchasing desk, warehouse, and finance office run on four disconnected spreadsheets that only reconcile weeks after materials are poured.",
    storyChapters: [
      {
        index: "01",
        eyebrow: "THE OPERATIONAL BREAKDOWN",
        title: "Closing the Gap Between Field Execution and Financial Truth",
        body: "When an estimator locks a Bill of Quantities (RAB/BOQ) at contract signing, every subsequent Purchase Request, site delivery, subcontract progress claim, and journal voucher must stay tied to that baseline. In traditional contractor setups, site supervisors text material requests over chat, warehouses track cement by hand, and Finance discovers a 14% budget overrun only at monthly closing.",
        calloutLabel: "Core Objective",
        calloutValue: "Every rupiah spent on site traces directly back to a locked WBS & BOQ cost code.",
      },
      {
        index: "02",
        eyebrow: "SYSTEM ARCHITECTURE & ASYNC DISCIPLINE",
        title: "Modular Monolith with CQRS & Transactional Outbox",
        body: "Built inside a pnpm + Turborepo workspace, BuildFlow pairs a Next.js 15 App Router web and offline PWA client with a NestJS CQRS REST API and PostgreSQL 16 (UUIDv7 keys, NUMERIC(18,4) financials, NUMERIC(14,4) quantities). Cross-module side effects—such as posting a Goods Receipt to Inventory and triggering an accrual journal in Finance—publish through a PostgreSQL domain_outbox table processed asynchronously by Redis 7 + BullMQ workers.",
        calloutLabel: "Zero Split-Brain",
        calloutValue: "domain_outbox guarantees atomic database commits before BullMQ emits downstream events.",
      },
      {
        index: "03",
        eyebrow: "ENTERPRISE UI/UX & GOVERNANCE",
        title: "Calm Data Density Paired with Segregation of Duties",
        body: "Construction managers review hundreds of BOQ lines and approval queues daily. Instead of loud neon dashboards, BuildFlow applies a calm Slate-and-Navy enterprise design contract with tabular monospace document codes (PR/PROJ-2026/001, PO/2026/10/0042, JV/2026/10/0123). Access is governed by Triple-Tier RBAC scoping (organization -> branch -> project) and strict Segregation of Duties so a requester can never self-approve high-value POs or vendor disbursements.",
        calloutLabel: "RBAC + SoD Matrix",
        calloutValue: "8 operational roles · Argon2id auth · Executive MFA · Append-only audit logs.",
      },
    ],
    designSystem: {
      themeLabel: "Calm Data-Dense Construction Enterprise System",
      philosophy:
        "High legibility across long finance and engineering sessions. Chromatic restraint reserves warm amber and muted crimson strictly for budget overruns, variance holds, and pending approvals.",
      geometryRule: "Structured precision radii: 4px badges & controls, 6px dense inputs, 8px cards, crisp 1px borders.",
      densityRule: "240px collapsible dark navy rail + sticky 64px utility header + 16px modular grid gutter.",
      swatches: [
        { name: "Deep Navy", hex: "#17324D", role: "Navigation Rail & Primary Chrome", onHex: "#FFFFFF" },
        { name: "Steel Blue", hex: "#2F6B9A", role: "Primary CTA & Active Selection", onHex: "#FFFFFF" },
        { name: "Off-White Canvas", hex: "#F4F7FA", role: "Application Viewport Surface", onHex: "#17324D" },
        { name: "Slate Ink", hex: "#2D3D4B", role: "Primary Body & Ledger Copy", onHex: "#FFFFFF" },
        { name: "Sage Approved", hex: "#4D8B70", role: "Matched 3-Way & Approved State", onHex: "#FFFFFF" },
        { name: "Amber Warning", hex: "#C18A3A", role: "Pending Approval & Threshold Alert", onHex: "#FFFFFF" },
        { name: "Muted Crimson", hex: "#B95B5B", role: "BOQ Overrun & Rejected Variance", onHex: "#FFFFFF" },
      ],
      typography: [
        {
          role: "Interface & Hierarchy",
          family: "Inter",
          usage: "Navigation, module headings, dense ERP forms, KPI labels",
          sample: "Executive Project Control · 12 Active Sites",
        },
        {
          role: "Document Codes & Ledgers",
          family: "JetBrains Mono",
          usage: "PR/PO/JV numbering, IDR currency columns, stock quantities (tabular-nums)",
          sample: "PO/2026/10/0042 · IDR 32,000,000,000.0000",
        },
      ],
      uxPrinciples: [
        "Every financial table aligns currency right with tabular numerals to eliminate vertical scanning fatigue.",
        "Approval queues expose BOQ baseline vs. committed spend inline so directors never leave the review drawer.",
        "Mobile Site Operations switches to large 48px touch targets with offline IndexedDB sync badges for low-signal job sites.",
        "Destructive or ledger-posting actions enforce confirmation summaries showing exact debit/credit impact.",
      ],
    },
    uiScreens: [
      {
        id: "buildflow-exec-dashboard",
        tabLabel: "Executive Overview",
        title: "Director KPI Command & Project Health Dashboard",
        routeBadge: "/dashboard · Official Mockup Asset",
        summary:
          "Unifies 12 active projects, IDR 32.0B total contract value, 68% aggregate budget utilization, monthly cash inflow vs. outflow curves, and pending director approvals on one scannable viewport.",
        uxHighlights: [
          "Top KPI strip surfaces contract value, utilization %, and overdue AR immediately above the fold.",
          "Pending Approvals widget keeps director sign-offs one click away with instant PO/PR context.",
          "Deep Navy left rail groups all 12 core modules cleanly without visual clutter.",
        ],
      },
      {
        id: "buildflow-mobile-pwa",
        tabLabel: "Mobile Field PWA",
        title: "Offline-First Daily Site Report (DSR) for Job Sites",
        routeBadge: "/site-ops/daily-reports · Official Mobile Asset",
        summary:
          "Designed for Site Supervisors standing on active scaffolding with unstable 4G signal. Captures weather conditions, active mandor/worker headcount, progress notes, and geo-tagged site photos into a resilient offline sync queue.",
        uxHighlights: [
          "Single-column thumb-friendly form with oversized weather & status selectors.",
          "Local draft persistence queues photos and progress payloads until connectivity recovers.",
          "Submits structured DSR/PRJ-01/2026-10-31 entries straight into Project WBS & Executive BI.",
        ],
      },
      {
        id: "buildflow-procurement-3way",
        tabLabel: "3-Way Procurement",
        title: "Interactive PO · Goods Receipt · Invoice Matching & BOQ Control",
        routeBadge: "/procurement/three-way-match · Live UI Simulation",
        summary:
          "Prevents over-billing and ghost deliveries by cross-checking Purchase Order quantities, Warehouse Goods Receipts, and Vendor Invoices against the locked RAB/BOQ baseline before Finance can post Accounts Payable.",
        uxHighlights: [
          "Filter live rows by Match Status (Matched, Variance Hold, Awaiting GR) to inspect automated blocks.",
          "Inline BOQ variance telemetry flags unit-price drift before approval reaches Finance.",
          "Enforces Segregation of Duties: creator ID cannot match approver ID above organization threshold.",
        ],
      },
      {
        id: "buildflow-process-erd",
        tabLabel: "Process & ERD",
        title: "6-Stage Construction Lifecycle & Multi-Tenant Conceptual ERD",
        routeBadge: "docs/architecture · Official Blueprint Diagrams",
        summary:
          "Toggle between BuildFlow's end-to-end 6-stage contractor value stream (Acquire -> Close) and its normalized PostgreSQL 16 conceptual domain ERD linking Projects, RAB/BOQ, Procurement, Stock, and Double-Entry GL.",
        uxHighlights: [
          "Maps every operational handoff from CRM Lead & Contract down to As-Built Handover.",
          "Visualizes Triple-Tier Tenant scoping (Organization -> Branch -> Project) across core tables.",
          "Serves as the single source of truth shared between NestJS CQRS handlers and Prisma/Drizzle schemas.",
        ],
      },
    ],
    workflowTitle: "End-to-End Construction ERP Workflow",
    workflowSubtitle:
      "How a single project flows through BuildFlow's 6 operational phases—from winning a tender to closing the final account with balanced general ledgers.",
    workflowSteps: [
      {
        step: "01",
        phase: "ACQUIRE",
        title: "Lead Qualification, Tender Proposal & Contract Signing",
        actor: "Sales / Commercial Director",
        userAction:
          "Logs client inquiry in CRM, prepares tender estimate, converts approved proposal into a formal Construction Contract with retention terms and billing milestones.",
        systemAction:
          "Creates scoped project record under organization_id and branch_id, generates immutable contract code, and provisions project workspace roles.",
        guarantee: "All downstream budgets and billings inherit signed contract value and retention rules.",
      },
      {
        step: "02",
        phase: "PLAN",
        title: "WBS Scheduling & RAB / BOQ Baseline Lock",
        actor: "Project Manager & Quantity Surveyor",
        userAction:
          "Defines Work Breakdown Structure (WBS), Gantt milestones, and itemized RAB/BOQ material, labor, and equipment budgets, then submits baseline for Director lock.",
        systemAction:
          "Freezes versioned BOQ baseline snapshot. Any subsequent scope increase requires a tracked Change Order (Addendum) rather than silent budget edits.",
        guarantee: "Committed cost checks always compare against an auditable, version-locked baseline.",
      },
      {
        step: "03",
        phase: "PROCURE",
        title: "PR -> RFQ Bidding -> PO -> Goods Receipt -> 3-Way Match",
        actor: "Site Engineer, Procurement Mgr & Warehouse Staff",
        userAction:
          "Site raises Purchase Request linked to WBS cost code; Procurement compares vendor RFQ quotes and issues Purchase Order; Warehouse records physical Goods Receipt upon delivery.",
        systemAction:
          "Validates PO + GR + Vendor Invoice within tolerance, appends immutable stock_movements entry, and enqueues domain_outbox event via BullMQ.",
        guarantee: "Segregation of Duties blocks self-approval; mismatched invoices are auto-held before AP posting.",
      },
      {
        step: "04",
        phase: "EXECUTE",
        title: "Offline PWA Daily Site Reports, QC Checklists & HSE Logs",
        actor: "Site Supervisor & HSE Officer",
        userAction:
          "Records daily weather, mandor/labor attendance, physical % progress, QC inspection checklists, NCR defects, and site photos directly on mobile PWA.",
        systemAction:
          "Queues offline entries locally when signal drops, uploads encrypted attachments to private S3/R2 buckets (15-min signed URLs), and updates WBS actual progress.",
        guarantee: "Field progress updates continuously without losing evidence in zero-signal basements or remote sites.",
      },
      {
        step: "05",
        phase: "CONTROL",
        title: "Cost Variance Tracking, Progress Billing & Double-Entry GL",
        actor: "Finance Manager & Cost Controller",
        userAction:
          "Reviews real-time Budget vs. Committed vs. Actual variance, generates client Progress Claim invoices (AR), approves vendor AP releases, and reconciles Treasury cash flow.",
        systemAction:
          "Posts balanced Journal Vouchers (JV/...) directly to Chart of Accounts in PostgreSQL 16 using NUMERIC(18,4) precision inside Serializable/ACID transactions.",
        guarantee: "Database & domain invariant enforces SUM(debit) === SUM(credit) on every posted journal entry.",
      },
      {
        step: "06",
        phase: "CLOSE",
        title: "Final Account, As-Built Archive & Post-Project Handover",
        actor: "Project Director & Document Controller",
        userAction:
          "Closes open NCR punchlists, archives final CAD/BIM As-Built drawings, releases retention billing, and completes handover & contractor performance evaluation.",
        systemAction:
          "Locks project financial period against backdated postings, generates final project profitability statement in Executive BI, and retains append-only audit trail.",
        guarantee: "Complete regulatory and financial audit trail preserved for post-handover warranty and retention release.",
      },
    ],
    moduleGroups: [
      "All",
      "Core Operations",
      "Finance & Supply Chain",
      "Field, QC & Enterprise Extensions",
    ],
    modules: [
      {
        code: "M01",
        name: "Core Platform, Multi-Tenant RBAC & Audit",
        group: "Core Operations",
        summary: "Organization/branch/project hierarchy, 8 role templates, Segregation of Duties rules, Argon2id auth, MFA, and append-only audit logs.",
        capabilities: [
          "Triple-tier tenant isolation (organization_id -> branch_id -> project_id)",
          "Approval matrix with monetary thresholds and creator != approver SoD check",
          "Tamper-evident audit log capturing actor, IP, entity diff, and timestamp",
        ],
      },
      {
        code: "M02",
        name: "CRM, Tender Pipeline & Contracts",
        group: "Core Operations",
        summary: "Client directory, bid/proposal lifecycle, contract milestone management, and Liquidated Damages (LD) exposure simulation.",
        capabilities: [
          "Lead-to-proposal conversion with bid probability and contract value tracking",
          "Contract retention, addendum, and Liquidated Damages (LD) delay simulator",
          "One-click project provisioning upon signed contract status",
        ],
      },
      {
        code: "M03",
        name: "Project Management (WBS, Gantt & Milestones)",
        group: "Core Operations",
        summary: "Hierarchical Work Breakdown Structure linking schedule baselines, physical progress %, and milestone deliverables.",
        capabilities: [
          "Multi-level WBS tree tied to RAB cost codes and daily site progress",
          "Baseline vs. actual schedule variance and milestone completion gates",
          "Project team roster assignment with branch/site-scoped visibility",
        ],
      },
      {
        code: "M04",
        name: "Cost Estimation & RAB / BOQ Control",
        group: "Finance & Supply Chain",
        summary: "Itemized Bill of Quantities baseline locking, real-time Budget vs. Committed vs. Actual variance, and formal Change Orders.",
        capabilities: [
          "Version-locked RAB/BOQ baseline preventing unapproved budget drift",
          "Automated pre-commitment budget check on every Purchase Request",
          "Change Order / Variation workflow revising contract and budget ceilings",
        ],
      },
      {
        code: "M05",
        name: "Procurement, RFQ Bidding & 3-Way Matching",
        group: "Finance & Supply Chain",
        summary: "Full procure-to-pay chain from PR and vendor RFQ comparison through PO, Goods Receipt, and automated 3-way invoice verification.",
        capabilities: [
          "Side-by-side vendor quotation comparison and vendor rating history",
          "Strict 3-way match comparing PO, Goods Receipt, and Vendor Invoice",
          "Automated hold status & escalation when price or quantity exceeds tolerance",
        ],
      },
      {
        code: "M06",
        name: "Inventory & Multi-Warehouse Stock Ledger",
        group: "Finance & Supply Chain",
        summary: "Central depot and project site warehouse tracking driven by an immutable stock_movements append-only ledger.",
        capabilities: [
          "Immutable stock_movements ledger (Inbound GR, Site Issue, Inter-Site Transfer)",
          "Real-time stock valuation and low-stock reorder alerts per site",
          "Zero silent balance overwrites—corrections post audited adjustment entries",
        ],
      },
      {
        code: "M07",
        name: "Finance, Double-Entry GL & Treasury",
        group: "Finance & Supply Chain",
        summary: "Chart of Accounts, automated double-entry Journal Vouchers, AR progress billing, AP disbursement, and project P&L.",
        capabilities: [
          "Enforced SUM(debit) === SUM(credit) double-entry ledger with NUMERIC(18,4)",
          "Automated accruals from approved Goods Receipts & subcontract claims",
          "Project profitability dashboard, aging AR/AP, and Treasury cash-flow projection",
        ],
      },
      {
        code: "M08",
        name: "HR, Workforce & Project Timesheets",
        group: "Core Operations",
        summary: "Employee & mandor directory, site attendance logs, leave workflows, and labor cost allocation back to project WBS.",
        capabilities: [
          "Daily project timesheets charging labor hours directly to WBS cost codes",
          "Attendance, overtime, and leave approval aligned with site calendars",
          "Role-based access syncing HR profiles with ERP authorization scopes",
        ],
      },
      {
        code: "M09",
        name: "Offline PWA Site Operations & Daily Reports",
        group: "Field, QC & Enterprise Extensions",
        summary: "Mobile-first Daily Site Report (DSR) workflow built for offline construction environments with photo evidence and sync recovery.",
        capabilities: [
          "Captures weather, workforce count, equipment hours, and narrative site logs",
          "Offline draft storage with automatic background retry once signal returns",
          "Private S3/R2 photo storage served via short-lived (<= 15 min) signed URLs",
        ],
      },
      {
        code: "M10",
        name: "Document Control, QC/HSE & Executive BI",
        group: "Field, QC & Enterprise Extensions",
        summary: "Versioned CAD/BIM drawings and submittals, QC inspection checklists, NCR defect tracking, HSE incident reports, and BI analytics.",
        capabilities: [
          "Drawing revision control, RFI submittals, and As-Built closeout packs",
          "QC checklists, Non-Conformance Reports (NCR), and HSE safety compliance",
          "Director BI rollup across portfolio margin, S-curves, and cash forecasts",
        ],
      },
      {
        code: "EXT",
        name: "21 Enterprise Extensions (BIM, Subcontractors, Equipment, DR)",
        group: "Field, QC & Enterprise Extensions",
        summary: "Dedicated vertical extensions verified across the repository for scaled construction enterprises.",
        capabilities: [
          "BIM 4D/5D Clash Check & BCF issue topics, Photogrammetry, & IoT Gateway",
          "Subcontractor & Vendor Portal, Equipment Maintenance, & Precast tracking",
          "Joint Operations, Closeout/Handover, Sustainability, & PITR Disaster Recovery drills",
        ],
      },
    ],
    architecture: [
      { id: "bf-web", label: "Next.js 15 + Offline PWA", sublabel: "34 Routes · Calm Enterprise UI", layer: "client" },
      { id: "bf-api", label: "NestJS CQRS REST API", sublabel: "33 Modules · Triple-Tier RBAC", layer: "orchestration" },
      { id: "bf-outbox", label: "Redis 7 + BullMQ Outbox", sublabel: "domain_outbox Event Relay", layer: "ai" },
      { id: "bf-db", label: "PostgreSQL 16 + S3/R2", sublabel: "UUIDv7 · NUMERIC(18,4) GL", layer: "data" },
    ],
    invariants: [
      {
        title: "Balanced Double-Entry Accounting",
        category: "Financial Integrity",
        detail: "Every journal entry requires SUM(debit) === SUM(credit) in PostgreSQL NUMERIC(18,4) arithmetic—zero floating-point rounding drift.",
      },
      {
        title: "Transactional Outbox Event Delivery",
        category: "Async Reliability",
        detail: "Domain events write to domain_outbox inside the exact SQL transaction as state mutations before BullMQ relays cross-module updates.",
      },
      {
        title: "Segregation of Duties (SoD) & Triple-Tier RBAC",
        category: "Security Governance",
        detail: "Every query enforces organization_id -> branch_id -> project_id scoping, Argon2id credentials, Exec MFA, and non-self-approval rules.",
      },
      {
        title: "Immutable Stock & Audit Ledgers",
        category: "Auditability",
        detail: "stock_movements and audit_logs are strictly append-only; inventory adjustments and reversals create new traceable records.",
      },
    ],
    techStack: [
      "Next.js 15 App Router",
      "NestJS CQRS",
      "TypeScript",
      "PostgreSQL 16",
      "Prisma / Drizzle",
      "Redis 7 + BullMQ",
      "MinIO / R2 S3",
      "Turborepo + pnpm",
      "Offline PWA",
      "OpenAPI 3.1",
    ],
  },

  "arven-ecommerce": {
    slug: "arven-ecommerce",
    index: "02",
    title: "Arven Luxury E-Commerce",
    shortTitle: "Arven E-Commerce",
    subtitle: "Beyond Trends. Beyond Time. — Contemporary Luxury D2C Storefront, 3D Studio & Admin Ops",
    tagline:
      "A 4-app luxury fashion modular monolith uniting warm ivory editorial storytelling, commerce-first 3D Outfit Studio & Virtual Showroom, deadlock-free atomic inventory locks, and idempotent Midtrans checkout.",
    category: "Luxury D2C Commerce Platform",
    year: "2026",
    role: "Full-Stack Architect & Brand Systems Engineer",
    scopeBadge: "4 Apps · 7 Packages · 17 API Modules",
    heroImage: "/images/redesign/proj-arven-ecommerce.jpg",
    repoUrl: "https://github.com/vickyymosafan/arven-ecommerce",
    repoLabel: "View Arven Repository",
    stats: [
      {
        value: "4 Apps",
        label: "Deployable Units",
        detail: "Storefront · Admin · API · Worker",
      },
      {
        value: "17 Modules",
        label: "NestJS 12 Core",
        detail: "5 isolated lifecycle state machines",
      },
      {
        value: "8 Queues",
        label: "BullMQ 6 Async",
        detail: "Payment, inventory, 3D assets & ops",
      },
      {
        value: "0 Oversell",
        label: "Atomic Stock Lock",
        detail: "Sorted variant_id DB transactions",
      },
    ],
    storyIntro:
      "Luxury fashion drops create a sharp engineering tension: shoppers expect gallery-grade editorial serenity and interactive 3D garment styling, yet limited archival pieces trigger intense concurrent checkout bursts where a single race condition causes embarrassing oversells or duplicate Midtrans captures.",
    storyChapters: [
      {
        index: "01",
        eyebrow: "THE COMMERCE-FIRST PARADOX",
        title: "Luxury Visual Polish Without Sacrificing Conversion Reliability",
        body: "Many 3D fashion sites trap shoppers behind heavy WebGL preloaders that fail on mobile browsers. ARVEN inverts that assumption with a strict Commerce-First invariant: every product page, editorial lookbook, cart, and Midtrans checkout works at full speed with zero WebGL dependency, while React Three Fiber 9 powers lazy-loaded 3D Showroom and Outfit Studio experiences with instant poster fallbacks.",
        calloutLabel: "Commerce-First Rule",
        calloutValue: "100% browse-to-checkout reliability without WebGL; 3D upgrades progressively.",
      },
      {
        index: "02",
        eyebrow: "4-APP MODULAR MONOLITH",
        title: "Shared Contracts Across Storefront, Admin, API & Worker",
        body: "Structured in Turborepo across 4 deployable applications (apps/storefront, apps/admin, apps/api in NestJS 12 ESM + Express 5, apps/worker in BullMQ 6) and 7 workspace packages (@arven/database, @arven/contracts, @arven/validators, @arven/ui, @arven/three-engine, @arven/config, @arven/observability). PostgreSQL 18 via Prisma 7 (@prisma/adapter-pg) and Redis 8 orchestrate 17 domain modules and 8 isolated job queues.",
        calloutLabel: "Transactional Rigor",
        calloutValue: "Server-authoritative IDR pricing · Idempotency-Key · 5 separate state machines.",
      },
      {
        index: "03",
        eyebrow: "DUAL-SURFACE DESIGN CONTRACT",
        title: "Warm Ivory Atelier Storefront Meets Charcoal Operations Console",
        body: "The customer storefront breathes in Warm Ivory (#F8F7F3) and Archival Cream (#E9E4DA) paired with Cormorant Garamond headlines and sharp 0px architectural photography frames. Across the aisle, apps/admin flips to high-clarity Charcoal (#17191B) and Graphite (#35383A) protected by Argon2id + TOTP MFA so merchandisers and ops staff can process orders, stock movements, returns, and 3D assets cleanly.",
        calloutLabel: "Brand Identity",
        calloutValue: "Editorial light gallery for buyers · Precision dark console for operations.",
      },
    ],
    designSystem: {
      themeLabel: "Dual-Surface Editorial Ivory & Charcoal Ops Contract",
      philosophy:
        "Timeless luxury minimalism inspired by archival fashion ateliers—generous negative space, razor-sharp 0px photography crops, and restrained cobalt/sage/ochre/terracotta operational signals.",
      geometryRule: "Architectural sharp corners: 0px editorial frames & tables, 2px inputs, 4px buttons, 8px dialogs.",
      densityRule: "Airy magazine grid on Storefront vs. high-clarity operational tables on Dark Charcoal Admin.",
      swatches: [
        { name: "Editorial Ivory", hex: "#F8F7F3", role: "Storefront Primary Canvas", onHex: "#17191B" },
        { name: "Archival Cream", hex: "#E9E4DA", role: "Lookbook Panels & Subtle Cards", onHex: "#17191B" },
        { name: "Charcoal Ink", hex: "#17191B", role: "Storefront Ink & Admin Canvas", onHex: "#F8F7F3" },
        { name: "Graphite Panel", hex: "#35383A", role: "Admin Elevated Surface", onHex: "#F8F7F3" },
        { name: "Atelier Cobalt", hex: "#1F4E79", role: "Primary Action & Focus Accent", onHex: "#FFFFFF" },
        { name: "Sage Available", hex: "#416B59", role: "In-Stock & Confirmed State", onHex: "#FFFFFF" },
        { name: "Ochre Reserve", hex: "#875B12", role: "Low Stock & Reservation Hold", onHex: "#FFFFFF" },
        { name: "Terracotta Sold", hex: "#9C3D3D", role: "Sold Out & Return Escalation", onHex: "#FFFFFF" },
      ],
      typography: [
        {
          role: "Editorial Display",
          family: "Cormorant Garamond",
          usage: "Collection headlines, lookbook essays, product titles",
          sample: "ARCHIVAL SS26 · BEYOND TIME",
        },
        {
          role: "Commerce UI & Admin",
          family: "Plus Jakarta Sans",
          usage: "Navigation, filters, checkout forms, admin tables",
          sample: "Server-verified IDR pricing · Express delivery",
        },
        {
          role: "SKUs & Order Ledger",
          family: "IBM Plex Mono",
          usage: "Variant SKUs, Order IDs, idempotency keys, webhook signatures",
          sample: "ARV-SS26-COAT-M · IDR 4.850.000",
        },
      ],
      uxPrinciples: [
        "Never block product imagery behind WebGL spinners—3D assets hydrate lazily over crisp editorial posters.",
        "Price and stock availability always come from authoritative server snapshots at checkout initiation.",
        "State transitions in Admin are explicit guarded actions—never raw unchecked status dropdown overrides.",
        "All timestamps store in UTC internally and format cleanly to Asia/Jakarta (WIB) and Indonesian Rupiah (IDR).",
      ],
    },
    uiScreens: [
      {
        id: "arven-storefront-editorial",
        tabLabel: "Editorial Storefront",
        title: "Archival Atelier Lookbook & Variant Commerce Frame",
        routeBadge: "/collections/atelier · Real Storefront Assets",
        summary:
          "Showcases ARVEN's real verified editorial photography (atelier.webp & archival-ss26-01.webp) inside the authentic Warm Ivory (#F8F7F3) gallery design system with interactive size availability and live IDR pricing.",
        uxHighlights: [
          "0px architectural editorial frames emphasize tailoring silhouette and fabric texture.",
          "Live size pills reflect real inventory buckets (Available, Reserved Hold, Sold Out).",
          "Zero WebGL required for full catalog browsing, lookbook reading, and cart conversion.",
        ],
      },
      {
        id: "arven-outfit-studio",
        tabLabel: "3D Outfit Studio",
        title: "Mannequin Rig Outfit Builder & Virtual 3D Showroom",
        routeBadge: "/outfit-studio & /showroom · Hybrid R3F Preview",
        summary:
          "Interactive styling workspace backed by @arven/three-engine (React Three Fiber 9) where shoppers pair Outerwear, Top, Bottom, and Footwear slots on a mannequin rig, save outfits to /account/outfits, or switch instantly to low-power 2D poster mode.",
        uxHighlights: [
          "Live WebGL vs. 2D Poster Fallback toggle proves Commerce-First progressive enhancement.",
          "Clicking garment slots updates live outfit composition and server-calculated IDR bundle totals.",
          "Supports one-click Add Full Outfit to Cart with per-variant stock validation.",
        ],
      },
      {
        id: "arven-admin-ops",
        tabLabel: "Charcoal Admin Ops",
        title: "5-State-Machine Order Control, Inventory Ledger & TOTP MFA",
        routeBadge: "apps/admin (/orders · /inventory) · Dark Ops UI",
        summary:
          "High-contrast Charcoal (#17191B) back-office dashboard governing catalog, CMS, 3D assets, coupons, RBAC roles, audit logs, and order lifecycle transitions across 5 separate state machines.",
        uxHighlights: [
          "Separates OrderStatus, PaymentStatus, ShipmentStatus, ReturnStatus, and AssetStatus cleanly.",
          "Displays append-only inventory_movements ledger (RECEIPT, RESERVATION, SALE, RELEASE, RETURN_TO_STOCK).",
          "Admin sessions enforce Argon2id passwords plus mandatory TOTP MFA (/mfa/setup & /mfa/verify).",
        ],
      },
      {
        id: "arven-worker-queues",
        tabLabel: "8 BullMQ Queues",
        title: "Transactional Outbox & Redis 8 Async Worker Topology",
        routeBadge: "apps/worker · BullMQ 6 Architecture View",
        summary:
          "Visualizes how ARVEN offloads Midtrans reconciliation, reservation expiry sweeps, transactional emails, media optimization, 3D GLB asset processing, and analytics into 8 dedicated BullMQ queues.",
        uxHighlights: [
          "Isolates mission-critical payment & inventory queues from heavy media/3d-assets pipelines.",
          "Expired unpaid checkouts automatically emit RELEASE movements to restore SKU stock.",
          "payment_events deduplication table guarantees idempotent Midtrans webhook replay safety.",
        ],
      },
    ],
    workflowTitle: "End-to-End Luxury Commerce & Checkout Lifecycle",
    workflowSubtitle:
      "How ARVEN guides a shopper from editorial discovery and 3D styling through deadlock-free atomic reservation and verified Midtrans settlement.",
    workflowSteps: [
      {
        step: "01",
        phase: "DISCOVER",
        title: "Editorial Collections, Lookbooks & Category Browsing",
        actor: "Shopper",
        userAction:
          "Explores seasonal collections (/collections/[slug]), archival lookbook stories (/lookbook/[slug]), and filtered garments (/shop/[category]) in Warm Ivory editorial layouts.",
        systemAction:
          "Serves statically optimized Next.js 16 catalog pages hydrated with live server inventory counts and IDR pricing from NestJS 12.",
        guarantee: "Fast First Contentful Paint and complete browsing even on devices without WebGL support.",
      },
      {
        step: "02",
        phase: "STYLE",
        title: "Interactive 3D Showroom & Mannequin Outfit Studio",
        actor: "Shopper",
        userAction:
          "Launches /showroom or /outfit-studio to inspect garments in 3D, combine Outerwear/Top/Bottom/Footwear slots, and save curated ensembles to /account/outfits.",
        systemAction:
          "@arven/three-engine streams approved AssetStatus GLB models from MinIO/R2 with automatic 2D poster fallback if GPU context is unavailable.",
        guarantee: "3D asset pipeline never blocks or crashes the core shopping cart experience.",
      },
      {
        step: "03",
        phase: "PRICE & LOCK",
        title: "Server-Authoritative Cart & Sorted Atomic Stock Reservation",
        actor: "Checkout Engine (apps/api)",
        userAction:
          "Shopper submits shipping details, optional coupon code, and Idempotency-Key header on /checkout to initiate payment.",
        systemAction:
          "Recalculates every SKU price, tax, shipping fee, and coupon discount strictly on the server; acquires row locks sorted by variant_id and writes RESERVATION records to inventory_movements.",
        guarantee: "Deadlock-free atomic locking makes overselling during concurrent drops mathematically impossible.",
      },
      {
        step: "04",
        phase: "SETTLE",
        title: "Midtrans Payment Verification & Webhook Deduplication",
        actor: "Midtrans Gateway & Payment Worker",
        userAction:
          "Shopper completes IDR payment via Snap (Virtual Account, QRIS, Card, or E-Wallet).",
        systemAction:
          "Verifies Midtrans SHA-512 webhook signature, double-checks authoritative transaction state via Midtrans getStatus API, logs deduplicated payment_events row, and transitions PaymentStatus -> PAID & RESERVATION -> SALE.",
        guarantee: "Duplicate or spoofed webhooks cannot double-charge, double-decrement stock, or forge paid orders.",
      },
      {
        step: "05",
        phase: "FULFILL",
        title: "Admin Fulfillment, Shipping Tracking & Guarded Returns",
        actor: "Operations Admin (TOTP MFA)",
        userAction:
          "Ops team packs shipment in apps/admin (/orders), registers courier airway bill, and processes any customer return request from /account/returns.",
        systemAction:
          "Advances ShipmentStatus & OrderStatus through validated state-machine transitions; approved returns append RETURN_TO_STOCK ledger rows and enqueue customer notifications.",
        guarantee: "Every admin mutation is recorded in audit_logs with actor identity, role, and full transition diff.",
      },
    ],
    moduleGroups: [
      "All",
      "Storefront & 3D Experience",
      "Commerce, Inventory & Payments",
      "Admin Ops, RBAC & Workers",
    ],
    modules: [
      {
        code: "ST-01",
        name: "Editorial Storefront, Lookbooks & Journal",
        group: "Storefront & 3D Experience",
        summary: "Next.js 16 + React 19 luxury storefront spanning collections, lookbooks, product detail pages, and editorial journal.",
        capabilities: [
          "Dedicated routes for /shop, /products/[slug], /collections/[slug], /lookbook/[slug], /journal/[slug]",
          "Server-driven variant stock indicators and responsive archival imagery",
          "Customer account center for orders, saved outfits, returns, and active session management",
        ],
      },
      {
        code: "ST-02",
        name: "Virtual 3D Showroom & Outfit Studio (@arven/three-engine)",
        group: "Storefront & 3D Experience",
        summary: "Lazy-loaded React Three Fiber 9 showroom and mannequin rig styling engine with verified Commerce-First fallback.",
        capabilities: [
          "Slot-based mannequin rig combining Outerwear, Top, Bottom, and Footwear garments",
          "AssetStatus governance ensuring only QA-approved GLB models render live",
          "Graceful degradation to curated editorial posters on constrained mobile GPUs",
        ],
      },
      {
        code: "CM-01",
        name: "Catalog, Collections, Pricing & Promotions",
        group: "Commerce, Inventory & Payments",
        summary: "Structured fashion catalog with variant matrices, curated seasonal collections, and server-validated coupon rules.",
        capabilities: [
          "Multi-attribute garment variants (size, colorway, archival edition) with unique SKUs",
          "Server-authoritative pricing engine preventing client-side cart tampering",
          "Time-bound promo coupons with usage caps and minimum IDR spend guards",
        ],
      },
      {
        code: "CM-02",
        name: "4-Layer Atomic Inventory & Stock Movement Ledger",
        group: "Commerce, Inventory & Payments",
        summary: "Deadlock-free variant stock reservation engine backed by an append-only inventory_movements ledger.",
        capabilities: [
          "Sorted variant_id locking eliminates concurrent checkout database deadlocks",
          "Immutable movement types: RECEIPT, RESERVATION, RELEASE, SALE, ADJUSTMENT, RETURN_TO_STOCK",
          "Automated BullMQ expiry worker releases abandoned reservations back to stock",
        ],
      },
      {
        code: "CM-03",
        name: "4-Layer Checkout, Orders & Midtrans Payments",
        group: "Commerce, Inventory & Payments",
        summary: "Idempotent checkout orchestration with Midtrans cryptographic verification and isolated Order/Payment state machines.",
        capabilities: [
          "Mandatory Idempotency-Key enforcement across checkout initiation requests",
          "Midtrans signature validation + active getStatus verification + payment_events dedup",
          "Independent OrderStatus and PaymentStatus machines preventing illegal state jumps",
        ],
      },
      {
        code: "CM-04",
        name: "Shipping, Returns & Verified Reviews",
        group: "Commerce, Inventory & Payments",
        summary: "End-to-end post-purchase lifecycle covering Indonesian shipping rates, RMA returns, and verified customer reviews.",
        capabilities: [
          "Dedicated ShipmentStatus and ReturnStatus state machines with audit history",
          "Return inspection workflow optionally crediting inventory via RETURN_TO_STOCK",
          "Customer self-service return intake and tracking via /account/returns",
        ],
      },
      {
        code: "OP-01",
        name: "Dark Charcoal Admin Console, RBAC & TOTP MFA",
        group: "Admin Ops, RBAC & Workers",
        summary: "Dedicated Next.js 16 operations portal (apps/admin) protecting catalog, CMS, 3D experience, orders, and runtime health.",
        capabilities: [
          "Argon2id credential hashing with mandatory TOTP MFA (/mfa/setup & /mfa/verify)",
          "Fine-grained RBAC roles (/users, /roles) and immutable /audit-logs inspector",
          "Operational runtime dashboard (/ops/runtime) plus CMS & 3D showroom managers",
        ],
      },
      {
        code: "OP-02",
        name: "8-Queue BullMQ 6 Async Worker Fleet",
        group: "Admin Ops, RBAC & Workers",
        summary: "Dedicated apps/worker NestJS 12 + Redis 8 processor isolating high-priority transactional jobs from media pipelines.",
        capabilities: [
          "8 isolated queues: payment, inventory, order, shipping, notification, media, 3d-assets, analytics",
          "Exponential retry backoff and dead-letter visibility for ops triage",
          "Decouples email, GLB optimization, and analytics from checkout API latency",
        ],
      },
    ],
    architecture: [
      { id: "ar-web", label: "Storefront + Admin", sublabel: "Next.js 16 · React 19 · R3F 9", layer: "client" },
      { id: "ar-api", label: "NestJS 12 ESM API", sublabel: "17 Modules · 5 State Machines", layer: "orchestration" },
      { id: "ar-wrk", label: "BullMQ 6 Worker Fleet", sublabel: "8 Redis 8 Queues + Midtrans", layer: "ai" },
      { id: "ar-db", label: "PostgreSQL 18 + S3", sublabel: "Prisma 7 · Atomic Stock Ledger", layer: "data" },
    ],
    invariants: [
      {
        title: "Deadlock-Free Atomic Stock Reservation",
        category: "Concurrency Safety",
        detail: "Multi-item checkouts lock variant rows in deterministic ascending variant_id order and append RESERVATION rows before payment.",
      },
      {
        title: "5 Independent State Machines",
        category: "Domain Integrity",
        detail: "OrderStatus, PaymentStatus, ShipmentStatus, ReturnStatus, and AssetStatus only move via validated transition guards—never raw patches.",
      },
      {
        title: "Idempotent Midtrans Settlement",
        category: "Payment Security",
        detail: "Combines client Idempotency-Key, webhook SHA-512 verification, live Midtrans getStatus confirmation, and payment_events deduplication.",
      },
      {
        title: "Commerce-First 3D Progressive Enhancement",
        category: "UX Resilience",
        detail: "Full catalog discovery, cart, and checkout operate with zero WebGL dependency; 3D Showroom and Outfit Studio degrade gracefully to posters.",
      },
    ],
    techStack: [
      "Next.js 16 + React 19",
      "React Three Fiber 9",
      "NestJS 12 ESM + Express 5",
      "PostgreSQL 18",
      "Prisma 7 (PrismaPg)",
      "Redis 8 + BullMQ 6",
      "Midtrans Gateway",
      "MinIO / R2 S3",
      "Argon2id + TOTP MFA",
      "Turborepo",
    ],
  },

  "nexapip-marketplace": {
    slug: "nexapip-marketplace",
    index: "03",
    title: "NexaPip Marketplace",
    shortTitle: "NexaPip Marketplace",
    subtitle: "Indonesian MetaTrader 5 (.ex5) Expert Advisor Store · Lifetime IDR & SHA-256 Binary Vault",
    tagline:
      "A clean 4-layer Next.js 16 + Prisma 7 + PostgreSQL marketplace replacing opaque chat rentals with 99.9% Real Tick Strategy Tester transparency, Mayar Lifetime IDR checkout, and a cryptographically validated private .ex5 vault.",
    category: "Fintech & Algorithmic Trading Marketplace",
    year: "2026",
    role: "Creator, Full-Stack Architect & Quantitative UI Designer",
    scopeBadge: "4 Clean Layers · 7 Prisma Models · 15 API Routes",
    heroImage: "/images/redesign/proj-nexapip-marketplace.jpg",
    repoUrl: "https://github.com/vickyymosafan/nexapip-marketplace",
    repoLabel: "View NexaPip Repository",
    stats: [
      {
        value: "Lifetime",
        label: "One-Time IDR Model",
        detail: "Zero subscription · Free updates",
      },
      {
        value: "SHA-256",
        label: ".ex5 Binary Vault",
        detail: "Stored outside public/ with header audit",
      },
      {
        value: "99.9%",
        label: "Real Tick Metrics",
        detail: "PF, DD, Win Rate, Sharpe & Equity SVG",
      },
      {
        value: "Mayar IDR",
        label: "Local Checkout",
        detail: "QRIS · E-Wallet · Virtual Account",
      },
    ],
    storyIntro:
      "Indonesian algorithmic traders buying MetaTrader 5 Expert Advisors face a broken market: unverified bots traded via Telegram DMs, aggressive monthly licensing subscriptions, missing Strategy Tester drawdown proof, and zero guarantee that the file you receive is an authentic compiled .ex5 binary.",
    storyChapters: [
      {
        index: "01",
        eyebrow: "THE TRADER TRUST GAP",
        title: "Replacing Chat-Group Bot Rentals with Verified Lifetime Ownership",
        body: "NexaPip rethinks EA commerce specifically for Indonesian traders (lang='id', Rupiah pricing). Every listed Expert Advisor displays transparent MT5 Strategy Tester telemetry—Net Profit %, Max Drawdown %, Profit Factor, Win Rate %, Sharpe Ratio, Recovery Factor, Total Trades, equity curves, and input parameter disclosures—paired with simple one-time Lifetime IDR ownership via Mayar (QRIS, E-Wallet, Virtual Account).",
        calloutLabel: "Buyer Promise",
        calloutValue: "Pay once in IDR · Permanent /library access · Free lifetime version updates & .set presets.",
      },
      {
        index: "02",
        eyebrow: "CLEAN 4-LAYER ARCHITECTURE",
        title: "Framework-Independent Domain Rules & Cryptographic .ex5 Inspection",
        body: "Built on Next.js 16 App Router, React 19, Prisma 7 (@prisma/adapter-pg), and PostgreSQL, the codebase strictly isolates src/domain, src/application, src/infrastructure, and src/app. Core security lives in pure domain logic: inspectEx5Binary rejects .ex4/.mq4 (MT4) and .mq5/.mqh source uploads, scans for disguised MQL source code (#property, OnTick, OnInit), verifies 64B–50MB bounds and MetaEditor 5 magic headers (EX5\\0 / MQL5 / MZ), hashes with SHA-256, and writes files into private ./storage/ex5/ strictly outside public/.",
        calloutLabel: "Zero Public Leaks",
        calloutValue: "Authenticated streaming routes verify paid Order ownership & record DownloadLog before serving bytes.",
      },
      {
        index: "03",
        eyebrow: "TRADING-DESK UI/UX CRAFT",
        title: "Permanent Orvyn Charcoal & Chartreuse-Lime Precision",
        body: "Designed like an institutional quantitative terminal—Orvyn Charcoal (#090A09) layered canvases, razor-sharp hairlines (#1F231F / #2D332C), high-visibility Chartreuse-Lime (#C8F970) execution triggers, and tabular JetBrains Mono figures so traders compare Profit Factor, Drawdown, and SHA-256 digests with immediate confidence.",
        calloutLabel: "Security & Operations",
        calloutValue: "HTTP-only sessions · scrypt password hashing · src/proxy.ts route guard · Admin Release Studio.",
      },
    ],
    designSystem: {
      themeLabel: "Orvyn Charcoal Quantitative Terminal Aesthetic",
      philosophy:
        "Intentional permanent dark trading-desk visual system prioritizing numeric precision, scannable Strategy Tester telemetry, and unmistakable lime execution states.",
      geometryRule: "Crisp 1px structural dividers (#1F231F/#2D332C), 12px metric cards, pill CTA buttons with dark ink.",
      densityRule: "Tabular monospace telemetry grids paired with spacious Indonesian editorial copy.",
      swatches: [
        { name: "Orvyn Charcoal", hex: "#090A09", role: "Primary Terminal Canvas", onHex: "#F4F6F4" },
        { name: "Vault Surface", hex: "#101210", role: "Product Card & Panel Surface", onHex: "#F4F6F4" },
        { name: "Raised Slate", hex: "#161916", role: "Interactive Metric & Input Well", onHex: "#F4F6F4" },
        { name: "Hairline Border", hex: "#2D332C", role: "Precision Instrument Dividers", onHex: "#F4F6F4" },
        { name: "Chartreuse Lime", hex: "#C8F970", role: "Primary Execution CTA & Verified Glow", onHex: "#090A09" },
        { name: "Bright Lime", hex: "#D7FB94", role: "Hover Highlight & Active Metric", onHex: "#090A09" },
        { name: "Deep Lime", hex: "#9ED93F", role: "Equity Curve Stroke & Badge Border", onHex: "#090A09" },
        { name: "Terminal Ink", hex: "#F4F6F4", role: "Primary High-Contrast Copy", onHex: "#090A09" },
      ],
      typography: [
        {
          role: "Marketplace UI & Copy",
          family: "Inter",
          usage: "Indonesian navigation, strategy descriptions, buyer reviews, checkout steps",
          sample: "Lisensi Lifetime · Bayar Sekali via Mayar IDR",
        },
        {
          role: "Telemetry & SHA-256 Digests",
          family: "JetBrains Mono",
          usage: "Profit Factor, Max DD%, MT5 build numbers, SHA-256 hashes, Rupiah prices",
          sample: "PF 2.48 · DD 8.4% · sha256:9f4b...c71a",
        },
      ],
      uxPrinciples: [
        "Surface Risk before Hype: Max Drawdown %, Recovery Factor, and 99.9% Tick Riil labels appear right alongside Net Profit.",
        "Every downloadable release visibly exposes its SHA-256 checksum and minimum MT5 build number.",
        "Checkout supports familiar Indonesian rails (QRIS, E-Wallet, VA) in clear Rupiah formatting without hidden USD conversion surprises.",
        "Verified-purchase badges prevent fake EA reviews and allow sellers to publish transparent technical replies.",
      ],
    },
    uiScreens: [
      {
        id: "nexapip-catalog-tester",
        tabLabel: "Live Market UI",
        title: "Live /market Catalog Screenshot & 99.9% Real Tick Equity Panel",
        routeBadge: "/market · Real 1440px App Screenshot + Telemetry",
        summary:
          "Actual 1440px live desktop screenshot of NexaPip's /market catalog (ScalpZone EA v5.10 Rp 800.000 & QuantGridPro v6.0 Rp 890.000, MT5 Build 4260+, 7 strategy filters) paired with its verified Equity Curve panel and live strategy switcher.",
        uxHighlights: [
          "Real live screenshot proves NexaPip's Orvyn Charcoal + Chartreuse-Lime anti-slop visual craft.",
          "Surfaces promo pricing, Lifetime ownership tags, minimum deposit, and official .SET preset badges above the fold.",
          "Interactive switcher below compares real Strategy Tester metrics and SHA-256 release digests.",
        ],
      },
      {
        id: "nexapip-ex5-vault",
        tabLabel: "Detail & .EX5 Vault",
        title: "Live /market/[slug] Detail UI & Binary .EX5 SHA-256 Validation",
        routeBadge: "/market/quantgridpro-v6 · Real UI + src/domain/ex5.ts",
        summary:
          "Real desktop capture of QuantGridPro v6.0's product page (sticky Mayar Lifetime checkout card, 6 detail tabs, MT5 installation steps) paired with NexaPip's official .EX5 validation artwork and interactive binary inspector.",
        uxHighlights: [
          "Displays the authentic 6-tab EA detail architecture (Ringkasan, Backtest, Parameter & .SET, Chart, Rilis .ex5, Ulasan).",
          "Interactive binary test verifies how .ex5 magic headers pass while .ex4 and disguised MQL source files are rejected.",
          "Confirms private ./storage/ex5/ vault isolation outside Next.js public/.",
        ],
      },
      {
        id: "nexapip-buyer-library",
        tabLabel: "Studio & Library",
        title: "Seller Release Dashboard, .EX5 Upload Dropzone & Buyer /library",
        routeBadge: "/admin & /library · Official Studio UI Visuals",
        summary:
          "Pairs NexaPip's real studio dashboard & .EX5 dropzone visuals from the repository with an interactive switcher comparing the Buyer's permanent 'Koleksi Saya' library against the Seller Release Studio.",
        uxHighlights: [
          "Shows Lifetime Revenue, Release Velocity, and instant .EX5 upload validation dropzone visuals.",
          "Every download logs to DownloadLog and delivers both compiled .ex5 binaries and official .set presets.",
          "Publishing a new version in /admin unlocks free updates immediately for every paid buyer.",
        ],
      },
      {
        id: "nexapip-mayar-circuit",
        tabLabel: "Full Landing & Flow",
        title: "Full-Page Live Homepage Capture & 4-Stage Mayar IDR Circuit",
        routeBadge: "/ · Full-Page 1440px Live Capture",
        summary:
          "Scroll through the real full-page desktop capture of NexaPip's homepage—featuring the 3D hooded mascot hero, 4-stage neon-lime circuit diagram, .EX5 security showcase, curated EA cards, and Developer Studio.",
        uxHighlights: [
          "Interactive scrollable browser viewport lets reviewers inspect the entire live landing page cleanly.",
          "Demonstrates seamless dark continuity across all 5 homepage chapters with zero horizontal overflow.",
          "Maps every visual section directly to the 4-stage verified Mayar IDR checkout & vault lifecycle.",
        ],
      },
    ],
    workflowTitle: "End-to-End MT5 EA Marketplace Workflow",
    workflowSubtitle:
      "How an Expert Advisor moves from compiled MetaEditor 5 upload through SHA-256 vaulting and Mayar IDR checkout into a trader's permanent MT5 library.",
    workflowSteps: [
      {
        step: "01",
        phase: "CURATE & AUDIT",
        title: "Admin Upload & Pure-Domain .ex5 Binary Inspection",
        actor: "Marketplace Admin (/admin)",
        userAction:
          "Uploads compiled MT5 .ex5 Expert Advisor, official .set preset config, changelog, MT5 minimum build, and 99.9% Real Tick Strategy Tester metrics.",
        systemAction:
          "src/domain/ex5.ts rejects .ex4/.mq4/.mq5/.mqh and disguised source tokens (#property, OnTick, OnInit), validates 64B–50MB bounds & EX5\\0/MQL5/MZ header, computes SHA-256, and writes file into private ./storage/ex5/.",
        guarantee: "Unverified or non-MT5 binaries can never enter the catalog or leak through public/ static URLs.",
      },
      {
        step: "02",
        phase: "EVALUATE",
        title: "Strategy Telemetry, Equity Curve & Parameter Inspection",
        actor: "Trader / Buyer (/market & /market/[slug])",
        userAction:
          "Filters catalog by StrategyCategory (Scalping, Trend, Grid, XAUUSD, etc.), compares Net Profit, Max Drawdown, Profit Factor, Sharpe Ratio, input parameters, and verified buyer reviews.",
        systemAction:
          "Catalog use-cases query Prisma 7 + PostgreSQL and render structured Strategy Tester metrics and verified SHA-256 release history.",
        guarantee: "Transparent risk and historical telemetry precede every purchase decision.",
      },
      {
        step: "03",
        phase: "CHECKOUT",
        title: "One-Time Lifetime IDR Payment via Mayar",
        actor: "Trader & Mayar Gateway (nexapip.myr.id)",
        userAction:
          "Initiates Lifetime IDR checkout on /checkout and pays once using QRIS, E-Wallet, or Indonesian Virtual Account.",
        systemAction:
          "Checkout use-case creates a PENDING Prisma Order using pure domain Lifetime IDR pricing and redirects cleanly to Mayar payment link.",
        guarantee: "Zero recurring subscription billing traps—one transaction equals permanent license ownership.",
      },
      {
        step: "04",
        phase: "ENTITLE",
        title: "Webhook Verification & Permanent Library Unlock",
        actor: "Mayar Webhook & Order Infrastructure",
        userAction:
          "Receives instant confirmation and opens /library ('Koleksi Saya').",
        systemAction:
          "Validates Mayar payment callback, transitions Order status from PENDING to PAID, and unlocks authenticated access to all ProductRelease binaries and .set presets.",
        guarantee: "Only authenticated sessions with a PAID Order record pass download and verified-review gates.",
      },
      {
        step: "05",
        phase: "DELIVER & UPDATE",
        title: "Authenticated Vault Streaming & Free Lifetime Updates",
        actor: "Buyer (/library) & Seller (/admin)",
        userAction:
          "Downloads verified .ex5 binary + .set preset anytime, verifies SHA-256 hash, installs in MetaTrader 5, and posts a Verified Purchase review.",
        systemAction:
          "Download route streams bytes directly from private ./storage/ex5/ while recording a DownloadLog audit entry; future releases pushed in /admin appear automatically for free.",
        guarantee: "Permanent re-download availability and continuous version updates without repurchasing.",
      },
    ],
    moduleGroups: [
      "All",
      "Clean Architecture Layers",
      "Prisma 7 Data Models",
      "Security & Payment Modules",
    ],
    modules: [
      {
        code: "L01",
        name: "Domain Layer (src/domain/)",
        group: "Clean Architecture Layers",
        summary: "Zero-framework pure TypeScript business rules governing .ex5 binary inspection and Lifetime IDR pricing.",
        capabilities: [
          "inspectEx5Binary: extension filter, 64B–50MB bounds, EX5\\0/MQL5/MZ magic bytes, anti-source detector",
          "Cryptographic SHA-256 checksum generation for tamper verification",
          "Deterministic Lifetime IDR pricing & entitlement eligibility calculators",
        ],
      },
      {
        code: "L02",
        name: "Application Use-Case Layer (src/application/)",
        group: "Clean Architecture Layers",
        summary: "Framework-agnostic orchestrators for catalog, checkout, buyer library, and admin studio workflows.",
        capabilities: [
          "Catalog discovery, filtering by 7 StrategyCategory enums, and telemetry projection",
          "Checkout order creation, Mayar reconciliation, and ownership verification",
          "Admin product authoring, release publishing, and buyer review moderation",
        ],
      },
      {
        code: "L03",
        name: "Infrastructure Adapters (src/infrastructure/)",
        group: "Clean Architecture Layers",
        summary: "Concrete adapters for Prisma 7 + PostgreSQL, private ./storage/ex5/ filesystem vault, Mayar API, scrypt auth, and rate limiting.",
        capabilities: [
          "Prisma 7 with @prisma/adapter-pg connection pooling against PostgreSQL",
          "Private disk vault (./storage/ex5/) completely isolated from Next.js public/",
          "Mayar payment adapter supporting QRIS, E-Wallet, and Virtual Account rails",
        ],
      },
      {
        code: "L04",
        name: "Next.js 16 App Router & 15 REST Handlers (src/app/)",
        group: "Clean Architecture Layers",
        summary: "8 Indonesian-language pages (/, /market, /market/[slug], /checkout, /library, /admin, /login, /register) backed by 15 Zod-validated API routes.",
        capabilities: [
          "src/proxy.ts route guard protecting /library, /checkout, and /admin boundaries",
          "Authenticated binary & .set preset streaming handlers with Content-Disposition headers",
          "Zero-hydration-mismatch SSR catalog and client interactive checkout flows",
        ],
      },
      {
        code: "DB-01",
        name: "Product, ProductRelease & Strategy Telemetry Models",
        group: "Prisma 7 Data Models",
        summary: "Normalized schema capturing MT5 Strategy Tester proof, versioned .ex5 artifacts, and official .set presets.",
        capabilities: [
          "Product telemetry: netProfitPct, maxDrawdownPct, profitFactor, winRatePct, sharpeRatio, recoveryFactor, totalTrades, equityCurve, parameters",
          "ProductRelease: version, storageFilename, sha256, mt5MinBuild, changelog, presetContent",
          "Supports unlimited free version releases linked directly to existing paid buyers",
        ],
      },
      {
        code: "DB-02",
        name: "User, Session, Order, Review & DownloadLog Models",
        group: "Prisma 7 Data Models",
        summary: "Complete identity, transactional fulfillment, verified review, and binary download audit schema.",
        capabilities: [
          "User roles (BUYER / ADMIN) paired with server-managed HTTP-only Session records",
          "Order lifecycle (PENDING / PAID / FAILED / REFUNDED) tied to Mayar invoice IDs",
          "Review (verifiedPurchase + developer reply) and DownloadLog audit history",
        ],
      },
      {
        code: "SEC-01",
        name: "Authentication, Scrypt Hashing & Rate Limiting",
        group: "Security & Payment Modules",
        summary: "Defense-in-depth account and endpoint hardening protecting trader libraries and seller uploads.",
        capabilities: [
          "Native Node crypto scrypt salted password hashing + HTTP-only secure session cookies",
          "Zod schema validation on all 15 REST route handlers",
          "Request rate limiting on auth, checkout, and download endpoints",
        ],
      },
    ],
    architecture: [
      { id: "nx-app", label: "Next.js 16 + src/proxy.ts", sublabel: "8 Pages · 15 Zod API Routes", layer: "client" },
      { id: "nx-appuc", label: "Domain + Use-Cases", sublabel: "inspectEx5Binary · Lifetime IDR", layer: "orchestration" },
      { id: "nx-pay", label: "Mayar IDR Gateway", sublabel: "QRIS · E-Wallet · VA Hooks", layer: "ai" },
      { id: "nx-db", label: "PostgreSQL + ./storage/ex5", sublabel: "Prisma 7 · SHA-256 Vault", layer: "data" },
    ],
    invariants: [
      {
        title: "Strict .ex5-Only Cryptographic Binary Gate",
        category: "Artifact Security",
        detail: "Rejects MT4 (.ex4/.mq4), source code (.mq5/.mqh), and disguised MQL tokens while verifying magic headers and storing SHA-256 digests.",
      },
      {
        title: "Private Non-Public Binary Storage",
        category: "Access Control",
        detail: "All compiled binaries reside in ./storage/ex5/ outside public/ and stream strictly after verifying an active session and PAID Order.",
      },
      {
        title: "Clean 4-Layer Dependency Direction",
        category: "Maintainability",
        detail: "Domain pricing and binary inspection depend on zero Next.js or Prisma APIs, keeping business logic fast and deterministically testable.",
      },
      {
        title: "Verified-Purchase Review & Download Auditing",
        category: "Marketplace Trust",
        detail: "Every binary fetch appends a DownloadLog entry and buyer reviews carry database-enforced verifiedPurchase flags.",
      },
    ],
    techStack: [
      "Next.js 16 App Router",
      "React 19",
      "TypeScript",
      "Prisma 7 (@prisma/adapter-pg)",
      "PostgreSQL",
      "Zod Validation",
      "Mayar IDR Payments",
      "Node crypto (scrypt + SHA-256)",
      "Tailwind CSS 4",
      "Clean Architecture",
    ],
  },

  "mcp-craftrig": {
    slug: "mcp-craftrig",
    index: "04",
    title: "Craftrig MCP Governance Rig",
    shortTitle: "Craftrig MCP",
    subtitle: "vickyymosafan/mcp-craftrig · Host-Neutral Multi-Agent Orchestrator & Playwright QA Engine",
    tagline:
      "An open-source Strict TypeScript MCP SDK v2 server powering my own daily engineering across Claude Code and Google Antigravity—enforcing Blueprint specs, Kahn critical-path DAGs, exclusive file locks, 13-viewport dual-theme Playwright QA, and evidence-backed quality gates.",
    category: "MCP Server & Agentic Governance",
    year: "2026",
    role: "Creator & Principal Systems Engineer",
    scopeBadge: "25+ MCP Tools · 21 Skills · 50/50 Tests",
    heroImage: "/images/redesign/proj-mcp-craftrig.jpg",
    repoUrl: "https://github.com/vickyymosafan/mcp-craftrig",
    repoLabel: "View Craftrig MCP Repository",
    secondaryLink: {
      label: "3D Visual QA MCP",
      href: "https://github.com/vickyymosafan/mcp_threejs-visual-qa",
    },
    stats: [
      {
        value: "25+ Tools",
        label: "MCP SDK v2 Surface",
        detail: "Blueprint, DAG, locks, QA & release gate",
      },
      {
        value: "50 / 50",
        label: "Automated Tests",
        detail: "Strict TypeScript · Node >= 22.12",
      },
      {
        value: "13 VPs × 2",
        label: "Playwright QA Matrix",
        detail: "320px–1920px in Dark & Light themes",
      },
      {
        value: "50 MB",
        label: "Evidence Diet Cap",
        detail: "node:sqlite WAL · SHA-256 blobs · Brotli",
      },
    ],
    storyIntro:
      "Writing code quickly with AI is easy; keeping autonomous agents aligned with architecture contracts, preventing parallel file-overwrite collisions, and proving every UI claim in a real browser is the real engineering bottleneck. I built Craftrig MCP so both Claude Code and Google Antigravity operate under repeatable software discipline.",
    storyChapters: [
      {
        index: "01",
        eyebrow: "THE MULTI-AGENT DISCIPLINE PROBLEM",
        title: "Moving Beyond Blind Prompting to Tool-Enforced Governance",
        body: "When multiple coding agents tackle a feature in parallel, prompt instructions alone are fragile: agents forget edge requirements, overwrite each other's files, leave IDE dirty-buffer conflicts, or mark UI work complete without checking mobile overflow or Light Mode contrast. Craftrig replaces verbal reminders with deterministic MCP tool contracts.",
        calloutLabel: "Host-Neutral Design",
        calloutValue: "One MCP SDK v2 server + 21 portable Agent Skills working cleanly across Claude Code & Antigravity.",
      },
      {
        index: "02",
        eyebrow: "CRITICAL-PATH SCHEDULING & DETERMINISTIC LOCKS",
        title: "Kahn Topological DAGs, Exclusive Write Leases & File-Sync Guard",
        body: "Structured in Clean Architecture (MCP Interface -> Application Use Cases -> Domain Models & Ports -> Infrastructure Adapters), Craftrig compiles approved Blueprints (REQ-IDs + Blueprint Linter + SkillRouter) into execution DAGs ordered by Kahn's algorithm + reverse topological dynamic programming. Exclusive path-level write locks detect exact and parent/child overlaps, lease heartbeats recover crashed agents automatically, and craftrig_check_file_sync detects IDE buffer drift via SHA-256/mtime before commits.",
        calloutLabel: "Lean Persistence",
        calloutValue: "Native node:sqlite (512 KB cache, 1 MB WAL, 30s idle auto-close) + Brotli .json.br archives.",
      },
      {
        index: "03",
        eyebrow: "EVIDENCE BEFORE ASSERTIONS",
        title: "SharedBrowserPool Playwright QA & Zero-Trust Quality Gates",
        body: "Craftrig embeds a loopback-hardened SharedBrowserPool (max 4 concurrent Playwright contexts) that audits every route across 13 viewports (320px–1920px), both Dark and Light themes, @axe-core/playwright accessibility, alpha-composited color contrast, typography clipping, reduced-motion visibility, and E2E interactions. No quality checkpoint can be marked PASS without a real recorded evidence UUID—and Conventional Commit generation strictly enforces noPush: true.",
        calloutLabel: "Anti-Gaming Gate",
        calloutValue: "PASS requires recorded evidence IDs · Failures-only JPEG dedup · Local Conventional Commits.",
      },
    ],
    designSystem: {
      themeLabel: "Deterministic Telemetry & Developer Experience (DX) System",
      philosophy:
        "Built for both human engineers and LLM tool callers: concise structured JSON receipts, scannable status states, zero wasted token bloat, and unmistakable failure diagnostics.",
      geometryRule: "Terminal-crisp telemetry panels, monospace UUID/path chips, status-coded DAG node cards.",
      densityRule: "Zero-bloat structured payloads capped to actionable summaries + disk-backed artifact paths.",
      swatches: [
        { name: "Obsidian Shell", hex: "#0B0E15", role: "MCP Telemetry Canvas", onHex: "#F5F6F8" },
        { name: "Console Panel", hex: "#151B27", role: "DAG Node & Audit Card Surface", onHex: "#F5F6F8" },
        { name: "Amber Gate", hex: "#F5A623", role: "Critical-Path Highlight & Active Lock", onHex: "#0B0E15" },
        { name: "Glacier Cyan", hex: "#38BDF8", role: "Playwright Telemetry & Tool Calls", onHex: "#0B0E15" },
        { name: "Verified Pass", hex: "#34D399", role: "Evidence-Backed PASS Checkpoint", onHex: "#0B0E15" },
        { name: "Gate Block", hex: "#F87171", role: "Lock Collision & A11y Defect Alert", onHex: "#0B0E15" },
        { name: "Muted Steel", hex: "#94A3B8", role: "Secondary Timestamps & Metadata", onHex: "#0B0E15" },
      ],
      typography: [
        {
          role: "Architecture & Wave Titles",
          family: "Space Grotesk",
          usage: "Execution phases, quality gate banners, skill roster headings",
          sample: "Kahn Critical-Path DAG · 0 Lock Collisions",
        },
        {
          role: "Tool Payloads & Evidence IDs",
          family: "JetBrains Mono",
          usage: "MCP tool names, UUID receipts, file lock paths, Conventional Commits",
          sample: "craftrig_evaluate_quality_gate -> status: PASS",
        },
      ],
      uxPrinciples: [
        "Structured Handoffs: completed tasks pass compact contracts, changedFiles, and decisions without context bloat.",
        "Failures-Only Evidence Diet: screenshots persist on failure with SHA-256 blob dedup so repos never bloat past 50 MB.",
        "Safe-by-Default Boundaries: loopback-only browser audits, allowlisted package.json scripts, and noPush: true commits.",
        "Self-Healing Diagnostics: craftrig_doctor and recover_stale_locks surface actionable remediation in one call.",
      ],
    },
    uiScreens: [
      {
        id: "craftrig-dag-locks",
        tabLabel: "DAG & File Locks",
        title: "Topological Critical-Path Scheduler & Exclusive Write-Lock Matrix",
        routeBadge: "craftrig_claim_ready_batch · Execution Engine",
        summary:
          "Inspect how Craftrig partitions a feature plan into dependency-ordered waves (Discovery -> Planning -> Implementation -> Integration -> Parallel QA -> Release Gate) while enforcing disjoint ownedPaths write locks.",
        uxHighlights: [
          "Click any execution wave to view parallel specialist agents, locked file globs, and lease TTLs.",
          "Visualizes Kahn's topological sort + reverse DP critical-path scoring to minimize makespan.",
          "Shows parent/child path-overlap detection preventing concurrent edits to shared files.",
        ],
      },
      {
        id: "craftrig-playwright-qa",
        tabLabel: "13-VP Playwright QA",
        title: "SharedBrowserPool 13-Viewport Dual-Theme Visual & A11y Console",
        routeBadge: "localhost_inspect_responsive · localhost_audit_visual_a11y",
        summary:
          "Interactive telemetry console demonstrating Craftrig's headless Chrome QA wave—testing 13 breakpoints (320px to 1920px) in Dark and Light modes for horizontal overflow, @axe-core/playwright violations, alpha-composited contrast, polarity, and reduced-motion safety.",
        uxHighlights: [
          "Switch live between Dark Obsidian & Warm Ivory Light audit snapshots across all 13 viewports.",
          "Surfaces SharedBrowserPool concurrency cap (max 4 contexts) and CDP DOM/heap telemetry.",
          "Displays non-destructive interaction scenario assertions alongside ARIA snapshot checks.",
        ],
      },
      {
        id: "craftrig-blueprint-sqlite",
        tabLabel: "Blueprint & SQLite WAL",
        title: "Blueprint Architect (REQ-IDs) & Lean 50 MB Storage Hygiene",
        routeBadge: "craftrig_ingest_blueprint · node:sqlite WAL",
        summary:
          "Combines the interactive Blueprint Architect pipeline (WorkspaceRepoScanner -> Interview -> Contradiction Linter -> SkillRouter / EffortScaler) with Craftrig's zero-dependency native node:sqlite WAL memory & storage telemetry.",
        uxHighlights: [
          "Maps 70 capability modules and 21 Agent Skills onto concrete, single-primary-skill tasks.",
          "Shows 512 KB SQLite page-cache ceiling, 1 MB WAL cap, and 30s idle auto-close RAM release.",
          "Tracks SHA-256 content-addressed evidence deduplication and Brotli .json.br plan archives.",
        ],
      },
      {
        id: "craftrig-quality-gate",
        tabLabel: "Quality Gate & Sync",
        title: "Evidence-Backed Quality Gate, IDE File-Sync Audit & Commit Builder",
        routeBadge: "craftrig_evaluate_quality_gate · noPush: true",
        summary:
          "Interactive release cockpit showing all 9 mandatory quality checkpoints linked to real evidence UUIDs, SHA-256/mtime fileSyncAudit status preventing IDE Overwrite accidents, and Conventional Commits 1.0.0 generation.",
        uxHighlights: [
          "Every PASS checkpoint binds to verifiable build logs or Playwright JSON report UUIDs.",
          "Surfaces fileSyncAudit warnings so users never overwrite fresh agent edits from stale IDE tabs.",
          "Generates strict Conventional Commits 1.0.0 locally while keeping remote git push strictly human-owned.",
        ],
      },
    ],
    workflowTitle: "End-to-End Agentic Governance Workflow",
    workflowSubtitle:
      "How Craftrig MCP orchestrates an entire engineering lifecycle—from initial workspace scan to Playwright-verified release readiness—without agent collisions or unverified claims.",
    workflowSteps: [
      {
        step: "01",
        phase: "BLUEPRINT",
        title: "Workspace Scan, Deep Interview & Contradiction Linting",
        actor: "Blueprint Architect (craftrig_start_blueprint_interview)",
        userAction:
          "Starts a structured blueprint session answering targeted architecture, security, UX, and acceptance questions.",
        systemAction:
          "WorkspaceRepoScanner detects framework/scripts; Blueprint Linter catches spec contradictions; SkillRouter + EffortScaler compile blueprint.md + blueprint.json with REQ-IDs.",
        guarantee: "Every task inherits explicit acceptance criteria and 1 primary specialist skill before code edits begin.",
      },
      {
        step: "02",
        phase: "SCHEDULE",
        title: "Kahn Critical-Path DAG & 70-Module Capability Planning",
        actor: "TaskPlanner & DagValidator (craftrig_create_execution_plan)",
        userAction:
          "Generates a dependency-ordered execution DAG spanning discovery, planning, parallel implementation, integration, QA, and release.",
        systemAction:
          "Validates acyclicity with Kahn's algorithm, ranks tasks by reverse topological critical-path depth, and persists the plan + Markdown checklist in lean node:sqlite WAL.",
        guarantee: "Zero circular dependencies; high-impact critical-path tasks always surface first.",
      },
      {
        step: "03",
        phase: "LOCK & BUILD",
        title: "Atomic Batch Claim, Exclusive File Locks & Lease Heartbeats",
        actor: "Specialist Workers (craftrig_claim_ready_batch)",
        userAction:
          "Frontend, backend, and motion specialists claim independent tasks in parallel waves.",
        systemAction:
          "Acquires exclusive workspace-relative write locks (blocking exact and parent/child path overlaps), tracks lease TTLs via heartbeat_task, and recovers stale locks automatically.",
        guarantee: "Parallel agents can never overwrite each other's files or duplicate work.",
      },
      {
        step: "04",
        phase: "VERIFY",
        title: "Parallel 13-Viewport Dual-Theme Playwright QA Wave",
        actor: "QA Specialists (SharedBrowserPool · max 4 contexts)",
        userAction:
          "Boots local server via allowlisted package.json script and runs responsive, visual/a11y, and interaction audits on loopback URLs.",
        systemAction:
          "Executes 13-viewport overflow checks (320px–1920px), Dark/Light @axe-core/playwright + alpha-composited contrast + polarity + typography + reduced-motion checks, and non-destructive E2E scenarios.",
        guarantee: "UI defects are caught in real headless Chrome with reproducible JSON artifacts and failures-only screenshots.",
      },
      {
        step: "05",
        phase: "SYNC GUARD",
        title: "File-Sync Audit & Evidence-Backed Quality Checkpoints",
        actor: "Quality Assurance & Release Governance",
        userAction:
          "Records auditable evidence artifacts and updates quality checkpoints across responsive, layout, interaction, color, motion, a11y, security, and performance.",
        systemAction:
          "Rejects any PASS checkpoint lacking existing evidence IDs; craftrig_check_file_sync hashes modified files (SHA-256/mtime) to flag stale editor buffer risks.",
        guarantee: "Zero unverified assertions—every passing dimension ties directly to real recorded evidence.",
      },
      {
        step: "06",
        phase: "GATE & ARCHIVE",
        title: "Quality Gate Sign-Off, Local Commit & Brotli Plan Archive",
        actor: "Release Gate (craftrig_evaluate_quality_gate)",
        userAction:
          "Evaluates final release readiness and synthesizes a Conventional Commits 1.0.0 message for human review.",
        systemAction:
          "Verifies 0 incomplete tasks, 0 failed/pending checkpoints, and 0 open conflicts; produces local commit message (noPush: true) and compresses archived plans to .json.br.",
        guarantee: "Clean local git handoff with zero unsolicited remote pushes and bounded <= 50 MB workspace storage.",
      },
    ],
    moduleGroups: [
      "All",
      "Blueprint & DAG Planning",
      "Locks, Leases & Storage",
      "Playwright QA & Quality Gates",
    ],
    modules: [
      {
        code: "CT-01",
        name: "Blueprint Architect & Contradiction Linter",
        group: "Blueprint & DAG Planning",
        summary: "Interactive requirements compiler scanning workspace context, linting spec conflicts, and outputting REQ-IDs.",
        capabilities: [
          "craftrig_start_blueprint_interview, craftrig_answer_blueprint_questions, craftrig_ingest_blueprint",
          "WorkspaceRepoScanner detects framework, package manager, scripts, and routes automatically",
          "SkillRouter & EffortScaler assign 1 primary skill per task across 21 portable Agent Skills",
        ],
      },
      {
        code: "CT-02",
        name: "Critical-Path DAG Planner & Autopilot",
        group: "Blueprint & DAG Planning",
        summary: "Kahn topological scheduler computing reverse-DP downstream impact across the 70-module capability catalog.",
        capabilities: [
          "craftrig_create_execution_plan, craftrig_get_ready_tasks, craftrig_get_plan_insights",
          "craftrig_autopilot_next & craftrig_autopilot_resume for minimal-overhead step orchestration",
          "Structured task handoffs (summary, changedFiles, contracts, decisions, testsRun)",
        ],
      },
      {
        code: "CT-03",
        name: "Exclusive File Locks, Leases & Sync Guard",
        group: "Locks, Leases & Storage",
        summary: "Deterministic path-level write locking, atomic batch claiming, stale lease recovery, and IDE buffer conflict detection.",
        capabilities: [
          "craftrig_claim_task, craftrig_claim_ready_batch, craftrig_acquire_file_locks, craftrig_release_file_locks",
          "Detects exact and parent/child directory overlaps before allowing writes",
          "craftrig_heartbeat_task, craftrig_recover_stale_locks, craftrig_check_file_sync, craftrig_doctor",
        ],
      },
      {
        code: "CT-04",
        name: "Lean node:sqlite WAL & 50 MB Evidence Diet",
        group: "Locks, Leases & Storage",
        summary: "Zero-dependency Node 22 SQLite persistence with bounded memory, content-addressed blobs, and Brotli archiving.",
        capabilities: [
          "512 KB page cache cap, 1 MB WAL checkpoint bound, and 30s idle auto-close releasing RAM to zero",
          "SHA-256 content-addressed JPEG screenshot deduplication with LRU quota cleanup",
          "craftrig_archive_plan & craftrig_storage_maintenance producing compressed .json.br archives",
        ],
      },
      {
        code: "CT-05",
        name: "Localhost Dev Server & 13-VP Playwright QA Suite",
        group: "Playwright QA & Quality Gates",
        summary: "Loopback-hardened SharedBrowserPool running responsive, dual-theme visual/a11y, and interaction audits.",
        capabilities: [
          "localhost_ensure_dev_server, localhost_discover_routes, localhost_wait_for_ready (allowlisted scripts only)",
          "localhost_inspect_responsive across 13 viewports (320px–1920px) + CDP DOM/heap telemetry",
          "localhost_audit_visual_a11y (Dark/Light @axe-core/playwright, contrast, polarity, clipping, reduced-motion) & localhost_run_interaction_scenario",
        ],
      },
      {
        code: "CT-06",
        name: "Evidence-Backed Quality Gate & Commit Synthesis",
        group: "Playwright QA & Quality Gates",
        summary: "Anti-gaming checkpoint enforcement, repair iteration tracking, and safe local Conventional Commit generation.",
        capabilities: [
          "craftrig_record_evidence, craftrig_update_quality_checkpoint, craftrig_evaluate_quality_gate",
          "craftrig_increment_repair_iteration, craftrig_invalidate_checkpoints, craftrig_reopen_task",
          "craftrig_prepare_commit_message enforcing Conventional Commits 1.0.0 with noPush: true",
        ],
      },
    ],
    architecture: [
      { id: "cr-host", label: "Claude / Antigravity", sublabel: "Host-Neutral MCP SDK v2", layer: "ai" },
      { id: "cr-dag", label: "DAG + File-Lock Core", sublabel: "Kahn DP · 21 Skills · 70 Mods", layer: "orchestration" },
      { id: "cr-qa", label: "SharedBrowserPool", sublabel: "13-VP · Dual-Theme Axe QA", layer: "client" },
      { id: "cr-db", label: "node:sqlite WAL + Brotli", sublabel: "50 MB Diet · Evidence Gate", layer: "data" },
    ],
    invariants: [
      {
        title: "Loopback-Only Browser & Allowlisted Scripts",
        category: "Security Boundary",
        detail: "Playwright audits strictly allow localhost/127.0.0.1 targets, symlink-escape paths are rejected via realpath, and dev servers only invoke allowlisted package.json scripts.",
      },
      {
        title: "Evidence-Backed PASS Enforcement",
        category: "Anti-Gaming Governance",
        detail: "Quality checkpoints reject PASS transitions without valid recorded evidence IDs, preventing hallucinated or unverified sign-offs.",
      },
      {
        title: "Non-Destructive QA & noPush Commit Safety",
        category: "Operational Safety",
        detail: "Interaction runners block destructive selectors (delete/purge/drop) by default and Conventional Commit preparation never pushes to remote git branches.",
      },
      {
        title: "Zero-Bloat <= 50 MB Workspace Footprint",
        category: "Resource Hygiene",
        detail: "Native node:sqlite auto-closes after 30s idle, screenshots store failures-only with SHA-256 deduplication, and completed plans archive via Brotli.",
      },
    ],
    techStack: [
      "TypeScript (Strict)",
      "MCP SDK v2",
      "Node.js >= 22.12",
      "node:sqlite (WAL)",
      "Playwright",
      "@axe-core/playwright",
      "Kahn Topological DAG",
      "Brotli Compression",
      "Clean Architecture",
      "50/50 Automated Tests",
    ],
  },

  "beyond-rag": {
    slug: "beyond-rag",
    index: "05",
    title: "Beyond RAG: Agentic Search Platform",
    shortTitle: "Beyond RAG",
    subtitle: "BE + FE_Beyond-RAG-Artificial-Super-Intelligence · 17-Module Edge ASI Engine & Virtualized Chat PWA",
    tagline:
      "An edge-deployed Agentic RAG platform on Cloudflare Workers + Hono + Neon pgvector achieving 100/100 evaluation accuracy with Quad-Fusion D-RRF, 5-layer anti-hallucination verification, automatic 4-LLM failover, and a 60fps TanStack Virtual Next.js chat & admin PWA.",
    category: "Agentic AI & Edge Search Platform",
    year: "2026",
    role: "Creator, Edge AI Architect & Full-Stack Engineer",
    scopeBadge: "17 ASI Modules · 100/100 Eval · 4-LLM Cascade",
    heroImage: "/images/redesign/proj-beyond-rag.jpg",
    repoUrl: "https://github.com/vickyymosafan/BE_Beyond-RAG-Artificial-Super-Intelligence",
    repoLabel: "Backend Repo (ASI Edge)",
    secondaryLink: {
      label: "Frontend Repo (Next.js UI)",
      href: "https://github.com/vickyymosafan/FE_Beyond-RAG-Artificial-Super-Intelligence",
    },
    stats: [
      {
        value: "100/100",
        label: "Eval Benchmark",
        detail: "100% accuracy (evaluation_results_100.json)",
      },
      {
        value: "17 Modules",
        label: "Edge ASI Pipeline",
        detail: "Quad-Fusion D-RRF, Multi-Hop & Self-Critic",
      },
      {
        value: "4-LLM",
        label: "Failover Cascade",
        detail: "Gemini -> Groq -> Cohere -> OpenRouter",
      },
      {
        value: "350 Users",
        label: "$0/mo Free-Tier",
        detail: "2 SQLite Durable Objects + KV L1/L2 Cache",
      },
    ],
    storyIntro:
      "Standard single-pass RAG chatbots break down when university students ask compound questions spanning 144 pages, 40 tables, and 133 figures across thesis, internship, and curriculum guidebooks—hallucinating rules or crashing the moment a single LLM provider hits its daily rate limit.",
    storyChapters: [
      {
        index: "01",
        eyebrow: "BEYOND SINGLE-PASS RAG",
        title: "17-Module Agentic Reasoning & 5-Layer Hallucination Prevention",
        body: "Rather than sending raw user queries straight to one vector lookup, Beyond RAG's Cloudflare Workers + Hono backend runs a 17-module ASI pipeline under src/asi/: query classification, rewriting, conditional sub-question decomposition, Dynamic Score-Aware Quad-Fusion D-RRF across Neon pgvector (768-dim) and Indonesian tsvector full-text search, multi-hop retrieval, reranking, context compression, Jaccard grounding checks, and a Self-Critic corrective loop that retries automatically whenever grounding falls below 0.80.",
        calloutLabel: "Verified Benchmark",
        calloutValue: "100 / 100 queries passed (0 failed, 1.00 accuracyRate) in evaluation_results_100.json.",
      },
      {
        index: "02",
        eyebrow: "ZERO-COST EDGE RESILIENCE",
        title: "4-LLM Circuit Breaker, Durable Objects & Self-Improving KV Cache",
        body: "Architected to serve 350 concurrent students on a $0/month free-tier budget. Two SQLite-backed Cloudflare Durable Objects (RateLimiterDO and ProviderRateLimiterDO) govern per-user concurrency and provider RPD quotas with a 5-failures/minute circuit breaker cascading across Gemini 2.5/2.0 Flash, Groq, Cohere Command-A, and OpenRouter. L1 exact + L2 semantic KV caching keeps repeat answers under 500ms while Edge License Guard (Origin binding + owner secret) blocks unauthorized clones.",
        calloutLabel: "Multimodal Corpus",
        calloutValue: "unpdf + mammoth.js ingest PDF/DOCX text chunks, Markdown tables & R2 image captions.",
      },
      {
        index: "03",
        eyebrow: "ACADEMIC CONVERSATIONAL UI/UX",
        title: "60fps Virtualized Chat PWA, Inline Citations & Admin Ingestion Console",
        body: "The companion Next.js + React + Shadcn UI frontend pairs a deep cyan-teal OKLCH science-terminal palette with TanStack Virtual for 60fps long conversations, react-markdown + GFM tables + LaTeX math rendering, clickable page-level citations ([Panduan TA SI 2026, Hal 34]), voice speech recognition, driver.js onboarding tours, PWA offline install, an authenticated /admin/dashboard for PDF/DOCX management, and a built-in Mock Engine Mode so reviewers can test UI flows locally without API keys.",
        calloutLabel: "OpenAPI + Mock Mode",
        calloutValue: "Typed client generated from openapi.yaml + synthetic streaming dev mode.",
      },
    ],
    designSystem: {
      themeLabel: "Deep Teal-Obsidian OKLCH Science Terminal System",
      philosophy:
        "Clarity-first academic research interface balancing glassmorphic focus with dense citation transparency—every factual claim visibly links to its exact source document and page number.",
      geometryRule: "Precision terminal radii (2px–12px cards), crisp cyan hairlines, and high-contrast verification badges.",
      densityRule: "Collapsible history sidebar + virtualized 60fps reading column + clean tabular admin corpus console.",
      swatches: [
        { name: "Deep Teal Canvas", hex: "#061014", role: "Primary Dark Science-Terminal Surface", onHex: "#E2F8FA" },
        { name: "Glass Panel", hex: "#0D1D25", role: "AI Answer Card & Sidebar Surface", onHex: "#E2F8FA" },
        { name: "Electric Cyan", hex: "#22D3EE", role: "Primary CTA, Active Citations & Focus", onHex: "#061014" },
        { name: "Grounded Emerald", hex: "#34D399", role: "Self-Critic PASS & Grounded Proof", onHex: "#061014" },
        { name: "Multi-Hop Amber", hex: "#F5A623", role: "Sub-Question, LaTeX & RPD Telemetry", onHex: "#061014" },
        { name: "Ice Cyan Ink", hex: "#E2F8FA", role: "Primary High-Contrast Reading Copy", onHex: "#061014" },
        { name: "Muted Slate", hex: "#94A3B8", role: "Reasoning Trace & Secondary Labels", onHex: "#061014" },
      ],
      typography: [
        {
          role: "Conversational Reading & UI",
          family: "Inter / Plus Jakarta Sans",
          usage: "Academic answers, Markdown tables, admin corpus forms, navigation",
          sample: "Bobot Tugas Akhir 6 SKS · [Panduan TA SI 2026, Hal 34]",
        },
        {
          role: "Reasoning Trace & Telemetry",
          family: "Source Code Pro / JetBrains Mono",
          usage: "ASI pipeline logs, citation chips, LaTeX equations, confidence & RPD counters",
          sample: "Quad-Fusion D-RRF: 0.91 · Self-Critic: 0.94 PASS",
        },
      ],
      uxPrinciples: [
        "Every answer shows inline [Document, Page X] chips plus confidence and grounding status so students verify facts immediately.",
        "TanStack Virtual keeps scrolling locked at 60fps even across long multi-turn thesis research threads.",
        "Voice speech input and PWA installability support mobile-first students checking campus guidelines on the go.",
        "Mock Engine Mode enables full local frontend testing with zero API key friction during technical reviews.",
      ],
    },
    uiScreens: [
      {
        id: "beyond-rag-chat-ui",
        tabLabel: "Agentic Chat UI",
        title: "Virtualized 60fps Academic Chat with Citations, Tables & LaTeX",
        routeBadge: "/ · Next.js + TanStack Virtual + Shadcn UI",
        summary:
          "Showcases the conversational research UI rendering Markdown tables, LaTeX equations, clickable page-level citation chips, voice speech input, and live ASI reasoning traces.",
        uxHighlights: [
          "Renders structured GFM Markdown tables & LaTeX formulas inline without layout jank.",
          "Reasoning trace card exposes query class, D-RRF score, Jaccard grounding, and winning LLM provider.",
          "Supports speech-to-text voice input, onboarding tour, and PWA installation.",
        ],
      },
      {
        id: "beyond-rag-admin-dashboard",
        tabLabel: "Admin & Ingestion",
        title: "JWT-Protected /admin/dashboard & Multimodal PDF/DOCX Pipeline",
        routeBadge: "/admin/dashboard · unpdf + mammoth.js + Neon",
        summary:
          "Displays the administrator console for uploading versioned PDF/DOCX guidebooks, inspecting extracted chunks, tables, and R2 images, viewing ASI learning logs, and invalidating stale KV cache entries automatically.",
        uxHighlights: [
          "Tracks document versions, page counts, chunk counts, extracted tables, and R2 image references.",
          "Soft-deletes superseded chunks (is_active = false) and purges affected KV cache keys automatically.",
          "Protected by HMAC-SHA256 JWT admin login and Edge License Guard.",
        ],
      },
      {
        id: "beyond-rag-asi-pipeline",
        tabLabel: "17-Module ASI Flow",
        title: "Quad-Fusion D-RRF, Multi-Hop Retrieval & 5-Layer Hallucination Guard",
        routeBadge: "src/asi/* · Cloudflare Workers + Hono 4.7",
        summary:
          "Visualizes all 17 backend ASI modules plus an interactive 5-Layer Hallucination Prevention tester demonstrating exact retrieval thresholds (>= 0.82 answer, < 0.55 abstain) and Self-Critic regeneration.",
        uxHighlights: [
          "Combines 768-dim Neon pgvector dense search with Indonesian tsvector lexical search via D-RRF.",
          "Enforces 5 independent hallucination barriers from strict prompt rules down to Jaccard verification.",
          "Verified against 100 real Indonesian academic evaluation queries with 100/100 PASS.",
        ],
      },
      {
        id: "beyond-rag-llm-cascade",
        tabLabel: "4-LLM Failover & DO",
        title: "Circuit-Breaker LLM Router, SQLite Durable Objects & KV Cache",
        routeBadge: "wrangler.jsonc · RateLimiterDO + ProviderRateLimiterDO",
        summary:
          "Interactive resilience console showcasing automatic 4-provider failover (Gemini -> Groq -> Cohere -> OpenRouter), Durable Object concurrency control for 350 users, and $0/month RPD budget pacing.",
        uxHighlights: [
          "Click any provider tier to simulate quota exhaustion and watch circuit-breaker failover route cleanly.",
          "Offloads preprocessing (rewrite, critic, corrective) to Groq (14.4K RPD) to protect Gemini quota.",
          "Self-improving L1 exact + L2 semantic KV cache achieves >80% cache hit rates under 500ms.",
        ],
      },
    ],
    workflowTitle: "End-to-End Agentic ASI Search & Verification Workflow",
    workflowSubtitle:
      "How a student's natural-language question travels from the virtualized Next.js PWA through 17 Cloudflare Workers ASI modules, Neon pgvector, 5 hallucination checks, and 4-LLM failover.",
    workflowSteps: [
      {
        step: "01",
        phase: "INGEST",
        title: "Multimodal PDF/DOCX Parsing, Hierarchy Chunking & Indexing",
        actor: "Academic Admin (/admin/dashboard)",
        userAction:
          "Authenticates via HMAC-SHA256 JWT and uploads a new or updated academic guidebook (PDF or DOCX).",
        systemAction:
          "unpdf & mammoth.js extract text hierarchy (chapter -> section -> paragraph), Markdown/JSON tables into extracted_tables, and figures into R2 extracted_images; generates 768-dim embeddings in Neon pgvector + Indonesian tsvector FTS, and triggers cache-invalidation.ts.",
        guarantee: "Old document versions soft-delete cleanly (is_active = false) and stale KV cache entries purge immediately.",
      },
      {
        step: "02",
        phase: "EDGE GUARD",
        title: "Origin License Binding, Durable Object Rate Limiting & Cache Probe",
        actor: "Cloudflare Worker + SQLite Durable Objects",
        userAction:
          "Student submits a typed or voice-transcribed academic question from the Next.js PWA.",
        systemAction:
          "Edge License Guard verifies authorized Origin/Secret; RateLimiterDO enforces fair concurrency across 350 users; cache.ts probes L1 exact and L2 semantic KV cache before spending any LLM tokens.",
        guarantee: "Unauthorized clones receive 403 Forbidden; >80% repeated queries return in <500ms at zero token cost.",
      },
      {
        step: "03",
        phase: "CLASSIFY & EXPAND",
        title: "Query Classification, Rewriting & Multi-Hop Sub-Questions",
        actor: "ASI Pre-Processor (classifier.ts, rewriter.ts, sub-question.ts)",
        userAction:
          "Waits smoothly with live thinking-stage feedback in the chat viewport.",
        systemAction:
          "Rule-based classifier detects text, table, image, or complex intent; Groq rewrites the query into semantic variants and conditionally decomposes multi-part questions into targeted sub-queries.",
        guarantee: "Offloading preprocessing to Groq (14,400 RPD) preserves Gemini's 1,500 RPD budget for final synthesis.",
      },
      {
        step: "04",
        phase: "QUAD-FUSION",
        title: "Dynamic Score-Aware Quad-Fusion D-RRF & Multi-Hop Retrieval",
        actor: "Retrieval Engine (retrieval.ts, multi-hop.ts, rerank.ts, compressor.ts)",
        userAction:
          "Receives cross-document accuracy across TA, KP, KKN, and Curriculum manuals automatically.",
        systemAction:
          "Queries Neon pgvector cosine similarity + Indonesian tsvector BM25 + extracted_tables + extracted_images, fuses ranks via score-aware D-RRF, executes follow-up hops when needed, and compresses context.",
        guarantee: "Retrieval gate rejects weak matches (< 0.55 abstain; >= 0.82 direct grounded synthesis).",
      },
      {
        step: "05",
        phase: "SELF-CRITIC",
        title: "5-Layer Anti-Hallucination Grounding & Corrective Regeneration",
        actor: "Verification Loop (grounding.ts, critic.ts, corrective.ts, self-improver.ts)",
        userAction:
          "Receives strictly grounded claims tagged with exact [Document, Page X] citations.",
        systemAction:
          "Provider router generates answer via Gemini 2.5 Flash (falling back across Groq -> Cohere -> OpenRouter on circuit break); Grounding Validator (Jaccard + exact phrase check) and Groq Self-Critic score faithfulness and trigger up to 2 corrective retries if score < 0.80.",
        guarantee: "100/100 evaluation accuracy with zero fabricated regulations or uncited page references.",
      },
      {
        step: "06",
        phase: "STREAM & LEARN",
        title: "60fps Virtualized Rendering, Dynamic KV Caching & Feedback Logs",
        actor: "Next.js PWA + KV Cache (feedback.ts)",
        userAction:
          "Reads Markdown tables, LaTeX formulas, and clicks inline citation chips to inspect source pages; optionally submits feedback.",
        systemAction:
          "TanStack Virtual renders message history at 60fps; verified high-confidence answers write into self-improving KV cache with hit-scaled TTL and log telemetry to ASI learning tables.",
        guarantee: "Fast, resilient student UX that improves cache hit efficiency organically over time.",
      },
    ],
    moduleGroups: [
      "All",
      "17-Module Edge ASI Engine",
      "Multimodal Ingestion & DB",
      "Frontend PWA & Edge Security",
    ],
    modules: [
      {
        code: "ASI-01",
        name: "Query Intelligence (classifier, router, rewriter, sub-question)",
        group: "17-Module Edge ASI Engine",
        summary: "Intent detection, semantic query rewriting, and conditional multi-hop decomposition.",
        capabilities: [
          "Rule-based classifier detects text, table, image, and compound query shapes at $0 cost",
          "Groq-powered query rewriter expands academic acronyms (TA, KP, KKN, SKS, IPK)",
          "Sub-question engine splits multi-part regulations into atomic retrievable queries",
        ],
      },
      {
        code: "ASI-02",
        name: "Quad-Fusion Retrieval, Multi-Hop, Rerank & Compression",
        group: "17-Module Edge ASI Engine",
        summary: "Score-aware hybrid retrieval combining vector semantics, Indonesian FTS, tables, and image metadata.",
        capabilities: [
          "Dynamic Score-Aware Quad-Fusion D-RRF fusing Neon pgvector (768-dim) + tsvector('indonesian')",
          "Multi-hop loop follows cross-references between thesis chapters and appendix tables",
          "Reranker & context compressor strip noise so LLM context stays sharp and token-efficient",
        ],
      },
      {
        code: "ASI-03",
        name: "5-Layer Anti-Hallucination, Self-Critic & Self-Improver",
        group: "17-Module Edge ASI Engine",
        summary: "Closed-loop faithfulness verification preventing unsupported academic claims.",
        capabilities: [
          "Grounding validator combines Jaccard similarity + exact phrase matching against retrieved chunks",
          "Groq Self-Critic scores faithfulness (0–1) and triggers corrective.ts retries when < 0.80",
          "Parallel self-improver, swarm, and feedback modules track quality telemetry across 100-query evals",
        ],
      },
      {
        code: "ASI-04",
        name: "4-LLM Circuit-Breaker Cascade & Self-Improving KV Cache",
        group: "17-Module Edge ASI Engine",
        summary: "Zero-downtime multi-provider routing paired with hit-scaled L1/L2 Cloudflare KV caching.",
        capabilities: [
          "Automatic failover chain: Gemini 2.5/2.0 Flash -> Groq -> Cohere Command-A -> OpenRouter free",
          "Circuit breaker opens after 5 provider failures in 1 minute via ProviderRateLimiterDO",
          "L1 exact + L2 semantic cache with dynamic TTL and instant invalidation on document update",
        ],
      },
      {
        code: "ING-01",
        name: "Multimodal Ingestion Pipeline (unpdf, mammoth, AcademicChunker)",
        group: "Multimodal Ingestion & DB",
        summary: "Automated parsing and hierarchical indexing for academic PDF and DOCX guidebooks.",
        capabilities: [
          "Extracts 144+ pages, 40 Markdown/JSON tables (extracted_tables), and 133 R2 images (extracted_images)",
          "Parent-child hierarchy-aware chunking preserving Bab -> Sub-bab -> Pasal context",
          "Normalized Neon Serverless PostgreSQL schema with document_versions and soft-delete flags",
        ],
      },
      {
        code: "FE-01",
        name: "Next.js Virtualized Chat PWA, Admin Console & Mock Mode",
        group: "Frontend PWA & Edge Security",
        summary: "60fps conversational research UI, admin corpus management, and zero-key recruiter dev mode.",
        capabilities: [
          "TanStack Virtual message virtualization, react-markdown + GFM tables + LaTeX math + voice input",
          "Admin dashboard (/admin/dashboard) with JWT auth, stats cards, upload dialog, & ASI learning logs",
          "OpenAPI-generated typed client (openapi.yaml), PWA sw.js, driver.js tour, & Mock Engine Mode",
        ],
      },
      {
        code: "SEC-01",
        name: "Edge License Guard & SQLite Durable Object Rate Limiters",
        group: "Frontend PWA & Edge Security",
        summary: "Production edge hardening defending API routes, quotas, and intellectual property.",
        capabilities: [
          "Origin/Domain Binding + Owner Secret Token returns 403 Forbidden on unauthorized clones",
          "RateLimiterDO & ProviderRateLimiterDO (SQLite-backed Durable Objects) cap abuse across 350 users",
          "Strict security headers, input sanitization, and RPD quota monitor (rpd-tracker.ts)",
        ],
      },
    ],
    architecture: [
      { id: "br-fe", label: "Next.js PWA + Admin", sublabel: "TanStack Virtual · LaTeX · Voice", layer: "client" },
      { id: "br-edge", label: "Cloudflare Workers + Hono", sublabel: "17 ASI Modules · 2 SQLite DOs", layer: "orchestration" },
      { id: "br-llm", label: "4-LLM Circuit Cascade", sublabel: "Gemini · Groq · Cohere · OpenRouter", layer: "ai" },
      { id: "br-db", label: "Neon pgvector + KV + R2", sublabel: "768-dim + ID FTS · 100/100 Eval", layer: "data" },
    ],
    invariants: [
      {
        title: "5-Layer Anti-Hallucination & Citation Enforcement",
        category: "AI Grounding",
        detail: "Combines strict abstain prompts, >= 0.82 / < 0.55 retrieval thresholds, mandatory [Document, Hal X] citations, Jaccard grounding checks, and corrective regeneration when score < 0.80.",
      },
      {
        title: "Automatic 4-Provider Circuit-Breaker Failover",
        category: "High Availability",
        detail: "Trips after 5 errors/minute via ProviderRateLimiterDO and seamlessly cascades across Gemini, Groq, Cohere Command-A, and OpenRouter within $0/month free-tier budgets.",
      },
      {
        title: "Edge License Guard & Durable Object Rate Limiting",
        category: "Edge Security",
        detail: "Origin/Domain binding and Owner Secret verification protect Cloudflare Worker endpoints while SQLite Durable Objects guarantee fair concurrency for 350 users.",
      },
      {
        title: "Versioned Corpus & Automatic KV Cache Invalidation",
        category: "Data Consistency",
        detail: "Document re-uploads soft-delete superseded chunks (is_active = false) and immediately invalidate affected KV cache entries so outdated academic rules are never served.",
      },
    ],
    techStack: [
      "Cloudflare Workers",
      "Hono 4.7 + Zod",
      "SQLite Durable Objects",
      "Cloudflare KV + R2",
      "Neon Serverless PostgreSQL",
      "pgvector (768-dim) + ID FTS",
      "Next.js + React + Shadcn UI",
      "TanStack Virtual",
      "Gemini · Groq · Cohere · OpenRouter",
      "unpdf + mammoth.js",
    ],
  },
};

export function getCaseStudyBySlug(slug: string): CaseStudyRecord | null {
  if (!isCaseStudySlug(slug)) return null;
  return CASE_STUDIES[slug];
}

export function getAdjacentCaseStudies(slug: FlagshipCaseStudySlug): {
  prev: CaseStudyRecord;
  next: CaseStudyRecord;
} {
  const idx = CASE_STUDY_SLUGS.indexOf(slug);
  const total = CASE_STUDY_SLUGS.length;
  const prevSlug = CASE_STUDY_SLUGS[(idx - 1 + total) % total];
  const nextSlug = CASE_STUDY_SLUGS[(idx + 1) % total];
  return {
    prev: CASE_STUDIES[prevSlug],
    next: CASE_STUDIES[nextSlug],
  };
}
