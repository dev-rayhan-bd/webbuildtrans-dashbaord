import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconBgColor: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  iconBgColor,
}) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
      {/* Top icon and pill badge */}
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm",
            iconBgColor
          )}
        >
          {icon}
        </div>

        <span
          className={cn(
            "inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded-full",
            isPositive
              ? "text-[#16A34A] bg-[#DCFCE7]"
              : "text-[#DC2626] bg-[#FEE2E2]"
          )}
        >
          {isPositive ? (
            <ArrowUp className="w-3 h-3 stroke-[3]" />
          ) : (
            <ArrowDown className="w-3 h-3 stroke-[3]" />
          )}
          {change}
        </span>
      </div>

      {/* Value */}
      <div className="mt-4">
        <div className="text-[26px] font-black text-[#0F172A] tracking-tight leading-none">
          {value}
        </div>
      </div>

      {/* Label */}
      <div className="mt-2 text-xs font-semibold text-[#64748B]">
        {title}
      </div>
    </div>
  );
};
