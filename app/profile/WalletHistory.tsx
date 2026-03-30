// "use client";
// import { ArrowDownLeft, ArrowUpRight, PlusCircle, History } from "lucide-react";
// import { motion } from "framer-motion";

// const transactions = [
//   { id: 1, type: "refund", label: "Order Refund", amount: "+৳৪৫০", date: "24 Mar, 2026", status: "Completed" },
//   { id: 2, type: "purchase", label: "Product Purchase", amount: "-৳১,২০০", date: "22 Mar, 2026", status: "Paid" },
//   { id: 3, type: "topup", label: "Wallet Topup", amount: "+৳২,০০০", date: "20 Mar, 2026", status: "Success" },
// ];

// export default function WalletHistory() {
//   return (
//     <motion.div 
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="p-6 md:p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] backdrop-blur-xl h-full"
//     >
//       <div className="flex justify-between items-center mb-8">
//         <div className="flex items-center gap-3">
//           <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl">
//             <History size={20} />
//           </div>
//           <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">Wallet History</h4>
//         </div>
//         <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-indigo-600/20">
//           <PlusCircle size={14} /> Add Fund
//         </button>
//       </div>
      
//       <div className="space-y-4">
//         {transactions.map((tx) => (
//           <div key={tx.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all group">
//             <div className="flex items-center gap-4">
//               <div className={`p-3 rounded-xl transition-transform group-hover:rotate-12 ${tx.type === 'purchase' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
//                 {tx.type === 'purchase' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-white leading-none mb-1">{tx.label}</p>
//                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{tx.date}</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className={`text-lg font-black ${tx.type === 'purchase' ? 'text-white' : 'text-emerald-400'}`}>{tx.amount}</p>
//               <p className={`text-[9px] font-black uppercase tracking-widest ${tx.type === 'purchase' ? 'text-slate-600' : 'text-emerald-500/60'}`}>{tx.status}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }
"use client";
import React from 'react';
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from "recharts";
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, ShoppingCart, 
  PlusCircle, History, CreditCard 
} from "lucide-react";
import { motion } from "framer-motion";

// চার্টের জন্য ডাটা (সাপ্তাহিক ব্যালেন্স ফ্লো)
const chartData = [
  { day: "Mon", amt: 1200 },
  { day: "Tue", amt: 2100 },
  { day: "Wed", amt: 1800 },
  { day: "Thu", amt: 3200 },
  { day: "Fri", amt: 2450 },
  { day: "Sat", amt: 4100 },
  { day: "Sun", amt: 3900 },
];

// ট্রানজেকশন হিস্ট্রি ডাটা
const transactions = [
  { id: 1, type: "deposit", method: "bKash", ref: "TXN-9921", amount: "+৳5,000", date: "Today, 10:30 AM" },
  { id: 2, type: "expense", method: "Order #882", ref: "Shopping", amount: "-৳1,250", date: "Yesterday" },
  { id: 3, type: "deposit", method: "Nagad", ref: "TXN-1102", amount: "+৳2,000", date: "25 Mar" },
];

export default function WalletHistory() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* ১. মেইন চার্ট কার্ড */}
      <div className="p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] backdrop-blur-3xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-10 relative z-10">
          <div>
            <h4 className="text-xl font-black uppercase italic flex items-center gap-3 text-emerald-400">
              <Wallet size={24} /> Wallet Analytics
            </h4>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Weekly Balance Insights</p>
          </div>
          <button className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all">
            <PlusCircle size={20} />
          </button>
        </div>

        <div className="h-[250px] w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="walletGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 'bold'}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area type="monotone" dataKey="amt" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#walletGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ২. ট্রানজেকশন লিস্ট */}
      <div className="space-y-4">
        <h5 className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
          <History size={14} /> Transaction History
        </h5>

        <div className="grid grid-cols-1 gap-3">
          {transactions.map((txn) => (
            <motion.div 
              key={txn.id}
              whileHover={{ x: 10 }}
              className="p-5 bg-white/[0.03] border border-white/5 rounded-[2rem] flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  txn.type === 'deposit' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {txn.type === 'deposit' ? <ArrowDownLeft size={20} /> : <ShoppingCart size={20} />}
                </div>
                <div>
                  <h6 className="text-sm font-black text-white uppercase italic">{txn.method}</h6>
                  <p className="text-[9px] font-bold text-slate-500 uppercase">{txn.ref} • {txn.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-lg font-black italic ${txn.type === 'deposit' ? 'text-emerald-500' : 'text-white'}`}>
                  {txn.amount}
                </p>
                <p className="text-[8px] font-black uppercase tracking-widest text-slate-600">Successful</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}