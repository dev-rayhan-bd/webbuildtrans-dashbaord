import { useState } from "react";
import { Link } from "react-router";
import { Search, Eye } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";

export interface ReservationRow {
  id: string;
  customerName: string;
  customerId: string;
  vehicleName: string;
  vehiclePlate: string;
  pickup: string;
  returnDate: string;
  duration: string;
  amount: string;
  depositAmount: string;
  depositStatus: "Held" | "Released" | "Refunded" | "Captured";
  preCheckin: "Completed" | "Pending";
  contractStatus: "Signed" | "Pending";
  status: "Active" | "Upcoming" | "Completed" | "Cancelled";
}

export const mockReservations: ReservationRow[] = [
  {
    id: "RES-4821",
    customerName: "Sarah Mitchell",
    customerId: "CUS-001",
    vehicleName: "Tesla Model 3",
    vehiclePlate: "CUR-4821",
    pickup: "2026-08-03",
    returnDate: "2026-08-07",
    duration: "4d",
    amount: "$680",
    depositAmount: "$400",
    depositStatus: "Held",
    preCheckin: "Completed",
    contractStatus: "Signed",
    status: "Upcoming",
  },
  {
    id: "RES-4820",
    customerName: "James Chen",
    customerId: "CUS-002",
    vehicleName: "BMW 5 Series",
    vehiclePlate: "CUR-4822",
    pickup: "2026-08-02",
    returnDate: "2026-08-05",
    duration: "3d",
    amount: "$750",
    depositAmount: "$400",
    depositStatus: "Held",
    preCheckin: "Completed",
    contractStatus: "Signed",
    status: "Active",
  },
  {
    id: "RES-4819",
    customerName: "Olivia Patel",
    customerId: "CUS-003",
    vehicleName: "Mercedes GLE",
    vehiclePlate: "CUR-4823",
    pickup: "2026-07-28",
    returnDate: "2026-08-01",
    duration: "4d",
    amount: "$860",
    depositAmount: "$400",
    depositStatus: "Released",
    preCheckin: "Completed",
    contractStatus: "Signed",
    status: "Completed",
  },
  {
    id: "RES-4818",
    customerName: "Marcus Johnson",
    customerId: "CUS-004",
    vehicleName: "Audi Q7",
    vehiclePlate: "CUR-4824",
    pickup: "2026-08-04",
    returnDate: "2026-08-09",
    duration: "5d",
    amount: "$1140",
    depositAmount: "$400",
    depositStatus: "Held",
    preCheckin: "Pending",
    contractStatus: "Pending",
    status: "Upcoming",
  },
  {
    id: "RES-4817",
    customerName: "Elena Rodriguez",
    customerId: "CUS-005",
    vehicleName: "Porsche Cayenne",
    vehiclePlate: "CUR-4825",
    pickup: "2026-08-02",
    returnDate: "2026-08-03",
    duration: "1d",
    amount: "$480",
    depositAmount: "$400",
    depositStatus: "Held",
    preCheckin: "Completed",
    contractStatus: "Signed",
    status: "Active",
  },
  {
    id: "RES-4816",
    customerName: "David Kim",
    customerId: "CUS-006",
    vehicleName: "Range Rover Sport",
    vehiclePlate: "CUR-4826",
    pickup: "2026-07-25",
    returnDate: "2026-07-30",
    duration: "5d",
    amount: "$1350",
    depositAmount: "$400",
    depositStatus: "Released",
    preCheckin: "Completed",
    contractStatus: "Signed",
    status: "Completed",
  },
  {
    id: "RES-4815",
    customerName: "Aisha Thompson",
    customerId: "CUS-007",
    vehicleName: "Volvo XC90",
    vehiclePlate: "CUR-4827",
    pickup: "2026-07-20",
    returnDate: "2026-07-24",
    duration: "4d",
    amount: "—",
    depositAmount: "$0",
    depositStatus: "Refunded",
    preCheckin: "Pending",
    contractStatus: "Pending",
    status: "Cancelled",
  },
  {
    id: "RES-4814",
    customerName: "Ryan O'Brien",
    customerId: "CUS-008",
    vehicleName: "Tesla Model 3",
    vehiclePlate: "CUR-4821",
    pickup: "2026-07-15",
    returnDate: "2026-07-18",
    duration: "3d",
    amount: "$510",
    depositAmount: "$400",
    depositStatus: "Released",
    preCheckin: "Completed",
    contractStatus: "Signed",
    status: "Completed",
  },
];

export const ReservationsPage = () => {
  const [filterTab, setFilterTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockReservations.filter((r) => {
    const matchStatus = filterTab === "All" || r.status === filterTab;
    const matchSearch =
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.vehicleName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">Reservations</h2>
          <p className="text-xs text-[#64748B]">Track and manage all vehicle reservations</p>
        </div>
      </div>

      {/* 5 KPI Stat Cards matching Figma node 8:4249 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-3xl font-black text-[#0F172A]">10</div>
          <div className="text-xs font-semibold text-[#64748B] mt-1.5">Total</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-3xl font-black text-[#16A34A]">2</div>
          <div className="text-xs font-semibold text-[#64748B] mt-1.5">Active</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-3xl font-black text-[#0284C7]">2</div>
          <div className="text-xs font-semibold text-[#64748B] mt-1.5">Upcoming</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-3xl font-black text-[#475569]">5</div>
          <div className="text-xs font-semibold text-[#64748B] mt-1.5">Completed</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-3xl font-black text-[#9333EA]">$7.7K</div>
          <div className="text-xs font-semibold text-[#64748B] mt-1.5">Revenue</div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        {/* Search & Tabs */}
        <div className="p-6 border-b border-[#F1F5F9] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-96">
            <Input
              placeholder="Search reservations, customers, vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-[#94A3B8]" />}
              className="h-10 text-xs bg-[#F8FAFC] border-[#E2E8F0] rounded-xl"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-1.5 rounded-xl border border-[#E2E8F0] text-xs w-full md:w-auto overflow-x-auto">
            <button
              type="button"
              onClick={() => setFilterTab("All")}
              className={cn(
                "px-3.5 py-1.5 rounded-lg font-bold transition-all",
                filterTab === "All"
                  ? "bg-[#0284C7] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              )}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("Active")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all",
                filterTab === "Active"
                  ? "bg-[#0284C7] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              Active
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("Upcoming")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all",
                filterTab === "Upcoming"
                  ? "bg-[#0284C7] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              Upcoming
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("Completed")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all",
                filterTab === "Completed"
                  ? "bg-[#0284C7] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
              Completed
            </button>
            <button
              type="button"
              onClick={() => setFilterTab("Cancelled")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold transition-all",
                filterTab === "Cancelled"
                  ? "bg-[#0284C7] text-white shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
              Cancelled
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-6">Reservation ID</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Vehicle</th>
                <th className="py-3.5 px-6">Pickup</th>
                <th className="py-3.5 px-6">Return</th>
                <th className="py-3.5 px-6">Duration</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Deposit ($400)</th>
                <th className="py-3.5 px-6">Pre-Checkin</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0284C7]">
                    <Link to={`/reservations/${r.id}`} className="hover:underline">
                      {r.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#0284C7]">{r.customerName}</div>
                    <div className="text-[11px] text-[#94A3B8] font-mono">{r.customerId}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#0F172A]">{r.vehicleName}</div>
                    <div className="text-[11px] text-[#94A3B8] font-mono">{r.vehiclePlate}</div>
                  </td>
                  <td className="py-4 px-6 text-[#64748B]">{r.pickup}</td>
                  <td className="py-4 px-6 text-[#64748B]">{r.returnDate}</td>
                  <td className="py-4 px-6 font-bold text-[#0F172A]">{r.duration}</td>
                  <td className="py-4 px-6 font-black text-[#0F172A]">{r.amount}</td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#0F172A]">{r.depositAmount}</div>
                    <span
                      className={cn(
                        "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold mt-0.5",
                        r.depositStatus === "Held" && "bg-amber-100 text-amber-800",
                        r.depositStatus === "Released" && "bg-slate-100 text-slate-700",
                        r.depositStatus === "Refunded" && "bg-purple-100 text-purple-700",
                        r.depositStatus === "Captured" && "bg-rose-100 text-rose-700"
                      )}
                    >
                      {r.depositStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold",
                        r.preCheckin === "Completed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      )}
                    >
                      {r.preCheckin}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold",
                        r.status === "Upcoming" && "bg-[#E0F2FE] text-[#0284C7]",
                        r.status === "Active" && "bg-[#DCFCE7] text-[#16A34A]",
                        r.status === "Completed" && "bg-[#F1F5F9] text-[#475569]",
                        r.status === "Cancelled" && "bg-[#FEE2E2] text-[#DC2626]"
                      )}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link
                      to={`/reservations/${r.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[#0284C7] hover:bg-[#F0F9FF] text-xs font-bold transition-colors"
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

        {/* Footer */}
        <div className="p-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
          <div>Showing 1–8 of 10 reservations</div>
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
          </div>
        </div>
      </div>
    </div>
  );
};
