"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Building2, Users, BarChart3, 
  Settings, LogOut, Bell, Search, Menu, X,
  ShieldCheck, ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navigation = [
  { name: "Dashboard", href: "/agent/dashboard", icon: LayoutDashboard },
  { name: "My Listings", href: "/agent/properties", icon: Building2 },
  { name: "Leads & Enquiries", href: "/agent/leads", icon: Users },
  { name: "Market Intelligence", href: "/agent/analytics", icon: BarChart3 },
  { name: "Settings", href: "/agent/settings", icon: Settings },
];

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-silk flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-obsidian text-silk transition-transform duration-500 ease-in-out border-r border-silk/10",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="bg-gold p-1.5 rounded-none">
              <Building2 className="w-5 h-5 text-obsidian" strokeWidth={1.5} />
            </div>
            <span className="text-lg font-display font-medium tracking-[0.2em] uppercase">
              NESTIQ
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group",
                    isActive 
                      ? "bg-silk text-obsidian" 
                      : "text-silk/40 hover:text-silk hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-gold" : "text-silk/20 group-hover:text-gold")} strokeWidth={1.5} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Footer */}
          <div className="pt-8 border-t border-silk/10 mt-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-gold/20 flex items-center justify-center border border-gold/30">
                <span className="text-gold font-bold">DP</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-silk">Dales & Peaks</span>
                <span className="block text-[9px] text-silk/40 uppercase tracking-widest">Premium Agent</span>
              </div>
            </div>
            <button className="flex items-center gap-4 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-red-400 hover:bg-red-400/10 w-full transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 transition-all duration-500",
        isSidebarOpen ? "pl-72" : "pl-0"
      )}>
        {/* Header */}
        <header className="h-24 bg-white border-b border-border/40 flex items-center justify-between px-12 sticky top-0 z-40">
          <div className="flex items-center gap-8 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-obsidian/40 hover:text-obsidian"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
              <input 
                type="text" 
                placeholder="Search leads, listings or intelligence..."
                className="w-full bg-silk border-none pl-12 pr-6 py-3 text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-gold/30 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald/5 border border-emerald/20 text-emerald">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Verified Connection</span>
             </div>
             <button className="relative p-2 text-obsidian/40 hover:text-obsidian">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
             </button>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
