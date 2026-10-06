import { DollarSign, Receipt, CheckCircle2 } from "lucide-react";

export const PaymentSummary = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div className="pb-4 border-b border-[#F1F5F9]">
        <h2 className="text-base font-bold text-[#0F172A]">Payment Summary</h2>
        <p className="text-xs text-[#64748B]">August 2026</p>
      </div>

      {/* 3 Metric Cards matching Figma */}
      <div className="space-y-3 my-4">
        {/* Total Payments */}
        <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] text-[#0284C7] flex items-center justify-center font-bold flex-shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-[#0F172A]">$79,204</div>
            <div className="text-xs font-semibold text-[#64748B]">Total Payments</div>
          </div>
        </div>

        {/* Pending Deposits */}
        <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold flex-shrink-0">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-[#0F172A]">$14,620</div>
            <div className="text-xs font-semibold text-[#64748B]">Pending Deposits</div>
          </div>
        </div>

        {/* Released Deposits */}
        <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center font-bold flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-[#0F172A]">$31,480</div>
            <div className="text-xs font-semibold text-[#64748B]">Released Deposits</div>
          </div>
        </div>
      </div>

      {/* Collection Rate Progress Bar */}
      <div className="pt-2">
        <div className="text-[11px] font-bold text-[#64748B] tracking-wider uppercase mb-1">
          Collection Rate
        </div>
        <div className="text-2xl font-black text-[#0284C7] mb-2">94.8%</div>
        <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
          <div
            className="h-full bg-[#0284C7] rounded-full"
            style={{ width: "94.8%" }}
          />
        </div>
      </div>
    </div>
  );
};
