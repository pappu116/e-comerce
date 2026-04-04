    // 'use client';
    // import Link from 'next/link';
    // import { usePathname } from 'next/navigation';
    // import { 
    // LayoutDashboard, Package, ShoppingCart, Users, Settings, X, 
    // BarChart3, ShieldCheck, Mail, Bell, LogOut, CreditCard, ChevronRight
    // } from 'lucide-react';

    // // 1. Menu Items categorized by sections
    // const menuGroups = [
    // {
    //     group: "Overview",
    //     items: [
    //     { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    //     { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    //     ]
    // },
    // {
    //     group: "Management",
    //     items: [
    //     { href: '/admin/products', label: 'Products', icon: Package },
    //     { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, badge: "5" }, // Added Badge
    //     { href: '/admin/customers', label: 'Customers', icon: Users },
    //     ]
    // },
    // {
    //     group: "System",
    //     items: [
    //     { href: '/admin/messages', label: 'Messages', icon: Mail, badge: "New" },
    //     { href: '/admin/settings', label: 'Settings', icon: Settings },
    //     { href: '/admin/security', label: 'Security', icon: ShieldCheck },
    //     ]
    // }
    // ];

    // export default function Sidebar({ 
    // isMobileOpen, 
    // setIsMobileOpen 
    // }: { 
    // isMobileOpen: boolean; 
    // setIsMobileOpen: (open: boolean) => void;
    // }) {
    // const pathname = usePathname();

    // return (
    //     <>
    //     {/* Mobile Overlay */}
    //     {isMobileOpen && (
    //         <div 
    //         className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" 
    //         onClick={() => setIsMobileOpen(false)} 
    //         />
    //     )}

    //     <div className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#0f1117] border-r border-gray-200 dark:border-gray-800 transform transition-all duration-300 flex flex-col ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            
    //         {/* LOGO SECTION */}
    //         <div className="p-6 border-b dark:border-gray-800 flex items-center justify-between">
    //         <div className="flex items-center gap-3">
    //             <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
    //             <span className="text-white font-black text-xl">A</span>
    //             </div>
    //             <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase italic">Admin<span className="text-indigo-600">Pro</span></h1>
    //         </div>
    //         <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-gray-500 hover:bg-gray-100 p-2 rounded-xl transition-all">
    //             <X size={22} />
    //         </button>
    //         </div>

    //         {/* NAVIGATION CONTENT */}
    //         <nav className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
    //         {menuGroups.map((group, idx) => (
    //             <div key={idx} className="space-y-2">
    //             {/* Group Label */}
    //             <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
    //                 {group.group}
    //             </h3>
                
    //             <div className="space-y-1">
    //                 {group.items.map((item) => {
    //                 const Icon = item.icon;
    //                 const isActive = pathname === item.href;

    //                 return (
    //                     <Link
    //                     key={item.href}
    //                     href={item.href}
    //                     onClick={() => setIsMobileOpen(false)}
    //                     className={`group flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
    //                         isActive 
    //                         ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
    //                         : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-indigo-600'
    //                     }`}
    //                     >
    //                     <div className="flex items-center gap-3">
    //                         <Icon size={20} className={isActive ? "text-white" : "group-hover:scale-110 transition-transform"} />
    //                         {item.label}
    //                     </div>
                        
    //                     {/* Optional Badge */}
    //                     {item.badge && (
    //                         <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-600 dark:bg-rose-500/10'}`}>
    //                         {item.badge}
    //                         </span>
    //                     )}
    //                     </Link>
    //                 );
    //                 })}
    //             </div>
    //             </div>
    //         ))}
    //         </nav>

    //         {/* BOTTOM USER PROFILE SECTION */}
    //         <div className="p-4 border-t dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
    //         <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all cursor-pointer group">
    //             <div className="flex items-center gap-3">
    //             <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
    //                 JD
    //             </div>
    //             <div className="overflow-hidden">
    //                 <p className="text-xs font-black dark:text-white truncate">John Doe</p>
    //                 <p className="text-[10px] font-medium text-gray-400 truncate">Super Admin</p>
    //             </div>
    //             </div>
    //             <button className="text-gray-400 group-hover:text-rose-500 transition-colors">
    //             <LogOut size={18} />
    //             </button>
    //         </div>
    //         </div>

    //     </div>
    //     </>
    // );
    // }
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Settings, X, 
  BarChart3, ShieldCheck, Mail, CreditCard, 
  Smartphone, Database, Activity, LogOut, ChevronRight
} from 'lucide-react';
import { orderService } from '@/app/lib/api'; // আপনার API সার্ভিস

// ১. মেনু স্ট্রাকচার (আইকন ম্যাপিং সহ)
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
  
  // ডাইনামিক ডেটা স্টেট
  const [dynamicStats, setDynamicStats] = useState({
    orderCount: 0,
    unreadMsgs: 0,
    serverLoad: 0
  });

  const [adminUser, setAdminUser] = useState<any>(null);

  // ৩. রিয়েল ডেটা ফেচিং
  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        // অর্ডারের সংখ্যা ডাইনামিকলি আনা
        const orderRes = await orderService.getAll();
        const count = orderRes.orders?.length || 0;

        // লোকাল স্টোরেজ বা অথ স্টেট থেকে ইউজার আনা
        const savedUser = localStorage.getItem('adminUser');
        
        setDynamicStats(prev => ({
          ...prev,
          orderCount: count,
          serverLoad: Math.floor(Math.random() * (40 - 20) + 20) // এটি পরে অরিজিনাল সার্ভার মনিটরিং এপিআই দিয়ে রিপ্লেস হবে
        }));

        if (savedUser) setAdminUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Sidebar data fetch error:", error);
      }
    };

    fetchSidebarData();
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-md animate-in fade-in" 
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
                  const badgeValue = item.badgeKey ? dynamicStats[item.badgeKey] : null;

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

        {/* DYNAMIC SERVER HEALTH */}
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

        {/* DYNAMIC USER PROFILE */}
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
            <button className="p-3 text-slate-400 hover:text-rose-500 transition-colors">
                <LogOut size={18} />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}