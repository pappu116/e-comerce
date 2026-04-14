
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  DollarSign, ShoppingCart, Users, Package, 
  TrendingUp, Search, Loader2, ArrowRight 
} from 'lucide-react';
import { Input } from "@/components/ui/input"; 
import DataTable from './components/DataTable';
import API from '@/app/lib/apiClient'; 
import { useAuth } from "@/app/store/authStore";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isLoggedIn, loading: authLoading, checkAuth } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  const [data, setData] = useState<any>({
    stats: { totalRevenue: 0, totalOrders: 0, totalCustomers: 0, totalProducts: 0 },
    recentOrders: []
  });

  // Auth Check
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Protection & Data Fetch
  useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn) {
      router.replace("/login?redirect=/admin");
      return;
    }
    if (user?.role !== "admin") {
      router.replace("/profile");
      return;
    }
    setIsChecking(false);
    fetchStats();
  }, [isLoggedIn, user, authLoading, router]);

  // const fetchStats = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await API.get('/admin/dashboard');
  //     console.log("Full API Response:", res.data);   // ← এটা খুব জরুরি

  //     if (res.data?.success) {
  //       const s = res.data.stats || {};
  //       setData({
  //         stats: {
  //           totalRevenue: s.totalSales || s.totalRevenue || 0,
  //           totalOrders: s.totalOrders || 0,
  //           totalCustomers: s.totalCustomers || s.totalUsers || 0,
  //           totalProducts: s.totalProducts || 0,
  //         },
  //         recentOrders: res.data.recentOrders || []   // এখানে res.data.recentOrders
  //       });
  //     }
  //   } catch (err) {
  //     console.error("Dashboard error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   const fetchStats = async () => {
//   try {
//     setLoading(true);
//     const res = await API.get('/admin/dashboard');
    
//     console.log("Full API Response:", res.data);   // ← এটা খুব জরুরি
    
//     if (res.data?.success) {
//       setData({
//         stats: {
//           totalRevenue: res.data.stats?.totalSales || res.data.stats?.totalRevenue || 0,
//           totalOrders: res.data.stats?.totalOrders || 0,
//           totalCustomers: res.data.stats?.totalCustomers || res.data.stats?.totalUsers || 0,
//           totalProducts: res.data.stats?.totalProducts || 0,
//         },
//         recentOrders: res.data.recentOrders || res.data.data?.recentOrders || [],  // এখানে চেক করো
//       });
//     } else {
//       console.error("API success false:", res.data);
//     }
//   } catch (err) {
//     console.error("Dashboard fetch error:", err);
//     // এখানে toast বা error state দেখাতে পারো
//   } finally {
//     setLoading(false);
//   }
// };

const fetchStats = async () => {
  try {
    setLoading(true);
    const res = await API.get('/admin/dashboard');
    
    console.log("✅ Dashboard Response:", JSON.stringify(res.data, null, 2));

    const apiData = res.data || {};
    
    setData({
      // stats: {
      //   totalRevenue: apiData.stats?.totalSales || apiData.stats?.totalRevenue || 0,
      //   totalOrders: apiData.stats?.totalOrders || apiData.totalOrders || 0,
      //   totalCustomers: apiData.stats?.totalCustomers || apiData.totalUsers || 0,
      //   totalProducts: apiData.stats?.totalProducts || 0,
      // },
      stats: {
        totalRevenue:   apiData.stats?.totalSales   || 0,
        totalOrders:    apiData.stats?.totalOrders  || 0,
        totalCustomers: apiData.stats?.totalCustomers || 0,
        totalProducts:  apiData.stats?.totalProducts || 0,
      },
      recentOrders: apiData.recentOrders || apiData.data?.recentOrders || []
    });
  } catch (err: any) {
    console.error("❌ Dashboard Error:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};

// Stats Cards Definition
const statsCards = [
  { 
    title: "Total Revenue", 
    value: `৳${(data.stats.totalRevenue || 0).toLocaleString()}`, 
    change: "+12.5%", 
    icon: DollarSign, 
    color: "text-emerald-600 dark:text-emerald-400", 
    bg: "bg-emerald-100 dark:bg-emerald-500/10", 
    border: "border-emerald-200 dark:border-emerald-500/20",
    route: "/admin/analytics"          // Revenue/Analysis page
  },
  { 
    title: "Total Orders",   
    value: (data.stats.totalOrders || 0).toLocaleString(), 
    change: "+8.2%", 
    icon: ShoppingCart, 
    color: "text-blue-600 dark:text-blue-400", 
    bg: "bg-blue-100 dark:bg-blue-500/10", 
    border: "border-blue-200 dark:border-blue-500/20",
    route: "/admin/orders"            // All Orders page
  },
  { 
    title: "Total Customers",
    value: (data.stats.totalCustomers || 0).toLocaleString(), 
    change: "+5.1%", 
    icon: Users, 
    color: "text-violet-600 dark:text-violet-400", 
    bg: "bg-violet-100 dark:bg-violet-500/10", 
    border: "border-violet-200 dark:border-violet-500/20",
    route: "/admin/customers"         // All Customers page
  },
  { 
    title: "Total Products", 
    value: (data.stats.totalProducts || 0).toLocaleString(), 
    change: "-2.4%", 
    icon: Package, 
    color: "text-amber-600 dark:text-amber-400", 
    bg: "bg-amber-100 dark:bg-amber-500/10", 
    border: "border-amber-200 dark:border-amber-500/20",
    route: "/admin/products"          // All Products page
  },
];

  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return data.recentOrders || [];
    const q = searchQuery.toLowerCase();
    return (data.recentOrders || []).filter((order: any) =>
      order._id?.toLowerCase().includes(q) ||
      order.user?.name?.toLowerCase().includes(q) ||
      order.user?.email?.toLowerCase().includes(q) ||
      order.status?.toLowerCase().includes(q)
    );
  }, [searchQuery, data.recentOrders]);

  const columns = [
    { 
      key: "_id", 
      label: "Order ID",
      render: (id: string) => (
        <span className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200">
          #{id?.slice(-8).toUpperCase()}
        </span>
      )
    },
    { 
      key: "user", 
      label: "Customer",
      render: (userData: any) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 dark:text-white text-base">
            {userData?.name || userData?.fullName || "Guest User"}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {userData?.email || "No email provided"}
          </span>
        </div>
      )
    },
    { 
      key: "totalAmount", 
      label: "Amount",
      render: (amount: number) => (
        <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">
          ৳{(amount || 0).toLocaleString()}
        </span>
      )
    },
    { 
      key: "status", 
      label: "Status",
      render: (status: string) => {
        const styles: any = {
          delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30",
          pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30",
          shipped: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30",
          processing: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30",
          cancelled: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-500/30",
        };
        return (
          <span className={`px-5 py-2 text-xs font-bold rounded-2xl uppercase tracking-widest border ${styles[status?.toLowerCase()] || "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}>
            {status || "Pending"}
          </span>
        );
      }
    },
    { 
      key: "createdAt", 
      label: "Date",
      render: (date: string) => date 
        ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) 
        : 'N/A'
    },
  ];

  if (authLoading || isChecking || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-blue-600 dark:text-blue-500" size={60} />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Syncing Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 px-4 py-8 max-w-[1600px] mx-auto space-y-10">

      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
            Welcome, <span className="text-blue-600 dark:text-blue-400">{user?.name?.split(' ')[0] || "Admin"}</span>
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400 flex items-center gap-2 text-base">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            System Live • Real-time Database Statistics
          </p>
        </div>

        <div className="relative w-full max-w-lg">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input
            placeholder="Search Order ID, Customer Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-14 h-14 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-3xl focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} onClick={() => router.push(stat.route)} className={`group bg-white dark:bg-white/5 backdrop-blur-xl border ${stat.border} rounded-3xl p-8 shadow-sm dark:shadow-2xl transition-all hover:scale-[1.02]`}>
              <div className="flex justify-between items-start">
                <div className={`p-4 rounded-2xl ${stat.bg}`}>
                  <Icon className={stat.color} size={32} />
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1">
                    {stat.title}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-2">
                <span className={`flex items-center text-sm font-bold ${stat.color}`}>
                  <TrendingUp size={18} className="mr-1" /> {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-slate-200 dark:border-white/10 p-8 md:p-10 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
              <span className="w-9 h-[3px] bg-gradient-to-r from-blue-600 to-violet-600 rounded" />
              Recent Transactions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Fetching live entries from MongoDB</p>
          </div>

          <button 
            onClick={() => router.push('/admin/orders')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95"
          >
            Explore All Orders <ArrowRight size={20} />
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden">
          {filteredOrders.length > 0 ? (
            <DataTable data={filteredOrders} columns={columns} />
          ) : (
            <div className="py-20 text-center">
              <Package className="mx-auto text-slate-400 mb-4" size={64} />
              <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">No transactions recorded yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
