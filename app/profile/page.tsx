

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, Package, Heart, MapPin, Bell, ShieldCheck, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from "@/app/store/useAuth";

import QuickStar from "./quick-stats";
import DashboardOverview from "./DashboardOverview";
import OrdersSection from "../components/OrdersSection";
import WishlistSection from "../components/WishlistSection";
import AddressesSection from "../components/AddressesSection";
import NotificationsSection from "../components/NotificationsSection";
import PrivacySection from "../components/PrivacySection";
import SettingsSection from "../components/SettingsSection";

export default function ProfilePage() {
  const { user, isLoggedIn, logout, checkAuth, loading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // যদি এখনো loading চলছে তাহলে অপেক্ষা করো
    if (authLoading) return;

    if (isLoggedIn && user) {
      setIsChecking(false);

      // অ্যাডমিন হলে অ্যাডমিনে পাঠাও
      if (user.role === "admin") {
        router.replace("/admin");
      }
    } 
    else if (!isLoggedIn && !isChecking && !authLoading) {
      router.replace("/login?redirect=/profile");
    }
  }, [isLoggedIn, user, authLoading, router, isChecking]);

  if (isChecking || authLoading || !isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl font-medium">Loading your profile...</p>
          <p className="text-sm text-slate-400 mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  const menu = [
    { icon: LayoutDashboard, label: "dashboard" },
    { icon: Package, label: "My Orders" },
    { icon: Heart, label: "Wishlist" },
    { icon: MapPin, label: "Addresses" },
    { icon: Bell, label: "Notifications" },
    { icon: ShieldCheck, label: "Security & Privacy" },
    { icon: Settings, label: "Settings" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardOverview setActiveTab={setActiveTab} />;
      case "My Orders": return <OrdersSection />;
      case "Wishlist": return <WishlistSection />;
      case "Addresses": return <AddressesSection />;
      case "Notifications": return <NotificationsSection />;
      case "Security & Privacy": return <PrivacySection />;
      case "Settings": return <SettingsSection user={user} />;
      default: return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar - তোমার আগের কোড একই রাখো */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center backdrop-blur-xl">
            <div className="w-24 h-24 mx-auto mb-4 bg-indigo-600 rounded-full flex items-center justify-center text-4xl font-black border-4 border-white/20">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-slate-400 mt-1">{user.email}</p>

            <button
              onClick={() => { logout(); router.push("/login"); }}
              className="mt-8 w-full py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          <nav className="p-4 bg-white/5 border border-white/10 rounded-3xl space-y-1">
            {menu.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${
                  activeTab === item.label ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-white/10"
                }`}
              >
                <item.icon size={20} />
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="lg:col-span-8">
          <QuickStar setActiveTab={setActiveTab} />

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