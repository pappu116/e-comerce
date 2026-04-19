
"use client";
import { type ComponentType, useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Heart, MapPin, ShoppingBag, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { orderService } from "@/app/lib/apiClient";
import { useAuth } from "@/app/store/authStore";
import { useWishlist } from "@/app/store/wishlistStore";

type StatCard = {
  id: string;
  label: string;
  value: string;
  icon: ComponentType<{ size?: number }>;
  color: string;
  bg: string;
  border: string;
  description: string;
};

export default function QuickStats({ setActiveTab }: { setActiveTab: (id: string) => void }) {
  const { isLoggedIn, user } = useAuth();
  const { wishlist, hydrateWishlist } = useWishlist();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      setOrders([]);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await orderService.getMyOrders();
        setOrders(Array.isArray(response?.orders) ? response.orders : []);
      } catch {
        setOrders([]);
      }
    };

    fetchOrders();
    hydrateWishlist();
  }, [isLoggedIn, hydrateWishlist]);

  const totalSpent = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order?.totalAmount || order?.subTotal || 0), 0),
    [orders]
  );

  const processingOrders = useMemo(
    () =>
      orders.filter((order) =>
        ["pending", "processing", "shipped"].includes(String(order?.status || "").toLowerCase())
      ).length,
    [orders]
  );

  const stats: StatCard[] = [
    {
      id: "My Orders",
      label: "Total Orders",
      value: String(orders.length).padStart(2, "0"),
      icon: ShoppingBag,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      description: "View history",
    },
    { 
      id: "My Orders",
      label: "Total Spent",
      value: `Tk ${totalSpent.toLocaleString()}`,
      icon: Truck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      description: "Order value",
    },
    { 
      id: "Addresses",
      label: "Saved Addresses",
      value: String(Array.isArray(user?.addresses) ? user.addresses.length : 0).padStart(2, "0"),
      icon: MapPin,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      description: "Manage shipping",
    },
    { 
      id: "Wishlist",
      label: "Wishlist Items",
      value: String(wishlist.length).padStart(2, "0"),
      icon: Heart,
      color: "text-fuchsia-400",
      bg: "bg-fuchsia-500/10",
      border: "border-fuchsia-500/20",
      description: processingOrders > 0 ? `${processingOrders} shipping` : "Save products",
    },
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, i) => (
        <button 
          key={stat.label}
          onClick={() => setActiveTab(stat.id)} 
          className="block w-full text-left group"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative p-6 bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-300 overflow-hidden h-full flex flex-col justify-between"
          >
            {/* Glow effect on hover */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${stat.bg}`} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center border ${stat.border} shadow-inner`}>
                  <stat.icon size={24} />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-white/40">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1.5 group-hover:text-white/60 transition-colors">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                    {stat.value}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-600 group-hover:text-indigo-400 transition-colors">
                    {stat.description}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom animated border */}
            <div className={`absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-transparent via-current to-transparent ${stat.color}`} />
          </motion.div>
        </button>
      ))}
    </div>
  );
}
