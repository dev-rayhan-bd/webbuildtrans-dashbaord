import { useState } from "react";
import { Link } from "react-router";
import {
  Lock,
  PauseCircle,
  CheckCircle2,
  AlertTriangle,
  Download,
  Search,
  X,
} from "lucide-react";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";

export interface DepositRecord {
  id: string;
  customer: string;
  customerInitials: string;
  vehicle: string;
  depositAmount: string;
  holdStatus: "On Hold" | "Released" | "Partial Release" | "Captured";
  authDate: string;
  releaseDate: string;
  damageDeduction: string;
  remainingAmount: string;
  stripePaymentIntentId: string;
}

const mockDeposits: DepositRecord[] = [
  {
    id: "RES-4821",
    customer: "Sarah Mitchell",
    customerInitials: "SM",
    vehicle: "Tesla Model 3",
    depositAmount: "$400.00",
    holdStatus: "On Hold",
    authDate: "2026-08-01",
    releaseDate: "—",
    damageDeduction: "—",
    remainingAmount: "$400.00",
    stripePaymentIntentId: "pi_3M92830198aB",
  },
  {
    id: "RES-4820",
    customer: "James Chen",
    customerInitials: "JC",
    vehicle: "BMW 5 Series",
    depositAmount: "$400.00",
    holdStatus: "On Hold",
    authDate: "2026-08-01",
    releaseDate: "—",
    damageDeduction: "—",
    remainingAmount: "$400.00",
    stripePaymentIntentId: "pi_3M92830199cD",
  },
  {
    id: "RES-4819",
    customer: "Olivia Patel",
    customerInitials: "OP",
    vehicle: "Mercedes GLE",
    depositAmount: "$400.00",
    holdStatus: "Released",
    authDate: "2026-07-28",
    releaseDate: "2026-08-01",
    damageDeduction: "—",
    remainingAmount: "$0.00",
    stripePaymentIntentId: "pi_3M92830200eF",
  },
  {
    id: "RES-4818",
    customer: "Marcus Johnson",
    customerInitials: "MJ",
    vehicle: "Audi Q7",
    depositAmount: "$400.00",
    holdStatus: "Partial Release",
    authDate: "2026-08-04",
    releaseDate: "2026-08-09",
    damageDeduction: "$120.00",
    remainingAmount: "$280.00",
    stripePaymentIntentId: "pi_3M92830201gH",
  },
  {
    id: "RES-4817",
    customer: "Elena Rodriguez",
    customerInitials: "ER",
    vehicle: "Porsche Cayenne",
    depositAmount: "$400.00",
    holdStatus: "On Hold",
    authDate: "2026-08-02",
    releaseDate: "—",
    damageDeduction: "—",
    remainingAmount: "$400.00",
    stripePaymentIntentId: "pi_3M92830202iJ",
  },
  {
    id: "RES-4816",
    customer: "David Kim",
    customerInitials: "DK",
    vehicle: "Range Rover Sport",
    depositAmount: "$400.00",
    holdStatus: "Released",
    authDate: "2026-07-25",
    releaseDate: "2026-07-30",
    damageDeduction: "—",
    remainingAmount: "$0.00",
    stripePaymentIntentId: "pi_3M92830203kL",
  },
];

export const DepositsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [captureTarget, setCaptureTarget] = useState<DepositRecord | null>(null);
  const [deductionAmount, setDeductionAmount] = useState("150");
  const [deductionReason, setDeductionReason] = useState("Minor front bumper scuff recorded at return inspection");

  const filtered = mockDeposits.filter((d) => {
    const matchStatus = statusFilter === "All" || d.holdStatus === statusFilter;
    const matchSearch =
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.customer.toLowerCase().includes(search.toLowerCase()) ||
      d.vehicle.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 4 Stat Cards matching Figma node 10:8043 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Total Deposits</div>
            <div className="text-3xl font-black text-[#0F172A] mt-1">6</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0284C7] flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">On Hold ($400/ea)</div>
            <div className="text-2xl font-black text-[#0F172A] mt-1">$1,200.00</div>
            <div className="text-[11px] font-bold text-[#16A34A] mt-1">▲ 3 active holds</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D97706] flex items-center justify-center">
            <PauseCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Full Released</div>
            <div className="text-3xl font-black text-[#10B981] mt-1">2</div>
            <div className="text-[11px] font-bold text-[#16A34A] mt-1">$800 returned</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Damage Captured</div>
            <div className="text-2xl font-black text-[#EF4444] mt-1">$120.00</div>
            <div className="text-[11px] font-bold text-[#DC2626] mt-1">▼ 1 partial capture</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#EF4444] flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Middle Row: Two Summary Cards from Figma */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Deposits On Hold */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h3 className="text-base font-bold text-[#0F172A] mb-4">Active $400 Holds (Stripe)</h3>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]/60 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-[#0F172A]">Sarah Mitchell</div>
                <div className="text-[11px] text-[#64748B]">RES-4821 · Tesla Model 3</div>
              </div>
              <div className="text-right">
                <div className="font-black text-sm text-[#D97706]">$400.00 USD</div>
                <div className="text-[10px] text-[#94A3B8]">Since 2026-08-01</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]/60 flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-[#0F172A]">James Chen</div>
                <div className="text-[11px] text-[#64748B]">RES-4820 · BMW 5 Series</div>
              </div>
              <div className="text-right">
                <div className="font-black text-sm text-[#D97706]">$400.00 USD</div>
                <div className="text-[10px] text-[#94A3B8]">Since 2026-08-01</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Damage Charge Summary */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h3 className="text-base font-bold text-[#0F172A] mb-4">Damage Deductions from $400 Hold</h3>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-[#0F172A]">Marcus Johnson</div>
                <div className="text-[11px] text-[#64748B]">RES-4818 · Audi Q7</div>
              </div>
              <div className="text-right">
                <div className="font-black text-sm text-[#DC2626]">- $120.00</div>
                <div className="text-[10px] text-[#64748B]">Released: $280.00</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-[#0F172A]">Olivia Patel</div>
                <div className="text-[11px] text-[#64748B]">RES-4819 · Mercedes GLE</div>
              </div>
              <div className="text-right">
                <div className="font-black text-sm text-[#16A34A]">No Damage ($0)</div>
                <div className="text-[10px] text-[#64748B]">100% Released ($400)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Security Deposit Records Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="p-6 border-b border-[#F1F5F9] flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-[#0F172A]">Security Deposit Records</h3>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toast.success("Exporting security deposit report...")}
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
              placeholder="Search customer, reservation..."
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
            <option value="On Hold">On Hold</option>
            <option value="Released">Released</option>
            <option value="Partial Release">Partial Release</option>
            <option value="Captured">Captured</option>
          </select>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-6">Reservation</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Vehicle</th>
                <th className="py-3.5 px-6">Deposit</th>
                <th className="py-3.5 px-6">Hold Status</th>
                <th className="py-3.5 px-6">Auth Date</th>
                <th className="py-3.5 px-6">Release Date</th>
                <th className="py-3.5 px-6">Damage</th>
                <th className="py-3.5 px-6">Remaining</th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0284C7]">
                    <Link to={`/reservations/${item.id}`} className="hover:underline">
                      {item.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-[#0284C7] font-bold text-[10px] flex items-center justify-center">
                        {item.customerInitials}
                      </div>
                      <span className="font-semibold text-[#0F172A]">{item.customer}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#475569]">{item.vehicle}</td>
                  <td className="py-4 px-6 font-black text-[#0F172A]">{item.depositAmount}</td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold",
                        item.holdStatus === "On Hold" && "bg-[#FEF3C7] text-[#D97706]",
                        item.holdStatus === "Released" && "bg-[#DCFCE7] text-[#16A34A]",
                        item.holdStatus === "Partial Release" && "bg-[#E0F2FE] text-[#0284C7]",
                        item.holdStatus === "Captured" && "bg-[#FEE2E2] text-[#DC2626]"
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {item.holdStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#64748B]">{item.authDate}</td>
                  <td className="py-4 px-6 text-[#16A34A] font-semibold">{item.releaseDate}</td>
                  <td className="py-4 px-6 font-bold text-[#DC2626]">{item.damageDeduction}</td>
                  <td className="py-4 px-6 font-black text-[#0F172A]">{item.remainingAmount}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {item.holdStatus === "On Hold" ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              toast.success(
                                `Full $400.00 hold released on Stripe for ${item.customer} (${item.id})`
                              )
                            }
                            className="px-2.5 py-1 rounded-md text-[11px] font-bold border border-emerald-200 text-[#16A34A] hover:bg-emerald-50 transition-colors"
                          >
                            Release $400
                          </button>
                          <button
                            type="button"
                            onClick={() => setCaptureTarget(item)}
                            className="px-2.5 py-1 rounded-md text-[11px] font-bold border border-rose-200 text-[#DC2626] hover:bg-rose-50 transition-colors"
                          >
                            Capture
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] text-[#94A3B8] font-medium">
                          {item.holdStatus === "Released" ? "Completed" : "Processed"}
                        </span>
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
          <div>6 deposits</div>
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

      {/* Stripe Authorize & Capture Damage Modal */}
      {captureTarget && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#E2E8F0] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-base text-[#0F172A]">
                  Capture Deposit (Damage Deduction)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCaptureTarget(null)}
                className="p-1 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] space-y-1">
                <div className="flex justify-between text-[#64748B]">
                  <span>Customer:</span>
                  <span className="font-bold text-[#0F172A]">{captureTarget.customer}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Reservation:</span>
                  <span className="font-bold text-[#0284C7]">{captureTarget.id}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Stripe Hold ID:</span>
                  <span className="font-mono text-[#0F172A]">{captureTarget.stripePaymentIntentId}</span>
                </div>
                <div className="flex justify-between text-[#64748B]">
                  <span>Original Hold:</span>
                  <span className="font-black text-[#0F172A]">$400.00 USD</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#0F172A] block mb-1">
                  Damage Deduction Amount ($ USD)
                </label>
                <input
                  type="number"
                  max="400"
                  min="1"
                  value={deductionAmount}
                  onChange={(e) => setDeductionAmount(e.target.value)}
                  className="w-full h-9 rounded-lg border border-[#E2E8F0] px-3 font-bold text-rose-600"
                />
              </div>

              <div>
                <label className="font-bold text-[#0F172A] block mb-1">
                  Damage Justification / Rentsyst Ref
                </label>
                <input
                  type="text"
                  value={deductionReason}
                  onChange={(e) => setDeductionReason(e.target.value)}
                  className="w-full h-9 rounded-lg border border-[#E2E8F0] px-3 text-[#0F172A]"
                />
              </div>

              {/* Automatic Calculation Preview */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1 text-xs">
                <div className="flex justify-between text-amber-900">
                  <span>Charge to Stripe:</span>
                  <span className="font-black text-rose-600">
                    ${Number(deductionAmount || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-amber-900">
                  <span>Release back to customer:</span>
                  <span className="font-black text-emerald-700">
                    ${Math.max(0, 400 - Number(deductionAmount || 0)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F1F5F9]">
              <button
                type="button"
                onClick={() => setCaptureTarget(null)}
                className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.success(
                    `Captured $${deductionAmount} via Stripe and released remainder to ${captureTarget.customer}`
                  );
                  setCaptureTarget(null);
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                Confirm Stripe Capture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
