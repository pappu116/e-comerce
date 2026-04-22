

"use client";
import { motion } from "framer-motion";
import { Truck, MapPin, Package } from "lucide-react";

export default function ProcessingOrders() {
  // লোকেশন ডাটা (আপনি চাইলে ডাইনামিক করতে পারেন)
  const currentCity = "Dhaka Warehouse";
  const origin = "Chittagong Port";
  const destination = "Your Home (Sylhet)";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* মেইন অ্যানিমেশন কার্ড */}
      <div className="p-10 bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden relative min-h-[400px] flex flex-col items-center justify-between">
        
        {/* উপরের টেক্সট */}
        <div className="text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Live: In Transit</p>
          </div>
          <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">Current: {currentCity}</h4>
        </div>

        {/* --- বাঁকা রাস্তা এবং ট্রাক অ্যানিমেশন --- */}
        <div className="relative w-full h-48 flex items-center justify-center">
          {/* বাঁকা সবুজ রাস্তা (SVG Path) */}
          <svg className="absolute w-full h-full" viewBox="0 0 500 200" fill="none">
            <motion.path
              d="M0 100 Q 125 20, 250 100 T 500 100" // বাঁকা রাস্তার পাথ
              stroke="#10b981" // সবুজ কালার
              strokeWidth="4"
              strokeDasharray="10 10" // ড্যাশ ইফেক্ট
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </svg>

          {/* পেছনের লোকেশন (Origin) */}
          <motion.div 
            animate={{ x: [-50, -250], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute left-1/4 flex flex-col items-center"
          >
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
               <Package size={16} className="text-slate-500" />
            </div>
            <span className="text-[8px] font-bold text-slate-600 uppercase mt-2">{origin}</span>
          </motion.div>

          {/* ট্রাক (মাঝখানে স্থির কিন্তু লাফাবে) */}
          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="relative z-20 flex flex-col items-center"
          >
            <div className="bg-[#020617] p-4 rounded-3xl border-2 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <div className="relative">
                <Truck size={40} className="text-emerald-500" />
                {/* ঘুরন্ত চাকা */}
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }} className="absolute -bottom-1 left-1 w-2.5 h-2.5 bg-[#020617] border-2 border-emerald-400 rounded-full" />
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }} className="absolute -bottom-1 right-1 w-2.5 h-2.5 bg-[#020617] border-2 border-emerald-400 rounded-full" />
              </div>
            </div>
            {/* লোকেশন পিন */}
            <div className="mt-2 px-3 py-1 bg-emerald-500 text-[#020617] rounded-full text-[9px] font-black uppercase italic">
              Near Dhaka
            </div>
          </motion.div>

          {/* সামনের লোকেশন (Destination) */}
          <motion.div 
            animate={{ x: [250, 50], opacity: [0, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute right-1/4 flex flex-col items-center"
          >
            <MapPin size={24} className="text-emerald-500 animate-bounce" />
            <span className="text-[8px] font-bold text-slate-400 uppercase mt-2 tracking-widest">{destination}</span>
          </motion.div>
        </div>

        {/* নিচের ডিটেইলস কার্ড */}
        <div className="w-full grid grid-cols-2 gap-4 mt-8">
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Last Update</p>
            <p className="text-xs font-bold text-white italic">Scanned at Hub • 2:30 PM</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Next Stop</p>
            <p className="text-xs font-bold text-white italic">Local Distribution</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
