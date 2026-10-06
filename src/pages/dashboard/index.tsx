import {
  ClipboardList,
  Car,
  KeyRound,
  DollarSign,
  CreditCard,
  Wrench,
} from "lucide-react";
import { KpiCard } from "./components/kpi-card";
import { ReservationOverview } from "./components/reservation-overview";
import { FleetOverview } from "./components/fleet-overview";
import { RecentReservationsTable } from "./components/recent-reservations-table";
import { VehicleStatus } from "./components/vehicle-status";
import { PaymentSummary } from "./components/payment-summary";
import { DamageSummaryCard } from "./components/damage-summary-card";
import { RevenueOverview } from "./components/revenue-overview";
import { FleetUtilizationChart } from "./components/fleet-utilization-chart";
import { ReservationTrendChart } from "./components/reservation-trend-chart";

export const DashboardPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. KPI Cards Row (6 metrics from Figma node 7:3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard
          title="Total Reservations"
          value="1,482"
          change="12.4%"
          isPositive={true}
          icon={<ClipboardList className="w-5 h-5" />}
          iconBgColor="bg-[#0284C7]"
        />
        <KpiCard
          title="Active Rentals"
          value="47"
          change="8.1%"
          isPositive={true}
          icon={<Car className="w-5 h-5" />}
          iconBgColor="bg-[#06B6D4]"
        />
        <KpiCard
          title="Available Vehicles"
          value="23"
          change="3.2%"
          isPositive={false}
          icon={<KeyRound className="w-5 h-5" />}
          iconBgColor="bg-[#10B981]"
        />
        <KpiCard
          title="Monthly Revenue"
          value="$79.2K"
          change="18.7%"
          isPositive={true}
          icon={<DollarSign className="w-5 h-5" />}
          iconBgColor="bg-[#F59E0B]"
        />
        <KpiCard
          title="Pending Deposits"
          value="$14.6K"
          change="2.3%"
          isPositive={false}
          icon={<CreditCard className="w-5 h-5" />}
          iconBgColor="bg-[#8B5CF6]"
        />
        <KpiCard
          title="In Maintenance"
          value="5"
          change="1 vehicle"
          isPositive={false}
          icon={<Wrench className="w-5 h-5" />}
          iconBgColor="bg-[#EF4444]"
        />
      </div>

      {/* 2. Middle Row: Reservation Overview + Fleet Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8">
          <ReservationOverview />
        </div>
        <div className="lg:col-span-4">
          <FleetOverview />
        </div>
      </div>

      {/* 3. Recent Reservations Table */}
      <RecentReservationsTable />

      {/* 4. Three-Column Fleet Operations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5">
          <VehicleStatus />
        </div>
        <div className="lg:col-span-4">
          <PaymentSummary />
        </div>
        <div className="lg:col-span-3">
          <DamageSummaryCard />
        </div>
      </div>

      {/* 5. Three Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <RevenueOverview />
        <FleetUtilizationChart />
        <ReservationTrendChart />
      </div>
    </div>
  );
};
