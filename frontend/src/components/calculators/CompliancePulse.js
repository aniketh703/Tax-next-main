import React, { useMemo } from 'react';
import { Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const DEADLINES = [
  { id: 1, title: 'Advance Tax (1st Install)', date: '2026-06-15', category: 'Income Tax' },
  { id: 2, title: 'Form 16 Issuance', date: '2026-06-15', category: 'Salaried' },
  { id: 3, title: 'GSTR-1 Monthly Filing', date: '2026-05-11', category: 'GST' },
  { id: 4, title: 'TDS Payment (Apr)', date: '2026-05-07', category: 'Compliance' },
  { id: 5, title: 'ITR Filing (Individuals)', date: '2026-07-31', category: 'Income Tax' },
];

export const CompliancePulse = () => {
  const sortedDeadlines = useMemo(() => {
    const today = new Date();
    return DEADLINES
      .map(d => {
        const deadlineDate = new Date(d.date);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { ...d, daysLeft: diffDays };
      })
      .filter(d => d.daysLeft >= -5) // Show 5 days past deadline
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }, []);

  return (
    <div className="bg-white border border-[#E8EDE9] rounded-2xl p-6 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Clock className="text-[#1A4D2E]" size={18} strokeWidth={1.5} />
          <h3 className="font-heading font-semibold text-base text-[#1C201E]">Compliance Pulse</h3>
        </div>
        <span className="animate-pulse w-2 h-2 rounded-full bg-red-500"></span>
      </div>

      <div className="space-y-4">
        {sortedDeadlines.length > 0 ? (
          sortedDeadlines.slice(0, 3).map((deadline) => (
            <div key={deadline.id} className="relative pl-4 border-l-2 border-[#E8EDE9] hover:border-[#1A4D2E] transition-colors group">
              <div className="flex justify-between items-start mb-1">
                <p className="font-body text-xs font-bold text-[#1C201E] group-hover:text-[#1A4D2E] transition-colors">{deadline.title}</p>
                <div className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                  deadline.daysLeft <= 7 ? 'bg-red-50 text-red-600' : 'bg-[#F2F5F3] text-[#1A4D2E]'
                }`}>
                  {deadline.daysLeft < 0 ? 'Passed' : deadline.daysLeft === 0 ? 'Due Today' : `${deadline.daysLeft} days`}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-body text-[10px] text-[#4E5A54] flex items-center gap-1">
                  <Calendar size={10} />
                  {new Date(deadline.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </p>
                <span className="w-1 h-1 rounded-full bg-[#D4DAD6]"></span>
                <p className="font-body text-[10px] text-[#4E5A54] uppercase tracking-tighter">{deadline.category}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center gap-2 text-[#4E5A54] py-4 italic">
            <CheckCircle size={14} className="text-[#1A4D2E]" />
            <p className="font-body text-xs">All caught up for now!</p>
          </div>
        )}
      </div>

      <button className="w-full mt-6 py-2.5 bg-[#F2F5F3] hover:bg-[#E8EDE9] text-[#1A4D2E] rounded-xl font-body text-xs font-semibold transition-colors">
        Full Compliance Calendar
      </button>
    </div>
  );
};
