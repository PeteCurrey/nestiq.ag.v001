import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  items: { label: string; href: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-4">
          <Link 
            href={item.href} 
            className={index === items.length - 1 ? "text-obsidian" : "hover:text-emerald transition-colors"}
          >
            {item.label}
          </Link>
          {index < items.length - 1 && <ChevronRight className="w-3 h-3 text-muted/40" />}
        </div>
      ))}
    </nav>
  );
}
