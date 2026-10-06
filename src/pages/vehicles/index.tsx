import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Plus,
  Download,
  Car,
  CheckSquare,
  Key,
  Wrench,
  ArrowRight,
  Wifi,
  RefreshCw,
} from "lucide-react";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";

export interface FleetVehicleItem {
  id: string;
  name: string;
  year: string;
  image: string;
  category: string;
  registration: string;
  status: "Available" | "Rented" | "Maintenance" | "Reserved";
  availability: "Available" | "Unavailable";
  dailyPrice: string;
  convadisStatus: "Connected" | "Disconnected" | "Syncing";
  rentsystSynced: boolean;
}

export const mockVehicleList: FleetVehicleItem[] = [
  {
    id: "VEH-001",
    name: "Tesla Model 3",
    year: "2023",
    image: "/Container.png",
    category: "Electric Sedan",
    registration: "CUR - 456 - AB",
    status: "Available",
    availability: "Available",
    dailyPrice: "$149",
    convadisStatus: "Connected",
    rentsystSynced: true,
  },
  {
    id: "VEH-002",
    name: "BMW 5 Series",
    year: "2022",
    image: "/Container.png",
    category: "Premium Sedan",
    registration: "CUR - 123 - CD",
    status: "Rented",
    availability: "Unavailable",
    dailyPrice: "$189",
    convadisStatus: "Connected",
    rentsystSynced: true,
  },
  {
    id: "VEH-003",
    name: "Mercedes GLE",
    year: "2023",
    image: "/Container.png",
    category: "Luxury SUV",
    registration: "CUR - 789 - EF",
    status: "Maintenance",
    availability: "Unavailable",
    dailyPrice: "$229",
    convadisStatus: "Disconnected",
    rentsystSynced: true,
  },
  {
    id: "VEH-004",
    name: "Audi A4",
    year: "2022",
    image: "/Container.png",
    category: "Business Sedan",
    registration: "CUR - 321 - GH",
    status: "Reserved",
    availability: "Unavailable",
    dailyPrice: "$129",
    convadisStatus: "Syncing",
    rentsystSynced: true,
  },
  {
    id: "VEH-005",
    name: "Volkswagen Tiguan",
    year: "2023",
    image: "/Container.png",
    category: "Compact SUV",
    registration: "CUR - 654 - IJ",
    status: "Available",
    availability: "Available",
    dailyPrice: "$109",
    convadisStatus: "Connected",
    rentsystSynced: true,
  },
];

export const VehiclesPage = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filtered = mockVehicleList.filter((v) => {
    const matchStatus = statusFilter === "All" || v.status === statusFilter;
    const matchCat = categoryFilter === "All" || v.category.includes(categoryFilter);
    const matchSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.registration.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 4 Stat Cards matching Figma node 9:4961 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Total */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Total Vehicles</div>
            <div className="text-3xl font-black text-[#0F172A] mt-1">6</div>
            <div className="text-[11px] font-bold text-[#16A34A] mt-1">▲ +2 this month</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0284C7] flex items-center justify-center">
            <Car className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Available */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Available Now</div>
            <div className="text-3xl font-black text-[#10B981] mt-1">3</div>
            <div className="text-[11px] font-bold text-[#16A34A] mt-1">▲ 50% fleet</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Rented */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">Currently Rented</div>
            <div className="text-3xl font-black text-[#0284C7] mt-1">1</div>
            <div className="text-[11px] font-bold text-[#16A34A] mt-1">▲ 17% this week</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0284C7] flex items-center justify-center">
            <Key className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Maintenance */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-[#64748B]">In Maintenance</div>
            <div className="text-3xl font-black text-[#EF4444] mt-1">1</div>
            <div className="text-[11px] font-bold text-[#DC2626] mt-1">▼ 1 overdue</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#EF4444] flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        {/* Table Top Bar */}
        <div className="p-6 border-b border-[#F1F5F9] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <h3 className="text-lg font-bold text-[#0F172A]">All Vehicles</h3>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={() => toast.success("Synced 6 vehicles from Rentsyst CRM fleet")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-sky-200 bg-sky-50 text-xs font-bold text-[#0284C7] hover:bg-sky-100 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync Rentsyst</span>
            </button>
            <button
              type="button"
              onClick={() => toast.success("Fleet report export started (CSV/PDF)")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A] transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Export</span>
            </button>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>
          </div>
        </div>

        {/* Filter bar with Search, Status, Category */}
        <div className="p-4 bg-[#F8FAFC]/50 border-b border-[#F1F5F9] flex flex-wrap items-center gap-3">
          <div className="w-72">
            <Input
              placeholder="Search vehicles, plates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Reserved">Reserved</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 px-3 rounded-xl border border-[#E2E8F0] bg-white text-xs font-medium text-[#475569]"
          >
            <option value="All">All Categories</option>
            <option value="Sedan">Sedans</option>
            <option value="SUV">SUVs</option>
            <option value="Electric">Electric Vehicles</option>
          </select>
        </div>

        {/* Vehicle Table matching Figma */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-6">Vehicle</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Registration</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Availability</th>
                <th className="py-3.5 px-6">Daily Price</th>
                <th className="py-3.5 px-6">Convadis</th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-9 rounded-lg overflow-hidden bg-slate-100 border border-[#E2E8F0] flex-shrink-0">
                        <img
                          src={v.image}
                          alt={v.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/Container.png";
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#0F172A]">{v.name}</div>
                        <div className="text-[11px] text-[#94A3B8]">{v.year}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-[#475569]">{v.category}</td>
                  <td className="py-4 px-6">
                    <span className="font-mono font-bold text-xs bg-slate-100 text-[#0F172A] px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                      {v.registration}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold",
                        v.status === "Available" && "bg-[#DCFCE7] text-[#16A34A]",
                        v.status === "Rented" && "bg-[#E0F2FE] text-[#0284C7]",
                        v.status === "Maintenance" && "bg-[#FEE2E2] text-[#DC2626]",
                        v.status === "Reserved" && "bg-[#FEF3C7] text-[#D97706]"
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {v.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-semibold",
                        v.availability === "Available" ? "text-[#16A34A]" : "text-[#64748B]"
                      )}
                    >
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full",
                          v.availability === "Available" ? "bg-[#10B981]" : "bg-[#94A3B8]"
                        )}
                      />
                      {v.availability}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-black text-[#0F172A]">{v.dailyPrice}</span>
                    <span className="text-[11px] text-[#94A3B8]"> / day</span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-bold",
                        v.convadisStatus === "Connected" && "text-[#16A34A]",
                        v.convadisStatus === "Disconnected" && "text-[#DC2626]",
                        v.convadisStatus === "Syncing" && "text-[#D97706]"
                      )}
                    >
                      <Wifi className="w-3.5 h-3.5" />
                      {v.convadisStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link
                        to={`/vehicles/${v.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[#0284C7] hover:bg-[#F0F9FF] text-xs font-bold transition-colors"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          toast.info(
                            `${v.name} status updated: ${
                              v.status === "Maintenance"
                                ? "Restored to Available"
                                : "Set to Maintenance Mode (Hidden from mobile app)"
                            }`
                          )
                        }
                        title="Toggle Maintenance Mode (Hide/Show in Mobile App)"
                        className="p-1.5 rounded-lg border border-[#E2E8F0] hover:bg-amber-50 hover:text-amber-700 text-[#64748B] transition-colors"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
          <div>Showing 1–5 of 6 vehicles</div>
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

      {/* Add Vehicle Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E2E8F0] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-[#0284C7]" />
                <h3 className="font-bold text-base text-[#0F172A]">Enroll Fleet Vehicle</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Vehicle registered and telematics handshake initiated!");
                setIsAddModalOpen(false);
              }}
              className="py-4 space-y-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Make & Model</label>
                  <input
                    required
                    defaultValue="Audi e-tron GT"
                    className="w-full h-9 rounded-lg border border-[#E2E8F0] px-3 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Model Year</label>
                  <input
                    required
                    defaultValue="2024"
                    className="w-full h-9 rounded-lg border border-[#E2E8F0] px-3 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Swiss License Plate</label>
                  <input
                    required
                    defaultValue="ZH - 991 - XY"
                    className="w-full h-9 rounded-lg border border-[#E2E8F0] px-3 text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">VIN / Chassis</label>
                  <input
                    required
                    defaultValue="WAUZZZF28MA019284"
                    className="w-full h-9 rounded-lg border border-[#E2E8F0] px-3 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Daily Rate (CHF)</label>
                  <input
                    type="number"
                    required
                    defaultValue="210"
                    className="w-full h-9 rounded-lg border border-[#E2E8F0] px-3 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#0F172A] block mb-1">Convadis Device IMEI</label>
                  <input
                    required
                    defaultValue="CVD-00499"
                    className="w-full h-9 rounded-lg border border-[#E2E8F0] px-3 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#64748B] hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Enroll Vehicle</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
