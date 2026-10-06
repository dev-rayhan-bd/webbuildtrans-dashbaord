export interface Reservation {
  id: string;
  customerName: string;
  customerInitials: string;
  customerEmail?: string;
  vehicleName: string;
  vehiclePlate?: string;
  pickupDate: string;
  returnDate: string;
  status: "Confirmed" | "Active" | "Completed" | "Pending" | "Cancelled";
  amount?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  plate: string;
  status: "Available" | "Rented" | "Maintenance" | "Reserved";
  deviceConnected: boolean;
  batteryOrFuel?: string;
  mileage?: string;
}

export interface KpiMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon?: string;
}
