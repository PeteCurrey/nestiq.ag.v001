"use client";

import { cn } from "@/lib/utils/cn";
import { 
  Heart, 
  Bell, 
  User, 
  Settings, 
  Search, 
  History,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Saved Properties", icon: <Heart />, href: "/account/saved" },
  { label: "Saved Searches", icon: <Search />, href: "/account/searches" },
  { label: "Email Alerts", icon: <Bell />, href: "/account/alerts" },
  { label: "Recently Viewed", icon: <History />, href: "/account/history" },
  { label: "My Profile", icon: <User />, href: "/account/profile" },
  { label: "Settings", icon: <Settings />, href: "/account/settings" },
];

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "?";
}

export function AccountSidebar({
  name,
  email,
  memberSince,
  readinessScore,
}: {
  name: string;
  email: string | null;
  memberSince: string | null;
  readinessScore: number | null;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-72 space-y-1">
      <div className="bg-white p-8 rounded-2xl border border-border shadow-sm mb-6">
         <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center text-white font-display font-black text-lg shrink-0">
               {initials(name)}
            </div>
            <div className="min-w-0">
               <h3 className="text-body-lg font-display font-bold text-obsidian truncate">{name}</h3>
               <p className="text-body-sm text-muted truncate">
                 {memberSince
                   ? `Member since ${new Date(memberSince).getFullYear()}`
                   : email ?? ""}
               </p>
            </div>
         </div>
         {readinessScore !== null && readinessScore < 45 && (
           <Link
             href="/account/profile"
             className="block bg-warm border border-border/60 px-4 py-3 mb-6 hover:border-forest transition-colors"
           >
             <span className="block text-[10px] font-bold uppercase tracking-widest text-forest mb-1">
               Complete your position
             </span>
             <span className="block text-[11px] text-muted leading-snug">
               Agents prioritise buyers who can proceed. Yours is {readinessScore}/100.
             </span>
           </Link>
         )}

         <div className="h-px bg-border mb-6" />
         <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-body-sm font-bold uppercase tracking-widest transition-all",
                    isActive ? "bg-forest text-white shadow-lg" : "text-muted hover:bg-warm hover:text-forest"
                  )}
                >
                  <span className={cn("w-5 h-5", isActive ? "text-emerald" : "text-subtle")}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
         </nav>
      </div>

      <button className="w-full flex items-center gap-3 px-8 py-4 rounded-2xl text-body-sm font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
         <LogOut className="w-5 h-5" />
         Sign Out
      </button>
    </aside>
  );
}
