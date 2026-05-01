import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "emerald" | "outline" | "status";
  status?: "for-sale" | "to-rent" | "sold" | "let" | "new-build";
}

function Badge({ className, variant = "default", status, ...props }: BadgeProps) {
  const variants = {
    default: "bg-obsidian/40 backdrop-blur-md text-white border-transparent",
    emerald: "bg-emerald text-white border-transparent font-bold tracking-widest",
    outline: "border-border text-muted",
    status: "",
  };

  const statusColors = {
    "for-sale": "bg-forest text-white",
    "to-rent": "bg-blue-600 text-white",
    "sold": "bg-muted text-white",
    "let": "bg-purple-600 text-white",
    "new-build": "bg-amber-600 text-white",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-label font-bold uppercase tracking-wider transition-colors",
        variants[variant],
        status && statusColors[status],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
