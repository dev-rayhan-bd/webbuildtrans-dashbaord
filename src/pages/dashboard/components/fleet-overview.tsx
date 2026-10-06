import { ArrowUp } from "lucide-react";

export const FleetOverview = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-[#0F172A]">Fleet Overview</h2>
        <p className="text-xs text-[#64748B]">75 total vehicles</p>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4 my-4">
        {/* Available */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-[#0F172A]">Available</span>
            <span className="font-bold text-[#0F172A]">
              23 <span className="text-[#94A3B8] font-normal">/ 75</span>
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
            <div
              className="h-full bg-[#10B981] rounded-full transition-all duration-500"
              style={{ width: `${(23 / 75) * 100}%` }}
            />
          </div>
        </div>

        {/* Rented */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-[#0F172A]">Rented</span>
            <span className="font-bold text-[#0F172A]">
              47 <span className="text-[#94A3B8] font-normal">/ 75</span>
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
            <div
              className="h-full bg-[#0284C7] rounded-full transition-all duration-500"
              style={{ width: `${(47 / 75) * 100}%` }}
            />
          </div>
        </div>

        {/* Maintenance */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-[#0F172A]">Maintenance</span>
            <span className="font-bold text-[#0F172A]">
              5 <span className="text-[#94A3B8] font-normal">/ 75</span>
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
            <div
              className="h-full bg-[#F59E0B] rounded-full transition-all duration-500"
              style={{ width: `${(5 / 75) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Fleet Utilization Rate card */}
      <div className="p-4 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD]/60 text-center">
        <div className="text-3xl font-black text-[#0284C7] tracking-tight">62.7%</div>
        <div className="text-xs font-semibold text-[#0F172A] mt-1">Fleet Utilization Rate</div>
        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16A34A] mt-1">
          <ArrowUp className="w-3 h-3 stroke-[3]" /> +4.2% vs last month
        </div>
      </div>
    </div>
  );
};
