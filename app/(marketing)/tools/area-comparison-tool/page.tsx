"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, Compass } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AreaComparisonToolPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [report, setReport] = useState("");
  const [area1, setArea1] = useState("");
  const [area2, setArea2] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!area1 || !area2) return;
    
    setStatus("loading");
    try {
      const res = await fetch("/api/ai/area-comparison", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ area1, area2 })
      });
      const data = await res.json();
      if (data.comparison) {
        setReport(data.comparison);
        setStatus("success");
      } else {
        throw new Error();
      }
    } catch {
      setStatus("idle");
      alert("Failed to generate comparison. Please try again.");
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
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="text-display-sm font-display mb-4">Area Comparison Tool</h1>
          <p className="text-body-lg text-muted max-w-2xl">
            Unsure where to buy or rent? Input two locations and our AI will provide a qualitative comparison on lifestyle, pricing, and connectivity.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-white p-8 border border-border/40 shadow-sm">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald mb-8">Comparison Report</h2>
            <div className="prose prose-stone max-w-none text-obsidian/80">
              {report.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-border/20">
              <Button onClick={() => setStatus("idle")} variant="outline" className="text-[10px] uppercase tracking-widest font-bold">
                Compare Other Areas
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 border border-border/40 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">First Location</label>
                <input required value={area1} onChange={(e) => setArea1(e.target.value)} placeholder="e.g. Didsbury, Manchester" className="w-full bg-pearl border-none px-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted">Second Location</label>
                <input required value={area2} onChange={(e) => setArea2(e.target.value)} placeholder="e.g. Chorlton, Manchester" className="w-full bg-pearl border-none px-6 py-4 outline-none focus:ring-1 focus:ring-emerald/40 text-body-sm" />
              </div>
            </div>

            <Button type="submit" disabled={status === "loading"} className="bg-obsidian text-white hover:bg-emerald w-full h-16 text-[10px] font-bold uppercase tracking-[0.3em]">
              {status === "loading" ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Compare Areas"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
