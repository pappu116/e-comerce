"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Bell, ShoppingBag, Star, Tag, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { orderService } from "@/app/lib/apiClient";
import { useAuth } from "@/app/store/authStore";
import { useWishlist } from "@/app/store/wishlistStore";

export default function DashboardOverview({ setActiveTab }: { setActiveTab: (id: string) => void }) {
  const { user, isLoggedIn } = useAuth();
  const { wishlist, hydrateWishlist } = useWishlist();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      if (!isLoggedIn) {
        setOrders([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await orderService.getMyOrders();
        setOrders(Array.isArray(response?.orders) ? response.orders : []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    hydrate();
    hydrateWishlist();
  }, [isLoggedIn, hydrateWishlist]);

  const recentOrder = useMemo(
    () =>
      [...orders].sort(
        (a, b) =>
          new Date(b?.createdAt || b?.date || 0).getTime() -
          new Date(a?.createdAt || a?.date || 0).getTime()
      )[0],
    [orders]
  );

  const pendingCount = useMemo(
    () =>
      orders.filter((order) =>
        ["pending", "processing", "shipped"].includes(String(order?.status || "").toLowerCase())
      ).length,
    [orders]
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden p-8 rounded-[2.5rem] bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">
              Welcome Back, {user?.name?.split(" ")[0] || "Shopper"}
            </h3>
            <p className="text-white/80 text-sm font-bold mt-1">
              {pendingCount > 0
                ? `${pendingCount} order${pendingCount > 1 ? "s" : ""} currently in transit`
                : "No pending shipments right now"}
            </p>
          </div>
          <button
            onClick={() => setActiveTab("My Orders")}
            className="px-8 py-3 bg-white text-indigo-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl"
          >
            View Orders
          </button>
        </div>
        <Tag className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
      </motion.div>

      <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[3rem] backdrop-blur-xl">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-black uppercase italic tracking-tighter">Recent Order</h4>
          <button
            onClick={() => setActiveTab("My Orders")}
            className="text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2 hover:gap-3 transition-all"
          >
            View All <ArrowRight size={14} />
          </button>
        </div>

        {loading ? (
          <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 text-slate-400 text-sm font-semibold">
            Loading your latest order...
          </div>
        ) : recentOrder ? (
          <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white/5 rounded-[2rem] border border-white/5 group hover:bg-white/[0.08] transition-all">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10">
                <ShoppingBag className="text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1">
                  Order #{String(recentOrder?._id || "").slice(-8).toUpperCase()}
                </p>
                <h5 className="font-bold text-white text-lg">
                  {Array.isArray(recentOrder?.items) ? `${recentOrder.items.length} item(s)` : "Order"}
                </h5>
                <p className="text-[10px] text-slate-500 font-bold uppercase">
                  Status:{" "}
                  <span className="text-amber-400">{String(recentOrder?.status || "pending").toUpperCase()}</span>
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-xl font-black text-white">
                Tk {Number(recentOrder?.totalAmount || recentOrder?.subTotal || 0).toLocaleString()}
              </p>
              <button
                onClick={() => setActiveTab("My Orders")}
                className="mt-2 px-6 py-2 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                <Truck size={12} className="inline-block mr-1" />
                Track Order
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 text-slate-300 text-sm">
            No order history yet.{" "}
            <Link href="/shop" className="text-indigo-400 font-semibold hover:underline">
              Start shopping
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => setActiveTab("Wishlist")}
          className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] flex items-center gap-4 text-left"
        >
          <div className="p-3 bg-emerald-500 text-white rounded-xl">
            <Star size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">Wishlist</p>
            <p className="text-xs font-bold text-white/70">
              {wishlist.length} saved item{wishlist.length === 1 ? "" : "s"} ready for checkout.
            </p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab("Notifications")}
          className="p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-[2.5rem] flex items-center gap-4 text-left"
        >
          <div className="p-3 bg-indigo-500 text-white rounded-xl">
            <Bell size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-indigo-400 tracking-wider">Account</p>
            <p className="text-xs font-bold text-white/70">
              Role: {String(user?.role || "customer").toUpperCase()} | Status: {String(user?.status || "active").toUpperCase()}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
