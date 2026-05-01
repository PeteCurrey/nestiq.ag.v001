"use client";

import { Check, CreditCard, ShieldCheck, Zap, Receipt, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

const invoices = [
  { id: "INV-2026-001", date: "May 1, 2026", amount: "£499.00", status: "Paid" },
  { id: "INV-2026-002", date: "Apr 1, 2026", amount: "£499.00", status: "Paid" },
  { id: "INV-2026-003", date: "Mar 1, 2026", amount: "£199.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div>
         <h1 className="text-display-sm font-display font-black text-obsidian mb-2">Billing & Subscription</h1>
         <p className="text-body-md text-muted">Manage your agency plan, payment methods, and invoice history.</p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-forest rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
         <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
               <Badge variant="emerald" className="mb-4">Active Plan</Badge>
               <h2 className="text-display-sm font-display font-black mb-2">Growth Agency Plan</h2>
               <p className="text-body-lg text-white/70 mb-8">Next billing date: June 1, 2026 for £499.00</p>
               
               <div className="flex gap-4">
                  <Button variant="white" size="md">Change Plan</Button>
                  <Button variant="ghost" size="md" className="text-white hover:bg-white/10">Cancel Subscription</Button>
               </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
               <h3 className="text-label font-bold uppercase tracking-widest text-emerald mb-6">Plan Usage</h3>
               <div className="space-y-6">
                  <div>
                     <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                        <span>Active Listings</span>
                        <span>18 / 100</span>
                     </div>
                     <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald w-[18%]" />
                     </div>
                  </div>
                  <div>
                     <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                        <span>AI Generations</span>
                        <span>42 / Unlimited</span>
                     </div>
                     <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald w-full" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Payment Method */}
         <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="text-body-lg font-bold text-obsidian uppercase tracking-widest mb-8">Payment Method</h3>
            <div className="flex items-center justify-between p-6 bg-warm rounded-xl border border-border">
               <div className="flex items-center gap-6">
                  <div className="w-12 h-8 bg-white rounded border border-border flex items-center justify-center font-bold text-xs italic">
                     VISA
                  </div>
                  <div>
                     <p className="text-body-sm font-bold text-obsidian">•••• •••• •••• 4242</p>
                     <p className="text-xs text-muted font-medium uppercase">Expires 12/28</p>
                  </div>
               </div>
               <Button variant="ghost" size="sm" className="text-forest">Update</Button>
            </div>
            <p className="mt-8 text-xs text-muted font-medium flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 text-emerald" />
               Payments are securely processed by Stripe. We do not store your card details.
            </p>
         </div>

         {/* Invoice History */}
         <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-border shadow-sm">
            <h3 className="text-body-lg font-bold text-obsidian uppercase tracking-widest mb-8">Recent Invoices</h3>
            <div className="space-y-4">
               {invoices.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between p-4 hover:bg-warm rounded-xl transition-colors group">
                     <div>
                        <p className="text-xs font-bold text-obsidian">{inv.date}</p>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{inv.id}</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <span className="text-body-sm font-bold text-obsidian">{inv.amount}</span>
                        <button className="text-subtle hover:text-forest transition-colors">
                           <Download className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               ))}
            </div>
            <Button variant="outline" fullWidth size="sm" className="mt-8">
               View Full History <ExternalLink className="ml-2 w-3 h-3" />
            </Button>
         </div>
      </div>
    </div>
  );
}
