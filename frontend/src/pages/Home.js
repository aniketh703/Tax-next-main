import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle, Star, Phone, ChevronRight, ChevronDown,
  Briefcase, Globe, Building2, FileText, Shield, Users, Calendar,
  BarChart2, Award, AlertCircle, Calculator, BookOpen, Quote,
  Rocket, UserCheck, Clock, MessageSquare
} from "lucide-react";
import SEO from "../components/SEO";

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "name": "VNAV Associates",
  "alternateName": "TaxNext.in",
  "description": "Chartered Accountants specialising in income tax filing, GST compliance, TDS, ROC filings, and business advisory. Led personally by CA. V.V.N. Prasad Gupta.",
  "url": "https://taxnext.in",
  "telephone": "+91-00000-00000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
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
  "https://static.prod-images.emergentagent.com/jobs/aebe5bae-79f1-412a-a57c-d6d295c09f4e/images/4e97e677ac6def5bdb6d5f66276e1d2747ee2a823434c90d434f20f03a3eef17.png";
const FOUNDER_IMAGE =
  "https://static.prod-images.emergentagent.com/jobs/aebe5bae-79f1-412a-a57c-d6d295c09f4e/images/aaef25480ca9796d22d26e78854d76269059d727b7df3c2906a383a97297df42.png";
const ART_1 =
  "https://images.unsplash.com/photo-1758691736764-2a88e313b1f2?crop=entropy&cs=srgb&fm=jpg&w=600&q=75";
const ART_2 =
  "https://images.unsplash.com/photo-1548950308-69fac3b90a45?crop=entropy&cs=srgb&fm=jpg&w=600&q=75";
const ART_3 =
  "https://static.prod-images.emergentagent.com/jobs/aebe5bae-79f1-412a-a57c-d6d295c09f4e/images/f85ba65ea96c90d5ea843db949e4dbd2a9d3061c733ef41871a9ae66e9dc87e5.png";

/* ─── Data ──────────────────────────────────────────────────── */
const stats = [
  { value: "500+", label: "Client Engagements", sub: "Salaried, NRI, business, and startup" },
  { value: "10+", label: "Years in Practice", sub: "Active CA practice since 2014" },
  { value: "ICAI", label: "Member", sub: "Institute of Chartered Accountants of India" },
  { value: "0", label: "Late Filings", sub: "Every return submitted before the due date" },
];

const pathways = [
  {
    icon: Briefcase,
    label: "Salaried Employees",
    desc: "ITR filing, Form 16 review, HRA claims, and investment declarations — filed accurately, every year.",
    href: "/services#itr",
  },
  {
    icon: Globe,
    label: "NRIs & PIOs",
    desc: "India income declarations, FEMA compliance, NRO/NRE account guidance, and DTAA benefits.",
    href: "/services#nri",
  },
  {
    icon: Building2,
    label: "Business Owners",
    desc: "GST returns, bookkeeping, P&L, and annual compliance for established businesses.",
    href: "/services#gst",
  },
  {
    icon: Rocket,
    label: "Startup Founders",
    desc: "Incorporation, Startup India registration, ESOP advisory, and ongoing compliance packages.",
    href: "/services#startup",
  },
  {
    icon: FileText,
    label: "Freelancers & Consultants",
    desc: "Business income ITR, advance tax planning, and applicable deduction claims.",
    href: "/services#itr",
  },
  {
    icon: AlertCircle,
    label: "Tax Notice Response",
    desc: "Income tax or GST notice received. We assess, respond formally, and represent you before the department if required.",
    href: "/contact",
    highlight: true,
  },
];

const differentiators = [
  {
    title: "CA-led, without exception",
    desc: "Every filing is reviewed and signed off by CA. Prasad. Not a software output. Not a junior review.",
  },
  {
    title: "Continuity across years",
    desc: "We retain context from prior engagements. No re-explaining your situation at the start of each filing season.",
  },
  {
    title: "Deadlines tracked, not missed",
    desc: "We monitor due dates and inform you in advance. You should not need to track filing seasons yourself.",
  },
  {
    title: "Straightforward fee structure",
    desc: "Fees are quoted in writing before any work begins. There are no mid-engagement revisions or unexpected charges.",
  },
];

const steps = [
  {
    num: "01",
    title: "Initial consultation",
    desc: "A brief introductory call to understand your requirements. We confirm what we can do and what it will cost — before any engagement begins. No paperwork at this stage.",
  },
  {
    num: "02",
    title: "Prepared and reviewed together",
    desc: "CA. Prasad reviews your documents, identifies applicable deductions and tax efficiencies, and prepares accurate filings. Nothing is submitted without your review and written agreement.",
  },
  {
    num: "03",
    title: "Filed correctly. On time.",
    desc: "All filings are submitted before the statutory due date and confirmed in writing. Any subsequent correspondence from the department is handled by the same CA who filed.",
  },
];

const founderCredentials = [
  "Member, Institute of Chartered Accountants of India (ICAI)",
  "10+ years in active CA practice",
  "Specialisation: GST, Income Tax & Business Compliance",
  "FinTech integration for technology-enabled advisory",
];

const calculatorTeasers = [
  { icon: BarChart2, title: "Income Tax Calculator", sub: "FY 2024-25 — Old & New Regime", href: "/calculators" },
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
      "I was filing my own ITR for years and realised I had missed several deductions. CA. Prasad reviewed three years of returns and helped me claim what was rightfully mine. Professional, thorough, and easy to communicate with.",
    name: "Ankit S.",
    role: "Software Engineer, Bengaluru",
    stars: 5,
  },
  {
    quote:
      "As an NRI with property income in India, the compliance obligations are genuinely complex. VNAV Associates handles everything — I no longer worry about FEMA deadlines or TDS implications.",
    name: "Deepa R.",
    role: "NRI Client, UAE",
    stars: 5,
  },
  {
    quote:
      "We incorporated our startup and VNAV Associates has been our compliance partner since day one. Every deadline is met without us needing to follow up. That kind of reliability is hard to find.",
    name: "Rohan M.",
    role: "Co-Founder, Tech Startup",
    stars: 5,
  },
];

const faqs = [
  {
    q: "How do I get started?",
    a: "Contact us by phone, WhatsApp, or the enquiry form. We will arrange a brief call to understand your situation and confirm whether we are the right fit. There is no obligation at the consultation stage.",
  },
  {
    q: "Do I need to visit your office?",
    a: "No. All services are completed remotely via phone, WhatsApp, and email. Document exchange is handled digitally and securely. A number of our clients, including those based abroad, have never visited the office.",
  },
  {
    q: "Will I work directly with CA. Prasad?",
    a: "Yes. CA. Prasad personally reviews and oversees every client engagement. Work is not delegated to junior staff or processed through automated systems.",
  },
  {
    q: "How quickly can my return be filed?",
    a: "For straightforward matters with complete documentation, filings are typically completed within 2–3 working days. For more involved cases, we confirm the timeline before beginning.",
  },
  {
    q: "What happens if I receive a notice after filing?",
    a: "If the notice relates to work handled by VNAV Associates, we assess and respond on your behalf as part of the engagement — at no additional charge.",
  },
  {
    q: "How are fees structured?",
    a: "Fees are based on the scope of the work and quoted in writing after the initial consultation. Charges are fixed and agreed in advance. There are no hidden fees or mid-engagement revisions.",
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

/* ─── Home Page ─────────────────────────────────────────────── */
export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section data-testid="hero-section" className="bg-[#FBFBF9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Copy */}
            <div>
              <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-6 font-body">
                VNAV Associates · Chartered Accountants · Hyderabad
              </span>

              <h1 className="font-heading font-semibold text-4xl sm:text-5xl lg:text-[3.5rem] tracking-tight leading-[1.1] text-[#1C201E] mb-6">
                Your taxes.<br />
                <span className="text-[#1A4D2E]">Handled properly.</span>
              </h1>

              <p className="font-body text-[1.0625rem] text-[#4E5A54] leading-[1.8] mb-8 max-w-lg">
                CA. <strong className="text-[#1C201E] font-medium">V.V.N.Prasad. Gupta</strong> of
                VNAV Associates personally oversees all ITR, GST, and business compliance filings.
                Ten years in active CA practice. Every return reviewed and approved before submission.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-9">
                <Link
                  to="/contact"
                  data-testid="hero-cta-primary"
                  className="inline-flex items-center justify-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-7 py-3.5 font-semibold font-body hover:bg-[#133b23] transition-colors shadow-sm text-[0.9375rem] focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-offset-2 tracking-wide"
                >
                  Book a Consultation
                  <ArrowRight size={15} strokeWidth={1.5} />
                </Link>
                <Link
                  to="/services"
                  data-testid="hero-cta-secondary"
                  className="inline-flex items-center justify-center gap-2 bg-transparent text-[#1C201E] border border-[#D4DAD6] rounded-lg px-7 py-3.5 font-medium font-body hover:border-[#1A4D2E] hover:text-[#1A4D2E] transition-colors text-[0.9375rem]"
                >
                  See Our Services
                </Link>
              </div>

              {/* Trust microcopy */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-1">
                {["ICAI Registered", "Every return reviewed by CA. Prasad", "500+ client engagements"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-[0.8125rem] text-[#4E5A54] font-body">
                    <CheckCircle size={13} strokeWidth={1.5} className="text-[#1A4D2E] shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E8EDE9]" style={{ boxShadow: "0 8px 32px -8px rgba(0,0,0,0.1)" }}>
                <img
                  src={HERO_IMAGE}
                  alt="VNAV Associates — Professional tax advisory"
                  className="w-full h-[460px] object-cover"
                  loading="eager"
                />
                {/* Floating badge */}
                <div className="absolute bottom-5 left-5 bg-white/97 backdrop-blur-sm rounded-xl border border-[#E8EDE9] px-5 py-4" style={{ boxShadow: "0 4px 16px -4px rgba(0,0,0,0.1)" }}>
                  <p className="font-heading font-semibold text-[1.75rem] text-[#1A4D2E] leading-none tracking-tight">500+</p>
                  <p className="font-body text-[0.8125rem] text-[#4E5A54] mt-1">Client engagements since 2014</p>
                </div>
              </div>
              {/* Dot grid accent */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 opacity-[0.12] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle, #1A4D2E 1.5px, transparent 1.5px)", backgroundSize: "10px 10px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST STRIP ───────────────────────────────────── */}
      <section data-testid="trust-bar" className="bg-[#1A4D2E]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:divide-x lg:divide-white/10">
            {stats.map((s) => (
              <div key={s.label} data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`} className="lg:px-8 first:lg:pl-0 last:lg:pr-0">
                <p className="font-heading font-semibold text-[2.75rem] lg:text-[3rem] text-white tracking-tight leading-none">
                  {s.value}
                </p>
                <p className="font-heading font-medium text-white/70 text-[0.8125rem] mt-2">{s.label}</p>
                <p className="font-body text-[0.75rem] text-white/45 mt-0.5 leading-snug">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SERVICE PATHWAYS ──────────────────────────────── */}
      <section data-testid="pathways-section" className="bg-[#FBFBF9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl mb-12 lg:mb-16">
            <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
              Who We Work With
            </span>
            <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-snug mb-3">
              Services for individuals, NRIs, and businesses of all sizes.
            </h2>
            <p className="font-body text-base text-[#4E5A54] leading-relaxed">
              Each engagement begins the same way — a direct conversation with CA. Prasad to
              understand your requirements and confirm the scope of work.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pathways.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.label}
                  to={p.href}
                  data-testid={`pathway-${p.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className={`group rounded-xl border p-6 transition-all duration-200 hover:shadow-md ${
                    p.highlight
                      ? "bg-[#1A4D2E]/[0.04] border-[#1A4D2E]/25 hover:border-[#1A4D2E]/50"
                      : "bg-white border-[#E8EDE9] hover:border-[#1A4D2E]/30"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                    p.highlight ? "bg-[#1A4D2E]/10 group-hover:bg-[#1A4D2E]" : "bg-[#F2F5F3] group-hover:bg-[#1A4D2E]"
                  }`}>
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className={`transition-colors ${p.highlight ? "text-[#1A4D2E] group-hover:text-white" : "text-[#1A4D2E] group-hover:text-white"}`}
                    />
                  </div>
                  <h3 className={`font-heading font-medium text-base mb-1.5 group-hover:text-[#1A4D2E] transition-colors ${
                    p.highlight ? "text-[#1A4D2E]" : "text-[#1C201E]"
                  }`}>
                    {p.label}
                  </h3>
                  <p className="font-body text-sm text-[#4E5A54] leading-relaxed mb-4">{p.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#1A4D2E] font-body group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={13} strokeWidth={1.5} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. WHY TAXNEXT ───────────────────────────────────── */}
      <section data-testid="why-taxnext-section" className="bg-[#F2F5F3] border-y border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            {/* Left: Positioning copy */}
            <div>
              <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-5 font-body">
                What Makes Us Different
              </span>
              <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-[1.2] mb-7">
                A qualified Chartered Accountant.<br />
                Not a portal.
              </h2>
              <div className="space-y-5 text-[#4E5A54] font-body text-[0.9375rem] leading-[1.8]">
                <p>
                  Most online tax services today automate what should be handled with care. They ask
                  standardised questions, produce standardised outputs, and leave the client to
                  determine whether the result applies to their actual situation.
                </p>
                <p>
                  VNAV Associates operates differently. CA. Prasad reviews each client's specific
                  circumstances before advising. Every return is approved by a qualified Chartered
                  Accountant before it is submitted — and the same CA remains available after the
                  filing is done.
                </p>
                <p className="text-[#1C201E] font-medium">
                  Professional judgment is not something we delegate to software.
                </p>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-[#1A4D2E] font-body mt-8 hover:gap-2.5 transition-all"
              >
                About VNAV Associates
                <ChevronRight size={14} strokeWidth={2} />
              </Link>
            </div>

            {/* Right: 4 differentiators */}
            <div className="divide-y divide-[#E8EDE9]">
              {differentiators.map((d, i) => (
                <div key={i} data-testid={`differentiator-${i}`} className="flex items-start gap-5 py-6 first:pt-0 last:pb-0">
                  <div className="w-8 h-8 rounded-lg bg-[#E4EDE6] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={14} strokeWidth={1.5} className="text-[#1A4D2E]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-[0.9375rem] text-[#1C201E] mb-1.5">{d.title}</h3>
                    <p className="font-body text-[0.8375rem] text-[#4E5A54] leading-[1.75]">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ──────────────────────────────────── */}
      <section data-testid="how-it-works-section" className="bg-[#FBFBF9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="mb-14 lg:mb-16">
            <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
              The Process
            </span>
            <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight mb-3">
              A clear process, from first call to final filing.
            </h2>
            <p className="font-body text-[0.9375rem] text-[#4E5A54] max-w-lg leading-[1.8]">
              Every step is handled by the same CA who advises you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {steps.map((step) => (
              <div key={step.num} data-testid={`step-${step.num}`}>
                <span className="font-heading font-light text-[5rem] leading-none select-none block mb-4" style={{ color: "#DDE3DE" }}>
                  {step.num}
                </span>
                <h3 className="font-heading font-medium text-[1rem] text-[#1C201E] mb-2.5">{step.title}</h3>
                <p className="font-body text-[0.875rem] text-[#4E5A54] leading-[1.8]">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/contact"
              data-testid="how-it-works-cta"
              className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-7 py-3.5 font-semibold font-body text-[0.875rem] hover:bg-[#133b23] transition-colors shadow-sm tracking-wide"
            >
              Book a Free Consultation
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. FOUNDER ───────────────────────────────────────── */}
      <section data-testid="founder-section" className="bg-[#F2F5F3] border-y border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Image */}
            <div className="order-2 lg:order-1 relative">
              <div className="rounded-2xl overflow-hidden shadow-md border border-[#E8EDE9]">
                <img
                  src={FOUNDER_IMAGE}
                  alt="CA. V.V.N.Prasad. Gupta — Founder, VNAV Associates"
                  className="w-full h-[440px] object-cover object-top"
                  loading="lazy"
                />
              </div>
              {/* Credential badge */}
              <div className="absolute -bottom-5 right-4 sm:right-8 bg-white rounded-xl border border-[#E8EDE9] shadow-md px-5 py-3.5">
                <p className="font-heading font-semibold text-[#1C201E] text-[0.875rem] leading-snug">
                  CA. V.V.N.Prasad. Gupta
                </p>
                <p className="font-body text-[0.75rem] text-[#4E5A54]">ICAI Member · Chartered Accountant</p>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2 pt-0">
              <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-4 font-body">
                The CA Behind TaxNext.in
              </span>
              <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-snug mb-5">
                CA. V.V.N.Prasad. Gupta
              </h2>

              <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-[1.75] mb-5">
                CA. Prasad founded VNAV Associates because straightforward, expert tax guidance was
                harder to find than it should be. Most people file incorrectly — not through
                carelessness, but because accessible CA-level advice simply wasn't available to them.
                VNAV Associates exists to change that.
              </p>
              <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-[1.75] mb-7">
                Every client engagement is reviewed personally. No delegation to juniors. No
                generic-output software standing in for professional judgment.
              </p>

              {/* Pull quote */}
              <blockquote className="border-l-2 border-[#1A4D2E] pl-5 mb-8">
                <p className="font-heading font-medium text-[#1C201E] text-[1rem] leading-[1.6] italic">
                  "Tax law in India changes every year. My job is to make sure those changes
                  work in your favour — not catch you out."
                </p>
                <footer className="font-body text-[0.8125rem] text-[#4E5A54] mt-2.5">
                  — CA. V.V.N.Prasad. Gupta
                </footer>
              </blockquote>

              <ul className="space-y-3 mb-9">
                {founderCredentials.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <CheckCircle size={13} strokeWidth={1.5} className="text-[#1A4D2E] mt-0.5 shrink-0" />
                    <span className="font-body text-[0.8375rem] text-[#4E5A54]">{c}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/about"
                data-testid="founder-about-link"
                className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-[#1A4D2E] font-body hover:gap-2.5 transition-all"
              >
                More about our practice
                <ChevronRight size={14} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CALCULATOR TEASER ─────────────────────────────── */}
      <section data-testid="calculator-teaser-section" className="bg-[#FBFBF9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
                Free Tools
              </span>
              <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight mb-2">
                Estimate before we meet.
              </h2>
              <p className="font-body text-sm text-[#4E5A54] max-w-md leading-relaxed">
                Use our calculators before your consultation to arrive with a clear sense of your
                tax position. No registration required.
              </p>
            </div>
            <Link
              to="/calculators"
              data-testid="all-calculators-btn"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1A4D2E] font-body whitespace-nowrap shrink-0 hover:gap-2.5 transition-all"
            >
              All calculators
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {calculatorTeasers.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.title}
                  to={c.href}
                  data-testid={`calc-teaser-${c.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group bg-white rounded-xl border border-[#E8EDE9] p-6 hover:border-[#1A4D2E]/30 hover:shadow-sm transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F2F5F3] flex items-center justify-center shrink-0 group-hover:bg-[#1A4D2E] transition-colors">
                    <Icon size={18} strokeWidth={1.5} className="text-[#1A4D2E] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-[#1C201E] text-sm mb-0.5 group-hover:text-[#1A4D2E] transition-colors">
                      {c.title}
                    </p>
                    <p className="font-body text-[0.75rem] text-[#4E5A54]">{c.sub}</p>
                    <span className="inline-flex items-center gap-1 text-[0.75rem] font-medium text-[#4E5A54] font-body mt-2 group-hover:text-[#1A4D2E] transition-colors">
                      Coming soon
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 8. INSIGHTS TEASER ───────────────────────────────── */}
      <section data-testid="insights-section" className="bg-[#F2F5F3] border-y border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
                Tax Insights
              </span>
              <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight mb-2">
                Useful reading from our practice.
              </h2>
              <p className="font-body text-sm text-[#4E5A54] leading-relaxed">
                Plain-language guides on tax, GST, and compliance — updated regularly.
              </p>
            </div>
            <Link
              to="/insights"
              data-testid="all-insights-btn"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1A4D2E] font-body whitespace-nowrap shrink-0 hover:gap-2.5 transition-all"
            >
              All articles
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((art, i) => (
              <Link
                key={i}
                to={art.href}
                data-testid={`article-card-${i}`}
                className="group bg-white rounded-xl border border-[#E8EDE9] overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1A4D2E] text-[0.6875rem] font-semibold font-body px-2 py-0.5 rounded-full">
                    {art.tag}
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-body text-[0.75rem] text-[#4E5A54] mb-1.5">{art.date}</p>
                  <h3 className="font-heading font-medium text-[0.9375rem] text-[#1C201E] leading-snug group-hover:text-[#1A4D2E] transition-colors">
                    {art.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[0.8125rem] font-medium text-[#1A4D2E] font-body mt-3.5 group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={12} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. TESTIMONIALS ──────────────────────────────────── */}
      <section data-testid="testimonials-section" className="bg-[#FBFBF9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="mb-12 lg:mb-16">
            <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
              Client Stories
            </span>
            <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight">
              What our clients say.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {testimonials.map((t, i) => (
              <div key={i} data-testid={`testimonial-card-${i}`} className="bg-white border border-[#E8EDE9] rounded-xl p-7">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} size={12} fill="#1A4D2E" strokeWidth={0} className="text-[#1A4D2E]" />
                  ))}
                </div>
                <p className="font-body text-[0.9rem] text-[#2C3830] leading-[1.85] mb-7 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-5 border-t border-[#F0F4F1] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E4EDE6] flex items-center justify-center shrink-0">
                    <span className="font-heading font-semibold text-[0.75rem] text-[#1A4D2E]">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-heading font-medium text-[0.875rem] text-[#1C201E]">{t.name}</p>
                    <p className="font-body text-[0.75rem] text-[#4E5A54] mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ──────────────────────────────────────────── */}
      <section data-testid="faq-section" className="bg-[#F2F5F3] border-y border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* Left: heading */}
            <div className="lg:col-span-2">
              <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
                Questions
              </span>
              <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-snug mb-5">
                Common questions.
              </h2>
              <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-[1.8] mb-7">
                For any other question, please contact us directly.
              </p>
              <Link
                to="/contact"
                data-testid="faq-contact-btn"
                className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-6 py-3 font-semibold font-body text-[0.875rem] hover:bg-[#133b23] transition-colors tracking-wide shadow-sm"
              >
                Send an enquiry
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>

            {/* Right: accordion */}
            <div className="lg:col-span-3 bg-white rounded-xl border border-[#E8EDE9] px-6 divide-y-0 shadow-sm">
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. FINAL CTA ────────────────────────────────────── */}
      <section data-testid="cta-section" className="bg-[#1A4D2E]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-white/45 mb-5 font-body">
              Get Started
            </span>
            <h2 className="font-heading font-semibold text-[1.875rem] sm:text-[2.5rem] text-white tracking-tight leading-[1.2] mb-4">
              Let's get your compliance in order.
            </h2>
            <p className="font-body text-[0.9375rem] text-white/65 mb-10 leading-[1.8]">
              One conversation is all it takes. Tell us your situation, and we'll confirm exactly how we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link
                to="/contact"
                data-testid="final-cta-btn"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1A4D2E] rounded-lg px-8 py-3.5 font-semibold font-body text-[0.9375rem] hover:bg-[#F2F5F3] transition-colors shadow-sm tracking-wide"
              >
                Book a Free Consultation
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <a
                href="tel:+910000000000"
                data-testid="final-call-btn"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/25 rounded-lg px-8 py-3.5 font-medium font-body text-[0.9375rem] hover:bg-white/8 transition-colors"
              >
                <Phone size={16} strokeWidth={1.5} />
                +91 00000 00000
              </a>
            </div>
            <p className="font-body text-[0.75rem] text-white/35">
              No commitment required &nbsp;·&nbsp; We respond within 24 hours
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
