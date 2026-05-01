"use client";

import { cn } from "@/lib/utils/cn";

type EPCRating = "A" | "B" | "C" | "D" | "E" | "F" | "G";

interface EPCDisplayProps {
  current: EPCRating;
  potential?: EPCRating;
}

const ratings: { grade: EPCRating; color: string; range: string }[] = [
  { grade: "A", color: "#008054", range: "92-100" },
  { grade: "B", color: "#19b459", range: "81-91" },
  { grade: "C", color: "#8dce46", range: "69-80" },
  { grade: "D", color: "#ffd500", range: "55-68" },
  { grade: "E", color: "#fcaa65", range: "39-54" },
  { grade: "F", color: "#ef8023", range: "21-38" },
  { grade: "G", color: "#e9153b", range: "1-20" },
];

export function EPCDisplay({ current, potential }: EPCDisplayProps) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-border shadow-sm max-w-xl">
      <div className="flex justify-between items-end mb-8">
        <div>
           <h3 className="text-body-lg font-display font-bold text-obsidian">Energy Performance</h3>
           <p className="text-body-sm text-muted">Efficiency rating for this property</p>
        </div>
        <div className="flex gap-4">
           <div className="text-center">
              <span className="text-label font-bold text-muted uppercase block mb-1">Current</span>
              <div 
                className="w-12 h-12 flex items-center justify-center text-white font-display font-black text-xl rounded"
                style={{ backgroundColor: ratings.find(r => r.grade === current)?.color }}
              >
                {current}
              </div>
           </div>
           {potential && (
             <div className="text-center">
                <span className="text-label font-bold text-muted uppercase block mb-1">Potential</span>
                <div 
                  className="w-12 h-12 flex items-center justify-center text-white font-display font-black text-xl rounded opacity-50"
                  style={{ backgroundColor: ratings.find(r => r.grade === potential)?.color }}
                >
                  {potential}
                </div>
             </div>
           )}
        </div>
      </div>

      <div className="space-y-1">
        {ratings.map((r, i) => {
          const isCurrent = r.grade === current;
          const isPotential = r.grade === potential;

          return (
            <div key={r.grade} className="flex items-center gap-3 group">
              <div 
                className="h-8 flex items-center px-4 text-white font-bold text-sm transition-all duration-500"
                style={{ 
                  backgroundColor: r.color,
                  width: `${30 + (6 - i) * 10}%`,
                  borderRadius: '0 4px 4px 0'
                }}
              >
                {r.grade}
              </div>
              
              <div className="flex-1 flex items-center justify-between">
                <span className="text-[10px] font-mono text-subtle font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {r.range}
                </span>
                
                <div className="flex gap-1">
                  {isCurrent && (
                    <div className="flex items-center">
                       <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-[10px] border-r-obsidian mr-[-1px]" />
                       <div className="bg-obsidian text-white text-[10px] font-black px-2 py-1 rounded-sm">CURRENT</div>
                    </div>
                  )}
                  {isPotential && !isCurrent && (
                    <div className="flex items-center opacity-40">
                       <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-[10px] border-r-obsidian mr-[-1px]" />
                       <div className="bg-obsidian text-white text-[10px] font-black px-2 py-1 rounded-sm">POTENTIAL</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
