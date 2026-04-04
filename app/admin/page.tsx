'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  DollarSign, ShoppingCart, Users, Package, 
  TrendingUp, Search, X, Loader2 
} from 'lucide-react';
import { Input } from "@/components/ui/input"; 
import DataTable from './components/DataTable';
import API from '@/app/lib/api'; 

export default function AdminDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [data, setData] = useState<any>({
    stats: {
      totalRevenue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalProducts: 0
    },
    recentOrders: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Requesting data from Backend (Port 5000 via api.ts)
        const response = await API.get('/admin/dashboard'); 
        
        if (response.data && response.data.success) {
          setData({
            stats: {
                totalRevenue: response.data.stats?.totalSales || response.data.stats?.totalRevenue || 0,
                totalOrders: response.data.stats?.totalOrders || 0,
                totalCustomers: response.data.stats?.totalUsers || response.data.stats?.totalCustomers || 0,
                totalProducts: response.data.stats?.totalProducts || 0
            },
            recentOrders: response.data.recentOrders || []
          });
        }
      } catch (error: any) {
        // Jodi backend bondho thake ba IP mile na, tobe eikhane error show korbe
        console.error("Dashboard Fetch Error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: "Total Revenue",
      value: `৳${(data.stats.totalRevenue || 0).toLocaleString()}`,
      change: "+12.5%", 
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/30"
    },
    {
      title: "Total Orders",
      value: data.stats.totalOrders || 0,
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "Total Customers",
      value: data.stats.totalCustomers || 0,
      change: "+5.1%",
      icon: Users,
      color: "text-violet-600",
      bg: "bg-violet-100 dark:bg-violet-900/30"
    },
    {
      title: "Total Products",
      value: data.stats.totalProducts || 0,
      change: "-2.4%",
      icon: Package,
      color: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-900/30"
    },
  ];

  const filteredOrders = useMemo(() => {
    const orders = data.recentOrders || [];
    return orders.filter((order: any) => 
      order._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, data.recentOrders]);

  const columns = [
    { key: "_id", label: "Order ID" },
    { 
      key: "user", 
      label: "Customer",
      render: (user: any) => user?.name || 'Guest'
    },
    { 
      key: "totalAmount", 
      label: "Amount",
      render: (amount: number) => <span className="font-bold text-slate-900 dark:text-white">৳{(amount || 0).toLocaleString()}</span>
    },
    { 
      key: "status", 
      label: "Status",
      render: (status: string) => {
        const style: any = {
          delivered: "bg-emerald-100 text-emerald-700",
          pending: "bg-amber-100 text-amber-700",
          shipped: "bg-blue-100 text-blue-700",
          processing: "bg-indigo-100 text-indigo-700",
          cancelled: "bg-red-100 text-red-700",
        };
        return (
          <span className={`px-3 py-1 text-[10px] font-black rounded-xl uppercase tracking-widest ${style[status?.toLowerCase()] || 'bg-gray-100 text-gray-700'}`}>
            {status || 'Unknown'}
          </span>
        );
      }
    },
    { 
      key: "createdAt", 
      label: "Date",
      render: (date: string) => date ? new Date(date).toLocaleDateString('en-GB') : 'N/A'
    },
  ];

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-black">
        <Loader2 className="animate-spin text-blue-600" size={48} />
        <p className="text-sm font-black uppercase tracking-widest text-slate-400 animate-pulse font-mono">Syncing Database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-10 max-w-[1600px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
            Welcome back, Abdur Rahman
          </h1>
          <p className="text-sm md:text-base text-gray-500 font-medium font-mono">
            / Dashboard / Statistics / Live Data
          </p>
        </div>

        <div className="relative w-full xl:w-[450px] group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Search size={20} />
          </div>
          <Input 
            placeholder="Quick find orders..." 
            className="pl-12 h-14 w-full bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500/20 text-sm font-bold"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-900/40 backdrop-blur-xl rounded-[2rem] p-6 border border-white/20 dark:border-gray-800 shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className={`p-4 rounded-2xl ${stat.bg}`}>
                  <Icon className={stat.color} size={28} />
                </div>
                <div className="text-right">
                  <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                    {stat.title}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <span className="flex items-center text-[11px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-lg">
                  <TrendingUp size={14} className="mr-1" />
                  {stat.change}
                </span>
                <span className="text-[10px] font-bold text-gray-400">Analysis</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 dark:border-gray-800 p-4 md:p-8 shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase italic text-blue-600">Recent Transactions</h2>
            <p className="text-xs md:text-sm text-gray-500 font-medium font-mono">Live feed of store orders</p>
          </div>
          <button 
            onClick={() => router.push('/admin/orders')}
            className="w-fit bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-blue-500/30 active:scale-95"
          >
            View All Database <span className="ml-1">→</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl">
          <DataTable data={filteredOrders} columns={columns} />
        </div>
      </div>
    </div>
  );
}