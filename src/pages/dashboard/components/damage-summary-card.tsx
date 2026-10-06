import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/shared/lib/utils";

interface DamageIncident {
  id: string;
  vehicle: string;
  customerDate: string;
  status: "Under Review" | "Pending" | "Resolved";
}

const recentIncidents: DamageIncident[] = [
  {
    id: "DMG-112",
    vehicle: "BMW 5 Series",
    customerDate: "James Chen · 2026-08-01",
    status: "Under Review",
  },
  {
    id: "DMG-111",
    vehicle: "Audi Q7",
    customerDate: "Marcus Johnson · 2026-07-29",
    status: "Pending",
  },
  {
    id: "DMG-110",
    vehicle: "Volvo XC90",
    customerDate: "Aisha Thompson · 2026-07-21",
    status: "Resolved",
  },
];

export const DamageSummaryCard = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header with Title and '2 Open' pill */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">Damage Reports</h2>
          <p className="text-xs text-[#64748B]">Recent incidents</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEE2E2] text-[#DC2626]">
          2 Open
        </span>
      </div>

      {/* Incident List */}
      <div className="space-y-3 my-4">
        {recentIncidents.map((incident) => (
          <div
            key={incident.id}
            className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-colors flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#DC2626]">
                {incident.id}
              </span>
              <span
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold",
                  incident.status === "Under Review" && "bg-[#E0F2FE] text-[#0284C7]",
                  incident.status === "Pending" && "bg-[#FEF3C7] text-[#D97706]",
                  incident.status === "Resolved" && "bg-[#DCFCE7] text-[#16A34A]"
                )}
              >
                {incident.status}
              </span>
            </div>

            <div className="mt-2 font-bold text-xs text-[#0F172A]">
              {incident.vehicle}
            </div>

            <div className="mt-1 flex items-center justify-between text-[11px] text-[#64748B]">
              <span>{incident.customerDate}</span>
              <Link
                to="/damage-reports"
                className="inline-flex items-center gap-0.5 font-bold text-[#0284C7] hover:underline"
              >
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All link */}
      <div className="pt-2 text-center">
        <Link
          to="/damage-reports"
          className="text-xs font-semibold text-[#0284C7] hover:underline"
        >
          View All Damage Reports →
        </Link>
      </div>
    </div>
  );
};
