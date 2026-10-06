import React from "react";
import { cn } from "@/shared/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "info" | "danger" | "neutral";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  size = "md",
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variant === "success" && "bg-[#DCFCE7] text-[#16A34A]",
        variant === "warning" && "bg-[#FEF3C7] text-[#D97706]",
        variant === "info" && "bg-[#DBEAFE] text-[#2563EB]",
        variant === "danger" && "bg-[#FEE2E2] text-[#DC2626]",
        variant === "neutral" && "bg-[#F1F5F9] text-[#64748B]",
        size === "sm" && "px-2 py-0.5 text-xs",
        size === "md" && "px-2.5 py-1 text-xs",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
