import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight, CheckCircle, ArrowRight, Phone,
  Shield, RefreshCw, Bell, MessageSquare, Linkedin
} from "lucide-react";
import Highlighter from "../components/ui/Highlighter";
import SEO from "../components/SEO";

const FOUNDER_IMAGE = process.env.PUBLIC_URL + "/founder.jpeg";

const aboutStats = [
  { value: "Audit", label: "Assurance", sub: "Statutory & Tax Audit" },
  { value: "Tax",  label: "Direct & Indirect",  sub: "Planning, Advisory, Compliance" },
  { value: "ICAI", label: "Registered Firm",  sub: "Institute of Chartered Accountants" },
  { value: "FEMA", label: "Cross-Border",        sub: "NRI Taxation & Advisory" },
];

const whyCards = [
  {
    icon: Shield,
    title: "Integrity and objectivity",
    desc: "Maintaining the highest standards of honesty and fairness in all professional relationships.",
  },
  {
    icon: RefreshCw,
    title: "Professional competence and due care",
    desc: "Ensuring all services are delivered with the required skill, knowledge, and diligence.",
  },
  {
    icon: Bell,
    title: "Confidentiality of client information",
    desc: "Protecting sensitive information to maintain absolute privacy and trust.",
  },
  {
    icon: MessageSquare,
    title: "Compliance with applicable laws and standards",
    desc: "Strict adherence to all applicable regulatory frameworks and professional guidelines.",
  },
];

const founderCredentials = [
  "Member, Institute of Chartered Accountants of India (ICAI)",
  "10+ years in active CA practice",
  "Specialisation: GST, Income Tax & Business Compliance",
  "Personal oversight of every client engagement — no delegation",
  "Digital-first: phone, WhatsApp, or email — whichever works for you",
];

const processSteps = [
  {
    num: "01",
    title: "Understanding client requirements",
    desc: "We thoroughly assess your core needs to provide tailored professional support.",
  },
  {
    num: "02",
    title: "Applying professional judgement",
    desc: "We leverage our deep expertise to evaluate scenarios and select the optimal path.",
  },
  {
    num: "03",
    title: "Ensuring regulatory compliance",
    desc: "We verify adherence to all current statutory frameworks and guidelines.",
  },
  {
    num: "04",
    title: "Delivering services in a timely manner",
    desc: "We execute tasks efficiently and meet strictly agreed deadlines.",
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

const About = () => {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <motion.section 
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-white border-b border-[#E8EDE9]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          <motion.nav variants={fadeInUp} aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 text-[0.8125rem] text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={13} className="text-[#C4CAC6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">About</span>
          </motion.nav>
          <motion.span variants={fadeInUp} className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
            VNAV Associates
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-heading font-semibold text-[2.25rem] sm:text-[2.875rem] lg:text-[3.125rem] tracking-tight leading-[1.1] text-[#1C201E] mb-6 max-w-3xl">
            VNAV & <Highlighter>Associates</Highlighter>
          </motion.h1>
          <motion.p variants={fadeInUp} className="font-body text-[1rem] text-[#4E5A54] leading-[1.8] max-w-2xl mb-8">
            VNAV & Associates is a professionally managed <span className="text-emphasize">Chartered Accountancy</span> firm providing reliable and ethical professional services.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-x-7 gap-y-2.5">
            {["10+ years in active CA practice", "ICAI Registered", "Professional Compliance Services"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-[0.8125rem] text-[#4E5A54] font-body">
                <CheckCircle size={13} strokeWidth={1.5} className="text-[#1A4D2E]" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── About TaxNext ──────────────────────────────── */}
      <motion.section 
        {...fadeInUp}
        data-testid="about-taxnext-section" 
        className="bg-[#FBFBF9]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            {/* Left: positioning */}
            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
              <motion.span variants={fadeInUp} className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-5 font-body">
                What We Do
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-[1.2] mb-7">
                Professional services by a Chartered Accountancy firm.
              </motion.h2>
              <motion.div variants={fadeInUp} className="space-y-4 font-body text-[0.9375rem] text-[#4E5A54] leading-[1.8]">
                <p>
                  VNAV & Associates is a professionally managed Chartered Accountancy firm providing reliable and ethical professional services in audit, taxation, and advisory.
                </p>
                <p>
                  The firm operates with offices in Kurnool and Chennai, serving clients through a structured and diligent professional approach.
                </p>
                <p>
                  TaxNext.in is the firm’s technology-enabled knowledge platform — providing general tax information, compliance resources, and calculators for general awareness only.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Link
                  to="/services"
                  data-testid="about-services-link"
                  className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-[#1A4D2E] font-body mt-8 hover:gap-2.5 transition-all"
                >
                  View our services
                  <ChevronRight size={14} strokeWidth={2} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: stat display */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-x-8 gap-y-10 lg:gap-x-12"
            >
              {aboutStats.map((s) => (
                <motion.div
                  variants={fadeInUp}
                  key={s.label}
                  data-testid={`about-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <p className="font-heading font-semibold text-[2.5rem] lg:text-[3rem] text-[#1C201E] tracking-tight leading-none">
                    {s.value}
                  </p>
                  <p className="font-heading font-medium text-[#1A4D2E] text-[0.8125rem] mt-2.5">{s.label}</p>
                  <p className="font-body text-[0.75rem] text-[#4E5A54] mt-0.5 leading-snug">{s.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── Founder ────────────────────────────────────── */}
      <motion.section 
        {...fadeInUp}
        data-testid="founder-section" 
        className="bg-[#F2F5F3] border-y border-[#E8EDE9]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">

            {/* Photo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="rounded-2xl overflow-hidden border border-[#E8EDE9]" style={{ boxShadow: "0 8px 32px -8px rgba(0,0,0,0.08)" }}>
                <img
                  src={FOUNDER_IMAGE}
                  alt="CA. V.V.N.Prasad. Gupta — Founder, VNAV Associates"
                  className="w-full h-[480px] object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-5 right-4 sm:right-8 bg-white rounded-xl border border-[#E8EDE9] px-5 py-3.5" style={{ boxShadow: "0 4px 16px -4px rgba(0,0,0,0.1)" }}>
                <p className="font-heading font-semibold text-[#1C201E] text-[0.875rem] leading-snug">
                  CA. V.V.N.Prasad. Gupta
                </p>
                <p className="font-body text-[0.75rem] text-[#4E5A54]">ICAI Member · Founder, VNAV Associates</p>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="order-1 lg:order-2 pt-0 lg:pt-4"
            >
              <motion.span variants={fadeInUp} className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-5 font-body">
                Firm Partners
              </motion.span>
              <motion.h2 variants={fadeInUp} className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-[1.2] mb-6">
                Profile of Partners
              </motion.h2>
              <motion.div variants={fadeInUp} className="space-y-5 font-body text-[0.9375rem] text-[#4E5A54] leading-[1.8] mb-7">
                <p>
                  <span className="flex items-center gap-2 mb-1">
                    <strong className="text-[#1C201E]">CA. RTN. Vustepalle Venkata Naga Prasad Gupta (Partner – Kurnool)</strong>
                    <a href="https://www.linkedin.com/in/ca-prasadguptavustepalle/" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:text-[#004182] transition-colors" aria-label="LinkedIn Profile">
                      <Linkedin size={16} strokeWidth={1.5} />
                    </a>
                  </span>
                  Fellow Chartered Accountant with extensive experience in finance, accounting, taxation, and audit across domestic and international environments.<br />
                  <span className="italic block mt-1">Areas: Financial reporting and audit, Direct and indirect taxation, Financial management and budgeting, Regulatory compliance.</span>
                </p>
                <p>
                  <strong className="text-[#1C201E]">CA. Akula Venkata Sudhakar (Partner – Chennai)</strong><br />
                  Fellow Chartered Accountant with experience across manufacturing, real estate, and corporate sectors.<br />
                  <span className="italic block mt-1">Areas: Financial management and reporting, Taxation and compliance, Audit and assurance, MIS and budgeting.</span>
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-6 py-3 font-semibold font-body text-[0.875rem] hover:bg-[#133b23] transition-colors shadow-sm tracking-wide"
                >
                  Contact Information
                  <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── Why TaxNext ────────────────────────────────── */}
      <motion.section 
        {...fadeInUp}
        data-testid="why-section" 
        className="bg-[#FBFBF9]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl mb-12 lg:mb-16">
            <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
              Core Principles
            </span>
            <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-[1.2] mb-4">
              Our professional foundation.
            </h2>
            <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-[1.8]">
              These foundational values guide every decision and interaction.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="divide-y divide-[#E8EDE9]"
          >
            {whyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  variants={fadeInUp}
                  key={i}
                  className="flex items-start gap-6 py-7 first:pt-0"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#E4EDE6] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} strokeWidth={1.5} className="text-[#1A4D2E]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-medium text-[1rem] text-[#1C201E] mb-2">{card.title}</h3>
                    <p className="font-body text-[0.875rem] text-[#4E5A54] leading-[1.8]">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* ── How We Work ────────────────────────────────── */}
      <motion.section 
        {...fadeInUp}
        data-testid="process-section" 
        className="bg-[#F2F5F3] border-y border-[#E8EDE9]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="mb-14 lg:mb-16">
            <span className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#1A4D2E] mb-4 font-body">
              Engagement Framework
            </span>
            <h2 className="font-heading font-medium text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight mb-3">
              Professional Service Delivery.
            </h2>
            <p className="font-body text-[0.9375rem] text-[#4E5A54] max-w-xl leading-[1.8]">
              A consistent framework to deliver quality and precision.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-10 lg:gap-16"
          >
            {processSteps.map((step) => (
              <motion.div
                variants={fadeInUp}
                key={step.num}
              >
                <span className="font-heading font-light text-[5rem] leading-none select-none block mb-4" style={{ color: "#DDE3DE" }}>
                  {step.num}
                </span>
                <h3 className="font-heading font-medium text-[1rem] text-[#1C201E] mb-2.5">{step.title}</h3>
                <p className="font-body text-[0.875rem] text-[#4E5A54] leading-[1.8]">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-7 py-3.5 font-semibold font-body text-[0.875rem] hover:bg-[#133b23] transition-colors shadow-sm tracking-wide"
              >
                Contact Information
                <ArrowRight size={15} strokeWidth={1.5} />
              </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ── CTA ────────────────────────────────────────── */}
      <motion.section 
        {...fadeInUp}
        data-testid="about-cta-section" 
        className="bg-[#1A4D2E]"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.span variants={fadeInUp} className="block text-[10.5px] uppercase tracking-[0.16em] font-semibold text-white/45 mb-5 font-body">
              Get Started
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-heading font-semibold text-[1.875rem] sm:text-[2.375rem] text-white tracking-tight leading-[1.2] mb-4">
              Contact VNAV & Associates
            </motion.h2>
            <motion.p variants={fadeInUp} className="font-body text-[0.9375rem] text-white/65 mb-10 leading-[1.8]">
              Reach out to our offices to discuss your professional compliance and advisory requirements.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1A4D2E] rounded-lg px-8 py-3.5 font-semibold font-body text-[0.9375rem] hover:bg-[#F2F5F3] transition-colors shadow-sm tracking-wide"
              >
                Detailed Information
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <a
                href="tel:+919440428417"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/25 rounded-lg px-8 py-3.5 font-medium font-body text-[0.9375rem] hover:bg-white/10 transition-colors"
              >
                <Phone size={16} strokeWidth={1.5} />
                +91 94404 28417
              </a>
            </motion.div>
            <motion.p variants={fadeInUp} className="font-body text-[0.75rem] text-white/35">
              Professional communication &nbsp;·&nbsp; As per ethical standards
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default About;
