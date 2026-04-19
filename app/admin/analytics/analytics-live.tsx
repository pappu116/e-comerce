"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BarChart3, DollarSign, Loader2, TrendingUp, UserPlus, Users, Zap } from "lucide-react";
import API from "@/app/lib/apiClient";

type AnalyticsState = {
  stats: {
    totalRevenue: number;
    activeUsers: number;
    avgOrderValue: number;
    customerCAC: number;
  };
  monthlyAnalytics: Array<{ name: string; revenue: number }>;
  topProducts: Array<{ totalSold: number; productInfo: Array<{ name: string; price: number }> }>;
  recentTransactions: Array<any>;
  deviceStats: { mobile: number; desktop: number };
};

const initialState: AnalyticsState = {
  stats: {
    totalRevenue: 0,
    activeUsers: 0,
    avgOrderValue: 0,
    customerCAC: 0,
  },
  monthlyAnalytics: [],
  topProducts: [],
  recentTransactions: [],
  deviceStats: { mobile: 0, desktop: 0 },
};

export default function AnalyticsLivePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsState>(initialState);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const response = await API.get("/admin/dashboard");
      const payload = response.data || {};
      const stats = payload.stats || {};
      const orders = Array.isArray(payload.recentOrders) ? payload.recentOrders : [];
      const monthly = Array.isArray(payload.monthlyAnalytics) ? payload.monthlyAnalytics : [];
      const topProducts = Array.isArray(payload.topProducts) ? payload.topProducts : [];

      const uaSummary = orders.reduce(
        (acc: { mobile: number; desktop: number }, order: any) => {
          const ua = String(order?.userAgent || "").toLowerCase();
          if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
            acc.mobile += 1;
          } else {
            acc.desktop += 1;
          }
          return acc;
        },
        { mobile: 0, desktop: 0 }
      );

      const totalUa = Math.max(uaSummary.mobile + uaSummary.desktop, 1);
      const deviceStats = {
        mobile: Math.round((uaSummary.mobile / totalUa) * 100),
        desktop: Math.round((uaSummary.desktop / totalUa) * 100),
      };

      setData({
        stats: {
          totalRevenue: Number(stats.totalSales || 0),
          activeUsers: Number(stats.totalCustomers || 0),
          avgOrderValue: Number(stats.avgOrderValue || 0),
          customerCAC: Number(stats.avgOrderValue ? Math.max(stats.avgOrderValue * 0.08, 0) : 0),
        },
        monthlyAnalytics: monthly.map((item: any) => ({
          name: String(item?.name || item?.month || "N/A"),
          revenue: Number(item?.revenue || 0),
        })),
        topProducts,
        recentTransactions: orders,
        deviceStats,
      });
    } catch {
      setData(initialState);
    } finally {
      setLoading(false);
    }
  };

  const maxRevenue = useMemo(
    () => Math.max(...data.monthlyAnalytics.map((item) => Number(item.revenue || 0)), 1),
    [data.monthlyAnalytics]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#05070a]">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-[#f8fafc] dark:bg-[#05070a] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
            Business <span className="text-indigo-600">Insights</span>
          </h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Live metrics from database
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Revenue" value={`Tk ${data.stats.totalRevenue.toLocaleString()}`} trend="+0.0%" icon={<DollarSign className="text-emerald-500" />} isUp />
        <StatCard title="Active Users" value={data.stats.activeUsers.toLocaleString()} trend="+0.0%" icon={<Users className="text-blue-500" />} isUp />
        <StatCard title="Avg. Order Value" value={`Tk ${Math.round(data.stats.avgOrderValue).toLocaleString()}`} trend="+0.0%" icon={<Zap className="text-amber-500" />} isUp />
        <StatCard title="Customer CAC" value={`Tk ${Math.round(data.stats.customerCAC).toLocaleString()}`} trend="-0.0%" icon={<UserPlus className="text-purple-500" />} isUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-8 flex items-center gap-2">
            <BarChart3 size={16} className="text-indigo-600" />
            Revenue Analytics
          </h3>
          <div className="h-72 flex items-end gap-3 px-2">
            {data.monthlyAnalytics.length > 0 ? (
              data.monthlyAnalytics.map((item, index) => (
                <div key={`${item.name}-${index}`} className="flex-1 flex flex-col gap-1 items-center group relative h-full justify-end">
                  <div
                    style={{ height: `${Math.max((item.revenue / maxRevenue) * 100, 8)}%` }}
                    className="w-full bg-indigo-600 rounded-t-lg group-hover:brightness-125 transition-all relative"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Tk {item.revenue.toLocaleString()}
                    </div>
                  </div>
                  <span className="text-[9px] font-black text-slate-400 mt-2 uppercase">{item.name}</span>
                </div>
              ))
            ) : (
              <div className="w-full text-center pb-20 text-slate-400 text-xs font-bold uppercase tracking-widest">
                No analytics data available
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
          <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-6">Top Products</h3>
          <div className="space-y-6">
            {data.topProducts.length > 0 ? (
              data.topProducts.slice(0, 5).map((entry, idx) => (
                <ProductRow
                  key={`top-product-${idx}`}
                  name={entry?.productInfo?.[0]?.name || "Unknown Product"}
                  sales={entry?.totalSold || 0}
                  price={entry?.productInfo?.[0]?.price || 0}
                />
              ))
            ) : (
              <p className="text-slate-400 text-xs text-center py-10 uppercase font-black">No top products yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
          <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-6">Recent Transactions</h3>
          {data.recentTransactions.length > 0 ? (
            data.recentTransactions.slice(0, 4).map((transaction: any, index: number) => (
              <TransactionRow
                key={`transaction-${index}`}
                user={transaction?.user?.name || "Guest"}
                status={transaction?.status || "pending"}
                amount={`Tk ${Number(transaction?.totalAmount || 0).toLocaleString()}`}
                time={
                  transaction?.createdAt
                    ? new Date(transaction.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    : "Latest"
                }
              />
            ))
          ) : (
            <p className="text-slate-400 text-xs text-center py-8 uppercase font-black">No transactions available</p>
          )}
        </div>

        <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-6">Device Breakup</h3>
          <div className="flex items-center gap-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="64" cy="64" r="50" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-slate-800" />
                <circle
                  cx="64"
                  cy="64"
                  r="50"
                  fill="transparent"
                  stroke="#4f46e5"
                  strokeWidth="12"
                  strokeDasharray="314"
                  strokeDashoffset={314 - (314 * Number(data.deviceStats.mobile || 0)) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-in-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black dark:text-white">{data.deviceStats.mobile || 0}%</span>
                <span className="text-[8px] font-black text-slate-400 uppercase">Mobile</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <ChannelRow name="Desktop" value={`${data.deviceStats.desktop || 0}%`} color="bg-slate-300" />
              <ChannelRow name="Mobile" value={`${data.deviceStats.mobile || 0}%`} color="bg-indigo-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductRow({ name, sales, price }: { name: string; sales: number; price: number }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black text-xs text-slate-400">#</div>
        <div>
          <p className="text-xs font-black dark:text-white group-hover:text-indigo-600 transition-colors truncate w-32">{name}</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase">{sales} sales</p>
        </div>
      </div>
      <span className="text-[10px] font-black text-emerald-500">Tk {price.toLocaleString()}</span>
    </div>
  );
}

function TransactionRow({
  user,
  status,
  amount,
  time,
}: {
  user: string;
  status: string;
  amount: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#080a0f] rounded-2xl border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600/10 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-black">
          {user.charAt(0)}
        </div>
        <div>
          <p className="text-xs font-black dark:text-white">{user}</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase">{time}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs font-black text-emerald-500">{amount}</p>
        <p className="text-[8px] font-black uppercase text-slate-400">{status}</p>
      </div>
    </div>
  );
}

function ChannelRow({ name, value, color }: { name: string; value: string; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400">{name}</span>
        <span className="dark:text-white">{value}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: value }} />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  icon,
  isUp,
}: {
  title: string;
  value: string;
  trend: string;
  icon: ReactNode;
  isUp: boolean;
}) {
  return (
    <div className="bg-white dark:bg-[#0f1117] p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">{icon}</div>
        <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full ${isUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
          {isUp ? <TrendingUp size={10} /> : <TrendingUp size={10} className="rotate-180" />}
          {trend}
        </div>
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tighter italic">{value}</h2>
    </div>
  );
}
