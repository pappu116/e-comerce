// app/layout.tsx
// 1. Correct the CSS import path
import "./globals.css";

import { ThemeProvider } from "next-themes";

// 2. Add /app to the alias paths so Next.js can find your files
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}