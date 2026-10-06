import { Bell, Settings, ChevronDown } from "lucide-react";
import { useLocation, Link } from "react-router";

export const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  // Determine title and subtitle based on route matching Figma screens
  const getHeaderInfo = () => {
    if (path === "/") {
      return {
        title: "Dashboard Overview",
        subtitle: "Sunday, August 2, 2026",
      };
    }
    if (path.startsWith("/customers")) {
      if (path === "/customers") {
        return {
          title: "Customers",
          subtitle: "Sunday, August 2, 2026",
        };
      }
      return {
        title: "Customer Details",
        subtitle: "Sunday, August 2, 2026",
      };
    }
    if (path.startsWith("/reservations")) {
      if (path === "/reservations") {
        return {
          title: "Reservations",
          subtitle: "Sunday, August 2, 2026",
        };
      }
      return {
        title: "Reservation Details",
        subtitle: "Sunday, August 2, 2026",
      };
    }
    if (path.startsWith("/vehicles")) {
      if (path === "/vehicles") {
        return {
          title: "Vehicle List",
          subtitle: "Cura Explore — Contactless Car Rental",
        };
      }
      return {
        title: "Vehicle Details",
        subtitle: "Cura Explore — Contactless Car Rental",
      };
    }
    if (path.startsWith("/payments")) {
      if (path === "/payments") {
        return {
          title: "Payment Management",
          subtitle: "Cura Explore — Contactless Car Rental",
        };
      }
      return {
        title: "Payment Details",
        subtitle: "Cura Explore — Contactless Car Rental",
      };
    }
    if (path.startsWith("/deposits")) {
      return {
        title: "Deposit Management",
        subtitle: "Cura Explore — Contactless Car Rental",
      };
    }
    if (path.startsWith("/damage-reports")) {
      return {
        title: "Damage Reports",
        subtitle: "Fleet > Damage Reports",
      };
    }
    if (path.startsWith("/analytics")) {
      return {
        title: "Analytics",
        subtitle: "Overview > Analytics",
      };
    }
    if (path.startsWith("/invoices")) {
      return {
        title: "Billing & Invoices",
        subtitle: "Cura Explore — Contactless Car Rental",
      };
    }
    if (path.startsWith("/cms")) {
      return {
        title: "Content Management",
        subtitle: "Content > CMS",
      };
    }
    if (path.startsWith("/notifications")) {
      return {
        title: "Notifications",
        subtitle: "Activity, Fleet Alerts & System Notices",
      };
    }
    if (path.startsWith("/settings")) {
      return {
        title: "Settings",
        subtitle: "Account > Settings",
      };
    }
    return {
      title: "Dashboard Overview",
      subtitle: "Sunday, August 2, 2026",
    };
  };

  const { title, subtitle } = getHeaderInfo();

  return (
    <header className="h-20 px-8 bg-white border-b border-[#E2E8F0] flex items-center justify-between sticky top-0 z-20">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">{title}</h1>
        <p className="text-xs text-[#64748B] font-medium mt-0.5">{subtitle}</p>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications Button */}
        <Link
          to="/notifications"
          className={`relative h-10 w-10 rounded-xl border flex items-center justify-center transition-colors ${
            path.startsWith("/notifications")
              ? "bg-[#EBF5FF] text-[#0284C7] border-[#0284C7]/30"
              : "border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
          }`}
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white" />
        </Link>

        {/* Settings Cog */}
        <Link
          to="/settings"
          className="h-10 w-10 rounded-xl border border-[#E2E8F0] bg-white flex items-center justify-center text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
        >
          <Settings className="w-4 h-4" />
        </Link>

        {/* Profile Pill */}
        <Link
          to="/settings"
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] cursor-pointer transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-xs font-bold shadow-sm">
            AL
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-[#0F172A] leading-tight">Alex Lambert</div>
            <div className="text-[10px] text-[#94A3B8] font-medium leading-tight">Super Admin</div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] ml-1" />
        </Link>
      </div>
    </header>
  );
};
