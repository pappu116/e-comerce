"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // এটি নিশ্চিত করে যে ব্রাউজারে রেন্ডার হওয়ার পরেই বাটনটি দেখা যাবে
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // অথবা একটি ছোট লোডার/আইকন দিতে পারো

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-zinc-600" />
      )}
    </button>
  )
}