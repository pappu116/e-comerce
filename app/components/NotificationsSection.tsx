
"use client";
import { useState } from "react";
import { 
  BellRing, Truck, Tag, CreditCard, ShoppingBag, 
  Mail, MessageSquare, Monitor, Bell, CheckCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationsSection() {
  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    push: true
  });

  const notifications = [
    { 
      title: "Order Shipped!", 
      desc: "Your package #PREM-10241 is on its way via Pathao Express.", 
      icon: Truck, 
      color: "text-blue-400 bg-blue-400/10 border-blue-400/20", 
      time: "2h ago" 
    },
    { 
      title: "Flash Sale Alert!", 
      desc: "Get 50% extra discount on your next purchase using code: NEXT50.", 
      icon: Tag, 
      color: "text-pink-400 bg-pink-400/10 border-pink-400/20", 
      time: "5h ago" 
    },
    { 
      title: "Payment Successful", 
      desc: "We have received your payment of $1250 for order #PREM-10245.", 
      icon: CreditCard, 
      color: "text-green-400 bg-green-400/10 border-green-400/20", 
      time: "1d ago" 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-8 md:space-y-12 px-1 sm:px-0"
    >
      {/* --- ১. নোটিফিকেশন প্রিফারেন্স --- */}
      <section className="space-y-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-3 italic uppercase">
             <Bell className="text-indigo-500 shrink-0" size={24} /> Notifications
          </h3>
          <p className="text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Manage your alerts</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {[
            { id: "email", label: "Email Alerts", icon: Mail, key: "email" },
            { id: "sms", label: "SMS Alerts", icon: MessageSquare, key: "sms" },
            { id: "push", label: "Push Notify", icon: Monitor, key: "push" },
          ].map((item) => (
            <div 
              key={item.id}
              className="p-5 md:p-6 bg-white/[0.03] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-between hover:bg-white/[0.06] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
                    <item.icon size={18} />
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-200">{item.label}</span>
              </div>
              
              <button 
                onClick={() => setSettings({...settings, [item.key]: !settings[item.key as keyof typeof settings]})}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 relative ${settings[item.key as keyof typeof settings] ? 'bg-indigo-600' : 'bg-slate-800'}`}
              >
                <motion.div 
                  animate={{ x: settings[item.key as keyof typeof settings] ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-4 h-4 bg-white rounded-full shadow-lg"
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* --- ২. রিসেন্ট নোটিফিকেশন লিস্ট --- */}
      <section className="space-y-6">
        <div className="flex items-end justify-between px-1">
          <div className="space-y-1">
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-white italic uppercase">Recent Activity</h3>
            <div className="h-1 w-12 bg-indigo-600 rounded-full" />
          </div>
          <button className="text-[9px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2">
            <CheckCircle size={12} /> Mark read
          </button>
        </div>
        
        <div className="grid gap-3 md:gap-4">
          {notifications.map((n, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 4 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 p-5 md:p-6 bg-white/[0.02] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] hover:bg-white/[0.05] transition-all cursor-pointer group relative overflow-hidden"
            >
               {/* Unread Indicator Side Light */}
               <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
               
               <div className={`p-4 rounded-2xl shrink-0 h-fit w-fit border ${n.color} transition-transform group-hover:rotate-6`}>
                  <n.icon size={22} className="md:w-6 md:h-6" />
               </div>
               
               <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-black text-base md:text-lg text-slate-100 group-hover:text-indigo-400 transition-colors leading-tight">
                      {n.title}
                    </h4>
                    <span className="text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-widest whitespace-nowrap bg-white/5 px-2 md:px-3 py-1 rounded-full border border-white/5">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed md:max-w-xl">
                    {n.desc}
                  </p>
               </div>

               {/* Mobile Unread Dot */}
               <div className="hidden sm:block w-2 h-2 bg-indigo-500 rounded-full mt-2 shadow-[0_0_10px_rgba(99,102,241,0.8)] shrink-0 self-center" />
            </motion.div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="py-16 md:py-24 bg-white/[0.02] border border-dashed border-white/10 rounded-[2.5rem] md:rounded-[3rem] text-center">
              <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-700">
                <BellRing size={32} />
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Inbox is empty</p>
          </div>
        )}
      </section>
    </motion.div>
  );
}