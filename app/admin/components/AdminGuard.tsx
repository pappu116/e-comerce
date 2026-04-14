// @/components/admin/AdminGuard.tsx
"use client";
import { useAuth } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated) {
      // যদি লগইন না থাকে অথবা রোল 'admin' না হয়
      if (!isLoggedIn || user?.role !== 'admin') {
        router.push("/"); // হোম পেজে বা অন্য কোথাও পাঠিয়ে দিন
      }
    }
  }, [isHydrated, isLoggedIn, user, router]);

  if (!isHydrated || !isLoggedIn || user?.role !== 'admin') {
    return <div className="h-screen flex items-center justify-center">Verifying Admin...</div>;
  }

  return <>{children}</>;
}
