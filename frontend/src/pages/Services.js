import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, FileText, Globe, Building2,
  BarChart2, TrendingUp, Shield, Calculator, BookOpen,
  Briefcase, Users, Calendar, AlertCircle, Phone,
  ChevronRight, Layers
} from "lucide-react";
import Highlighter from "../components/ui/Highlighter";
import SEO from "../components/SEO";

/* ─── Service Data ──────────────────────────────────────────── */

const auditServices = [
  {
    icon: FileText,
    title: "Statutory & Internal Audits",
    desc: "Statutory and internal audits in accordance with applicable auditing standards.",
  },
  {
    icon: BarChart2,
    title: "Tax Audits & Reviews",
    desc: "Comprehensive tax audits and financial reviews for accurate reporting.",
  }
];

const directServices = [
  {
    icon: Calculator,
    title: "Return Filing",
    desc: "Accurate preparation and filing of income tax returns for individuals and businesses.",
  },
  {
    icon: Shield,
    title: "Regulatory Advisory",
    desc: "Advisory within regulatory framework and representation before tax authorities.",
  }
];

const indirectServices = [
  {
    icon: FileText,
    title: "GST Registration & Returns",
    desc: "GST registration and regular return filing as per the GST Act and Rules.",
  },
  {
    icon: BookOpen,
    title: "Compliance Support",
    desc: "Ongoing support and assistance with indirect tax regulations and queries.",
  }
];

const advisoryServices = [
  {
    icon: TrendingUp,
    title: "Financial Planning",
    desc: "Strategic financial planning and structuring for business operations.",
  },
  {
    icon: Users,
    title: "Compliance Advisory",
    desc: "Compliance advisory ensuring the engagement meets applicable legal obligations.",
  }
];

const regulatoryServices = [
  {
    icon: Building2,
    title: "Company Incorporation",
    desc: "Registration of Private Limited Companies and LLPs.",
  },
  {
    icon: FileText,
    title: "ROC Compliance",
    desc: "Filing and tracking of mandatory ROC compliances and forms.",
  },
  {
    icon: Shield,
    title: "Certification Services",
    desc: "Issuance of necessary certificates required for business operations.",
  }
];

/* ─── Sub-components ────────────────────────────────────────── */

function ServiceCard({ icon: Icon, title, desc, highlight }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5, boxShadow: "0 12px 24px -10px rgba(0,0,0,0.12)" }}
      className={`group rounded-xl border p-6 transition-all duration-300 ${
        highlight
          ? "bg-[#1A4D2E]/[0.04] border-[#1A4D2E]/20 hover:border-[#1A4D2E]/40"
          : "bg-white border-[#E8EDE9] hover:border-[#1A4D2E]/20"
      }`}
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
    </motion.div>
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
        Strictly confidential communications · Professional Standards
      </div>
    </div>
  );
}

/* ─── Category Nav ──────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Audit & Assurance", id: "audit" },
  { label: "Direct Taxation", id: "direct" },
  { label: "Indirect Tax (GST)", id: "indirect" },
  { label: "Business Advisory", id: "business" },
  { label: "Regulatory Services", id: "regulatory" },
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
    id: "audit",
    num: "01",
    label: "Audit & Assurance",
    heading: "Audit & Assurance",
    body: "Statutory audits, internal audits, tax audits, and financial reviews.",
    services: auditServices,
    ctaLabel: "Communication Channels",
    bg: "bg-[#FBFBF9]",
  },
  {
    id: "direct",
    num: "02",
    label: "Direct Taxation",
    heading: "Direct Taxation",
    body: "Return filing, advisory within regulatory framework, and representation.",
    services: directServices,
    ctaLabel: "Communication Channels",
    bg: "bg-white",
  },
  {
    id: "indirect",
    num: "03",
    label: "Indirect Tax (GST)",
    heading: "Indirect Tax (GST)",
    body: "Registration, return filing, and compliance support.",
    services: indirectServices,
    ctaLabel: "Communication Channels",
    bg: "bg-[#FBFBF9]",
  },
  {
    id: "business",
    num: "04",
    label: "Business Advisory",
    heading: "Business Advisory",
    body: "Financial planning, structuring, and compliance advisory.",
    services: advisoryServices,
    ctaLabel: "Communication Channels",
    bg: "bg-white",
  },
  {
    id: "regulatory",
    num: "05",
    label: "Regulatory Services",
    heading: "Regulatory Services",
    body: "Company Incorporation (Private Limited / LLP), ROC Compliance and Filings, Certification Services.",
    services: regulatoryServices,
    ctaLabel: "Communication Channels",
    bg: "bg-[#FBFBF9]",
  },
];


/* ─── Motion Variants ────────────────────────────────────────── */
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

/* ─── Services Page ─────────────────────────────────────────── */
export default function Services() {
  const [active, setActive] = useState("individual");

  function handleNav(id) {
    setActive(id);
    scrollTo(id);
  }

  return (
    <>
      <SEO
        title="Services | VNAV Associates — Audit, Taxation & Advisory"
        description="Comprehensive CA services including Statutory Audit, Income Tax filing, GST compliance, and Business Advisory."
        canonical="/services"
      />
      {/* ── Page Hero ─────────────────────────────────────── */}
      <motion.section 
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-white border-b border-[#E8EDE9]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          {/* Breadcrumb */}
          <motion.nav variants={fadeInUp} aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 text-[0.8125rem] text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-[#C4CAC6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Services</span>
          </motion.nav>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
            <div>
              <motion.span variants={fadeInUp} className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
                What We Do
              </motion.span>
              <motion.h1 variants={fadeInUp} className="font-heading font-semibold text-[2.25rem] sm:text-[2.75rem] lg:text-[3.125rem] tracking-tight leading-[1.1] text-[#1C201E] mb-6 max-w-3xl">
                Tax, GST, and <Highlighter>business</Highlighter><br className="hidden sm:block" /> compliance — handled properly.
              </motion.h1>
              <motion.p variants={fadeInUp} className="font-body text-[1rem] text-[#4E5A54] leading-[1.8] max-w-xl">
                All work is reviewed personally by our professional team{" "}
                <strong className="text-[#1C201E] font-medium">VNAV & Associates</strong>{" "}
                before submission. No <span className="text-emphasize">delegation to junior staff</span>. No automated outputs standing in for professional judgment.
              </motion.p>
            </div>

            {/* Trust callout — top right */}
            <motion.div variants={fadeInUp} className="hidden lg:block shrink-0">
              <div className="bg-[#F2F5F3] border border-[#E8EDE9] rounded-xl px-6 py-5 space-y-3 w-[220px]">
                {[
                  { val: "Audit", lbl: "Statutory & Tax" },
                  { val: "Tax", lbl: "Direct & Indirect" },
                  { val: "Advisory", lbl: "Business Compliance" },
                ].map(({ val, lbl }) => (
                  <div key={lbl} className="flex items-baseline gap-2.5">
                    <span className="font-heading font-semibold text-[1.5rem] text-[#1C201E] tracking-tight leading-none">{val}</span>
                    <span className="font-body text-[0.75rem] text-[#4E5A54]">{lbl}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

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
        <motion.section
          key={section.id}
          id={section.id}
          {...fadeInUp}
          className={`${section.bg} ${idx !== sections.length - 1 ? "border-b border-[#E8EDE9]" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
            {/* Section header */}
            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="mb-10 lg:mb-14">
              <div className="flex items-center gap-4 mb-5">
                <motion.span
                  variants={fadeInUp}
                  className="font-heading font-light text-[3rem] leading-none select-none tabular-nums"
                  style={{ color: "#E2E8E4" }}
                >
                  {section.num}
                </motion.span>
                <motion.span variants={fadeInUp} className="font-body text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E]">
                  {section.label}
                </motion.span>
              </div>
              <div className="grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16 items-end">
                <motion.h2 variants={fadeInUp} className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-[1.2]">
                  {section.heading}
                </motion.h2>
                <motion.p variants={fadeInUp} className="font-body text-[0.9375rem] text-[#4E5A54] leading-[1.8]">
                  {section.body}
                </motion.p>
              </div>
            </motion.div>

            {/* Service cards */}
            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {section.services.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <SectionCTA label={section.ctaLabel} />
            </motion.div>
          </div>
        </motion.section>
      ))}

      {/* ── Final CTA ───────────────────────────────────────── */}
      <motion.section {...fadeInUp} className="bg-[#1A4D2E]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
            <motion.span variants={fadeInUp} className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-white/50 mb-5 font-body">
              Get Started
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-heading font-semibold text-[1.875rem] sm:text-[2.375rem] text-white tracking-tight mb-4 leading-[1.2]">
              Contact VNAV & Associates
            </motion.h2>
            <motion.p variants={fadeInUp} className="font-body text-[0.9375rem] text-white/65 mb-10 leading-[1.8] max-w-lg mx-auto">
              Reach out to our offices to discuss your professional compliance and advisory requirements.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1A4D2E] rounded-lg px-8 py-3.5 font-semibold font-body text-[0.9375rem] hover:bg-[#F2F5F3] transition-colors shadow-sm tracking-wide"
              >
                Contact Us
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <a
                href="tel:+919440428417"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/25 rounded-lg px-8 py-3.5 font-medium font-body text-[0.9375rem] hover:bg-white/8 transition-colors"
              >
                <Phone size={16} strokeWidth={1.5} />
                +91 94404 28417
              </a>
            </motion.div>
            <motion.p variants={fadeInUp} className="font-body text-[0.75rem] text-white/35">
              Strictly confidential communications&nbsp;·&nbsp;Professional engagement
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
