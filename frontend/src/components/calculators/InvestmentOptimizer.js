import React, { useState, useMemo } from 'react';
import { Lightbulb, ArrowRight, ShieldCheck, TrendingUp, HelpCircle } from 'lucide-react';

const RECOMMENDATIONS = [
  { name: 'ELSS Mutual Fund', type: 'Investment', taxBenefit: '80C', risk: 'Moderate', icon: TrendingUp },
  { name: 'PPF (Public Provid. Fund)', type: 'Saving', taxBenefit: '80C', risk: 'Zero', icon: ShieldCheck },
  { name: 'NPS (Nat. Pension Scheme)', type: 'Retirement', taxBenefit: '80CCD(1B)', risk: 'Low', icon: HelpCircle },
];

export const InvestmentOptimizer = ({ grossIncome, current80C, oldRegimeTaxFunction, currentTax }) => {
  const [target80C, setTarget80C] = useState(Math.min(150000, current80C + 50000));
  
  // Potential savings calculation
  const optimized = useMemo(() => {
    const result = oldRegimeTaxFunction(grossIncome, target80C);
    return {
      tax: result.total,
      savings: Math.max(0, currentTax - result.total)
    };
  }, [grossIncome, target80C, oldRegimeTaxFunction, currentTax]);

  return (
    <div className="mt-8 bg-[#FBFBF9] border border-[#1A4D2E]/20 rounded-2xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#1A4D2E]/10 flex items-center justify-center">
          <Lightbulb className="text-[#1A4D2E]" size={20} />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg text-[#1C201E]">Tax Savings Optimizer</h3>
          <p className="font-body text-xs text-[#4E5A54] uppercase tracking-wider font-medium">80C Max-Out Strategy (Old Regime Only)</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <label className="font-body text-sm font-medium text-[#1C201E]">Hypothetical 80C Investment</label>
              <span className="font-heading font-semibold text-[#1A4D2E] text-lg">₹{target80C.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range"
              min={Math.max(0, current80C)}
              max={150000}
              step={5000}
              value={target80C}
              onChange={(e) => setTarget80C(parseInt(e.target.value))}
              className="w-full h-2 bg-[#E8EDE9] rounded-lg appearance-none cursor-pointer accent-[#1A4D2E]"
            />
            <div className="flex justify-between mt-2 font-body text-[10px] text-[#4E5A54] uppercase tracking-wider">
              <span>Currently Filing: ₹{current80C.toLocaleString('en-IN')}</span>
              <span>Max Cap: ₹1,50,000</span>
            </div>
          </div>

          <div className="bg-[#1A4D2E] text-white p-5 rounded-xl text-center shadow-lg transform transition-transform hover:scale-[1.02]">
            <p className="font-body text-xs text-white/70 uppercase mb-1">Additional Potential Savings</p>
            <p className="font-heading font-bold text-3xl tracking-tight">₹{optimized.savings.toLocaleString('en-IN')}</p>
            <p className="font-body text-[10px] text-white/50 mt-2 uppercase tracking-widest leading-none">Estimate based on Old Regime slabs</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-body text-xs font-semibold text-[#4E5A54] uppercase tracking-wider mb-2">Suggested Instruments</p>
          {RECOMMENDATIONS.map((rec) => {
            const Icon = rec.icon;
            return (
              <div key={rec.name} className="flex items-center justify-between p-3.5 bg-white border border-[#E8EDE9] rounded-xl group hover:border-[#1A4D2E] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F2F5F3] group-hover:bg-[#1A4D2E]/10 flex items-center justify-center transition-colors">
                    <Icon size={14} className="text-[#1A4D2E]" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-[#1C201E] group-hover:text-[#1A4D2E] transition-colors">{rec.name}</p>
                    <p className="font-body text-[10px] text-[#4E5A54]">{rec.type} · Benefit: {rec.taxBenefit}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-body text-[10px] text-[#4E5A54] uppercase tracking-tighter">Risk</p>
                  <p className={`font-body text-[10px] font-bold ${rec.risk === 'Zero' ? 'text-green-600' : 'text-blue-600'}`}>{rec.risk}</p>
                </div>
              </div>
            );
          })}
          <button className="w-full flex items-center justify-center gap-2 font-body text-xs font-semibold text-[#1A4D2E] mt-4 hover:underline">
            View full 80C checklist <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
