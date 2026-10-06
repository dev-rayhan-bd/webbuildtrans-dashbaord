import { useState } from "react";
import { 
  CheckCheck, 
  Trash2, 
  Car, 
  AlertTriangle, 
  CreditCard, 
  KeyRound, 
  ShieldCheck,
  CheckCircle2,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";

interface NotificationItem {
  id: string;
  type: "reservation" | "damage" | "payment" | "iot" | "system";
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  linkText?: string;
  linkUrl?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    type: "reservation",
    title: "New Digital Reservation #RES-9402",
    description: "Sophia Martinez booked Tesla Model 3 for 5 days starting from Curacao Int'l Airport.",
    time: "5 minutes ago",
    isRead: false,
    linkText: "View Reservation",
    linkUrl: "/reservations",
  },
  {
    id: "notif-2",
    type: "iot",
    title: "Convadis IoT Keyless Access Activated",
    description: "Digital vehicle key generated and sent to customer app for Hyundai Kona Electric.",
    time: "24 minutes ago",
    isRead: false,
    linkText: "View Vehicle",
    linkUrl: "/vehicles",
  },
  {
    id: "notif-3",
    type: "damage",
    title: "New Damage Report #DR-108 Submitted",
    description: "Customer reported minor scratch on rear bumper during return at Jan Thiel station.",
    time: "1 hour ago",
    isRead: false,
    linkText: "Review Report",
    linkUrl: "/damage-reports",
  },
  {
    id: "notif-4",
    type: "payment",
    title: "Security Deposit Pre-authorized",
    description: "$500.00 pre-authorization successfully held for reservation #RES-9388 (BMW 330e).",
    time: "3 hours ago",
    isRead: true,
    linkText: "Check Deposit",
    linkUrl: "/deposits",
  },
  {
    id: "notif-5",
    type: "payment",
    title: "Online Payment Received",
    description: "$420.00 rental charge settled via Stripe for reservation #RES-9370.",
    time: "5 hours ago",
    isRead: true,
    linkText: "View Payment",
    linkUrl: "/payments",
  },
  {
    id: "notif-6",
    type: "system",
    title: "System Telemetry & Geofence Sync",
    description: "All 18 fleet vehicles successfully synced GPS coordinates and battery health statuses.",
    time: "Yesterday",
    isRead: true,
  },
];

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read");
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast.info("All notifications cleared");
  };

  const markSingleAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification removed");
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "unread") return !item.isRead;
    return true;
  });

  const getIconForType = (type: NotificationItem["type"]) => {
    switch (type) {
      case "reservation":
        return <Car className="w-5 h-5 text-[#0284C7]" />;
      case "iot":
        return <KeyRound className="w-5 h-5 text-[#8B5CF6]" />;
      case "damage":
        return <AlertTriangle className="w-5 h-5 text-[#E11D48]" />;
      case "payment":
        return <CreditCard className="w-5 h-5 text-[#059669]" />;
      case "system":
      default:
        return <ShieldCheck className="w-5 h-5 text-[#64748B]" />;
    }
  };

  const getBadgeBgForType = (type: NotificationItem["type"]) => {
    switch (type) {
      case "reservation":
        return "bg-[#E0F2FE] border-[#BAE6FD]";
      case "iot":
        return "bg-[#F3E8FF] border-[#E9D5FF]";
      case "damage":
        return "bg-[#FFE4E6] border-[#FECDD3]";
      case "payment":
        return "bg-[#ECFDF5] border-[#A7F3D0]";
      case "system":
      default:
        return "bg-[#F1F5F9] border-[#E2E8F0]";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-3xl font-extrabold text-[#0284C7] tracking-tight">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EF4444] text-white shadow-2xs">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-xs text-[#64748B] mt-1 font-medium">
            Stay updated with vehicle reservations, damage alerts, and payments
          </p>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={`h-9 px-3.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              unreadCount > 0
                ? "border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC] cursor-pointer shadow-2xs"
                : "border-[#F1F5F9] bg-[#F8FAFC] text-[#94A3B8] cursor-not-allowed"
            }`}
          >
            <CheckCheck className="w-4 h-4 text-[#0284C7]" />
            Mark all read
          </button>

          <button
            type="button"
            onClick={clearAllNotifications}
            disabled={notifications.length === 0}
            className={`h-9 px-3.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              notifications.length > 0
                ? "border-[#E2E8F0] bg-white text-[#EF4444] hover:bg-[#FEF2F2] cursor-pointer shadow-2xs"
                : "border-[#F1F5F9] bg-[#F8FAFC] text-[#94A3B8] cursor-not-allowed"
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Clear all
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFilter === "all"
              ? "bg-[#0284C7] text-white shadow-2xs"
              : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
          }`}
        >
          All ({notifications.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("unread")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFilter === "unread"
              ? "bg-[#0284C7] text-white shadow-2xs"
              : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List Card */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xs divide-y divide-[#F1F5F9] overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#F0F9FF] text-[#0284C7] flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-[#0F172A]">No notifications here</h3>
            <p className="text-xs text-[#64748B] mt-1">
              You are all caught up with your rental updates and alerts!
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={`p-5 flex items-start justify-between gap-4 transition-colors ${
                !item.isRead ? "bg-[#F8FAFC]/80 hover:bg-[#F1F5F9]/70" : "hover:bg-[#F8FAFC]/50"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Category Icon */}
                <div
                  className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 shadow-2xs ${getBadgeBgForType(
                    item.type
                  )}`}
                >
                  {getIconForType(item.type)}
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#0F172A]">
                      {item.title}
                    </h4>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#0284C7] ring-2 ring-[#BAE6FD]" />
                    )}
                  </div>

                  <p className="text-xs text-[#475569] leading-relaxed max-w-2xl">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-4 pt-1">
                    <span className="flex items-center gap-1 text-[11px] font-medium text-[#94A3B8]">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </span>

                    {item.linkUrl && item.linkText && (
                      <Link
                        to={item.linkUrl}
                        className="text-[11px] font-bold text-[#0284C7] hover:underline"
                      >
                        {item.linkText} →
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {!item.isRead && (
                  <button
                    type="button"
                    onClick={() => markSingleAsRead(item.id)}
                    className="px-2.5 py-1 rounded-lg border border-[#E2E8F0] bg-white text-[11px] font-semibold text-[#0284C7] hover:bg-[#F8FAFC] transition-colors"
                  >
                    Mark read
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => deleteNotification(item.id)}
                  className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
