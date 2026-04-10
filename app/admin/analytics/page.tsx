
// 'use client';
// import React from 'react';
// import { 
//   TrendingUp, Users, ShoppingBag, DollarSign, 
//   ArrowUpRight, ArrowDownRight, Calendar, Download,
//   MousePointer2, UserPlus, Zap, Clock, MoreHorizontal
// } from 'lucide-react';

// export default function AnalyticsPage() {
//   return (
//     <div className="p-6 md:p-10 bg-[#f8fafc] dark:bg-[#05070a] min-h-screen">
      
//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
//         <div>
//           <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
//             Business <span className="text-indigo-600">Insights</span>
//           </h1>
//           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Advanced Performance Metrics</p>
//         </div>
        
//         {/* FILTERS & EXPORT */}
//         <div className="flex flex-wrap gap-3">
//           <div className="flex bg-white dark:bg-[#0f1117] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
//              <button className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-[10px] font-black uppercase">All Time</button>
//              <button className="px-4 py-1.5 rounded-lg text-slate-400 text-[10px] font-black uppercase hover:text-indigo-600">12 Months</button>
//              <button className="px-4 py-1.5 rounded-lg text-slate-400 text-[10px] font-black uppercase hover:text-indigo-600">30 Days</button>
//           </div>
//           <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all">
//             <Download size={14} /> Export Report
//           </button>
//         </div>
//       </div>

//       {/* KPI STATS CARDS (8-Card Layout for Pro View) */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         <StatCard title="Total Revenue" value="$84,231" trend="+12.5%" icon={<DollarSign className="text-emerald-500" />} isUp={true} />
//         <StatCard title="Active Users" value="12,405" trend="+3.2%" icon={<Users className="text-blue-500" />} isUp={true} />
//         <StatCard title="Avg. Order Value" value="$142.00" trend="+8.1%" icon={<Zap className="text-amber-500" />} isUp={true} />
//         <StatCard title="Customer CAC" value="$12.40" trend="-1.5%" icon={<UserPlus className="text-purple-500" />} isUp={false} />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
//         {/* MAIN REVENUE CHART SECTION */}
//         <div className="lg:col-span-2 bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
//           <div className="flex items-center justify-between mb-8">
//             <h3 className="font-black text-sm uppercase tracking-widest dark:text-white">Revenue vs Expenses</h3>
//             <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-indigo-600 outline-none">
//                 <option>Monthly View</option>
//                 <option>Weekly View</option>
//             </select>
//           </div>
          
//           <div className="h-72 flex items-end gap-3 px-2">
//             {[30, 50, 40, 80, 60, 90, 70, 85, 100, 50, 70, 95].map((val, i) => (
//               <div key={i} className="flex-1 flex flex-col gap-1 items-center group relative h-full justify-end">
//                 {/* Expense Bar (Small) */}
//                 <div style={{ height: `${val/2}%` }} className="w-full bg-rose-100 dark:bg-rose-500/10 rounded-t-sm group-hover:bg-rose-500/30 transition-all"></div>
//                 {/* Revenue Bar */}
//                 <div style={{ height: `${val}%` }} className="w-full bg-indigo-600 rounded-t-lg group-hover:brightness-125 transition-all">
//                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
//                     Rev: ${val}k
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between mt-6 px-2 text-[10px] font-black text-slate-400 uppercase">
//             <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Dec</span>
//           </div>
//         </div>

//         {/* TOP PERFORMING PRODUCTS */}
//         <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
//           <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-6">Top Products</h3>
//           <div className="space-y-6">
//             <ProductRow name="TechPro Mouse" sales="1,204" growth="+15%" />
//             <ProductRow name="Ergo Keyboard" sales="940" growth="+12%" />
//             <ProductRow name="4K Monitor" sales="421" growth="-3%" />
//             <ProductRow name="USB-C Hub" sales="310" growth="+22%" />
//           </div>
          
//           <div className="mt-12 p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
//             <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Live Traffic</p>
//             <h4 className="text-4xl font-black text-indigo-600 mt-2 tracking-tighter italic">482</h4>
//             <p className="text-[10px] font-bold text-slate-500 mt-1">Users online right now</p>
//           </div>
//         </div>
//       </div>

//       {/* RECENT ACTIVITY & LIVE FEED */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
//             <div className="flex justify-between items-center mb-6">
//                 <h3 className="font-black text-sm uppercase tracking-widest dark:text-white">Recent Transactions</h3>
//                 <button className="text-[10px] font-black uppercase text-indigo-600">View All</button>
//             </div>
//             <div className="space-y-4">
//                 <TransactionRow user="Alex M." status="Completed" amount="+$120.00" time="2m ago" />
//                 <TransactionRow user="Sarah K." status="Pending" amount="+$45.00" time="15m ago" />
//                 <TransactionRow user="James O." status="Completed" amount="+$2,400.00" time="1h ago" />
//             </div>
//         </div>

//         <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
//              <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-6">Device Breakup</h3>
//              <div className="flex items-center gap-8">
//                 <div className="relative w-32 h-32 flex items-center justify-center">
//                     <svg className="w-full h-full -rotate-90">
//                         <circle cx="64" cy="64" r="50" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-slate-800" />
//                         <circle cx="64" cy="64" r="50" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="314" strokeDashoffset="100" className="text-indigo-600" />
//                     </svg>
//                     <div className="absolute inset-0 flex flex-col items-center justify-center">
//                         <span className="text-xl font-black dark:text-white">68%</span>
//                         <span className="text-[8px] font-black text-slate-400 uppercase">Mobile</span>
//                     </div>
//                 </div>
//                 <div className="flex-1 space-y-4">
//                     <ChannelRow name="Desktop" value="32%" color="bg-slate-300" />
//                     <ChannelRow name="Mobile" value="68%" color="bg-indigo-600" />
//                 </div>
//              </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- SUB COMPONENTS ---

// function StatCard({ title, value, trend, icon, isUp }: any) {
//   return (
//     <div className="bg-white dark:bg-[#0f1117] p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
//       <div className="flex justify-between items-start mb-4">
//         <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl"> {icon} </div>
//         <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
//           {isUp ? <TrendingUp size={10} /> : <ArrowDownRight size={10} />} {trend}
//         </div>
//       </div>
//       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
//       <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tighter italic">{value}</h2>
//     </div>
//   );
// }

// function ProductRow({ name, sales, growth }: any) {
//     return (
//         <div className="flex items-center justify-between group cursor-pointer">
//             <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black text-xs text-slate-400">#</div>
//                 <div>
//                     <p className="text-xs font-black dark:text-white group-hover:text-indigo-600 transition-colors">{name}</p>
//                     <p className="text-[9px] font-bold text-slate-400 uppercase">{sales} Sales</p>
//                 </div>
//             </div>
//             <span className={`text-[10px] font-black ${growth.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{growth}</span>
//         </div>
//     );
// }

// function TransactionRow({ user, status, amount, time }: any) {
//     return (
//         <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#080a0f] rounded-2xl border border-slate-100 dark:border-slate-800">
//             <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-indigo-600/10 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-black">{user.charAt(0)}</div>
//                 <div>
//                     <p className="text-xs font-black dark:text-white">{user}</p>
//                     <p className="text-[9px] font-bold text-slate-400 uppercase">{time}</p>
//                 </div>
//             </div>
//             <div className="text-right">
//                 <p className="text-xs font-black text-emerald-500">{amount}</p>
//                 <p className="text-[8px] font-black uppercase text-slate-400">{status}</p>
//             </div>
//         </div>
//     );
// }

// function ChannelRow({ name, value, color }: any) {
//   return (
//     <div className="space-y-1">
//       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
//         <span className="text-slate-400">{name}</span>
//         <span className="dark:text-white">{value}</span>
//       </div>
//       <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
//         <div className={`h-full ${color} rounded-full`} style={{ width: value }}></div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, Users, ShoppingBag, DollarSign, 
  ArrowDownRight, Download, Zap, UserPlus, Loader2
} from 'lucide-react';
import API from '@/app/lib/api'; 
import { useAuth } from "@/app/store/useAuth";

export default function AnalyticsPage() {
  const router = useRouter();
  const { user, isLoggedIn, loading: authLoading, checkAuth } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    stats: { totalRevenue: 0, activeUsers: 0, avgOrderValue: 0, customerCAC: 12.40 },
    monthlyAnalytics: [],
    topProducts: [],
    recentTransactions: []
  });

  useEffect(() => { checkAuth(); }, [checkAuth]);

  useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn || user?.role !== "admin") {
      router.replace(isLoggedIn ? "/profile" : "/login?redirect=/admin/analytics");
      return;
    }
    fetchAnalyticsData();
  }, [isLoggedIn, user, authLoading, router]);

  // const fetchAnalyticsData = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await API.get('/admin/dashboard'); 
      
  //     if (res.data?.success) {
  //       const apiData = res.data;
  //       setData({
  //         stats: {
  //           totalRevenue:   apiData.stats?.totalSales || 0, 
  //           activeUsers:    apiData.stats?.totalCustomers || 0,
  //           avgOrderValue:  apiData.stats?.avgOrderValue || (apiData.stats?.totalSales / apiData.stats?.totalOrders) || 0, 
  //           customerCAC:    12.40, 
  //         },
  //         monthlyAnalytics: apiData.monthlyAnalytics || [],
  //         topProducts:      apiData.topProducts || [],
  //         recentTransactions: apiData.recentOrders || apiData.data?.recentOrders || []
  //       });
  //     }
  //   } catch (err) {
  //     console.error("❌ Analytics Fetch Error:", err);
  //   } finally { setLoading(false); }
  // };
const fetchAnalyticsData = async () => {
  try {
    setLoading(true);
    const res = await API.get('/admin/dashboard'); 

    if (res.data?.success) {
      const apiData = res.data;
      const orders = apiData.recentOrders || apiData.data?.recentOrders || [];

      // ১. Revenue Analytics-এর জন্য ডেমো ডাটা (যদি ব্যাকএন্ড ডাটা না থাকে)
      const tempAnalytics = orders.map((order: any, index: number) => ({
        name: `Order ${index + 1}`, 
        revenue: order.totalAmount || 0
      }));

      // ২. ডামি টপ প্রোডাক্টস
      const dummyTopProducts = [
        { totalSold: 120, productInfo: [{ name: "Gaming Mouse", price: 2500 }] },
        { totalSold: 85, productInfo: [{ name: "Mechanical Keyboard", price: 4500 }] }
      ];

      // ৩. Device Breakup লজিক (userAgent থেকে ক্যালকুলেশন)
      let mobileCount = 0;
      let desktopCount = 0;

      orders.forEach((order: any) => {
        const ua = order.userAgent?.toLowerCase() || "";
        // যদি ইউজার এজেন্ট টেক্সটে mobile, android বা iphone থাকে তবে সেটা মোবাইল
        if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
          mobileCount++;
        } else {
          desktopCount++;
        }
      });

      const totalOrders = orders.length || 1;
      const deviceStats = {
        mobile: Math.round((mobileCount / totalOrders) * 100),
        desktop: Math.round((desktopCount / totalOrders) * 100)
      };

      // ৪. ফাইনাল ডাটা সেট করা
      setData({
        stats: {
          totalRevenue:   apiData.stats?.totalSales || 0, 
          activeUsers:    apiData.stats?.totalCustomers || 0,
          avgOrderValue:  apiData.stats?.avgOrderValue || 0, 
          customerCAC:    12.40, 
        },
        monthlyAnalytics: apiData.monthlyAnalytics || tempAnalytics, 
        topProducts:      (apiData.topProducts && apiData.topProducts.length > 0) 
                          ? apiData.topProducts 
                          : dummyTopProducts,
        recentTransactions: orders,
        deviceStats: deviceStats // এটিই Device Breakup চার্টকে ডাইনামিক করবে
      });
    }
  } catch (err) {
    console.error("❌ Analytics Fetch Error:", err);
  } finally {
    setLoading(false);
  }
};

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#05070a]">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  // চার্টের উচ্চতা ডাইনামিক করার লজিক
  const maxRev = Math.max(...data.monthlyAnalytics.map((m: any) => m.revenue), 1);

  return (
    <div className="p-6 md:p-10 bg-[#f8fafc] dark:bg-[#05070a] min-h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
            Business <span className="text-indigo-600">Insights</span>
          </h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Advanced Performance Metrics</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all">
          <Download size={14} /> Export Report
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Revenue" value={`৳${data.stats.totalRevenue.toLocaleString()}`} trend="+12.5%" icon={<DollarSign className="text-emerald-500" />} isUp={true} />
        <StatCard title="Active Users" value={data.stats.activeUsers.toLocaleString()} trend="+3.2%" icon={<Users className="text-blue-500" />} isUp={true} />
        <StatCard title="Avg. Order Value" value={`৳${Math.round(data.stats.avgOrderValue)}`} trend="+8.1%" icon={<Zap className="text-amber-500" />} isUp={true} />
        <StatCard title="Customer CAC" value={`৳${data.stats.customerCAC}`} trend="-1.5%" icon={<UserPlus className="text-purple-500" />} isUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* REVENUE CHART */}
        {/* <div className="lg:col-span-2 bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-8">Revenue Analytics</h3>
          <div className="h-72 flex items-end gap-3 px-2">
            {data.monthlyAnalytics.map((m: any, i: number) => (
              <div key={i} className="flex-1 flex flex-col gap-1 items-center group relative h-full justify-end">
                <div style={{ height: `${(m.revenue / maxRev) * 90}%`, minHeight: '5%' }} className="w-full bg-indigo-600 rounded-t-lg group-hover:brightness-125 transition-all relative">
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                    ৳{m.revenue}
                  </div>
                </div>
                <span className="text-[9px] font-black text-slate-400 mt-2 uppercase">{m.name}</span>
              </div>
            ))}
          </div>
        </div> */}
        {/* REVENUE CHART - ডায়নামিক ম্যাপিং */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-8">Revenue Analytics</h3>
          <div className="h-72 flex items-end gap-3 px-2">
            {data.monthlyAnalytics?.length > 0 ? (
              data.monthlyAnalytics.map((m: any, i: number) => {
                // ১. সর্বোচ্চ রেভিনিউ খুঁজে বের করা (যাতে বারগুলো স্ক্রিনের বাইরে না যায়)
                const maxRevenue = Math.max(...data.monthlyAnalytics.map((item: any) => item.revenue), 1);
                
                // ২. উচ্চতা ক্যালকুলেশন (শতাংশ হিসেবে)
                const barHeight = (m.revenue / maxRevenue) * 100;

                return (
                  <div key={i} className="flex-1 flex flex-col gap-1 items-center group relative h-full justify-end">
                    <div 
                      style={{ height: `${barHeight}%`, minHeight: '10%' }} 
                      className="w-full bg-indigo-600 rounded-t-lg group-hover:brightness-125 transition-all relative"
                    >
                      {/* হোভার করলে টাকার পরিমাণ দেখাবে */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                        ৳{Number(m.revenue).toLocaleString()}
                      </div>
                    </div>
                    {/* মাসের নাম (যেমন: Jan, Feb) */}
                    <span className="text-[9px] font-black text-slate-400 mt-2 uppercase">{m.name}</span>
                  </div>
                );
              })
            ) : (
              <div className="w-full text-center pb-20 text-slate-400 text-xs font-bold uppercase tracking-widest">
                No Analytics Data Available
              </div>
            )}
          </div>
        </div>

        {/* TOP PRODUCTS */}
        <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
          <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-6">Top Products</h3>
          {/* <div className="space-y-6">
            {data.topProducts.slice(0, 5).map((p: any, i: number) => (
              <ProductRow key={i} name={p.productInfo[0]?.name} sales={p.totalSold} price={p.productInfo[0]?.price} />
            ))}
          </div> */}
           <div className="space-y-6">
          {data.topProducts.length > 0 ? (
            data.topProducts.slice(0, 5).map((p: any, i: number) => (
              <ProductRow 
                key={i} 
                // আপনার এগ্রিগেশনে productInfo একটি অ্যারে হিসেবে আসে, তাই [0] ব্যবহার করা হয়েছে
                name={p.productInfo[0]?.name || "Unknown Product"} 
                sales={p.totalSold} 
                price={p.productInfo[0]?.price || 0} 
              />
            ))
          ) : (
            <p className="text-slate-400 text-xs text-center py-10 uppercase font-black">No top products yet</p>
          )}
        </div>
        </div>
       
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RECENT TRANSACTIONS */}
        <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
            <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-6">Recent Transactions</h3>
            {/* <div className="space-y-4">
              {data.recentTransactions.slice(0, 4).map((t: any, i: number) => (
                  <TransactionRow 
                      key={i} 
                      user={t.user?.name || "Guest"} 
                      status={t.status} 
                      // totalPrice যদি কাজ না করে তবে t.total চেক করুন
                      amount={`৳${Number(t.totalPrice || 0).toLocaleString()}`} 
                      // createdAt থেকে সময় ফরম্যাট করার জন্য
                      time={t.createdAt ? new Date(t.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "Latest"} 
                  />
              ))}
          </div> */}
            {data.recentTransactions.slice(0, 4).map((t: any, i: number) => (
                <TransactionRow 
                    key={i} 
                    user={t.user?.name || "Guest"} 
                    status={t.status} 
                    // আপনার কনসোল অনুযায়ী এখানে 'totalAmount' হবে
                    amount={`৳${Number(t.totalAmount || 0).toLocaleString()}`} 
                    // createdAt থেকে সময় ফরম্যাট করা হয়েছে
                    time={t.createdAt ? new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Latest"} 
                />
            ))}
        </div>

       {/* DEVICE BREAKDOWN (এখন পুরোপুরি ডাইনামিক) */}
      <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-6">Device Breakup</h3>
          <div className="flex items-center gap-8">
              <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                      {/* ব্যাকগ্রাউন্ড সার্কেল */}
                      <circle cx="64" cy="64" r="50" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-slate-800" />
                      
                      {/* ডাইনামিক প্রগ্রেস সার্কেল */}
                      <circle 
                          cx="64" cy="64" r="50" 
                          fill="transparent" 
                          stroke="#4f46e5" 
                          strokeWidth="12" 
                          strokeDasharray="314" 
                          // লজিক: ৩১৪ হলো পুরো সার্কেল, সেখান থেকে মোবাইল পার্সেন্টেজ অনুযায়ী মাইনাস হবে
                          strokeDashoffset={314 - (314 * (data.deviceStats?.mobile || 0)) / 100} 
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-in-out" 
                      />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-black dark:text-white">
                          {data.deviceStats?.mobile || 0}%
                      </span>
                      <span className="text-[8px] font-black text-slate-400 uppercase">Mobile</span>
                  </div>
              </div>

              <div className="flex-1 space-y-4">
                  {/* নিচের বারগুলোও এখন ডাইনামিক ডাটা দেখাবে */}
                  <ChannelRow 
                      name="Desktop" 
                      value={`${data.deviceStats?.desktop || 0}%`} 
                      color="bg-slate-300" 
                  />
                  <ChannelRow 
                      name="Mobile" 
                      value={`${data.deviceStats?.mobile || 0}%`} 
                      color="bg-indigo-600" 
                  />
              </div>
          </div>
      </div>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

function ProductRow({ name, sales, price }: any) {
    return (
        <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black text-xs text-slate-400">#</div>
                <div>
                    <p className="text-xs font-black dark:text-white group-hover:text-indigo-600 transition-colors truncate w-32">{name}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{sales} Sales</p>
                </div>
            </div>
            <span className="text-[10px] font-black text-emerald-500">৳{price}</span>
        </div>
    );
}

function TransactionRow({ user, status, amount, time }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#080a0f] rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600/10 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-black">{user.charAt(0)}</div>
                <div>
                    <p className="text-xs font-black dark:text-white">{user}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{time}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-xs font-black text-emerald-500">{amount}</p>
                <p className="text-[8px] font-black uppercase text-slate-400">{status}</p>
            </div>
        </div>
    );
}

function ChannelRow({ name, value, color }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400">{name}</span>
        <span className="dark:text-white">{value}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: value }}></div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, isUp }: any) {
  return (
    <div className="bg-white dark:bg-[#0f1117] p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">{icon}</div>
        <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend}
        </div>
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tighter italic">{value}</h2>
    </div>
  );
} 