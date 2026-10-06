import { createBrowserRouter } from "react-router";
import { MainLayout } from "@/layouts/main-layout";
import { DashboardPage } from "@/pages/dashboard";
import { CustomersPage } from "@/pages/customers";
import { CustomerDetailsPage } from "@/pages/customers/customer-details";
import { ReservationsPage } from "@/pages/reservations";
import { ReservationDetailsPage } from "@/pages/reservations/reservation-details";
import { VehiclesPage } from "@/pages/vehicles";
import { VehicleDetailsPage } from "@/pages/vehicles/vehicle-details";
import { PaymentsPage } from "@/pages/payments";
import { PaymentDetailsPage } from "@/pages/payments/payment-details";
import { DepositsPage } from "@/pages/deposits";
import { DamageReportsPage } from "@/pages/damage-reports";
import { AnalyticsPage } from "@/pages/analytics";
import { InvoicesPage } from "@/pages/invoices";
import { CmsPage } from "@/pages/cms";
import { SettingsPage } from "@/pages/settings";
import { NotificationsPage } from "@/pages/notifications";
import { AuthPage } from "@/pages/auth";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/forgot-password",
    element: <AuthPage />,
  },
  {
    path: "/verify-otp",
    element: <AuthPage />,
  },
  {
    path: "/reset-password",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "customers", element: <CustomersPage /> },
      { path: "customers/:id", element: <CustomerDetailsPage /> },
      { path: "reservations", element: <ReservationsPage /> },
      { path: "reservations/:id", element: <ReservationDetailsPage /> },
      { path: "vehicles", element: <VehiclesPage /> },
      { path: "vehicles/:id", element: <VehicleDetailsPage /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "payments/:id", element: <PaymentDetailsPage /> },
      { path: "deposits", element: <DepositsPage /> },
      { path: "damage-reports", element: <DamageReportsPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "invoices", element: <InvoicesPage /> },
      { path: "cms", element: <CmsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "*", element: <DashboardPage /> },
    ],
  },
]);
