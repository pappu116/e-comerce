
"use client";
import { ShoppingBag, Wallet, Truck, Star, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function QuickStats({ setActiveTab }: { setActiveTab: (id: string) => void }) {
  const stats = [
    { 
      id: "orders", 
      label: "Total Orders", 
      value: "12", 
      icon: ShoppingBag, 
      color: "text-blue-400", 
      bg: "bg-blue-500/10", 
      border: "border-blue-500/20",
      description: "View history"
    },
    { 
      id: "wallet",
      label: "Wallet Balance", 
      value: "৳2,450", 
      icon: Wallet, 
      color: "text-emerald-400", 
      bg: "bg-emerald-500/10", 
      border: "border-emerald-500/20",
      description: "Manage funds"
    },
    { 
      // এখানে ID পরিবর্তন করে 'processing' করা হলো
      id: "processing", 
      label: "Processing", 
      value: "02", 
      icon: Truck, 
      color: "text-amber-400", 
      bg: "bg-amber-500/10", 
      border: "border-amber-500/20",
      description: "Track status"
    },
    { 
      id: "rewards",
      label: "Reward Points", 
      value: "450", 
      icon: Star, 
      color: "text-purple-400", 
      bg: "bg-purple-500/10", 
      border: "border-purple-500/20",
      description: "Redeem now"
    },
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, i) => (
        <button 
          key={i} 
          onClick={() => setActiveTab(stat.id)} 
          className="block w-full text-left group"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative p-6 bg-white/[0.02] border border-white/10 rounded-[2.5rem] backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-300 overflow-hidden h-full flex flex-col justify-between"
          >
            {/* Glow effect on hover */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${stat.bg}`} />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center border ${stat.border} shadow-inner`}>
                  <stat.icon size={24} />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-white/40">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1.5 group-hover:text-white/60 transition-colors">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                    {stat.value}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-600 group-hover:text-indigo-400 transition-colors">
                    {stat.description}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom animated border */}
            <div className={`absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-transparent via-current to-transparent ${stat.color}`} />
          </motion.div>
        </button>
      ))}
    </div>
  );
}