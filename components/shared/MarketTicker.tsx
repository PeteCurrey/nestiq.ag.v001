"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

const tickerData = [
  { label: "UK Avg. Price", value: "£285,472", change: "+0.4%", status: "up" },
  { label: "London", value: "£534,211", change: "-1.2%", status: "down" },
  { label: "Manchester", value: "£234,110", change: "+2.1%", status: "up" },
  { label: "Leeds", value: "£245,600", change: "+1.5%", status: "up" },
  { label: "Birmingham", value: "£267,800", change: "0.0%", status: "neutral" },
  { label: "Mortgage Rate (2yr)", value: "4.82%", change: "-0.05%", status: "down" },
];

export function MarketTicker() {
  return (
    <div className="bg-obsidian border-b border-white/10 overflow-hidden h-12 flex items-center">
      <div className="flex-shrink-0 bg-forest text-white px-6 h-full flex items-center font-display font-black text-xs uppercase tracking-tighter z-10 shadow-xl">
         Live Market Data
      </div>
      
      <div className="relative flex-1 overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-100%"] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex whitespace-nowrap gap-12"
        >
          {/* Repeat twice for seamless loop */}
          {[...tickerData, ...tickerData].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
              <span className="text-body-sm font-mono font-bold text-white">{item.value}</span>
              <span className={cn(
                "text-[10px] font-black flex items-center gap-0.5",
                item.status === 'up' ? "text-emerald" : 
                item.status === 'down' ? "text-red-400" : "text-white/40"
              )}>
                {item.status === 'up' && <TrendingUp className="w-3 h-3" />}
                {item.status === 'down' && <TrendingDown className="w-3 h-3" />}
                {item.status === 'neutral' && <Minus className="w-3 h-3" />}
                {item.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
