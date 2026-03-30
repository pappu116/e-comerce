'use client';

import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  Search,
  X
} from 'lucide-react';
import { Input } from "@/components/ui/input"; 
import DataTable from './components/DataTable';

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      title: "Total Revenue",
      value: "৳1,24,590",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/30"
    },
    {
      title: "Total Orders",
      value: "842",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "Total Customers",
      value: "1,245",
      change: "+5.1%",
      icon: Users,
      color: "text-violet-600",
      bg: "bg-violet-100 dark:bg-violet-900/30"
    },
    {
      title: "Total Products",
      value: "368",
      change: "-2.4%",
      icon: Package,
      color: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-900/30"
    },
  ];

  const recentOrders = [
    { id: "ORD-7842", customer: "Rahim Khan", product: "Sony WH-1000XM5", amount: "৳29,900", status: "Delivered", date: "Mar 29, 2026" },
    { id: "ORD-7841", customer: "Sabrina Ahmed", product: "MacBook Air M3", amount: "৳1,45,000", status: "Processing", date: "Mar 29, 2026" },
    { id: "ORD-7840", customer: "Tamim Iqbal", product: "iPhone 16 Pro", amount: "৳1,25,000", status: "Shipped", date: "Mar 28, 2026" },
    { id: "ORD-7839", customer: "Nadia Islam", product: "Samsung Galaxy Watch 7", amount: "৳18,500", status: "Delivered", date: "Mar 28, 2026" },
  ];

  // Search Filter Logic
  const filteredOrders = useMemo(() => {
    return recentOrders.filter((order) => 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const columns = [
    { key: "id", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "product", label: "Product" },
    { key: "amount", label: "Amount" },
    { 
      key: "status", 
      label: "Status",
      render: (status: string) => {
        const statusStyles: any = {
          Delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
          Processing: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
          Shipped: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
        };
        return (
          <span className={`px-3 py-1 text-[11px] font-bold rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>
            {status}
          </span>
        );
      }
    },
    { key: "date", label: "Date" },
  ];

  return (
    <div className="space-y-6 md:space-y-10 max-w-[1600px] mx-auto px-2 md:px-0">
      
      {/* Header Section: Responsive Flex */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
            Welcome back, CPA
          </h1>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium">
            Here's what's happening with your store today.
          </p>
        </div>

        {/* Global Search Bar: Full width on mobile, 450px on desktop */}
        <div className="relative w-full xl:w-[450px] group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            <Search size={20} />
          </div>
          <Input 
            placeholder="Search Order ID, Customer..." 
            className="pl-12 h-14 w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500 transition-all text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-end -mt-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md">
          March 30, 2026
        </span>
      </div>

      {/* Stats Cards: Responsive Grid (1 column on mobile, 2 on tablet, 4 on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 md:p-4 rounded-2xl ${stat.bg}`}>
                  <Icon className={stat.color} size={28} />
                </div>
                <div className="text-right">
                  <p className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    {stat.title}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <span className="flex items-center text-[11px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded-lg">
                  <TrendingUp size={14} className="mr-1" />
                  {stat.change}
                </span>
                <span className="text-[10px] font-medium text-gray-400">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-4 md:p-8 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight">Recent Orders</h2>
            <p className="text-xs md:text-sm text-gray-500 font-medium">Manage and track recent customer transactions</p>
          </div>
          <a 
            href="/admin/orders" 
            className="w-fit text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30 px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-xs transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-900"
          >
            View All <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto rounded-xl">
          <DataTable 
            data={filteredOrders}
            columns={columns}
            onEdit={(row) => console.log("Editing:", row.id)}
            onDelete={(row) => console.log("Deleting:", row.id)}
          />
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/20 rounded-3xl mt-4 border-2 border-dashed border-gray-100 dark:border-gray-800">
            <Search className="mx-auto h-10 w-10 text-gray-300 mb-4" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">No results found</h3>
            <p className="text-xs text-gray-500 mt-1">Try searching for a different ID or customer name.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-xs font-bold text-blue-600 underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}