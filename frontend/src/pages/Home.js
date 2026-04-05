import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, Star, Phone, ChevronRight, ChevronDown,
  Briefcase, Globe, Building2, FileText, Shield, Users, Calendar,
  BarChart2, Award, AlertCircle, Calculator, BookOpen, Quote,
  Rocket, UserCheck, Clock, MessageSquare
} from "lucide-react";
import SEO from "../components/SEO";
import Highlighter from "../components/ui/Highlighter";

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "name": "VNAV & Associates · Chartered Accountants",
  "alternateName": "TaxNext.in",
  "description": "Chartered Accountants specialising in income tax filing, GST compliance, TDS, ROC filings, and business advisory. Led personally by CA. V.V.N. Prasad Gupta.",
  "url": "https://taxnext.in",
  "telephone": "+91-94404 28417",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kurnool",
    "addressRegion": "Andhra Pradesh",
    "addressCountry": "IN"
  },
  "founder": {
    "@type": "Person",
    "name": "CA. V.V.N. Prasad Gupta",
    "jobTitle": "Chartered Accountant"
  },
  "areaServed": "India",
  "priceRange": "₹₹"
};

/* ─── Assets ───────────────────────────────────────────────── */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=srgb&fm=jpg&w=1200&q=75";
const FOUNDER_IMAGE = process.env.PUBLIC_URL + "/founder.jpeg";
const ART_1 =
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=srgb&fm=jpg&w=600&q=75";
const ART_2 =
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=srgb&fm=jpg&w=600&q=75";
const ART_3 =
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?crop=entropy&cs=srgb&fm=jpg&w=600&q=75";

const stats = [
  { value: "Audit", label: "Statutory & Tax", sub: "Comprehensive assurance services" },
  { value: "Tax", label: "Direct & Indirect", sub: "Planning and compliance" },
  { value: "FEMA", label: "NRI Services", sub: "DTAA and cross-border advisory" },
  { value: "ROCs", label: "Corporate Law", sub: "Company and LLP compliances" },
];

const pathways = [
  {
    icon: Briefcase,
    label: "Individuals & Employees",
    desc: "Income tax return filing, HRA review, and deduction guidance for salaried individuals.",
    href: "/services",
  },
  {
    icon: Globe,
    label: "NRIs & PIOs",
    desc: "India income declarations, FEMA compliance, NRO/NRE account guidance, and DTAA advisory.",
    href: "/services",
  },
  {
    icon: Building2,
    label: "Business Owners",
    desc: "GST registration, return filing, bookkeeping, and annual statutory compliance for businesses.",
    href: "/services",
  },
  {
    icon: FileText,
    label: "Audit & Assurance",
    desc: "Statutory audits, internal audits, tax audits, and financial reviews conducted professionally.",
    href: "/services",
  },
  {
    icon: Shield,
    label: "Business Advisory",
    desc: "Financial planning, structuring, and compliance advisory for established and growing enterprises.",
    href: "/services",
  },
  {
    icon: AlertCircle,
    label: "Regulatory Services",
    desc: "Company incorporation (Pvt Ltd / LLP), ROC filings, and certification services.",
    href: "/services",
    highlight: true,
  },
];

const differentiators = [
  {
    title: "Understanding client requirements",
    desc: "We thoroughly assess your professional requirements before commencing any engagement.",
  },
  {
    title: "Applying professional judgement",
    desc: "We apply qualified professional judgement to each situation, consistent with applicable standards.",
  },
  {
    title: "Ensuring regulatory compliance",
    desc: "All services are delivered in adherence to applicable laws, ICAI guidelines, and professional standards.",
  },
  {
    title: "Delivering services in a timely manner",
    desc: "Engagements are executed with diligence and completed within agreed timelines.",
  },
];

const steps = [
  {
    num: "01",
    title: "Initial Review",
    desc: "A structured assessment to understand your professional requirements and confirm the scope of engagement.",
  },
  {
    num: "02",
    title: "Document Preparation",
    desc: "A thorough review of documents is conducted to prepare accurate filings. Drafts are shared for your review and confirmation prior to submission.",
  },
  {
    num: "03",
    title: "Statutory Filing",
    desc: "All filings are submitted in accordance with statutory timelines. Professional support is provided for subsequent regulatory correspondence as per the engagement terms.",
  },
];

const founderCredentials = [
  "Member, Institute of Chartered Accountants of India (ICAI)",
  "10+ years in active CA practice",
  "Specialisation: GST, Income Tax & Business Compliance",
  "FinTech integration for technology-enabled advisory",
];

const calculatorTeasers = [
  { icon: BarChart2, title: "Income Tax Calculator", sub: "FY 2026-27 — Old & New Regime", href: "/calculators" },
  { icon: Calculator, title: "HRA Exemption Calculator", sub: "Section 10(13A) — Salaried employees", href: "/calculators" },
  { icon: Calculator, title: "Capital Gains Calculator", sub: "STCG & LTCG on shares and property", href: "/calculators" },
];

const articles = [
  {
    img: ART_1,
    tag: "Budget 2025",
    title: "Union Budget 2025: Key Tax Changes for Salaried Individuals",
    date: "February 2025",
    href: "/insights",
  },
  {
    img: ART_2,
    tag: "GST",
    title: "GST Compliance Checklist for Small Businesses in 2025",
    date: "January 2025",
    href: "/insights",
  },
  {
    img: ART_3,
    tag: "NRI Guide",
    title: "ITR Filing for NRIs: A Complete Step-by-Step Guide",
    date: "December 2024",
    href: "/insights",
  },
];

const testimonials = [
  {
    quote:
      "Reviewing historical tax filings for salaried professionals to ensure all eligible deductions are accurately claimed and documented in accordance with the Income Tax Act.",
    name: "Salaried Employees",
    role: "ITR & Deductions",
  },
  {
    quote:
      "Assisting Non-Resident Indians with cross-border taxation, FEMA compliance, and repatriation procedures while ensuring adherence to applicable Double Taxation Avoidance Agreements (DTAA).",
    name: "NRI & PIO",
    role: "Cross-Border & FEMA",
  },
  {
    quote:
      "Comprehensive compliance partnerships for startups and growing businesses, covering monthly GST, TDS, bookkeeping, and annual ROC filings in a structured manner.",
    name: "Business Entities",
    role: "Corporate Compliance",
  },
];

const faqs = [
  {
    q: "How do I get started?",
    a: "Contact information for our offices is available on the Contact page. We will arrange a professional assessment of your requirements to confirm the scope of work. Engagement is initiated only after formal agreement.",
  },
  {
    q: "Do I need to visit your office?",
    a: "Communication can be handled via phone, digital channels, or in person at our offices in Kurnool or Chennai, as per the requirements of the engagement.",
  },
  {
    q: "Will I work directly with the partners?",
    a: "Yes. Every engagement is personally overseen and reviewed by the firm's partners, ensuring high professional standards and compliance.",
  },
  {
    q: "How quickly can filings be completed?",
    a: "Timelines for professional services are determined based on the complexity of the matter and availability of documentation, and are agreed upon at the commencement of the engagement.",
  },
  {
    q: "What happens if I receive a regulatory notice?",
    a: "The firm provide representation and advisory services for regulatory matters and notices as per the terms of the specific professional engagement.",
  },
  {
    q: "How are professional fees structured?",
    a: "Fees are based on the nature and scope of the professional work and are communicated after an initial assessment. All fees are in accordance with the guidelines of the ICAI.",
  },
];

/* ─── FAQ Accordion Item ────────────────────────────────────── */
function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-[#E8EDE9] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-inset rounded-sm"
        aria-expanded={open}
      >
        <span className="font-heading font-medium text-[#1C201E] text-base leading-snug pr-2">
          {q}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className={`text-[#4E5A54] shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-5 pr-8">
          <p className="font-body text-sm text-[#4E5A54] leading-[1.75]">{a}</p>
        </div>
      </div>
    </div>
  );
}

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

/* ─── Home Page ─────────────────────────────────────────────── */
export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SEO 
        title="Best CA in Kurnool & Chennai | VNAV Associates | Chartered Accountants"
        description="Professional CA services in Kurnool & Chennai for Audit, Taxation, GST, and Business Advisory. Expert tax planning for FY 2026-27."
        schema={LOCAL_BUSINESS_SCHEMA}
      />

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section data-testid="hero-section" className="bg-[#FBFBF9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Copy */}
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A4D2E]/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#1A4D2E]">
                  Primary: Kurnool
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F2F5F3] rounded-full text-[10px] font-bold uppercase tracking-wider text-[#4E5A54]">
                  Chennai Office
                </span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="font-heading font-semibold text-4xl sm:text-5xl lg:text-[3.5rem] tracking-tight leading-[1.1] text-[#1C201E] mb-6"
              >
                Professional <Highlighter>Standards.</Highlighter><br />
                <span className="text-[#1A4D2E]">Systematic Approach.<br/>Regulatory Adherence.</span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="font-body text-[1.0625rem] text-[#4E5A54] leading-[1.8] mb-8 max-w-lg"
              >
                VNAV & Associates is a firm of <span className="text-emphasize">Chartered Accountants</span> providing professional services in audit, taxation, and advisory, with a focus on compliance, accuracy, and professional standards.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 mb-9">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-7 py-3.5 font-semibold font-body hover:bg-[#133b23] transition-colors shadow-sm text-[0.9375rem] focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-2 tracking-wide"
                >
                  Contact Information
                  <ArrowRight size={15} strokeWidth={1.5} />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 bg-transparent text-[#1C201E] border border-[#D4DAD6] rounded-lg px-7 py-3.5 font-medium font-body hover:border-[#1A4D2E] hover:text-[#1A4D2E] transition-colors text-[0.9375rem]"
                >
                  Areas of Practice
                </Link>
              </motion.div>

              {/* Trust microcopy */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-1">
                {["Audit & Assurance", "Direct Taxation", "Indirect Tax (GST)"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-[0.8125rem] text-[#4E5A54] font-body">
                    <CheckCircle size={13} strokeWidth={1.5} className="text-[#1A4D2E] shrink-0" />
                    {t}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-[#E8EDE9] shadow-2xl" style={{ boxShadow: "0 8px 32px -8px rgba(0,0,0,0.1)" }}>
                <img
                  src={HERO_IMAGE}
                  alt="VNAV Associates — Professional tax advisory"
                  className="w-full h-[460px] object-cover"
                  loading="eager"
                />
                {/* Floating badge */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-xl border border-[#E8EDE9] px-6 py-5 shadow-lg">
                  <p className="font-heading font-semibold text-[#1C201E] text-lg leading-tight">CA. V.V.N. Prasad Gupta</p>
                  <p className="font-body text-[0.8125rem] text-[#4E5A54] mt-1 italic opacity-80">Founder, VNAV & Associates</p>
                  <div className="mt-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500 flex items-center justify-between">
                    <span className="font-serif italic text-2xl text-[#1A4D2E] select-none pointer-events-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                      CA. V.V.N. Prasad Gupta
                    </span>
                    <div className="flex gap-1.5">
                       {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#1A4D2E" className="text-[#1A4D2E]" />)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST STRIP ───────────────────────────────────── */}
      <section data-testid="trust-bar" className="bg-[#1A4D2E]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-16">
          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x lg:divide-white/10"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className="lg:px-8 first:lg:pl-0 last:lg:pr-0"
              >
                <p className="font-heading font-semibold text-[2.75rem] lg:text-[3rem] text-white tracking-tight leading-none">
                  {s.value}
                </p>
                <p className="font-heading font-medium text-white/70 text-[0.8125rem] mt-2 uppercase tracking-wider">{s.label}</p>
                <p className="font-body text-[0.75rem] text-white/45 mt-0.5 leading-snug">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. SERVICE PATHWAYS ──────────────────────────────── */}
      <section data-testid="pathways-section" className="bg-[#FBFBF9] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12 lg:mb-20">
            <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
              Areas of Experience
            </span>
            <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-snug mb-4">
              Services for individuals, NRIs, and businesses of all sizes.
            </h2>
            <p className="font-body text-base text-[#4E5A54] leading-relaxed">
              Each engagement begins with a structured review of professional requirements to confirm the scope of work.
            </p>
          </div>

          <motion.div 
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {pathways.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div variants={fadeInUp} key={p.label}>
                  <Link
                    to={p.href}
                    className={`block h-full group rounded-2xl border p-8 transition-all duration-300 premium-shadow-hover ${
                      p.highlight
                        ? "bg-[#1A4D2E]/[0.03] border-[#1A4D2E]/20 hover:border-[#1A4D2E]/40"
                        : "bg-white border-[#E8EDE9] hover:border-[#1A4D2E]/20"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                      p.highlight ? "bg-[#1A4D2E]/10 group-hover:bg-[#1A4D2E]" : "bg-[#F2F5F3] group-hover:bg-[#1A4D2E]"
                    }`}>
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className={`transition-colors ${p.highlight ? "text-[#1A4D2E] group-hover:text-white" : "text-[#1A4D2E] group-hover:text-white"}`}
                      />
                    </div>
                    <h3 className={`font-heading font-medium text-lg mb-2 transition-colors ${
                      p.highlight ? "text-[#1A4D2E]" : "text-[#1C201E]"
                    }`}>
                      {p.label}
                    </h3>
                    <p className="font-body text-[0.875rem] text-[#4E5A54] leading-relaxed mb-6">{p.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A4D2E] font-body group-hover:gap-2.5 transition-all">
                      Learn more <ArrowRight size={14} strokeWidth={1.5} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 3.5 CALCULATOR SUITE (PROMINENT) ─────────────────── */}
      <section className="bg-white py-24 lg:py-32 border-t border-[#E8EDE9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
                Professional Utility
              </span>
              <h2 className="font-heading font-medium text-[2.25rem] sm:text-[3rem] text-[#1C201E] tracking-tight leading-none mb-6">
                Professional <span className="text-[#1A4D2E]">Tax Suite.</span>
              </h2>
              <p className="font-body text-sm text-[#4E5A54] leading-relaxed">
                Advanced computation tools built for the **Income Tax Act, 2025**. Accurate estimations for FY 2026-2027 including Surcharge and Marginal Relief.
              </p>
            </div>
            <Link
              to="/calculators"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A4D2E] font-body hover:gap-3 transition-all"
            >
              Explore all calculators <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { 
                title: "Income Tax Tool", 
                sub: "FY 2026-27 Multi-Regime", 
                icon: BarChart2, 
                desc: "Calculate taxes for Salary and Business with detailed surcharge logic.",
                href: "/calculators/income-tax",
                priority: true
              },
              { 
                title: "NPS Tax Engine", 
                sub: "Section 80CCD(1B)", 
                icon: Calculator, 
                desc: "Estimate additional tax savings on contributions up to ₹50,000.",
                href: "/calculators/nps-savings"
              },
              { 
                title: "Loan-Tax Synergy", 
                sub: "Section 24(b) Analysis", 
                icon: Building2, 
                desc: "Visualizing the effective interest rate on home loans after tax.",
                href: "/calculators/loan-utility"
              }
            ].map((calc, i) => {
              const Icon = calc.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`group relative p-8 rounded-3xl border transition-all duration-300 ${
                    calc.priority 
                      ? "bg-gradient-to-br from-[#1A4D2E] to-[#133b23] border-transparent text-white shadow-2xl" 
                      : "bg-[#FBFBF9] border-[#E8EDE9] hover:border-[#1A4D2E]/20"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${
                    calc.priority ? "bg-white/10" : "bg-white"
                  }`}>
                    <Icon size={20} strokeWidth={1.5} className={calc.priority ? "text-white" : "text-[#1A4D2E]"} />
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-1">{calc.title}</h3>
                  <p className={`font-body text-[10px] uppercase tracking-widest mb-4 ${calc.priority ? "text-white/60" : "text-[#4E5A54]"}`}>
                    {calc.sub}
                  </p>
                  <p className={`font-body text-sm leading-relaxed mb-8 ${calc.priority ? "text-white/80" : "text-[#4E5A54]"}`}>
                    {calc.desc}
                  </p>
                  <Link
                    to={calc.href}
                    className={`inline-flex items-center gap-2 text-sm font-semibold font-body transition-all ${
                      calc.priority ? "text-white hover:gap-3" : "text-[#1A4D2E] hover:gap-3"
                    }`}
                  >
                    Launch <ArrowRight size={14} strokeWidth={1.5} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ──────────────────────────────────── */}
      <section data-testid="how-it-works-section" className="bg-white py-24 lg:py-32 border-y border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="mb-14 lg:mb-20">
            <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
              Engagement Process
            </span>
            <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight mb-4">
              A structured approach to<br />professional compliance.
            </h2>
            <p className="font-body text-[0.9375rem] text-[#4E5A54] max-w-lg leading-[1.8]">
              Professional judgement is applied at every stage of the engagement to ensure accuracy and regulatory adherence.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-12 lg:gap-20"
          >
            {steps.map((step) => (
              <motion.div variants={fadeInUp} key={step.num}>
                <span className="font-heading font-light text-[5rem] leading-none select-none block mb-6 opacity-30 text-[#1A4D2E]">
                  {step.num}
                </span>
                <h3 className="font-heading font-medium text-[1.125rem] text-[#1C201E] mb-3">{step.title}</h3>
                <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-[1.8]">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="mt-16">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-8 py-4 font-semibold font-body text-[0.9375rem] hover:bg-[#133b23] transition-colors shadow-sm tracking-wide"
            >
              Contact Information
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 6. FAQ SECTION ───────────────────────────────────── */}
      <section className="bg-white py-24 lg:py-32 border-t border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
            <div>
              <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
                Questions
              </span>
              <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-tight mb-6">
                Common queries about<br />our practice.
              </h2>
              <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-[1.8] mb-8">
                If you have a different question, please <Link to="/contact" className="text-[#1A4D2E] font-medium underline underline-offset-4 decoration-[#1A4D2E]/30 hover:decoration-[#1A4D2E] transition-all">contact us directly</Link>.
              </p>
              <div className="p-6 bg-[#F2F5F3] rounded-2xl border border-[#E8EDE9]">
                <div className="flex items-center gap-3 mb-3">
                   <Clock size={16} className="text-[#1A4D2E]" />
                   <p className="font-heading font-medium text-[#1C201E] text-sm">Responsive Support</p>
                </div>
                <p className="font-body text-[0.8125rem] text-[#4E5A54] leading-relaxed">
                  We respond to all verified WhatsApp and email enquiries within 24 working hours.
                </p>
              </div>
            </div>

            <div className="bg-[#FBFBF9] rounded-2xl border border-[#E8EDE9] px-6 sm:px-10 py-2">
              {faqs.map((f, i) => (
                <FAQItem
                  key={i}
                  q={f.q}
                  a={f.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA ─────────────────────────────────────── */}
      <section className="bg-[#1A4D2E] py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="max-w-3xl mx-auto px-5 text-center relative z-10">
          <h2 className="font-heading font-medium text-[2.25rem] sm:text-[2.75rem] text-white tracking-tight leading-tight mb-8">
            Professional engagement for regulatory compliance.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#1A4D2E] rounded-lg px-8 py-4 font-semibold font-body text-[1rem] hover:bg-white/90 transition-colors shadow-xl"
            >
              Contact Information
              <MessageSquare size={18} />
            </Link>
            <a
              href="https://wa.me/919440428417"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/40 rounded-lg px-8 py-4 font-semibold font-body text-[1rem] hover:bg-white/10 transition-colors shadow-xl"
            >
              WhatsApp Contact
              <ArrowRight size={18} />
            </a>
          </div>
          <p className="mt-8 text-white/50 font-body text-sm">
            Professional communication · Strictly confidential · As per ethical standards
          </p>
        </div>
      </section>
    </>
  );
}
