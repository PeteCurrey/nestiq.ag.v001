"use client";

import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("nestiq-cookie-consent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("nestiq-cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 right-8 md:left-auto md:w-[400px] z-[100] bg-obsidian text-silk p-8 border border-white/10 shadow-2xl animate-in slide-in-from-bottom-10 duration-700">
      <div className="flex items-start gap-4">
        <Cookie className="w-6 h-6 text-gold flex-shrink-0" />
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Cookie Preferences</h4>
          <p className="text-[11px] text-silk/60 leading-relaxed mb-6">
            We use cookies to enhance your search experience, analyze site traffic, and support our independent agent network.
          </p>
          <div className="flex gap-4">
            <Button onClick={accept} className="bg-silk text-obsidian hover:bg-gold hover:text-silk border-none flex-1 text-[10px] font-bold uppercase tracking-widest h-10">
              Accept All
            </Button>
            <button onClick={() => setIsVisible(false)} className="text-[10px] font-bold uppercase tracking-widest text-silk/40 hover:text-silk transition-colors">
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
