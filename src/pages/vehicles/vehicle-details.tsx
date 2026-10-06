import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Edit,
  Wrench,
  Radio,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export const VehicleDetailsPage = () => {
  const [selectedPhoto, setSelectedPhoto] = useState("/Container.png");

  const photos = [
    "/Container.png",
    "/Container.png",
    "/Container.png",
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/vehicles"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A] font-semibold text-xs transition-colors w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Vehicle List</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() =>
              toast.info(
                "Maintenance Mode toggled: Vehicle hidden from Cura Explore mobile app"
              )
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-xs font-bold text-amber-800 transition-colors"
          >
            <Wrench className="w-3.5 h-3.5 text-amber-700" />
            <span>Set Maintenance Mode</span>
          </button>
          <button
            type="button"
            onClick={() => toast.info("Vehicle edit mode activated")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A] transition-colors"
          >
            <Edit className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Edit Vehicle</span>
          </button>
          <button
            type="button"
            onClick={() => toast.success("Convadis telematics hardware status: Synced & Healthy")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all shadow-xs"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Telematics Status</span>
          </button>
        </div>
      </div>

      {/* Split Columns Layout matching Figma node 9:5413 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Gallery, Specs & Damage Summary (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Vehicle Gallery */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0F172A] mb-4">Vehicle Gallery</h3>

            {/* Main Hero Photo */}
            <div className="h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-100 border border-[#E2E8F0]">
              <img
                src={selectedPhoto}
                alt="Selected Vehicle Preview"
                className="w-full h-full object-cover transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/Container.png";
                }}
              />
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-3 mt-4">
              {photos.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPhoto(p)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedPhoto === p
                      ? "border-[#0284C7] shadow-sm"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={p}
                    alt={`Thumb ${idx}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/Container.png";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0F172A] mb-4">Vehicle Information</h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Make & Model</span>
                <span className="font-bold text-[#0F172A]">Tesla Model 3 Long Range</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Year</span>
                <span className="font-bold text-[#0F172A]">2023</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Color</span>
                <span className="font-bold text-[#0F172A]">Pearl White</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Fuel Type</span>
                <span className="font-bold text-[#10B981]">Electric</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Transmission</span>
                <span className="font-bold text-[#0F172A]">Automatic</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Seats</span>
                <span className="font-bold text-[#0F172A]">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Category</span>
                <span className="font-bold text-[#0F172A]">Electric Sedan</span>
              </div>
            </div>
          </div>

          {/* Damage Summary */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0F172A]">Damage Summary</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#D97706]">
                2 items
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]/60">
                <div className="flex items-center justify-between font-bold text-[#0F172A]">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                    Front bumper
                  </span>
                </div>
                <div className="text-[11px] text-[#64748B] mt-1">
                  Minor scratch · 2024-01-14 · Rental return
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]/60">
                <div className="flex items-center justify-between font-bold text-[#0F172A]">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                    Rear left door
                  </span>
                </div>
                <div className="text-[11px] text-[#64748B] mt-1">
                  Small dent · 2023-11-02 · Customer report
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Registration, Status & Convadis Device (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Registration Details */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0F172A] mb-4">Registration Details</h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Registration No.</span>
                <span className="font-mono font-bold text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded">
                  CUR-456-AB
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">VIN / Chassis</span>
                <span className="font-mono font-bold text-[#0F172A]">5YJ3E1EA7NF123456</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Mileage</span>
                <span className="font-bold text-[#0F172A]">18,420 km</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Insurance</span>
                <span className="font-bold text-[#0F172A]">Curaçao Fleet All-Risk</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Insurance Expiry</span>
                <span className="font-bold text-[#0F172A]">2026-12-31</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Next Service</span>
                <span className="font-bold text-[#D97706]">2026-11-15</span>
              </div>
            </div>
          </div>

          {/* Rental Status */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                Available
              </span>
              <div className="text-xs text-[#64748B]">Current Status (In App)</div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-[#0F172A]">$149</span>
              <span className="text-xs text-[#94A3B8]"> /day (USD)</span>
            </div>
          </div>

          {/* Connected Device Status (Convadis) */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0F172A]">Connected Device Status</h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-full">
                Active Telematics
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Device ID</span>
                <span className="font-mono font-bold text-[#0F172A]">CVD-00412</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Convadis Status</span>
                <span className="font-bold text-[#16A34A]">Connected</span>
              </div>

              {/* 3 Status indicators matching Figma checks */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]/60">
                  <div className="w-6 h-6 rounded-md bg-[#10B981] text-white flex items-center justify-center mx-auto mb-1">
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div className="text-[11px] font-bold text-[#0F172A]">Bluetooth</div>
                </div>

                <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]/60">
                  <div className="w-6 h-6 rounded-md bg-[#10B981] text-white flex items-center justify-center mx-auto mb-1">
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div className="text-[11px] font-bold text-[#0F172A]">GPS</div>
                </div>

                <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]/60">
                  <div className="w-6 h-6 rounded-md bg-[#10B981] text-white flex items-center justify-center mx-auto mb-1">
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div className="text-[11px] font-bold text-[#0F172A]">Last Sync</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
