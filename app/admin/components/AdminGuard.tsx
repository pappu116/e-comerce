"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/app/store/authStore";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuth((state) => state.user);
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const isHydrated = useAuth((state) => state.isHydrated);
  const loading = useAuth((state) => state.loading);
  const checkAuth = useAuth((state) => state.checkAuth);
  const isAdmin = String(user?.role || "").toLowerCase() === "admin";

  useEffect(() => {
    if (!isHydrated) return;
    const hasToken = typeof window !== "undefined" && Boolean(localStorage.getItem("token"));
    if ((isLoggedIn && !user) || (!isLoggedIn && hasToken)) {
      checkAuth();
    }
  }, [isHydrated, isLoggedIn, user, checkAuth]);

  useEffect(() => {
    if (!isHydrated || loading) return;

    if (!isLoggedIn) {
      router.replace("/login?redirect=/admin");
      return;
    }

    if (user && !isAdmin) {
      router.replace("/profile");
    }
  }, [isHydrated, loading, isLoggedIn, isAdmin, user, router]);

  if (!isHydrated || loading || !isLoggedIn || !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
          <Loader2 size={16} className="animate-spin" />
          Verifying admin access...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
