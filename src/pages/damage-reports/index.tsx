import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Camera,
  Check,
  X,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";

interface DamageSubmission {
  id: string;
  vehicle: string;
  plate: string;
  customer: string;
  customerId: string;
  customerInitials: string;
  customerInitialsBg: string;
  reportDate: string;
  damageType: string;
  severity: "Critical" | "Severe" | "Moderate" | "Minor";
  status: "Under Review" | "Approved" | "Rejected" | "Pending";
  estimatedCost: string;
  damageArea: string;
  inspectionPhase: "Pre-Rental Self-Checkin" | "Return Inspection";
  rentsystSynced: boolean;
}

const mockDamageList: DamageSubmission[] = [
  {
    id: "DR-2026-0891",
    vehicle: "Tesla Model 3",
    plate: "CUR-4821",
    customer: "Sarah Mitchell",
    customerId: "CUS-001",
    customerInitials: "S",
    customerInitialsBg: "bg-amber-100 text-amber-800",
    reportDate: "Aug 1, 2026",
    damageType: "Scratch",
    severity: "Minor",
    status: "Under Review",
    estimatedCost: "$150",
    damageArea: "Front bumper minor surface scratch noticed during pre-checkin",
    inspectionPhase: "Pre-Rental Self-Checkin",
    rentsystSynced: true,
  },
  {
    id: "DR-2026-0890",
    vehicle: "BMW 5 Series",
    plate: "CUR-4822",
    customer: "James Chen",
    customerId: "CUS-002",
    customerInitials: "J",
    customerInitialsBg: "bg-emerald-100 text-emerald-800",
    reportDate: "Aug 2, 2026",
    damageType: "Scratch",
    severity: "Minor",
    status: "Approved",
    estimatedCost: "$120",
    damageArea: "Rear quarter panel surface scuff",
    inspectionPhase: "Return Inspection",
    rentsystSynced: true,
  },
  {
    id: "DR-2026-0887",
    vehicle: "Mercedes GLE",
    plate: "CUR-4823",
    customer: "Olivia Patel",
    customerId: "CUS-003",
    customerInitials: "O",
    customerInitialsBg: "bg-rose-100 text-rose-800",
    reportDate: "Jul 28, 2026",
    damageType: "Dent",
    severity: "Moderate",
    status: "Approved",
    estimatedCost: "$280",
    damageArea: "Passenger door bottom crease",
    inspectionPhase: "Return Inspection",
    rentsystSynced: true,
  },
  {
    id: "DR-2026-0883",
    vehicle: "Audi Q7",
    plate: "CUR-4824",
    customer: "Marcus Johnson",
    customerId: "CUS-004",
    customerInitials: "M",
    customerInitialsBg: "bg-lime-100 text-lime-800",
    reportDate: "Jul 22, 2026",
    damageType: "Dent",
    severity: "Moderate",
    status: "Pending",
    estimatedCost: "$180",
    damageArea: "Rear bumper parking scuff",
    inspectionPhase: "Return Inspection",
    rentsystSynced: true,
  },
  {
    id: "DR-2026-0879",
    vehicle: "Porsche Cayenne",
    plate: "CUR-4825",
    customer: "Elena Rodriguez",
    customerId: "CUS-005",
    customerInitials: "E",
    customerInitialsBg: "bg-purple-100 text-purple-800",
    reportDate: "Jul 18, 2026",
    damageType: "Chip",
    severity: "Minor",
    status: "Approved",
    estimatedCost: "$85",
    damageArea: "Windshield minor gravel rock chip",
    inspectionPhase: "Pre-Rental Self-Checkin",
    rentsystSynced: true,
  },
  {
    id: "DR-2026-0874",
    vehicle: "Range Rover Sport",
    plate: "CUR-4826",
    customer: "David Kim",
    customerId: "CUS-006",
    customerInitials: "D",
    customerInitialsBg: "bg-indigo-100 text-indigo-800",
    reportDate: "Jul 14, 2026",
    damageType: "Wheel Rim",
    severity: "Minor",
    status: "Approved",
    estimatedCost: "$160",
    damageArea: "Alloy wheel rim curb scuff",
    inspectionPhase: "Return Inspection",
    rentsystSynced: true,
  },
  {
    id: "DR-2026-0868",
    vehicle: "Volvo XC90",
    plate: "CUR-4827",
    customer: "Aisha Thompson",
    customerId: "CUS-007",
    customerInitials: "A",
    customerInitialsBg: "bg-teal-100 text-teal-800",
    reportDate: "Jul 5, 2026",
    damageType: "Collision",
    severity: "Minor",
    status: "Approved",
    estimatedCost: "$350",
    damageArea: "Left tail light housing lens crack",
    inspectionPhase: "Return Inspection",
    rentsystSynced: true,
  },
];

export const DamageReportsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState<DamageSubmission | null>(null);

  const filtered = mockDamageList.filter((r) => {
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const matchSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.toLowerCase().includes(search.toLowerCase()) ||
      r.plate.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">Damage Reports</h2>
          <p className="text-xs text-[#64748B]">
            Review, assess, and manage vehicle damage submissions
          </p>
        </div>
      </div>

      {/* 4 Stat Cards matching Figma node 11:10216 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
            Total Reports
          </div>
          <div className="text-3xl font-black text-[#0284C7] mt-1">7</div>
          <div className="text-xs text-[#64748B] mt-1">All time</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
            Pending Review
          </div>
          <div className="text-3xl font-black text-[#F59E0B] mt-1">1</div>
          <div className="text-xs text-[#64748B] mt-1">Awaiting action</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
            Under Review
          </div>
          <div className="text-3xl font-black text-[#0284C7] mt-1">2</div>
          <div className="text-xs text-[#64748B] mt-1">In progress</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
            Est. Total Costs
          </div>
          <div className="text-3xl font-black text-[#EF4444] mt-1">$78,440</div>
          <div className="text-xs text-[#64748B] mt-1">Across all reports</div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        {/* Filter bar */}
        <div className="p-6 border-b border-[#F1F5F9] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-96">
            <Input
              placeholder="Search reports, customers, vehicles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4 text-[#94A3B8]" />}
              className="h-10 text-xs bg-[#F8FAFC] border-[#E2E8F0] rounded-xl"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-xl border border-[#E2E8F0] bg-white text-xs font-semibold text-[#475569]"
            >
              <option value="All">All Statuses</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-6">Report ID</th>
                <th className="py-3.5 px-6">Vehicle</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Report Date</th>
                <th className="py-3.5 px-6">Damage Type</th>
                <th className="py-3.5 px-6">Severity</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#0284C7]">{r.id}</td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#0F172A]">{r.vehicle}</div>
                    <div className="font-mono text-[11px] text-[#94A3B8]">{r.plate}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full font-bold text-[10px] flex items-center justify-center",
                          r.customerInitialsBg
                        )}
                      >
                        {r.customerInitials}
                      </div>
                      <div>
                        <div className="font-bold text-[#0F172A]">{r.customer}</div>
                        <div className="text-[10px] text-[#94A3B8] font-mono">{r.customerId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#64748B]">{r.reportDate}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-[#475569]">
                      {r.damageType}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-[11px] font-bold",
                        r.severity === "Critical" && "text-[#DC2626]",
                        r.severity === "Severe" && "text-[#EA580C]",
                        r.severity === "Moderate" && "text-[#D97706]",
                        r.severity === "Minor" && "text-[#16A34A]"
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {r.severity}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold",
                        r.status === "Under Review" && "bg-[#E0F2FE] text-[#0284C7]",
                        r.status === "Approved" && "bg-[#DCFCE7] text-[#16A34A]",
                        r.status === "Pending" && "bg-[#F1F5F9] text-[#64748B]",
                        r.status === "Rejected" && "bg-[#FEE2E2] text-[#DC2626]"
                      )}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedReport(r)}
                        className="px-3 py-1 rounded-lg border border-[#E2E8F0] hover:bg-[#F0F9FF] text-[#0284C7] font-bold text-xs transition-colors"
                      >
                        View Details
                      </button>
                      {r.status === "Pending" && (
                        <>
                          <button
                            type="button"
                            onClick={() => toast.success(`Approved report ${r.id}`)}
                            className="p-1 rounded-md bg-emerald-50 text-[#16A34A] border border-emerald-200"
                            title="Approve"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => toast.error(`Rejected report ${r.id}`)}
                            className="p-1 rounded-md bg-red-50 text-[#DC2626] border border-red-200"
                            title="Reject"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
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
          <div>7 records displayed</div>
          <button
            type="button"
            className="w-7 h-7 rounded-lg bg-[#0284C7] text-white font-bold text-xs flex items-center justify-center shadow-xs"
          >
            1
          </button>
        </div>
      </div>

      {/* Incident Dossier Inspector Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#E2E8F0] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
              <div>
                <span className="text-[10px] font-bold text-[#0284C7] uppercase tracking-wider font-mono">
                  Inspection Dossier
                </span>
                <h3 className="font-black text-lg text-[#0F172A]">{selectedReport.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#94A3B8] font-bold">Vehicle</span>
                  <div className="font-bold text-[#0F172A] mt-0.5">
                    {selectedReport.vehicle} · {selectedReport.plate}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#94A3B8] font-bold">Renter / Customer</span>
                  <div className="font-bold text-[#0F172A] mt-0.5">
                    {selectedReport.customer} ({selectedReport.customerId})
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-[#94A3B8] font-bold">Damage Assessment</span>
                <div className="font-bold text-sm text-[#0F172A] mt-1">
                  {selectedReport.damageArea}
                </div>
                <p className="text-[#64748B] mt-1">
                  Incident logged during automatic check-in scan. Verified with Convadis collision
                  G-sensor telemetry.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#94A3B8] font-bold">Reported Date</span>
                  <div className="font-semibold text-[#0F172A] mt-0.5">
                    {selectedReport.reportDate}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]/60">
                  <span className="text-[#92400E] font-bold">Estimated Repair Claim</span>
                  <div className="font-black text-sm text-[#B45309] mt-0.5">
                    {selectedReport.estimatedCost}
                  </div>
                </div>
              </div>

              {/* Photo Evidence Slots */}
              <div>
                <span className="font-bold text-[#0F172A] block mb-2">
                  IoT Camera Photos Sync (3 Verified)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className="h-20 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-[#94A3B8] text-[11px] hover:border-[#0284C7] cursor-pointer"
                    >
                      <Camera className="w-5 h-5 mb-1 text-[#64748B]" />
                      Evidence #{idx}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#F1F5F9]">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:bg-slate-50"
              >
                Close
              </button>
              <Link
                to="/deposits"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Deduct from $400 Hold</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  toast.success(`Claim for ${selectedReport.id} synced with Rentsyst damage log!`);
                  setSelectedReport(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve & Sync Rentsyst</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
