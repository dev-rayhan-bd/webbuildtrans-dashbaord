import React from "react";
import { cn } from "@/shared/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          // Variants
          variant === "primary" &&
            "bg-[#0F62FE] text-white hover:bg-[#0353E9] focus:ring-[#0F62FE] shadow-sm",
          variant === "secondary" &&
            "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#E2E8F0] focus:ring-slate-400",
          variant === "outline" &&
            "border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-slate-50 focus:ring-slate-300",
          variant === "ghost" &&
            "text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 focus:ring-slate-300",
          variant === "danger" &&
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
          // Sizes
          size === "sm" && "h-8 px-3 text-xs gap-1.5",
          size === "md" && "h-9 px-4 text-sm gap-2",
          size === "lg" && "h-11 px-5 text-base gap-2.5",
          size === "icon" && "h-9 w-9 p-0 flex items-center justify-center",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
