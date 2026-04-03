// app/layout.tsx
'use client'; // <-- Eta obosshoi lagbe hooks use korar jonno

import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { Geist } from "next/font/google";
import { cn } from "@/app/lib/utils";
import { usePathname } from "next/navigation"; // <-- Pathname hook import korun

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 1. Component-er bhetore pathname define korun
  const pathname = usePathname();

  // 2. Ekhane logic-ti likhun (pathname thakle check korbe)
  const isAdminPath = pathname?.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {/* 3. Logic apply korun */}
          {!isAdminPath && <Navbar />}
          
          <main>{children}</main>
          
          {!isAdminPath && <Footer />}
          
        </ThemeProvider>
      </body>
    </html>
  );
}