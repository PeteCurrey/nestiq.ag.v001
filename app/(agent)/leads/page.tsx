"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  Mail, 
  Calendar, 
  Plus,
  ArrowRight,
  User,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const columns = [
  { id: "new", title: "New", color: "bg-red-500" },
  { id: "contacted", title: "Contacted", color: "bg-amber-500" },
  { id: "viewing", title: "Viewing Booked", color: "bg-blue-500" },
  { id: "offer", title: "Offer Received", color: "bg-emerald-500" },
  { id: "completed", title: "Completed", color: "bg-obsidian" },
];

const initialLeads = [
  { id: "1", name: "Sarah Jenkins", property: "Walton Back Lane", score: 9, source: "Portal", time: "3 hours ago", status: "new" },
  { id: "2", name: "Mark Thompson", property: "Parkhall Lane", score: 8, source: "Direct", time: "5 hours ago", status: "contacted" },
  { id: "3", name: "James Wilson", property: "Chesterfield Road", score: 7, source: "Email", time: "1 day ago", status: "viewing" },
  { id: "4", name: "Emma Davis", property: "Northedge Lane", score: 10, source: "Portal", time: "2 days ago", status: "new" },
];

export default function AgentLeads() {
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");

  return (
    <div className="p-8 lg:p-12 space-y-8 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-display-sm font-display font-bold text-obsidian uppercase tracking-tight">Leads & Opportunities</h1>
          <p className="text-muted text-sm mt-1">Track and manage your property pipeline</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex border border-border/40">
            <button 
              onClick={() => setViewMode("kanban")}
              className={cn("px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all", viewMode === "kanban" ? "bg-obsidian text-silk" : "text-muted hover:bg-silk")}
            >
              Kanban
            </button>
            <button 
              onClick={() => setViewMode("table")}
              className={cn("px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all", viewMode === "table" ? "bg-obsidian text-silk" : "text-muted hover:bg-silk")}
            >
              Table
            </button>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-none h-12 px-6 uppercase tracking-widest text-[10px] font-bold">
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-border/40 p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-4">
             <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Pipeline Value:</span>
             <span className="text-sm font-display font-bold text-obsidian">£12,450,000</span>
           </div>
           <div className="flex items-center gap-4">
             <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Active Leads:</span>
             <span className="text-sm font-display font-bold text-obsidian">24</span>
           </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted/60" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="pl-11 pr-6 py-2.5 bg-silk border border-border/20 text-[10px] font-bold uppercase tracking-widest w-64 focus:outline-none focus:border-gold"
            />
          </div>
          <Button variant="secondary" className="h-10 text-[10px] font-bold uppercase tracking-widest border border-border/40">
            <Filter className="w-3.5 h-3.5 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      {viewMode === "kanban" && (
        <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
          <div className="flex gap-6 h-full min-w-[1200px]">
            {columns.map(column => (
              <div key={column.id} className="flex-1 min-w-[280px] bg-silk/30 border border-border/20 flex flex-col">
                <div className="p-4 border-b border-border/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-1.5 h-1.5 rounded-full", column.color)} />
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian">{column.title}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-muted bg-white border border-border/20 px-2 py-0.5 rounded-full">
                    {initialLeads.filter(l => l.status === column.id).length}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {initialLeads.filter(l => l.status === column.id).map(lead => (
                    <div key={lead.id} className="bg-white border border-border/20 p-5 shadow-sm hover:shadow-md transition-shadow cursor-grab group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gold/10 text-gold flex items-center justify-center font-bold text-xs">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-bold text-obsidian">{lead.name}</span>
                        </div>
                        <span className={cn(
                          "text-[9px] font-bold px-1.5 py-0.5",
                          lead.score >= 9 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        )}>
                          {lead.score}/10
                        </span>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-[10px] text-muted">
                           <Home className="w-3 h-3" />
                           <span className="truncate">{lead.property}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-muted">
                           <MessageSquare className="w-3 h-3" />
                           <span>{lead.source}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-border/10 pt-4">
                        <span className="text-[9px] font-medium text-muted/60 uppercase tracking-wider">{lead.time}</span>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-silk text-muted hover:text-obsidian"><Phone className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 hover:bg-silk text-muted hover:text-obsidian"><Mail className="w-3.5 h-3.5" /></button>
                          <button className="p-1.5 hover:bg-silk text-muted hover:text-obsidian"><Calendar className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full py-3 border border-dashed border-border/40 text-[10px] font-bold text-muted/60 uppercase tracking-widest hover:border-gold hover:text-gold transition-all">
                    + Add Lead
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === "table" && (
        <div className="bg-white border border-border/40 overflow-hidden">
          <p className="p-12 text-center text-muted italic">Table view placeholder...</p>
        </div>
      )}
    </div>
  );
}
