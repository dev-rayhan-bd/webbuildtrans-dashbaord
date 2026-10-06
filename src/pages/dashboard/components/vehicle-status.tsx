import { Plus, Wifi, WifiOff } from "lucide-react";
import { Link } from "react-router";
import { cn } from "@/shared/lib/utils";

interface FleetVehicle {
  id: string;
  name: string;
  code: string;
  image: string;
  status: "Available" | "Rented" | "Maintenance";
  deviceConnected: boolean;
}

const liveVehicles: FleetVehicle[] = [
  {
    id: "VEH-001",
    name: "Tesla Model 3",
    code: "CRE-4821",
    image: "/Container.png",
    status: "Available",
    deviceConnected: true,
  },
  {
    id: "VEH-002",
    name: "BMW 5 Series",
    code: "CRE-4822",
    image: "/Container.png",
    status: "Rented",
    deviceConnected: true,
  },
  {
    id: "VEH-003",
    name: "Mercedes GLE",
    code: "CRE-4823",
    image: "/Container.png",
    status: "Available",
    deviceConnected: true,
  },
  {
    id: "VEH-004",
    name: "Audi Q7",
    code: "CRE-4824",
    image: "/Container.png",
    status: "Maintenance",
    deviceConnected: false,
  },
];

export const VehicleStatus = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm flex flex-col justify-between h-full">
      {/* Header with Title and Add Vehicle Button */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">Vehicle Status</h2>
          <p className="text-xs text-[#64748B]">Live fleet status</p>
        </div>
        <Link
          to="/vehicles"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0284C7] text-white text-xs font-bold hover:bg-[#0369A1] transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Vehicle</span>
        </Link>
      </div>

      {/* 2x2 Grid of vehicle cards matching Figma */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {liveVehicles.map((vehicle) => (
          <Link
            key={vehicle.id}
            to={`/vehicles/${vehicle.id}`}
            className="group rounded-xl border border-[#E2E8F0] overflow-hidden bg-white hover:border-[#0284C7] hover:shadow-md transition-all flex flex-col"
          >
            {/* Image Box with status badge */}
            <div className="relative h-28 bg-[#F8FAFC] overflow-hidden">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/Container.png";
                }}
              />
              <span
                className={cn(
                  "absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs",
                  vehicle.status === "Available" && "bg-[#10B981] text-white",
                  vehicle.status === "Rented" && "bg-[#0284C7] text-white",
                  vehicle.status === "Maintenance" && "bg-[#F59E0B] text-white"
                )}
              >
                {vehicle.status}
              </span>
            </div>

            {/* Details */}
            <div className="p-3">
              <div className="font-bold text-xs text-[#0F172A] truncate">{vehicle.name}</div>
              <div className="text-[11px] font-mono text-[#94A3B8]">{vehicle.code}</div>

              {/* IoT Device Connectivity */}
              <div className="mt-2 flex items-center gap-1.5 text-[11px]">
                {vehicle.deviceConnected ? (
                  <>
                    <Wifi className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="text-[#10B981] font-semibold">Device Connected</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-[#EF4444]" />
                    <span className="text-[#EF4444] font-semibold">No Device</span>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
