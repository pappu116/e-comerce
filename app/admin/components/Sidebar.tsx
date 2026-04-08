'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Settings, X, 
  BarChart3, ShieldCheck, Mail, CreditCard, 
  Smartphone, Database, LogOut
} from 'lucide-react';
import { orderService } from '@/app/lib/api'; 
import { useAuth } from '@/app/store/useAuth'; // ✅ Zustand Store ইমপোর্ট করুন

// ১. মেনু স্ট্রাকচার
const menuGroups = [
  {
    group: "Overview",
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    ]
  },
  {
    group: "Management",
    items: [
      { href: '/admin/products', label: 'Products', icon: Package },
      { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, badgeKey: "orderCount" },
      { href: '/admin/customers', label: 'Customers', icon: Users },
    ]
  },
  {
    group: "Finance & Security",
    items: [
      { href: '/admin/payments', label: 'Payments', icon: CreditCard },
      { href: '/admin/devices', label: 'Device Tracking', icon: Smartphone },
      { href: '/admin/security', label: 'Security', icon: ShieldCheck },
    ]
  },
  {
    group: "System Control",
    items: [
      { href: '/admin/logs', label: 'System Logs', icon: Database },
      { href: '/admin/settings', label: 'Settings', icon: Settings },
      { href: '/admin/messages', label: 'Messages', icon: Mail, badgeKey: "unreadMsgs" },
    ]
  }
];

export default function Sidebar({ 
  isMobileOpen, 
  setIsMobileOpen 
}: { 
  isMobileOpen: boolean; 
  setIsMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  // ✅ Zustand থেকে ইউজার এবং লগআউট ফাংশন নিন
  const { user: adminUser, logout, isHydrated } = useAuth();

  const [dynamicStats, setDynamicStats] = useState({
    orderCount: 0,
    unreadMsgs: 3, // ডামি ডাটা
    serverLoad: 0
  });

  // ২. লগআউট হ্যান্ডলার
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await logout();
      router.push('/login');
    }
  };

  // ৩. ডাইনামিক ডাটা ফেচিং
  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const orderRes = await orderService.getAll();
        // API response structure অনুযায়ী count সেট করুন
        const count = orderRes?.data?.length || orderRes?.orders?.length || 0;

        setDynamicStats(prev => ({
          ...prev,
          orderCount: count,
          serverLoad: Math.floor(Math.random() * (40 - 20) + 20)
        }));
      } catch (error) {
        console.error("Sidebar stats error:", error);
      }
    };

    if (isHydrated) fetchSidebarData();
  }, [isHydrated]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-md" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}

      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#090a0f] border-r border-slate-100 dark:border-slate-900 transform transition-all duration-500 flex flex-col ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* LOGO SECTION */}
        <div className="p-8 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-blue-600 rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="text-white font-black text-2xl tracking-tighter">A</span>
            </div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">
              Admin<span className="text-blue-600">Pro</span>
            </h1>
          </Link>
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-slate-400 p-2 rounded-xl">
            <X size={20} />
          </button>
        </div>

        {/* NAVIGATION CONTENT */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-9 scrollbar-hide">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400/80 px-4">
                {group.group}
              </h3>
              
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  // @ts-ignore
                  const badgeValue = item.badgeKey ? dynamicStats[item.badgeKey] : 0;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`group relative flex items-center justify-between px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/25' 
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-blue-600/5 hover:text-blue-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon size={18} className={isActive ? "text-white" : "opacity-70 group-hover:scale-110 transition-transform"} />
                        {item.label}
                      </div>
                      
                      {badgeValue > 0 && (
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black ${isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600 dark:bg-blue-500/10'}`}>
                          {badgeValue}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* SERVER HEALTH */}
        <div className="px-6 mb-6">
          <div className="p-5 bg-slate-50 dark:bg-slate-900/40 rounded-[2rem] border border-slate-100 dark:border-slate-800/50">
            <div className="flex justify-between items-center mb-3 text-[9px] font-black uppercase tracking-tighter">
                <span className="text-slate-400">System Load</span>
                <span className="text-emerald-500">{dynamicStats.serverLoad}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-1000" 
                style={{ width: `${dynamicStats.serverLoad}%` }}
              />
            </div>
          </div>
        </div>

        {/* ✅ DYNAMIC USER PROFILE */}
        <div className="p-5 border-t dark:border-slate-900 bg-slate-50/50 dark:bg-black/20">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-500/20">
                {adminUser?.name?.slice(0, 2).toUpperCase() || 'AD'}
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-[11px] font-black text-slate-900 dark:text-white truncate uppercase">
                    {adminUser?.name || 'Loading...'}
                </p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">
                    {adminUser?.role || 'Administrator'}
                </p>
              </div>
            </div>
            {/* ✅ Logout Button Connected */}
            <button 
              onClick={handleLogout}
              className="p-3 cursor-pointer text-slate-400 hover:text-rose-500 transition-colors"
            >
                <LogOut size={18} />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}