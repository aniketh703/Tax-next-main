import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart2, Calculator, TrendingUp, Building2, FileText,
  ChevronRight, ArrowRight, Clock, CheckCircle, Home
} from "lucide-react";

const categories = [
  { id: "tax",      label: "Income Tax" },
  { id: "gst",      label: "GST & Indirect Tax" },
  { id: "financial", label: "Financial Planning" },
  { id: "business", label: "Business" },
];

const calculatorData = {
  tax: [
    {
      slug: "income-tax",
      icon: BarChart2,
      title: "Income Tax Calculator",
      desc: "Estimate your income tax liability under the Old and New Regime for FY 2024-25.",
      tags: ["Salaried", "Self-Employed"],
    },
    {
      slug: "hra-exemption",
      icon: Home,
      title: "HRA Exemption Calculator",
      desc: "Calculate the HRA exemption you can claim under Section 10(13A) based on rent paid and salary.",
      tags: ["Salaried"],
    },
    {
      slug: "capital-gains",
      icon: TrendingUp,
      title: "Capital Gains Calculator",
      desc: "Compute STCG and LTCG on sale of shares, mutual funds, or immovable property.",
      tags: ["Investors", "Property"],
    },
    {
      slug: "advance-tax",
      icon: Calculator,
      title: "Advance Tax Estimator",
      desc: "Estimate your quarterly advance tax instalments to avoid interest under Sections 234B and 234C.",
      tags: ["Salaried", "Business"],
    },
  ],
  gst: [
    {
      slug: "gst-calculator",
      icon: FileText,
      title: "GST Calculator",
      desc: "Calculate GST-inclusive and GST-exclusive prices for any rate (5%, 12%, 18%, 28%).",
      tags: ["Businesses", "Traders"],
    },
    {
      slug: "itc-checker",
      icon: CheckCircle,
      title: "ITC Eligibility Checker",
      desc: "Check whether your purchase qualifies for Input Tax Credit under GST law.",
      tags: ["Businesses"],
    },
    {
      slug: "gst-penalty",
      icon: Calculator,
      title: "GST Late Filing Penalty",
      desc: "Estimate the late filing fee and interest for delayed GSTR-3B or GSTR-1 submissions.",
      tags: ["Businesses"],
    },
  ],
  financial: [
    {
      slug: "home-loan-tax",
      icon: Home,
      title: "Home Loan Tax Benefit",
      desc: "Calculate the tax deductions available on your home loan under Sections 80C and 24(b).",
      tags: ["Individuals"],
    },
    {
      slug: "80c-planning",
      icon: BarChart2,
      title: "Section 80C Planner",
      desc: "Plan your 80C investments (PPF, ELSS, LIC, NSC) to maximise the ₹1.5 lakh deduction.",
      tags: ["Salaried", "Individuals"],
    },
  ],
  business: [
    {
      slug: "tds-rate-finder",
      icon: FileText,
      title: "TDS Rate Finder",
      desc: "Find the applicable TDS rate and threshold for any payment type under the Income Tax Act.",
      tags: ["Businesses", "Payers"],
    },
    {
      slug: "gst-threshold",
      icon: Building2,
      title: "GST Registration Threshold",
      desc: "Check whether your turnover requires mandatory GST registration based on state and business type.",
      tags: ["Businesses"],
    },
  ],
};

export default function Calculators() {
  const [activeCategory, setActiveCategory] = useState("tax");

  const allCalcs = Object.values(calculatorData).flat();
  const visibleCalcs = activeCategory === "all"
    ? allCalcs
    : calculatorData[activeCategory] || [];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-5 text-sm text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#D4DAD6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">Calculators</span>
          </nav>
          <span className="block text-[11px] uppercase tracking-[0.14em] font-semibold text-[#1A4D2E] mb-3 font-body">
            Free Tools
          </span>
          <h1 className="font-heading font-semibold text-[2.25rem] sm:text-[2.75rem] tracking-tight leading-[1.1] text-[#1C201E] mb-3 max-w-2xl">
            Estimate before your consultation.
          </h1>
          <p className="font-body text-base text-[#4E5A54] leading-relaxed max-w-xl mb-4">
            Use these tools to get a clear picture of your tax position before speaking with CA. Prasad. No login required.
          </p>

          {/* Coming soon notice */}
          <div className="inline-flex items-center gap-2 bg-[#e8eee9] rounded-lg px-4 py-2">
            <Clock size={14} strokeWidth={1.5} className="text-[#1A4D2E]" />
            <p className="font-body text-sm text-[#1C201E]">
              Calculators are being built for accuracy. Launching soon — previews available below.
            </p>
          </div>
        </div>
      </section>

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
        <div className="mb-8">
          <h2 className="font-heading font-medium text-[1.5rem] text-[#1C201E] tracking-tight mb-1">
            {categories.find((c) => c.id === activeCategory)?.label}
          </h2>
          <p className="font-body text-sm text-[#4E5A54]">
            {visibleCalcs.length} calculator{visibleCalcs.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {visibleCalcs.map((calc) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.slug}
                to={`/calculators/${calc.slug}`}
                data-testid={`calc-card-${calc.slug}`}
                className="group bg-white rounded-xl border border-[#E8EDE9] p-6 shadow-sm hover:shadow-md hover:border-[#1A4D2E]/25 transition-all"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#e8eee9] group-hover:bg-[#1A4D2E] flex items-center justify-center transition-colors">
                    <Icon size={20} strokeWidth={1.5} className="text-[#1A4D2E] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[0.6875rem] font-semibold font-body text-[#4E5A54] bg-[#F2F5F3] px-2 py-0.5 rounded-full">
                    Preview
                  </span>
                </div>
                <h3 className="font-heading font-medium text-base text-[#1C201E] mb-2 group-hover:text-[#1A4D2E] transition-colors">
                  {calc.title}
                </h3>
                <p className="font-body text-sm text-[#4E5A54] leading-relaxed mb-4">
                  {calc.desc}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {calc.tags.map((tag) => (
                      <span key={tag} className="text-[0.6875rem] font-body text-[#4E5A54] bg-[#F2F5F3] px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1A4D2E] font-body group-hover:gap-1.5 transition-all">
                    Open <ArrowRight size={11} strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-[#F2F5F3] rounded-2xl border border-[#E8EDE9] p-8 sm:p-10 grid sm:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="font-heading font-medium text-xl text-[#1C201E] mb-2">
              Need an accurate computation?
            </h3>
            <p className="font-body text-sm text-[#4E5A54] leading-relaxed">
              These tools provide estimates. For a precise calculation tailored to your situation, consult CA. Prasad directly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
            <Link
              to="/contact"
              data-testid="calculators-cta-btn"
              className="inline-flex items-center justify-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-6 py-3 font-medium font-body text-sm hover:bg-[#133b23] transition-colors shadow-sm"
            >
              Book a Free Consultation
              <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
