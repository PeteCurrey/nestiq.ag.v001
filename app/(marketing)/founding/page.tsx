"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function GenericFoundingPage() {
  const router = useRouter();
  const [token, setToken] = useState("");

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim().length === 8) {
      router.push(`/founding/${token.trim()}`);
    }
  };

  return (
    <main className="min-h-screen bg-obsidian text-silk font-sans selection:bg-emerald/30">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,204,135,0.05),transparent)]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-32 flex flex-col items-center justify-center min-h-screen text-center">
        
        <h1 className="text-display-lg md:text-[5rem] font-display leading-[1.05] mb-8 tracking-tight">
          The fair property portal for <br />
          <span className="italic font-normal text-emerald">independent agents.</span>
        </h1>
        
        <p className="text-body-xl text-silk/70 max-w-2xl mx-auto leading-relaxed mb-20 font-serif">
          We are currently onboarding 100 hand-selected independent estate agencies into our Founding Partner Programme.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl text-left border-t border-silk/10 pt-20">
          
          <div className="pr-0 md:pr-12 border-b md:border-b-0 md:border-r border-silk/10 pb-12 md:pb-0">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-5 h-5 text-emerald" />
              <h2 className="text-display-xs font-display">Have a code?</h2>
            </div>
            <p className="text-body-md text-silk/60 mb-8 font-serif">
              If you received a Founding Partner brochure in the post, enter your 8-character invitation code to view your personalized proposal.
            </p>
            <form onSubmit={handleTokenSubmit} className="flex gap-4">
              <input 
                type="text" 
                value={token}
                onChange={(e) => setToken(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                placeholder="e.g. a7k9m2x4"
                maxLength={8}
                className="flex-1 bg-transparent border-b border-silk/30 focus:border-emerald outline-none text-body-lg uppercase tracking-[0.2em] px-2 py-3 transition-colors"
              />
              <Button 
                type="submit"
                disabled={token.length !== 8}
                className="bg-emerald text-obsidian hover:bg-white disabled:opacity-50 px-8 rounded-none uppercase tracking-widest text-[10px] font-bold"
              >
                Unlock
              </Button>
            </form>
          </div>

          <div className="pl-0 md:pl-12">
            <h2 className="text-display-xs font-display mb-6">Request a brochure</h2>
            <p className="text-body-md text-silk/60 mb-8 font-serif">
              Our initial 100 placements are strictly by invitation. However, if you believe your agency aligns with our charter, you may request consideration.
            </p>
            <form className="space-y-4">
               <input 
                 type="text" 
                 placeholder="Agency Name"
                 className="w-full bg-silk/5 border border-silk/10 focus:border-emerald outline-none text-body-sm px-4 py-4 transition-colors placeholder:text-silk/30"
               />
               <input 
                 type="email" 
                 placeholder="Principal Email"
                 className="w-full bg-silk/5 border border-silk/10 focus:border-emerald outline-none text-body-sm px-4 py-4 transition-colors placeholder:text-silk/30"
               />
               <Button 
                 type="button"
                 className="w-full bg-transparent border border-silk/30 hover:border-emerald text-silk hover:text-emerald px-8 py-4 rounded-none uppercase tracking-widest text-[10px] font-bold mt-4 transition-all"
               >
                 Submit Request
               </Button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
