import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle, FileText, Globe, Building2,
  BarChart2, TrendingUp, Shield, Calculator, BookOpen,
  Briefcase, Users, Calendar, AlertCircle, Phone,
  ChevronRight, Layers
} from "lucide-react";

/* ─── Service Data ──────────────────────────────────────────── */

const individualServices = [
  {
    icon: FileText,
    title: "Salaried Employee ITR",
    desc: "ITR-1 and ITR-2 filing. Form 16 review, HRA exemption, 80C and 80D deduction claims. All deductions verified before submission.",
    anchor: "itr",
  },
  {
    icon: Briefcase,
    title: "Freelancer & Consultant ITR",
    desc: "ITR-3 and ITR-4 for business income. Advance tax calculation, allowable expense claims, and presumptive taxation guidance.",
    anchor: "itr",
  },
  {
    icon: TrendingUp,
    title: "Capital Gains Filing",
    desc: "STCG and LTCG on shares, mutual funds, and property. Cost indexation applied correctly. Tax liability minimised within law.",
    anchor: "itr",
  },
  {
    icon: Globe,
    title: "NRI Income Tax Return",
    desc: "India-source income reporting, DTAA benefit claims, TDS refunds, and residential status determination for compliance.",
    anchor: "nri",
  },
  {
    icon: Calculator,
    title: "Advance Tax Planning",
    desc: "Quarterly advance tax estimates to avoid penal interest under Sections 234B and 234C. Works for salaried, business, and capital gains income.",
    anchor: "itr",
  },
  {
    icon: AlertCircle,
    title: "Income Tax Notice Response",
    desc: "Assessment notices, scrutiny orders, demand intimations, and tax department correspondence — reviewed and responded to by CA. Prasad.",
    anchor: "itr",
    highlight: true,
  },
];

const gstServices = [
  {
    icon: FileText,
    title: "GST Registration",
    desc: "Compulsory and voluntary GST registration. Assessment of threshold applicability, GSTIN obtained with correct business classification.",
  },
  {
    icon: BarChart2,
    title: "Monthly Return Filing",
    desc: "GSTR-1 (outward supplies) and GSTR-3B (summary return with tax payment). Filed before the statutory due date, every month.",
  },
  {
    icon: Calendar,
    title: "Quarterly QRMP Filing",
    desc: "For businesses eligible under the Quarterly Return Monthly Payment scheme — returns filed correctly with IFF and challan management.",
  },
  {
    icon: BookOpen,
    title: "Annual Return (GSTR-9)",
    desc: "Comprehensive annual return reconciling all monthly returns, ITC claimed, and tax paid. GSTR-9C reconciliation statement where applicable.",
  },
  {
    icon: Shield,
    title: "ITC Reconciliation",
    desc: "Input tax credit mismatch resolution between GSTR-2B and purchase records. Ensures no eligible credit is left on the table.",
  },
  {
    icon: AlertCircle,
    title: "GST Notice & Assessment",
    desc: "Show-cause notices, demand orders, and department enquiries — assessed, replied to, and followed through by CA. Prasad.",
    highlight: true,
  },
];

const businessServices = [
  {
    icon: Building2,
    title: "Private Limited Company",
    desc: "Name reservation, MCA incorporation, DSC and DIN, Certificate of Incorporation, and first board meeting minutes.",
  },
  {
    icon: Layers,
    title: "LLP Formation",
    desc: "LLP agreement drafting, designated partner registration, DPIN, and LLP incorporation certificate from MCA.",
  },
  {
    icon: Users,
    title: "Startup India Registration",
    desc: "DPIIT recognition application, startup certificate, and guidance on tax exemptions available under Section 80-IAC.",
  },
  {
    icon: FileText,
    title: "ROC Annual Filing",
    desc: "Form AOC-4, MGT-7, DIR-3 KYC, and all mandatory MCA filings. Directors kept compliant. No penalties for missed deadlines.",
  },
  {
    icon: BookOpen,
    title: "Bookkeeping & Accounts",
    desc: "Monthly or quarterly accounts maintenance. P&L, balance sheet, and bank reconciliation prepared for your records and compliance.",
  },
  {
    icon: Shield,
    title: "Tax Audit (Section 44AB)",
    desc: "Statutory tax audit for businesses exceeding the prescribed turnover threshold. Report filed with ITR before the due date.",
  },
];

const vcfoServices = [
  {
    icon: BarChart2,
    title: "Monthly MIS Reporting",
    desc: "Structured financial statements every month. Revenue, expenses, EBITDA, and key ratios — ready for management and investor review.",
  },
  {
    icon: TrendingUp,
    title: "Cash Flow Management",
    desc: "Monthly cash flow projections, working capital review, and early-warning visibility on shortfalls. Particularly useful for growing businesses.",
  },
  {
    icon: Calculator,
    title: "Annual Tax Planning",
    desc: "Year-round tax optimisation. Salary structuring, advance tax planning, and deduction strategy reviewed before each assessment year.",
  },
  {
    icon: Users,
    title: "Investor-Ready Financials",
    desc: "Clean, well-formatted financial statements and projections prepared in formats suitable for angel rounds, venture capital, and bank lending.",
  },
  {
    icon: Calendar,
    title: "Compliance Calendar Management",
    desc: "All statutory deadlines — GST, TDS, advance tax, ROC, FEMA — tracked and actioned without you needing to follow up.",
  },
  {
    icon: Briefcase,
    title: "Board & Founder Advisory",
    desc: "Periodic calls with CA. Prasad to review the financial position, plan for the next quarter, and address any compliance questions.",
  },
];

/* ─── Sub-components ────────────────────────────────────────── */

function ServiceCard({ icon: Icon, title, desc, highlight }) {
  return (
    <div
      data-testid={`service-card-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      className={`group rounded-xl border p-6 transition-all duration-200 ${
        highlight
          ? "bg-[#1A4D2E]/[0.04] border-[#1A4D2E]/20 hover:border-[#1A4D2E]/40"
          : "bg-white border-[#E8EDE9] hover:border-[#1A4D2E]/20"
      }`}
      style={{ boxShadow: "none" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = highlight ? "0 4px 20px -4px rgba(26,77,46,0.12)" : "0 4px 16px -4px rgba(0,0,0,0.06)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 transition-colors ${
        highlight
          ? "bg-[#1A4D2E]/12 group-hover:bg-[#1A4D2E]"
          : "bg-[#F2F5F3] group-hover:bg-[#1A4D2E]"
      }`}>
        <Icon
          size={16}
          strokeWidth={1.5}
          className={`transition-colors ${
            highlight
              ? "text-[#1A4D2E] group-hover:text-white"
              : "text-[#1A4D2E] group-hover:text-white"
          }`}
        />
      </div>
      <h3 className="font-heading font-medium text-[0.9375rem] text-[#1C201E] mb-2 leading-snug">
        {title}
      </h3>
      <p className="font-body text-[0.8375rem] text-[#4E5A54] leading-[1.75]">{desc}</p>
    </div>
  );
}

function SectionCTA({ label, to = "/contact" }) {
  return (
    <div className="mt-12 pt-8 border-t border-[#E8EDE9] flex flex-col sm:flex-row sm:items-center gap-5">
      <Link
        to={to}
        data-testid={`section-cta-${label.toLowerCase().replace(/\s+/g, "-")}`}
        className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-6 py-3 font-semibold font-body text-[0.8375rem] hover:bg-[#133b23] transition-colors whitespace-nowrap shrink-0 shadow-sm tracking-wide"
      >
        {label}
        <ArrowRight size={14} strokeWidth={1.5} />
      </Link>
      <div className="flex items-center gap-2 text-[0.8125rem] text-[#4E5A54] font-body">
        <CheckCircle size={13} strokeWidth={1.5} className="text-[#1A4D2E] shrink-0" />
        Response within 24 hours · No obligation at the consultation stage
      </div>
    </div>
  );
}

/* ─── Category Nav ──────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Individual Tax", id: "individual" },
  { label: "GST & Indirect Tax", id: "gst" },
  { label: "Business Compliance", id: "business" },
  { label: "Virtual CFO", id: "vcfo" },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 132; // header + sticky nav
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

/* ─── Service Sections Config ───────────────────────────────── */
const sections = [
  {
    id: "individual",
    num: "01",
    label: "Individual Taxation",
    heading: "Income tax services for individuals and NRIs.",
    body: "Whether you are salaried, self-employed, an NRI with India-source income, or have complex capital gains — your return is prepared and reviewed by CA. Prasad before it is filed.",
    services: individualServices,
    ctaLabel: "Discuss Your ITR Requirements",
    bg: "bg-[#FBFBF9]",
  },
  {
    id: "gst",
    num: "02",
    label: "GST & Indirect Tax",
    heading: "GST compliance, returns, and notice handling.",
    body: "From GST registration to annual returns — filings are submitted on time and ITC claims are reconciled correctly. If a notice arrives, it is addressed by the same CA who filed the return.",
    services: gstServices,
    ctaLabel: "Discuss GST Requirements",
    bg: "bg-white",
  },
  {
    id: "business",
    num: "03",
    label: "Business Compliance",
    heading: "Incorporation, annual filings, and business accounts.",
    body: "From setting up the right legal structure to keeping your business compliant year-on-year — ROC filings, bookkeeping, and tax audit handled as part of an ongoing engagement.",
    services: businessServices,
    ctaLabel: "Talk to a CA About Your Business",
    bg: "bg-[#FBFBF9]",
  },
  {
    id: "vcfo",
    num: "04",
    label: "Virtual CFO",
    heading: "Ongoing financial oversight for growing businesses.",
    body: "The financial discipline of a full-time CFO, without the overhead. CA. Prasad acts as your financial anchor — managing reporting, tax planning, compliance deadlines, and investor readiness on a retained basis.",
    services: vcfoServices,
    ctaLabel: "Explore Virtual CFO Services",
    bg: "bg-white",
  },
];

/* ─── Services Page ─────────────────────────────────────────── */
export default function Services() {
  const [active, setActive] = useState("individual");

  function handleNav(id) {
    setActive(id);
    scrollTo(id);
  }

  return (
    <>
      {/* ── Page Hero ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 text-[0.8125rem] text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-[#C4CAC6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Services</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
            <div>
              <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
                What We Do
              </span>
              <h1 className="font-heading font-semibold text-[2.25rem] sm:text-[2.75rem] lg:text-[3.125rem] tracking-tight leading-[1.1] text-[#1C201E] mb-6 max-w-3xl">
                Tax, GST, and business<br className="hidden sm:block" /> compliance — handled properly.
              </h1>
              <p className="font-body text-[1rem] text-[#4E5A54] leading-[1.8] max-w-xl">
                All work is reviewed personally by{" "}
                <strong className="text-[#1C201E] font-medium">CA. V.V.N.Prasad. Gupta</strong>{" "}
                before submission. No delegation to junior staff. No automated outputs standing in for professional judgment.
              </p>
            </div>

            {/* Trust callout — top right */}
            <div className="hidden lg:block shrink-0">
              <div className="bg-[#F2F5F3] border border-[#E8EDE9] rounded-xl px-6 py-5 space-y-3 w-[220px]">
                {[
                  { val: "500+", lbl: "Client engagements" },
                  { val: "10+", lbl: "Years in practice" },
                  { val: "0", lbl: "Late filings" },
                ].map(({ val, lbl }) => (
                  <div key={lbl} className="flex items-baseline gap-2.5">
                    <span className="font-heading font-semibold text-[1.5rem] text-[#1C201E] tracking-tight leading-none">{val}</span>
                    <span className="font-body text-[0.75rem] text-[#4E5A54]">{lbl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Category Nav ────────────────────────────── */}
      <div
        data-testid="services-category-nav"
        className="sticky top-[68px] z-30 bg-white/98 backdrop-blur-sm border-b border-[#E8EDE9]"
        style={{ boxShadow: "0 1px 0 0 #E8EDE9" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                data-testid={`nav-${item.id}`}
                onClick={() => handleNav(item.id)}
                className={`px-5 py-4 font-body text-[0.8125rem] font-medium whitespace-nowrap border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-inset ${
                  active === item.id
                    ? "border-[#1A4D2E] text-[#1A4D2E]"
                    : "border-transparent text-[#6B7B72] hover:text-[#1C201E] hover:border-[#D4DAD6]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Service Sections ─────────────────────────────────── */}
      {sections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          data-testid={`section-${section.id}`}
          className={`${section.bg} ${idx !== sections.length - 1 ? "border-b border-[#E8EDE9]" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
            {/* Section header */}
            <div className="mb-10 lg:mb-14">
              <div className="flex items-center gap-4 mb-5">
                <span
                  className="font-heading font-light text-[3rem] leading-none select-none tabular-nums"
                  style={{ color: "#E2E8E4" }}
                >
                  {section.num}
                </span>
                <span className="font-body text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E]">
                  {section.label}
                </span>
              </div>
              <div className="grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16 items-end">
                <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-[1.2]">
                  {section.heading}
                </h2>
                <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-[1.8]">
                  {section.body}
                </p>
              </div>
            </div>

            {/* Service cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {section.services.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>

            <SectionCTA label={section.ctaLabel} />
          </div>
        </section>
      ))}

      {/* ── Final CTA ───────────────────────────────────────── */}
      <section data-testid="services-final-cta" className="bg-[#1A4D2E]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-white/50 mb-5 font-body">
              Get Started
            </span>
            <h2 className="font-heading font-semibold text-[1.875rem] sm:text-[2.375rem] text-white tracking-tight mb-4 leading-[1.2]">
              Not sure which service applies to you?
            </h2>
            <p className="font-body text-[0.9375rem] text-white/65 mb-10 leading-[1.8] max-w-lg mx-auto">
              Book a free 15-minute call with CA. Prasad. Describe your situation and he will
              confirm exactly what is needed — and what it will cost — before any work begins.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link
                to="/contact"
                data-testid="services-cta-btn"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1A4D2E] rounded-lg px-8 py-3.5 font-semibold font-body text-[0.9375rem] hover:bg-[#F2F5F3] transition-colors shadow-sm tracking-wide"
              >
                Book a Free Consultation
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <a
                href="tel:+910000000000"
                data-testid="services-call-btn"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/25 rounded-lg px-8 py-3.5 font-medium font-body text-[0.9375rem] hover:bg-white/8 transition-colors"
              >
                <Phone size={16} strokeWidth={1.5} />
                +91 00000 00000
              </a>
            </div>
            <p className="font-body text-[0.75rem] text-white/35">
              No obligation at the consultation stage&nbsp;·&nbsp;Response within 24 hours
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
