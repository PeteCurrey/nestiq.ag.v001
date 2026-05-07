"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ClipboardList, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";

const checklistItems = [
  { id: 1, title: "Agreement in Principle (AIP)", desc: "A written estimate from a lender indicating how much you can borrow." },
  { id: 2, title: "Proof of Deposit", desc: "Bank statements showing you have the funds available for the deposit." },
  { id: 3, title: "Proof of ID and Address", desc: "Passport/Driving Licence and a recent utility bill to comply with Anti-Money Laundering (AML) regulations." },
  { id: 4, title: "Solicitor Instructed", desc: "Having a conveyancer ready speeds up the process significantly and shows agents you are serious." },
  { id: 5, title: "Market Research", desc: "Knowledge of recent sold prices for similar properties in the specific street/area." },
  { id: 6, title: "Property Chain Details", desc: "If you have a home to sell, having the details of your chain (e.g., buyer's status) is essential." },
];

export default function OfferReadinessChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("nestiq-offer-checklist");
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const toggleItem = (id: number) => {
    const newItems = checkedItems.includes(id) 
      ? checkedItems.filter(i => i !== id) 
      : [...checkedItems, id];
      
    setCheckedItems(newItems);
    localStorage.setItem("nestiq-offer-checklist", JSON.stringify(newItems));
  };

  const progress = Math.round((checkedItems.length / checklistItems.length) * 100);

  if (!isClient) return null; // Avoid hydration mismatch for localStorage

  return (
    <div className="bg-silk min-h-screen text-obsidian">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-emerald mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="mb-12">
          <div className="w-16 h-16 bg-emerald/10 text-emerald flex items-center justify-center mb-6">
            <ClipboardList className="w-8 h-8" />
          </div>
          <h1 className="text-display-sm font-display mb-4">Offer Readiness Checklist</h1>
          <p className="text-body-lg text-muted">
            Estate agents legally must put forward any offer, but they advise their clients based on the buyer's proceedability. Make sure you have these ready to be seen as a "hot buyer".
          </p>
        </div>

        <div className="bg-white p-8 border border-border/40 shadow-sm mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-bold uppercase tracking-widest">Your Progress</h2>
            <span className="text-emerald font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-pearl h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald h-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        <div className="space-y-4">
          {checklistItems.map(item => {
            const isChecked = checkedItems.includes(item.id);
            return (
              <div 
                key={item.id} 
                onClick={() => toggleItem(item.id)}
                className={`p-6 border transition-all cursor-pointer flex gap-4 items-start ${isChecked ? 'bg-emerald/5 border-emerald/30' : 'bg-white border-border/40 hover:border-emerald/40'}`}
              >
                <div className="mt-1 flex-shrink-0">
                  {isChecked ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted/30" />
                  )}
                </div>
                <div>
                  <h3 className={`font-bold mb-1 ${isChecked ? 'text-obsidian' : 'text-obsidian'}`}>{item.title}</h3>
                  <p className="text-sm text-muted">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
