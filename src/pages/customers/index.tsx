import { useState } from "react";
import { Link } from "react-router";
import { Search, Eye } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";

export interface CustomerItem {
  id: string;
  name: string;
  initials: string;
  initialsBg: string;
  email: string;
  phone: string;
  location: string;
  joined: string;
  reservations: number;
  totalSpent: string;
  status: "Active" | "Inactive" | "Suspended";
}

export const mockCustomers: CustomerItem[] = [
  {
    id: "CUS-001",
    name: "Sarah Mitchell",
    initials: "SM",
    initialsBg: "bg-blue-100 text-[#0284C7]",
    email: "sarah.mitchell@email.com",
    phone: "+1 (555) 248-3901",
    location: "New York, NY",
    joined: "2024-03-12",
    reservations: 14,
    totalSpent: "$8,420",
    status: "Active",
  },
  {
    id: "CUS-002",
    name: "James Chen",
    initials: "JC",
    initialsBg: "bg-cyan-100 text-cyan-700",
    email: "james.chen@email.com",
    phone: "+1 (555) 174-6230",
    location: "San Francisco, CA",
    joined: "2024-05-08",
    reservations: 9,
    totalSpent: "$5,870",
    status: "Active",
  },
  {
    id: "CUS-003",
    name: "Olivia Patel",
    initials: "OP",
    initialsBg: "bg-emerald-100 text-emerald-700",
    email: "olivia.patel@email.com",
    phone: "+1 (555) 391-7742",
    location: "Austin, TX",
    joined: "2023-11-21",
    reservations: 22,
    totalSpent: "$15,340",
    status: "Active",
  },
  {
    id: "CUS-004",
    name: "Marcus Johnson",
    initials: "MJ",
    initialsBg: "bg-green-100 text-green-700",
    email: "marcus.j@email.com",
    phone: "+1 (555) 823-4401",
    location: "Chicago, IL",
    joined: "2025-01-15",
    reservations: 4,
    totalSpent: "$2,190",
    status: "Active",
  },
  {
    id: "CUS-005",
    name: "Elena Rodriguez",
    initials: "ER",
    initialsBg: "bg-amber-100 text-amber-700",
    email: "e.rodriguez@email.com",
    phone: "+1 (555) 662-8813",
    location: "Miami, FL",
    joined: "2024-07-30",
    reservations: 7,
    totalSpent: "$4,610",
    status: "Active",
  },
  {
    id: "CUS-006",
    name: "David Kim",
    initials: "DK",
    initialsBg: "bg-purple-100 text-purple-700",
    email: "david.kim@email.com",
    phone: "+1 (555) 540-2287",
    location: "Seattle, WA",
    joined: "2023-09-04",
    reservations: 18,
    totalSpent: "$11,200",
    status: "Active",
  },
  {
    id: "CUS-007",
    name: "Aisha Thompson",
    initials: "AT",
    initialsBg: "bg-rose-100 text-rose-700",
    email: "aisha.t@email.com",
    phone: "+1 (555) 119-5546",
    location: "Atlanta, GA",
    joined: "2024-12-01",
    reservations: 3,
    totalSpent: "$1,350",
    status: "Inactive",
  },
  {
    id: "CUS-008",
    name: "Ryan O'Brien",
    initials: "RO",
    initialsBg: "bg-teal-100 text-teal-700",
    email: "ryan.obrien@email.com",
    phone: "+1 (555) 784-3328",
    location: "Boston, MA",
    joined: "2024-02-18",
    reservations: 11,
    totalSpent: "$7,840",
    status: "Active",
  },
];

export const CustomersPage = () => {
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockCustomers.filter((c) => {
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A] tracking-tight">Customers</h2>
          <p className="text-xs text-[#64748B]">Manage and view all registered customers</p>
        </div>
      </div>

      {/* 5 KPI Stat Cards matching Figma node 8:1379 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-3xl font-black text-[#0284C7]">12</div>
          <div className="text-xs font-semibold text-[#64748B] mt-1.5">Total Customers</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-3xl font-black text-[#16A34A]">10</div>
          <div className="text-xs font-semibold text-[#64748B] mt-1.5">Active</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-3xl font-black text-[#64748B]">1</div>
          <div className="text-xs font-semibold text-[#64748B] mt-1.5">Inactive</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-3xl font-black text-[#DC2626]">1</div>
          <div className="text-xs font-semibold text-[#64748B] mt-1.5">Suspended</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="text-3xl font-black text-[#9333EA]">$84.3K</div>
          <div className="text-xs font-semibold text-[#64748B] mt-1.5">Total Revenue</div>
        </div>
      </div>

      {/* Main Customers Table Card */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        {/* Filter Bar */}
        <div className="p-6 border-b border-[#F1F5F9] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-96">
            <Input
              placeholder="Search by name, email or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-[#94A3B8]" />}
              className="h-10 text-xs bg-[#F8FAFC] border-[#E2E8F0] rounded-xl"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-1.5 rounded-xl border border-[#E2E8F0] text-xs w-full md:w-auto overflow-x-auto">
            {["All", "Active", "Inactive", "Suspended"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilterStatus(tab)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg font-bold transition-all",
                  filterStatus === tab
                    ? "bg-[#0284C7] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Contact</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6">Joined</th>
                <th className="py-3.5 px-6 text-center">Reservations</th>
                <th className="py-3.5 px-6">Total Spent</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8FAFC]/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-xs flex-shrink-0",
                          item.initialsBg
                        )}
                      >
                        {item.initials}
                      </div>
                      <div>
                        <Link
                          to={`/customers/${item.id}`}
                          className="font-bold text-[#0284C7] hover:underline block"
                        >
                          {item.name}
                        </Link>
                        <div className="text-[11px] text-[#94A3B8] font-mono">{item.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-[#0F172A]">{item.email}</div>
                    <div className="text-[11px] text-[#64748B]">{item.phone}</div>
                  </td>
                  <td className="py-4 px-6 text-[#475569] font-medium">{item.location}</td>
                  <td className="py-4 px-6 text-[#64748B]">{item.joined}</td>
                  <td className="py-4 px-6 text-center font-black text-sm text-[#0F172A]">
                    {item.reservations}
                  </td>
                  <td className="py-4 px-6 font-black text-[#0F172A]">{item.totalSpent}</td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold",
                        item.status === "Active" && "bg-[#DCFCE7] text-[#16A34A]",
                        item.status === "Inactive" && "bg-[#F1F5F9] text-[#64748B]",
                        item.status === "Suspended" && "bg-[#FEE2E2] text-[#DC2626]"
                      )}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Link
                      to={`/customers/${item.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-[#0284C7] hover:bg-[#F0F9FF] text-xs font-bold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#64748B]">
          <div>Showing 1–8 of 12 customers</div>
          <div className="flex items-center gap-1.5">
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
          </div>
        </div>
      </div>
    </div>
  );
};
