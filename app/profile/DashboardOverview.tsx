"use client";
import { ShoppingBag, ArrowRight, Star, Tag,Bell } from "lucide-react";
import { motion } from "framer-motion";

export { default } from "./dashboard-overview-dynamic";

function DashboardOverviewLegacy({ setActiveTab }: { setActiveTab: (id: string) => void }) {
  return (
    <div className="space-y-8">
      {/* ১. প্রোমো ব্যানার (ই-কমার্সের জন্য মাস্ট) */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden p-8 rounded-[2.5rem] bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Exclusive Offer! ⚡</h3>
            <p className="text-white/80 text-sm font-bold mt-1">Get 20% Cashback on your next electronic purchase.</p>
          </div>
          <button className="px-8 py-3 bg-white text-indigo-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl">
            Claim Now
          </button>
        </div>
        {/* Background Decor */}
        <Tag className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
      </motion.div>

      {/* ২. সাম্প্রতিক অর্ডার (Recent Order Overview) */}
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

        {/* অর্ডার কার্ড */}
        <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white/5 rounded-[2rem] border border-white/5 group hover:bg-white/[0.08] transition-all">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10">
               <ShoppingBag className="text-slate-500" /> {/* এখানে প্রোডাক্ট ইমেজ হবে */}
            </div>
            <div>
              <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1">Order #PS-9921</p>
              <h5 className="font-bold text-white text-lg">Wireless Headphone X1</h5>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Status: <span className="text-amber-500">Processing</span></p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-right">
             <p className="text-xl font-black text-white">$৩,৫০০</p>
             <button className="mt-2 px-6 py-2 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Track Order
             </button>
          </div>
        </div>
      </div>

      {/* ৩. ছোট উইশলিস্ট প্রিভিউ বা টিপস */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] flex items-center gap-4">
            <div className="p-3 bg-emerald-500 text-white rounded-xl">
               <Star size={20} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase text-emerald-500">Elite Member</p>
               <p className="text-xs font-bold text-white/70">You are in the top 5% of our shoppers!</p>
            </div>
         </div>
         <div className="p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-[2.5rem] flex items-center gap-4">
            <div className="p-3 bg-indigo-500 text-white rounded-xl">
               <Bell size={20} />
            </div>
            <div>
               <p className="text-[10px] font-black uppercase text-indigo-500">New Updates</p>
               <p className="text-xs font-bold text-white/70">Check your notifications for 3 new deals.</p>
            </div>
         </div>
      </div>
    </div>
  );
}

// "use client";
// import React from 'react';
// import { 
//   AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid 
// } from "recharts";
// import { TrendingUp, ShoppingBag, ArrowRight, Star, Zap } from "lucide-react";
// import { motion } from "framer-motion";

// // ডামি চার্ট ডাটা
// const data = [
//   { name: 'Jan', total: 4000 },
//   { name: 'Feb', total: 3000 },
//   { name: 'Mar', total: 5000 },
//   { name: 'Apr', total: 4500 },
// ];

// export default function DashboardOverview({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
      
//       {/* ১. এনালাইটিক্স চার্ট সেকশন */}
//       <div className="p-6 md:p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] backdrop-blur-3xl">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
//           <div>
//             <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
//               <TrendingUp className="text-indigo-500" /> Spending Insights
//             </h3>
//             <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Visualization of your purchase history</p>
//           </div>
//           <button 
//             onClick={() => setActiveTab("My Orders")}
//             className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors"
//           >
//             View Full History <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>

//         {/* চার্ট এরিয়া */}
//         <div className="h-[250px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={data}>
//               <defs>
//                 <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
//                   <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
//               <XAxis 
//                 dataKey="name" 
//                 axisLine={false} 
//                 tickLine={false} 
//                 tick={{fill: '#475569', fontSize: 10, fontWeight: 'bold'}} 
//               />
//               <Tooltip 
//                 contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px', fontSize: '12px' }}
//                 itemStyle={{ color: '#6366f1', fontWeight: 'bold' }}
//               />
//               <Area type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* ২. সেকেন্ডারি ইনফো কার্ডস (Responsive) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* বেনিফিট কার্ড */}
//         <div className="p-8 bg-gradient-to-br from-indigo-600/20 to-transparent border border-indigo-500/20 rounded-[2.5rem] relative overflow-hidden group">
//           <Zap className="absolute -right-4 -bottom-4 text-indigo-500/10 group-hover:scale-125 transition-transform duration-700" size={120} />
//           <h4 className="text-lg font-black text-white uppercase italic mb-2">Premium Member</h4>
//           <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">You are enjoying free shipping on all orders this month as a premium customer.</p>
//           <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
//             <Star size={12} fill="currentColor" /> Active Benefits
//           </div>
//         </div>

//         {/* কুইক অ্যাকশন কার্ড */}
//         <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] flex flex-col justify-center items-center text-center">
//           <ShoppingBag className="text-slate-700 mb-4" size={40} />
//           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Ready for more?</p>
//           <h4 className="text-lg font-black text-white uppercase italic">Continue Shopping</h4>
//           <button className="mt-4 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">
//             Browse Store
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
