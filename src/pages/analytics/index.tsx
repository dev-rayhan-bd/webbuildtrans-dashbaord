import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Top 4 Stat Cards Data matching Figma node 12:11215
const kpiData = [
  {
    title: "TOTAL REVENUE",
    value: "$284,420",
    change: "↑ 18.4%",
    isPositive: true,
    comparison: "vs last period",
    color: "#0284C7",
    sparkline: [
      { v: 120 }, { v: 115 }, { v: 130 }, { v: 128 }, { v: 145 },
      { v: 140 }, { v: 160 }, { v: 155 }, { v: 175 }, { v: 170 }, { v: 190 }
    ],
  },
  {
    title: "ACTIVE BOOKINGS",
    value: "1,284",
    change: "↑ 12.1%",
    isPositive: true,
    comparison: "vs last period",
    color: "#8B5CF6",
    sparkline: [
      { v: 80 }, { v: 75 }, { v: 95 }, { v: 90 }, { v: 105 },
      { v: 100 }, { v: 120 }, { v: 115 }, { v: 130 }, { v: 128 }, { v: 145 }
    ],
  },
  {
    title: "FLEET UTILIZATION",
    value: "87.3%",
    change: "↑ 4.2%",
    isPositive: true,
    comparison: "vs last period",
    color: "#10B981",
    sparkline: [
      { v: 70 }, { v: 72 }, { v: 68 }, { v: 74 }, { v: 71 },
      { v: 78 }, { v: 82 }, { v: 80 }, { v: 84 }, { v: 83 }, { v: 87 }
    ],
  },
  {
    title: "DAMAGE REPORTS",
    value: "47",
    change: "↓ 8.6%",
    isPositive: false,
    comparison: "vs last period",
    color: "#EF4444",
    sparkline: [
      { v: 85 }, { v: 78 }, { v: 80 }, { v: 72 }, { v: 70 },
      { v: 62 }, { v: 65 }, { v: 55 }, { v: 52 }, { v: 49 }, { v: 47 }
    ],
  },
];

// Revenue & Bookings Trend chart data
const trendData = [
  { month: "Jan", revenue: 150000, bookings: 145000 },
  { month: "Feb", revenue: 180000, bookings: 175000 },
  { month: "Mar", revenue: 165000, bookings: 162000 },
  { month: "Apr", revenue: 215000, bookings: 205000 },
  { month: "May", revenue: 245000, bookings: 238000 },
  { month: "Jun", revenue: 235000, bookings: 228000 },
  { month: "Jul", revenue: 284420, bookings: 275000 },
];

// Booking Status Donut Chart data
const bookingStatusData = [
  { name: "Active", value: 33, color: "#06B6D4" },
  { name: "Completed", value: 53, color: "#8B5CF6" },
  { name: "Cancelled", value: 7, color: "#F59E0B" },
  { name: "Pending", value: 7, color: "#2DD4BF" },
];

// Bottom Row Cards data
const vehicleClassData = [
  { class: "Luxury SUV", count: 92, barColor: "bg-[#0284C7]", width: "92%" },
  { class: "Sedan", count: 74, barColor: "bg-[#8B5CF6]", width: "74%" },
  { class: "Sports", count: 58, barColor: "bg-[#38BDF8]", width: "58%" },
  { class: "Economy", count: 41, barColor: "bg-[#F59E0B]", width: "41%" },
  { class: "Van", count: 29, barColor: "bg-[#10B981]", width: "29%" },
];

const damageTypeData = [
  { type: "Collision", count: 18, barColor: "bg-[#DC2626]", width: "75%" },
  { type: "Scratch", count: 14, barColor: "bg-[#F97316]", width: "58%" },
  { type: "Dent", count: 9, barColor: "bg-[#FBBF24]", width: "38%" },
  { type: "Flood", count: 4, barColor: "bg-[#38BDF8]", width: "18%" },
  { type: "Vandalism", count: 2, barColor: "bg-[#8B5CF6]", width: "9%" },
];

const locationsData = [
  { rank: 1, name: "San Francisco", amount: "$48,200", width: "78%" },
  { rank: 2, name: "New York", amount: "$61,400", width: "100%" },
  { rank: 3, name: "Los Angeles", amount: "$54,800", width: "89%" },
  { rank: 4, name: "Miami", amount: "$39,100", width: "63%" },
  { rank: 5, name: "Chicago", amount: "$41,700", width: "68%" },
];

export const AnalyticsPage = () => {
  const [activeRange, setActiveRange] = useState("Last 30 days");

  const ranges = ["Last 7 days", "Last 30 days", "Last 90 days", "This Year"];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Range Pill Filter matching Figma node 12:11215 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0284C7] tracking-tight">
            Analytics
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Fleet performance, revenue, and operational insights
          </p>
        </div>

        {/* Period Filter Tabs */}
        <div className="flex items-center p-1 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0] shadow-2xs self-start sm:self-auto">
          {ranges.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setActiveRange(range)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeRange === range
                  ? "bg-white text-[#0F172A] shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Row 1: 4 Stat Cards with Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {kpiData.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="text-[11px] font-bold text-[#94A3B8] tracking-wider uppercase">
                {kpi.title}
              </div>
              <div className="text-3xl font-black text-[#0284C7] mt-2 tracking-tight">
                {kpi.value}
              </div>
              <div className="flex items-center gap-1.5 mt-2.5">
                <span
                  className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold ${
                    kpi.isPositive
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {kpi.isPositive ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  <span>{kpi.change.replace(/[↑↓]/g, "").trim()}</span>
                </span>
                <span className="text-xs text-[#94A3B8]">{kpi.comparison}</span>
              </div>
            </div>

            {/* Mini Sparkline Chart */}
            <div className="h-12 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kpi.sparkline} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={kpi.color} stopOpacity={0.25} />
                      <stop offset="100%" stopColor={kpi.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={kpi.color}
                    strokeWidth={2}
                    fill={`url(#grad-${idx})`}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Revenue Trend (Left) & Booking Status (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Revenue & Bookings Trend */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
            <h3 className="text-base font-bold text-[#0284C7]">
              Revenue & Bookings Trend
            </h3>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-[#0F172A]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                <span>Revenue</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#0F172A]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                <span>Bookings</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284C7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="bookingsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 500 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, ""]}
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderRadius: "12px",
                    border: "none",
                    color: "#FFFFFF",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0284C7"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#bookingsGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Booking Status Donut */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-between">
          <h3 className="text-base font-bold text-[#0284C7] pb-4 border-b border-[#F1F5F9]">
            Booking Status
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-auto pt-2">
            {/* Donut with Center label */}
            <div className="relative w-44 h-44 flex-shrink-0 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={74}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {bookingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-[#0F172A] tracking-tight">1284</span>
                <span className="text-[11px] font-semibold text-[#94A3B8]">Total</span>
              </div>
            </div>

            {/* Legend list matching Figma */}
            <div className="space-y-3 w-full max-w-[140px] text-xs">
              {bookingStatusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[#64748B] font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-[#0F172A]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Three Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Card 1: Revenue by Vehicle Class */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-between">
          <h3 className="text-base font-bold text-[#0284C7] pb-4 border-b border-[#F1F5F9]">
            Revenue by Vehicle Class
          </h3>
          <div className="space-y-4 pt-4">
            {vehicleClassData.map((v) => (
              <div key={v.class} className="flex items-center justify-between gap-3 text-xs">
                <span className="w-24 text-[#64748B] font-medium truncate">{v.class}</span>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${v.barColor} transition-all duration-500`}
                    style={{ width: v.width }}
                  />
                </div>
                <span className="w-7 text-right font-bold text-[#0F172A]">{v.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Damage by Type */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-between">
          <h3 className="text-base font-bold text-[#0284C7] pb-4 border-b border-[#F1F5F9]">
            Damage by Type
          </h3>
          <div className="space-y-4 pt-4">
            {damageTypeData.map((d) => (
              <div key={d.type} className="flex items-center justify-between gap-3 text-xs">
                <span className="w-20 text-[#64748B] font-medium truncate">{d.type}</span>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${d.barColor} transition-all duration-500`}
                    style={{ width: d.width }}
                  />
                </div>
                <span className="w-6 text-right font-bold text-[#0F172A]">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Top Performing Locations */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs flex flex-col justify-between">
          <h3 className="text-base font-bold text-[#0284C7] pb-4 border-b border-[#F1F5F9]">
            Top Performing Locations
          </h3>
          <div className="space-y-3.5 pt-4">
            {locationsData.map((loc) => (
              <div key={loc.rank} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#94A3B8] font-bold text-[11px] w-3">{loc.rank}</span>
                    <span className="text-[#0F172A] font-semibold">{loc.name}</span>
                  </div>
                  <span className="font-bold text-[#0284C7]">{loc.amount}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden ml-5">
                  <div
                    className="h-full rounded-full bg-[#6366F1] transition-all duration-500"
                    style={{ width: loc.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
