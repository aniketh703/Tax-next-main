import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, AlertCircle, CheckCircle, ArrowRight, Phone,
  FileText, Building2, Calculator, Search, Shield, Clock,
  ChevronDown
} from "lucide-react";

/* ─── Notice types ──────────────────────────────────────────── */
const noticeTypes = [
  {
    icon: FileText,
    title: "Income Tax Notices",
    types: ["Section 143(1) — Intimation", "Section 143(2) — Scrutiny", "Section 148 — Reassessment", "Section 156 — Demand Notice", "Section 245 — Refund Adjustment"],
    desc: "Notices from the Income Tax Department — ranging from routine intimations to scrutiny assessments and demand orders.",
  },
  {
    icon: Building2,
    title: "GST Notices",
    types: ["ASMT-10 — Scrutiny Notice", "DRC-01 — Show Cause Notice", "MOV-09 — Demand Order", "REG-17 — Registration Cancellation", "CMP-05 — Composition Violation"],
    desc: "Notices issued by GST authorities for mismatches, non-filing, ITC discrepancies, or registration issues.",
  },
  {
    icon: Calculator,
    title: "TDS / TCS Notices",
    types: ["Short deduction demand", "Non-payment of TDS", "Late filing of TDS returns", "Form 26AS mismatch", "Challan correction"],
    desc: "Demands and notices from TRACES for non-deduction, short deduction, or incorrect challan mapping.",
  },
  {
    icon: Search,
    title: "Assessment Notices",
    types: ["Scrutiny assessment (143(3))", "Best judgment assessment (144)", "Penalty proceedings (270A)", "Search and survey follow-up", "Appeal and CIT(A) proceedings"],
    desc: "Formal assessment proceedings that require detailed written responses, submissions, and document evidence.",
  },
];

const process = [
  {
    num: "01",
    title: "Immediate review",
    desc: "CA. Prasad reviews the notice on the same day it is shared. The notice type, section, response deadline, and risk level are assessed.",
  },
  {
    num: "02",
    title: "Preparation and response",
    desc: "A detailed written response is prepared with supporting documents. Every claim is backed by evidence. The draft is shared with you for review before submission.",
  },
  {
    num: "03",
    title: "Filing and follow-through",
    desc: "The response is filed electronically and acknowledged. Any further correspondence from the department is handled by the same CA.",
  },
];

const included = [
  "Same-day notice review and initial assessment",
  "Written response drafted by CA. Prasad personally",
  "Supporting document checklist prepared",
  "Response shared with you before submission",
  "Filed electronically with acknowledgement",
  "Follow-up correspondence handled through to closure",
  "Explanation of the notice and outcome in plain language",
];

const faqs = [
  {
    q: "How soon must I respond to a tax notice?",
    a: "Response deadlines vary. Most notices under Section 143(2) require a response within 30 days. Demand notices and Section 148 notices have different timelines. The first thing CA. Prasad does is determine the exact deadline and communicate it clearly.",
  },
  {
    q: "What if I ignored the notice for some time?",
    a: "Contact us immediately. A late response is better than no response in almost all cases. Ignoring notices can result in ex-parte assessment orders and penalties. We will assess where things stand and advise on the best course of action.",
  },
  {
    q: "Do I need to attend the tax office in person?",
    a: "For most notices, the response and document submission is handled electronically through the Income Tax or GST portal. Personal hearings are required for assessment proceedings — CA. Prasad appears on your behalf where authorised.",
  },
  {
    q: "Is a notice always a bad sign?",
    a: "Not necessarily. Section 143(1) intimations are routine — they flag a mismatch between your return and department records and often require a simple clarification. Scrutiny notices are more serious. Every notice is different and should be read carefully before drawing conclusions.",
  },
  {
    q: "What documents will I need to provide?",
    a: "It depends on the notice. A demand notice may only require a reconciliation statement. A scrutiny notice may require bank statements, salary certificates, investment proofs, and sale documents. CA. Prasad prepares a specific checklist for each case.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8EDE9] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-inset"
      >
        <span className="font-heading font-medium text-[0.9375rem] text-[#1C201E] leading-snug pr-2">
          {q}
        </span>
        <ChevronDown
          size={17}
          strokeWidth={1.5}
          className={`text-[#4E5A54] shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="pb-5 pr-8">
          <p className="font-body text-sm text-[#4E5A54] leading-[1.8]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function NoticeHandling() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-5 text-sm text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#D4DAD6]" aria-hidden="true" />
            <Link to="/services" className="hover:text-[#1A4D2E] transition-colors">Services</Link>
            <ChevronRight size={14} className="text-[#D4DAD6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Notice Handling</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              {/* Urgency badge */}
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-medium font-body rounded-full px-3.5 py-1.5 mb-5">
                <AlertCircle size={12} strokeWidth={1.5} />
                Most notices have a 30-day response window
              </div>

              <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
                Notice Handling Service
              </span>
              <h1 className="font-heading font-semibold text-[2.25rem] sm:text-[2.75rem] lg:text-[3rem] tracking-tight leading-[1.1] text-[#1C201E] mb-4">
                Received a tax notice?<br />
                <span className="text-[#1A4D2E]">Take action now.</span>
              </h1>
              <p className="font-body text-base text-[#4E5A54] leading-relaxed max-w-lg mb-6">
                Ignoring a notice makes it worse. Most income tax and GST notices require a response
                within 30 days. CA. Prasad reviews your notice on the same day you share it and
                prepares the response personally.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Link
                  to="/contact"
                  data-testid="notice-hero-cta"
                  className="inline-flex items-center justify-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-6 py-3 font-medium font-body text-sm hover:bg-[#133b23] transition-colors shadow-sm"
                >
                  Share Your Notice
                  <ArrowRight size={15} strokeWidth={1.5} />
                </Link>
                <a
                  href="https://wa.me/910000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="notice-whatsapp-cta"
                  className="inline-flex items-center justify-center gap-2 border border-[#D4DAD6] text-[#1C201E] rounded-lg px-6 py-3 font-medium font-body text-sm hover:border-[#1A4D2E] hover:text-[#1A4D2E] transition-colors"
                >
                  <Phone size={15} strokeWidth={1.5} />
                  WhatsApp the notice
                </a>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {["Same-day review", "CA. Prasad handles personally", "Response before deadline"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-[0.8125rem] text-[#4E5A54] font-body">
                    <CheckCircle size={13} strokeWidth={1.5} className="text-[#1A4D2E]" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Urgency card */}
            <div className="bg-[#F2F5F3] border border-[#E8EDE9] rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-5">
                <Clock size={16} strokeWidth={1.5} className="text-[#1A4D2E]" />
                <p className="font-heading font-medium text-[#1C201E] text-sm">Why response time matters</p>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Section 143(1) Intimation",  window: "30 days",   risk: "Medium" },
                  { label: "Section 143(2) Scrutiny",    window: "30 days",   risk: "High" },
                  { label: "Section 148 Reassessment",   window: "30 days",   risk: "High" },
                  { label: "Section 156 Demand Notice",  window: "30 days",   risk: "Critical" },
                  { label: "GST DRC-01 Show Cause",      window: "15–30 days", risk: "High" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4">
                    <p className="font-body text-sm text-[#4E5A54] flex-1">{item.label}</p>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-body text-xs text-[#1C201E] font-medium">{item.window}</span>
                      <span className={`text-[0.6875rem] font-medium font-body px-2 py-0.5 rounded-full ${
                        item.risk === "Critical" ? "bg-red-100 text-red-700" :
                        item.risk === "High" ? "bg-amber-50 text-amber-700" :
                        "bg-[#e8eee9] text-[#1A4D2E]"
                      }`}>
                        {item.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-body text-xs text-[#4E5A54] mt-5 leading-relaxed">
                Deadlines are from the date of the notice. Missing them can result in ex-parte
                assessment orders, penalties, or prosecution in serious cases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Notice types ──────────────────────────────── */}
      <section data-testid="notice-types-section" className="bg-[#F2F5F3] border-y border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl mb-10 lg:mb-14">
            <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
              Notice Types We Handle
            </span>
            <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight mb-3">
              We handle all income tax, GST, and TDS notices.
            </h2>
            <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-relaxed">
              If you've received any of the following, CA. Prasad can review and respond. No notice
              is too routine or too complex.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {noticeTypes.map((nt) => {
              const Icon = nt.icon;
              return (
                <div
                  key={nt.title}
                  data-testid={`notice-type-${nt.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="bg-white rounded-xl border border-[#E8EDE9] p-6 shadow-sm"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#e8eee9] flex items-center justify-center shrink-0">
                      <Icon size={18} strokeWidth={1.5} className="text-[#1A4D2E]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-medium text-base text-[#1C201E]">{nt.title}</h3>
                      <p className="font-body text-sm text-[#4E5A54] mt-1 leading-relaxed">{nt.desc}</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 pl-0">
                    {nt.types.map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#1A4D2E] mt-2 shrink-0" />
                        <span className="font-body text-sm text-[#4E5A54]">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How we handle it ─────────────────────────── */}
      <section data-testid="notice-process-section" className="bg-[#FBFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center mb-12">
            <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
              Our Process
            </span>
            <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight mb-3">
              From notice to resolution — handled by CA. Prasad.
            </h2>
            <p className="font-body text-base text-[#4E5A54] max-w-xl mx-auto leading-relaxed">
              The same CA reviews your notice, prepares the response, and follows it through to closure.
              No handoffs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 relative mb-10">
            <div className="hidden md:block absolute top-[2.75rem] left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-[#D4DAD6] z-0" />
            {process.map((step) => (
              <div
                key={step.num}
                data-testid={`notice-step-${step.num}`}
                className="relative z-10 flex flex-col items-center text-center px-6 py-8"
              >
                <div className="w-14 h-14 rounded-full bg-white border-2 border-[#1A4D2E] flex items-center justify-center mb-5 shadow-sm">
                  <span className="font-heading font-semibold text-sm text-[#1A4D2E]">{step.num}</span>
                </div>
                <h3 className="font-heading font-medium text-base text-[#1C201E] mb-2">{step.title}</h3>
                <p className="font-body text-sm text-[#4E5A54] leading-[1.7] max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ───────────────────────────── */}
      <section data-testid="notice-included-section" className="bg-[#F2F5F3] border-y border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
                What's Included
              </span>
              <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight mb-4">
                Everything handled — from review to resolution.
              </h2>
              <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-relaxed mb-7">
                When you share a notice with us, here is exactly what we do — included in the
                engagement, without hidden charges.
              </p>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={15} strokeWidth={1.5} className="text-[#1A4D2E] mt-0.5 shrink-0" />
                    <span className="font-body text-[0.9375rem] text-[#4E5A54]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shield card */}
            <div className="bg-white rounded-2xl border border-[#E8EDE9] p-8 shadow-sm text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#e8eee9] mb-5">
                <Shield size={28} strokeWidth={1.5} className="text-[#1A4D2E]" />
              </div>
              <h3 className="font-heading font-medium text-xl text-[#1C201E] mb-3">
                CA. Prasad handles your notice personally.
              </h3>
              <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-relaxed mb-6">
                Your notice is not passed to a junior or processed through a system. CA. Prasad
                reads it, drafts the response, and ensures it is correct before it is filed.
              </p>
              <Link
                to="/contact"
                data-testid="notice-included-cta"
                className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-6 py-3 font-medium font-body text-sm hover:bg-[#133b23] transition-colors shadow-sm"
              >
                Share Your Notice
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section data-testid="notice-faq-section" className="bg-[#FBFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
                Common Questions
              </span>
              <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2rem] text-[#1C201E] tracking-tight leading-snug mb-4">
                Questions people ask when they receive a notice.
              </h2>
              <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-relaxed">
                Notices are stressful. These answers cover the most common concerns. If your
                question isn't here, contact us directly.
              </p>
            </div>
            <div className="lg:col-span-3 bg-white rounded-xl border border-[#E8EDE9] px-6 py-1 shadow-sm">
              {faqs.map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky CTA ───────────────────────────────── */}
      <div
        data-testid="notice-sticky-cta"
        aria-hidden={!showSticky}
        className={`fixed z-40 bottom-[5.25rem] left-0 right-0 flex justify-center px-4
          sm:bottom-8 sm:left-auto sm:right-8 sm:px-0 sm:block
          transition-all duration-300 ease-out ${
          showSticky
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-full px-6 py-3 font-medium font-body text-sm hover:bg-[#133b23] transition-colors shadow-lg shadow-black/25 whitespace-nowrap"
        >
          Share Your Notice
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>

      {/* ── Final CTA ────────────────────────────────── */}
      <section data-testid="notice-cta-section" className="bg-[#1A4D2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading font-semibold text-[1.875rem] sm:text-[2.25rem] text-white tracking-tight mb-3">
              Don't wait on a notice.
            </h2>
            <p className="font-body text-[0.9375rem] text-white/70 mb-8 leading-relaxed">
              Share the notice with CA. Prasad today. He will review it, confirm the deadline, and
              tell you exactly what needs to be done — before any commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
              <Link
                to="/contact"
                data-testid="notice-final-cta"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1A4D2E] rounded-lg px-7 py-3 font-medium font-body text-[0.9375rem] hover:bg-[#F2F5F3] transition-colors shadow-sm"
              >
                Share Notice — Get a Response
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <a
                href="https://wa.me/910000000000"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="notice-whatsapp-final"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 rounded-lg px-7 py-3 font-medium font-body text-[0.9375rem] hover:bg-white/15 transition-colors"
              >
                <Phone size={16} strokeWidth={1.5} />
                WhatsApp Us Now
              </a>
            </div>
            <p className="font-body text-[0.75rem] text-white/40">
              Same-day review &nbsp;·&nbsp; CA oversight on every response &nbsp;·&nbsp; No hidden charges
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
