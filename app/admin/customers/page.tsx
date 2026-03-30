// 'use client';

// import React, { useState } from 'react';
// import { 
//   Search, Filter, Plus, MoreVertical, 
//   Users, UserCheck, DollarSign, Mail,
//   Pencil, Trash2, ShieldAlert
// } from "lucide-react";
// // Import Shadcn UI components if you have them, otherwise standard buttons work too
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// // --- CUSTOMER DATA ---
// const customers = [
//   { id: 1, name: "Tanvir Ahmed", email: "tanvir@example.com", status: "Active", joined: "24 Oct 2025", spent: "$1,200", initial: "T" },
//   { id: 2, name: "Rahat Karim", email: "rahat@example.com", status: "Pending", joined: "12 Nov 2025", spent: "$0.00", initial: "R" },
//   { id: 3, name: "Nusrat Jahan", email: "nusrat@example.com", status: "Active", joined: "05 Jan 2026", spent: "$450", initial: "N" },
//   { id: 4, name: "Arif Hossain", email: "arif@example.com", status: "Active", joined: "10 Feb 2026", spent: "$890", initial: "A" },
// ];

// export default function CustomerAdminPage() {
//   return (
//     <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#080d17] p-6 md:p-10 space-y-8">
      
//       {/* 1. HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Customer Directory</h1>
//           <p className="text-slate-500 dark:text-slate-400 mt-1">Manage, verify, and monitor your platform users.</p>
//         </div>
//         <button className="flex items-center justify-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-2xl font-semibold transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
//           <Plus size={20} />
//           Add New Customer
//         </button>
//       </div>

//       {/* 2. STATS CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <StatCard title="Total Customers" value="2,543" icon={<Users className="text-blue-600" />} />
//         <StatCard title="Active Subscriptions" value="1,280" valueColor="text-green-600" icon={<UserCheck className="text-green-600" />} />
//         <StatCard title="Avg. Revenue" value="$84.20" valueColor="text-indigo-600" icon={<DollarSign className="text-indigo-600" />} />
//       </div>

//       {/* 3. TABLE CONTAINER */}
//       <div className="w-full bg-white dark:bg-[#0f172a] rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        
//         {/* Search & Filter Bar */}
//         <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-[#0f172a]">
//           <div className="relative w-full md:w-96">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//             <input 
//               type="text" 
//               placeholder="Search by name or email..." 
//               className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/50 dark:bg-[#1e293b] dark:text-white font-medium"
//             />
//           </div>
//           <button className="flex items-center gap-2 px-5 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300 font-medium">
//             <Filter size={18} />
//             Filters
//           </button>
//         </div>

//         {/* --- THE TABLE --- */}
//         <div className="overflow-x-auto scrollbar-hide">
//           <table className="w-full text-left min-w-[900px]">
//             <thead>
//               <tr className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-[0.1em]">
//                 <th className="px-8 py-6 font-bold">User Details</th>
//                 <th className="px-8 py-6 font-bold">Status</th>
//                 <th className="px-8 py-6 font-bold">Join Date</th>
//                 <th className="px-8 py-6 font-bold">Spent</th>
//                 <th className="px-8 py-6 font-bold text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
//               {customers.map((user) => (
//                 <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
//                   <td className="px-8 py-5">
//                     <div className="flex items-center gap-4">
//                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-sm ${
//                         user.id % 2 === 0 ? 'bg-indigo-500' : 'bg-purple-500'
//                       }`}>
//                         {user.initial}
//                       </div>
//                       <div>
//                         <p className="font-bold text-slate-800 dark:text-slate-100 text-base">{user.name}</p>
//                         <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
//                           <Mail size={13} /> {user.email}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-8 py-5">
//                     <span className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center ${
//                       user.status === 'Active' 
//                       ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' 
//                       : 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
//                     }`}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td className="px-8 py-5 text-sm text-slate-600 dark:text-slate-400 font-medium">{user.joined}</td>
//                   <td className="px-8 py-5 text-sm font-bold text-slate-800 dark:text-slate-100">{user.spent}</td>
                  
//                   {/* --- ACTION BUTTONS --- */}
//                   <td className="px-8 py-5">
//                     <div className="flex items-center justify-end gap-2">
//                       {/* Direct Edit Button */}
//                       <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all" title="Edit User">
//                         <Pencil size={18} />
//                       </button>
                      
//                       {/* Direct Delete Button */}
//                       <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all" title="Delete User">
//                         <Trash2 size={18} />
//                       </button>

//                       {/* Three Dots for More Options */}
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
//                             <MoreVertical size={20} />
//                           </button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 shadow-xl border-slate-100 dark:border-slate-800">
//                           <DropdownMenuLabel className="text-xs text-slate-400 font-bold uppercase px-3 py-2">Quick Actions</DropdownMenuLabel>
//                           <DropdownMenuItem className="flex items-center gap-2 p-3 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 font-medium">
//                              View Orders
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="flex items-center gap-2 p-3 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 font-medium">
//                              Verify Account
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator className="my-1 bg-slate-50 dark:bg-slate-800" />
//                           <DropdownMenuItem className="flex items-center gap-2 p-3 rounded-xl cursor-pointer text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 font-bold">
//                              <ShieldAlert size={16} /> Suspend User
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         <div className="p-8 bg-slate-50/30 dark:bg-[#0f172a] border-t border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
//           <p>Showing <span className="font-bold text-slate-800 dark:text-slate-200">4</span> of <span className="font-bold text-slate-800 dark:text-slate-200">2,543</span> customers</p>
//           <div className="flex gap-3">
//             <button className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all font-semibold">Previous</button>
//             <button className="px-5 py-2.5 bg-[#4f46e5] text-white rounded-xl hover:bg-[#4338ca] transition-all font-semibold shadow-lg shadow-indigo-100 dark:shadow-none">Next</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value, icon, valueColor = "text-slate-900" }: any) {
//   return (
//     <div className="bg-white dark:bg-[#0f172a] p-8 rounded-[28px] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4 group hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-all">
//       <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
//         {React.cloneElement(icon as React.ReactElement, { size: 24 })}
//       </div>
//       <div>
//         <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">{title}</p>
//         <h2 className={`text-3xl font-black mt-1 dark:text-white ${valueColor}`}>{value}</h2>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import React, { useState, useMemo } from 'react';
// import { 
//   Search, Filter, Plus, MoreVertical, Users, DollarSign, 
//   Pencil, Trash2, ShieldAlert, X, Save, UserX, CheckCircle2, 
//   Clock, ArrowUpDown, ChevronLeft, ChevronRight, Check, Minus,
//   ExternalLink, Loader2, ShieldCheck
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// // --- INITIAL DATA ---
// const initialCustomers = [
//   { id: 1, name: "Tanvir Ahmed", email: "tanvir@example.com", status: "Active", joined: "24 Oct 2025", spent: "$1,200", initial: "T", lastLogin: "2 hours ago" },
//   { id: 2, name: "Rahat Karim", email: "rahat@example.com", status: "Pending", joined: "12 Nov 2025", spent: "$0.00", initial: "R", lastLogin: "Never" },
//   { id: 3, name: "Nusrat Jahan", email: "nusrat@example.com", status: "Suspended", joined: "05 Jan 2026", spent: "$450", initial: "N", lastLogin: "3 days ago" },
//   { id: 4, name: "Arif Hossain", email: "arif@example.com", status: "Active", joined: "10 Feb 2026", spent: "$890", initial: "A", lastLogin: "Just now" },
// ];

// export default function CustomerAdminPage() {
//   const [customers, setCustomers] = useState(initialCustomers);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("All");
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isSwitching, setIsSwitching] = useState(false); // Impersonation Loading

//   // --- LOGIC: FILTERING & SEARCH ---
//   const filteredCustomers = useMemo(() => {
//     return customers.filter(c => {
//       const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                            c.email.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesTab = activeTab === "All" || c.status === activeTab;
//       return matchesSearch && matchesTab;
//     });
//   }, [searchQuery, activeTab, customers]);

//   // --- IMPERSONATION HANDLER ---
//   const handleImpersonate = (user: any) => {
//     setIsSwitching(true);
//     setTimeout(() => {
//       alert(`Switched to ${user.name}'s account successfully!`);
//       setIsSwitching(false);
//     }, 2000);
//   };

//   // --- ACTIONS ---
//   const toggleSelectAll = () => {
//     if (selectedIds.length === filteredCustomers.length) setSelectedIds([]);
//     else setSelectedIds(filteredCustomers.map(c => c.id));
//   };

//   const toggleSelectOne = (id: number) => {
//     setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
//   };

//   const handleStatusChange = (id: number, newStatus: string) => {
//     setCustomers(customers.map(c => c.id === id ? { ...c, status: newStatus } : c));
//   };

//   const handleDelete = (id: number) => {
//     if (confirm("Delete this user permanently?")) {
//       setCustomers(customers.filter(c => c.id !== id));
//       setSelectedIds(prev => prev.filter(i => i !== id));
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#05070a] p-4 md:p-10 space-y-8 font-sans transition-colors duration-500 relative">
      
//       {/* 🚀 SECURITY SESSION OVERLAY (IMPERSONATION LOADING) */}
//       {isSwitching && (
//         <div className="fixed inset-0 z-[999] bg-[#05070a]/80 backdrop-blur-xl flex flex-col items-center justify-center text-white">
//           <Loader2 className="w-14 h-14 text-indigo-500 animate-spin mb-6" />
//           <h2 className="text-3xl font-black italic uppercase tracking-tighter">Initiating <span className="text-indigo-500">Secure Access</span></h2>
//           <p className="text-slate-400 font-bold text-xs mt-2 uppercase tracking-[0.4em]">Bypassing user environment...</p>
//         </div>
//       )}

//       {/* 1. TOP HEADER */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//         <div>
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-indigo-600 rounded-lg text-white">
//               <Users size={20} />
//             </div>
//             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Admin Control</span>
//           </div>
//           <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
//             Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Database</span>
//           </h1>
//         </div>
        
//         <div className="flex items-center gap-3">
//           <button className="hidden md:flex items-center gap-2 px-6 py-4 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 dark:text-white transition-all">
//             <ArrowUpDown size={14} /> Export CSV
//           </button>
//           <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-indigo-200 dark:shadow-none active:scale-95">
//             <Plus size={18} /> Add Member
//           </button>
//         </div>
//       </div>

//       {/* 2. STATS SECTION */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard title="Total Users" value={customers.length} icon={<Users />} color="blue" trend="+12% from last month" />
//         <StatCard title="Suspended" value={customers.filter(c => c.status === 'Suspended').length} icon={<UserX />} color="rose" trend="Safety status" />
//         <StatCard title="Total Revenue" value="$2,540" icon={<DollarSign />} color="indigo" trend="Current Quarter" />
//       </div>

//       {/* 3. MAIN CONTENT CARD */}
//       <div className="bg-white dark:bg-[#0f1117] rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800/50 overflow-hidden">
        
//         <div className="p-8 space-y-6">
//           <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
//             <div className="flex bg-slate-100 dark:bg-[#080a0f] p-1.5 rounded-2xl w-full md:w-auto">
//               {["All", "Active", "Suspended"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
//                     activeTab === tab 
//                     ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm dark:text-white" 
//                     : "text-slate-400 hover:text-slate-600"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             <div className="relative w-full md:w-96">
//               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//               <input 
//                 type="text" 
//                 placeholder="Search Identity..." 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-[#080a0f] dark:text-white outline-none focus:border-indigo-500/50 transition-all font-bold text-sm" 
//               />
//             </div>
//           </div>

//           {selectedIds.length > 0 && (
//             <div className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-500/10 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2">
//               <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest ml-4">
//                 {selectedIds.length} users selected
//               </span>
//               <button className="p-2 text-rose-600 hover:bg-rose-100 rounded-xl transition-all" onClick={() => { if(confirm("Delete all?")) setCustomers(customers.filter(c => !selectedIds.includes(c.id))); setSelectedIds([]); }}>
//                 <Trash2 size={18} />
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left min-w-[1000px]">
//             <thead className="bg-slate-50/50 dark:bg-slate-900/50">
//               <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black border-y border-slate-50 dark:border-slate-800">
//                 <th className="px-8 py-5">
//                   <button onClick={toggleSelectAll} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedIds.length > 0 ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700'}`}>
//                     {selectedIds.length === filteredCustomers.length ? <Check size={12} /> : selectedIds.length > 0 ? <Minus size={12} /> : null}
//                   </button>
//                 </th>
//                 <th className="px-8 py-5">Customer Profile</th>
//                 <th className="px-8 py-5">Status</th>
//                 <th className="px-8 py-5 text-center">Last Active</th>
//                 <th className="px-8 py-5">Revenue</th>
//                 <th className="px-8 py-5 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
//               {filteredCustomers.map((user) => (
//                 <tr key={user.id} className={`group hover:bg-slate-50/80 dark:hover:bg-white/5 transition-all ${selectedIds.includes(user.id) ? 'bg-indigo-50/30 dark:bg-indigo-500/5' : ''}`}>
//                   <td className="px-8 py-6">
//                     <button onClick={() => toggleSelectOne(user.id)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedIds.includes(user.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700 group-hover:border-indigo-400'}`}>
//                       {selectedIds.includes(user.id) && <Check size={12} />}
//                     </button>
//                   </td>
//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-950 flex items-center justify-center text-white font-black shadow-lg">
//                         {user.initial}
//                       </div>
//                       <div>
//                         <p className="font-black text-slate-800 dark:text-slate-100 text-[15px]">{user.name}</p>
//                         <p className="text-[11px] text-slate-400 font-bold">{user.email}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-8 py-6">
//                     <StatusBadge status={user.status} />
//                   </td>
//                   <td className="px-8 py-6 text-center text-[11px] font-bold text-slate-500">
//                     {user.lastLogin}
//                   </td>
//                   <td className="px-8 py-6 font-black text-slate-800 dark:text-slate-100 italic">{user.spent}</td>
//                   <td className="px-8 py-6 text-right">
//                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      
//                       {/* 🛡️ QUICK IMPERSONATE BUTTON */}
//                       <button 
//                         onClick={() => handleImpersonate(user)}
//                         className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
//                       >
//                         <ExternalLink size={14} /> Login
//                       </button>

//                       <button onClick={() => {setSelectedCustomer(user); setIsSidebarOpen(true);}} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all">
//                         <Pencil size={18} />
//                       </button>
                      
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <button className="p-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all">
//                             <MoreVertical size={20} />
//                           </button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-60 rounded-2xl border-slate-100 dark:border-slate-800 shadow-2xl p-2">
//                            <DropdownMenuItem onClick={() => handleImpersonate(user)} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-indigo-600 hover:bg-indigo-50"><ShieldCheck size={16}/> Impersonate User</DropdownMenuItem>
//                            <DropdownMenuSeparator />
//                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'Active')} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-emerald-600"><CheckCircle2 size={16}/> Activate</DropdownMenuItem>
//                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'Suspended')} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-rose-600"><ShieldAlert size={16}/> Suspend</DropdownMenuItem>
//                            <DropdownMenuItem onClick={() => handleDelete(user.id)} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-slate-500 hover:text-rose-600"><Trash2 size={16}/> Delete Account</DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="p-8 border-t border-slate-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
//             Showing <span className="text-slate-900 dark:text-white">{filteredCustomers.length}</span> of {customers.length} results
//           </p>
//           <div className="flex gap-2">
//             <button className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:text-white disabled:opacity-30" disabled><ChevronLeft size={18} /></button>
//             <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest">1</button>
//             <button className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:text-white disabled:opacity-30"><ChevronRight size={18} /></button>
//           </div>
//         </div>
//       </div>

//       {/* --- SIDEBAR EDIT --- */}
//       {isSidebarOpen && selectedCustomer && (
//         <>
//           <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[99]" onClick={() => setIsSidebarOpen(false)} />
//           <div className="fixed inset-y-4 right-4 w-full md:w-[500px] bg-white dark:bg-[#0f1117] shadow-2xl z-[100] rounded-[40px] p-10 border border-slate-100 dark:border-slate-800 animate-in slide-in-from-right-full duration-500">
//             <div className="flex items-center justify-between mb-10">
//               <h2 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white">Profile <span className="text-indigo-600">Review</span></h2>
//               <button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-2xl hover:scale-110 transition-transform"><X size={20}/></button>
//             </div>

//             <div className="space-y-8 overflow-y-auto max-h-[75vh] pr-2 scrollbar-hide">
//               <div className="bg-slate-50 dark:bg-[#080a0f] p-6 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-4">
//                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-black">{selectedCustomer.initial}</div>
//                  <div>
//                    <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">Customer ID: #{selectedCustomer.id}042</p>
//                    <h3 className="text-xl font-black dark:text-white">{selectedCustomer.name}</h3>
//                  </div>
//               </div>

//               <div className="space-y-4">
//                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><Clock size={12}/> Recent Activity</p>
//                 <div className="space-y-3 pl-2 border-l-2 border-slate-100 dark:border-slate-800">
//                    <TimelineItem title="Profile Updated" time="10 mins ago" color="blue" />
//                    <TimelineItem title="Security Login" time="2 hours ago" color="green" />
//                    <TimelineItem title="Password Changed" time="2 days ago" color="rose" />
//                 </div>
//               </div>

//               <form className="space-y-6">
//                 <InputGroup label="Full Identity" value={selectedCustomer.name} />
//                 <InputGroup label="Verified Email" value={selectedCustomer.email} />
                
//                 {/* Impersonate from Sidebar too */}
//                 <button 
//                   type="button" 
//                   onClick={() => handleImpersonate(selectedCustomer)}
//                   className="w-full bg-slate-900 dark:bg-indigo-600/10 text-white dark:text-indigo-400 p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all mt-4"
//                 >
//                   <ShieldCheck size={18} /> Login as this user
//                 </button>

//                 <div className="pt-6 grid grid-cols-2 gap-4">
//                   <button type="submit" className="bg-indigo-600 text-white p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"><Save size={18}/> Update</button>
//                   <button type="button" onClick={() => setIsSidebarOpen(false)} className="border-2 border-slate-100 dark:border-slate-800 p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest dark:text-white">Cancel</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // --- HELPER COMPONENTS (Same as previous) ---
// function StatCard({ title, value, icon, color, trend }: any) {
//   const colors: any = {
//     blue: "text-blue-600 bg-blue-600/10",
//     rose: "text-rose-600 bg-rose-600/10",
//     indigo: "text-indigo-600 bg-indigo-600/10",
//   };
//   return (
//     <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800/50 relative overflow-hidden group">
//       <div className="relative z-10">
//         <div className={`w-14 h-14 rounded-2xl ${colors[color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
//           {React.cloneElement(icon, { size: 24 })}
//         </div>
//         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
//         <h2 className="text-4xl font-black dark:text-white tracking-tighter italic">{value}</h2>
//         <p className="text-[10px] font-bold text-slate-400 mt-4 flex items-center gap-1 italic">{trend}</p>
//       </div>
//       <div className="absolute -right-4 -bottom-4 text-slate-50 dark:text-white/5 opacity-50 group-hover:scale-110 transition-transform duration-700">
//         {React.cloneElement(icon, { size: 120 })}
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const styles: any = {
//     Active: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20",
//     Pending: "text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20",
//     Suspended: "text-rose-600 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20",
//   };
//   return (
//     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest inline-flex items-center gap-2 ${styles[status]}`}>
//       <div className={`w-1.5 h-1.5 rounded-full animate-pulse bg-current`} /> {status}
//     </span>
//   );
// }

// function TimelineItem({ title, time, color }: any) {
//   const colors: any = { blue: "bg-blue-500", green: "bg-emerald-500", rose: "bg-rose-500" };
//   return (
//     <div className="flex items-center justify-between py-1 relative">
//        <div className={`absolute -left-[13px] w-2.5 h-2.5 rounded-full ${colors[color]} border-2 border-white dark:border-[#0f1117]`} />
//        <p className="text-[11px] font-bold dark:text-slate-200">{title}</p>
//        <p className="text-[10px] font-medium text-slate-400">{time}</p>
//     </div>
//   );
// }

// function InputGroup({ label, value }: any) {
//   return (
//     <div className="space-y-2">
//       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{label}</label>
//       <input defaultValue={value} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#080a0f] border-2 border-slate-50 dark:border-slate-800 dark:text-white outline-none focus:border-indigo-500 transition-all font-bold text-sm" />
//     </div>
//   );
// }


'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation'; // 1. Router import korlam
import { 
  Search, Filter, Plus, MoreVertical, Users, DollarSign, 
  Pencil, Trash2, ShieldAlert, X, Save, UserX, CheckCircle2, 
  Clock, ArrowUpDown, ChevronLeft, ChevronRight, Check, Minus,
  ExternalLink, Loader2, ShieldCheck
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- INITIAL DATA ---
const initialCustomers = [
  { id: 1, name: "Tanvir Ahmed", email: "tanvir@example.com", status: "Active", joined: "24 Oct 2025", spent: "$1,200", initial: "T", lastLogin: "2 hours ago" },
  { id: 2, name: "Rahat Karim", email: "rahat@example.com", status: "Pending", joined: "12 Nov 2025", spent: "$0.00", initial: "R", lastLogin: "Never" },
  { id: 3, name: "Nusrat Jahan", email: "nusrat@example.com", status: "Suspended", joined: "05 Jan 2026", spent: "$450", initial: "N", lastLogin: "3 days ago" },
  { id: 4, name: "Arif Hossain", email: "arif@example.com", status: "Active", joined: "10 Feb 2026", spent: "$890", initial: "A", lastLogin: "Just now" },
];

export default function CustomerAdminPage() {
  const router = useRouter(); // 2. Router initialize korlam
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);

  // --- LOGIC: FILTERING & SEARCH ---
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           c.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === "All" || c.status === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab, customers]);

  // --- IMPERSONATION HANDLER ---
  const handleImpersonate = (user: any) => {
    setIsSwitching(true);
    // Simulate complex login process
    setTimeout(() => {
      setIsSwitching(false);
      // 3. Ekhane Redirect logic /profile root e
      router.push('/profile'); 
    }, 2000);
  };

  // --- ACTIONS ---
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCustomers.length) setSelectedIds([]);
    else setSelectedIds(filteredCustomers.map(c => c.id));
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this user permanently?")) {
      setCustomers(customers.filter(c => c.id !== id));
      setSelectedIds(prev => prev.filter(i => i !== id));
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#05070a] p-4 md:p-10 space-y-8 font-sans transition-colors duration-500 relative">
      
      {/* 🚀 SECURITY SESSION OVERLAY */}
      {isSwitching && (
        <div className="fixed inset-0 z-[999] bg-[#05070a]/80 backdrop-blur-xl flex flex-col items-center justify-center text-white">
          <Loader2 className="w-14 h-14 text-indigo-500 animate-spin mb-6" />
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">Redirecting to <span className="text-indigo-500">Profile</span></h2>
          <p className="text-slate-400 font-bold text-xs mt-2 uppercase tracking-[0.4em]">Initializing User Matrix...</p>
        </div>
      )}

      {/* 1. TOP HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Users size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Admin Control</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
            Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Database</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-2 px-6 py-4 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 dark:text-white transition-all">
            <ArrowUpDown size={14} /> Export CSV
          </button>
          <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-indigo-200 dark:shadow-none active:scale-95">
            <Plus size={18} /> Add Member
          </button>
        </div>
      </div>

      {/* 2. STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={customers.length} icon={<Users />} color="blue" trend="+12% from last month" />
        <StatCard title="Suspended" value={customers.filter(c => c.status === 'Suspended').length} icon={<UserX />} color="rose" trend="Safety status" />
        <StatCard title="Total Revenue" value="$2,540" icon={<DollarSign />} color="indigo" trend="Current Quarter" />
      </div>

      {/* 3. MAIN CONTENT CARD */}
      <div className="bg-white dark:bg-[#0f1117] rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800/50 overflow-hidden">
        
        <div className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="flex bg-slate-100 dark:bg-[#080a0f] p-1.5 rounded-2xl w-full md:w-auto">
              {["All", "Active", "Suspended"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab 
                    ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm dark:text-white" 
                    : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search Identity..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-[#080a0f] dark:text-white outline-none focus:border-indigo-500/50 transition-all font-bold text-sm" 
              />
            </div>
          </div>

          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-500/10 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2">
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest ml-4">
                {selectedIds.length} users selected
              </span>
              <button className="p-2 text-rose-600 hover:bg-rose-100 rounded-xl transition-all" onClick={() => { if(confirm("Delete all?")) setCustomers(customers.filter(c => !selectedIds.includes(c.id))); setSelectedIds([]); }}>
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1000px]">
            <thead className="bg-slate-50/50 dark:bg-slate-900/50">
              <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black border-y border-slate-50 dark:border-slate-800">
                <th className="px-8 py-5">
                  <button onClick={toggleSelectAll} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedIds.length > 0 ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700'}`}>
                    {selectedIds.length === filteredCustomers.length ? <Check size={12} /> : selectedIds.length > 0 ? <Minus size={12} /> : null}
                  </button>
                </th>
                <th className="px-8 py-5">Customer Profile</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-center">Last Active</th>
                <th className="px-8 py-5">Revenue</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {filteredCustomers.map((user) => (
                <tr key={user.id} className={`group hover:bg-slate-50/80 dark:hover:bg-white/5 transition-all ${selectedIds.includes(user.id) ? 'bg-indigo-50/30 dark:bg-indigo-500/5' : ''}`}>
                  <td className="px-8 py-6">
                    <button onClick={() => toggleSelectOne(user.id)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedIds.includes(user.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700 group-hover:border-indigo-400'}`}>
                      {selectedIds.includes(user.id) && <Check size={12} />}
                    </button>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-950 flex items-center justify-center text-white font-black shadow-lg">
                        {user.initial}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 dark:text-slate-100 text-[15px]">{user.name}</p>
                        <p className="text-[11px] text-slate-400 font-bold">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-8 py-6 text-center text-[11px] font-bold text-slate-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-8 py-6 font-black text-slate-800 dark:text-slate-100 italic">{user.spent}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      
                      {/* Login Button */}
                      <button 
                        onClick={() => handleImpersonate(user)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                      >
                        <ExternalLink size={14} /> Login
                      </button>

                      <button onClick={() => {setSelectedCustomer(user); setIsSidebarOpen(true);}} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 rounded-xl shadow-sm border border-transparent hover:border-slate-100 transition-all">
                        <Pencil size={18} />
                      </button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all">
                            <MoreVertical size={20} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-60 rounded-2xl border-slate-100 dark:border-slate-800 shadow-2xl p-2">
                           <DropdownMenuItem onClick={() => handleImpersonate(user)} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-indigo-600 hover:bg-indigo-50"><ShieldCheck size={16}/> Impersonate User</DropdownMenuItem>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'Active')} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-emerald-600"><CheckCircle2 size={16}/> Activate</DropdownMenuItem>
                           <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'Suspended')} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-rose-600"><ShieldAlert size={16}/> Suspend</DropdownMenuItem>
                           <DropdownMenuItem onClick={() => handleDelete(user.id)} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-slate-500 hover:text-rose-600"><Trash2 size={16}/> Delete Account</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-8 border-t border-slate-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            Showing <span className="text-slate-900 dark:text-white">{filteredCustomers.length}</span> of {customers.length} results
          </p>
          <div className="flex gap-2">
            <button className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:text-white disabled:opacity-30" disabled><ChevronLeft size={18} /></button>
            <button className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest">1</button>
            <button className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:text-white disabled:opacity-30"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      {/* --- SIDEBAR EDIT --- */}
      {isSidebarOpen && selectedCustomer && (
        <>
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[99]" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed inset-y-4 right-4 w-full md:w-[500px] bg-white dark:bg-[#0f1117] shadow-2xl z-[100] rounded-[40px] p-10 border border-slate-100 dark:border-slate-800 animate-in slide-in-from-right-full duration-500">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white">Profile <span className="text-indigo-600">Review</span></h2>
              <button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-2xl hover:scale-110 transition-transform"><X size={20}/></button>
            </div>

            <div className="space-y-8 overflow-y-auto max-h-[75vh] pr-2 scrollbar-hide">
              <div className="bg-slate-50 dark:bg-[#080a0f] p-6 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-4">
                 <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-black">{selectedCustomer.initial}</div>
                 <div>
                   <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">Customer ID: #{selectedCustomer.id}042</p>
                   <h3 className="text-xl font-black dark:text-white">{selectedCustomer.name}</h3>
                 </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2"><Clock size={12}/> Recent Activity</p>
                <div className="space-y-3 pl-2 border-l-2 border-slate-100 dark:border-slate-800">
                   <TimelineItem title="Profile Updated" time="10 mins ago" color="blue" />
                   <TimelineItem title="Security Login" time="2 hours ago" color="green" />
                   <TimelineItem title="Password Changed" time="2 days ago" color="rose" />
                </div>
              </div>

              <form className="space-y-6">
                <InputGroup label="Full Identity" value={selectedCustomer.name} />
                <InputGroup label="Verified Email" value={selectedCustomer.email} />
                
                <button 
                  type="button" 
                  onClick={() => handleImpersonate(selectedCustomer)}
                  className="w-full bg-slate-900 dark:bg-indigo-600/10 text-white dark:text-indigo-400 p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all mt-4"
                >
                  <ShieldCheck size={18} /> Login as this user
                </button>

                <div className="pt-6 grid grid-cols-2 gap-4">
                  <button type="submit" className="bg-indigo-600 text-white p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"><Save size={18}/> Update</button>
                  <button type="button" onClick={() => setIsSidebarOpen(false)} className="border-2 border-slate-100 dark:border-slate-800 p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest dark:text-white">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// --- HELPER COMPONENTS ---
function StatCard({ title, value, icon, color, trend }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-600/10",
    rose: "text-rose-600 bg-rose-600/10",
    indigo: "text-indigo-600 bg-indigo-600/10",
  };
  return (
    <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800/50 relative overflow-hidden group">
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl ${colors[color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
          {React.cloneElement(icon, { size: 24 })}
        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <h2 className="text-4xl font-black dark:text-white tracking-tighter italic">{value}</h2>
        <p className="text-[10px] font-bold text-slate-400 mt-4 flex items-center gap-1 italic">{trend}</p>
      </div>
      <div className="absolute -right-4 -bottom-4 text-slate-50 dark:text-white/5 opacity-50 group-hover:scale-110 transition-transform duration-700">
        {React.cloneElement(icon, { size: 120 })}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Active: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20",
    Pending: "text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/20",
    Suspended: "text-rose-600 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20",
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest inline-flex items-center gap-2 ${styles[status]}`}>
      <div className={`w-1.5 h-1.5 rounded-full animate-pulse bg-current`} /> {status}
    </span>
  );
}

function TimelineItem({ title, time, color }: any) {
  const colors: any = { blue: "bg-blue-500", green: "bg-emerald-500", rose: "bg-rose-500" };
  return (
    <div className="flex items-center justify-between py-1 relative">
       <div className={`absolute -left-[13px] w-2.5 h-2.5 rounded-full ${colors[color]} border-2 border-white dark:border-[#0f1117]`} />
       <p className="text-[11px] font-bold dark:text-slate-200">{title}</p>
       <p className="text-[10px] font-medium text-slate-400">{time}</p>
    </div>
  );
}

function InputGroup({ label, value }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{label}</label>
      <input defaultValue={value} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#080a0f] border-2 border-slate-50 dark:border-slate-800 dark:text-white outline-none focus:border-indigo-500 transition-all font-bold text-sm" />
    </div>
  );
}