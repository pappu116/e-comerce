"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Gift, Zap, ShoppingBag, ArrowRight, Trophy, Sparkles } from "lucide-react";
import { useState } from "react";

export default function RewardRedeem() {
  const [points] = useState(450); // আপনার বর্তমান পয়েন্ট
  const [isHovered, setIsHovered] = useState(false);

  const rewards = [
    { id: 1, title: "৳500 Discount", cost: 1000, icon: Gift, color: "text-blue-400", bg: "bg-blue-500/10" },
    { id: 2, title: "Free Shipping", cost: 500, icon: ShoppingBag, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { id: 3, title: "Premium Bag", cost: 2500, icon: Trophy, color: "text-amber-400", bg: "bg-amber-500/10" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      {/* ১. মেইন পয়েন্ট কার্ড (Circular Progress Style) */}
      <div 
        className="p-10 bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden relative flex flex-col items-center justify-center text-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/20 blur-[100px] pointer-events-none" />

        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* এনিমেটেড বর্ডার সার্কেল */}
          <svg className="absolute w-full h-full rotate-[-90deg]">
            <circle cx="96" cy="96" r="88" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
            <motion.circle 
              cx="96" cy="96" r="88" 
              stroke="#6366f1" 
              strokeWidth="12" 
              strokeLinecap="round" 
              fill="none"
              strokeDasharray="552.92"
              initial={{ strokeDashoffset: 552.92 }}
              animate={{ strokeDashoffset: 552.92 - (552.92 * (points / 5000)) }} // ৫০০০ পয়েন্ট টার্গেট ধরে
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>

          {/* পয়েন্ট টেক্সট */}
          <div className="text-center z-10">
            <motion.div
              animate={isHovered ? { scale: 1.1, rotate: [0, 10, -10, 0] } : {}}
              className="flex justify-center mb-1"
            >
              <Star size={32} className="text-amber-400 fill-amber-400" />
            </motion.div>
            <h2 className="text-5xl font-black text-white italic leading-none">{points}</h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Total Points</p>
          </div>
        </div>

        <div className="mt-8">
           <p className="text-xs font-bold text-indigo-400 italic">You need {500 - points} more to unlock Free Shipping!</p>
        </div>
      </div>

      {/* ২. এভেইলএবল রিওয়ার্ডস (Available Rewards) */}
      <div className="space-y-4">
        <h4 className="px-4 text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] flex items-center gap-2">
          <Zap size={14} className="text-amber-400" /> Unlockable Rewards
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <motion.div 
              key={reward.id}
              whileHover={{ y: -5 }}
              className="p-6 bg-white/[0.03] border border-white/5 rounded-[2.5rem] relative overflow-hidden group"
            >
              <div className={`w-12 h-12 ${reward.bg} ${reward.color} rounded-2xl flex items-center justify-center mb-4 border border-white/5 shadow-inner`}>
                <reward.icon size={22} />
              </div>
              <h5 className="text-sm font-black text-white uppercase italic">{reward.title}</h5>
              <div className="flex items-center justify-between mt-4">
                <span className="text-[10px] font-bold text-slate-500">{reward.cost} pts</span>
                <button className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${
                  points >= reward.cost ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-600 cursor-not-allowed'
                }`}>
                  {points >= reward.cost ? 'Redeem' : 'Locked'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ৩. পয়েন্ট আর্ন করার টিপস (Earn More) */}
      <div className="p-6 bg-gradient-to-r from-indigo-600/20 to-transparent border border-indigo-500/20 rounded-[2rem] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white">
            <Sparkles size={20} />
          </div>
          <div>
            <h6 className="text-xs font-black text-white uppercase italic">Share & Earn</h6>
            <p className="text-[9px] text-slate-400 font-bold">Invite friends and get 100 points per refer!</p>
          </div>
        </div>
        <ArrowRight size={20} className="text-indigo-400" />
      </div>
    </motion.div>
  );
}

