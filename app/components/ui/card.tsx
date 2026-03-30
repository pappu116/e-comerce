// app/components/ui/card.tsx
"use client"

import * as React from "react"
import { cn } from "@/app/lib/utils"

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4", className)}>{children}</div>
)

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("p-4", className)}>{children}</div>
)