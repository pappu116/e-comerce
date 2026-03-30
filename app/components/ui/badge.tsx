// app/components/ui/badge.tsx
"use client"

import * as React from "react"
import { cn } from "@/app/lib/utils"

export const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800",
        className
      )}
    >
      {children}
    </span>
  )
}