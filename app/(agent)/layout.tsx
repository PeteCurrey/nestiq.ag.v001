"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  Briefcase, 
  MessageSquare, 
  BarChart3, 
  ShieldCheck, 
  TrendingUp, 
  Plug, 
  Settings, 
  CreditCard,
  LogOut,
  Menu,
  X,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/agent/dashboard", icon: LayoutDashboard },
  { name: "My Listings", href: "/agent/listings", icon: Home, badge: 52 },
  { name: "Leads", href: "/agent/leads", icon: Users, badge: 3, badgeColor: "bg-red-500" },
  { name: "CRM", href: "/agent/crm", icon: Briefcase },
  { name: "Enquiries", href: "/agent/enquiries", icon: MessageSquare, badge: 12 },
  { name: "Analytics", href: "/agent/analytics", icon: BarChart3 },
  { name: "Compliance", href: "/agent/compliance", icon: ShieldCheck, dot: true },
  { name: "Valuations", href: "/agent/valuations", icon: TrendingUp },
  { name: "Integrations", href: "/agent/settings/integrations", icon: Plug },
  { name: "Settings", href: "/agent/settings", icon: Settings },
  { name: "Billing", href: "/agent/billing", icon: CreditCard },
];

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-pearl overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-obsidian/60 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-obsidian text-silk transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-gold p-1">
                <Home className="w-5 h-5 text-obsidian" />
              </div>
              <span className="text-lg font-display font-medium tracking-widest uppercase">NESTIQ</span>
            </Link>
            <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-200 group",
                    isActive 
                      ? "bg-[#1A6B4A] text-[#2ECC87] rounded-none" 
                      : "text-silk/60 hover:text-silk hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn(
                      "w-4 h-4 transition-colors",
                      isActive ? "text-[#2ECC87]" : "text-silk/40 group-hover:text-silk"
                    )} />
                    {item.name}
                  </div>
                  {item.badge && (
                    <span className={cn(
                      "px-2 py-0.5 text-[10px] font-bold rounded-full",
                      item.badgeColor || "bg-white/10 text-silk/60"
                    )}>
                      {item.badge}
                    </span>
                  )}
                  {item.dot && !item.badge && (
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/5 space-y-4">
            <Link href="/support" className="flex items-center gap-3 px-4 py-2 text-xs text-silk/40 hover:text-silk">
              <HelpCircle className="w-3.5 h-3.5" />
              Need help?
            </Link>
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 bg-gold flex items-center justify-center text-obsidian font-bold text-xs">
                DP
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-silk truncate">Dales & Peaks</p>
                <p className="text-[10px] text-silk/40 truncate">info@dalesandpeaks.co.uk</p>
              </div>
              <button className="text-silk/20 hover:text-red-500 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-obsidian text-silk p-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gold p-1">
              <Home className="w-4 h-4 text-obsidian" />
            </div>
            <span className="text-sm font-display font-medium tracking-widest uppercase">NESTIQ</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
