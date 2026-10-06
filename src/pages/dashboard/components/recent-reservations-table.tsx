import { Eye } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/shared/lib/utils";

interface ReservationItem {
  id: string;
  customer: string;
  initials: string;
  initialsBg: string;
  vehicle: string;
  pickupDate: string;
  returnDate: string;
  status: "Upcoming" | "Active" | "Completed" | "Cancelled";
}

const mockRecentReservations: ReservationItem[] = [
  {
    id: "RES-4821",
    customer: "Sarah Mitchell",
    initials: "SM",
    initialsBg: "bg-orange-100 text-orange-700",
    vehicle: "Tesla Model 3",
    pickupDate: "2026-08-03",
    returnDate: "2026-08-07",
    status: "Upcoming",
  },
  {
    id: "RES-4820",
    customer: "James Chen",
    initials: "JC",
    initialsBg: "bg-rose-100 text-rose-700",
    vehicle: "BMW 5 Series",
    pickupDate: "2026-08-02",
    returnDate: "2026-08-05",
    status: "Active",
  },
  {
    id: "RES-4819",
    customer: "Olivia Patel",
    initials: "OP",
    initialsBg: "bg-amber-100 text-amber-700",
    vehicle: "Mercedes GLE",
    pickupDate: "2026-07-28",
    returnDate: "2026-08-01",
    status: "Completed",
  },
  {
    id: "RES-4818",
    customer: "Marcus Johnson",
    initials: "MJ",
    initialsBg: "bg-red-100 text-red-700",
    vehicle: "Audi Q7",
    pickupDate: "2026-08-04",
    returnDate: "2026-08-09",
    status: "Upcoming",
  },
  {
    id: "RES-4817",
    customer: "Elena Rodriguez",
    initials: "ER",
    initialsBg: "bg-orange-100 text-orange-700",
    vehicle: "Porsche Cayenne",
    pickupDate: "2026-08-02",
    returnDate: "2026-08-03",
    status: "Active",
  },
  {
    id: "RES-4816",
    customer: "David Kim",
    initials: "DK",
    initialsBg: "bg-purple-100 text-purple-700",
    vehicle: "Range Rover Sport",
    pickupDate: "2026-07-25",
    returnDate: "2026-08-30",
    status: "Completed",
  },
  {
    id: "RES-4815",
    customer: "Aisha Thompson",
    initials: "AT",
    initialsBg: "bg-rose-100 text-rose-700",
    vehicle: "Volvo XC90",
    pickupDate: "2026-07-20",
    returnDate: "2026-07-24",
    status: "Cancelled",
  },
];

export const RecentReservationsTable = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">Recent Reservations</h2>
          <p className="text-xs text-[#64748B]">Latest booking activity across all vehicles</p>
        </div>
        <Link
          to="/reservations"
          className="text-xs font-semibold text-[#0284C7] hover:underline"
        >
          View All Reservations →
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-6">Reservation ID</th>
              <th className="py-3.5 px-6">Customer</th>
              <th className="py-3.5 px-6">Vehicle</th>
              <th className="py-3.5 px-6">Pickup Date</th>
              <th className="py-3.5 px-6">Return Date</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {mockRecentReservations.map((item) => (
              <tr key={item.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                <td className="py-4 px-6 font-bold">
                  <Link
                    to={`/reservations/${item.id}`}
                    className="text-[#0284C7] hover:underline"
                  >
                    {item.id}
                  </Link>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shadow-xs",
                        item.initialsBg
                      )}
                    >
                      {item.initials}
                    </div>
                    <span className="font-bold text-[#0F172A]">{item.customer}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-[#475569] font-medium">{item.vehicle}</td>
                <td className="py-4 px-6 text-[#64748B]">{item.pickupDate}</td>
                <td className="py-4 px-6 text-[#64748B]">{item.returnDate}</td>
                <td className="py-4 px-6">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold",
                      item.status === "Active" && "bg-[#DCFCE7] text-[#16A34A]",
                      item.status === "Upcoming" && "bg-[#E0F2FE] text-[#0284C7]",
                      item.status === "Completed" && "bg-[#F1F5F9] text-[#475569]",
                      item.status === "Cancelled" && "bg-[#FEE2E2] text-[#DC2626]"
                    )}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <Link
                    to={`/reservations/${item.id}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#E2E8F0] text-[#0284C7] hover:bg-[#F0F9FF] text-xs font-semibold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
        <div>Showing 7 of 1,482 reservations</div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="w-7 h-7 rounded-lg bg-[#0284C7] text-white font-bold text-xs flex items-center justify-center shadow-xs"
          >
            1
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] font-semibold text-xs flex items-center justify-center transition-colors"
          >
            2
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] font-semibold text-xs flex items-center justify-center transition-colors"
          >
            3
          </button>
          <span className="px-1 text-[#94A3B8]">...</span>
          <button
            type="button"
            className="px-2 h-7 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] font-semibold text-xs flex items-center justify-center transition-colors"
          >
            148
          </button>
        </div>
      </div>
    </div>
  );
};
