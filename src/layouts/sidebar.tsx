import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Car,
  CreditCard,
  PiggyBank,
  AlertTriangle,
  BarChart3,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Reservations", href: "/reservations", icon: CalendarCheck, badge: 5 },
  { name: "Vehicles", href: "/vehicles", icon: Car },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Deposits", href: "/deposits", icon: PiggyBank },
  { name: "Damage Reports", href: "/damage-reports", icon: AlertTriangle, badge: 2 },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "CMS", href: "/cms", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="w-[240px] flex-shrink-0 bg-white border-r border-[#E2E8F0] flex flex-col h-screen sticky top-0 select-none z-30">
      {/* Brand Header with Cura Explore Logo */}
      <div className="h-20 px-5 border-b border-[#F1F5F9] flex items-center justify-center">
        <NavLink to="/" className="flex items-center justify-center w-full">
          <img
            src="/logo.svg"
            alt="CURA-EXPLORE Car Rental"
            className="h-12 w-auto max-w-[190px] object-contain"
            onError={(e) => {
              // Fallback if SVG render fails in some environments
              (e.currentTarget as HTMLElement).style.display = 'none';
              const fallback = document.getElementById('logo-fallback');
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div id="logo-fallback" className="hidden items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0284C7] text-white flex items-center justify-center font-black text-sm">
              CE
            </div>
            <div>
              <div className="font-extrabold text-xs tracking-wider text-[#0284C7]">CURA-EXPLORE</div>
              <div className="text-[9px] tracking-widest text-[#F59E0B] font-bold">CAR RENTAL</div>
            </div>
          </div>
        </NavLink>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all group",
                  isActive
                    ? "text-[#0284C7] bg-[#EBF5FF] font-semibold"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      "w-[18px] h-[18px] transition-colors",
                      isActive
                        ? "text-[#0284C7]"
                        : "text-[#94A3B8] group-hover:text-[#475569]"
                    )}
                  />
                  <span className="flex-1 truncate">{item.name}</span>
                  {item.badge && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#EF4444] text-white min-w-[18px] text-center"
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#0284C7] rounded-r-md" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout & User Profile Footer */}
      <div className="p-3 border-t border-[#F1F5F9] space-y-2">
        <NavLink
          to="/login"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-[#EF4444] hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4 text-[#EF4444]" />
          <span>Logout</span>
        </NavLink>

        {/* Profile Card matching Figma */}
        <NavLink
          to="/settings"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-xs font-bold shadow-sm flex-shrink-0">
            AL
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[#0F172A] truncate">Alex Lambert</div>
            <div className="text-[11px] text-[#94A3B8] truncate">Super Admin</div>
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
