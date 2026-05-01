import { AgentSidebar } from "@/components/agent/AgentSidebar";
import { Search, Bell, HelpCircle } from "lucide-react";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-pearl min-h-screen">
      <AgentSidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Top Header */}
        <header className="h-16 border-b border-border bg-white sticky top-0 z-30 px-8 flex items-center justify-between">
           <div className="flex-1 max-w-xl">
              <div className="relative group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle group-focus-within:text-forest transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Search listings, leads, or agents..." 
                   className="w-full h-10 pl-10 pr-4 bg-warm border-none rounded-md text-body-sm focus:ring-2 focus:ring-forest transition-all"
                 />
              </div>
           </div>

           <div className="flex items-center gap-6">
              <button className="text-muted hover:text-forest transition-colors">
                 <HelpCircle className="w-5 h-5" />
              </button>
              <div className="relative">
                 <button className="text-muted hover:text-forest transition-colors">
                    <Bell className="w-5 h-5" />
                 </button>
                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </div>
              <div className="h-8 w-px bg-border mx-2" />
              <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-obsidian">Pete Currey</p>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Branch Manager</p>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-bold text-xs">
                    PC
                 </div>
              </div>
           </div>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
