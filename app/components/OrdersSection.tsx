"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Package, Truck, X } from "lucide-react";
import { orderService } from "@/app/lib/apiClient";
import { useAuth } from "@/app/store/authStore";

type OrderItem = {
  _id: string;
  status: string;
  createdAt?: string;
  totalAmount?: number;
  subTotal?: number;
};

type TrackingInfo = {
  status?: string;
  trackingNumber?: string;
  deliveryDate?: string;
  shippingAddress?: {
    addressLine1?: string;
    area?: string;
    city?: string;
    country?: string;
  };
  statusHistory?: Array<{
    status?: string;
    note?: string;
    updatedAt?: string;
  }>;
};

const statusClass: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  shipped: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  refunded: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

const formatCurrency = (value: number) => `Tk ${Number(value || 0).toLocaleString()}`;

export default function OrdersSection() {
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [tracking, setTracking] = useState<TrackingInfo | null>(null);
  const [trackingError, setTrackingError] = useState("");
  const [trackingLoading, setTrackingLoading] = useState(false);

  const totalSpent = useMemo(
    () =>
      orders.reduce(
        (sum, order) => sum + Number(order.totalAmount || order.subTotal || 0),
        0
      ),
    [orders]
  );

  const activeShipment = useMemo(
    () =>
      orders.find((order) =>
        ["pending", "processing", "shipped"].includes(String(order.status || "").toLowerCase())
      ) || null,
    [orders]
  );

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isLoggedIn) {
        setOrders([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const response = await orderService.getMyOrders();
        setOrders(Array.isArray(response?.orders) ? response.orders : []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isLoggedIn]);

  const openTracking = async (orderId: string) => {
    setSelectedOrderId(orderId);
    setTracking(null);
    setTrackingError("");
    setTrackingLoading(true);
    try {
      const response = await orderService.getTracking(orderId);
      setTracking(response?.tracking || null);
    } catch (err: any) {
      setTrackingError(err?.response?.data?.message || "Tracking unavailable");
    } finally {
      setTrackingLoading(false);
    }
  };

  const closeTracking = () => {
    setSelectedOrderId(null);
    setTracking(null);
    setTrackingError("");
  };

  const cancelOrder = async (orderId: string) => {
    setError("");
    try {
      const response = await orderService.cancel(orderId);
      if (response?.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: "cancelled" } : order
          )
        );
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to cancel order");
    }
  };

  return (
    <div className="space-y-8 px-2 sm:px-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-[2rem] border border-indigo-500/20 bg-indigo-500/10 p-6">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
            Current Shipment
          </p>
          <h4 className="text-2xl font-black text-white">
            {activeShipment ? `#${String(activeShipment._id).slice(-8).toUpperCase()}` : "N/A"}
          </h4>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Total Orders
          </p>
          <h4 className="text-3xl font-black text-white">{orders.length}</h4>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Total Spent
          </p>
          <h4 className="text-3xl font-black text-indigo-400">{formatCurrency(totalSpent)}</h4>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <h3 className="text-2xl font-black uppercase italic tracking-tight text-white md:text-3xl">
          Purchase History
        </h3>
        <div className="mx-6 hidden h-px flex-1 bg-white/5 sm:block" />
      </div>

      {error ? <p className="px-2 text-sm font-bold text-rose-400">{error}</p> : null}

      {loading ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center font-bold text-slate-400">
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center font-bold text-slate-400">
          No orders found yet.
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const normalizedStatus = String(order.status || "pending").toLowerCase();
            const total = Number(order.totalAmount || order.subTotal || 0);

            return (
              <motion.div
                key={order._id}
                whileHover={{ y: -3 }}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="mb-6 flex flex-col items-start justify-between gap-5 md:flex-row">
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-3 text-indigo-500">
                      <Package size={22} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase italic text-slate-100">
                        Order #{String(order._id).slice(-8).toUpperCase()}
                      </h4>
                      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] ${
                      statusClass[normalizedStatus] ||
                      "border-slate-500/20 bg-slate-500/10 text-slate-300"
                    }`}
                  >
                    {normalizedStatus}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-5 sm:flex-row">
                  <div className="flex w-full flex-wrap gap-3 sm:w-auto">
                    <button
                      onClick={() => openTracking(order._id)}
                      className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-indigo-500"
                    >
                      <Truck size={14} /> Track
                    </button>
                    {["pending", "processing"].includes(normalizedStatus) ? (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-rose-300 hover:bg-rose-500/20"
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                  <div className="text-right">
                    <p className="mb-1 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                      Total
                    </p>
                    <p className="text-2xl font-black text-white">{formatCurrency(total)}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {selectedOrderId ? (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeTracking}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.95, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 24 }}
              className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0f172a] p-6"
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h4 className="text-2xl font-black uppercase italic text-white">Order Tracking</h4>
                  <p className="mt-1 text-xs font-black uppercase tracking-widest text-indigo-400">
                    Ref #{String(selectedOrderId).slice(-8).toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={closeTracking}
                  className="rounded-full bg-white/5 p-2 text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              {trackingLoading ? (
                <div className="p-6 text-center font-bold text-slate-400">
                  Loading tracking details...
                </div>
              ) : trackingError ? (
                <div className="p-6 text-center font-bold text-rose-400">{trackingError}</div>
              ) : tracking ? (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <InfoCard
                      title="Status"
                      value={String(tracking.status || "pending").toUpperCase()}
                    />
                    <InfoCard title="Tracking No" value={tracking.trackingNumber || "Not assigned"} />
                    <InfoCard
                      title="Delivery"
                      value={
                        tracking.deliveryDate
                          ? new Date(tracking.deliveryDate).toLocaleDateString()
                          : "Pending"
                      }
                    />
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Shipping Address
                    </p>
                    <p className="text-sm text-slate-200">
                      {tracking.shippingAddress?.addressLine1 || "N/A"},{" "}
                      {tracking.shippingAddress?.area || ""} {tracking.shippingAddress?.city || ""}{" "}
                      {tracking.shippingAddress?.country || ""}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Timeline
                    </p>
                    {Array.isArray(tracking.statusHistory) && tracking.statusHistory.length > 0 ? (
                      tracking.statusHistory.map((entry, index) => (
                        <div
                          key={`timeline-${index}`}
                          className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-3"
                        >
                          <div>
                            <p className="text-sm font-black uppercase text-white">
                              {entry.status || "Updated"}
                            </p>
                            <p className="text-xs text-slate-400">{entry.note || "Status updated"}</p>
                          </div>
                          <p className="text-xs text-slate-500">
                            {entry.updatedAt ? new Date(entry.updatedAt).toLocaleString() : ""}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-400">
                        Timeline not available yet.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center font-bold text-slate-400">
                  No tracking data available.
                </div>
              )}
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-slate-500">{title}</p>
      <p className="font-black text-white">{value}</p>
    </div>
  );
}
