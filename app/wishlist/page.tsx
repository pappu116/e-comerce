"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/app/store/authStore";
import WishlistSection from "@/app/components/WishlistSection";

export default function WishlistPage() {
  const router = useRouter();
  const { isHydrated, isLoggedIn, loading, checkAuth } = useAuth();

  useEffect(() => {
    if (!isHydrated) return;
    const hasToken = typeof window !== "undefined" && Boolean(localStorage.getItem("token"));
    if (!hasToken) return;
    checkAuth();
  }, [isHydrated, checkAuth]);

  useEffect(() => {
    if (!isHydrated || loading) return;
    if (!isLoggedIn) {
      router.replace("/login?redirect=/wishlist");
    }
  }, [isHydrated, loading, isLoggedIn, router]);

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 size={18} className="animate-spin" />
          Loading wishlist...
        </div>
      </div>
    );
  }

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <WishlistSection />
      </div>
    </div>
  );
}
