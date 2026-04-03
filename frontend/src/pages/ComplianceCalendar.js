import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, AlertCircle, ArrowRight, ChevronRight, Filter } from "lucide-react";

/* ─── Compliance data ───────────────────────────────────────── */
const typeConfig = {
  gst:  { label: "GST",          dot: "bg-blue-500",   bg: "bg-blue-50",     text: "text-blue-700",   border: "border-blue-100"  },
  tds:  { label: "TDS",          dot: "bg-amber-500",  bg: "bg-amber-50",    text: "text-amber-700",  border: "border-amber-100" },
  tax:  { label: "Income Tax",   dot: "bg-[#1A4D2E]",  bg: "bg-[#e8eee9]",  text: "text-[#1A4D2E]",  border: "border-[#1A4D2E]/15" },
  roc:  { label: "ROC / MCA",    dot: "bg-purple-500", bg: "bg-purple-50",   text: "text-purple-700", border: "border-purple-100" },
};

const months = [
  {
    id: "apr", month: "April 2026",
    deadlines: [
      { date: "7 Apr",  task: "TDS Deposit for March 2026 (Except non-salary)", type: "tds" },
      { date: "11 Apr", task: "GSTR-1 for March 2026 (Monthly filers)",       type: "gst" },
      { date: "13 Apr", task: "GSTR-2B auto-populated for March",             type: "gst" },
      { date: "20 Apr", task: "GSTR-3B for March 2026",                       type: "gst" },
      { date: "30 Apr", task: "TDS Payment for March (Non-Salary payments)",  type: "tds" },
    ],
  },
  {
    id: "may", month: "May 2026",
    deadlines: [
      { date: "7 May",  task: "TDS Deposit for April 2026",                   type: "tds" },
      { date: "11 May", task: "GSTR-1 for April 2026 (Monthly filers)",       type: "gst" },
      { date: "20 May", task: "GSTR-3B for April 2026",                       type: "gst" },
      { date: "31 May", task: "TDS Return Filing — Q4 (FY 2025-26)",          type: "tds" },
    ],
  },
  {
    id: "jun", month: "June 2026",
    deadlines: [
      { date: "7 Jun",  task: "TDS Deposit for May 2026",                     type: "tds" },
      { date: "11 Jun", task: "GSTR-1 for May 2026 (Monthly filers)",         type: "gst" },
      { date: "15 Jun", task: "Advance Tax — 1st Instalment (15%)",          type: "tax" },
      { date: "20 Jun", task: "GSTR-3B for May 2026",                         type: "gst" },
    ],
  },
  {
    id: "jul", month: "July 2026",
    deadlines: [
      { date: "7 Jul",  task: "TDS Deposit for June 2026",                    type: "tds" },
      { date: "11 Jul", task: "GSTR-1 for June 2026 (Monthly filers)",        type: "gst" },
      { date: "20 Jul", task: "GSTR-3B for June 2026",                        type: "gst" },
      { date: "31 Jul", task: "ITR Filing Deadline — Individuals (Non-audit)", type: "tax" },
      { date: "31 Jul", task: "TDS Return — Q1 FY 2026-27",                   type: "tds" },
    ],
  },
  {
    id: "aug", month: "August 2026",
    deadlines: [
      { date: "7 Aug",  task: "TDS Deposit for July 2026",                    type: "tds" },
      { date: "11 Aug", task: "GSTR-1 for July 2026 (Monthly filers)",        type: "gst" },
      { date: "20 Aug", task: "GSTR-3B for July 2026",                        type: "gst" },
      { date: "31 Aug", task: "TDS Certificate (Form 16A) — Q1 FY 2026-27",  type: "tds" },
    ],
  },
  {
    id: "sep", month: "September 2026",
    deadlines: [
      { date: "7 Sep",  task: "TDS Deposit for August 2026",                  type: "tds" },
      { date: "11 Sep", task: "GSTR-1 for August 2026 (Monthly filers)",      type: "gst" },
      { date: "15 Sep", task: "Advance Tax — 2nd Instalment (45% cumulative)", type: "tax" },
      { date: "30 Sep", task: "Tax Audit Report — 44AB (Statutory Due Date)", type: "tax" },
      { date: "30 Sep", task: "AGM Deadline — Companies for FY 2025-26",      type: "roc" },
    ],
  },
  {
    id: "oct", month: "October 2026",
    deadlines: [
      { date: "7 Oct",  task: "TDS Deposit for September 2026",               type: "tds" },
      { date: "11 Oct", task: "GSTR-1 for September 2026 (Monthly filers)",   type: "gst" },
      { date: "20 Oct", task: "GSTR-3B for September 2026",                   type: "gst" },
      { date: "30 Oct", task: "ROC Annual Filing — AOC-4 (Within 30d of AGM)", type: "roc" },
      { date: "31 Oct", task: "ITR Filing — Audit cases and Corporates",      type: "tax" },
      { date: "31 Oct", task: "TDS Return — Q2 FY 2026-27",                   type: "tds" },
    ],
  },
  {
    id: "dec", month: "December 2026",
    deadlines: [
      { date: "15 Dec", task: "Advance Tax — 3rd Instalment (75% cumulative)", type: "tax" },
      { date: "31 Dec", task: "Belated/Revised ITR (FY 2025-26)",             type: "tax" },
      { date: "31 Dec", task: "GSTR-9 & 9C — Annual Return (FY 2025-26)",    type: "gst" },
    ],
  },
  {
    id: "mar", month: "March 2027",
    deadlines: [
      { date: "7 Mar",  task: "TDS Deposit for February 2027",                type: "tds" },
      { date: "15 Mar", task: "Advance Tax — 4th Instalment (100%)",          type: "tax" },
      { date: "31 Mar", task: "Financial year-end — All books reconciled",    type: "tax" },
    ],
  },
];

const FILTER_OPTIONS = [
  { id: "all", label: "All Deadlines" },
  { id: "gst", label: "GST" },
  { id: "tds", label: "TDS" },
  { id: "tax", label: "Income Tax" },
  { id: "roc", label: "ROC / MCA" },
];

export default function ComplianceCalendar() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredMonths = months.map((m) => ({
    ...m,
    deadlines: activeFilter === "all"
      ? m.deadlines
      : m.deadlines.filter((d) => d.type === activeFilter),
  })).filter((m) => m.deadlines.length > 0);

  return (
    <>
      <SEO
        title="Compliance Calendar FY 2026-27 | Tax & GST Due Dates"
        description="Stay updated with important statutory due dates for Income Tax, GST, TDS, and ROC filings for FY 2026-27."
        canonical="/compliance-calendar"
      />
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-5 text-sm text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#D4DAD6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Compliance Calendar</span>
          </nav>
          <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
            FY 2026-27 DUE DATES
          </span>
          <h1 className="font-heading font-semibold text-[2.25rem] sm:text-[2.75rem] tracking-tight leading-[1.1] text-[#1C201E] mb-3 max-w-2xl">
            Statutory Deadlines for <span className="text-[#1A4D2E]">FY 2026-27</span>.
          </h1>
          <p className="font-body text-base text-[#4E5A54] leading-relaxed max-w-xl">
            Important dates for Income Tax, GST, TDS, and ROC filings in accordance with the 
            <strong> Income Tax Act, 2025</strong> and latest regulatory framework.
          </p>
        </div>
      </section>

      {/* ── Legend + Filter ───────────────────────────── */}
      <div className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Legend */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {Object.entries(typeConfig).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${val.dot}`} />
                  <span className="font-body text-[0.8125rem] text-[#4E5A54]">{val.label}</span>
                </div>
              ))}
            </div>
            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter size={14} strokeWidth={1.5} className="text-[#4E5A54]" />
              <div className="flex gap-1.5 flex-wrap">
                {FILTER_OPTIONS.map((f) => (
                  <button
                    key={f.id}
                    data-testid={`cal-filter-${f.id}`}
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-3.5 py-2 rounded-full font-body text-xs font-medium transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-1 ${
                      activeFilter === f.id
                        ? "bg-[#1A4D2E] text-white"
                        : "bg-[#F2F5F3] text-[#4E5A54] hover:text-[#1A4D2E]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Calendar ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="space-y-10 mb-14">
          {filteredMonths.map((m) => (
            <section key={m.id} data-testid={`calendar-month-${m.id}`}>
              <div className="flex items-center gap-3 mb-5">
                <Calendar size={16} strokeWidth={1.5} className="text-[#1A4D2E]" />
                <h2 className="font-heading font-medium text-[1.125rem] text-[#1C201E]">{m.month}</h2>
                <span className="font-body text-xs text-[#4E5A54] bg-[#F2F5F3] px-2 py-0.5 rounded-full">
                  {m.deadlines.length} deadline{m.deadlines.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl border border-[#E8EDE9] overflow-hidden shadow-sm">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr className="border-b border-[#E8EDE9] bg-[#FBFBF9]">
                      <th className="text-left text-[11px] uppercase tracking-[0.1em] font-semibold text-[#4E5A54] px-5 py-3 w-24">Date</th>
                      <th className="text-left text-[11px] uppercase tracking-[0.1em] font-semibold text-[#4E5A54] px-5 py-3">Compliance Requirement</th>
                      <th className="text-left text-[11px] uppercase tracking-[0.1em] font-semibold text-[#4E5A54] px-5 py-3 w-32">Category</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8EDE9]">
                    {m.deadlines.map((d, i) => {
                      const type = typeConfig[d.type];
                      return (
                        <tr
                          key={i}
                          data-testid={`deadline-row-${m.id}-${i}`}
                          className="hover:bg-[#F2F5F3] transition-colors"
                        >
                          <td className="px-5 py-3.5 font-medium text-[#1C201E] whitespace-nowrap">
                            {d.date}
                          </td>
                          <td className="px-5 py-3.5 text-[#4E5A54] leading-snug">
                            {d.task}
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${type.bg} ${type.text} ${type.border} border`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${type.dot}`} />
                              {type.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTAs */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-3">
            <AlertCircle size={16} strokeWidth={1.5} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-heading font-medium text-amber-800 text-sm mb-1">Important</p>
              <p className="font-body text-sm text-amber-700 leading-relaxed">
                Due dates are subject to government notifications and extensions. Always verify with the official GST or Income Tax portal or confirm with your CA.
              </p>
            </div>
          </div>
          <div className="bg-[#F2F5F3] border border-[#E8EDE9] rounded-xl p-6">
            <h3 className="font-heading font-medium text-[#1C201E] text-sm mb-2">
              Let VNAV & Associates track this for you.
            </h3>
            <p className="font-body text-sm text-[#4E5A54] mb-4 leading-relaxed">
              We manage your full compliance calendar — GST, TDS, ITR, and ROC — so you never need to track due dates yourself.
            </p>
            <Link
              to="/contact"
              data-testid="calendar-cta-btn"
              className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-5 py-2.5 text-sm font-medium font-body hover:bg-[#133b23] transition-colors shadow-sm"
            >
              Get Compliance Handled
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
