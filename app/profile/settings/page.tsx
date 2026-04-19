"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/app/store/authStore";
import ProfileSettingsContent from "./ProfileSettingsContent";

export default function ProfileSettingsPage() {
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
      router.replace("/login?redirect=/profile/settings");
    }
  }, [isHydrated, loading, isLoggedIn, router]);

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 size={18} className="animate-spin" />
          Loading settings...
        </div>
      </div>
    );
  }

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="mb-6 text-2xl font-black tracking-tight">Profile Settings</h1>
        <ProfileSettingsContent />
      </div>
    </div>
  );
}
