import { useState } from "react";
import { Link } from "react-router";
import {
  DollarSign,
  CheckCircle2,
  Hourglass,
  AlertTriangle,
  Download,
  Search,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";

export interface PaymentItem {
  id: string;
  customerName: string;
  customerInitials: string;
  vehicle: string;
  amount: string;
  method: string;
  stripeStatus: "succeeded" | "pending" | "failed" | "refunded";
  status: "Paid" | "Pending" | "Failed" | "Refunded";
  date: string;
}

export const mockPayments: PaymentItem[] = [
  {
    id: "RES-4821",
    customerName: "Sarah Mitchell",
    customerInitials: "SM",
    vehicle: "Tesla Model 3",
    amount: "$734.00",
    method: "Visa",
    stripeStatus: "succeeded",
    status: "Paid",
    date: "2026-08-01 10:22",
  },
  {
    id: "RES-4820",
    customerName: "James Chen",
    customerInitials: "JC",
    vehicle: "BMW 5 Series",
    amount: "$810.00",
    method: "Apple Pay",
    stripeStatus: "succeeded",
    status: "Paid",
    date: "2026-08-01 14:08",
  },
  {
    id: "RES-4819",
    customerName: "Olivia Patel",
    customerInitials: "OP",
    vehicle: "Mercedes GLE",
    amount: "$928.80",
    method: "Mastercard",
    stripeStatus: "succeeded",
    status: "Paid",
    date: "2026-07-28 16:45",
  },
  {
    id: "RES-4818",
    customerName: "Marcus Johnson",
    customerInitials: "MJ",
    vehicle: "Audi Q7",
    amount: "$1,231.20",
    method: "AMEX",
    stripeStatus: "pending",
    status: "Pending",
    date: "2026-08-04 09:30",
  },
  {
    id: "RES-4817",
    customerName: "Elena Rodriguez",
    customerInitials: "ER",
    vehicle: "Porsche Cayenne",
    amount: "$518.40",
    method: "Google Pay",
    stripeStatus: "succeeded",
    status: "Paid",
    date: "2026-08-02 11:20",
  },
];

export const PaymentsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = mockPayments.filter((p) => {
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    const matchSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.customerName.toLowerCase().includes(search.toLowerCase()) ||
      p.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      p.method.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 4 Stat Cards matching Figma node 9:6686 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Total Revenue</div>
            <div className="text-2xl font-black text-[#0F172A] mt-1">$4,222.40</div>
            <div className="text-[11px] font-bold text-[#16A34A] mt-1">▲ +12.4% this month</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F59E0B] flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Successful</div>
            <div className="text-3xl font-black text-[#10B981] mt-1">3</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Pending</div>
            <div className="text-3xl font-black text-[#D97706] mt-1">1</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D97706] flex items-center justify-center">
            <Hourglass className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Failed / Refunded</div>
            <div className="text-3xl font-black text-[#EF4444] mt-1">2</div>
            <div className="text-[11px] font-bold text-[#DC2626] mt-1">▼ Review required</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#EF4444] flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Payment Records Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        {/* Table Top Header */}
        <div className="p-6 border-b border-[#F1F5F9] flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-[#0F172A]">Payment Records</h3>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toast.success("Exporting payment journal...")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A] transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 bg-[#F8FAFC]/50 border-b border-[#F1F5F9] flex flex-wrap items-center gap-3">
          <div className="w-72">
            <Input
              placeholder="Search reservation, customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4 text-[#94A3B8]" />}
              className="h-9 text-xs bg-white border-[#E2E8F0] rounded-xl"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 rounded-xl border border-[#E2E8F0] bg-white text-xs font-medium text-[#475569]"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        {/* Payment Table matching Figma node 9:6686 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-6">Reservation ID</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Vehicle</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Method</th>
                <th className="py-3.5 px-6">Stripe</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0284C7]">
                    <Link to={`/payments/${item.id}`} className="hover:underline">
                      {item.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0284C7] font-bold text-[10px] flex items-center justify-center">
                        {item.customerInitials}
                      </div>
                      <span className="font-semibold text-[#0F172A]">{item.customerName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#475569]">{item.vehicle}</td>
                  <td className="py-4 px-6 font-black text-[#0F172A]">{item.amount}</td>
                  <td className="py-4 px-6 font-medium text-[#475569]">{item.method}</td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold",
                        item.stripeStatus === "succeeded" && "bg-[#DCFCE7] text-[#16A34A]",
                        item.stripeStatus === "pending" && "bg-[#FEF3C7] text-[#D97706]",
                        item.stripeStatus === "failed" && "bg-[#FEE2E2] text-[#DC2626]",
                        item.stripeStatus === "refunded" && "bg-slate-100 text-[#64748B]"
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {item.stripeStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold",
                        item.status === "Paid" && "bg-[#DCFCE7] text-[#16A34A]",
                        item.status === "Pending" && "bg-[#FEF3C7] text-[#D97706]",
                        item.status === "Failed" && "bg-[#FEE2E2] text-[#DC2626]",
                        item.status === "Refunded" && "bg-slate-100 text-[#64748B]"
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#64748B]">{item.date}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link
                        to={`/payments/${item.id}`}
                        className="px-2.5 py-1 rounded-md border border-[#E2E8F0] hover:bg-[#F0F9FF] text-[#0284C7] font-bold text-xs"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => toast.success(`Invoice PDF downloaded for ${item.id}`)}
                        className="px-2 py-1 rounded-md border border-[#E2E8F0] hover:bg-slate-50 text-[#64748B] text-xs"
                        title="Download PDF"
                      >
                        PDF
                      </button>
                      {item.status === "Paid" && (
                        <button
                          type="button"
                          onClick={() => toast.info(`Refund dialogue open for ${item.id}`)}
                          className="px-2 py-1 rounded-md border border-red-200 hover:bg-red-50 text-[#DC2626] text-xs font-semibold"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
          <div>6 transactions</div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="px-2 h-7 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] font-semibold text-xs flex items-center justify-center transition-colors"
            >
              ‹ Prev
            </button>
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
              className="px-2 h-7 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] font-semibold text-xs flex items-center justify-center transition-colors"
            >
              Next ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
