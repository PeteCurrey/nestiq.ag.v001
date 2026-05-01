"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, iconLeft, iconRight, fullWidth, href, children, ...props }, ref) => {
    
    const variants = {
      primary: "bg-forest text-white hover:bg-forest/90 shadow-sm",
      secondary: "bg-emerald text-obsidian hover:bg-emerald/90 shadow-sm",
      outline: "bg-transparent border-2 border-forest text-forest hover:bg-forest hover:text-white",
      ghost: "bg-transparent text-forest hover:bg-forest/5",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
      white: "bg-white text-forest hover:bg-pearl shadow-md",
    };

    const sizes = {
      sm: "px-4 py-2 text-label",
      md: "px-6 py-3 text-body-sm font-bold tracking-wider uppercase",
      lg: "px-8 py-4 text-body-md font-bold tracking-widest uppercase",
      xl: "px-10 py-6 text-body-lg font-extrabold tracking-widest uppercase",
    };

    const content = (
      <>
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            {iconLeft && <span className="mr-2">{iconLeft}</span>}
            {children}
            {iconRight && <span className="ml-2">{iconRight}</span>}
          </>
        )}
      </>
    );

    const commonClasses = cn(
      "inline-flex items-center justify-center rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
      variants[variant],
      sizes[size],
      fullWidth && "w-full",
      className
    );

    if (href) {
      return (
        <Link href={href} className={commonClasses}>
          {content}
        </Link>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={commonClasses}
        disabled={loading || disabled}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
