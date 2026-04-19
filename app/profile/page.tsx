"use client";

import { type ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Heart,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/app/store/authStore";
import QuickStats from "./quick-stats";
import DashboardOverview from "./dashboard-overview-dynamic";
import OrdersSection from "../components/OrdersSection";
import WishlistSection from "../components/WishlistSection";
import AddressesSection from "../components/AddressesSection";
import NotificationsDynamic from "./notifications-dynamic";
import PrivacySection from "../components/PrivacySection";
import SettingsDynamic from "./settings-dynamic";
import Image from "next/image";

type ProfileTab =
  | "dashboard"
  | "My Orders"
  | "Wishlist"
  | "Addresses"
  | "Notifications"
  | "Security & Privacy"
  | "Settings";

const menu: Array<{ label: ProfileTab; icon: ComponentType<{ size?: number }> }> = [
  { icon: LayoutDashboard, label: "dashboard" },
  { icon: Package, label: "My Orders" },
  { icon: Heart, label: "Wishlist" },
  { icon: MapPin, label: "Addresses" },
  { icon: Bell, label: "Notifications" },
  { icon: ShieldCheck, label: "Security & Privacy" },
  { icon: Settings, label: "Settings" },
];

export default function ProfilePage() {
  const { user, isLoggedIn, logout, checkAuth, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProfileTab>("dashboard");
  const [isChecking, setIsChecking] = useState(true);
  const handleSetTab = (tab: string) => {
    setActiveTab(tab as ProfileTab);
  };

  useEffect(() => {
    const hasToken = typeof window !== "undefined" && Boolean(localStorage.getItem("token"));
    if (!hasToken) {
      setIsChecking(false);
      return;
    }
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authLoading) return;

    if (!isLoggedIn || !user) {
      setIsChecking(false);
      router.replace("/login?redirect=/profile");
      return;
    }

    setIsChecking(false);
    if (String(user.role || "").toLowerCase() === "admin") {
      router.replace("/admin");
    }
  }, [authLoading, isLoggedIn, router, user]);

  if (isChecking || authLoading || !isLoggedIn || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
        <div className="text-center">
          <p className="text-xl font-medium">Loading your profile...</p>
          <p className="mt-2 text-sm text-slate-400">Please wait</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview setActiveTab={handleSetTab} />;
      case "My Orders":
        return <OrdersSection />;
      case "Wishlist":
        return <WishlistSection />;
      case "Addresses":
        return <AddressesSection />;
      case "Notifications":
        return <NotificationsDynamic />;
      case "Security & Privacy":
        return <PrivacySection />;
      case "Settings":
        return <SettingsDynamic />;
      default:
        return <DashboardOverview setActiveTab={handleSetTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] p-4 text-white md:p-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
        <aside className="space-y-6 lg:col-span-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
            {/* <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/20 bg-indigo-600 text-4xl font-black">
              {user.name?.charAt(0).toUpperCase()}
            </div> */}
            <div className="mx-auto mb-4 relative h-24 w-24 rounded-full border-4 border-white/20 overflow-hidden bg-zinc-800">
            {user?.profileImage ? (
             <Image
            src={user.profileImage}
            alt={user.name || "Profile"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100px, 96px"
            priority={false}
          />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 text-5xl font-black text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
          </div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="mt-1 text-slate-400">{user.email}</p>

            <button
              onClick={async () => {
                await logout();
                router.push("/login");
              }}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500/10 py-3 font-semibold text-red-500 transition-all hover:bg-red-500 hover:text-white"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          <nav className="space-y-1 rounded-3xl border border-white/10 bg-white/5 p-4">
            {menu.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex w-full items-center gap-4 rounded-2xl p-4 transition-all ${
                  activeTab === item.label
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-white/10"
                }`}
              >
                <item.icon size={20} />
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="lg:col-span-8">
          <QuickStats setActiveTab={handleSetTab} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
