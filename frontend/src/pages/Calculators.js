import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart2, TrendingUp, FileText,
  ChevronRight, ArrowRight, Clock, Home,
  ShieldCheck, TrendingDown
} from "lucide-react";
import Highlighter from "../components/ui/Highlighter";
import SEO from "../components/SEO";
import { CompliancePulse } from "../components/calculators/CompliancePulse";

const categories = [
  { id: "tax", label: "Tax Planning" },
  { id: "invest", label: "Investment Utility" },
  { id: "gst", label: "Business Utility" },
];

const calculatorData = {
  tax: [
    {
      slug: "income-tax",
      icon: BarChart2,
      title: "Income Tax Calculator",
      desc: "Comprehensive logic for FY 2026-27 including 80D, NPS, and Home Loan benefits.",
      tags: ["Salaried", "Professional"],
      featured: true,
    },
    {
      slug: "hra-exemption",
      icon: ShieldCheck,
      title: "HRA Exemption",
      desc: "Optimize your house rent allowance exemption under Section 10(13A).",
      tags: ["Renters"],
    },
    {
      slug: "capital-gains",
      icon: TrendingDown,
      title: "Capital Gains",
      desc: "LTCG and STCG computations for Equity and Property (Post-Budget 2024).",
      tags: ["Investors"],
    },
  ],
  invest: [
    {
      slug: "nps-savings",
      icon: TrendingUp,
      title: "NPS Tax Engine",
      desc: "Calculate additional savings of up to ₹50,000 under Section 80CCD(1B).",
      tags: ["Retirement"],
      featured: true,
    },
    {
      slug: "loan-utility",
      icon: Home,
      title: "Loan-Tax Synergy",
      desc: "Real cost of borrowing analysis after considering Section 24(b) benefits.",
      tags: ["Home Owners"],
    },
  ],
  gst: [
    {
      slug: "gst-calculator",
      icon: FileText,
      title: "GST Engine",
      desc: "Fast Inward/Outward GST computation for B2B and B2C scenarios.",
      tags: ["Businesses"],
    },
  ],
};


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

export default function Calculators() {
  const [activeCategory, setActiveCategory] = useState("tax");

  const visibleCalcs = calculatorData[activeCategory] || [];

  return (
    <>
      <SEO 
        title="Professional Tax Calculators | FY 2026-27 | Kurnool & Chennai"
        description="Calculate Income Tax, HRA, Capital Gains, and GST for FY 2026-27. Professional tools by VNAV Associates, Chartered Accountants."
        canonical="/calculators"
      />
      {/* ── Hero ─────────────────────────────────────── */}
      <motion.section 
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="bg-white border-b border-[#E8EDE9]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <motion.nav variants={fadeInUp} aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-5 text-sm text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#D4DAD6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Calculators</span>
          </motion.nav>
          <motion.span variants={fadeInUp} className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
            Knowledge Tools
          </motion.span>
          <motion.h1 variants={fadeInUp} className="font-heading font-semibold text-[2.25rem] sm:text-[2.75rem] tracking-tight leading-[1.1] text-[#1C201E] mb-3 max-w-2xl">
            Calculators & <Highlighter>Tools</Highlighter>
          </motion.h1>
          <motion.p variants={fadeInUp} className="font-body text-base text-[#4E5A54] leading-relaxed max-w-xl mb-4">
            Use these tools to get a general estimate of your tax position. No login required.
          </motion.p>

          {/* Disclaimer notice */}
          <motion.div variants={fadeInUp} className="flex items-start gap-3 bg-[#f2f5f3] rounded-lg p-4 border border-[#D4DAD6]">
            <Clock size={16} strokeWidth={1.5} className="text-[#1A4D2E] mt-0.5 shrink-0" />
            <p className="font-body text-sm text-[#1C201E] leading-relaxed">
              <strong className="text-[#1A4D2E]">Disclaimer:</strong> Tools are for general guidance only. They do not constitute professional advice or create a CA-client relationship.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Category Nav ──────────────────────────────── */}
      <div
        data-testid="calc-category-nav"
        className="sticky top-[64px] z-30 bg-white border-b border-[#E8EDE9] shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                data-testid={`calc-nav-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-4 font-body text-sm font-medium whitespace-nowrap border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A4D2E] focus-visible:ring-inset ${
                  activeCategory === cat.id
                    ? "border-[#1A4D2E] text-[#1A4D2E]"
                    : "border-transparent text-[#4E5A54] hover:text-[#1C201E]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Calculator Cards ──────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="font-heading font-medium text-[1.875rem] text-[#1C201E] tracking-tight mb-2">
              {categories.find((c) => c.id === activeCategory)?.label}
            </h2>
            <p className="font-body text-base text-[#4E5A54] max-w-xl">
              Select a specialized tool to compute your tax liability or exemption based on the latest <strong>Finance Act 2024 & 2025</strong> provisions.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1A4D2E]"></span>
              <p className="font-body text-xs font-semibold text-[#1A4D2E] underline underline-offset-4 decoration-[#1A4D2E]/30 uppercase tracking-widest">
                {visibleCalcs.length} Specialized Tool{visibleCalcs.length !== 1 ? "s" : ""} Available
              </p>
            </div>
          </div>
          <div className="lg:col-span-1">
             <CompliancePulse />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial="initial"
            animate="whileInView"
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14"
          >
            {visibleCalcs.map((calc) => {
              const Icon = calc.icon;
              return (
                <motion.div variants={fadeInUp} key={calc.slug}>
                  <Link
                    to={`/calculators/${calc.slug}`}
                    className="group flex flex-col h-full bg-white rounded-2xl border border-[#E8EDE9] p-7 transition-all duration-300 premium-shadow-hover"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#F2F5F3] group-hover:bg-[#1A4D2E] flex items-center justify-center transition-colors">
                        <Icon size={20} strokeWidth={1.5} className="text-[#1A4D2E] group-hover:text-white transition-colors" />
                      </div>
                      {calc.featured && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[9px] font-bold uppercase tracking-wider border border-amber-200">
                          <Star size={10} fill="currentColor" /> Featured Tool
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-medium text-lg text-[#1C201E] mb-2.5 group-hover:text-[#1A4D2E] transition-colors">
                      {calc.title}
                    </h3>
                    <p className="font-body text-[0.875rem] text-[#4E5A54] leading-relaxed mb-6 flex-grow">
                      {calc.desc}
                    </p>
                    <div className="flex items-center justify-between pt-5 border-t border-[#E8EDE9]">
                      <div className="flex flex-wrap gap-1.5">
                        {calc.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider font-body text-[#1A4D2E] bg-[#1A4D2E]/[0.06] px-2 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A4D2E] font-body group-hover:gap-2.5 transition-all">
                        Open <ArrowRight size={13} strokeWidth={2} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <div className="bg-[#F2F5F3] rounded-2xl border border-[#E8EDE9] p-8 sm:p-10 grid sm:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="font-heading font-medium text-xl text-[#1C201E] mb-2">
              Professional Computation
            </h3>
            <p className="font-body text-sm text-[#4E5A54] leading-relaxed">
              These tools provide estimates for general awareness only. For a computation tailored to your specific situation, please refer to our professional services.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
            <Link
              to="/contact"
              data-testid="calculators-cta-btn"
              className="inline-flex items-center justify-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-6 py-3 font-medium font-body text-sm hover:bg-[#133b23] transition-colors shadow-sm"
            >
              Detailed Information
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
