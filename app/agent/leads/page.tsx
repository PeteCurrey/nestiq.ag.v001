"use client";

import { useState } from "react";
import { 
  Search, 
  MessageSquare, 
  Phone, 
  Mail, 
  Calendar, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

const mockLeads = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", phone: "07700 900123", property: "The Ash Manor", message: "Hi, I'd like to book a viewing for this Saturday if possible. I'm a cash buyer.", time: "2 mins ago", status: "New", score: 9 },
  { id: "2", name: "David Smith", email: "david@smith.co.uk", phone: "07700 900456", property: "Vanguard Penthouse", message: "Is this property pet friendly? I have a small dog.", time: "1 hour ago", status: "In Progress", score: 6 },
  { id: "3", name: "Sarah Williams", email: "sarah.w@gmail.com", phone: "07700 900789", property: "Modern Townhouse", message: "What are the local school catchment areas for this property?", time: "3 hours ago", status: "Replied", score: 4 },
  { id: "4", name: "James Brown", email: "j.brown@outlook.com", phone: "07700 900111", property: "Eco Development", message: "I'm interested in the sustainable features of this new build.", time: "5 hours ago", status: "New", score: 8 },
];

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState(mockLeads[0]);

  return (
    <div className="h-[calc(100vh-160px)] flex gap-8">
      
      {/* Leads List */}
      <div className="w-1/3 flex flex-col bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h1 className="text-body-lg font-display font-black text-obsidian mb-4">Inbox</h1>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle" />
             <input 
               type="text" 
               placeholder="Search leads..." 
               className="w-full h-10 pl-10 pr-4 bg-warm border-none rounded-md text-body-sm focus:ring-2 focus:ring-forest"
             />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {mockLeads.map((lead) => (
            <button
              key={lead.id}
              onClick={() => setSelectedLead(lead)}
              className={cn(
                "w-full p-6 text-left transition-all hover:bg-pearl",
                selectedLead.id === lead.id ? "bg-warm border-l-4 border-forest" : "bg-white"
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <p className="text-body-sm font-bold text-obsidian">{lead.name}</p>
                <span className="text-[10px] font-bold text-muted uppercase flex items-center gap-1">
                   <Clock className="w-2.5 h-2.5" />
                   {lead.time}
                </span>
              </div>
              <p className="text-xs text-forest font-bold mb-3 truncate">{lead.property}</p>
              <p className="text-xs text-muted line-clamp-2 mb-4 leading-relaxed">{lead.message}</p>
              
              <div className="flex justify-between items-center">
                 <Badge variant="status" className={cn(
                   "text-[9px] px-2 py-0.5",
                   lead.status === "New" ? "bg-emerald/10 text-emerald" : "bg-warm text-muted"
                 )}>
                   {lead.status}
                 </Badge>
                 <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald" />
                    <span className="text-[10px] font-black text-emerald uppercase tracking-widest">{lead.score}/10</span>
                 </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lead Detail / Thread */}
      <div className="flex-1 bg-white rounded-2xl border border-border shadow-sm flex flex-col overflow-hidden">
        {selectedLead ? (
          <>
            {/* Header */}
            <div className="p-8 border-b border-border flex justify-between items-start">
               <div>
                  <h2 className="text-display-sm font-display font-bold text-obsidian mb-1">{selectedLead.name}</h2>
                  <div className="flex items-center gap-4 text-body-sm text-muted">
                     <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {selectedLead.email}</span>
                     <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {selectedLead.phone}</span>
                  </div>
               </div>
               <div className="flex gap-3">
                  <Button variant="outline" size="sm">Schedule Viewing</Button>
                  <Button variant="primary" size="sm">Reply Now</Button>
               </div>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 overflow-y-auto p-8 bg-warm/20">
               <div className="max-w-2xl mx-auto space-y-8">
                  {/* Initial Enquiry */}
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {selectedLead.name[0]}
                     </div>
                     <div className="bg-white p-6 rounded-2xl rounded-tl-none shadow-sm border border-border flex-1">
                        <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">Original Enquiry — {selectedLead.time}</p>
                        <p className="text-body-md text-obsidian leading-relaxed mb-6">
                           {selectedLead.message}
                        </p>
                        <div className="bg-pearl p-4 rounded-lg flex items-center gap-4 border border-border">
                           <div className="w-12 h-10 bg-white rounded border border-border" />
                           <div>
                              <p className="text-xs font-bold text-obsidian">{selectedLead.property}</p>
                              <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Enquired on nestiq.avorria.com</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* AI Insight */}
                  <div className="bg-emerald/5 border border-emerald/10 p-6 rounded-2xl flex items-start gap-4">
                     <Sparkles className="w-5 h-5 text-emerald mt-1 flex-shrink-0" />
                     <div>
                        <p className="text-body-sm font-bold text-emerald uppercase tracking-widest mb-1">AI Lead Intent Analysis</p>
                        <p className="text-body-sm text-obsidian/70 leading-relaxed">
                           High intent buyer. Mention of "cash buyer" and desire for quick viewing suggests they are ready to proceed. 
                           Recommended action: Call immediately to book the Saturday slot.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Reply Bar */}
            <div className="p-6 border-t border-border">
               <div className="flex items-end gap-4 max-w-3xl mx-auto">
                  <textarea 
                    placeholder="Type your message..." 
                    className="flex-1 bg-warm border-none rounded-xl p-4 text-body-md focus:ring-2 focus:ring-forest resize-none h-24"
                  />
                  <Button variant="primary" size="lg" className="rounded-xl h-24 w-24">
                     Send
                  </Button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
             <MessageSquare className="w-16 h-16 text-border mb-6" />
             <h3 className="text-body-lg font-bold text-obsidian mb-2">Select a lead to view details</h3>
             <p className="text-body-sm text-muted">Pick an enquiry from the list on the left to start communicating.</p>
          </div>
        )}
      </div>
    </div>
  );
}
