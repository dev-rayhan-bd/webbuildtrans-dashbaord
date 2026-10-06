import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Plus,
  ClipboardList,
  DollarSign,
  Car,
  CreditCard,
  UserCheck,
  CheckCircle2,
  TrendingUp,
  ShieldAlert,
  FileCheck,
} from "lucide-react";
import { toast } from "sonner";

export const CustomerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs">
        <Link
          to="/customers"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Customers</span>
        </Link>
        <span className="text-[#94A3B8]">/</span>
        <span className="font-bold text-[#0F172A]">Sarah Mitchell</span>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#EBF5FF] text-[#0284C7] font-black text-2xl flex items-center justify-center shadow-xs flex-shrink-0">
            SM
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black text-[#0F172A]">Sarah Mitchell</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A]">
                Active
              </span>
            </div>
            <div className="text-xs font-mono text-[#94A3B8] mt-0.5">{id || "CUS-001"}</div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#94A3B8]" />
                sarah.mitchell@email.com
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#94A3B8]" />
                +1 (555) 248-3901
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                New York, NY
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#94A3B8]" />
                Member since 2024-03-12
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            type="button"
            onClick={() => toast.warning("Customer account blocked from mobile access & digital key access")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-200 text-[#DC2626] hover:bg-red-50 text-xs font-bold transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Block Account</span>
          </button>
          <button
            type="button"
            onClick={() => toast.info("Edit customer dialog opened")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A] transition-colors"
          >
            <Edit className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Edit</span>
          </button>
          <Link
            to="/reservations"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-xs font-bold text-white transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Reservation</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards matching Figma node 8:2683 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#0284C7] flex items-center justify-center font-bold">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#0F172A]">14</div>
            <div className="text-xs font-semibold text-[#64748B]">Total Reservations</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#0F172A]">$8,420</div>
            <div className="text-xs font-semibold text-[#64748B]">Total Spent</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#ECFEFF] text-[#06B6D4] flex items-center justify-center font-bold">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#0F172A]">0</div>
            <div className="text-xs font-semibold text-[#64748B]">Active Rentals</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#0F172A]">$500</div>
            <div className="text-xs font-semibold text-[#64748B]">Held Deposits</div>
          </div>
        </div>
      </div>

      {/* Split Layout: Reservation History & Right Dossier Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Cols: Reservation History */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#F1F5F9]">
            <h3 className="text-base font-bold text-[#0F172A]">Reservation History</h3>
            <p className="text-xs text-[#64748B]">Completed and upcoming vehicle leases</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-6">Reservation ID</th>
                  <th className="py-3.5 px-6">Vehicle</th>
                  <th className="py-3.5 px-6">Pickup</th>
                  <th className="py-3.5 px-6">Return</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Deposit</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                <tr className="hover:bg-[#F8FAFC]/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0284C7]">
                    <Link to="/reservations/RES-4821" className="hover:underline">
                      RES-4821
                    </Link>
                  </td>
                  <td className="py-4 px-6 font-semibold text-[#0F172A]">Tesla Model 3</td>
                  <td className="py-4 px-6 text-[#64748B]">2026-08-03</td>
                  <td className="py-4 px-6 text-[#64748B]">2026-08-07</td>
                  <td className="py-4 px-6 font-bold text-[#0F172A]">$680</td>
                  <td className="py-4 px-6 text-[#64748B]">$400</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E0F2FE] text-[#0284C7]">
                      Upcoming
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-[#F8FAFC]/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0284C7]">
                    <Link to="/reservations/RES-4740" className="hover:underline">
                      RES-4740
                    </Link>
                  </td>
                  <td className="py-4 px-6 font-semibold text-[#0F172A]">BMW 5 Series</td>
                  <td className="py-4 px-6 text-[#64748B]">2026-06-10</td>
                  <td className="py-4 px-6 text-[#64748B]">2026-06-14</td>
                  <td className="py-4 px-6 font-bold text-[#0F172A]">$920</td>
                  <td className="py-4 px-6 text-[#64748B]">$400</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F1F5F9] text-[#475569]">
                      Completed
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-[#F8FAFC]/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#0284C7]">
                    <Link to="/reservations/RES-4671" className="hover:underline">
                      RES-4671
                    </Link>
                  </td>
                  <td className="py-4 px-6 font-semibold text-[#0F172A]">Audi Q7</td>
                  <td className="py-4 px-6 text-[#64748B]">2026-04-22</td>
                  <td className="py-4 px-6 text-[#64748B]">2026-04-26</td>
                  <td className="py-4 px-6 font-bold text-[#0F172A]">$1,140</td>
                  <td className="py-4 px-6 text-[#64748B]">$400</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F1F5F9] text-[#475569]">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
            <div>Showing 3 of 14 total reservations</div>
            <div className="font-bold text-[#0284C7]">Lifetime: $8,420</div>
          </div>
        </div>

        {/* Right 4 Cols: Contact Info & Uploaded Documents & Timeline */}
        <div className="lg:col-span-4 space-y-6">
          {/* Uploaded Documents Card (Section 2.A) */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0F172A]">Identity Documents</h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Verified
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="font-bold text-[#0F172A]">Driver's License (US)</div>
                    <div className="text-[10px] text-[#64748B]">NY #928104812 · Exp: 2028-11</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toast.info("Opening Driver License Scan preview")}
                  className="text-[11px] font-bold text-[#0284C7] hover:underline"
                >
                  View
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <div>
                    <div className="font-bold text-[#0F172A]">Passport / National ID</div>
                    <div className="text-[10px] text-[#64748B]">USA #E92810419 · Verified</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toast.info("Opening Passport Scan preview")}
                  className="text-[11px] font-bold text-[#0284C7] hover:underline"
                >
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0F172A] mb-4">Contact Information</h3>
            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Email</span>
                <div className="font-bold text-[#0F172A] mt-0.5">sarah.mitchell@email.com</div>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Phone</span>
                <div className="font-bold text-[#0F172A] mt-0.5">+1 (555) 248-3901</div>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Location</span>
                <div className="font-bold text-[#0F172A] mt-0.5">New York, NY</div>
              </div>
            </div>
          </div>

          {/* Account Timeline Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0F172A] mb-4">Account Timeline</h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0284C7] flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#0F172A]">Account created</div>
                  <div className="text-[11px] text-[#64748B]">Mar 12, 2024</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#0F172A]">First reservation made</div>
                  <div className="text-[11px] text-[#64748B]">Mar 20, 2024</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-100 text-[#06B6D4] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#0F172A]">Profile verified</div>
                  <div className="text-[11px] text-[#64748B]">Apr 02, 2024</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-[#9333EA] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#0F172A]">Premium tier unlocked</div>
                  <div className="text-[11px] text-[#64748B]">Aug 15, 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
