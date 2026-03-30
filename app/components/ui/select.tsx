// app/components/ui/select.tsx
"use client"

import * as React from "react"
import { cn } from "@/app/lib/utils"

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full",
      className
    )}
    {...props}
  />
))
Select.displayName = "Select"