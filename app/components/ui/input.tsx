// app/components/ui/input.tsx
"use client"

import * as React from "react"
import { cn } from "@/app/lib/utils"

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    className={cn(
      "border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full",
      className
    )}
    ref={ref}
    {...props}
  />
))
Input.displayName = "Input"