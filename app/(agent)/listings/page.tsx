"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  MoreHorizontal, 
  Eye, 
  MessageSquare, 
  ChevronRight,
  Download,
  Copy,
  ExternalLink,
  Trash2,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { allProperties } from "@/lib/data/properties";
import { cn } from "@/lib/utils";

const statusColors: any = {
  "active": "bg-emerald-100 text-emerald-700",
  "under-offer": "bg-amber-100 text-amber-700",
  "sold": "bg-obsidian text-silk",
  "withdrawn": "bg-red-100 text-red-700",
  "draft": "bg-silk text-muted",
};

export default function AgentListings() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Active", "Sold STC", "Let Agreed", "Draft", "Withdrawn"];

  return (
    <div className="p-8 lg:p-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-display-sm font-display font-bold text-obsidian uppercase tracking-tight">My Listings</h1>
          <p className="text-muted text-sm mt-1">Manage your active and historical properties</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-none h-14 px-8 uppercase tracking-widest text-[10px] font-bold">
          <Plus className="w-4 h-4 mr-2" />
          Add Listing
        </Button>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-border/40 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all",
                activeTab === tab 
                  ? "bg-obsidian text-silk" 
                  : "text-muted hover:bg-silk"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted/60" />
            <input 
              type="text" 
              placeholder="Search by address..." 
              className="pl-11 pr-6 py-2.5 bg-silk border border-border/20 text-[10px] font-bold uppercase tracking-widest w-64 focus:outline-none focus:border-gold"
            />
          </div>
          <div className="flex border border-border/40">
            <button 
              onClick={() => setViewMode("list")}
              className={cn("p-2.5", viewMode === "list" ? "bg-silk text-obsidian" : "text-muted hover:bg-silk")}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("grid")}
              className={cn("p-2.5", viewMode === "grid" ? "bg-silk text-obsidian" : "text-muted hover:bg-silk")}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white border border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-silk/50 border-b border-border/40">
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Property</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Price</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Type</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Views</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Enquiries</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted">Days Live</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-muted text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {allProperties.map((prop) => (
                <tr key={prop.slug} className="hover:bg-silk/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 bg-cover bg-center border border-border/40 flex-shrink-0" 
                        style={{ backgroundImage: `url(${prop.imageUrl})` }}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-obsidian truncate">{prop.title}</p>
                        <p className="text-[10px] text-muted uppercase tracking-wider truncate">{prop.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-obsidian">£{prop.price.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted">For Sale</span>
                  </td>
                  <td className="px-8 py-6">
                    <select className={cn(
                      "text-[9px] font-bold uppercase tracking-widest border-none bg-transparent focus:outline-none cursor-pointer p-1 -ml-1",
                      statusColors["active"]
                    )}>
                      <option value="active">Active</option>
                      <option value="under-offer">Under Offer</option>
                      <option value="sold">Sold</option>
                      <option value="withdrawn">Withdrawn</option>
                    </select>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-obsidian">1,240</span>
                      <div className="w-12 h-4 bg-emerald-500/10 rounded-sm overflow-hidden flex items-end">
                        <div className="w-full h-1/2 bg-emerald-500" />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-obsidian">
                      <MessageSquare className="w-3.5 h-3.5 text-muted/60" />
                      14
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-medium text-emerald-600">12 Days</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-silk text-muted hover:text-obsidian transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-silk text-muted hover:text-obsidian transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-silk text-muted hover:text-red-600 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
