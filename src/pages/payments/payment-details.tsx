import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  Download,
  RotateCcw,
  CreditCard,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export const PaymentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Stripe reference copied to clipboard!");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/payments"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] font-semibold text-xs transition-colors w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Payments</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => toast.success("Invoice PDF generated and downloaded")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Download Invoice</span>
          </button>
          <button
            type="button"
            onClick={() => toast.info("Refund processing window opened")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refund Payment</span>
          </button>
        </div>
      </div>

      {/* Main Payment Banner Card matching Figma node 10:7654 */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#0284C7] flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                Payment Record
              </div>
              <h2 className="text-xl font-black text-[#0F172A]">{id || "RES-2024-0087"}</h2>
              <div className="text-xs text-[#64748B] mt-0.5">
                2024-02-15 10:22 · Visa ···· 4242
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              Stripe: succeeded
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              Paid
            </span>
          </div>
        </div>

        {/* 3 Metric Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Rental Amount</div>
            <div className="text-2xl font-black text-[#0F172A] mt-1">$680.00</div>
            <div className="text-xs text-[#94A3B8] mt-0.5">4 days × $170.00</div>
          </div>

          <div>
            <div className="text-xs font-semibold text-[#64748B]">Curaçao Tax (OB 6%)</div>
            <div className="text-2xl font-black text-[#0F172A] mt-1">$40.80</div>
            <div className="text-xs text-[#94A3B8] mt-0.5">Omzetbelasting standard rate</div>
          </div>

          <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE]/60">
            <div className="text-xs font-semibold text-[#64748B]">Total Rental Charged</div>
            <div className="text-2xl font-black text-[#0284C7] mt-1">$720.80</div>
            <div className="text-xs text-[#0284C7] font-medium mt-0.5">Stripe PaymentIntent Succeeded</div>
          </div>

          <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]/60">
            <div className="text-xs font-semibold text-[#92400E]">Security Deposit Hold</div>
            <div className="text-2xl font-black text-[#D97706] mt-1">$400.00</div>
            <div className="text-xs text-[#D97706] font-medium mt-0.5">Stripe Pre-Auth Active</div>
          </div>
        </div>
      </div>

      {/* Split Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Customer & Rental Summary (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Customer Details */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0F172A] mb-4">Customer Details</h3>

            <div className="flex items-center gap-3 pb-4 border-b border-[#F1F5F9]">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0284C7] font-black text-sm flex items-center justify-center">
                SM
              </div>
              <div>
                <div className="font-bold text-sm text-[#0F172A]">Sarah Mitchell</div>
                <div className="text-xs text-[#16A34A] font-semibold">Verified Driver's License · CUS-001</div>
              </div>
            </div>

            <div className="pt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Email</span>
                <span className="font-bold text-[#0F172A]">sarah.mitchell@email.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Phone</span>
                <span className="font-bold text-[#0F172A]">+1 (555) 248-3901</span>
              </div>
            </div>
          </div>

          {/* Rental Summary */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0F172A] mb-4">Rental Summary</h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Vehicle</span>
                <span className="font-bold text-[#0F172A]">Tesla Model 3</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Registration</span>
                <span className="font-mono font-bold text-[#0F172A]">CUR - 4821</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Rental Start</span>
                <span className="font-semibold text-[#0F172A]">2026-08-03</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Rental End</span>
                <span className="font-semibold text-[#0F172A]">2026-08-07</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Duration</span>
                <span className="font-bold text-[#0F172A]">4 days</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Daily Rate</span>
                <span className="font-bold text-[#0F172A]">$170.00 / day</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Pickup Location</span>
                <span className="font-semibold text-[#0F172A]">Hato International Airport (CUR)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Drop-off Location</span>
                <span className="font-semibold text-[#0F172A]">Hato International Airport (CUR)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Details & Timeline (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Payment Details */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0F172A] mb-4">Payment Details</h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Method</span>
                <span className="font-bold text-[#0F172A]">Visa ···· 4242</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Stripe Reference</span>
                <span className="font-mono text-[11px] text-[#475569]">
                  pi_30kN8F2eZvKYlo2C0Qi4vKYl
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Transaction Date</span>
                <span className="font-semibold text-[#0F172A]">2024-02-15 10:22</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Stripe Status</span>
                <span className="font-bold text-[#16A34A]">succeeded</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Payment Status</span>
                <span className="font-bold text-[#16A34A]">Paid</span>
              </div>

              {/* Copyable Stripe Transaction ID Box */}
              <div className="p-3.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#0284C7]">
                    Stripe Transaction ID
                  </div>
                  <div className="font-mono text-xs font-bold text-[#0F172A] mt-0.5">
                    pi_30kN8F2eZvKYlo2C0Qi4vKYl
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard("pi_30kN8F2eZvKYlo2C0Qi4vKYl")}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#BAE6FD] text-[#0284C7] hover:bg-white/80 font-bold text-xs flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </div>

          {/* Payment Timeline */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0F172A] mb-5">Payment Timeline</h3>

            <div className="space-y-5 text-xs relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E8F0]">
              <div className="relative">
                <div className="absolute -left-[27px] top-0 w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="font-bold text-[#0F172A]">Payment initiated</div>
                <div className="text-[11px] text-[#64748B]">Visa charge submitted</div>
                <div className="text-[10px] text-[#94A3B8] mt-0.5">2024-02-15 10:22</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] top-0 w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="font-bold text-[#0F172A]">Stripe processing</div>
                <div className="text-[11px] text-[#64748B]">Authorization request sent</div>
                <div className="text-[10px] text-[#94A3B8] mt-0.5">2024-02-15 10:22</div>
              </div>

              <div className="relative">
                <div className="absolute -left-[27px] top-0 w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="font-bold text-[#0F172A]">Payment confirmed</div>
                <div className="text-[11px] text-[#64748B]">Funds captured successfully</div>
                <div className="text-[10px] text-[#94A3B8] mt-0.5">2024-02-15 10:22</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
