"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, PoundSterling } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PropertyValueEstimatePage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [report, setReport] = useState("");
  const [formData, setFormData] = useState({
    postcode: "",
    propertyType: "Detached House",
    bedrooms: "3",
    bathrooms: "1",
    condition: "Good",
    garden: false,
    parking: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.postcode) return;
    
    setStatus("loading");
    try {
      const res = await fetch("/api/ai/valuation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.report) {
        setReport(data.report);
        setStatus("success");
      } else {
        throw new Error();
      }
    } catch {
      setStatus("idle");
      alert("Failed to generate estimate. Please try again.");
    }
  };

  return (
    <div className="bg-silk min-h-screen text-obsidian">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-emerald mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Tools
        </Link>

        <div className="mb-16">
          <div className="w-16 h-16 bg-emerald/10 text-emerald flex items-center justify-center mb-6">
            <PoundSterling className="w-8 h-8" />
          </div>
          <h1 className="text-display-sm font-display mb-4">Property Value Estimate</h1>
          <p className="text-body-lg text-muted max-w-2xl">
            Get an instant, AI-generated indicative valuation for your property based on local market trends and property characteristics.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-white p-8 border border-border/40 shadow-sm">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald mb-8">Your Indicative Report</h2>
            <div className="prose prose-stone max-w-none text-obsidian/80">
              {report.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-border/20">
              <Button onClick={() => setStatus("idle")} variant="outline" className="text-[10px] uppercase tracking-widest font-bold">
                Run Another Estimate
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 border border-border/40 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Postcode</label>
                <input required value={formData.postcode} onChange={(e) => setFormData({...formData, postcode: e.target.value})} placeholder="e.g. SW1A 1AA" className="w-full bg-pearl border-none px-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Property Type</label>
                <select value={formData.propertyType} onChange={(e) => setFormData({...formData, propertyType: e.target.value})} className="w-full bg-pearl border-none px-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm">
                  <option>Detached House</option>
                  <option>Semi-Detached House</option>
                  <option>Terraced House</option>
                  <option>Flat / Apartment</option>
                  <option>Bungalow</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Bedrooms</label>
                <select value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} className="w-full bg-pearl border-none px-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm">
                  {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Bathrooms</label>
                <select value={formData.bathrooms} onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} className="w-full bg-pearl border-none px-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm">
                  {[1,2,3,4].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Condition</label>
                <select value={formData.condition} onChange={(e) => setFormData({...formData, condition: e.target.value})} className="w-full bg-pearl border-none px-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm">
                  <option>Excellent / Recently Renovated</option>
                  <option>Good / Move-in Ready</option>
                  <option>Fair / Needs minor updates</option>
                  <option>Poor / Needs major modernization</option>
                </select>
              </div>
            </div>

            <div className="flex gap-8">
              <label className="flex items-center gap-3 text-body-sm cursor-pointer">
                <input type="checkbox" checked={formData.garden} onChange={(e) => setFormData({...formData, garden: e.target.checked})} className="w-4 h-4 accent-emerald" />
                Private Garden
              </label>
              <label className="flex items-center gap-3 text-body-sm cursor-pointer">
                <input type="checkbox" checked={formData.parking} onChange={(e) => setFormData({...formData, parking: e.target.checked})} className="w-4 h-4 accent-emerald" />
                Off-Street Parking
              </label>
            </div>

            <Button type="submit" disabled={status === "loading"} className="bg-obsidian text-white hover:bg-emerald w-full h-16 text-[10px] font-bold uppercase tracking-[0.3em]">
              {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Generate Estimate"}
            </Button>
            <p className="text-[10px] text-muted text-center max-w-lg mx-auto leading-relaxed">
              * This tool uses artificial intelligence to estimate a qualitative price range based on historical area data. It is indicative only and not a substitute for a professional RICS survey or agent valuation.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
