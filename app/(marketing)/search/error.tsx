'use client'

import { Button } from "@/components/ui/Button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function SearchError({ 
  error, 
  reset 
}: { 
  error: Error
  reset: () => void 
}) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6 bg-silk">
      <div className="max-w-md">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h2 className="text-display-xs font-display text-obsidian mb-4">
          Search unavailable
        </h2>
        <p className="text-body-md text-muted mb-8 leading-relaxed">
          Something went wrong loading search results. This could be due to a temporary connection issue or an invalid filter combination.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="bg-obsidian text-silk px-8 py-4 text-[10px] font-bold uppercase tracking-widest">
            Try again
          </Button>
          <Button variant="outline" href="/" className="border-border/40 text-muted px-8 py-4 text-[10px] font-bold uppercase tracking-widest">
            Return Home
          </Button>
        </div>
      </div>
    </div>
  )
}
