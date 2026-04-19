"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ThemeProvider } from "next-themes";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import { useAuth } from "@/app/store/authStore";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin");

  const isHydrated = useAuth((state) => state.isHydrated);
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const user = useAuth((state) => state.user);
  const checkAuth = useAuth((state) => state.checkAuth);

  useEffect(() => {
    if (!isHydrated || !isLoggedIn || user) return;
    checkAuth();
  }, [isHydrated, isLoggedIn, user, checkAuth]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {!isHydrated ? (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Loading Store
          </p>
        </div>
      ) : (
        <div className="flex min-h-screen flex-col">
          {!isAdminPath && <Navbar />}
          <main className="flex-1">{children}</main>
          {!isAdminPath && <Footer />}
        </div>
      )}
    </ThemeProvider>
  );
}
