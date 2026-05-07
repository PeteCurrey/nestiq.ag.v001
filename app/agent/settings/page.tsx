"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Bell, Plug, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils/cn";

const tabs = [
  { id: "profile", label: "Agency Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Plug, href: "/agent/settings/integrations" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-display-sm font-display font-bold text-obsidian mb-2">Settings</h1>
        <p className="text-body-md text-muted">Manage your agency profile, notifications and integrations.</p>
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-border/40">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          if (tab.href) {
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className="flex items-center gap-2 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-muted hover:text-obsidian transition-colors"
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Link>
            );
          }
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors relative",
                activeTab === tab.id
                  ? "text-obsidian after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald"
                  : "text-muted hover:text-obsidian"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white border border-border/40 p-10 space-y-10">
          <h2 className="text-body-lg font-bold text-obsidian uppercase tracking-widest border-b border-border/30 pb-6">
            Agency Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">
                Agency Name
              </label>
              <Input placeholder="e.g. Dales & Peaks" defaultValue="Dales & Peaks" />
            </div>

            <div>
              <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">
                Phone Number
              </label>
              <Input placeholder="01246 567540" defaultValue="01246 567540" />
            </div>

            <div>
              <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">
                Email Address
              </label>
              <Input type="email" placeholder="info@agency.co.uk" defaultValue="info@dalesandpeaks.co.uk" />
            </div>

            <div>
              <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">
                Website
              </label>
              <Input placeholder="https://..." defaultValue="https://dalesandpeaks.co.uk" />
            </div>

            <div>
              <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">
                Postcode
              </label>
              <Input placeholder="S41 7JD" defaultValue="S41 7JD" />
            </div>

            <div className="md:col-span-2">
              <label className="text-label font-bold text-muted uppercase tracking-widest block mb-2">
                Agency Description
              </label>
              <textarea
                className="w-full h-32 bg-warm border-none px-4 py-3 text-body-sm leading-relaxed focus:ring-2 focus:ring-forest resize-none"
                defaultValue="Award-winning family estate agent covering Derbyshire, the Peak District and surrounding areas. Established 2006."
              />
            </div>
          </div>

          {/* Logo Upload */}
          <div>
            <h3 className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-6">Agency Logo</h3>
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 bg-silk border-2 border-dashed border-border/40 flex items-center justify-center">
                <span className="text-obsidian font-display font-bold text-xs text-center leading-tight">
                  DALES<br />& PEAKS
                </span>
              </div>
              <div className="space-y-3">
                <Button variant="outline">Upload New Logo</Button>
                <p className="text-[10px] text-muted uppercase tracking-widest">PNG, SVG or WEBP. Max 2MB.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border/30 flex justify-end">
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="bg-white border border-border/40 p-10 space-y-8">
          <h2 className="text-body-lg font-bold text-obsidian uppercase tracking-widest border-b border-border/30 pb-6">
            Notification Preferences
          </h2>

          {[
            { label: "New enquiry received", description: "Get notified immediately when a buyer or renter enquires on one of your listings.", defaultOn: true },
            { label: "Viewing request", description: "Alerts when a contact requests a viewing.", defaultOn: true },
            { label: "Weekly performance report", description: "Summary of impressions, leads and listing performance every Monday.", defaultOn: true },
            { label: "Alto sync errors", description: "Notify if a property sync fails.", defaultOn: true },
            { label: "Compliance warnings", description: "Alert when a listing is missing NTS required fields.", defaultOn: false },
            { label: "Marketing updates from Nestiq", description: "Product news and feature announcements.", defaultOn: false },
          ].map((notif) => (
            <div key={notif.label} className="flex items-start justify-between gap-8 py-6 border-b border-border/20 last:border-0">
              <div>
                <p className="text-body-sm font-bold text-obsidian mb-1">{notif.label}</p>
                <p className="text-[11px] text-muted leading-relaxed">{notif.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input type="checkbox" className="sr-only peer" defaultChecked={notif.defaultOn} />
                <div className="w-11 h-6 bg-border peer-checked:bg-forest rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
              </label>
            </div>
          ))}

          <div className="pt-6 flex justify-end">
            <Button variant="primary">Save Preferences</Button>
          </div>
        </div>
      )}
    </div>
  );
}
