import { useState } from "react";
import { Link } from "react-router";
import { cn } from "@/shared/lib/utils";

const activeReservations = [
  {
    id: "RES-4820",
    customer: "James Chen",
    vehicle: "BMW 5 Series",
    pickup: "2026-08-02",
    returnDate: "2026-08-05",
    status: "Active",
  },
  {
    id: "RES-4817",
    customer: "Elena Rodriguez",
    vehicle: "Porsche Cayenne",
    pickup: "2026-08-02",
    returnDate: "2026-08-03",
    status: "Active",
  },
];

export const ReservationOverview = () => {
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Active" | "Completed">("Active");

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header with Title and Filter Tabs */}
      <div className="flex items-center justify-between pb-4">
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">Reservation Overview</h2>
          <p className="text-xs text-[#64748B]">Real-time booking status</p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0] text-xs">
          {(["Upcoming", "Active", "Completed"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1.5 rounded-lg font-semibold transition-all",
                activeTab === tab
                  ? "bg-[#0284C7] text-white shadow-sm"
                  : "text-[#64748B] hover:text-[#0F172A]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Summary Stat Boxes */}
      <div className="grid grid-cols-3 gap-3 my-4">
        <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]/60 text-center">
          <div className="text-2xl font-black text-[#0284C7]">24</div>
          <div className="text-xs font-semibold text-[#64748B] mt-1">Upcoming</div>
        </div>

        <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]/60 text-center">
          <div className="text-2xl font-black text-[#16A34A]">47</div>
          <div className="text-xs font-semibold text-[#64748B] mt-1">Active</div>
        </div>

        <div className="p-4 rounded-xl bg-[#FAF5FF] border border-[#E9D5FF]/60 text-center">
          <div className="text-2xl font-black text-[#9333EA]">1,411</div>
          <div className="text-xs font-semibold text-[#64748B] mt-1">Completed</div>
        </div>
      </div>

      {/* Mini Active Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left text-xs">
          <tbody className="divide-y divide-[#F1F5F9]">
            {activeReservations.map((item) => (
              <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="py-3 pr-4 font-bold">
                  <Link
                    to={`/reservations/${item.id}`}
                    className="text-[#0284C7] hover:underline"
                  >
                    {item.id}
                  </Link>
                </td>
                <td className="py-3 px-4 font-semibold text-[#0F172A]">{item.customer}</td>
                <td className="py-3 px-4 text-[#475569]">{item.vehicle}</td>
                <td className="py-3 px-4 text-[#64748B]">{item.pickup}</td>
                <td className="py-3 px-4 text-[#64748B]">{item.returnDate}</td>
                <td className="py-3 pl-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#16A34A]">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
