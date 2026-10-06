import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const utilizationData = [
  { week: "W1", available: 20, maintenance: 5, rented: 35 },
  { week: "W2", available: 22, maintenance: 4, rented: 34 },
  { week: "W3", available: 18, maintenance: 7, rented: 35 },
  { week: "W4", available: 25, maintenance: 4, rented: 31 },
  { week: "W5", available: 23, maintenance: 5, rented: 32 },
];

export const FleetUtilizationChart = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div className="pb-4 border-b border-[#F1F5F9]">
        <h2 className="text-base font-bold text-[#0F172A]">Fleet Utilization</h2>
        <p className="text-xs text-[#64748B]">Weekly breakdown</p>
      </div>

      {/* Chart Canvas */}
      <div className="h-[180px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={utilizationData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 10 }}
              domain={[0, 60]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0F172A",
                borderRadius: "8px",
                border: "none",
                color: "#FFFFFF",
                fontSize: "11px",
              }}
            />
            <Bar dataKey="available" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="maintenance" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
            <Bar dataKey="rented" stackId="a" fill="#0284C7" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend matching Figma */}
      <div className="flex items-center justify-center gap-4 pt-3 text-[11px] text-[#64748B]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]" />
          <span>Maintenance</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#0284C7]" />
          <span>Rented</span>
        </div>
      </div>
    </div>
  );
};
