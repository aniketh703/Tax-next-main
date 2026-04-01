import { useParams, Link, Navigate } from "react-router-dom";
import {
  ChevronRight, Clock, ArrowRight, BookOpen, AlertCircle, CheckCircle, Calendar
} from "lucide-react";

/* ─── Images ────────────────────────────────────────────────── */
const IMGS = {
  budget: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
  gst:    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
  nri:    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?crop=entropy&cs=srgb&fm=jpg&w=1200&q=80",
};

/* ─── Article registry ──────────────────────────────────────── */
const ARTICLES = {
  "budget-2025-tax-changes": {
    slug: "budget-2025-tax-changes",
    title: "Union Budget 2025: Key Tax Changes for Salaried Individuals",
    tag: "Budget 2025",
    date: "February 1, 2025",
    readTime: "6 min read",
    img: IMGS.budget,
    desc: "An analysis of the major income tax changes in Union Budget 2025 — revised slabs, the ₹12 lakh zero-tax threshold, and what it means for salaried employees.",
    hasFull: true,
    toc: [
      { id: "overview",       label: "Overview" },
      { id: "new-slabs",      label: "New Tax Regime Slabs" },
      { id: "zero-tax",       label: "The ₹12 Lakh Threshold" },
      { id: "std-deduction",  label: "Standard Deduction" },
      { id: "who-benefits",   label: "Who Benefits Most" },
      { id: "action",         label: "What to Do Now" },
    ],
  },
  "gst-compliance-checklist-2025": {
    slug: "gst-compliance-checklist-2025",
    title: "GST Compliance Checklist for Small Businesses in 2025",
    tag: "GST",
    date: "January 2025",
    readTime: "4 min read",
    img: IMGS.gst,
    desc: "A practical checklist every small business owner should follow to stay GST-compliant through the year — returns, ITC, and annual filings.",
    hasFull: true,
    toc: [
      { id: "overview",          label: "Overview" },
      { id: "gstr-1",            label: "GSTR-1 — Outward Supplies" },
      { id: "gstr-3b",           label: "GSTR-3B — Monthly Summary" },
      { id: "qrmp",              label: "QRMP Scheme (Quarterly Filers)" },
      { id: "itc-reconciliation",label: "ITC and GSTR-2B" },
      { id: "annual-return",     label: "Annual Return — GSTR-9" },
      { id: "action-checklist",  label: "Quick Action Checklist" },
    ],
  },
  "nri-itr-filing-guide": {
    slug: "nri-itr-filing-guide",
    title: "ITR Filing for NRIs: A Complete Step-by-Step Guide",
    tag: "NRI Guide",
    date: "December 2024",
    readTime: "7 min read",
    img: IMGS.nri,
    desc: "Everything an NRI needs to know about filing income tax returns in India — eligibility, applicable forms, DTAA claims, and deadlines.",
    hasFull: true,
    toc: [
      { id: "overview",           label: "Overview" },
      { id: "residential-status", label: "Determining Residential Status" },
      { id: "who-must-file",      label: "Who Must File an ITR" },
      { id: "applicable-forms",   label: "Which ITR Form to Use" },
      { id: "dtaa",               label: "DTAA — Claiming Treaty Benefits" },
      { id: "deadlines",          label: "Deadlines and Penalties" },
    ],
  },
  "save-tax-deductions-2024-25": {
    slug: "save-tax-deductions-2024-25",
    title: "How to Save Tax Legally: Top Deductions for FY 2024-25",
    tag: "Tax Planning",
    date: "November 2024",
    readTime: "6 min read",
    img: IMGS.budget,
    desc: "Legal tax-saving options under 80C, 80D, HRA, and other deductions — explained plainly with examples relevant to salaried individuals.",
    hasFull: true,
    toc: [
      { id: "overview",    label: "Overview" },
      { id: "sec-80c",     label: "Section 80C — ₹1.5 Lakh Limit" },
      { id: "sec-80d",     label: "Section 80D — Health Insurance" },
      { id: "hra",         label: "HRA Exemption" },
      { id: "other",       label: "Other Useful Deductions" },
      { id: "comparison",  label: "Old vs New Regime" },
    ],
  },
  "startup-compliance-calendar": {
    slug: "startup-compliance-calendar",
    title: "Startup India: Compliance Calendar and Key Deadlines",
    tag: "Startups",
    date: "October 2024",
    readTime: "5 min read",
    img: IMGS.gst,
    desc: "A founder's guide to statutory compliance — from incorporation to annual ROC filings, TDS, GST, and income tax obligations.",
    hasFull: false,
  },
  "gst-input-tax-credit-explained": {
    slug: "gst-input-tax-credit-explained",
    title: "Understanding Input Tax Credit (ITC) Under GST",
    tag: "GST",
    date: "September 2024",
    readTime: "5 min read",
    img: IMGS.nri,
    desc: "A plain-language explanation of ITC eligibility, conditions under Section 16, GSTR-2B matching, and common mistakes businesses make.",
    hasFull: false,
  },
  "new-vs-old-tax-regime-comparison": {
    slug: "new-vs-old-tax-regime-comparison",
    title: "New vs Old Tax Regime: Which Is Better for You?",
    tag: "Income Tax",
    date: "August 2024",
    readTime: "6 min read",
    img: IMGS.budget,
    desc: "A practical comparison of the two tax regimes for salaried employees — with breakeven analysis based on income and deduction levels.",
    hasFull: false,
  },
  "tds-guide-2024-25": {
    slug: "tds-guide-2024-25",
    title: "TDS: What Payers Need to Know in 2024-25",
    tag: "Compliance",
    date: "July 2024",
    readTime: "4 min read",
    img: IMGS.gst,
    desc: "Rates, thresholds, due dates for deposit, and filing obligations under TDS provisions — a reference guide for businesses and individuals.",
    hasFull: false,
  },
  "nri-banking-fema-nro-nre": {
    slug: "nri-banking-fema-nro-nre",
    title: "FEMA and NRI Banking: NRO, NRE, and FCNR Accounts",
    tag: "NRI Guide",
    date: "June 2024",
    readTime: "5 min read",
    img: IMGS.nri,
    desc: "How NRIs should structure their banking in India — the difference between NRO and NRE accounts, repatriation limits, and tax implications.",
    hasFull: false,
  },
};

/* ─── Shared sub-components ─────────────────────────────────── */
function Callout({ children }) {
  return (
    <div className="bg-[#e8eee9] border border-[#1A4D2E]/20 rounded-xl px-5 py-4 my-2">
      <p className="font-body text-[0.9375rem] text-[#1C201E] font-medium leading-relaxed">{children}</p>
    </div>
  );
}

function Warning({ children }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
      <div className="flex items-start gap-3">
        <AlertCircle size={16} strokeWidth={1.5} className="text-amber-600 shrink-0 mt-0.5" />
        <p className="font-body text-sm text-amber-800 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function SectionH2({ id, children }) {
  return (
    <h2 id={id} className="font-heading font-medium text-[1.5rem] text-[#1C201E] tracking-tight mb-4 scroll-mt-28">
      {children}
    </h2>
  );
}

/* ─── Article 1: Budget 2025 ────────────────────────────────── */
function BudgetArticleContent() {
  return (
    <div className="article-body space-y-6">
      <section id="overview">
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85]">
          Finance Minister Nirmala Sitharaman presented the Union Budget 2025-26 on February 1, 2025.
          For salaried individuals, the most significant change is a substantial revision to the new
          tax regime — one that makes the new regime the default, and the better option, for a large
          section of salaried taxpayers.
        </p>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mt-4">
          This article covers the key changes directly relevant to salaried employees and how each
          change affects your actual tax liability for FY 2025-26.
        </p>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="new-slabs">
        <SectionH2>New Tax Regime Slabs Revised for FY 2025-26</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-5">
          The new tax regime has been restructured with revised slabs and reduced rates for lower
          income brackets. The previous slabs (FY 2024-25) have been replaced with the following
          structure effective from April 1, 2025:
        </p>
        <div className="overflow-x-auto rounded-xl border border-[#E8EDE9] mb-5">
          <table className="w-full text-sm font-body border-collapse">
            <thead>
              <tr className="bg-[#F2F5F3] border-b border-[#E8EDE9]">
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Income Slab</th>
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Rate (FY 2025-26)</th>
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Rate (FY 2024-25)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EDE9]">
              {[
                ["Up to ₹4,00,000",          "Nil",  "Nil (up to ₹3L)"],
                ["₹4,00,001 – ₹8,00,000",    "5%",   "5% (₹3L–7L)"],
                ["₹8,00,001 – ₹12,00,000",   "10%",  "10% (₹7L–10L)"],
                ["₹12,00,001 – ₹16,00,000",  "15%",  "15% (₹10L–12L)"],
                ["₹16,00,001 – ₹20,00,000",  "20%",  "20% (₹12L–15L)"],
                ["₹20,00,001 – ₹24,00,000",  "25%",  "30% (above ₹15L)"],
                ["Above ₹24,00,000",          "30%",  "30%"],
              ].map(([slab, rate25, rate24], i) => (
                <tr key={i} className="hover:bg-[#FBFBF9]">
                  <td className="px-5 py-3 text-[#1C201E]">{slab}</td>
                  <td className="px-5 py-3 font-medium text-[#1A4D2E]">{rate25}</td>
                  <td className="px-5 py-3 text-[#4E5A54]">{rate24}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-body text-sm text-[#4E5A54] leading-relaxed">
          Note: A 4% Health and Education Cess applies on tax computed above. Surcharge applies
          for income above ₹50 lakh.
        </p>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="zero-tax">
        <SectionH2>Effective Zero Tax on Income Up to ₹12 Lakh</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          The Section 87A tax rebate has been extended under the new regime, making the tax
          liability nil for individuals with a net taxable income up to ₹12 lakh.
        </p>
        <Callout>
          For salaried individuals: Standard deduction of ₹75,000 applies before computing
          taxable income. This means a gross salary of ₹12,75,000 results in no income tax
          under the new regime.
        </Callout>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mt-4">
          This is a significant change. Previously, the rebate limit was ₹7 lakh. The extension
          to ₹12 lakh — combined with the standard deduction — effectively removes tax liability
          for a large segment of salaried middle-income taxpayers.
        </p>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="std-deduction">
        <SectionH2>Standard Deduction: ₹75,000 Retained</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85]">
          The standard deduction for salaried employees under the new regime remains at ₹75,000
          (increased from ₹50,000 in the previous budget). No change was made in Budget 2025-26.
          This deduction is automatic — no documentation is required to claim it.
        </p>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mt-4">
          Under the old regime, the standard deduction of ₹50,000 continues. If you are evaluating
          which regime is better, remember that the old regime offers this plus itemised deductions
          (80C, 80D, HRA, etc.) while the new regime offers a flat ₹75,000 deduction and lower slab
          rates.
        </p>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="who-benefits">
        <SectionH2>Who Benefits Most from These Changes</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-5">
          The revised slab structure benefits different income groups in different ways:
        </p>
        <div className="space-y-3 mb-5">
          {[
            { group: "Gross salary up to ₹12,75,000", detail: "Zero income tax under the new regime after standard deduction and 87A rebate.", good: true },
            { group: "Gross salary ₹12,75,001 – ₹20,00,000", detail: "Lower effective tax rate due to revised slab boundaries and reduced marginal rates at intermediate levels.", good: true },
            { group: "Gross salary above ₹20,00,000", detail: "Some benefit from revised slabs, but the 30% rate still applies above ₹24 lakh. Comparison with old regime using actual deductions is advisable.", good: false },
          ].map((item, i) => (
            <div key={i} className={`rounded-xl border p-4 flex gap-3 ${item.good ? "bg-[#e8eee9] border-[#1A4D2E]/20" : "bg-[#F2F5F3] border-[#E8EDE9]"}`}>
              <CheckCircle size={16} strokeWidth={1.5} className={`mt-0.5 shrink-0 ${item.good ? "text-[#1A4D2E]" : "text-[#4E5A54]"}`} />
              <div>
                <p className="font-heading font-medium text-[#1C201E] text-sm mb-0.5">{item.group}</p>
                <p className="font-body text-sm text-[#4E5A54] leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <blockquote className="border-l-2 border-[#1A4D2E] pl-5 my-6">
          <p className="font-heading font-medium text-[#1C201E] text-[1.0625rem] italic leading-snug">
            "For most salaried individuals earning below ₹15 lakh, the new regime is now clearly
            better. The calculation is straightforward. For those above ₹15 lakh with significant
            deductions, a comparison is worth doing before the April 1 default takes effect."
          </p>
          <footer className="font-body text-[0.8125rem] text-[#4E5A54] mt-2">
            — CA. V.V.N.Prasad. Gupta, VNAV Associates
          </footer>
        </blockquote>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="action">
        <SectionH2>What You Should Do Before April 2025</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-5">
          The new regime is the default from FY 2025-26. If you want to continue with the old
          regime, you must formally opt in at the time of ITR filing. Here's a clear checklist:
        </p>
        <ol className="space-y-3 mb-5">
          {[
            "Calculate your total eligible deductions under the old regime (80C, 80D, HRA, home loan, LTA).",
            "Use a tax calculator or consult a CA to compare actual tax under both regimes at your income level.",
            "Inform your employer of your regime choice at the start of the financial year — this affects TDS.",
            "If opting old regime and you have a business income, note that the switch has specific rules.",
            "File your ITR under the correct regime by July 31, 2025 (unless extended).",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#1A4D2E] text-white text-[0.6875rem] font-semibold font-body flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <p className="font-body text-[0.9375rem] text-[#3a4440] leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
        <Warning>
          This article is for general guidance only. Tax liability depends on your specific
          income, deductions, and personal circumstances. Verify figures with CA. Prasad
          or the official Income Tax portal before filing.
        </Warning>
      </section>
    </div>
  );
}

/* ─── Article 2: GST Compliance Checklist ───────────────────── */
function GstArticleContent() {
  return (
    <div className="article-body space-y-6">

      <section id="overview">
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85]">
          GST compliance is not a one-time activity. It requires regular attention to filings,
          reconciliations, and record-keeping throughout the financial year. A missed deadline
          or unreconciled ITC can result in interest, penalties, and blocked credit — all of
          which are avoidable with a structured approach.
        </p>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mt-4">
          This checklist is designed for small and medium businesses registered under GST in
          India. It covers monthly filings, the QRMP scheme for eligible businesses, ITC
          management, and the annual return.
        </p>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="gstr-1">
        <SectionH2>GSTR-1 — Outward Supplies Return</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          GSTR-1 is the monthly (or quarterly) return for reporting all outward supplies —
          that is, the sales invoices you have issued in the period. Your buyers can see their
          purchase credits in GSTR-2B only if you file GSTR-1 accurately and on time.
        </p>

        <div className="overflow-x-auto rounded-xl border border-[#E8EDE9] mb-5">
          <table className="w-full text-sm font-body border-collapse">
            <thead>
              <tr className="bg-[#F2F5F3] border-b border-[#E8EDE9]">
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Filer type</th>
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Frequency</th>
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Due date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EDE9]">
              {[
                ["Turnover above ₹5 crore", "Monthly", "11th of the following month"],
                ["QRMP enrolled (≤ ₹5 crore)", "Quarterly", "13th of the month after the quarter"],
                ["IFF (optional, monthly)", "Monthly", "13th — for B2B invoices only"],
              ].map(([type, freq, due], i) => (
                <tr key={i} className="hover:bg-[#FBFBF9]">
                  <td className="px-5 py-3 text-[#1C201E]">{type}</td>
                  <td className="px-5 py-3 text-[#4E5A54]">{freq}</td>
                  <td className="px-5 py-3 font-medium text-[#1A4D2E]">{due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="space-y-2">
          {[
            "Report all B2B invoices with correct GSTIN of buyer — errors block buyer's ITC.",
            "B2C large invoices (above ₹2.5 lakh, inter-state) must be reported separately.",
            "Credit notes and debit notes must be matched with the original invoice.",
            "HSN/SAC code reporting is mandatory based on turnover thresholds.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle size={14} strokeWidth={1.5} className="text-[#1A4D2E] mt-0.5 shrink-0" />
              <span className="font-body text-[0.9375rem] text-[#4E5A54] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="gstr-3b">
        <SectionH2>GSTR-3B — Monthly Summary Return</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          GSTR-3B is the consolidated monthly return where you report your total outward
          supplies, eligible ITC, and the net GST payable. Tax must be paid before filing
          this return. Late filing attracts interest at 18% per annum on the outstanding
          tax amount, plus a late fee.
        </p>

        <Callout>
          Due date for GSTR-3B: 20th of the following month for most businesses. Staggered
          dates (22nd/24th) apply for businesses under the QRMP scheme.
        </Callout>

        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mt-4 mb-3">
          Key discipline points for GSTR-3B:
        </p>
        <ul className="space-y-2">
          {[
            "Claim ITC only for the portion reflected in GSTR-2B — excess claims are reversed with interest.",
            "Reverse ITC for goods/services used for exempt supplies or personal use (Rule 42/43).",
            "Ensure GST on reverse charge (RCM) is paid in cash — ITC credit cannot be used for RCM payment in the same month.",
            "Reconcile GSTR-3B outward supply totals with GSTR-1 each month.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle size={14} strokeWidth={1.5} className="text-[#1A4D2E] mt-0.5 shrink-0" />
              <span className="font-body text-[0.9375rem] text-[#4E5A54] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="qrmp">
        <SectionH2>QRMP Scheme — Who It's For and How It Works</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          The Quarterly Return Monthly Payment (QRMP) scheme is available to registered
          taxpayers with an aggregate turnover of up to ₹5 crore in the preceding financial
          year. Under QRMP, you file GSTR-1 and GSTR-3B quarterly — but you must still pay
          GST monthly via a challan.
        </p>

        <div className="space-y-3 mb-4">
          {[
            { label: "GSTR-1 filing", detail: "Quarterly — 13th of the month after the quarter. Use IFF to upload B2B invoices monthly if buyers need early ITC visibility." },
            { label: "GSTR-3B filing", detail: "Quarterly — 22nd/24th of the month after the quarter (staggered by state)." },
            { label: "Monthly tax payment", detail: "Pay GST via PMT-06 challan by the 25th of each of the first two months of the quarter. No return filing needed monthly." },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-[#E8EDE9] p-4 bg-white">
              <p className="font-heading font-medium text-[#1C201E] text-sm mb-1">{item.label}</p>
              <p className="font-body text-sm text-[#4E5A54] leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>

        <p className="font-body text-sm text-[#4E5A54] leading-relaxed">
          QRMP reduces filing frequency but not the payment obligation. Businesses that miss
          the monthly challan still incur interest.
        </p>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="itc-reconciliation">
        <SectionH2>ITC and GSTR-2B Reconciliation</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          GSTR-2B is the auto-populated statement of available ITC based on your suppliers'
          GSTR-1 filings. Under Section 16(2)(aa) of the CGST Act, ITC can only be claimed
          to the extent it appears in GSTR-2B.
        </p>

        <blockquote className="border-l-2 border-[#1A4D2E] pl-5 my-5">
          <p className="font-heading font-medium text-[#1C201E] text-[1.0625rem] italic leading-snug">
            "ITC reconciliation is the single most common issue we see during GST audits and
            notices. Businesses that reconcile monthly have almost no exposure; those that don't
            often have large, interest-laden reversals to contend with."
          </p>
          <footer className="font-body text-[0.8125rem] text-[#4E5A54] mt-2">— CA. V.V.N.Prasad. Gupta</footer>
        </blockquote>

        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-3">Reconciliation checklist (do this monthly):</p>
        <ul className="space-y-2 mb-4">
          {[
            "Download GSTR-2B by the 14th of the following month.",
            "Match each supplier invoice in your purchase register against GSTR-2B entries.",
            "For invoices not reflecting in GSTR-2B: contact the supplier to file their GSTR-1 correction.",
            "Reverse ITC claimed in excess of what is in GSTR-2B, with interest if applicable.",
            "Keep records of all purchase invoices — even for cases where ITC is ineligible.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle size={14} strokeWidth={1.5} className="text-[#1A4D2E] mt-0.5 shrink-0" />
              <span className="font-body text-[0.9375rem] text-[#4E5A54] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="annual-return">
        <SectionH2>Annual Return — GSTR-9</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          GSTR-9 is the annual return summarising all your monthly/quarterly filings for the
          financial year. It is due by December 31 of the following financial year (e.g.,
          GSTR-9 for FY 2024-25 is due December 31, 2025).
        </p>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          GSTR-9 is mandatory for businesses with turnover above ₹2 crore. Businesses below
          ₹2 crore may opt to file it voluntarily. GSTR-9C (self-certified reconciliation
          statement) is mandatory for turnover above ₹5 crore.
        </p>
        <Callout>
          Annual return is where discrepancies between your GSTR-1, GSTR-3B, and books are
          surfaced. Businesses that maintain clean monthly reconciliations have virtually
          no issues at GSTR-9 time.
        </Callout>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="action-checklist">
        <SectionH2>Quick Action Checklist</SectionH2>
        <div className="overflow-x-auto rounded-xl border border-[#E8EDE9]">
          <table className="w-full text-sm font-body border-collapse">
            <thead>
              <tr className="bg-[#F2F5F3] border-b border-[#E8EDE9]">
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Task</th>
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Frequency</th>
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EDE9]">
              {[
                ["File GSTR-1",           "Monthly",   "11th"],
                ["Pay GST (PMT-06)",      "Monthly",   "25th (QRMP only)"],
                ["File GSTR-3B",          "Monthly",   "20th (or 22nd/24th for QRMP)"],
                ["Reconcile GSTR-2B ITC", "Monthly",   "After 14th"],
                ["File GSTR-9",           "Annually",  "December 31"],
                ["File GSTR-9C",          "Annually",  "December 31 (if > ₹5 crore)"],
              ].map(([task, freq, due], i) => (
                <tr key={i} className="hover:bg-[#FBFBF9]">
                  <td className="px-5 py-3 text-[#1C201E]">{task}</td>
                  <td className="px-5 py-3 text-[#4E5A54]">{freq}</td>
                  <td className="px-5 py-3 font-medium text-[#1A4D2E]">{due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-body text-sm text-[#4E5A54] mt-4 leading-relaxed">
          Due dates shown are standard. Extensions or changes may be notified by GSTN. Always
          verify on the GST portal or with your CA.
        </p>
        <Warning>
          GST law is amended frequently. This article reflects provisions as of January 2025.
          Consult CA. Prasad for guidance specific to your business turnover, industry, and
          supply type.
        </Warning>
      </section>
    </div>
  );
}

/* ─── Article 3: NRI ITR Filing ─────────────────────────────── */
function NriArticleContent() {
  return (
    <div className="article-body space-y-6">

      <section id="overview">
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85]">
          Indian citizens living abroad often assume that because they are non-residents,
          they have no Indian tax obligations. That is not always the case. If you have
          income from India — rent, interest, capital gains, or a salary paid in India —
          you may be required to file an income tax return, irrespective of where you live.
        </p>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mt-4">
          This guide explains how to determine your residential status, when you must file,
          which ITR form to use, and how to claim treaty benefits if you are taxed in both
          countries.
        </p>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="residential-status">
        <SectionH2>Determining Your Residential Status</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          Your tax liability in India depends first on your residential status under the
          Income Tax Act. This is determined afresh each financial year (April 1 to March 31)
          based on days of physical presence in India.
        </p>

        <div className="space-y-3 mb-5">
          {[
            {
              status: "Resident and Ordinarily Resident (ROR)",
              criteria: "Present in India for 182 days or more in the financial year, AND 365 days or more in the preceding 4 years.",
              tax: "Global income taxable in India.",
            },
            {
              status: "Non-Resident (NR)",
              criteria: "Present in India for fewer than 182 days in the financial year (standard test). A secondary test applies for individuals of Indian origin visiting India.",
              tax: "Only India-sourced income is taxable.",
            },
            {
              status: "Resident but Not Ordinarily Resident (RNOR)",
              criteria: "An intermediate status — applicable to returning NRIs who were non-resident in 9 out of the preceding 10 years, or were in India for less than 729 days in the preceding 7 years.",
              tax: "India-sourced income taxable; most foreign income excluded.",
            },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-[#E8EDE9] p-5 bg-white">
              <p className="font-heading font-semibold text-[#1A4D2E] text-sm mb-1">{item.status}</p>
              <p className="font-body text-sm text-[#4E5A54] leading-relaxed mb-2">
                <span className="font-medium text-[#1C201E]">Criteria: </span>{item.criteria}
              </p>
              <p className="font-body text-sm text-[#4E5A54] leading-relaxed">
                <span className="font-medium text-[#1C201E]">Tax scope: </span>{item.tax}
              </p>
            </div>
          ))}
        </div>

        <Callout>
          If you are an Indian citizen who is a member of the crew of a foreign-going ship,
          the 182-day threshold is reduced to 60 days for NR status. Budget 2020 also
          introduced a deemed-resident rule for citizens with India-sourced income above
          ₹15 lakh who are not taxed in any country — consult a CA if this might apply.
        </Callout>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="who-must-file">
        <SectionH2>Who Must File an ITR</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          As an NRI, you are required to file an income tax return in India if your taxable
          income from Indian sources exceeds the basic exemption limit of ₹2.5 lakh in the
          financial year. Common sources of India income for NRIs include:
        </p>
        <ul className="space-y-2 mb-5">
          {[
            "Rental income from property in India",
            "Interest from NRO savings accounts, fixed deposits, or bonds (NRE interest is tax-exempt in India)",
            "Capital gains from sale of property, shares, or mutual funds in India",
            "Salary income for services rendered in India",
            "Pension from Indian employer",
            "Dividends from Indian companies",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-[#1A4D2E] mt-2 shrink-0" />
              <span className="font-body text-[0.9375rem] text-[#4E5A54]">{item}</span>
            </li>
          ))}
        </ul>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85]">
          Even if tax has already been deducted at source (TDS) from your income, you may
          need to file an ITR to claim a refund if excess TDS was deducted, or to carry
          forward capital losses.
        </p>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="applicable-forms">
        <SectionH2>Which ITR Form to Use</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          The ITR form for NRIs depends on your income type:
        </p>
        <div className="overflow-x-auto rounded-xl border border-[#E8EDE9] mb-4">
          <table className="w-full text-sm font-body border-collapse">
            <thead>
              <tr className="bg-[#F2F5F3] border-b border-[#E8EDE9]">
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">ITR Form</th>
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Applicable to NRIs with…</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EDE9]">
              {[
                ["ITR-1 (Sahaj)", "Not applicable — NRIs cannot use ITR-1"],
                ["ITR-2", "Salary, house property, capital gains, foreign income — most NRIs use this"],
                ["ITR-3", "Business or professional income from India"],
                ["ITR-4 (Sugam)", "Not applicable — NRIs cannot use ITR-4"],
              ].map(([form, desc], i) => (
                <tr key={i} className={`hover:bg-[#FBFBF9] ${form.includes("Not applicable") ? "opacity-60" : ""}`}>
                  <td className="px-5 py-3 font-medium text-[#1C201E]">{form}</td>
                  <td className="px-5 py-3 text-[#4E5A54]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-body text-sm text-[#4E5A54] leading-relaxed">
          Most NRIs with rental income, capital gains from shares/property, or interest income
          will file ITR-2. If you also carry on a business or profession in India, ITR-3 applies.
        </p>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="dtaa">
        <SectionH2>DTAA — Claiming Treaty Benefits</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          India has signed Double Taxation Avoidance Agreements (DTAA) with over 90 countries,
          including the USA, UAE, UK, Canada, Singapore, Australia, and Germany. If your income
          is being taxed in both your country of residence and in India, you can claim relief
          under the applicable DTAA to avoid double taxation.
        </p>

        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          To claim DTAA benefits, you must:
        </p>

        <ol className="space-y-3 mb-5">
          {[
            "Obtain a Tax Residency Certificate (TRC) from the tax authority in your country of residence. This is the primary document establishing your treaty entitlement.",
            "Submit Form 10F to the Income Tax Department of India — either online or as an annexure to your ITR. Form 10F includes your name, address, country of residence, TIN in the foreign country, and period of residence.",
            "Claim the treaty benefit in your ITR return by referencing the applicable DTAA article and attaching supporting documents.",
            "Keep documentation of the foreign tax paid — foreign tax credit is generally allowed under Section 90 or 91 of the Income Tax Act.",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#1A4D2E] text-white text-[0.6875rem] font-semibold font-body flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <p className="font-body text-[0.9375rem] text-[#3a4440] leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>

        <blockquote className="border-l-2 border-[#1A4D2E] pl-5 my-5">
          <p className="font-heading font-medium text-[#1C201E] text-[1.0625rem] italic leading-snug">
            "NRIs from UAE often assume there is no Indian tax on their Indian income because UAE
            has no personal income tax. But the DTAA with UAE does not fully exempt all types
            of Indian-source income. TDS is still deducted by Indian payers, and a return is
            required to claim refunds or lower TDS rates."
          </p>
          <footer className="font-body text-[0.8125rem] text-[#4E5A54] mt-2">— CA. V.V.N.Prasad. Gupta</footer>
        </blockquote>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="deadlines">
        <SectionH2>Deadlines and Penalties</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          The standard ITR filing deadline for NRIs is July 31 of the assessment year
          (i.e., July 31, 2025 for FY 2024-25). If you have foreign assets or signing
          authority over foreign accounts, an audit is required and the deadline extends
          to October 31.
        </p>
        <div className="overflow-x-auto rounded-xl border border-[#E8EDE9] mb-4">
          <table className="w-full text-sm font-body border-collapse">
            <thead>
              <tr className="bg-[#F2F5F3] border-b border-[#E8EDE9]">
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Situation</th>
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EDE9]">
              {[
                ["Standard ITR filing",                  "July 31, 2025"],
                ["Accounts requiring audit",             "October 31, 2025"],
                ["Belated return (with penalty)",        "December 31, 2025"],
                ["Updated return (ITR-U, with penalty)", "Within 24 months of the end of AY"],
              ].map(([situation, deadline], i) => (
                <tr key={i} className="hover:bg-[#FBFBF9]">
                  <td className="px-5 py-3 text-[#1C201E]">{situation}</td>
                  <td className="px-5 py-3 font-medium text-[#1A4D2E]">{deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-relaxed mb-3">
          Missing the July 31 deadline results in a late filing fee of ₹5,000 (₹1,000 if
          income is below ₹5 lakh). Interest under Section 234A on unpaid taxes is 1% per
          month from the due date.
        </p>
        <Warning>
          NRI taxation involves both Indian tax law and the laws of your country of residence.
          This article covers Indian obligations only. Ensure you are also compliant in your
          country of residence. CA. Prasad handles NRI ITR filings including DTAA applications
          and lower TDS certificates.
        </Warning>
      </section>
    </div>
  );
}

/* ─── Article 4: Tax Saving Deductions ──────────────────────── */
function TaxSavingArticleContent() {
  return (
    <div className="article-body space-y-6">

      <section id="overview">
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85]">
          For salaried individuals who have opted for the old tax regime, or are evaluating
          whether to do so, deductions are the primary mechanism to reduce taxable income
          legally. The Indian tax code provides several well-structured deductions — each with
          specific eligibility conditions, limits, and documentation requirements.
        </p>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mt-4">
          This article covers the most commonly used deductions for FY 2024-25, with practical
          examples and a final comparison of whether the old regime is worth it for different
          income levels.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 mt-4">
          <p className="font-body text-sm text-amber-800">
            <span className="font-semibold">Important: </span>Deductions under Sections 80C, 80D,
            HRA etc. are available only under the <span className="font-semibold">old tax regime</span>.
            Under the new regime (default from FY 2023-24), most deductions are not available
            except the standard deduction of ₹75,000.
          </p>
        </div>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="sec-80c">
        <SectionH2>Section 80C — ₹1.5 Lakh Limit</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          Section 80C allows a deduction of up to ₹1,50,000 per year across a wide range of
          investments and payments. The deduction reduces your gross total income directly —
          at the 30% tax bracket, ₹1.5 lakh in 80C investments saves ₹46,800 in tax
          (including cess).
        </p>

        <div className="overflow-x-auto rounded-xl border border-[#E8EDE9] mb-4">
          <table className="w-full text-sm font-body border-collapse">
            <thead>
              <tr className="bg-[#F2F5F3] border-b border-[#E8EDE9]">
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Instrument</th>
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EDE9]">
              {[
                ["ELSS Mutual Funds",         "Lowest lock-in among 80C options (3 years). Market-linked returns."],
                ["EPF / Voluntary PF",        "Employer PF also qualifies. Interest is tax-free on standard conditions."],
                ["PPF",                       "15-year lock-in. Interest and maturity amount tax-free."],
                ["NSC (National Savings Cert)","5-year post office scheme. Accrued interest is also eligible for 80C."],
                ["5-Year Tax Saving FD",       "Bank FDs with 5-year lock-in. Interest is taxable."],
                ["Life Insurance Premium",     "LIC or any life insurance for self, spouse, and children."],
                ["Home Loan — Principal",      "Principal repayment of home loan. Property must not be sold within 5 years."],
                ["Children's Tuition Fees",   "For up to 2 children in a full-time educational institution in India."],
              ].map(([item, note], i) => (
                <tr key={i} className="hover:bg-[#FBFBF9]">
                  <td className="px-5 py-3 font-medium text-[#1C201E] whitespace-nowrap">{item}</td>
                  <td className="px-5 py-3 text-[#4E5A54]">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout>
          EPF contributions are automatic for most salaried employees, so a portion of your
          80C limit is typically already used. Check your salary slip before investing further.
        </Callout>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="sec-80d">
        <SectionH2>Section 80D — Health Insurance Premium</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          Section 80D allows deduction for health insurance premiums — over and above the
          80C limit. This is one of the few deductions that is useful even at lower income
          levels.
        </p>
        <div className="space-y-3 mb-4">
          {[
            { group: "Self, spouse and children (age below 60)", deduction: "Up to ₹25,000" },
            { group: "Self, spouse and children (any insured above 60)", deduction: "Up to ₹50,000" },
            { group: "Parent's premium (parents below 60)", deduction: "Additional ₹25,000" },
            { group: "Parent's premium (parents above 60)", deduction: "Additional ₹50,000" },
            { group: "Preventive health check-up (sub-limit)", deduction: "Up to ₹5,000 (within above limits)" },
          ].map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-4 py-3 border-b border-[#E8EDE9] last:border-0">
              <span className="font-body text-[0.9375rem] text-[#4E5A54]">{item.group}</span>
              <span className="font-body text-sm font-medium text-[#1A4D2E] whitespace-nowrap">{item.deduction}</span>
            </div>
          ))}
        </div>
        <p className="font-body text-sm text-[#4E5A54] leading-relaxed">
          Maximum combined deduction under 80D: ₹1,00,000 (if you and both parents are
          senior citizens). Premium must be paid by any mode other than cash (except
          preventive health check-up payments).
        </p>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="hra">
        <SectionH2>HRA Exemption — House Rent Allowance</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-4">
          If you receive HRA as part of your salary and you pay rent for your accommodation,
          you can claim an exemption under Section 10(13A). The exempt amount is the
          <em> lowest</em> of the following three:
        </p>

        <div className="space-y-3 mb-5">
          {[
            { rule: "Actual HRA received from employer" },
            { rule: "Actual rent paid minus 10% of basic salary" },
            { rule: "50% of basic salary (for metros: Delhi, Mumbai, Chennai, Kolkata) or 40% for non-metros" },
          ].map((item, i) => (
            <div key={i} className="rounded-xl bg-[#F2F5F3] border border-[#E8EDE9] px-5 py-3 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#1A4D2E] text-white text-[0.6875rem] font-semibold font-body flex items-center justify-center shrink-0">{i + 1}</span>
              <p className="font-body text-[0.9375rem] text-[#1C201E]">{item.rule}</p>
            </div>
          ))}
        </div>

        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-3">
          <strong>Example:</strong> Basic salary ₹6,00,000/year. HRA received ₹2,40,000/year.
          Rent paid ₹2,40,000/year (₹20,000/month) in Bengaluru (non-metro).
        </p>
        <ul className="space-y-1 font-body text-[0.9375rem] text-[#4E5A54] mb-4 pl-4">
          <li>Actual HRA: ₹2,40,000</li>
          <li>Rent − 10% basic: ₹2,40,000 − ₹60,000 = ₹1,80,000</li>
          <li>40% of basic (non-metro): ₹2,40,000</li>
          <li className="font-medium text-[#1A4D2E]">Exempt HRA = minimum = ₹1,80,000</li>
        </ul>
        <p className="font-body text-sm text-[#4E5A54] leading-relaxed">
          If rent exceeds ₹1 lakh per year (₹8,333/month), the landlord's PAN must be
          provided to the employer. If you own a house in the same city, HRA exemption
          is not available.
        </p>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="other">
        <SectionH2>Other Useful Deductions</SectionH2>
        <div className="space-y-4">
          {[
            {
              section: "Section 80CCD(1B) — NPS",
              detail: "An additional deduction of ₹50,000 for contributions to NPS Tier-I account, over and above the ₹1.5 lakh 80C limit. Effective total: ₹2,00,000 in retirement-focused deductions.",
            },
            {
              section: "Section 24 — Home Loan Interest",
              detail: "Deduction of up to ₹2,00,000 per year for interest paid on a home loan for a self-occupied property. No limit for let-out property (but set-off against other heads is capped at ₹2 lakh).",
            },
            {
              section: "Section 80E — Education Loan Interest",
              detail: "Deduction on interest paid for higher education loan — no upper limit. Available for 8 years from the year the repayment begins, for the loan taken for self, spouse, or children.",
            },
            {
              section: "Section 80TTA — Savings Interest",
              detail: "Deduction up to ₹10,000 on interest from savings bank accounts (not FDs). For senior citizens, Section 80TTB provides ₹50,000 covering all interest income.",
            },
            {
              section: "Section 80G — Donations",
              detail: "50% or 100% deduction for donations to notified charitable funds and institutions. PM Relief Fund and certain national funds qualify for 100% deduction.",
            },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-[#E8EDE9] bg-white p-5">
              <p className="font-heading font-semibold text-[#1A4D2E] text-sm mb-1.5">{item.section}</p>
              <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-[#E8EDE9]" />

      <section id="comparison">
        <SectionH2>Old vs New Regime — When Do Deductions Pay Off?</SectionH2>
        <p className="font-body text-[1.0625rem] text-[#3a4440] leading-[1.85] mb-5">
          For deductions under the old regime to be worthwhile, your total deduction value must
          produce a tax saving greater than the differential tax advantage of the new regime's
          lower slab rates.
        </p>

        <div className="overflow-x-auto rounded-xl border border-[#E8EDE9] mb-5">
          <table className="w-full text-sm font-body border-collapse">
            <thead>
              <tr className="bg-[#F2F5F3] border-b border-[#E8EDE9]">
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Gross salary</th>
                <th className="text-left px-5 py-3 font-semibold text-[#1C201E] text-[0.8125rem]">Old regime favoured if deductions exceed…</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EDE9]">
              {[
                ["₹10,00,000",  "~ ₹3,50,000 (80C + 80D + HRA combined)"],
                ["₹15,00,000",  "~ ₹4,25,000"],
                ["₹20,00,000",  "~ ₹4,75,000"],
                ["₹30,00,000",  "~ ₹5,50,000+"],
              ].map(([salary, breakeven], i) => (
                <tr key={i} className="hover:bg-[#FBFBF9]">
                  <td className="px-5 py-3 font-medium text-[#1C201E]">{salary}</td>
                  <td className="px-5 py-3 text-[#4E5A54]">{breakeven}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <blockquote className="border-l-2 border-[#1A4D2E] pl-5 my-5">
          <p className="font-heading font-medium text-[#1C201E] text-[1.0625rem] italic leading-snug">
            "The calculation is individual. If you have a home loan, pay significant rent, and
            fully utilise 80C and 80D — there is a reasonable chance the old regime still works
            for you above ₹15 lakh. Below that, the new regime is almost always better without
            needing a detailed calculation."
          </p>
          <footer className="font-body text-[0.8125rem] text-[#4E5A54] mt-2">— CA. V.V.N.Prasad. Gupta</footer>
        </blockquote>

        <Warning>
          This article reflects deduction provisions for FY 2024-25 under the old tax regime.
          Breakeven figures are approximate and depend on income composition, surcharge, and
          cess. For a precise comparison at your income level, consult CA. Prasad.
        </Warning>
      </section>
    </div>
  );
}

/* ─── Article dispatcher ────────────────────────────────────── */
function ArticleContent({ slug }) {
  const map = {
    "budget-2025-tax-changes":        <BudgetArticleContent />,
    "gst-compliance-checklist-2025":  <GstArticleContent />,
    "nri-itr-filing-guide":           <NriArticleContent />,
    "save-tax-deductions-2024-25":    <TaxSavingArticleContent />,
  };
  return map[slug] || null;
}

/* ─── Coming Soon state ─────────────────────────────────────── */
function ComingSoonContent({ article }) {
  return (
    <div className="space-y-6">
      <div className="bg-[#F2F5F3] rounded-2xl border border-[#E8EDE9] p-8 text-center">
        <BookOpen size={28} strokeWidth={1.5} className="text-[#1A4D2E] mx-auto mb-4" />
        <h3 className="font-heading font-medium text-xl text-[#1C201E] mb-3">
          Full article coming soon.
        </h3>
        <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-relaxed max-w-md mx-auto mb-6">
          CA. Prasad is currently preparing the complete version of this article. You can read
          a summary below and subscribe to be notified when it's published.
        </p>
        <p className="font-body text-[0.9375rem] text-[#4E5A54] leading-[1.8] max-w-lg mx-auto italic border-l-2 border-[#E8EDE9] pl-5 text-left">
          {article.desc}
        </p>
      </div>

      <div className="bg-[#1A4D2E] rounded-2xl p-7 text-white text-center">
        <p className="font-heading font-medium text-lg mb-2">Get notified when this is published</p>
        <p className="font-body text-sm text-white/70 mb-5">
          CA. Prasad writes every article personally. New articles published monthly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 h-10 rounded-lg px-4 text-sm font-body text-[#1C201E] bg-white outline-none focus:ring-2 focus:ring-white"
          />
          <button className="h-10 bg-white/15 border border-white/25 text-white rounded-lg px-5 text-sm font-medium font-body hover:bg-white/20 transition-colors whitespace-nowrap">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Sidebar ────────────────────────────────────────────────── */
function Sidebar({ article }) {
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <div className="space-y-5">
      {article.hasFull && article.toc && (
        <div data-testid="article-toc" className="bg-white rounded-xl border border-[#E8EDE9] p-5 shadow-sm">
          <p className="font-body text-[0.6875rem] uppercase tracking-[0.12em] font-semibold text-[#4E5A54] mb-3">
            In this article
          </p>
          <nav className="space-y-1">
            {article.toc.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left font-body text-sm text-[#4E5A54] hover:text-[#1A4D2E] py-1 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="bg-white rounded-xl border border-[#E8EDE9] p-5 shadow-sm">
        <p className="font-body text-[0.6875rem] uppercase tracking-[0.12em] font-semibold text-[#4E5A54] mb-3">
          Written by
        </p>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#e8eee9] flex items-center justify-center shrink-0">
            <span className="font-heading font-semibold text-[#1A4D2E] text-sm">CA</span>
          </div>
          <div>
            <p className="font-heading font-medium text-[#1C201E] text-sm leading-snug">
              CA. V.V.N.Prasad. Gupta
            </p>
            <p className="font-body text-xs text-[#4E5A54] mt-0.5">
              Founder, VNAV Associates · ICAI Registered
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#1A4D2E] rounded-xl p-5 text-white">
        <p className="font-heading font-semibold text-base mb-2">
          Have a specific question?
        </p>
        <p className="font-body text-sm text-white/75 leading-relaxed mb-4">
          CA. Prasad can review your specific situation and advise accurately.
        </p>
        <Link
          to="/contact"
          data-testid="article-cta"
          className="inline-flex items-center gap-2 bg-white text-[#1A4D2E] rounded-lg px-4 py-2.5 font-medium font-body text-sm hover:bg-[#F2F5F3] transition-colors w-full justify-center"
        >
          Contact Us
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[#E8EDE9] p-5 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-body text-[#4E5A54]">
          <Calendar size={12} strokeWidth={1.5} />
          <span>Published {article.date}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-body text-[#4E5A54]">
          <Clock size={12} strokeWidth={1.5} />
          <span>{article.readTime}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-body text-[#4E5A54]">
          <BookOpen size={12} strokeWidth={1.5} />
          <span>{article.tag}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Related articles ──────────────────────────────────────── */
function RelatedArticles({ currentSlug }) {
  const related = Object.values(ARTICLES)
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 3);

  return (
    <section className="mt-14 pt-10 border-t border-[#E8EDE9]">
      <h3 className="font-heading font-medium text-xl text-[#1C201E] mb-6">More articles</h3>
      <div className="grid sm:grid-cols-3 gap-5">
        {related.map((art) => (
          <Link
            key={art.slug}
            to={`/insights/${art.slug}`}
            data-testid={`related-${art.slug}`}
            className="group block bg-white rounded-xl border border-[#E8EDE9] overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-32 overflow-hidden bg-[#F2F5F3]">
              <img
                src={art.img}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <span className="font-body text-[0.6875rem] font-semibold text-[#1A4D2E] uppercase tracking-wide">
                {art.tag}
              </span>
              <h4 className="font-heading font-medium text-sm text-[#1C201E] mt-1 leading-snug group-hover:text-[#1A4D2E] transition-colors line-clamp-2">
                {art.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function InsightDetail() {
  const { slug } = useParams();
  const article = ARTICLES[slug];

  if (!article) return <Navigate to="/insights" replace />;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E8EDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-5 text-sm text-[#4E5A54] font-body flex-wrap">
            <Link to="/" className="hover:text-[#1A4D2E] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-[#D4DAD6]" aria-hidden="true" />
            <Link to="/insights" className="hover:text-[#1A4D2E] transition-colors">Insights</Link>
            <ChevronRight size={14} className="text-[#D4DAD6]" aria-hidden="true" />
            <span aria-current="page" className="text-[#1C201E] font-medium truncate max-w-[200px]">{article.tag}</span>
          </nav>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#e8eee9] text-[#1A4D2E] text-[0.6875rem] font-semibold font-body px-2.5 py-0.5 rounded-full">
              {article.tag}
            </span>
            {article.hasFull && (
              <span className="bg-[#F2F5F3] text-[#4E5A54] text-[0.6875rem] font-medium font-body px-2.5 py-0.5 rounded-full">
                Full article
              </span>
            )}
          </div>
          <h1 className="font-heading font-semibold text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] tracking-tight leading-[1.1] text-[#1C201E] max-w-3xl mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-body text-[#4E5A54]">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#e8eee9] flex items-center justify-center text-[0.6rem] font-semibold text-[#1A4D2E] font-heading">CA</span>
              CA. V.V.N.Prasad. Gupta
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} strokeWidth={1.5} />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} strokeWidth={1.5} />
              {article.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* ── Hero image ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-96 bg-[#F2F5F3]">
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ── Content ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">

          <div data-testid="article-body" className="lg:col-span-2">
            {article.hasFull
              ? <ArticleContent slug={slug} />
              : <ComingSoonContent article={article} />
            }
            {article.hasFull && <RelatedArticles currentSlug={slug} />}
          </div>

          <div data-testid="article-sidebar" className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Sidebar article={article} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Final CTA band ────────────────────────────── */}
      <section className="bg-[#1A4D2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-heading font-semibold text-[1.625rem] sm:text-[1.875rem] text-white tracking-tight mb-3">
              Need guidance on your specific situation?
            </h2>
            <p className="font-body text-sm text-white/70 mb-6 leading-relaxed">
              General articles have limits. For advice tailored to your income, deductions, and
              filing circumstances, speak directly with CA. Prasad.
            </p>
            <Link
              to="/contact"
              data-testid="article-bottom-cta"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1A4D2E] rounded-lg px-7 py-3 font-medium font-body text-[0.9375rem] hover:bg-[#F2F5F3] transition-colors shadow-sm"
            >
              Contact Us
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
