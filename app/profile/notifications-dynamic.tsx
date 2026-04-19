"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  Bell,
  CheckCircle2,
  Mail,
  MessageSquare,
  Monitor,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import { orderService, securityService } from "@/app/lib/apiClient";
import { useAuth } from "@/app/store/authStore";

type NotificationPreference = {
  emailOrders: boolean;
  emailPromotions: boolean;
  smsAlerts: boolean;
  pushAlerts: boolean;
};

type InboxItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "order" | "security" | "account";
  read: boolean;
};

const fallbackPreferences: NotificationPreference = {
  emailOrders: true,
  emailPromotions: true,
  smsAlerts: false,
  pushAlerts: true,
};

const relativeTime = (dateValue?: string | Date) => {
  if (!dateValue) return "recent";
  const timestamp = new Date(dateValue).getTime();
  if (Number.isNaN(timestamp)) return "recent";

  const diffMs = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "just now";
  if (diffMs < hour) return `${Math.floor(diffMs / minute)}m ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)}h ago`;
  return `${Math.floor(diffMs / day)}d ago`;
};

export default function NotificationsDynamic() {
  const user = useAuth((state) => state.user);
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const updateProfile = useAuth((state) => state.updateProfile);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [items, setItems] = useState<InboxItem[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreference>(fallbackPreferences);
  const [savingKey, setSavingKey] = useState<keyof NotificationPreference | "">("");

  useEffect(() => {
    setPreferences({
      emailOrders: Boolean(user?.notificationPreferences?.emailOrders ?? true),
      emailPromotions: Boolean(user?.notificationPreferences?.emailPromotions ?? true),
      smsAlerts: Boolean(user?.notificationPreferences?.smsAlerts ?? false),
      pushAlerts: Boolean(user?.notificationPreferences?.pushAlerts ?? true),
    });
  }, [user?.notificationPreferences]);

  useEffect(() => {
    const loadNotifications = async () => {
      if (!isLoggedIn) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const [ordersRes, sessionsRes] = await Promise.all([
          orderService.getMyOrders(),
          securityService.getSessions(),
        ]);

        const orderItems: InboxItem[] = (ordersRes?.orders || []).slice(0, 6).map((order: any) => ({
          id: `order-${order._id}`,
          title: `Order ${String(order.status || "pending").toUpperCase()}`,
          description: `#${String(order.orderNumber || order._id || "")
            .slice(-8)
            .toUpperCase()} | Tk ${Number(order.totalAmount || order.subTotal || 0).toLocaleString()}`,
          time: relativeTime(order.updatedAt || order.createdAt),
          type: "order",
          read: false,
        }));

        const sessionItems: InboxItem[] = (sessionsRes?.sessions || [])
          .slice(0, 3)
          .map((session: any) => ({
            id: `session-${session._id}`,
            title: session.isCurrent ? "Current Device Active" : "New Session Detected",
            description: `${session.device || "Unknown device"} | ${
              session.location || session.ip || "unknown location"
            }`,
            time: relativeTime(session.lastActive),
            type: "security",
            read: false,
          }));

        const accountItems: InboxItem[] = [];
        const hasAddress =
          Boolean(user?.address) ||
          (Array.isArray(user?.addresses) && user.addresses.length > 0);

        if (!user?.phone || !hasAddress) {
          accountItems.push({
            id: "account-complete-profile",
            title: "Complete Your Profile",
            description: "Add phone and address to improve delivery and account verification.",
            time: "recent",
            type: "account",
            read: false,
          });
        }

        setItems([...accountItems, ...orderItems, ...sessionItems]);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load notifications");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [isLoggedIn, user?.phone, user?.address, user?.addresses]);

  const unreadCount = useMemo(() => items.filter((item) => !item.read).length, [items]);

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const togglePreference = async (key: keyof NotificationPreference) => {
    const previous = preferences;
    const next = { ...preferences, [key]: !preferences[key] };
    setPreferences(next);
    setSavingKey(key);

    const result = await updateProfile({
      notificationPreferences: next,
    });

    setSavingKey("");
    if (!result.success) {
      setPreferences(previous);
      setError(result.message || "Failed to update preferences");
    }
  };

  const colorByType = (type: InboxItem["type"]) => {
    if (type === "security") return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (type === "account") return "text-amber-300 bg-amber-500/10 border-amber-500/20";
    return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 px-1 sm:px-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ToggleCard
          icon={Mail}
          label="Email Orders"
          enabled={preferences.emailOrders}
          loading={savingKey === "emailOrders"}
          onToggle={() => togglePreference("emailOrders")}
        />
        <ToggleCard
          icon={Mail}
          label="Email Promotions"
          enabled={preferences.emailPromotions}
          loading={savingKey === "emailPromotions"}
          onToggle={() => togglePreference("emailPromotions")}
        />
        <ToggleCard
          icon={MessageSquare}
          label="SMS Alerts"
          enabled={preferences.smsAlerts}
          loading={savingKey === "smsAlerts"}
          onToggle={() => togglePreference("smsAlerts")}
        />
        <ToggleCard
          icon={Monitor}
          label="Push Alerts"
          enabled={preferences.pushAlerts}
          loading={savingKey === "pushAlerts"}
          onToggle={() => togglePreference("pushAlerts")}
        />
      </div>

      <div className="space-y-5 rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black uppercase italic text-white md:text-2xl">
              Recent Activity
            </h3>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 md:text-xs">
              {loading ? "Syncing notifications" : `${unreadCount} unread`}
            </p>
          </div>
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300"
          >
            <CheckCircle2 size={12} /> Mark all read
          </button>
        </div>

        {error ? <p className="text-xs font-bold text-rose-400">{error}</p> : null}

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center font-bold text-slate-400">
            Loading notifications...
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center font-bold text-slate-400">
            No new notifications.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex items-start gap-4 rounded-2xl border p-4 transition-all md:p-5 ${
                  item.read ? "border-white/10 bg-white/[0.02] opacity-70" : "border-white/15 bg-white/[0.05]"
                }`}
              >
                <div className={`rounded-xl border p-3 ${colorByType(item.type)}`}>
                  {item.type === "order" ? (
                    <Truck size={18} />
                  ) : item.type === "security" ? (
                    <ShieldCheck size={18} />
                  ) : (
                    <Bell size={18} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-white md:text-base">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-400 md:text-sm">{item.description}</p>
                </div>
                <span className="whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ToggleCard({
  icon: Icon,
  label,
  enabled,
  loading,
  onToggle,
}: {
  icon: ComponentType<{ size?: number }>;
  label: string;
  enabled: boolean;
  loading: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-[2rem] border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-400">
          <Icon size={18} />
        </div>
        <span className="text-sm font-bold text-slate-100">{label}</span>
      </div>
      <button
        onClick={onToggle}
        disabled={loading}
        className={`h-6 w-11 rounded-full p-1 transition-colors ${
          enabled ? "bg-indigo-600" : "bg-slate-700"
        } ${loading ? "opacity-60" : ""}`}
      >
        <motion.div
          animate={{ x: enabled ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 450, damping: 30 }}
          className="h-4 w-4 rounded-full bg-white"
        />
      </button>
    </div>
  );
}
