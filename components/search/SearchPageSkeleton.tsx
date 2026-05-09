"use client";

export function SearchPageSkeleton() {
  return (
    <div className="bg-silk min-h-screen">
      {/* Skeleton Header/Filter Bar */}
      <div className="bg-white border-b border-border/40 h-[160px] sticky top-[72px] z-30 flex items-center px-12">
        <div className="w-full max-w-4xl mx-auto h-12 bg-pearl animate-pulse" />
      </div>

      <div className="max-w-[1800px] mx-auto px-12 py-12">
        <div className="flex gap-12">
          {/* Left Panel Skeleton */}
          <div className="hidden lg:block w-80 h-[600px] bg-white border border-border/40 animate-pulse" />
          
          {/* Main Results Skeleton */}
          <div className="flex-1">
            <div className="h-12 w-64 bg-white mb-12 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/5] bg-white border border-border/40 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
