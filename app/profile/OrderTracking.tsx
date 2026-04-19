"use client";
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, 
  AreaChart, Area 
} from "recharts";
import { 
  ShoppingBag, TrendingUp, Package, CheckCircle2, 
  ArrowRight, Calendar, CreditCard, DollarSign 
} from "lucide-react";
import { motion } from "framer-motion";

// চার্টের জন্য ডাটা
const analyticsData = [
  { month: "Jan", spend: 4500 },
  { month: "Feb", spend: 3200 },
  { month: "Mar", spend: 5800 },
  { month: "Apr", spend: 4100 },
];

export default function OrderTracking() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-6"
    >
      {/* Top Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Successful Orders", val: "48", icon: CheckCircle2, color: "text-emerald-500" },
          { label: "Pending Shipments", val: "02", icon: Package, color: "text-amber-500" },
          { label: "Monthly Spends", val: "$12,450", icon: DollarSign, color: "text-indigo-500" },
          { label: "Reward Gained", val: "850", icon: TrendingUp, color: "text-purple-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/10 p-5 rounded-[2rem] flex items-center gap-4">
            <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
              <h5 className="text-xl font-black text-white italic">{stat.val}</h5>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Analytics Chart */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-xl font-black text-white uppercase italic tracking-tight">Purchase Trends</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Order value insights for last 4 months</p>
            </div>
            <div className="px-4 py-2 bg-indigo-600/10 border border-indigo-600/20 rounded-full text-[9px] font-black text-indigo-400 uppercase tracking-widest">
              Live Analytics
            </div>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#475569', fontSize: 10, fontWeight: 'bold'}} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="spend" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Order Summary Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
          <div className="relative z-10 space-y-6">
            <h4 className="text-xl font-black uppercase italic tracking-tighter">Latest Order</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-indigo-200" />
                <span className="text-xs font-bold">28 March, 2026</span>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard size={16} className="text-indigo-200" />
                <span className="text-xs font-bold italic">$1,250 - bKash Paid</span>
              </div>
              <div className="pt-4 border-t border-white/20">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-200 mb-1">Status</p>
                <p className="text-lg font-black italic uppercase">In Transit</p>
              </div>
            </div>
            <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all">
              Track Package <ArrowRight size={14} />
            </button>
          </div>
          <ShoppingBag className="absolute -right-6 -bottom-6 text-white/10 group-hover:rotate-12 transition-transform duration-700" size={150} />
        </div>
      </div>
    </motion.div>
  );
}