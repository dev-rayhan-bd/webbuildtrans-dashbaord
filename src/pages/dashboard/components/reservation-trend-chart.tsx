import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const trendData = [
  { day: "Mon", bookings: 14 },
  { day: "Tue", bookings: 19 },
  { day: "Wed", bookings: 16 },
  { day: "Thu", bookings: 23 },
  { day: "Fri", bookings: 29 },
  { day: "Sat", bookings: 27 },
  { day: "Sun", bookings: 17 },
];

export const ReservationTrendChart = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header */}
      <div className="pb-4 border-b border-[#F1F5F9]">
        <h2 className="text-base font-bold text-[#0F172A]">Reservation Trend</h2>
        <p className="text-xs text-[#64748B]">Daily bookings this week</p>
      </div>

      {/* Chart Canvas */}
      <div className="h-[180px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 10 }}
              domain={[0, 32]}
              ticks={[0, 8, 16, 24, 32]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0F172A",
                borderRadius: "8px",
                border: "none",
                color: "#FFFFFF",
                fontSize: "11px",
              }}
              formatter={(val) => [`${val} bookings`, "Reservations"]}
            />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#0284C7"
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: "#0284C7", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#0369A1" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer text */}
      <div className="text-center pt-3 text-[11px] text-[#64748B]">
        Peak activity observed on <span className="font-bold text-[#0F172A]">Friday (29 bookings)</span>
      </div>
    </div>
  );
};
