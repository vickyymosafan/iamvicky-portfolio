"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Activity,
  AlertTriangle,
  Box,
  CheckCircle2,
  CloudOff,
  Cpu,
  Database,
  Download,
  FileCheck2,
  GitBranch,
  Layers,
  Lock,
  Monitor,
  PackageCheck,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  TrendingUp,
  WifiOff,
  XCircle,
} from "lucide-react";
import type { MockupScreenId } from "@/data/caseStudies";

/* ============================================================================
   BUILDFLOW CONSTRUCTION ERP — 4 VISUAL UI/UX SCREENS
   Authentic Calm Enterprise Palette: Deep Navy #17324D, Steel Blue #2F6B9A,
   Off-White #F4F7FA, Slate Ink #2D3D4B, Sage #4D8B70, Amber #C18A3A, Red #B95B5B
   ============================================================================ */

function BuildFlowExecDashboardScreen() {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: "#F4F7FA", borderColor: "#CBD5E1", color: "#17324D" }}
    >
      {/* Realistic Enterprise Browser Bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 font-mono text-xs"
        style={{ backgroundColor: "#17324D", color: "#F8FAFC" }}
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#4D8B70" }} />
          <span className="font-semibold">BuildFlow ERP · Executive Control Tower</span>
        </div>
        <span
          className="rounded px-2 py-0.5 text-[11px]"
          style={{ backgroundColor: "#2F6B9A", color: "#FFFFFF" }}
        >
          org: PT-KONSTRUKSI-NUSANTARA · RBAC: DIRECTOR
        </span>
      </div>

      {/* Real Official Mockup Asset */}
      <div className="p-3 sm:p-5">
        <div
          className="relative overflow-hidden rounded-xl border bg-white shadow-sm"
          style={{ borderColor: "#D6E0EB" }}
        >
          <Image
            src="/images/case-studies/buildflow-dashboard.png"
            alt="BuildFlow Construction ERP Executive Dashboard UI showing 12 active projects, IDR 32.0B contract value, 68% budget utilization, cash flow chart, and pending approvals"
            width={1200}
            height={760}
            className="h-auto w-full object-contain"
            priority
          />
        </div>

        {/* Annotated UX Callout Strip */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {[
            {
              label: "Top KPI Ribbon",
              detail: "12 Active Projects · IDR 32.0B Contract · 68% Budget · IDR 2.5B AR",
            },
            {
              label: "Approval Inbox",
              detail: "One-click Director sign-off with inline PO/PR budget ceiling validation",
            },
            {
              label: "Calm Slate Palette",
              detail: "Zero eye fatigue across 8-hour finance & QS cost-control sessions",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#D6E0EB" }}
            >
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider" style={{ color: "#2F6B9A" }}>
                {item.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed" style={{ color: "#2D3D4B" }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BuildFlowMobilePwaScreen() {
  return (
    <div
      className="overflow-hidden rounded-2xl border p-4 sm:p-6"
      style={{ backgroundColor: "#F4F7FA", borderColor: "#CBD5E1", color: "#17324D" }}
    >
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
        {/* Official Mobile PWA Asset */}
        <div className="flex justify-center lg:col-span-5">
          <div
            className="w-full max-w-[290px] overflow-hidden rounded-2xl border-2 bg-white shadow-md"
            style={{ borderColor: "#17324D" }}
          >
            <Image
              src="/images/case-studies/buildflow-mobile-site.png"
              alt="BuildFlow ERP Mobile Offline PWA Daily Site Report screen for Office Tower Jakarta"
              width={480}
              height={920}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        {/* Offline PWA Field Architecture Companion */}
        <div className="space-y-4 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold"
              style={{ backgroundColor: "#17324D", color: "#FFFFFF" }}
            >
              <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>PWA FIELD APP · SITE OPS</span>
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-semibold"
              style={{ backgroundColor: "#FEF3C7", color: "#78350F" }}
            >
              <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
              <span>OFFLINE QUEUE READY</span>
            </span>
          </div>

          <h4 className="font-heading text-xl font-bold" style={{ color: "#17324D" }}>
            Daily Site Report (DSR/PRJ-01/2026-10-31)
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: "#2D3D4B" }}>
            Built for Site Supervisors standing inside basement pours or remote sites with unreliable mobile data. Every weather reading, mandor headcount, WBS progress delta, and site photo writes into local offline storage first, then replays cleanly through signed S3/R2 upload URLs.
          </p>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              {
                icon: CloudOff,
                title: "IndexedDB Draft Queue",
                desc: "Persists weather, worker roster & progress locally with idempotent retry keys.",
              },
              {
                icon: Lock,
                title: "Private Signed S3 Vault",
                desc: "Field photos upload privately with <= 15-minute signed download URLs.",
              },
              {
                icon: Activity,
                title: "Live WBS Progress Rollup",
                desc: "Approved DSR percentages update executive S-curves and progress billing.",
              },
              {
                icon: ShieldCheck,
                title: "Project-Scoped RBAC",
                desc: "Supervisors only see assigned site projects under organization -> branch scope.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border p-3.5"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#D6E0EB" }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" style={{ color: "#2F6B9A" }} aria-hidden="true" />
                    <span className="font-mono text-xs font-bold" style={{ color: "#17324D" }}>
                      {item.title}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "#2D3D4B" }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProcurementRow {
  poNumber: string;
  wbsCode: string;
  vendor: string;
  item: string;
  poQty: string;
  grQty: string;
  invAmount: string;
  boqVariance: string;
  status: "MATCHED" | "VARIANCE_HOLD" | "AWAITING_GR";
  sodNote: string;
}

const PROCUREMENT_ROWS: ProcurementRow[] = [
  {
    poNumber: "PO/2026/10/0042",
    wbsCode: "WBS-03.2 · Structural Concrete",
    vendor: "PT Semen Nusantara Beton",
    item: "Ready-Mix Concrete K-350 (180 m3)",
    poQty: "180.00 m3",
    grQty: "180.00 m3",
    invAmount: "IDR 243,000,000",
    boqVariance: "-1.4% under RAB",
    status: "MATCHED",
    sodNote: "Creator (USR-014) != Approver (DIR-002) · Ready for GL Accrual JV/2026/10/0123",
  },
  {
    poNumber: "PO/2026/10/0048",
    wbsCode: "WBS-04.1 · Rebar Reinforcement",
    vendor: "CV Baja Konstruksi Prima",
    item: "Deformed Steel Bar D19 SNI (42 ton)",
    poQty: "42.00 ton",
    grQty: "39.50 ton",
    invAmount: "IDR 638,400,000",
    boqVariance: "+6.2% OVERRUN",
    status: "VARIANCE_HOLD",
    sodNote: "Auto-held: Vendor billed 42t vs. Warehouse GR 39.5t (+2.5t discrepancy). AP blocked.",
  },
  {
    poNumber: "PO/2026/10/0051",
    wbsCode: "WBS-06.4 · MEP Switchgear",
    vendor: "PT Daya Panel Elektrik",
    item: "Main Distribution Panel 1600A (2 units)",
    poQty: "2.00 units",
    grQty: "0.00 units",
    invAmount: "Pending GR",
    boqVariance: "0.0% on RAB",
    status: "AWAITING_GR",
    sodNote: "PO approved by Procurement Mgr · Awaiting Site Warehouse Goods Receipt scan.",
  },
];

function BuildFlowProcurement3WayScreen() {
  const [filter, setFilter] = useState<"ALL" | "MATCHED" | "VARIANCE_HOLD">("ALL");
  const [selectedPo, setSelectedPo] = useState<string>(PROCUREMENT_ROWS[0].poNumber);

  const visibleRows =
    filter === "ALL"
      ? PROCUREMENT_ROWS
      : PROCUREMENT_ROWS.filter((r) => r.status === filter);
  const activeRow =
    visibleRows.find((r) => r.poNumber === selectedPo) ?? visibleRows[0] ?? PROCUREMENT_ROWS[0];

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: "#F4F7FA", borderColor: "#CBD5E1", color: "#17324D" }}
    >
      {/* Top Enterprise Header */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
        style={{ backgroundColor: "#17324D", color: "#FFFFFF" }}
      >
        <div className="flex items-center gap-2 font-mono text-xs font-semibold">
          <PackageCheck className="h-4 w-4" style={{ color: "#93C5FD" }} aria-hidden="true" />
          <span>PROCUREMENT · 3-WAY MATCHING &amp; BOQ GUARD</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["ALL", "MATCHED", "VARIANCE_HOLD"] as const).map((statusKey) => {
            const active = filter === statusKey;
            return (
              <button
                key={statusKey}
                type="button"
                onClick={() => setFilter(statusKey)}
                className="min-h-8 cursor-pointer rounded px-2.5 py-1 font-mono text-[11px] font-semibold"
                style={{
                  backgroundColor: active ? "#2F6B9A" : "#224364",
                  color: "#FFFFFF",
                }}
              >
                {statusKey === "ALL"
                  ? "All POs (3)"
                  : statusKey === "MATCHED"
                  ? "Matched"
                  : "Variance Hold"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Interactive Row List (Zero Overflow on 320px) */}
      <div className="space-y-3 p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-2.5">
          {visibleRows.map((row) => {
            const isSelected = activeRow.poNumber === row.poNumber;
            const badgeStyle =
              row.status === "MATCHED"
                ? { bg: "#DCFCE7", fg: "#14532D", text: "3-WAY MATCHED" }
                : row.status === "VARIANCE_HOLD"
                ? { bg: "#FEE2E2", fg: "#7F1D1D", text: "VARIANCE HOLD" }
                : { bg: "#FEF3C7", fg: "#78350F", text: "AWAITING GR" };

            return (
              <button
                key={row.poNumber}
                type="button"
                onClick={() => setSelectedPo(row.poNumber)}
                className="w-full cursor-pointer rounded-xl border p-3.5 text-left transition-colors"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: isSelected ? "#2F6B9A" : "#D6E0EB",
                  boxShadow: isSelected ? "0 0 0 2px rgba(47, 107, 154, 0.22)" : "none",
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold" style={{ color: "#17324D" }}>
                      {row.poNumber}
                    </span>
                    <span className="font-mono text-[11px]" style={{ color: "#475569" }}>
                      {row.wbsCode}
                    </span>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold"
                    style={{ backgroundColor: badgeStyle.bg, color: badgeStyle.fg }}
                  >
                    {badgeStyle.text}
                  </span>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-2 text-xs sm:grid-cols-4">
                  <div className="sm:col-span-2">
                    <p className="font-semibold" style={{ color: "#17324D" }}>
                      {row.item}
                    </p>
                    <p style={{ color: "#475569" }}>{row.vendor}</p>
                  </div>
                  <div className="font-mono">
                    <span className="block text-[11px]" style={{ color: "#475569" }}>
                      PO / GR Qty
                    </span>
                    <span className="font-semibold" style={{ color: "#17324D" }}>
                      {row.poQty} / {row.grQty}
                    </span>
                  </div>
                  <div className="font-mono sm:text-right">
                    <span className="block text-[11px]" style={{ color: "#475569" }}>
                      Invoice · RAB Delta
                    </span>
                    <span className="font-semibold" style={{ color: "#17324D" }}>
                      {row.invAmount}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected PO Inspection Drawer */}
        <div
          className="rounded-xl border p-4"
          style={{ backgroundColor: "#EBF0F5", borderColor: "#CBD5E1" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs font-bold uppercase" style={{ color: "#17324D" }}>
              Audit &amp; SoD Verification · {activeRow.poNumber}
            </span>
            <span className="font-mono text-xs font-bold" style={{ color: "#2F6B9A" }}>
              BOQ Delta: {activeRow.boqVariance}
            </span>
          </div>
          <p className="mt-1.5 font-mono text-xs leading-relaxed" style={{ color: "#2D3D4B" }}>
            {activeRow.sodNote}
          </p>
        </div>
      </div>
    </div>
  );
}

function BuildFlowProcessErdScreen() {
  const [diagram, setDiagram] = useState<"process" | "erd">("process");

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: "#F4F7FA", borderColor: "#CBD5E1", color: "#17324D" }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
        style={{ backgroundColor: "#17324D", color: "#FFFFFF" }}
      >
        <span className="font-mono text-xs font-semibold">
          BUILDFLOW OFFICIAL ARCHITECTURE ARTIFACTS
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setDiagram("process")}
            className="min-h-8 cursor-pointer rounded px-3 py-1 font-mono text-[11px] font-semibold"
            style={{
              backgroundColor: diagram === "process" ? "#2F6B9A" : "#224364",
              color: "#FFFFFF",
            }}
          >
            6-Stage Business Process
          </button>
          <button
            type="button"
            onClick={() => setDiagram("erd")}
            className="min-h-8 cursor-pointer rounded px-3 py-1 font-mono text-[11px] font-semibold"
            style={{
              backgroundColor: diagram === "erd" ? "#2F6B9A" : "#224364",
              color: "#FFFFFF",
            }}
          >
            Conceptual Domain ERD
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div
          className="overflow-hidden rounded-xl border bg-white p-2"
          style={{ borderColor: "#D6E0EB" }}
        >
          {diagram === "process" ? (
            <Image
              src="/images/case-studies/buildflow-process.png"
              alt="BuildFlow Construction ERP 6-stage business lifecycle diagram from Acquire and Plan through Procure, Execute, Control, and Close"
              width={1200}
              height={680}
              className="h-auto w-full object-contain"
            />
          ) : (
            <Image
              src="/images/case-studies/buildflow-erd.png"
              alt="BuildFlow Construction ERP PostgreSQL 16 multi-tenant conceptual Entity Relationship Diagram"
              width={1200}
              height={760}
              className="h-auto w-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   ARVEN LUXURY E-COMMERCE — 4 VISUAL UI/UX SCREENS
   Storefront Ivory #F8F7F3 / Cream #E9E4DA / Charcoal #17191B / Cobalt #1F4E79
   Admin Charcoal #17191B / Graphite #35383A / Ivory #F8F7F3
   ============================================================================ */

const ARVEN_SIZES = [
  { size: "S", stock: 4, status: "AVAILABLE" as const },
  { size: "M", stock: 2, status: "LOW_STOCK" as const },
  { size: "L", stock: 1, status: "RESERVED_HOLD" as const },
  { size: "XL", stock: 0, status: "SOLD_OUT" as const },
];

function ArvenStorefrontEditorialScreen() {
  const [selectedSize, setSelectedSize] = useState("M");
  const activeSizeObj = ARVEN_SIZES.find((s) => s.size === selectedSize) ?? ARVEN_SIZES[1];

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: "#F8F7F3", borderColor: "#D8D2C5", color: "#17191B" }}
    >
      {/* Storefront Editorial Top Bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em]"
        style={{ backgroundColor: "#F8F7F3", borderColor: "#E2DCD0", color: "#17191B" }}
      >
        <span className="font-bold">ARVEN · ATELIER SS26</span>
        <span>BEYOND TRENDS · BEYOND TIME</span>
        <span style={{ color: "#1F4E79" }}>IDR · ASIA/JAKARTA</span>
      </div>

      <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 lg:grid-cols-12">
        {/* Real Verified Editorial Assets */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7">
          <div className="overflow-hidden border" style={{ borderColor: "#D8D2C5" }}>
            <Image
              src="/images/case-studies/arven-atelier.webp"
              alt="ARVEN Luxury Atelier SS26 editorial collection campaign triptych"
              width={720}
              height={540}
              className="h-56 w-full object-cover sm:h-64"
            />
            <div className="px-3 py-2 font-mono text-[11px]" style={{ backgroundColor: "#E9E4DA", color: "#17191B" }}>
              /collections/atelier · 0px Sharp Editorial Crop
            </div>
          </div>
          <div className="overflow-hidden border" style={{ borderColor: "#D8D2C5" }}>
            <Image
              src="/images/case-studies/arven-lookbook.webp"
              alt="ARVEN Archival SS26 ivory luxury fashion lookbook garment"
              width={720}
              height={540}
              className="h-56 w-full object-cover sm:h-64"
            />
            <div className="px-3 py-2 font-mono text-[11px]" style={{ backgroundColor: "#E9E4DA", color: "#17191B" }}>
              /lookbook/archival-ss26-01 · Zero-WebGL Fast Load
            </div>
          </div>
        </div>

        {/* Commerce-First Variant Selector */}
        <div
          className="flex flex-col justify-between space-y-4 border p-4 lg:col-span-5"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#D8D2C5" }}
        >
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "#1F4E79" }}>
              SKU: ARV-SS26-COAT-{activeSizeObj.size}
            </p>
            <h4 className="font-heading text-xl font-bold tracking-tight" style={{ color: "#17191B" }}>
              Structured Double-Faced Wool Trench
            </h4>
            <p className="font-mono text-base font-bold" style={{ color: "#17191B" }}>
              IDR 4,850,000
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#35383A" }}>
              Server-authoritative pricing &amp; live inventory reservation buckets. Selecting a size verifies real variant availability before entering checkout.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-[11px] font-semibold uppercase" style={{ color: "#35383A" }}>
              Select Size Variant
            </p>
            <div className="grid grid-cols-4 gap-2">
              {ARVEN_SIZES.map((item) => {
                const selected = item.size === selectedSize;
                return (
                  <button
                    key={item.size}
                    type="button"
                    onClick={() => setSelectedSize(item.size)}
                    className="min-h-10 cursor-pointer border font-mono text-xs font-bold"
                    style={{
                      backgroundColor: selected ? "#17191B" : "#F8F7F3",
                      borderColor: selected ? "#17191B" : "#C9C2B4",
                      color: selected ? "#F8F7F3" : "#17191B",
                    }}
                  >
                    {item.size}
                  </button>
                );
              })}
            </div>
            <div
              className="rounded px-3 py-2 font-mono text-[11px] font-semibold"
              style={{
                backgroundColor:
                  activeSizeObj.status === "AVAILABLE"
                    ? "#E6F0EB"
                    : activeSizeObj.status === "SOLD_OUT"
                    ? "#F6E4E4"
                    : "#F7EFE0",
                color:
                  activeSizeObj.status === "AVAILABLE"
                    ? "#234E3C"
                    : activeSizeObj.status === "SOLD_OUT"
                    ? "#7A2727"
                    : "#6D480B",
              }}
            >
              {activeSizeObj.status === "AVAILABLE"
                ? `In Stock (${activeSizeObj.stock} units) · Ready for Atomic Lock`
                : activeSizeObj.status === "LOW_STOCK"
                ? `Low Stock (${activeSizeObj.stock} left) · Sorted variant_id Lock Active`
                : activeSizeObj.status === "RESERVED_HOLD"
                ? "1 Unit in 15-min Checkout Reservation Window"
                : "Sold Out · 0 Oversell Invariant Enforced"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const OUTFIT_SLOTS = [
  { slot: "Outerwear", item: "Archival Wool Trench", sku: "ARV-OT-01", price: 4850000 },
  { slot: "Top", item: "Heavyweight Cashmere Knit", sku: "ARV-TP-04", price: 2450000 },
  { slot: "Bottom", item: "Pleated Drape Trouser", sku: "ARV-BT-09", price: 2150000 },
  { slot: "Footwear", item: "Architectural Derby Boot", sku: "ARV-FW-02", price: 3600000 },
];

function ArvenOutfitStudioScreen() {
  const [renderMode, setRenderMode] = useState<"webgl" | "poster">("webgl");
  const [activeSlots, setActiveSlots] = useState<string[]>([
    "Outerwear",
    "Top",
    "Bottom",
    "Footwear",
  ]);

  const toggleSlot = (slotName: string) => {
    setActiveSlots((prev) =>
      prev.includes(slotName)
        ? prev.length > 1
          ? prev.filter((s) => s !== slotName)
          : prev
        : [...prev, slotName]
    );
  };

  const totalIdr = OUTFIT_SLOTS.filter((s) => activeSlots.includes(s.slot)).reduce(
    (sum, s) => sum + s.price,
    0
  );

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: "#F8F7F3", borderColor: "#D8D2C5", color: "#17191B" }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
        style={{ backgroundColor: "#E9E4DA", borderColor: "#D8D2C5" }}
      >
        <div className="flex items-center gap-2 font-mono text-xs font-bold" style={{ color: "#17191B" }}>
          <Box className="h-4 w-4" style={{ color: "#1F4E79" }} aria-hidden="true" />
          <span>@arven/three-engine · OUTFIT STUDIO</span>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setRenderMode("webgl")}
            className="min-h-8 cursor-pointer rounded px-3 py-1 font-mono text-[11px] font-semibold"
            style={{
              backgroundColor: renderMode === "webgl" ? "#17191B" : "#FFFFFF",
              color: renderMode === "webgl" ? "#F8F7F3" : "#17191B",
            }}
          >
            3D WebGL Rig
          </button>
          <button
            type="button"
            onClick={() => setRenderMode("poster")}
            className="min-h-8 cursor-pointer rounded px-3 py-1 font-mono text-[11px] font-semibold"
            style={{
              backgroundColor: renderMode === "poster" ? "#17191B" : "#FFFFFF",
              color: renderMode === "poster" ? "#F8F7F3" : "#17191B",
            }}
          >
            2D Poster Fallback
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 lg:grid-cols-12">
        {/* Interactive Mannequin / Poster Viewport */}
        <div
          className="flex flex-col justify-between rounded-xl border p-4 lg:col-span-6"
          style={{
            backgroundColor: renderMode === "webgl" ? "#17191B" : "#FFFFFF",
            borderColor: "#C9C2B4",
            color: renderMode === "webgl" ? "#F8F7F3" : "#17191B",
          }}
        >
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span>
              {renderMode === "webgl"
                ? "R3F 9 · GLB AssetStatus: APPROVED"
                : "NO-WEBGL MODE · INSTANT POSTER FALLBACK"}
            </span>
            <span
              className="rounded px-2 py-0.5 font-bold"
              style={{
                backgroundColor: renderMode === "webgl" ? "#1F4E79" : "#E9E4DA",
                color: renderMode === "webgl" ? "#FFFFFF" : "#17191B",
              }}
            >
              {activeSlots.length}/4 SLOTS
            </span>
          </div>

          <div className="my-4 grid grid-cols-2 gap-2.5">
            {OUTFIT_SLOTS.map((s) => {
              const equipped = activeSlots.includes(s.slot);
              return (
                <div
                  key={s.slot}
                  className="rounded-lg border p-3 font-mono text-xs"
                  style={{
                    backgroundColor:
                      renderMode === "webgl"
                        ? equipped
                          ? "#262A2E"
                          : "#1D2024"
                        : equipped
                        ? "#F8F7F3"
                        : "#FFFFFF",
                    borderColor: equipped
                      ? renderMode === "webgl"
                        ? "#82B0DC"
                        : "#1F4E79"
                      : "#64748B",
                    opacity: equipped ? 1 : 0.65,
                  }}
                >
                  <p className="text-[11px] uppercase tracking-wider">{s.slot}</p>
                  <p className="mt-1 font-sans text-xs font-semibold">{s.item}</p>
                  <p className="mt-1 text-[11px]">{equipped ? "Equipped" : "Removed"}</p>
                </div>
              );
            })}
          </div>

          <p className="font-mono text-[11px]">
            {renderMode === "webgl"
              ? "Lazy-hydrated React Three Fiber 9 stage with orbit presets & mannequin slot anchors."
              : "Commerce-First guarantee: shoppers browse & buy full outfits even when GPU acceleration is disabled."}
          </p>
        </div>

        {/* Slot Toggles & Outfit Total */}
        <div className="flex flex-col justify-between space-y-4 lg:col-span-6">
          <div className="space-y-2">
            <p className="font-mono text-xs font-bold uppercase" style={{ color: "#1F4E79" }}>
              Toggle Garment Rig Slots
            </p>
            <div className="space-y-2">
              {OUTFIT_SLOTS.map((slot) => {
                const equipped = activeSlots.includes(slot.slot);
                return (
                  <button
                    key={slot.slot}
                    type="button"
                    onClick={() => toggleSlot(slot.slot)}
                    className="flex min-h-11 w-full cursor-pointer items-center justify-between rounded-lg border px-3.5 py-2 text-left"
                    style={{
                      backgroundColor: equipped ? "#FFFFFF" : "#EFECE4",
                      borderColor: equipped ? "#1F4E79" : "#D8D2C5",
                      color: "#17191B",
                    }}
                  >
                    <div>
                      <span className="font-mono text-[11px] font-bold uppercase" style={{ color: "#1F4E79" }}>
                        {slot.slot}
                      </span>
                      <p className="text-xs font-semibold">{slot.item}</p>
                    </div>
                    <span className="font-mono text-xs font-bold">
                      IDR {slot.price.toLocaleString("en-US")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="flex flex-wrap items-center justify-between gap-2 rounded-lg p-3.5"
            style={{ backgroundColor: "#17191B", color: "#F8F7F3" }}
          >
            <div>
              <p className="font-mono text-[11px] uppercase" style={{ color: "#CBD5E1" }}>
                Server-Verified Outfit Total
              </p>
              <p className="font-mono text-base font-bold">
                IDR {totalIdr.toLocaleString("en-US")}
              </p>
            </div>
            <span
              className="rounded px-3 py-1.5 font-mono text-xs font-bold"
              style={{ backgroundColor: "#1F4E79", color: "#FFFFFF" }}
            >
              Save to /account/outfits
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArvenAdminOpsScreen() {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: "#17191B", borderColor: "#35383A", color: "#F8F7F3" }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 font-mono text-xs"
        style={{ backgroundColor: "#1F2225", borderColor: "#35383A" }}
      >
        <span className="font-bold" style={{ color: "#82B0DC" }}>
          ARVEN ADMIN CONSOLE · RBAC + TOTP MFA VERIFIED
        </span>
        <span className="rounded px-2 py-0.5 text-[11px]" style={{ backgroundColor: "#263D32", color: "#A7F3D0" }}>
          5 STATE MACHINES ACTIVE
        </span>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        {/* 5 Independent State Machines */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { machine: "OrderStatus", state: "CONFIRMED", next: "PACKING" },
            { machine: "PaymentStatus", state: "SETTLED", next: "Midtrans Verified" },
            { machine: "ShipmentStatus", state: "IN_TRANSIT", next: "JNE-ARV8821" },
            { machine: "ReturnStatus", state: "NONE", next: "RMA Guarded" },
            { machine: "AssetStatus", state: "APPROVED", next: "GLB Live" },
          ].map((sm) => (
            <div
              key={sm.machine}
              className="rounded-lg border p-3"
              style={{ backgroundColor: "#232629", borderColor: "#35383A" }}
            >
              <p className="font-mono text-[11px]" style={{ color: "#94A3B8" }}>
                {sm.machine}
              </p>
              <p className="mt-1 font-mono text-xs font-bold" style={{ color: "#82B0DC" }}>
                {sm.state}
              </p>
              <p className="mt-0.5 text-[11px]" style={{ color: "#CBD5E1" }}>
                {sm.next}
              </p>
            </div>
          ))}
        </div>

        {/* Append-Only Inventory Movements Ledger */}
        <div
          className="rounded-xl border p-4"
          style={{ backgroundColor: "#1E2124", borderColor: "#35383A" }}
        >
          <p className="font-mono text-xs font-bold uppercase" style={{ color: "#F8F7F3" }}>
            Append-Only inventory_movements Ledger (Zero Direct Balance Edits)
          </p>
          <div className="mt-3 space-y-2 font-mono text-xs">
            {[
              { type: "RESERVATION", sku: "ARV-SS26-COAT-M", qty: "-1", ref: "idem_88f1a · TTL 15m" },
              { type: "SALE", sku: "ARV-SS26-COAT-M", qty: "0 (committed)", ref: "midtrans_getStatus: settlement" },
              { type: "RELEASE", sku: "ARV-BT-09-L", qty: "+1", ref: "bullmq:inventory expiry sweep" },
            ].map((mv) => (
              <div
                key={`${mv.type}-${mv.ref}`}
                className="flex flex-wrap items-center justify-between gap-2 rounded border px-3 py-2"
                style={{ backgroundColor: "#17191B", borderColor: "#35383A" }}
              >
                <span className="font-bold" style={{ color: "#82B0DC" }}>
                  {mv.type}
                </span>
                <span>{mv.sku}</span>
                <span style={{ color: "#A7F3D0" }}>{mv.qty}</span>
                <span style={{ color: "#CBD5E1" }}>{mv.ref}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArvenWorkerQueuesScreen() {
  const queues = [
    { name: "payment", priority: "CRITICAL", job: "Midtrans signature + getStatus + payment_events dedup" },
    { name: "inventory", priority: "CRITICAL", job: "15-min reservation expiry sweep -> RELEASE movement" },
    { name: "order", priority: "HIGH", job: "State-machine sync & transactional invoice generation" },
    { name: "shipping", priority: "HIGH", job: "Courier airway bill polling & ShipmentStatus updates" },
    { name: "notification", priority: "STANDARD", job: "Order confirmation, shipping & RMA emails" },
    { name: "media", priority: "ASYNC", job: "Editorial WebP / AVIF responsive asset derivatives" },
    { name: "3d-assets", priority: "ASYNC", job: "GLB mesh validation & poster fallback rendering" },
    { name: "analytics", priority: "ASYNC", job: "Conversion funnel & collection demand rollups" },
  ];

  return (
    <div
      className="overflow-hidden rounded-2xl border p-4 sm:p-5"
      style={{ backgroundColor: "#17191B", borderColor: "#35383A", color: "#F8F7F3" }}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono text-xs font-bold" style={{ color: "#82B0DC" }}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          <span>apps/worker · 8 ISOLATED BULLMQ 6 QUEUES (REDIS 8)</span>
        </div>
        <span className="font-mono text-[11px]" style={{ color: "#CBD5E1" }}>
          PostgreSQL 18 Outbox -&gt; BullMQ
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {queues.map((q) => (
          <div
            key={q.name}
            className="rounded-xl border p-3.5"
            style={{ backgroundColor: "#232629", borderColor: "#35383A" }}
          >
            <div className="flex items-center justify-between gap-2 font-mono text-xs">
              <span className="font-bold" style={{ color: "#F8F7F3" }}>
                q:{q.name}
              </span>
              <span
                className="rounded px-1.5 py-0.5 text-[11px] font-bold"
                style={{
                  backgroundColor: q.priority === "CRITICAL" ? "#1F4E79" : "#35383A",
                  color: "#FFFFFF",
                }}
              >
                {q.priority}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed" style={{ color: "#CBD5E1" }}>
              {q.job}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   NEXAPIP MARKETPLACE — 4 VISUAL UI/UX SCREENS
   Orvyn Charcoal #090A09 / Surface #101210 / Raised #161916 / Border #2D332C /
   Chartreuse-Lime #C8F970 / Ink #F4F6F4
   ============================================================================ */

const NEXAPIP_PRODUCTS = [
  {
    id: "quantgridpro",
    name: "QuantGridPro v6.0",
    category: "Adaptive Grid · XAUUSD / EURUSD",
    priceIdr: "Rp 1.850.000",
    netProfit: "+184.6%",
    maxDd: "8.4%",
    profitFactor: "2.48",
    winRate: "74.2%",
    sharpe: "3.12",
    trades: "1,428",
    sha256: "9f4b21c8e7d3a049...7e12c71a",
    mt5Build: "Build 4410+",
    equityPoints: "10,130 60,118 110,112 160,116 210,94 260,82 310,66 360,54 410,36 470,18",
  },
  {
    id: "scalpzone",
    name: "ScalpZone EA v5.10",
    category: "Precision Scalping · EURUSD / USDJPY",
    priceIdr: "Rp 1.450.000",
    netProfit: "+126.2%",
    maxDd: "5.1%",
    profitFactor: "2.21",
    winRate: "69.8%",
    sharpe: "2.89",
    trades: "2,190",
    sha256: "4a88e01f9c24bb53...c4902d0e",
    mt5Build: "Build 4410+",
    equityPoints: "10,132 60,124 110,110 160,104 210,98 260,88 310,74 360,60 410,44 470,28",
  },
];

function NexaPipCatalogTesterScreen() {
  const [selectedId, setSelectedId] = useState(NEXAPIP_PRODUCTS[0].id);
  const active = NEXAPIP_PRODUCTS.find((p) => p.id === selectedId) ?? NEXAPIP_PRODUCTS[0];

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: "#090A09", borderColor: "#2D332C", color: "#F4F6F4" }}
    >
      {/* Top Terminal Bar */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
        style={{ backgroundColor: "#101210", borderColor: "#1F231F" }}
      >
        <div className="flex items-center gap-2 font-mono text-xs font-bold">
          <TrendingUp className="h-4 w-4" style={{ color: "#C8F970" }} aria-hidden="true" />
          <span>NEXAPIP MARKET · 99,9% TICK RIIL TELEMETRY</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {NEXAPIP_PRODUCTS.map((prod) => {
            const isActive = prod.id === active.id;
            return (
              <button
                key={prod.id}
                type="button"
                onClick={() => setSelectedId(prod.id)}
                className="min-h-8 cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] font-bold"
                style={{
                  backgroundColor: isActive ? "#C8F970" : "#161916",
                  color: isActive ? "#090A09" : "#F4F6F4",
                }}
              >
                {prod.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 lg:grid-cols-12">
        {/* SVG Equity Curve + Metrics */}
        <div className="space-y-4 lg:col-span-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h4 className="font-heading text-xl font-bold">{active.name}</h4>
              <p className="font-mono text-xs" style={{ color: "#A9B4A8" }}>
                {active.category} · MT5 {active.mt5Build}
              </p>
            </div>
            <span
              className="rounded-full px-3 py-1 font-mono text-xs font-bold"
              style={{ backgroundColor: "#C8F970", color: "#090A09" }}
            >
              {active.priceIdr} · Lifetime
            </span>
          </div>

          <div
            className="rounded-xl border p-4"
            style={{ backgroundColor: "#101210", borderColor: "#2D332C" }}
          >
            <div className="mb-2 flex items-center justify-between font-mono text-[11px]" style={{ color: "#A9B4A8" }}>
              <span>MT5 Strategy Tester Equity Curve (99,9% Tick Riil)</span>
              <span style={{ color: "#C8F970" }}>Net {active.netProfit}</span>
            </div>
            <svg
              viewBox="0 0 480 150"
              className="h-36 w-full"
              role="img"
              aria-label={`Simulated MT5 Strategy Tester equity curve for ${active.name}`}
            >
              <defs>
                <linearGradient id="nexapip-eq-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C8F970" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#C8F970" stopOpacity="0.01" />
                </linearGradient>
              </defs>
              <line x1="10" y1="35" x2="470" y2="35" stroke="#1F231F" strokeWidth="1" />
              <line x1="10" y1="80" x2="470" y2="80" stroke="#1F231F" strokeWidth="1" />
              <line x1="10" y1="125" x2="470" y2="125" stroke="#1F231F" strokeWidth="1" />
              <polygon
                points={`${active.equityPoints} 470,140 10,140`}
                fill="url(#nexapip-eq-fill)"
              />
              <polyline
                fill="none"
                stroke="#C8F970"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={active.equityPoints}
              />
            </svg>
          </div>
        </div>

        {/* Tabular Strategy Metrics Grid */}
        <div className="flex flex-col justify-between space-y-3 lg:col-span-5">
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { label: "Net Profit", value: active.netProfit, highlight: true },
              { label: "Max Drawdown", value: active.maxDd, highlight: false },
              { label: "Profit Factor", value: active.profitFactor, highlight: true },
              { label: "Win Rate", value: active.winRate, highlight: false },
              { label: "Sharpe Ratio", value: active.sharpe, highlight: false },
              { label: "Total Trades", value: active.trades, highlight: false },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl border p-3"
                style={{ backgroundColor: "#161916", borderColor: "#2D332C" }}
              >
                <p className="font-mono text-[11px]" style={{ color: "#A9B4A8" }}>
                  {m.label}
                </p>
                <p
                  className="mt-1 font-mono text-base font-bold tabular-nums"
                  style={{ color: m.highlight ? "#C8F970" : "#F4F6F4" }}
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl border p-3 font-mono text-[11px]"
            style={{ backgroundColor: "#101210", borderColor: "#2D332C", color: "#D7FB94" }}
          >
            SHA-256 Vault: {active.sha256}
          </div>
        </div>
      </div>
    </div>
  );
}

const EX5_SAMPLES = [
  {
    id: "valid-ex5",
    filename: "QuantGridPro_v6.0.ex5",
    size: "428 KB",
    magic: "EX5\\0 (MetaEditor 5 Compiled Binary)",
    verdict: "PASS" as const,
    checks: [
      { label: "Extension allowlist (.ex5 only)", ok: true },
      { label: "Binary size within 64B - 50MB bounds", ok: true },
      { label: "MetaEditor 5 magic header (EX5\\0 / MQL5 / MZ)", ok: true },
      { label: "Zero raw MQL source tokens (#property / OnTick)", ok: true },
    ],
    output: "Stored in private ./storage/ex5/9f4b21c8...ex5 · SHA-256 persisted to ProductRelease.",
  },
  {
    id: "reject-ex4",
    filename: "LegacyMartingale.ex4",
    size: "212 KB",
    magic: "EX4 (MetaTrader 4 Binary)",
    verdict: "REJECT" as const,
    checks: [
      { label: "Extension allowlist (.ex5 only)", ok: false },
      { label: "Binary size within 64B - 50MB bounds", ok: true },
      { label: "MetaEditor 5 magic header (EX5\\0 / MQL5 / MZ)", ok: false },
      { label: "Zero raw MQL source tokens (#property / OnTick)", ok: true },
    ],
    output: "Blocked by src/domain/ex5.ts: File MT4 (.ex4) tidak didukung. NexaPip khusus biner MT5 (.ex5).",
  },
  {
    id: "reject-source",
    filename: "FakeCompiled_Renamed.ex5",
    size: "18 KB",
    magic: "ASCII UTF-8 (#property copyright ... void OnTick())",
    verdict: "REJECT" as const,
    checks: [
      { label: "Extension allowlist (.ex5 only)", ok: true },
      { label: "Binary size within 64B - 50MB bounds", ok: true },
      { label: "MetaEditor 5 magic header (EX5\\0 / MQL5 / MZ)", ok: false },
      { label: "Zero raw MQL source tokens (#property / OnTick)", ok: false },
    ],
    output: "Blocked by src/domain/ex5.ts: Terdeteksi source code MQL5 mentah (#property / OnTick) yang disamarkan sebagai .ex5.",
  },
];

function NexaPipEx5VaultScreen() {
  const [sampleId, setSampleId] = useState(EX5_SAMPLES[0].id);
  const sample = EX5_SAMPLES.find((s) => s.id === sampleId) ?? EX5_SAMPLES[0];

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: "#090A09", borderColor: "#2D332C", color: "#F4F6F4" }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
        style={{ backgroundColor: "#101210", borderColor: "#1F231F" }}
      >
        <div className="flex items-center gap-2 font-mono text-xs font-bold">
          <FileCheck2 className="h-4 w-4" style={{ color: "#C8F970" }} aria-hidden="true" />
          <span>src/domain/ex5.ts · BINARY VAULT INSPECTOR</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {EX5_SAMPLES.map((item) => {
            const active = item.id === sample.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSampleId(item.id)}
                className="min-h-8 cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] font-bold"
                style={{
                  backgroundColor: active ? "#C8F970" : "#161916",
                  color: active ? "#090A09" : "#F4F6F4",
                }}
              >
                {item.filename}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4" style={{ backgroundColor: "#101210", borderColor: "#2D332C" }}>
          <div className="font-mono text-xs space-y-1">
            <p className="font-bold text-sm">{sample.filename}</p>
            <p style={{ color: "#A9B4A8" }}>
              Payload Size: {sample.size} · Detected Header: {sample.magic}
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 font-mono text-xs font-bold"
            style={{
              backgroundColor: sample.verdict === "PASS" ? "#C8F970" : "#FCA5A5",
              color: "#090A09",
            }}
          >
            {sample.verdict === "PASS" ? (
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>{sample.verdict === "PASS" ? "VAULT ACCEPTED" : "UPLOAD REJECTED"}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {sample.checks.map((chk) => (
            <div
              key={chk.label}
              className="flex items-center gap-2.5 rounded-xl border p-3 font-mono text-xs"
              style={{ backgroundColor: "#161916", borderColor: "#2D332C" }}
            >
              {chk.ok ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#C8F970" }} aria-hidden="true" />
              ) : (
                <XCircle className="h-4 w-4 shrink-0" style={{ color: "#FCA5A5" }} aria-hidden="true" />
              )}
              <span>{chk.label}</span>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl border p-3.5 font-mono text-xs leading-relaxed"
          style={{
            backgroundColor: "#101210",
            borderColor: sample.verdict === "PASS" ? "#9ED93F" : "#EF4444",
            color: sample.verdict === "PASS" ? "#D7FB94" : "#FECACA",
          }}
        >
          {sample.output}
        </div>
      </div>
    </div>
  );
}

function NexaPipBuyerLibraryScreen() {
  const [view, setView] = useState<"buyer" | "admin">("buyer");

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: "#090A09", borderColor: "#2D332C", color: "#F4F6F4" }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
        style={{ backgroundColor: "#101210", borderColor: "#1F231F" }}
      >
        <span className="font-mono text-xs font-bold" style={{ color: "#C8F970" }}>
          {view === "buyer"
            ? "/library · KOLEKSI SAYA (LIFETIME OWNERSHIP)"
            : "/admin · SELLER RELEASE STUDIO"}
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setView("buyer")}
            className="min-h-8 cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] font-bold"
            style={{
              backgroundColor: view === "buyer" ? "#C8F970" : "#161916",
              color: view === "buyer" ? "#090A09" : "#F4F6F4",
            }}
          >
            Buyer /library
          </button>
          <button
            type="button"
            onClick={() => setView("admin")}
            className="min-h-8 cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] font-bold"
            style={{
              backgroundColor: view === "admin" ? "#C8F970" : "#161916",
              color: view === "admin" ? "#090A09" : "#F4F6F4",
            }}
          >
            Admin /admin
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {view === "buyer" ? (
          <div className="space-y-3">
            {[
              {
                name: "QuantGridPro v6.0",
                orderId: "ORD-NXP-2026-0194 · PAID via QRIS",
                sha: "sha256:9f4b21c8e7d3...c71a",
                downloads: "3 logged fetches",
              },
              {
                name: "ScalpZone EA v5.10",
                orderId: "ORD-NXP-2026-0211 · PAID via BCA VA",
                sha: "sha256:4a88e01f9c24...2d0e",
                downloads: "1 logged fetch",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4"
                style={{ backgroundColor: "#101210", borderColor: "#2D332C" }}
              >
                <div className="space-y-1">
                  <p className="font-heading text-base font-bold">{item.name}</p>
                  <p className="font-mono text-[11px]" style={{ color: "#A9B4A8" }}>
                    {item.orderId} · {item.downloads}
                  </p>
                  <p className="font-mono text-[11px]" style={{ color: "#D7FB94" }}>
                    {item.sha}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs font-bold"
                    style={{ backgroundColor: "#C8F970", color: "#090A09" }}
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Unduh .EX5</span>
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs font-semibold"
                    style={{ backgroundColor: "#161916", borderColor: "#2D332C", color: "#F4F6F4" }}
                  >
                    <span>Preset .SET</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                title: "Publish New Release",
                detail: "Upload QuantGridPro v6.1 .ex5 + .set changelog -> auto-unlocks for all paid Lifetime buyers.",
              },
              {
                title: "Order & Download Telemetry",
                detail: "Tracks PAID/PENDING Mayar orders alongside every DownloadLog timestamp & buyer ID.",
              },
              {
                title: "Verified Review Replies",
                detail: "Responds directly to verifiedPurchase buyer reviews with parameter guidance.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border p-4"
                style={{ backgroundColor: "#161916", borderColor: "#2D332C" }}
              >
                <p className="font-mono text-xs font-bold" style={{ color: "#C8F970" }}>
                  {card.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: "#D1D5DB" }}>
                  {card.detail}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NexaPipMayarCircuitScreen() {
  const stages = [
    {
      num: "01",
      title: "Kurasi Strategi MT5",
      detail: "7 StrategyCategory enums + 99,9% Tick Riil metrics & input parameters.",
    },
    {
      num: "02",
      title: "Audit Biner .EX5",
      detail: "src/domain/ex5.ts header validation + SHA-256 digest in private ./storage/ex5/.",
    },
    {
      num: "03",
      title: "Checkout Mayar IDR",
      detail: "One-time Lifetime Rupiah checkout via QRIS, E-Wallet, and Virtual Account.",
    },
    {
      num: "04",
      title: "Koleksi Saya Lifetime",
      detail: "Authenticated .ex5 + .set streaming, DownloadLog audit, & free future releases.",
    },
  ];

  return (
    <div
      className="overflow-hidden rounded-2xl border p-4 sm:p-6"
      style={{ backgroundColor: "#090A09", borderColor: "#2D332C", color: "#F4F6F4" }}
    >
      <p className="mb-4 font-mono text-xs font-bold uppercase tracking-wider" style={{ color: "#C8F970" }}>
        NexaPipMarketplaceFlow · 4-Stage Verified Circuit
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((st) => (
          <div
            key={st.num}
            className="rounded-xl border p-4"
            style={{ backgroundColor: "#101210", borderColor: "#2D332C" }}
          >
            <span
              className="inline-flex rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold"
              style={{ backgroundColor: "#C8F970", color: "#090A09" }}
            >
              STAGE {st.num}
            </span>
            <h4 className="mt-3 font-heading text-sm font-bold">{st.title}</h4>
            <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "#CBD5E1" }}>
              {st.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   CRAFTRIG MCP GOVERNANCE RIG — 4 VISUAL UI/UX SCREENS
   Obsidian #0B0E15 / Panel #151B27 / Amber #F5A623 / Cyan #38BDF8 / Pass #34D399
   ============================================================================ */

const CRAFTRIG_WAVES = [
  {
    id: "planning",
    label: "Planning Wave",
    criticalDepth: "Depth 4",
    tasks: [
      { role: "governance-lead", lock: "docs/security/*", status: "COMPLETED", skill: "security-review" },
      { role: "architecture-lead", lock: "docs/architecture/*", status: "COMPLETED", skill: "clean-architecture" },
      { role: "design-lead", lock: "src/tokens/*", status: "COMPLETED", skill: "design-systems-governance" },
    ],
  },
  {
    id: "implementation",
    label: "Implementation Wave",
    criticalDepth: "Depth 3",
    tasks: [
      { role: "frontend-developer", lock: "src/app/projects/[slug]/* + src/data/caseStudies.ts", status: "LOCKED · 15m TTL", skill: "frontend-implementation" },
      { role: "motion-developer", lock: "src/app/globals.css", status: "LOCKED · 15m TTL", skill: "motion-animation" },
    ],
  },
  {
    id: "qa",
    label: "Parallel QA Wave",
    criticalDepth: "Depth 2",
    tasks: [
      { role: "responsive-qa", lock: "SharedBrowserPool [ctx 1/4]", status: "13 VPs · 0 OVERFLOW", skill: "responsive-first-browser-qa" },
      { role: "a11y-qa", lock: "SharedBrowserPool [ctx 2/4]", status: "DARK+LIGHT · 0 AXE", skill: "accessibility-qa" },
      { role: "functional-qa", lock: "SharedBrowserPool [ctx 3/4]", status: "E2E · 100% PASS", skill: "interaction-functional-qa" },
    ],
  },
];

function CraftrigDagLocksScreen() {
  const [waveId, setWaveId] = useState(CRAFTRIG_WAVES[1].id);
  const activeWave = CRAFTRIG_WAVES.find((w) => w.id === waveId) ?? CRAFTRIG_WAVES[0];

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: "#0B0E15", borderColor: "#243045", color: "#F5F6F8" }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
        style={{ backgroundColor: "#111723", borderColor: "#243045" }}
      >
        <div className="flex items-center gap-2 font-mono text-xs font-bold">
          <GitBranch className="h-4 w-4" style={{ color: "#F5A623" }} aria-hidden="true" />
          <span>KAHN TOPOLOGICAL DAG · EXCLUSIVE FILE-LOCK MATRIX</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CRAFTRIG_WAVES.map((w) => {
            const active = w.id === activeWave.id;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => setWaveId(w.id)}
                className="min-h-8 cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] font-bold"
                style={{
                  backgroundColor: active ? "#F5A623" : "#1C2434",
                  color: active ? "#0B0E15" : "#F5F6F8",
                }}
              >
                {w.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span style={{ color: "#38BDF8" }}>
            Active Wave: {activeWave.label} ({activeWave.criticalDepth})
          </span>
          <span style={{ color: "#34D399" }}>0 Path Overlap Collisions · Lease Heartbeat ON</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {activeWave.tasks.map((t) => (
            <div
              key={t.role}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3.5 font-mono text-xs"
              style={{ backgroundColor: "#151B27", borderColor: "#243045" }}
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold" style={{ color: "#F5A623" }}>
                    @{t.role}
                  </span>
                  <span className="rounded px-2 py-0.5 text-[11px]" style={{ backgroundColor: "#0B0E15", color: "#38BDF8" }}>
                    skill: {t.skill}
                  </span>
                </div>
                <p className="text-[11px]" style={{ color: "#CBD5E1" }}>
                  ownedPaths lock: {t.lock}
                </p>
              </div>
              <span
                className="rounded-full px-3 py-1 text-[11px] font-bold"
                style={{ backgroundColor: "#0F2F28", color: "#34D399" }}
              >
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CraftrigPlaywrightQaScreen() {
  const [themeAudit, setThemeAudit] = useState<"dark" | "light">("dark");
  const viewports = [
    "320px",
    "360px",
    "375px",
    "390px",
    "414px",
    "430px",
    "768px",
    "844px",
    "1024px",
    "1280px",
    "1366px",
    "1440px",
    "1920px",
  ];

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{ backgroundColor: "#0B0E15", borderColor: "#243045", color: "#F5F6F8" }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3"
        style={{ backgroundColor: "#111723", borderColor: "#243045" }}
      >
        <div className="flex items-center gap-2 font-mono text-xs font-bold">
          <Monitor className="h-4 w-4" style={{ color: "#38BDF8" }} aria-hidden="true" />
          <span>SharedBrowserPool (MAX 4 CTX) · 13-VP DUAL-THEME QA</span>
        </div>
        <div className="flex gap-1.5">
          {(["dark", "light"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setThemeAudit(mode)}
              className="min-h-8 cursor-pointer rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase"
              style={{
                backgroundColor: themeAudit === mode ? "#38BDF8" : "#1C2434",
                color: themeAudit === mode ? "#0B0E15" : "#F5F6F8",
              }}
            >
              {mode} Theme Audit
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            { label: "Axe Violations", value: "0", color: "#34D399" },
            { label: "Contrast Failures", value: "0", color: "#34D399" },
            { label: "Doc Overflow", value: "0 px", color: "#38BDF8" },
            { label: "Reduced Motion Hidden", value: "0", color: "#F5A623" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border p-3 font-mono"
              style={{ backgroundColor: "#151B27", borderColor: "#243045" }}
            >
              <p className="text-[11px]" style={{ color: "#94A3B8" }}>
                {stat.label}
              </p>
              <p className="mt-1 text-lg font-bold" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl border p-4"
          style={{ backgroundColor: "#151B27", borderColor: "#243045" }}
        >
          <p className="font-mono text-xs font-bold" style={{ color: "#F5F6F8" }}>
            Verified 13-Viewport Sweep ({themeAudit === "dark" ? "Obsidian Dark Polarity" : "Warm Ivory Light Polarity"})
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {viewports.map((vp) => (
              <span
                key={vp}
                className="rounded border px-2.5 py-1 font-mono text-[11px] font-semibold"
                style={{
                  backgroundColor: "#0B0E15",
                  borderColor: "#1E3A5F",
                  color: "#38BDF8",
                }}
              >
                {vp} PASS
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CraftrigBlueprintSqliteScreen() {
  return (
    <div
      className="overflow-hidden rounded-2xl border p-4 sm:p-6"
      style={{ backgroundColor: "#0B0E15", borderColor: "#243045", color: "#F5F6F8" }}
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div
          className="rounded-xl border p-4 space-y-3"
          style={{ backgroundColor: "#151B27", borderColor: "#243045" }}
        >
          <div className="flex items-center gap-2 font-mono text-xs font-bold" style={{ color: "#F5A623" }}>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>BLUEPRINT ARCHITECT PIPELINE</span>
          </div>
          {[
            "1. WorkspaceRepoScanner detects Next.js/NestJS + scripts",
            "2. Adaptive Deep Interview captures architecture & security rules",
            "3. Blueprint Linter flags contradictory constraints pre-code",
            "4. SkillRouter + EffortScaler maps 1 primary skill per REQ-ID",
          ].map((line) => (
            <div
              key={line}
              className="rounded-lg border px-3 py-2 font-mono text-xs"
              style={{ backgroundColor: "#0B0E15", borderColor: "#243045", color: "#E2E8F0" }}
            >
              {line}
            </div>
          ))}
        </div>

        <div
          className="rounded-xl border p-4 space-y-3"
          style={{ backgroundColor: "#151B27", borderColor: "#243045" }}
        >
          <div className="flex items-center gap-2 font-mono text-xs font-bold" style={{ color: "#38BDF8" }}>
            <Database className="h-4 w-4" aria-hidden="true" />
            <span>LEAN node:sqlite WAL &amp; 50 MB EVIDENCE DIET</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
            {[
              { k: "Page Cache Cap", v: "512 KB" },
              { k: "WAL Bound", v: "1 MB max" },
              { k: "Idle Auto-Close", v: "30s -> 0 RAM" },
              { k: "Plan Archive", v: "Brotli .json.br" },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-lg border p-3"
                style={{ backgroundColor: "#0B0E15", borderColor: "#243045" }}
              >
                <p className="text-[11px]" style={{ color: "#94A3B8" }}>
                  {item.k}
                </p>
                <p className="mt-1 font-bold" style={{ color: "#34D399" }}>
                  {item.v}
                </p>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px]" style={{ color: "#CBD5E1" }}>
            SHA-256 content-addressed failure screenshots + LRU quota eviction keep .craftrig/ strictly &lt;= 50 MB.
          </p>
        </div>
      </div>
    </div>
  );
}

function CraftrigQualityGateScreen() {
  const checkpoints = [
    "responsive",
    "layout",
    "interaction",
    "typography-color",
    "motion",
    "accessibility",
    "performance",
    "security",
    "final-regression",
  ];

  return (
    <div
      className="overflow-hidden rounded-2xl border p-4 sm:p-6 space-y-4"
      style={{ backgroundColor: "#0B0E15", borderColor: "#243045", color: "#F5F6F8" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono text-xs font-bold" style={{ color: "#34D399" }}>
          <Terminal className="h-4 w-4" aria-hidden="true" />
          <span>craftrig_evaluate_quality_gate · STATUS: PASS</span>
        </div>
        <span
          className="rounded-full px-3 py-1 font-mono text-[11px] font-bold"
          style={{ backgroundColor: "#3D2B0D", color: "#F5A623" }}
        >
          noPush: true · LOCAL COMMIT ONLY
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {checkpoints.map((dim) => (
          <div
            key={dim}
            className="flex items-center justify-between rounded-lg border px-3 py-2 font-mono text-xs"
            style={{ backgroundColor: "#151B27", borderColor: "#243045" }}
          >
            <span>{dim}</span>
            <span className="font-bold" style={{ color: "#34D399" }}>
              PASS
            </span>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl border p-3.5 font-mono text-xs space-y-1.5"
        style={{ backgroundColor: "#111723", borderColor: "#243045" }}
      >
        <p style={{ color: "#F5A623" }}>
          fileSyncAudit: SHA-256 &amp; mtime verified across all modified workspace paths (0 external conflicts)
        </p>
        <p style={{ color: "#CBD5E1" }}>
          Conventional Commit 1.0.0 ready -&gt; feat(case-studies): add flagship project storytelling and interactive UI/UX pages
        </p>
      </div>
    </div>
  );
}

export function ProjectVisualMockups({ screenId }: { screenId: MockupScreenId }) {
  switch (screenId) {
    case "buildflow-exec-dashboard":
      return <BuildFlowExecDashboardScreen />;
    case "buildflow-mobile-pwa":
      return <BuildFlowMobilePwaScreen />;
    case "buildflow-procurement-3way":
      return <BuildFlowProcurement3WayScreen />;
    case "buildflow-process-erd":
      return <BuildFlowProcessErdScreen />;
    case "arven-storefront-editorial":
      return <ArvenStorefrontEditorialScreen />;
    case "arven-outfit-studio":
      return <ArvenOutfitStudioScreen />;
    case "arven-admin-ops":
      return <ArvenAdminOpsScreen />;
    case "arven-worker-queues":
      return <ArvenWorkerQueuesScreen />;
    case "nexapip-catalog-tester":
      return <NexaPipCatalogTesterScreen />;
    case "nexapip-ex5-vault":
      return <NexaPipEx5VaultScreen />;
    case "nexapip-buyer-library":
      return <NexaPipBuyerLibraryScreen />;
    case "nexapip-mayar-circuit":
      return <NexaPipMayarCircuitScreen />;
    case "craftrig-dag-locks":
      return <CraftrigDagLocksScreen />;
    case "craftrig-playwright-qa":
      return <CraftrigPlaywrightQaScreen />;
    case "craftrig-blueprint-sqlite":
      return <CraftrigBlueprintSqliteScreen />;
    case "craftrig-quality-gate":
      return <CraftrigQualityGateScreen />;
    default:
      return (
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface p-6 font-mono text-xs text-muted">
          <AlertTriangle className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Visual preview unavailable.</span>
        </div>
      );
  }
}

export const MOCKUP_ICON_SET = { Cpu, Layers };
