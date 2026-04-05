import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight, ArrowRight, Calculator, AlertCircle,
  CheckCircle, BarChart2, TrendingUp, FileText, Home,
  IndianRupee, Info, TrendingDown, ShieldCheck
} from "lucide-react";
import SEO from "../components/SEO";
import { TaxPieChart, RegimeComparisonChart, GSTBreakdownChart } from "../components/calculators/CalculatorCharts";
import { InvestmentOptimizer } from "../components/calculators/InvestmentOptimizer";
import { CompliancePulse } from "../components/calculators/CompliancePulse";

/* ─── Helpers ───────────────────────────────────────────────── */
const fmt = (n) =>
  typeof n === "number"
    ? "₹" + Math.round(n).toLocaleString("en-IN")
    : n;

const pct = (n, total) =>
  total > 0 ? ((n / total) * 100).toFixed(2) + "%" : "0%";

/* ─── Tax computation logic ─────────────────────────────────── */

function computeSurcharge(tax, income, regime) {
  let rate = 0;
  if (income > 20000000) rate = 0.25;
  else if (income > 10000000) rate = 0.15;
  else if (income > 5000000) rate = 0.10;
  
  let surcharge = tax * rate;
  
  // Marginal Relief logic (Simplified)
  if (income > 5000000 && income <= 5100000) {
    const taxAt50L = regime === 'new' ? computeNewRegimeTax(5000000).tax : computeOldRegimeTax(5000000).tax;
    const extraIncome = income - 5000000;
    const cap = taxAt50L + extraIncome;
    if (tax + surcharge > cap) surcharge = cap - tax;
  }
  
  return surcharge;
}

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
  for (const [band, rate] of slabs) {
    if (remaining <= 0) break;
    const chunk = Math.min(remaining, band);
    tax += chunk * rate;
    remaining -= chunk;
  }
  // Rebate 87A — if taxable income ≤ ₹12,00,000, full rebate (max ₹60,000)
  const rebate = taxable <= 1200000 ? Math.min(tax, 60000) : 0;
  const taxAfterRebate = Math.max(0, tax - rebate);
  
  const surcharge = computeSurcharge(taxAfterRebate, taxable, 'new');
  const cess = (taxAfterRebate + surcharge) * 0.04;
  
  return { taxable, tax, rebate, surcharge, taxAfterRebate, cess, total: taxAfterRebate + surcharge + cess };
}

// Old Regime slabs (FY 2026-27) — standard deduction ₹50,000
function computeOldRegimeTax(grossIncome, deductions80C = 0, hraExemption = 0, stdDed = 50000, otherDeds = 0) {
  const grossAfterStd = Math.max(0, grossIncome - stdDed);
  const taxable = Math.max(0, grossAfterStd - deductions80C - hraExemption - otherDeds);
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
  const rebate = taxable <= 500000 ? Math.min(tax, 12500) : 0;
  const taxAfterRebate = Math.max(0, tax - rebate);
  
  const surcharge = computeSurcharge(taxAfterRebate, taxable, 'old');
  const cess = (taxAfterRebate + surcharge) * 0.04;
  
  return { taxable, tax, rebate, surcharge, taxAfterRebate, cess, total: taxAfterRebate + surcharge + cess };
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
      const ded80D = parseFloat(values.health_ins) || 0;
      const sec24 = parseFloat(values.home_loan_int) || 0;
      const nps = Math.min(parseFloat(values.nps_extra) || 0, 50000);

      if (gross <= 0) return { error: "Please enter a valid income amount." };

      const otherDeds = ded80D + sec24 + nps;
      const newR = computeNewRegimeTax(gross);
      const oldR = computeOldRegimeTax(gross, ded80C, hra, 50000, otherDeds);
      const chosen = isOld ? oldR : newR;
      const better = newR.total <= oldR.total ? "New Regime" : "Old Regime";

      return {
        title: "Income Tax Estimate",
        highlight: { label: "Total Tax Payable", value: fmt(chosen.total) },
        rows: [
          { label: "Gross Annual Income", value: fmt(gross) },
          { label: "Standard Deduction", value: isOld ? fmt(50000) : fmt(75000) },
          ...(isOld ? [
            { label: "Section 80C Deductions", value: fmt(ded80C) },
            { label: "HRA Exemption", value: fmt(hra) },
            { label: "Health Ins. (80D)", value: fmt(ded80D) },
            { label: "Home Loan Int (Sec 24)", value: fmt(sec24) },
            { label: "NPS (80CCD(1B))", value: fmt(nps) },
          ] : []),
          { label: "Taxable Income", value: fmt(chosen.taxable) },
          { label: "Income Tax (before rebate)", value: fmt(chosen.tax) },
          { label: "Rebate u/s 87A", value: fmt(chosen.rebate) },
          { label: "Surcharge", value: fmt(chosen.surcharge) },
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
          "Surcharge logic: 10% (50L-1Cr), 15% (1Cr-2Cr), 25% (>2Cr).",
          "Includes updated Standard Deduction of ₹75k for New Regime.",
          "New Regime rebate u/s 87A: Nil tax up to ₹12L income.",
          "Old Regime deductions capped as per statutory limits.",
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

    /* ── 5. NPS Savings ─────────────────────────────────── */
    if (id === "nps-savings") {
      const annual = parseFloat(values.nps_amt) || 0;
      const bracket = parseFloat(values.tax_bracket) || 30; // default to 30%
      
      if (annual <= 0) return { error: "Please enter your annual contribution." };
      
      const sec80CCD1B = Math.min(annual, 50000);
      const savings = sec80CCD1B * (bracket / 100) * 1.04;
      
      return {
        title: "NPS Tax Savings Estimate",
        highlight: { label: "Additional Tax Saved", value: fmt(savings) },
        rows: [
          { label: "Annual NPS Contribution", value: fmt(annual) },
          { label: "Deduction u/s 80CCD(1B)", value: fmt(sec80CCD1B) },
          { label: "Assumed Tax Bracket", value: bracket + "%" },
          { label: "Tax Savings (incl. Cess)", value: fmt(savings), strong: true },
        ],
        notes: [
          "₹50,000 deduction is over and above the ₹1.5L limit of 80C.",
          "Available only for Tier-1 accounts.",
          "Effective savings depends on your actual taxable income slab.",
        ],
      };
    }

    /* ── 6. Loan Tax Synergy ─────────────────────────────── */
    if (id === "loan-utility") {
      const loan = parseFloat(values.loan_amt) || 0;
      const rate = (parseFloat(values.int_rate) || 9) / 100;
      const bracket = parseFloat(values.tax_bracket) || 30;
      
      if (loan <= 0) return { error: "Please enter the loan amount." };
      
      const annualInt = loan * rate;
      const sec24Limit = 200000;
      const exemptInt = Math.min(annualInt, sec24Limit);
      const taxSaved = exemptInt * (bracket / 100) * 1.04;
      const effectiveInt = annualInt - taxSaved;
      const effectiveRate = (effectiveInt / loan) * 100;

      return {
        title: "Loan Tax Synergy",
        highlight: { label: "Effective Interest Paid", value: fmt(effectiveInt) },
        rows: [
          { label: "Annual Interest Payable", value: fmt(annualInt) },
          { label: "Tax Deduction (Sec 24b)", value: fmt(exemptInt) },
          { label: "Tax Saved on Interest", value: fmt(taxSaved) },
          { label: "Net Interest Outflow", value: fmt(effectiveInt), strong: true },
          { label: "Actual Interest Rate", value: (rate * 100).toFixed(2) + "%" },
          { label: "Effective Interest Rate", value: effectiveRate.toFixed(2) + "%", strong: true },
        ],
        notes: [
          "Deduction under Section 24(b) is capped at ₹2 lakh for self-occupied property.",
          "Effective rate shows your real cost of borrowing after tax benefits.",
        ],
      };
    }

    return null;
  } catch {
    return { error: "Computation failed. Please check your inputs." };
  }
}

/* ─── Formal Print Report Template ─────────────────────────── */
function PrintReport({ result, id, values }) {
  const today = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="hidden print:block font-serif text-[#1C201E] p-8 max-w-[210mm] mx-auto bg-white">
      {/* Letterhead */}
      <div className="border-b-2 border-[#1A4D2E] pb-6 mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-[#1A4D2E] mb-1">TaxNext.in</h1>
          <p className="text-xs uppercase tracking-widest font-sans font-bold text-[#4E5A54]">VNAV & Associates | Chartered Accountants</p>
          <p className="text-sm mt-4 font-bold font-sans">CA. V.V.N. Prasad Gupta, FCA</p>
        </div>
        <div className="text-right space-y-1 text-[10px] font-sans leading-relaxed">
          <p className="font-bold text-[#1A4D2E] text-xs underline decoration-1 underline-offset-2 italic">Primary Office (Kurnool):</p>
          <p className="font-semibold">404, Suresh Towers, Santosh Nagar,</p>
          <p className="font-semibold">NH 44 Road, Kurnool – 518003</p>
          <div className="h-2" />
          <p className="text-[#4E5A54] italic">Secondary Office (Chennai):</p>
          <p>Flat No. C, No. 9, Jai Nagar, 15th Street,</p>
          <p>Arumbakkam, Chennai – 600106</p>
          <div className="h-2" />
          <p className="font-medium">Contact: +91 94404 28417</p>
          <p className="font-medium text-[#1A4D2E]">www.taxnext.in</p>
        </div>
      </div>

      {/* Report Title */}
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold uppercase tracking-tight border-y border-[#E8EDE9] py-2 inline-block">
          Tax Estimation Certificate — FY 2026-27
        </h2>
        <p className="text-[10px] mt-2 text-[#4E5A54] uppercase tracking-widest font-sans">Generated on {today}</p>
      </div>

      {/* Subject Line */}
      <div className="mb-8">
        <p className="text-sm font-semibold">Subject: Preliminary Income Tax Computation for {result.title}</p>
      </div>

      {/* Computation Table */}
      <table className="w-full text-sm border-collapse mb-10">
        <thead>
          <tr className="bg-[#F2F5F3] border-t border-b border-[#D4DAD6]">
            <th className="text-left px-4 py-3 font-bold uppercase text-[10px] tracking-wider">Particulars</th>
            <th className="text-right px-4 py-3 font-bold uppercase text-[10px] tracking-wider">Amount (₹)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8EDE9]">
          {result.rows.map((row, i) => (
            row.label && (
              <tr key={i} className={row.strong ? 'bg-[#FBFBF9]' : ''}>
                <td className={`px-4 py-2.5 ${row.strong ? 'font-bold' : ''}`}>{row.label}</td>
                <td className={`px-4 py-2.5 text-right tabular-nums ${row.strong ? 'font-bold' : ''}`}>{row.value}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>

      {/* Comparison (if any) */}
      {result.comparison && (
        <div className="mb-10 page-break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-[#4E5A54]">Regime Comparative Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
                {result.comparison.rows.map((row, i) => (
                   <div key={i} className="border border-[#E8EDE9] p-3 rounded-lg">
                       <p className="text-[9px] uppercase font-bold text-[#9BABA2]">{row.label}</p>
                       <p className="text-lg font-bold tabular-nums">{row.value}</p>
                   </div>
                ))}
            </div>
        </div>
      )}

      {/* Footer / Disclaimer */}
      <div className="mt-auto pt-16 border-t border-[#E8EDE9]">
        <div className="grid grid-cols-2 gap-10">
            <div className="text-[9px] text-[#4E5A54] leading-relaxed">
                <p className="font-bold mb-1 uppercase tracking-wider text-[#1C201E]">Verification Note:</p>
                <p>This is a system-generated preliminary estimation based on current tax provisions for the Assessment Year 2027-28 (FY 2026-27). This document does not constitute a final tax audit report or legal advice.</p>
                <div className="mt-4 p-2 bg-[#F2F5F3] rounded italic border-l-2 border-[#1A4D2E]">
                    Scan the QR code on the website for office directions.
                </div>
            </div>
            <div className="text-right flex flex-col items-end">
                <div className="w-20 h-20 border border-[#E8EDE9] bg-[#FBFBF9] mb-3 flex items-center justify-center p-2">
                    <div className="w-full h-full border border-dashed border-[#D4DAD6]" /> {/* Placeholder for signature / stamp */}
                </div>
                <p className="text-[10px] font-bold text-[#1C201E] uppercase">Authorized Software Output</p>
                <p className="text-[9px] text-[#4E5A54]">TaxNext.in Calculation Engine v2.0</p>
            </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Result Display Component ─────────────────────────────── */
/* ─── Result Display Component ─────────────────────────────── */
function ComputeResult({ result, id, values }) {
  if (!result) return null;

  if (result.error) {
    return (
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
        <AlertCircle size={16} strokeWidth={1.5} className="text-amber-600 shrink-0 mt-0.5" />
        <p className="font-body text-sm text-amber-800">{result.error}</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <PrintReport result={result} id={id} values={values} />
      <div className="mt-8 space-y-6 print:hidden">
        {/* Premium Bento Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-gradient-to-br from-[#1A4D2E] to-[#133b23] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />
            <div className="relative z-10">
              <p className="font-body text-xs uppercase tracking-widest text-white/50 mb-2">{result.highlight.label}</p>
              <h3 className="font-heading font-bold text-5xl tracking-tighter mb-4">{result.highlight.value}</h3>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md border border-white/10">
                  <CheckCircle size={10} /> Verified FY 2026-27
                </span>
                <button 
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                >
                  <FileText size={12} /> Download PDF Result
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-[#E8EDE9] rounded-3xl p-4 flex items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#F2F5F3]/50 to-transparent" />
            <div className="relative z-10 w-full h-full">
              {id === 'gst-calculator' ? (
                 <GSTBreakdownChart 
                   base={parseFloat(result.rows.find(r => r.label.includes('Base')).value.replace(/[₹,]/g, ''))}
                   gst={parseFloat(result.rows.find(r => r.label.includes('Total GST')).value.replace(/[₹,]/g, ''))}
                 />
              ) : (
                <TaxPieChart 
                  data={[
                    { name: 'Tax', value: parseFloat(result.rows.find(r => r.label.includes('Tax after Rebate') || r.label.includes('Total Tax Payable'))?.value.replace(/[₹,]/g, '') || 0) },
                    { name: 'Cess', value: parseFloat(result.rows.find(r => r.label.includes('Cess'))?.value.replace(/[₹,]/g, '') || 0) },
                  ]}
                />
              )}
            </div>
          </div>
        </div>

        {/* Bento Grid Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/40 backdrop-blur-xl rounded-3xl border border-[#E8EDE9] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-heading font-semibold text-[#1C201E]">Detailed Breakdown</h4>
              <div className="w-8 h-8 rounded-lg bg-[#F2F5F3] flex items-center justify-center">
                <BarChart2 size={14} className="text-[#1A4D2E]" />
              </div>
            </div>
            <div className="space-y-3.5">
              {result.rows.map((row, i) => (
                row.label === "" ? (
                  <div key={i} className="h-px bg-[#E8EDE9] my-2" />
                ) : (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="font-body text-[#4E5A54]">{row.label}</span>
                    <span className={`font-body tabular-nums ${row.strong ? 'font-bold text-[#1A4D2E]' : 'text-[#1C201E]'}`}>
                      {row.value}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>

          {result.comparison ? (
            <div className="bg-white rounded-3xl border border-[#E8EDE9] p-6 shadow-sm flex flex-col">
              <h4 className="font-heading font-semibold text-[#1C201E] mb-6">Regime Analysis</h4>
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-4 mb-6">
                  {result.comparison.rows.map((row, i) => (
                    <div key={i} className={`p-4 rounded-2xl border transition-all ${row.strong ? 'bg-[#1A4D2E]/[0.02] border-[#1A4D2E]/20' : 'bg-[#FBFBF9] border-[#E8EDE9]'}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-body text-xs font-semibold text-[#4E5A54] uppercase tracking-wider">{row.label}</span>
                        {row.tag && <span className="bg-[#1A4D2E] text-white text-[8px] px-2 py-0.5 rounded-full font-bold uppercase">{row.tag}</span>}
                      </div>
                      <p className={`font-heading text-xl mt-1 ${row.strong ? 'text-[#1A4D2E] font-bold' : 'text-[#1C201E]'}`}>{row.value}</p>
                    </div>
                  ))}
                </div>
                <div className="h-[140px]">
                  <RegimeComparisonChart 
                     newTax={parseFloat(result.comparison.rows[0].value.replace(/[₹,]/g, ''))}
                     oldTax={parseFloat(result.comparison.rows[1].value.replace(/[₹,]/g, ''))}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#FBFBF9] rounded-3xl border border-[#D4DAD6] p-8 border-dashed flex flex-col items-center justify-center text-center">
               <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                 <Info size={20} className="text-[#1A4D2E]" />
               </div>
               <p className="font-body text-sm text-[#4E5A54] leading-relaxed max-w-[200px]">
                 No comparison available for this computation.
               </p>
            </div>
          )}
        </div>

        {id === 'income-tax' && (
          <InvestmentOptimizer 
            grossIncome={parseFloat(values.income) || 0}
            current80C={parseFloat(values.deductions) || 0}
            oldRegimeTaxFunction={computeOldRegimeTax}
            currentTax={parseFloat(result.comparison ? result.comparison.rows[1].value.replace(/[₹,]/g, '') : result.highlight.value.replace(/[₹,]/g, ''))}
          />
        )}

        <div className="bg-white border border-[#E8EDE9] rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Info size={16} className="text-[#1A4D2E]" />
            <h4 className="font-heading font-semibold text-sm text-[#1C201E]">Compliance Notes</h4>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {result.notes.map((note, i) => (
              <div key={i} className="flex gap-2 items-start">
                <div className="w-1 h-1 rounded-full bg-[#1A4D2E] mt-2 shrink-0" />
                <p className="font-body text-xs text-[#4E5A54] leading-loose">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Calculator definitions ───────────────────────────────── */
const calculators = {
  "income-tax": {
    icon: BarChart2,
    title: "Income Tax Calculator",
    subtitle: "FY 2026-27 (AY 2027-28)",
    desc: "Comprehensive logic including standard deduction (₹75k), 80D, NPS, and Sec 24 benefits.",
    fields: [
      { id: "income",         label: "Gross Annual Income (₹)",        type: "number", placeholder: "e.g., 1200000", helper: "Salary, business, and other sources." },
      { id: "regime",         label: "Tax Regime",                      type: "select", options: ["New Regime (Tax-free up to 12L)", "Old Regime (Classic Slab)"] },
      { id: "deductions",     label: "Section 80C (₹)",                 type: "number", placeholder: "Max ₹1,50,000", helper: "PPF, ELSS, Insurance (Old Regime Only)" },
      { id: "health_ins",     label: "Section 80D (₹)",                 type: "number", placeholder: "Max ₹25k - ₹50k", helper: "Health Insurance Premiums (Old Regime Only)" },
      { id: "home_loan_int", label: "House Loan Interest (₹)",         type: "number", placeholder: "Max ₹2,00,000", helper: "Section 24(b) (Old Regime Only)" },
      { id: "nps_extra",      label: "NPS Contribution (₹)",            type: "number", placeholder: "Max ₹50,000", helper: "Section 80CCD(1B) (Old Regime Only)" },
      { id: "hra",            label: "HRA Exemption Claimed (₹)",       type: "number", placeholder: "0", helper: "Applicable in Old Regime only" },
    ],
  },
  "nps-savings": {
    icon: TrendingUp,
    title: "NPS Tax Engine",
    subtitle: "Tier-1 Tiered Savings",
    desc: "Calculate specifically how much you save via NPS Tier-1 (80CCD(1B)).",
    fields: [
      { id: "nps_amt",      label: "Annual NPS Contribution (₹)",   type: "number", placeholder: "Max ₹50,000" },
      { id: "tax_bracket",  label: "Current Tax Slab",              type: "select", options: ["5%", "10%", "15%", "20%", "25%", "30%"] },
    ],
  },
  "loan-utility": {
    icon: Home,
    title: "Loan-Tax Synergy",
    subtitle: "Section 24(b) Efficiency",
    desc: "Analyze the real cost of your home loan after tax benefits.",
    fields: [
      { id: "loan_amt",     label: "Outstanding Loan (₹)",          type: "number", placeholder: "e.g., 5000000" },
      { id: "int_rate",     label: "Interest Rate (%)",             type: "number", placeholder: "e.g., 9" },
      { id: "tax_bracket",  label: "Current Tax Slab",              type: "select", options: ["5%", "10%", "15%", "20%", "25%", "30%"] },
    ],
  },
  "hra-exemption": {
    icon: ShieldCheck,
    title: "HRA Exemption",
    subtitle: "Section 10(13A)",
    desc: "Salaried employee rent benefit calculation.",
    fields: [
      { id: "basic",   label: "Basic Salary + DA (₹)",  type: "number", placeholder: "e.g., 600000" },
      { id: "hra_rec", label: "HRA Received (₹)",       type: "number", placeholder: "e.g., 240000" },
      { id: "rent",    label: "Actual Rent Paid (₹)",   type: "number", placeholder: "e.g., 180000" },
      { id: "city",    label: "City",                   type: "select", options: ["Metro", "Non-Metro"] },
    ],
  },
  "capital-gains": {
    icon: TrendingDown,
    title: "Capital Gains",
    subtitle: "Post-Budget 2024 Reg",
    desc: "Equity and Property gains under 12.5% LTCG rules.",
    fields: [
      { id: "asset",    label: "Asset Type",            type: "select", options: ["Listed Equity", "Equity Mutual Funds", "Property / Others"] },
      { id: "purchase", label: "Purchase Price (₹)",    type: "number", placeholder: "e.g., 500000" },
      { id: "sale",     label: "Sale Price (₹)",        type: "number", placeholder: "e.g., 800000" },
      { id: "holding",  label: "Period",                type: "select", options: ["STCG (< 1yr)", "LTCG (> 1yr)"] },
    ],
  },
  "gst-calculator": {
    icon: FileText,
    title: "GST Engine",
    subtitle: "B2B / B2C Precision",
    desc: "Inward and outward GST computation.",
    fields: [
      { id: "amount",    label: "Amount (₹)",            type: "number", placeholder: "e.g., 10000" },
      { id: "gst_rate",  label: "GST Rate",              type: "select", options: ["5%", "12%", "18%", "28%"] },
      { id: "calc_type", label: "Type",                  type: "select", options: ["Exclusive (Add GST)", "Inclusive (Extract GST)"] },
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
                  onClick={handleCalculate}
                  className="inline-flex items-center justify-center gap-2 bg-[#1A4D2E] text-white rounded-lg px-7 py-3 font-medium font-body text-sm hover:bg-[#133b23] transition-colors shadow-sm"
                >
                  <Calculator size={15} strokeWidth={1.5} />
                  Calculate
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 border border-[#D4DAD6] text-[#4E5A54] rounded-lg px-5 py-3 font-medium font-body text-sm hover:border-[#1A4D2E] hover:text-[#1A4D2E] transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Result Area */}
              <ComputeResult result={result} id={id} values={values} />
            </div>

            {/* Disclaimer */}
            <div className="flex items-start gap-3 mt-5 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
              <AlertCircle size={16} strokeWidth={1.5} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="font-body text-sm text-amber-800 leading-relaxed">
                <strong>Disclaimer:</strong> This calculator provides general estimates only. It does not constitute professional advice or create any CA-client relationship. Consult a qualified professional for your specific situation.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CompliancePulse />

            <div className="bg-[#1A4D2E] rounded-2xl p-7 text-white shadow-lg overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <ShieldCheck size={80} />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-3 relative z-10">
                Facing a Complicated Tax scenario?
              </h3>
              <p className="font-body text-sm text-white/75 leading-relaxed mb-6 relative z-10">
                Our Chartered Accountants review your specific data to provide a 100% accurate computation.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#1A4D2E] rounded-lg px-5 py-2.5 font-medium font-body text-sm hover:bg-[#F2F5F3] transition-colors"
              >
                Contact Us
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>

            <div className="bg-white rounded-xl border border-[#E8EDE9] p-6 shadow-sm">
              <h3 className="font-heading font-medium text-[#1C201E] text-sm mb-4">Important notes</h3>
              <ul className="space-y-3">
                {[
                  "All computations use FY 2026-27 rates",
                  "Governed by the Income Tax Act, 2025",
                  "Results are indicative — not legally binding",
                  "Cess calculated at 4% on income tax",
                  "For notices, consult a CA directly",
                ].map((note) => (
                  <li key={note} className="flex items-start gap-2.5">
                    <CheckCircle size={13} strokeWidth={1.5} className="text-[#1A4D2E] mt-0.5 shrink-0" />
                    <span className="font-body text-xs text-[#4E5A54] leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>

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
            
            <Link
              to="/calculators"
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
