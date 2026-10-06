import { useState } from "react";
import {
  CalendarPlus,
  Car,
  KeyRound,
  FileText,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export const QuickActions = () => {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const handleAction = (name: string) => {
    setModalOpen(name);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <h2 className="text-base font-bold text-[#0F172A] mb-4">Quick Actions</h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Add Reservation */}
          <button
            type="button"
            onClick={() => handleAction("Add Reservation")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all shadow-xs"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Add Reservation</span>
          </button>

          {/* Add Vehicle */}
          <button
            type="button"
            onClick={() => handleAction("Add Vehicle")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all shadow-xs"
          >
            <Car className="w-4 h-4" />
            <span>Add Vehicle</span>
          </button>

          {/* Assign Vehicle */}
          <button
            type="button"
            onClick={() => handleAction("Assign Vehicle")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold transition-all"
          >
            <KeyRound className="w-4 h-4 text-[#64748B]" />
            <span>Assign Vehicle</span>
          </button>

          {/* Create Invoice */}
          <button
            type="button"
            onClick={() => handleAction("Create Invoice")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold transition-all"
          >
            <FileText className="w-4 h-4 text-[#64748B]" />
            <span>Create Invoice</span>
          </button>

          {/* Manage Deposit */}
          <button
            type="button"
            onClick={() => handleAction("Manage Deposit")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#0F172A] text-xs font-bold transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-[#64748B]" />
            <span>Manage Deposit</span>
          </button>
        </div>
      </div>

      {/* Interactive Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2E8F0] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
              <h3 className="font-bold text-base text-[#0F172A]">{modalOpen}</h3>
              <button
                type="button"
                onClick={() => setModalOpen(null)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <p className="text-[#64748B]">
                Configure parameters for <span className="font-bold text-[#0F172A]">{modalOpen}</span>.
              </p>
              <div>
                <label className="font-bold text-[#0F172A] block mb-1">Select Target Fleet Unit / Customer</label>
                <select className="w-full h-9 rounded-lg border border-[#E2E8F0] px-3 bg-white text-xs">
                  <option>Tesla Model 3 · CRE-4821 (Available)</option>
                  <option>BMW 5 Series · CRE-4822 (Rented)</option>
                  <option>Mercedes GLE · CRE-4823 (Available)</option>
                  <option>Sarah Mitchell (CUS-001)</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-[#0F172A] block mb-1">Reference Notes</label>
                <textarea
                  className="w-full rounded-lg border border-[#E2E8F0] p-2 text-xs"
                  rows={3}
                  placeholder="Enter details..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#F1F5F9]">
              <button
                type="button"
                onClick={() => setModalOpen(null)}
                className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.success(`${modalOpen} initiated successfully!`);
                  setModalOpen(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-xs"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Confirm Action</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
