// app/layout.tsx
// 'use client'; // <-- Eta obosshoi lagbe hooks use korar jonno

// import "./globals.css";
// import { ThemeProvider } from "next-themes";
// import Navbar from "@/app/components/navbar";
// import Footer from "@/app/components/footer";
// import { Geist } from "next/font/google";
// import { cn } from "@/app/lib/utils";
// import { usePathname } from "next/navigation"; // <-- Pathname hook import korun

// const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   // 1. Component-er bhetore pathname define korun
//   const pathname = usePathname();

//   // 2. Ekhane logic-ti likhun (pathname thakle check korbe)
//   const isAdminPath = pathname?.startsWith('/admin');

//   return (
//     <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
//       <body className="bg-background text-foreground">
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
//           {/* 3. Logic apply korun */}
//           {!isAdminPath && <Navbar />}
          
//           <main>{children}</main>
          
//           {!isAdminPath && <Footer />}
          
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

'use client';

import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { Geist } from "next/font/google";
import { cn } from "@/app/lib/utils";
import { usePathname } from "next/navigation";
import { useAuth } from "./store/useAuth"; // আপনার অথ স্টোর ইমপোর্ট করুন
import { motion, AnimatePresence } from "framer-motion"; // অ্যানিমেশনের জন্য

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin');
  
  // Zustand থেকে hydration স্টেট নিন
  const isHydrated = useAuth((state) => state.isHydrated);

  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          <AnimatePresence mode="wait">
            {!isHydrated ? (
              // --- সুন্দর লোডার স্ক্রিন ---
              <motion.div
                key="loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
              >
                {/* স্পিনার বা লোগো */}
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                </div>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-sm font-medium tracking-widest uppercase text-muted-foreground"
                >
                  Loading Store...
                </motion.p>
              </motion.div>
            ) : (
              // --- মূল কন্টেন্ট ---
              <motion.div 
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col min-h-screen"
              >
                {!isAdminPath && <Navbar />}
                
                <main className="flex-grow">{children}</main>
                
                {!isAdminPath && <Footer />}
              </motion.div>
            )}
          </AnimatePresence>
          
        </ThemeProvider>
      </body>
    </html>
  );
}