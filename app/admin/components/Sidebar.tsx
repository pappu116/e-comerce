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
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Settings, X, 
  BarChart3, ShieldCheck, Mail, Bell, LogOut, CreditCard, 
  Smartphone, Database, Activity 
} from 'lucide-react';

// 1. Updated Menu Items with Finance, Device & Logs
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
      { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, badge: "5" },
      { href: '/admin/customers', label: 'Customers', icon: Users },
    ]
  },
  {
    group: "Finance & Security",
    items: [
      { href: '/admin/payments', label: 'Payments', icon: CreditCard }, // Payment Gateway & Transactions
      { href: '/admin/devices', label: 'Device Tracking', icon: Smartphone }, // Device control
      { href: '/admin/security', label: 'Security', icon: ShieldCheck },
    ]
  },
  {
    group: "System Control",
    items: [
      { href: '/admin/logs', label: 'System Logs', icon: Database }, // Audit logs
      { href: '/admin/settings', label: 'Settings', icon: Settings },
      { href: '/admin/messages', label: 'Messages', icon: Mail, badge: "New" },
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

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}

      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#0f1117] border-r border-gray-200 dark:border-gray-800 transform transition-all duration-300 flex flex-col ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        
        {/* LOGO SECTION */}
        <div className="p-6 border-b dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase italic">Admin<span className="text-indigo-600">Pro</span></h1>
          </div>
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-gray-500 hover:bg-gray-100 p-2 rounded-xl transition-all">
            <X size={22} />
          </button>
        </div>

        {/* NAVIGATION CONTENT */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                {group.group}
              </h3>
              
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`group flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                        isActive 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-indigo-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} className={isActive ? "text-white" : "group-hover:scale-110 transition-transform"} />
                        {item.label}
                      </div>
                      
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-600 dark:bg-rose-500/10'}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* SERVER HEALTH INDICATOR (Added Feature) */}
        <div className="px-6 mb-4">
          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Activity size={12} className="text-emerald-500" />
                <p className="text-[9px] font-black uppercase text-gray-400">Server Load</p>
              </div>
              <p className="text-[9px] font-black text-emerald-500">Normal</p>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="w-[35%] h-full bg-emerald-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* BOTTOM USER PROFILE SECTION */}
        <div className="p-4 border-t dark:border-gray-800 bg-gray-50/50 dark:bg-black/20">
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-white dark:hover:bg-gray-800 transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
                JD
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-black dark:text-white truncate">John Doe</p>
                <p className="text-[10px] font-medium text-gray-400 truncate">Super Admin</p>
              </div>
            </div>
            <button className="text-gray-400 group-hover:text-rose-500 transition-colors">
               <LogOut size={18} />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}