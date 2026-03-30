import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight, ArrowRight, Calculator, AlertCircle,
  CheckCircle, BarChart2, TrendingUp, Building2, FileText, Home
} from "lucide-react";

/* ─── Calculator definitions ───────────────────────────────── */
const calculators = {
  "income-tax": {
    icon: BarChart2,
    title: "Income Tax Calculator",
    subtitle: "FY 2024-25 (AY 2025-26)",
    desc: "Estimate your income tax liability under the Old and New Regime.",
    fields: [
      { id: "income",      label: "Gross Annual Income (₹)",      type: "number", placeholder: "e.g., 12,00,000",  helper: "Include salary, business income, and other income" },
      { id: "regime",      label: "Tax Regime",                   type: "select", options: ["New Regime (Default)", "Old Regime"] },
      { id: "deductions",  label: "Total Deductions under 80C (₹)", type: "number", placeholder: "Max ₹1,50,000",   helper: "PPF, ELSS, LIC, etc. Applicable in Old Regime only" },
      { id: "hra",         label: "HRA Exemption Claimed (₹)",    type: "number", placeholder: "0",                helper: "Only if you are salaried and pay rent" },
    ],
  },
  "hra-exemption": {
    icon: Home,
    title: "HRA Exemption Calculator",
    subtitle: "Section 10(13A)",
    desc: "Calculate the HRA exemption you can claim on your salary income.",
    fields: [
      { id: "basic",    label: "Basic Salary + DA (₹ per year)", type: "number", placeholder: "e.g., 6,00,000" },
      { id: "hra_rec",  label: "HRA Received (₹ per year)",      type: "number", placeholder: "e.g., 2,40,000" },
      { id: "rent",     label: "Actual Rent Paid (₹ per year)",  type: "number", placeholder: "e.g., 1,80,000" },
      { id: "city",     label: "City of Residence",               type: "select", options: ["Metro (Delhi/Mumbai/Chennai/Kolkata)", "Non-Metro"] },
    ],
  },
  "capital-gains": {
    icon: TrendingUp,
    title: "Capital Gains Calculator",
    subtitle: "STCG & LTCG",
    desc: "Estimate your capital gains tax on shares, mutual funds, or property.",
    fields: [
      { id: "asset",        label: "Asset Type",                    type: "select", options: ["Listed Equity Shares", "Equity Mutual Funds", "Debt Mutual Funds", "Property / Land"] },
      { id: "purchase",     label: "Purchase Price (₹)",            type: "number", placeholder: "e.g., 5,00,000" },
      { id: "sale",         label: "Sale Price (₹)",                type: "number", placeholder: "e.g., 8,00,000" },
      { id: "holding",      label: "Holding Period",                type: "select", options: ["Less than 1 year (STCG)", "1–2 years", "More than 2 years (LTCG)"] },
    ],
  },
  "advance-tax": {
    icon: Calculator,
    title: "Advance Tax Estimator",
    subtitle: "Quarterly instalments",
    desc: "Estimate quarterly advance tax to avoid interest under 234B and 234C.",
    fields: [
      { id: "total_income", label: "Estimated Total Income (₹ per year)", type: "number", placeholder: "e.g., 15,00,000" },
      { id: "tds_deducted", label: "TDS Already Deducted (₹)",            type: "number", placeholder: "e.g., 1,20,000" },
      { id: "quarter",      label: "Current Instalment Due",               type: "select", options: ["Q1 — 15 June (15%)", "Q2 — 15 September (45%)", "Q3 — 15 December (75%)", "Q4 — 15 March (100%)"] },
    ],
  },
  "gst-calculator": {
    icon: FileText,
    title: "GST Calculator",
    subtitle: "Inclusive & Exclusive",
    desc: "Calculate GST-inclusive and exclusive prices for any applicable rate.",
    fields: [
      { id: "amount",    label: "Amount (₹)",       type: "number", placeholder: "e.g., 10,000" },
      { id: "gst_rate",  label: "GST Rate",          type: "select", options: ["5%", "12%", "18%", "28%"] },
      { id: "calc_type", label: "Calculation Type",  type: "select", options: ["Add GST to amount (exclusive)", "Extract GST from amount (inclusive)"] },
    ],
  },
  "home-loan-tax": {
    icon: Home,
    title: "Home Loan Tax Benefit",
    subtitle: "Sections 80C and 24(b)",
    desc: "Calculate your home loan tax deductions on principal and interest.",
    fields: [
      { id: "principal_paid", label: "Principal Repaid in FY (₹)",   type: "number", placeholder: "e.g., 1,20,000",  helper: "Deductible under Section 80C (max ₹1.5 lakh)" },
      { id: "interest_paid",  label: "Interest Paid in FY (₹)",      type: "number", placeholder: "e.g., 2,40,000",  helper: "Deductible under Section 24(b) (max ₹2 lakh for self-occupied)" },
      { id: "property_type",  label: "Property Status",               type: "select", options: ["Self-Occupied", "Let Out / Deemed Let Out"] },
    ],
  },
  "tds-rate-finder": {
    icon: FileText,
    title: "TDS Rate Finder",
    subtitle: "Sections 192–206",
    desc: "Find the applicable TDS rate and threshold for any payment type.",
    fields: [
      { id: "payment_type", label: "Nature of Payment", type: "select", options: ["Salary (192)", "Interest on Securities (193)", "Dividends (194)", "Interest (194A)", "Winning from Lottery (194B)", "Contractor Payment (194C)", "Professional Fee (194J)", "Commission (194H)", "Rent (194I)"] },
      { id: "payee_type",   label: "Payee Type",         type: "select", options: ["Individual / HUF", "Firm / Company", "NRI"] },
    ],
  },
  "gst-threshold": {
    icon: Building2,
    title: "GST Registration Threshold",
    subtitle: "Compulsory registration check",
    desc: "Check whether your turnover crosses the mandatory GST registration threshold.",
    fields: [
      { id: "turnover",  label: "Estimated Annual Turnover (₹)", type: "number", placeholder: "e.g., 25,00,000" },
      { id: "state",     label: "State of Business",              type: "select", options: ["Special Category State (₹10L threshold)", "All Other States (₹20L threshold for services)", "All Other States (₹40L threshold for goods)"] },
      { id: "supply",    label: "Type of Supply",                 type: "select", options: ["Goods only", "Services only", "Both Goods and Services"] },
    ],
  },
};

/* ─── Static result placeholder ────────────────────────────── */
function StaticResult({ title }) {
  return (
    <div className="mt-6 bg-[#F2F5F3] rounded-xl border border-[#E8EDE9] p-6 text-center">
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#e8eee9] mb-3">
        <Calculator size={20} strokeWidth={1.5} className="text-[#1A4D2E]" />
      </div>
      <p className="font-heading font-medium text-[#1C201E] text-base mb-1">Result will appear here</p>
      <p className="font-body text-sm text-[#4E5A54]">
        This calculator is being developed. Enter your values and press Calculate — live computation coming soon.
      </p>
    </div>
  );
}

export default function CalculatorDetail() {
  const { id } = useParams();
  const calc = calculators[id];
  const [values, setValues] = useState({});
  const [calculated, setCalculated] = useState(false);

  if (!calc) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="font-heading font-medium text-xl text-[#1C201E] mb-4">Calculator not found.</p>
        <Link to="/calculators" className="text-[#1A4D2E] font-body text-sm font-medium hover:underline">
          Back to all calculators
        </Link>
      </div>
    );
  }

  const Icon = calc.icon;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-5 text-sm text-[#4E5A54] font-body">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#D4DAD6]" aria-hidden="true" />
            <Link to="/calculators" className="hover:text-[#1A4D2E] transition-colors">Calculators</Link>
            <ChevronRight size={14} className="text-[#D4DAD6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium">{calc.title}</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#e8eee9] flex items-center justify-center shrink-0">
              <Icon size={22} strokeWidth={1.5} className="text-[#1A4D2E]" />
            </div>
            <div>
              <span className="font-body text-xs text-[#4E5A54] uppercase tracking-[0.1em] font-semibold">{calc.subtitle}</span>
              <h1 className="font-heading font-semibold text-[1.875rem] sm:text-[2.25rem] text-[#1C201E] tracking-tight leading-tight">
                {calc.title}
              </h1>
              <p className="font-body text-[0.9375rem] text-[#4E5A54] mt-1">{calc.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Calculator Body ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[#E8EDE9] p-7 sm:p-8 shadow-sm">
              <h2 className="font-heading font-medium text-lg text-[#1C201E] mb-6">
                Enter your values
              </h2>

              <div className="space-y-5">
                {calc.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block font-body text-sm font-medium text-[#1C201E] mb-1.5">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        data-testid={`calc-field-${field.id}`}
                        value={values[field.id] || ""}
                        onChange={(e) => setValues({ ...values, [field.id]: e.target.value })}
                        className="w-full h-11 rounded-lg border border-[#E8EDE9] px-4 font-body text-sm text-[#1C201E] bg-[#FBFBF9] focus:ring-2 focus:ring-[#1A4D2E] focus:border-[#1A4D2E] outline-none transition"
                      >
                        <option value="">Select an option</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        data-testid={`calc-field-${field.id}`}
                        value={values[field.id] || ""}
                        onChange={(e) => setValues({ ...values, [field.id]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full h-11 rounded-lg border border-[#E8EDE9] px-4 font-body text-sm text-[#1C201E] bg-[#FBFBF9] placeholder:text-[#9baba2] focus:ring-2 focus:ring-[#1A4D2E] focus:border-[#1A4D2E] outline-none transition"
                      />
                    )}
                    {field.helper && (
                      <p className="font-body text-xs text-[#4E5A54] mt-1">{field.helper}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button
                  data-testid="calc-calculate-btn"
                  onClick={() => setCalculated(true)}
                  className="inline-flex items-center justify-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-7 py-3 font-medium font-body text-sm hover:bg-[#133b23] transition-colors shadow-sm"
                >
                  <Calculator size={15} strokeWidth={1.5} />
                  Calculate
                </button>
                <button
                  data-testid="calc-reset-btn"
                  onClick={() => { setValues({}); setCalculated(false); }}
                  className="inline-flex items-center justify-center gap-2 border border-[#D4DAD6] text-[#4E5A54] rounded-lg px-5 py-3 font-medium font-body text-sm hover:border-[#1A4D2E] hover:text-[#1A4D2E] transition-colors"
                >
                  Reset
                </button>
              </div>

              {calculated && <StaticResult title={calc.title} />}
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 mt-5 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
              <AlertCircle size={16} strokeWidth={1.5} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="font-body text-sm text-amber-800 leading-relaxed">
                This calculator provides general estimates only. Tax computations depend on individual circumstances not captured here. For accurate figures, consult CA. Prasad.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Consult CTA */}
            <div className="bg-[#1A4D2E] rounded-xl p-6 text-white">
              <h3 className="font-heading font-semibold text-base mb-2">
                Need an accurate figure?
              </h3>
              <p className="font-body text-sm text-white/75 leading-relaxed mb-5">
                CA. Prasad will review your specific documents and give you a precise computation — not an estimate.
              </p>
              <Link
                to="/contact"
                data-testid="calc-detail-cta"
                className="inline-flex items-center gap-2 bg-white text-[#1A4D2E] rounded-lg px-5 py-2.5 font-medium font-body text-sm hover:bg-[#F2F5F3] transition-colors"
              >
                Book a Free Consultation
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl border border-[#E8EDE9] p-6 shadow-sm">
              <h3 className="font-heading font-medium text-[#1C201E] text-sm mb-4">Good to know</h3>
              <ul className="space-y-3">
                {[
                  "All computations use FY 2024-25 rates",
                  "Surcharge and cess are not included",
                  "Results are indicative — not legally binding",
                  "For notices and assessments, always consult a CA",
                ].map((note) => (
                  <li key={note} className="flex items-start gap-2.5">
                    <CheckCircle size={13} strokeWidth={1.5} className="text-[#1A4D2E] mt-0.5 shrink-0" />
                    <span className="font-body text-xs text-[#4E5A54] leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Back */}
            <Link
              to="/calculators"
              data-testid="back-to-calcs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4E5A54] font-body hover:text-[#1A4D2E] transition-colors"
            >
              <ChevronRight size={14} strokeWidth={1.5} className="rotate-180" />
              All calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
