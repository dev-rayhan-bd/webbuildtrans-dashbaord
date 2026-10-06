import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  XCircle,
  Edit,
  FileText,
  Car,
  User,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Circle,
  Wifi,
} from "lucide-react";
import { toast } from "sonner";

export const ReservationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Status Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <Link
            to="/reservations"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Reservations</span>
          </Link>
          <span className="text-[#94A3B8]">/</span>
          <span className="font-bold text-[#0F172A]">{id || "RES-4821"}</span>
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#E0F2FE] text-[#0284C7]">
          Upcoming
        </span>
      </div>

      {/* Main Reservation Hero Banner */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
            Reservation
          </div>
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight mt-0.5">
            {id || "RES-4821"}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5 font-bold text-[#0F172A]">
              <Car className="w-4 h-4 text-[#0284C7]" />
              Tesla Model 3
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#94A3B8]" />
              Sarah Mitchell
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#94A3B8]" />
              2026-08-03 → 2026-08-07
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#94A3B8]" />
              4 days
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            type="button"
            onClick={() => toast.error("Reservation cancellation requested")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-200 text-[#DC2626] hover:bg-red-50 text-xs font-bold transition-colors"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
          <button
            type="button"
            onClick={() => toast.info("Edit reservation parameters")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold transition-colors"
          >
            <Edit className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Edit</span>
          </button>
          <Link
            to="/invoices"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Invoice</span>
          </Link>
        </div>
      </div>

      {/* 3-Column Layout from Figma node 8:3735 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Vehicle Details (5 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#0F172A]">Vehicle Details</h3>

          {/* Vehicle photo preview */}
          <div className="h-44 rounded-xl overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0]">
            <img
              src="/Container.png"
              alt="Tesla Model 3"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/Container.png";
              }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <h4 className="font-black text-base text-[#0F172A]">Tesla Model 3</h4>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#16A34A]">
              Available
            </span>
          </div>

          {/* 3 meta pills */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-[10px] text-[#94A3B8] font-bold">PLATE</div>
              <div className="font-bold text-[#0284C7] mt-0.5">CUR-4821</div>
            </div>
            <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-[10px] text-[#94A3B8] font-bold">ID</div>
              <div className="font-bold text-[#0284C7] mt-0.5">V-001</div>
            </div>
            <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
              <div className="text-[10px] text-[#94A3B8] font-bold">DEVICE</div>
              <div className="font-bold text-[#10B981] mt-0.5 flex items-center justify-center gap-1">
                <Wifi className="w-3 h-3" />
                <span>Connected</span>
              </div>
            </div>
          </div>

          {/* Pickup and Return Location */}
          <div className="pt-2 space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#0284C7] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#94A3B8] text-[10px] uppercase tracking-wider">
                  Pickup
                </span>
                <div className="font-semibold text-[#0F172A]">Hato International Airport (CUR)</div>
                <div className="text-[11px] text-[#94A3B8]">Plaza Car Rental Lot A-12</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#0284C7] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#94A3B8] text-[10px] uppercase tracking-wider">
                  Return
                </span>
                <div className="font-semibold text-[#0F172A]">Hato International Airport (CUR)</div>
                <div className="text-[11px] text-[#94A3B8]">Keyless Dropoff Zone</div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Customer & Pre-Checkin Status (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Customer Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0F172A]">Customer</h3>
              <Link to="/customers/CUS-001" className="text-xs font-bold text-[#0284C7] hover:underline">
                View Profile
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#EBF5FF] text-[#0284C7] font-black text-sm flex items-center justify-center shadow-xs flex-shrink-0">
                SM
              </div>
              <div>
                <div className="font-bold text-sm text-[#0F172A]">Sarah Mitchell</div>
                <div className="text-xs font-mono text-[#94A3B8]">CUS-001 · Verified License</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#F1F5F9] space-y-2 text-xs text-[#64748B]">
              <div>sarah.mitchell@email.com</div>
              <div>+1 (555) 248-3901</div>
            </div>
          </div>

          {/* Pre-Checkin & Virtual Agent Workflow (from provided doc) */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Digital Agent Check-in</h3>
                <p className="text-[11px] text-[#64748B]">Self check-in verification audit</p>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                100% Ready
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0F172A]">Curaçao Driving Rules Video</div>
                  <div className="text-[10px] text-[#64748B]">Watched on Aug 1, 2026 · 08:14 AM</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0F172A]">All-Risk Insurance Add-on</div>
                  <div className="text-[10px] text-[#64748B]">Accepted (+$35/day · Paid via Stripe)</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0F172A]">Rentsyst Rental Contract</div>
                  <div className="text-[10px] text-[#64748B]">Digitally signed in-app</div>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success("Opening signed Rentsyst PDF contract")}
                  className="text-[11px] font-bold text-[#0284C7] hover:underline"
                >
                  View PDF
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#0F172A]">Convadis BLE Key</div>
                  <div className="text-[10px] text-[#64748B]">C-Box Bluetooth digital key provisioned</div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0F172A] mb-4">Payment & Deposit</h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-[#64748B]">
                <span>Daily Rate × 4 days</span>
                <span className="font-semibold text-[#0F172A]">$170 × 4</span>
              </div>
              <div className="flex items-center justify-between text-[#64748B]">
                <span>All-Risk Insurance (4 days)</span>
                <span className="font-semibold text-[#0F172A]">$35 × 4 = $140</span>
              </div>
              <div className="flex items-center justify-between text-[#64748B]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#0F172A]">$820.00</span>
              </div>
              <div className="flex items-center justify-between text-[#64748B]">
                <span>Curaçao Sales Tax (OB 6%)</span>
                <span className="font-semibold text-[#0F172A]">$49.20</span>
              </div>

              <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between">
                <span className="font-bold text-[#0F172A]">Total Charged (Stripe)</span>
                <span className="text-xl font-black text-[#0284C7]">$869.20</span>
              </div>
            </div>

            {/* Security Deposit Container ($400 hold strictly) */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]/60 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#92400E]">
                  Security Deposit ($400 Hold)
                </div>
                <div className="text-base font-black text-[#0F172A] mt-0.5">$400.00 USD</div>
                <div className="text-[10px] text-[#B45309] font-mono mt-0.5">pi_3M92830198 · Card on file</div>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF3C7] text-[#D97706]">
                Held
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Reservation Timeline (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h3 className="text-base font-bold text-[#0F172A] mb-5">Reservation Timeline</h3>

          <div className="space-y-6 text-xs relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E8F0]">
            {/* Step 1: Created */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-5 h-5 rounded-full bg-[#0284C7] text-white flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="font-bold text-[#0284C7]">Reservation Created</div>
              <div className="text-[11px] text-[#94A3B8]">Aug 1, 2026 · 08:14 AM</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">Booking confirmed and payment processed</div>
            </div>

            {/* Step 2: Deposit Collected */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="font-bold text-[#10B981]">Deposit Collected</div>
              <div className="text-[11px] text-[#94A3B8]">Aug 1, 2026 · 08:15 AM</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">Security deposit held on card</div>
            </div>

            {/* Step 3: Vehicle Assigned */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-5 h-5 rounded-full bg-[#0284C7] text-white flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <div className="font-bold text-[#0284C7]">Vehicle Assigned</div>
              <div className="text-[11px] text-[#94A3B8]">Aug 1, 2026 · 10:30 AM</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">Vehicle and device mapping confirmed</div>
            </div>

            {/* Step 4: Pickup Scheduled */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-5 h-5 rounded-full bg-slate-100 text-[#94A3B8] flex items-center justify-center border border-[#CBD5E1]">
                <Circle className="w-2.5 h-2.5 fill-current" />
              </div>
              <div className="font-bold text-[#64748B]">Pickup Scheduled</div>
              <div className="text-[11px] text-[#94A3B8]">Aug 3, 2026</div>
            </div>

            {/* Step 5: Return & Inspection */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-5 h-5 rounded-full bg-slate-100 text-[#94A3B8] flex items-center justify-center border border-[#CBD5E1]">
                <Circle className="w-2.5 h-2.5 fill-current" />
              </div>
              <div className="font-bold text-[#64748B]">Return & Inspection</div>
              <div className="text-[11px] text-[#94A3B8]">Aug 7, 2026</div>
            </div>

            {/* Step 6: Deposit Release or Damage Capture */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-5 h-5 rounded-full bg-slate-100 text-[#94A3B8] flex items-center justify-center border border-[#CBD5E1]">
                <Circle className="w-2.5 h-2.5 fill-current" />
              </div>
              <div className="font-bold text-[#64748B]">Deposit Release / Damage Capture</div>
              <div className="text-[11px] text-[#94A3B8]">Aug 7, 2026 · Post-inspection</div>
              <div className="text-[11px] text-[#64748B] mt-0.5">$400 hold released or partial capture via Stripe</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
