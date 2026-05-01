"use client";

import { cn } from "@/lib/utils/cn";
import { 
  LayoutDashboard, 
  PlusCircle, 
  ListOrdered, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Settings, 
  CreditCard,
  LogOut,
  Building2,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview", icon: <LayoutDashboard />, href: "/agent" },
  { label: "New Listing", icon: <PlusCircle />, href: "/agent/listings/new" },
  { label: "My Listings", icon: <ListOrdered />, href: "/agent/listings" },
  { label: "Leads", icon: <MessageSquare />, href: "/agent/leads", count: 12 },
  { label: "CRM / Contacts", icon: <Users />, href: "/agent/crm" },
  { label: "AI & Insights", icon: <Sparkles />, href: "/agent/insights" },
  { label: "Analytics", icon: <BarChart3 />, href: "/agent/analytics" },
];

const secondaryItems = [
  { label: "Billing", icon: <CreditCard />, href: "/agent/billing" },
  { label: "Agency Profile", icon: <Building2 />, href: "/agent/profile" },
  { label: "Settings", icon: <Settings />, href: "/agent/settings" },
];

export function AgentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border h-screen sticky top-0 bg-white flex flex-col pt-8">
      <div className="px-6 mb-12">
        <Link href="/" className="text-display-sm font-display font-black tracking-tighter text-forest">
          NESTIQ
        </Link>
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald block mt-1">Agent Portal</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-3 rounded-lg text-body-sm font-bold uppercase tracking-widest transition-all group",
                isActive ? "bg-forest text-white" : "text-muted hover:bg-warm hover:text-forest"
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn("w-5 h-5", isActive ? "text-emerald" : "text-subtle group-hover:text-forest")}>
                  {item.icon}
                </span>
                {item.label}
              </div>
              {item.count && (
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-black",
                  isActive ? "bg-white/20 text-white" : "bg-forest/10 text-forest"
                )}>
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-8 space-y-1 border-t border-border">
        {secondaryItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-label font-bold uppercase tracking-widest transition-all",
                isActive ? "text-forest" : "text-subtle hover:text-forest hover:bg-warm"
              )}
            >
              <span className="w-4 h-4">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-label font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all mt-4">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Agency Switcher Footer */}
      <div className="p-4 bg-warm mt-auto">
         <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-border shadow-sm">
            <div className="w-8 h-8 rounded bg-forest/10 flex items-center justify-center p-1 border border-border">
               <Building2 className="w-5 h-5 text-forest" />
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-xs font-bold text-obsidian truncate">Savills Chelsea</p>
               <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Growth Plan</p>
            </div>
         </div>
      </div>
    </aside>
  );
}
