import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight, ArrowRight, Calculator, AlertCircle,
  CheckCircle, BarChart2, TrendingUp, FileText, Home,
  IndianRupee, Info
} from "lucide-react";
import SEO from "../components/SEO";

/* ─── Helpers ───────────────────────────────────────────────── */
const fmt = (n) =>
  typeof n === "number"
    ? "₹" + Math.round(n).toLocaleString("en-IN")
    : n;

const pct = (n, total) =>
  total > 0 ? ((n / total) * 100).toFixed(2) + "%" : "0%";

/* ─── Tax computation logic ─────────────────────────────────── */

// New Regime slabs (FY 2026-27) — standard deduction ₹75,000
function computeNewRegimeTax(grossIncome, stdDed = 75000) {
  const taxable = Math.max(0, grossIncome - stdDed);
  const slabs = [
    [400000, 0],
    [400000, 0.05],
    [400000, 0.10],
    [400000, 0.15],
    [400000, 0.20],
    [400000, 0.25],
    [Infinity, 0.30],
  ];
  let tax = 0;
  let remaining = taxable;
  let base = 0;
  for (const [band, rate] of slabs) {
    if (remaining <= 0) break;
    const chunk = Math.min(remaining, band);
    tax += chunk * rate;
    remaining -= chunk;
  }
  // Rebate 87A — if taxable income ≤ ₹12,00,000, full rebate (max ₹60,000) for New Regime (Budget 2025)
  const rebate = taxable <= 1200000 ? Math.min(tax, 60000) : 0;
  // Marginal relief logic handles cases slightly above 12L
  // Special marginal relief logic for income slightly above 7L or 12L would go here in a production app, but keeping it simple for now.
  const taxAfterRebate = Math.max(0, tax - rebate);
  const cess = taxAfterRebate * 0.04;
  return { taxable, tax, rebate, taxAfterRebate, cess, total: taxAfterRebate + cess };
}

// Old Regime slabs (FY 2026-27) — standard deduction ₹50,000
function computeOldRegimeTax(grossIncome, deductions80C = 0, hraExemption = 0, stdDed = 50000) {
  const grossAfterStd = Math.max(0, grossIncome - stdDed);
  const taxable = Math.max(0, grossAfterStd - deductions80C - hraExemption);
  const slabs = [
    [250000, 0],
    [250000, 0.05],
    [500000, 0.20],
    [Infinity, 0.30],
  ];
  let tax = 0;
  let remaining = taxable;
  for (const [band, rate] of slabs) {
    if (remaining <= 0) break;
    const chunk = Math.min(remaining, band);
    tax += chunk * rate;
    remaining -= chunk;
  }
  // Rebate 87A — if taxable ≤ ₹5,00,000
  const rebate = taxable <= 500000 ? Math.min(tax, 12500) : 0;
  const taxAfterRebate = Math.max(0, tax - rebate);
  const cess = taxAfterRebate * 0.04;
  return { taxable, tax, rebate, taxAfterRebate, cess, total: taxAfterRebate + cess };
}

/* ─── Main compute dispatcher ───────────────────────────────── */
function computeResult(id, values) {
  try {
    /* ── 1. Income Tax ─────────────────────────────────── */
    if (id === "income-tax") {
      const gross = parseFloat(values.income) || 0;
      const isOld = (values.regime || "").includes("Old");
      const ded80C = Math.min(parseFloat(values.deductions) || 0, 150000);
      const hra = parseFloat(values.hra) || 0;

      if (gross <= 0) return { error: "Please enter a valid income amount." };

      const newR = computeNewRegimeTax(gross);
      const oldR = computeOldRegimeTax(gross, ded80C, hra);
      const chosen = isOld ? oldR : newR;
      const better = newR.total <= oldR.total ? "New Regime" : "Old Regime";

      return {
        title: "Income Tax Estimate",
        highlight: { label: "Total Tax Payable", value: fmt(chosen.total) },
        rows: [
          { label: "Gross Annual Income", value: fmt(gross) },
          { label: "Standard Deduction", value: isOld ? fmt(50000) : fmt(75000) },
          ...(isOld ? [
            { label: "Deductions under 80C", value: fmt(ded80C) },
            { label: "HRA Exemption", value: fmt(hra) },
          ] : []),
          { label: "Taxable Income", value: fmt(chosen.taxable) },
          { label: "Income Tax (before rebate)", value: fmt(chosen.tax) },
          { label: "Rebate u/s 87A", value: fmt(chosen.rebate) },
          { label: "Tax after Rebate", value: fmt(chosen.taxAfterRebate) },
          { label: "Health & Education Cess (4%)", value: fmt(chosen.cess) },
          { label: "Total Tax Payable", value: fmt(chosen.total), strong: true },
          { label: "Effective Tax Rate", value: pct(chosen.total, gross) },
        ],
        comparison: {
          label: "Regime Comparison",
          rows: [
            { label: "New Regime Tax", value: fmt(newR.total), tag: newR.total <= oldR.total ? "Lower ✓" : "" },
            { label: "Old Regime Tax", value: fmt(oldR.total), tag: oldR.total < newR.total ? "Lower ✓" : "" },
            { label: "Better option", value: better, strong: true },
          ],
        },
        notes: [
          "Surcharge not included (applies on income > ₹50 lakh).",
          "Old Regime 80C deduction capped at ₹1,50,000.",
          "New Regime rebate u/s 87A: effectively zero tax if income ≤ ₹12 lakh.",
          "Figures are indicative — consult a CA for your actual liability.",
        ],
      };
    }

    /* ── 2. HRA Exemption ───────────────────────────────── */
    if (id === "hra-exemption") {
      const basic = parseFloat(values.basic) || 0;
      const hraRec = parseFloat(values.hra_rec) || 0;
      const rent = parseFloat(values.rent) || 0;
      const isMetro = (values.city || "").includes("Metro");

      if (basic <= 0 || rent <= 0) return { error: "Please enter Basic Salary and Rent Paid." };

      const tenPctBasic = basic * 0.10;
      const pctBasic = isMetro ? basic * 0.50 : basic * 0.40;
      const rentMinusTen = Math.max(0, rent - tenPctBasic);

      const exempt = Math.min(hraRec, pctBasic, rentMinusTen);
      const taxable = Math.max(0, hraRec - exempt);

      return {
        title: "HRA Exemption Estimate",
        highlight: { label: "HRA Exempt from Tax", value: fmt(exempt) },
        rows: [
          { label: "Basic Salary + DA (Annual)", value: fmt(basic) },
          { label: "HRA Received (Annual)", value: fmt(hraRec) },
          { label: "Actual Rent Paid (Annual)", value: fmt(rent) },
          { label: "", value: "" }, // divider
          { label: "Limit 1 — HRA Received", value: fmt(hraRec) },
          { label: `Limit 2 — ${isMetro ? "50%" : "40%"} of Basic+DA`, value: fmt(pctBasic) },
          { label: "Limit 3 — Rent minus 10% of Basic+DA", value: fmt(rentMinusTen) },
          { label: "HRA Exempt (lowest of 3 limits)", value: fmt(exempt), strong: true },
          { label: "Taxable HRA", value: fmt(taxable) },
        ],
        notes: [
          "Metro cities: Delhi, Mumbai, Kolkata, Chennai.",
          "Exemption is the minimum of three statutory limits.",
          "Actual rent receipts must be maintained as proof.",
          "This applies only to salaried individuals paying rent.",
        ],
      };
    }

    /* ── 3. Capital Gains ───────────────────────────────── */
    if (id === "capital-gains") {
      const asset = values.asset || "";
      const purchase = parseFloat(values.purchase) || 0;
      const sale = parseFloat(values.sale) || 0;
      const holding = values.holding || "";

      if (purchase <= 0 || sale <= 0) return { error: "Please enter Purchase and Sale prices." };

      const gain = sale - purchase;
      const isEquity = asset.includes("Equity") || asset.includes("Mutual");
      const isLTCG = holding.includes("More than") || holding.includes("1–2") && !isEquity;

      let taxRate = 0;
      let taxLabel = "";
      let exemption = 0;
      let taxableGain = gain;
      let classification = "";

      if (isEquity) {
        if (holding.includes("Less than")) {
          // STCG on equity — 20% (Budget 2024 change from 15%)
          classification = "STCG — Listed Equity / Equity MF";
          taxRate = 0.20;
          taxLabel = "20% (Short-Term)";
          taxableGain = gain;
        } else {
          // LTCG on equity — ₹1.25L exempt, 12.5% above
          classification = "LTCG — Listed Equity / Equity MF";
          exemption = Math.min(gain > 0 ? gain : 0, 125000);
          taxableGain = Math.max(0, gain - exemption);
          taxRate = 0.125;
          taxLabel = "12.5% above ₹1.25 lakh exemption";
        }
      } else {
        // Property / Debt MF
        if (holding.includes("Less than") || holding.includes("1–2")) {
          classification = "STCG — Property / Debt MF";
          taxRate = null; // slab rates
          taxLabel = "As per income tax slab";
          taxableGain = gain;
        } else {
          classification = "LTCG — Property / Debt MF";
          taxRate = 0.125;
          taxLabel = "12.5% without indexation (post Budget 2024)";
          taxableGain = gain;
        }
      }

      const estimatedTax = taxRate !== null ? taxableGain * taxRate : null;

      return {
        title: "Capital Gains Estimate",
        highlight: { label: "Capital Gain / Loss", value: fmt(gain) },
        rows: [
          { label: "Asset Type", value: asset },
          { label: "Purchase Price", value: fmt(purchase) },
          { label: "Sale Price", value: fmt(sale) },
          { label: "Capital Gain / (Loss)", value: fmt(gain), strong: gain > 0 },
          { label: "Classification", value: classification, strong: true },
          ...(exemption > 0 ? [{ label: "LTCG Exemption (u/s 112A)", value: fmt(exemption) }] : []),
          { label: "Taxable Gain", value: fmt(taxableGain) },
          { label: "Applicable Tax Rate", value: taxLabel },
          { label: "Estimated Tax", value: estimatedTax !== null ? fmt(estimatedTax) : "At slab rate", strong: true },
        ],
        notes: [
          "STCG on listed equity taxed at 20% (since July 2024).",
          "LTCG on equity: ₹1.25 lakh exempt per FY; 12.5% above that.",
          "Property LTCG: 12.5% without indexation benefit.",
          "Cess and surcharge not included. Losses may be set off against gains.",
        ],
      };
    }

    /* ── 4. GST Calculator ──────────────────────────────── */
    if (id === "gst-calculator") {
      const amount = parseFloat(values.amount) || 0;
      const rateStr = values.gst_rate || "18%";
      const calcType = values.calc_type || "";
      const rate = parseFloat(rateStr) / 100;

      if (amount <= 0) return { error: "Please enter a valid amount." };

      const isExclusive = calcType.includes("exclusive") || calcType === "";
      let base, gstTotal, finalAmount;

      if (isExclusive) {
        base = amount;
        gstTotal = base * rate;
        finalAmount = base + gstTotal;
      } else {
        finalAmount = amount;
        base = amount / (1 + rate);
        gstTotal = finalAmount - base;
      }

      const cgst = gstTotal / 2;
      const sgst = gstTotal / 2;

      return {
        title: "GST Computation",
        highlight: { label: isExclusive ? "Total (with GST)" : "Base Amount (excl. GST)", value: fmt(isExclusive ? finalAmount : base) },
        rows: [
          { label: "Base Amount (excl. GST)", value: fmt(base) },
          { label: `GST Rate`, value: rateStr },
          { label: `CGST (${parseFloat(rateStr) / 2}%)`, value: fmt(cgst) },
          { label: `SGST / UTGST (${parseFloat(rateStr) / 2}%)`, value: fmt(sgst) },
          { label: "Total GST Amount", value: fmt(gstTotal), strong: true },
          { label: "Final Amount (incl. GST)", value: fmt(finalAmount), strong: true },
        ],
        notes: [
          "GST Structure: 0%, 5%, 12%, 18%, 28%.",
          "CGST and SGST each equal half the total GST rate.",
          "IGST (full rate) applies to inter-state supply instead of CGST+SGST.",
          "These are estimates — verify with your chartered accountant.",
        ],
      };
    }

    return null;
  } catch {
    return { error: "Computation failed. Please check your inputs." };
  }
}

/* ─── Result Display Component ─────────────────────────────── */
function ComputeResult({ result }) {
  if (!result) return null;

  if (result.error) {
    return (
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
        <AlertCircle size={16} strokeWidth={1.5} className="text-amber-600 shrink-0 mt-0.5" />
        <p className="font-body text-sm text-amber-800">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Headline result */}
      <div className="bg-[#1A4D2E] rounded-xl p-5 text-white">
        <p className="font-body text-xs uppercase tracking-[0.1em] text-white/60 mb-1">{result.highlight.label}</p>
        <p className="font-heading font-semibold text-3xl tracking-tight">{result.highlight.value}</p>
        <p className="font-body text-xs text-white/50 mt-1">Estimated · FY 2026-27</p>
      </div>

      {/* Detailed breakdown */}
      <div className="bg-white rounded-xl border border-[#E8EDE9] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#E8EDE9] bg-[#FBFBF9]">
          <p className="font-body text-xs uppercase tracking-[0.1em] font-semibold text-[#4E5A54]">Breakdown</p>
        </div>
        <div className="divide-y divide-[#F2F5F3]">
          {result.rows.map((row, i) => (
            row.label === "" ? (
              <div key={i} className="h-px bg-[#E8EDE9]" />
            ) : (
              <div key={i} className={`flex justify-between items-center px-5 py-3 ${row.strong ? "bg-[#F2F5F3]" : ""}`}>
                <span className={`font-body text-sm ${row.strong ? "font-semibold text-[#1C201E]" : "text-[#4E5A54]"}`}>
                  {row.label}
                </span>
                <span className={`font-body text-sm tabular-nums ${row.strong ? "font-semibold text-[#1A4D2E]" : "text-[#1C201E]"}`}>
                  {row.value}
                </span>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Regime comparison (income tax only) */}
      {result.comparison && (
        <div className="bg-white rounded-xl border border-[#E8EDE9] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#E8EDE9] bg-[#FBFBF9]">
            <p className="font-body text-xs uppercase tracking-[0.1em] font-semibold text-[#4E5A54]">{result.comparison.label}</p>
          </div>
          <div className="divide-y divide-[#F2F5F3]">
            {result.comparison.rows.map((row, i) => (
              <div key={i} className={`flex justify-between items-center px-5 py-3 ${row.strong ? "bg-[#F2F5F3]" : ""}`}>
                <span className={`font-body text-sm ${row.strong ? "font-semibold text-[#1C201E]" : "text-[#4E5A54]"}`}>
                  {row.label}
                </span>
                <span className={`font-body text-sm tabular-nums flex items-center gap-2 ${row.strong ? "font-semibold text-[#1A4D2E]" : "text-[#1C201E]"}`}>
                  {row.value}
                  {row.tag && (
                    <span className="bg-[#e8eee9] text-[#1A4D2E] text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                      {row.tag}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {result.notes?.length > 0 && (
        <div className="bg-[#FBFBF9] rounded-xl border border-[#E8EDE9] p-4">
          <div className="flex items-center gap-1.5 mb-3">
            <Info size={13} strokeWidth={1.5} className="text-[#4E5A54]" />
            <p className="font-body text-xs uppercase tracking-[0.1em] font-semibold text-[#4E5A54]">Notes</p>
          </div>
          <ul className="space-y-1.5">
            {result.notes.map((note, i) => (
              <li key={i} className="font-body text-xs text-[#4E5A54] leading-relaxed pl-3 border-l-2 border-[#D4DAD6]">
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Calculator definitions ───────────────────────────────── */
const calculators = {
  "income-tax": {
    icon: BarChart2,
    title: "Income Tax Calculator",
    subtitle: "FY 2026-27 (AY 2027-28)",
    desc: "Estimate your income tax liability under the Old and New Regime.",
    fields: [
      { id: "income",     label: "Gross Annual Income (₹)",        type: "number", placeholder: "e.g., 1200000",  helper: "Include salary, business income, and other sources" },
      { id: "regime",     label: "Tax Regime",                      type: "select", options: ["New Regime (Default)", "Old Regime"] },
      { id: "deductions", label: "Total Deductions under 80C (₹)",  type: "number", placeholder: "Max ₹1,50,000",  helper: "PPF, ELSS, LIC, etc. — applicable in Old Regime only" },
      { id: "hra",        label: "HRA Exemption Claimed (₹)",       type: "number", placeholder: "0",              helper: "Only if salaried and claiming HRA — Old Regime only" },
    ],
  },
  "hra-exemption": {
    icon: Home,
    title: "HRA Exemption Calculator",
    subtitle: "Section 10(13A)",
    desc: "Calculate the HRA exemption you can claim on your salary income.",
    fields: [
      { id: "basic",   label: "Basic Salary + DA (₹ per year)",  type: "number", placeholder: "e.g., 600000" },
      { id: "hra_rec", label: "HRA Received (₹ per year)",       type: "number", placeholder: "e.g., 240000" },
      { id: "rent",    label: "Actual Rent Paid (₹ per year)",   type: "number", placeholder: "e.g., 180000" },
      { id: "city",    label: "City of Residence",                type: "select", options: ["Metro (Delhi / Mumbai / Chennai / Kolkata)", "Non-Metro"] },
    ],
  },
  "capital-gains": {
    icon: TrendingUp,
    title: "Capital Gains Calculator",
    subtitle: "FY 2026-27 (Post Budget 2025)",
    desc: "Estimate capital gains tax on equity, mutual funds, or property.",
    fields: [
      { id: "asset",    label: "Asset Type",            type: "select", options: ["Listed Equity Shares", "Equity Mutual Funds", "Debt Mutual Funds / Property / Land"] },
      { id: "purchase", label: "Purchase Price (₹)",    type: "number", placeholder: "e.g., 500000" },
      { id: "sale",     label: "Sale Price (₹)",        type: "number", placeholder: "e.g., 800000" },
      { id: "holding",  label: "Holding Period",        type: "select", options: ["Less than 1 year (STCG)", "1–2 years", "More than 2 years (LTCG)"] },
    ],
  },
  "gst-calculator": {
    icon: FileText,
    title: "GST Calculator",
    subtitle: "Standard GST Framework",
    desc: "Calculate GST-inclusive and exclusive prices under the simplified 4-slab structure.",
    fields: [
      { id: "amount",    label: "Amount (₹)",            type: "number", placeholder: "e.g., 10000" },
      { id: "gst_rate",  label: "GST Rate",              type: "select", options: ["0%", "5%", "12%", "18%", "28%"] },
      { id: "calc_type", label: "Calculation Type",      type: "select", options: ["Add GST to amount (exclusive)", "Extract GST from amount (inclusive)"] },
    ],
  },
};

/* ─── Page ──────────────────────────────────────────────────── */
export default function CalculatorDetail() {
  const { id } = useParams();
  const calc = calculators[id];
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);

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

  const handleCalculate = () => {
    const r = computeResult(id, values);
    setResult(r);
  };

  const handleReset = () => {
    setValues({});
    setResult(null);
  };

  return (
    <>
      <SEO
        title={`${calc.title} | Tax Computation — TaxNext.in`}
        description={`${calc.desc} Calculate yours for FY 2026-27 (AY 2027-28) using VNAV & Associates professional calculators.`}
        canonical={`/calculators/${id}`}
      />
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

      {/* ── Calculator Body ──────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">

          {/* Form + Result */}
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
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-body text-sm text-[#9baba2]">₹</span>
                        <input
                          type="number"
                          data-testid={`calc-field-${field.id}`}
                          value={values[field.id] || ""}
                          onChange={(e) => setValues({ ...values, [field.id]: e.target.value })}
                          placeholder={field.placeholder}
                          className="w-full h-11 rounded-lg border border-[#E8EDE9] pl-7 pr-4 font-body text-sm text-[#1C201E] bg-[#FBFBF9] placeholder:text-[#9baba2] focus:ring-2 focus:ring-[#1A4D2E] focus:border-[#1A4D2E] outline-none transition"
                        />
                      </div>
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
                  onClick={handleCalculate}
                  className="inline-flex items-center justify-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-7 py-3 font-medium font-body text-sm hover:bg-[#133b23] transition-colors shadow-sm"
                >
                  <Calculator size={15} strokeWidth={1.5} />
                  Calculate
                </button>
                <button
                  data-testid="calc-reset-btn"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 border border-[#D4DAD6] text-[#4E5A54] rounded-lg px-5 py-3 font-medium font-body text-sm hover:border-[#1A4D2E] hover:text-[#1A4D2E] transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Live result */}
              <ComputeResult result={result} />
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 mt-5 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
              <AlertCircle size={16} strokeWidth={1.5} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="font-body text-sm text-amber-800 leading-relaxed">
                <strong>Disclaimer:</strong> This calculator is on the TaxNext.in knowledge platform and provides general estimates only. It does not constitute professional advice or create any CA-client relationship. Tax computations depend on individual circumstances — consult a qualified Chartered Accountant for your specific situation.
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
                VNAV & Associates will review your specific documents and provide a precise computation specific to your situation.
              </p>
              <Link
                to="/contact"
                data-testid="calc-detail-cta"
                className="inline-flex items-center gap-2 bg-white text-[#1A4D2E] rounded-lg px-5 py-2.5 font-medium font-body text-sm hover:bg-[#F2F5F3] transition-colors"
              >
                Contact Us
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl border border-[#E8EDE9] p-6 shadow-sm">
              <h3 className="font-heading font-medium text-[#1C201E] text-sm mb-4">Important notes</h3>
              <ul className="space-y-3">
                {[
                  "All computations use FY 2026-27 rates",
                  "Governed by the Income Tax Act, 2025",
                  "Surcharge is not included in estimates",
                  "Results are indicative — not legally binding",
                  "Cess calculated at 4% on income tax",
                  "For notices and assessments, consult a CA",
                ].map((note) => (
                  <li key={note} className="flex items-start gap-2.5">
                    <CheckCircle size={13} strokeWidth={1.5} className="text-[#1A4D2E] mt-0.5 shrink-0" />
                    <span className="font-body text-xs text-[#4E5A54] leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other calculators */}
            <div className="bg-white rounded-xl border border-[#E8EDE9] p-6 shadow-sm">
              <h3 className="font-heading font-medium text-[#1C201E] text-sm mb-4">Other calculators</h3>
              <div className="space-y-2">
                {Object.entries(calculators)
                  .filter(([key]) => key !== id)
                  .map(([key, c]) => {
                    const CIcon = c.icon;
                    return (
                      <Link
                        key={key}
                        to={`/calculators/${key}`}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#F2F5F3] transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#e8eee9] flex items-center justify-center shrink-0 group-hover:bg-[#1A4D2E] transition-colors">
                          <CIcon size={14} strokeWidth={1.5} className="text-[#1A4D2E] group-hover:text-white transition-colors" />
                        </div>
                        <span className="font-body text-sm text-[#4E5A54] group-hover:text-[#1A4D2E] transition-colors">{c.title}</span>
                      </Link>
                    );
                  })}
              </div>
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
