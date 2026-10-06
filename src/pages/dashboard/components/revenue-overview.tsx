import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", actual: 32000, target: 28000 },
  { month: "Feb", actual: 38000, target: 35000 },
  { month: "Mar", actual: 45000, target: 40000 },
  { month: "Apr", actual: 52000, target: 48000 },
  { month: "May", actual: 59000, target: 55000 },
  { month: "Jun", actual: 68000, target: 62000 },
  { month: "Jul", actual: 74000, target: 70000 },
  { month: "Aug", actual: 79200, target: 75000 },
];

export const RevenueOverview = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">Revenue Overview</h2>
          <p className="text-xs text-[#64748B]">Actual vs Target · 2026</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-black text-[#0284C7] tracking-tight">$436.2K</div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[180px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284C7" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0284C7" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 10 }}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0F172A",
                borderRadius: "8px",
                border: "none",
                color: "#FFFFFF",
                fontSize: "11px",
              }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#CBD5E1"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="transparent"
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#0284C7"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#revenueGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend matching Figma */}
      <div className="flex items-center justify-center gap-6 pt-3 text-[11px] text-[#64748B]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 bg-[#0284C7]" />
          <span>Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-0.5 border-t border-dashed border-[#94A3B8]" />
          <span>Target</span>
        </div>
      </div>
    </div>
  );
};
