
'use client';
import React from 'react';
import { 
  TrendingUp, Users, ShoppingBag, DollarSign, 
  ArrowUpRight, ArrowDownRight, Calendar, Download,
  MousePointer2, UserPlus, Zap, Clock, MoreHorizontal
} from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="p-6 md:p-10 bg-[#f8fafc] dark:bg-[#05070a] min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
            Business <span className="text-indigo-600">Insights</span>
          </h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Advanced Performance Metrics</p>
        </div>
        
        {/* FILTERS & EXPORT */}
        <div className="flex flex-wrap gap-3">
          <div className="flex bg-white dark:bg-[#0f1117] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
             <button className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-[10px] font-black uppercase">All Time</button>
             <button className="px-4 py-1.5 rounded-lg text-slate-400 text-[10px] font-black uppercase hover:text-indigo-600">12 Months</button>
             <button className="px-4 py-1.5 rounded-lg text-slate-400 text-[10px] font-black uppercase hover:text-indigo-600">30 Days</button>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all">
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* KPI STATS CARDS (8-Card Layout for Pro View) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Revenue" value="$84,231" trend="+12.5%" icon={<DollarSign className="text-emerald-500" />} isUp={true} />
        <StatCard title="Active Users" value="12,405" trend="+3.2%" icon={<Users className="text-blue-500" />} isUp={true} />
        <StatCard title="Avg. Order Value" value="$142.00" trend="+8.1%" icon={<Zap className="text-amber-500" />} isUp={true} />
        <StatCard title="Customer CAC" value="$12.40" trend="-1.5%" icon={<UserPlus className="text-purple-500" />} isUp={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* MAIN REVENUE CHART SECTION */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-sm uppercase tracking-widest dark:text-white">Revenue vs Expenses</h3>
            <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-indigo-600 outline-none">
                <option>Monthly View</option>
                <option>Weekly View</option>
            </select>
          </div>
          
          <div className="h-72 flex items-end gap-3 px-2">
            {[30, 50, 40, 80, 60, 90, 70, 85, 100, 50, 70, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col gap-1 items-center group relative h-full justify-end">
                {/* Expense Bar (Small) */}
                <div style={{ height: `${val/2}%` }} className="w-full bg-rose-100 dark:bg-rose-500/10 rounded-t-sm group-hover:bg-rose-500/30 transition-all"></div>
                {/* Revenue Bar */}
                <div style={{ height: `${val}%` }} className="w-full bg-indigo-600 rounded-t-lg group-hover:brightness-125 transition-all">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Rev: ${val}k
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 px-2 text-[10px] font-black text-slate-400 uppercase">
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Dec</span>
          </div>
        </div>

        {/* TOP PERFORMING PRODUCTS */}
        <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
          <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-6">Top Products</h3>
          <div className="space-y-6">
            <ProductRow name="TechPro Mouse" sales="1,204" growth="+15%" />
            <ProductRow name="Ergo Keyboard" sales="940" growth="+12%" />
            <ProductRow name="4K Monitor" sales="421" growth="-3%" />
            <ProductRow name="USB-C Hub" sales="310" growth="+22%" />
          </div>
          
          <div className="mt-12 p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Live Traffic</p>
            <h4 className="text-4xl font-black text-indigo-600 mt-2 tracking-tighter italic">482</h4>
            <p className="text-[10px] font-bold text-slate-500 mt-1">Users online right now</p>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY & LIVE FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-sm uppercase tracking-widest dark:text-white">Recent Transactions</h3>
                <button className="text-[10px] font-black uppercase text-indigo-600">View All</button>
            </div>
            <div className="space-y-4">
                <TransactionRow user="Alex M." status="Completed" amount="+$120.00" time="2m ago" />
                <TransactionRow user="Sarah K." status="Pending" amount="+$45.00" time="15m ago" />
                <TransactionRow user="James O." status="Completed" amount="+$2,400.00" time="1h ago" />
            </div>
        </div>

        <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800">
             <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-6">Device Breakup</h3>
             <div className="flex items-center gap-8">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="64" cy="64" r="50" fill="transparent" stroke="currentColor" strokeWidth="12" className="text-slate-100 dark:text-slate-800" />
                        <circle cx="64" cy="64" r="50" fill="transparent" stroke="currentColor" strokeWidth="12" strokeDasharray="314" strokeDashoffset="100" className="text-indigo-600" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-black dark:text-white">68%</span>
                        <span className="text-[8px] font-black text-slate-400 uppercase">Mobile</span>
                    </div>
                </div>
                <div className="flex-1 space-y-4">
                    <ChannelRow name="Desktop" value="32%" color="bg-slate-300" />
                    <ChannelRow name="Mobile" value="68%" color="bg-indigo-600" />
                </div>
             </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

function StatCard({ title, value, trend, icon, isUp }: any) {
  return (
    <div className="bg-white dark:bg-[#0f1117] p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl"> {icon} </div>
        <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {isUp ? <TrendingUp size={10} /> : <ArrowDownRight size={10} />} {trend}
        </div>
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tighter italic">{value}</h2>
    </div>
  );
}

function ProductRow({ name, sales, growth }: any) {
    return (
        <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black text-xs text-slate-400">#</div>
                <div>
                    <p className="text-xs font-black dark:text-white group-hover:text-indigo-600 transition-colors">{name}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{sales} Sales</p>
                </div>
            </div>
            <span className={`text-[10px] font-black ${growth.includes('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{growth}</span>
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

// 'use client';
// import React from 'react';
// import { 
//   TrendingUp, Users, ShoppingBag, DollarSign, 
//   ArrowUpRight, ArrowDownRight, Calendar, Download 
// } from 'lucide-react';

// export default function AnalyticsPage() {
//   return (
//     <div className="p-6 md:p-10 bg-[#f8fafc] dark:bg-[#05070a] min-h-screen">
      
//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
//         <div>
//           <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">
//             Business <span className="text-indigo-600">Analytics</span>
//           </h1>
//           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time performance tracking</p>
//         </div>
//         <div className="flex gap-3">
//           <button className="flex items-center gap-2 bg-white dark:bg-[#0f1117] border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest dark:text-white hover:bg-slate-50 transition-all">
//             <Calendar size={14} /> Last 30 Days
//           </button>
//           <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
//             <Download size={14} /> Export Report
//           </button>
//         </div>
//       </div>

//       {/* KPI STATS CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         <StatCard title="Total Revenue" value="$45,231.89" trend="+12.5%" icon={<DollarSign className="text-emerald-500" />} isUp={true} />
//         <StatCard title="Active Users" value="2,405" trend="+3.2%" icon={<Users className="text-blue-500" />} isUp={true} />
//         <StatCard title="Total Orders" value="1,210" trend="-2.1%" icon={<ShoppingBag className="text-amber-500" />} isUp={false} />
//         <StatCard title="Conversion Rate" value="4.8%" trend="+0.5%" icon={<TrendingUp className="text-purple-500" />} isUp={true} />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* REVENUE GRAPH PLACEHOLDER */}
//         <div className="lg:col-span-2 bg-white dark:bg-[#0f1117] p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
//           <div className="flex items-center justify-between mb-8">
//             <h3 className="font-black text-sm uppercase tracking-widest dark:text-white">Revenue Growth</h3>
//             <div className="flex gap-4">
//               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase"><span className="w-2 h-2 rounded-full bg-indigo-600"></span> Sales</div>
//               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase"><span className="w-2 h-2 rounded-full bg-slate-200"></span> Target</div>
//             </div>
//           </div>
          
//           {/* Custom CSS Chart Placeholder */}
//           <div className="h-64 flex items-end gap-3 px-2">
//             {[40, 70, 45, 90, 65, 80, 95, 55, 85, 60, 75, 100].map((val, i) => (
//               <div key={i} className="flex-1 group relative">
//                 <div 
//                   style={{ height: `${val}%` }} 
//                   className="w-full bg-indigo-50 dark:bg-indigo-900/20 group-hover:bg-indigo-600 rounded-t-lg transition-all duration-500 relative"
//                 >
//                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
//                     ${val}k
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between mt-4 px-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
//             <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
//             <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
//           </div>
//         </div>

//         {/* TOP PRODUCTS / ACTIVITY */}
//         <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
//           <h3 className="font-black text-sm uppercase tracking-widest dark:text-white mb-6">Top Channels</h3>
//           <div className="space-y-6">
//             <ChannelRow name="Direct Search" value="45%" color="bg-indigo-600" />
//             <ChannelRow name="Social Media" value="30%" color="bg-purple-500" />
//             <ChannelRow name="Referral" value="15%" color="bg-emerald-500" />
//             <ChannelRow name="Organic" value="10%" color="bg-amber-500" />
//           </div>

//           <div className="mt-10 p-5 bg-indigo-600 rounded-2xl text-white">
//             <p className="text-[10px] font-black uppercase opacity-80 tracking-widest">Growth Tip</p>
//             <p className="text-xs font-bold mt-2">Your "Social Media" traffic increased by 15% this week. Focus on Instagram ads!</p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// // --- SUB COMPONENTS ---

// function StatCard({ title, value, trend, icon, isUp }: any) {
//   return (
//     <div className="bg-white dark:bg-[#0f1117] p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
//       <div className="flex justify-between items-start mb-4">
//         <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform">
//           {icon}
//         </div>
//         <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
//           {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {trend}
//         </div>
//       </div>
//       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
//       <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1 italic tracking-tighter">{value}</h2>
//     </div>
//   );
// }

// function ChannelRow({ name, value, color }: any) {
//   return (
//     <div className="space-y-2">
//       <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
//         <span className="text-slate-500">{name}</span>
//         <span className="dark:text-white">{value}</span>
//       </div>
//       <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
//         <div className={`h-full ${color} rounded-full`} style={{ width: value }}></div>
//       </div>
//     </div>
//   );
// }