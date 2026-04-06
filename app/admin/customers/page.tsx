

// 'use client';

// import React, { useState, useMemo, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   Search, Users, DollarSign, Pencil, Trash2, ShieldAlert, X, Save, 
//   UserX, CheckCircle2, Loader2, ShieldCheck, ExternalLink, MoreVertical, Check, ArrowUpDown, Plus
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import API from '@/app/lib/api'; // আপনার তৈরি করা API ফাইল
// import { toast } from "sonner";

// export default function CustomerAdminPage() {
//   const router = useRouter();
//   const [customers, setCustomers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("All");
//   const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isSwitching, setIsSwitching] = useState(false);

//   // --- ১. ডাটা লোড করা ---
//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get('/auth/users');
//       // ব্যাকেন্ড ফরম্যাট অনুযায়ী ডাটা সেট করা
//       const data = Array.isArray(res.data) ? res.data : res.data.users || [];
//       setCustomers(data);
//     } catch (error: any) {
//       toast.error("ডাটা লোড করতে সমস্যা হয়েছে");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- ২. স্ট্যাটাস আপডেট ---
//   const handleStatusChange = async (id: string, newStatus: string) => {
//     try {
//       const res = await API.patch(`/auth/users/${id}/status`, { status: newStatus.toLowerCase() });
//       if (res.status === 200) {
//         setCustomers(prev => prev.map(c => c._id === id ? { ...c, status: newStatus.toLowerCase() } : c));
//         toast.success(`ইউজার এখন ${newStatus}`);
//       }
//     } catch (error) {
//       toast.error("আপডেট ব্যর্থ হয়েছে");
//     }
//   };

//   // --- ৩. ডিলিট ইউজার ---
//   const handleDelete = async (id: string) => {
//     if (!confirm("আপনি কি নিশ্চিত?")) return;
//     try {
//       await API.delete(`/auth/users/${id}`);
//       setCustomers(prev => prev.filter(c => c._id !== id));
//       toast.success("ইউজার ডিলিট হয়েছে");
//     } catch (error) {
//       toast.error("ডিলিট করা যায়নি");
//     }
//   };

//   // --- ৪. ইমপারসোনেট (Login as User) ---
//   const handleImpersonate = async (user: any) => {
//     setIsSwitching(true);
//     try {
//       const res = await API.post('/auth/login', { email: user.email, adminImpersonate: true });
//       if (res.data.token) {
//         localStorage.setItem('token', res.data.token);
//         toast.success("লগইন সফল, রিডাইরেক্ট হচ্ছে...");
//         router.push('/profile');
//       }
//     } catch (error) {
//       toast.error("লগইন করা যায়নি");
//       setIsSwitching(false);
//     }
//   };

//   // --- ৫. সার্চ এবং ফিল্টার ---
//   const filteredCustomers = useMemo(() => {
//     return customers.filter(c => {
//       const matchesSearch = c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                            c.email?.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesTab = activeTab === "All" || (c.status || "active").toLowerCase() === activeTab.toLowerCase();
//       return matchesSearch && matchesTab;
//     });
//   }, [searchQuery, activeTab, customers]);

//   if (loading) return (
//     <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc] dark:bg-[#05070a]">
//        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
//     </div>
//   );

//   return (
//     <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#05070a] p-4 md:p-10 space-y-8 relative">
      
//       {/* SECURITY OVERLAY */}
//       {isSwitching && (
//         <div className="fixed inset-0 z-[999] bg-[#05070a]/80 backdrop-blur-xl flex flex-col items-center justify-center text-white text-center">
//           <Loader2 className="w-14 h-14 text-indigo-500 animate-spin mb-6" />
//           <h2 className="text-3xl font-black italic uppercase">Redirecting to <span className="text-indigo-500">Profile</span></h2>
//         </div>
//       )}

//       {/* HEADER - ডিজাইন সেম রেখে ডাইনামিক করা */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//         <div>
//           <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
//             Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Database</span>
//           </h1>
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl active:scale-95">
//             <Plus size={18} /> Add Member
//           </button>
//         </div>
//       </div>

//       {/* STAT CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard title="Total Users" value={customers.length} icon={<Users />} color="blue" trend="Live database" />
//         <StatCard title="Suspended" value={customers.filter(c => c.status === 'suspended').length} icon={<UserX />} color="rose" trend="Blocked access" />
//         <StatCard title="Revenue" value="$2,540" icon={<DollarSign />} color="indigo" trend="Static Placeholder" />
//       </div>

//       {/* TABLE SECTION */}
//       <div className="bg-white dark:bg-[#0f1117] rounded-[40px] border border-slate-100 dark:border-slate-800/50 overflow-hidden shadow-2xl">
//         <div className="p-8 flex flex-col md:flex-row gap-6 justify-between items-center">
//           {/* TABS */}
//           <div className="flex bg-slate-100 dark:bg-[#080a0f] p-1.5 rounded-2xl">
//             {["All", "Active", "Suspended"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
//                   activeTab === tab ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm" : "text-slate-400"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* SEARCH */}
//           <div className="relative w-full md:w-96">
//             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//             <input 
//               type="text" 
//               placeholder="Search Identity..." 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50/50 dark:bg-[#080a0f] dark:text-white outline-none border-2 border-transparent focus:border-indigo-500/50 transition-all font-bold text-sm" 
//             />
//           </div>
//         </div>

//         {/* TABLE BODY */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-left min-w-[1000px]">
//             <thead className="bg-slate-50/50 dark:bg-slate-900/50">
//               <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black border-y border-slate-50 dark:border-slate-800">
//                 <th className="px-8 py-5"># ID</th>
//                 <th className="px-8 py-5">Customer Profile</th>
//                 <th className="px-8 py-5">Status</th>
//                 <th className="px-8 py-5 text-center">Joined</th>
//                 <th className="px-8 py-5 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
//               {filteredCustomers.map((user) => (
//                 <tr key={user._id || user.id} className="group hover:bg-slate-50/80 dark:hover:bg-white/5 transition-all">
//                   <td className="px-8 py-6 text-slate-300 font-bold text-xs">{user._id?.slice(-4) || '...'}</td>
//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black">
//                         {user.name?.charAt(0)}
//                       </div>
//                       <div>
//                         <p className="font-black text-slate-800 dark:text-slate-100 text-[15px]">{user.name}</p>
//                         <p className="text-[11px] text-slate-400 font-bold">{user.email}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-8 py-6">
//                     <StatusBadge status={user.status || "active"} />
//                   </td>
//                   <td className="px-8 py-6 text-center text-[11px] font-bold text-slate-500">
//                     {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
//                   </td>
//                   <td className="px-8 py-6 text-right">
//                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
//                       <button 
//                         onClick={() => handleImpersonate(user)}
//                         className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
//                       >
//                          Login
//                       </button>
//                       <button onClick={() => {setSelectedCustomer(user); setIsSidebarOpen(true);}} className="p-2.5 text-slate-400 hover:text-indigo-600 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
//                         <Pencil size={18} />
//                       </button>
                      
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <button className="p-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
//                             <MoreVertical size={20} />
//                           </button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-60 rounded-2xl p-2 bg-white dark:bg-[#0f1117]">
//                           <DropdownMenuItem onClick={() => handleStatusChange(user._id, 'active')} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-emerald-600"><CheckCircle2 size={16}/> Activate</DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => handleStatusChange(user._id, 'suspended')} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-rose-600"><ShieldAlert size={16}/> Suspend</DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem onClick={() => handleDelete(user._id)} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-slate-500 hover:text-rose-600"><Trash2 size={16}/> Permanent Delete</DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* SIDEBAR EDIT */}
//       {isSidebarOpen && selectedCustomer && (
//         <>
//           <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[99]" onClick={() => setIsSidebarOpen(false)} />
//           <div className="fixed inset-y-4 right-4 w-full md:w-[500px] bg-white dark:bg-[#0f1117] shadow-2xl z-[100] rounded-[40px] p-10 border border-slate-100 dark:border-slate-800 animate-in slide-in-from-right-full">
//             <div className="flex items-center justify-between mb-10">
//               <h2 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white">Profile <span className="text-indigo-600">Review</span></h2>
//               <button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-2xl"><X size={20}/></button>
//             </div>

//             <form className="space-y-6">
//               <InputGroup label="Full Name" value={selectedCustomer.name} />
//               <InputGroup label="Email Address" value={selectedCustomer.email} />
//               <div className="pt-6 grid grid-cols-2 gap-4">
//                 <button type="button" className="bg-indigo-600 text-white p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"><Save size={18}/> Update Info</button>
//                 <button type="button" onClick={() => setIsSidebarOpen(false)} className="border-2 border-slate-100 dark:border-slate-800 p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest dark:text-white">Cancel</button>
//               </div>
//             </form>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // --- হেল্পার কম্পোনেন্ট ---
// function StatCard({ title, value, icon, color, trend }: any) {
//   const colors: any = {
//     blue: "text-blue-600 bg-blue-600/10",
//     rose: "text-rose-600 bg-rose-600/10",
//     indigo: "text-indigo-600 bg-indigo-600/10",
//   };
//   return (
//     <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800/50">
//       <div className={`w-14 h-14 rounded-2xl ${colors[color]} flex items-center justify-center mb-6`}>
//         {React.cloneElement(icon, { size: 24 })}
//       </div>
//       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
//       <h2 className="text-4xl font-black dark:text-white tracking-tighter italic">{value}</h2>
//       <p className="text-[10px] font-bold text-slate-400 mt-4 italic">{trend}</p>
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const isSuspended = status.toLowerCase() === 'suspended';
//   return (
//     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest inline-flex items-center gap-2 ${
//       isSuspended ? "text-rose-600 bg-rose-50 border-rose-100" : "text-emerald-600 bg-emerald-50 border-emerald-100"
//     }`}>
//       <div className={`w-1.5 h-1.5 rounded-full animate-pulse bg-current`} /> {status}
//     </span>
//   );
// }

// function InputGroup({ label, value }: any) {
//   return (
//     <div className="space-y-2">
//       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{label}</label>
//       <input defaultValue={value} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#080a0f] border-2 border-transparent dark:text-white outline-none focus:border-indigo-500 transition-all font-bold text-sm" />
//     </div>
//   );
// }







// 'use client';

// import React, { useState, useMemo, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   Search, Users, DollarSign, Pencil, Trash2, ShieldAlert, X, Save, 
//   UserX, CheckCircle2, Loader2, ShieldCheck, ExternalLink, MoreVertical, Plus
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import API from '@/app/lib/api'; 
// import { toast } from "sonner";

// export default function CustomerAdminPage() {
//   const router = useRouter();
//   const [customers, setCustomers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("All");
//   const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isSwitching, setIsSwitching] = useState(false);

//   // --- ডাটা লোড করা ---
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         setLoading(true);
//         const res = await API.get('/auth/users');
//         const data = Array.isArray(res.data) ? res.data : res.data.users || [];
//         setCustomers(data);
//       } catch (error) {
//         toast.error("ডাটা লোড হয়নি");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   // --- অ্যাকশন ফাংশনস ---
//   const handleStatusChange = async (id: string, newStatus: string) => {
//     try {
//       await API.patch(`/auth/users/${id}/status`, { status: newStatus.toLowerCase() });
//       setCustomers(prev => prev.map(c => c._id === id ? { ...c, status: newStatus.toLowerCase() } : c));
//       toast.success(`User is now ${newStatus}`);
//     } catch (error) {
//       toast.error("আপডেট ব্যর্থ");
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this user permanently?")) return;
//     try {
//       await API.delete(`/auth/users/${id}`);
//       setCustomers(prev => prev.filter(c => c._id !== id));
//       toast.success("ইউজার ডিলিট হয়েছে");
//     } catch (error) {
//       toast.error("ডিলিট করা যায়নি");
//     }
//   };

//   const handleImpersonate = async (user: any) => {
//     setIsSwitching(true);
//     try {
//       const res = await API.post('/auth/login', { email: user.email, adminImpersonate: true });
//       if (res.data.token) {
//         localStorage.setItem('token', res.data.token);
//         router.push('/profile');
//       }
//     } catch (error) {
//       toast.error("লগইন করা যায়নি");
//       setIsSwitching(false);
//     }
//   };

//   // --- ফিল্টারিং ---
//   const filteredCustomers = useMemo(() => {
//     return customers.filter(c => {
//       const matchesSearch = c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                            c.email?.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesTab = activeTab === "All" || (c.status || "active").toLowerCase() === activeTab.toLowerCase();
//       return matchesSearch && matchesTab;
//     });
//   }, [searchQuery, activeTab, customers]);

//   if (loading) return (
//     <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc] dark:bg-[#05070a]">
//        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
//     </div>
//   );

//   return (
//     <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#05070a] p-4 md:p-10 space-y-8 relative overflow-hidden">
      
//       {/* 🚀 LOGIN OVERLAY */}
//       {isSwitching && (
//         <div className="fixed inset-0 z-[999] bg-[#05070a]/80 backdrop-blur-xl flex flex-col items-center justify-center text-white">
//           <Loader2 className="w-14 h-14 text-indigo-500 animate-spin mb-6" />
//           <h2 className="text-3xl font-black italic uppercase">Redirecting...</h2>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//         <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
//           Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Database</span>
//         </h1>
//         <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl active:scale-95">
//           <Plus size={18} /> Add Member
//         </button>
//       </div>

//       {/* STAT CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard title="Total Users" value={customers.length} icon={<Users />} color="blue" />
//         <StatCard title="Suspended" value={customers.filter(c => c.status === 'suspended').length} icon={<UserX />} color="rose" />
//         <StatCard title="Revenue" value="$2,540" icon={<DollarSign />} color="indigo" />
//       </div>

//       {/* SEARCH & TABS */}
//       <div className="bg-white dark:bg-[#0f1117] rounded-[40px] border border-slate-100 dark:border-slate-800/50 overflow-hidden shadow-2xl">
//         <div className="p-8 flex flex-col md:flex-row gap-6 justify-between items-center">
//           <div className="flex bg-slate-100 dark:bg-[#080a0f] p-1.5 rounded-2xl">
//             {["All", "Active", "Suspended"].map((tab) => (
//               <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm" : "text-slate-400"}`}>
//                 {tab}
//               </button>
//             ))}
//           </div>
//           <div className="relative w-full md:w-96">
//             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//             <input type="text" placeholder="Search Identity..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50/50 dark:bg-[#080a0f] dark:text-white outline-none border-2 border-transparent focus:border-indigo-500/50 transition-all font-bold text-sm" />
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-left min-w-[1000px]">
//             <thead className="bg-slate-50/50 dark:bg-slate-900/50">
//               <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black border-y border-slate-50 dark:border-slate-800">
//                 <th className="px-8 py-5"># ID</th>
//                 <th className="px-8 py-5">Customer Profile</th>
//                 <th className="px-8 py-5">Status</th>
//                 <th className="px-8 py-5 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
//               {filteredCustomers.map((user) => (
//                 <tr key={user._id} className="group hover:bg-slate-50/80 dark:hover:bg-white/5 transition-all">
//                   <td className="px-8 py-6 text-slate-300 font-bold text-xs">{user._id?.slice(-5).toUpperCase()}</td>
//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black">{user.name?.charAt(0)}</div>
//                       <div>
//                         <p className="font-black text-slate-800 dark:text-slate-100 text-[15px]">{user.name}</p>
//                         <p className="text-[11px] text-slate-400 font-bold">{user.email}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-8 py-6">
//                     <StatusBadge status={user.status || "active"} />
//                   </td>
//                   <td className="px-8 py-6 text-right">
//                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
//                       <button onClick={() => {setSelectedCustomer(user); setIsSidebarOpen(true);}} className="p-2.5 text-slate-400 hover:text-indigo-600 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100">
//                         <Pencil size={18} />
//                       </button>
                      
//                       {/* ACTION DROPDOWN (Matches your image) */}
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <button className="p-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
//                             <MoreVertical size={20} />
//                           </button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 bg-white dark:bg-[#0f1117] border-slate-100 dark:border-slate-800 shadow-2xl">
//                           <DropdownMenuItem onClick={() => handleImpersonate(user)} className="rounded-xl gap-3 font-bold text-xs p-3 cursor-pointer text-indigo-600">
//                             <ShieldCheck size={18}/> Impersonate User
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem onClick={() => handleStatusChange(user._id, 'active')} className="rounded-xl gap-3 font-bold text-xs p-3 cursor-pointer text-emerald-600">
//                             <CheckCircle2 size={18}/> Activate
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => handleStatusChange(user._id, 'suspended')} className="rounded-xl gap-3 font-bold text-xs p-3 cursor-pointer text-rose-600">
//                             <ShieldAlert size={18}/> Suspend
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => handleDelete(user._id)} className="rounded-xl gap-3 font-bold text-xs p-3 cursor-pointer text-slate-500">
//                             <Trash2 size={18}/> Delete Account
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
//       </div>

//       {/* 🛠 SIDEBAR POPUP (Matches image_563662.png) */}
//       {isSidebarOpen && selectedCustomer && (
//         <>
//           <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[99]" onClick={() => setIsSidebarOpen(false)} />
//           <div className="fixed inset-y-4 right-4 w-full md:w-[480px] bg-white dark:bg-[#0f1117] shadow-2xl z-[100] rounded-[40px] p-8 border border-slate-100 dark:border-slate-800 animate-in slide-in-from-right-full duration-500 flex flex-col">
            
//             {/* Header */}
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white">Profile <span className="text-indigo-600">Review</span></h2>
//               <button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-2xl hover:scale-110 transition-transform"><X size={20}/></button>
//             </div>

//             {/* User ID Card */}
//             <div className="bg-slate-50 dark:bg-[#080a0f] p-6 rounded-[30px] border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-5 mb-10">
//                 <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-indigo-200">
//                   {selectedCustomer.name?.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Database ID: {selectedCustomer._id?.slice(-6).toUpperCase()}</p>
//                   <h3 className="text-2xl font-black dark:text-white tracking-tight">{selectedCustomer.name}</h3>
//                 </div>
//             </div>

//             {/* Form Fields */}
//             <div className="space-y-6 flex-1">
//               <InputGroup label="Full Identity" value={selectedCustomer.name} />
//               <InputGroup label="Verified Email" value={selectedCustomer.email} />
              
//               <button 
//                 onClick={() => handleImpersonate(selectedCustomer)}
//                 className="w-full bg-[#0f172a] text-white p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl"
//               >
//                 <ShieldCheck size={18} /> Login as this user
//               </button>
//             </div>

//             {/* Bottom Buttons */}
//             <div className="pt-8 grid grid-cols-2 gap-4">
//               <button className="bg-indigo-600 text-white p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
//                 <Save size={18}/> Update
//               </button>
//               <button onClick={() => setIsSidebarOpen(false)} className="border-2 border-slate-100 dark:border-slate-800 p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest dark:text-white hover:bg-slate-50">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // --- হেল্পার কম্পোনেন্ট ---
// function StatCard({ title, value, icon, color }: any) {
//   const colors: any = {
//     blue: "text-blue-600 bg-blue-600/10",
//     rose: "text-rose-600 bg-rose-600/10",
//     indigo: "text-indigo-600 bg-indigo-600/10",
//   };
//   return (
//     <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800/50">
//       <div className={`w-14 h-14 rounded-2xl ${colors[color]} flex items-center justify-center mb-6`}>
//         {React.cloneElement(icon, { size: 24 })}
//       </div>
//       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
//       <h2 className="text-4xl font-black dark:text-white tracking-tighter italic">{value}</h2>
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const isSuspended = status.toLowerCase() === 'suspended';
//   return (
//     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest inline-flex items-center gap-2 ${
//       isSuspended ? "text-rose-600 bg-rose-50 border-rose-100" : "text-emerald-600 bg-emerald-50 border-emerald-100"
//     }`}>
//       <div className={`w-1.5 h-1.5 rounded-full animate-pulse bg-current`} /> {status}
//     </span>
//   );
// }

// function InputGroup({ label, value }: any) {
//   return (
//     <div className="space-y-2">
//       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{label}</label>
//       <input 
//         defaultValue={value} 
//         readOnly
//         className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-[#080a0f] border-2 border-transparent dark:text-white outline-none focus:border-indigo-500 transition-all font-bold text-sm" 
//       />
//     </div>
//   );
// }


// 'use client';

// import React, { useState, useMemo, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   Search, Plus, MoreVertical, Users, DollarSign, 
//   Pencil, Trash2, ShieldAlert, X, Save, UserX, CheckCircle2, 
//   Clock, ArrowUpDown, ChevronLeft, ChevronRight, Check, Minus,
//   ExternalLink, Loader2, ShieldCheck
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import API from '@/app/lib/api'; // আপনার API instance import করুন
// import { toast } from "sonner";

// export default function CustomerAdminPage() {
//   const router = useRouter();
//   const [customers, setCustomers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("All");
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isSwitching, setIsSwitching] = useState(false);

//   // --- ১. ব্যাকেন্ড থেকে ডাটা আনা (FETCH DATA) ---
//   const fetchCustomers = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get('/auth/users'); // আপনার ইউজার লিস্টের এন্ডপয়েন্ট
//       const data = Array.isArray(res.data) ? res.data : res.data.users || [];
//       setCustomers(data);
//     } catch (error) {
//       toast.error("ডাটা লোড করতে সমস্যা হয়েছে");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   // --- ২. ইমপারসোনেশন (LOGIN AS USER) ---
//   const handleImpersonate = async (user: any) => {
//     setIsSwitching(true);
//     try {
//       // আপনার ব্যাকেন্ডে একটি এন্ডপয়েন্ট লাগবে যা এডমিনকে টোকেন দিবে ইউজারের জন্য
//       const res = await API.post('/auth/admin/impersonate', { userId: user._id });
//       if (res.data.token) {
//         localStorage.setItem('token', res.data.token); // ইউজারের টোকেন সেট করা
//         toast.success(`${user.name} হিসেবে লগইন হচ্ছে...`);
//         router.push('/profile'); // প্রোফাইল পেজে রিডাইরেক্ট
//       }
//     } catch (error) {
//       toast.error("লগইন করা সম্ভব হয়নি");
//       setIsSwitching(false);
//     }
//   };

//   // --- ৩. স্ট্যাটাস আপডেট (ACTIVATE/SUSPEND) ---
//   const handleStatusChange = async (id: string, newStatus: string) => {
//     try {
//       await API.patch(`/auth/users/${id}/status`, { status: newStatus.toLowerCase() });
//       setCustomers(prev => prev.map(c => c._id === id ? { ...c, status: newStatus } : c));
//       toast.success(`User is now ${newStatus}`);
//     } catch (error) {
//       toast.error("আপডেট ব্যর্থ হয়েছে");
//     }
//   };

//   // --- ৪. ইউজার ডিলিট (DELETE USER) ---
//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure? This cannot be undone.")) return;
//     try {
//       await API.delete(`/auth/users/${id}`);
//       setCustomers(prev => prev.filter(c => c._id !== id));
//       toast.success("ইউজার ডিলিট করা হয়েছে");
//     } catch (error) {
//       toast.error("ডিলিট করা যায়নি");
//     }
//   };

//   // --- ৫. সাইডবার থেকে আপডেট (UPDATE USER) ---
//   const handleUpdateUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData(e.target as HTMLFormElement);
//     const updatedData = {
//       name: formData.get('name'),
//       email: formData.get('email'),
//     };

//     try {
//       await API.put(`/auth/users/${selectedCustomer._id}`, updatedData);
//       setCustomers(prev => prev.map(c => c._id === selectedCustomer._id ? { ...c, ...updatedData } : c));
//       setIsSidebarOpen(false);
//       toast.success("প্রোফাইল আপডেট হয়েছে");
//     } catch (error) {
//       toast.error("আপডেট করা যায়নি");
//     }
//   };

//   // --- ফিল্টারিং লজিক ---
//   const filteredCustomers = useMemo(() => {
//     return customers.filter(c => {
//       const matchesSearch = c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                            c.email?.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesTab = activeTab === "All" || (c.status || "Active").toLowerCase() === activeTab.toLowerCase();
//       return matchesSearch && matchesTab;
//     });
//   }, [searchQuery, activeTab, customers]);

//   // মাল্টিপল সিলেক্ট লজিক (ID string হিসেবে)
//   const toggleSelectAll = () => {
//     if (selectedIds.length === filteredCustomers.length) setSelectedIds([]);
//     else setSelectedIds(filteredCustomers.map(c => c._id));
//   };

//   const toggleSelectOne = (id: string) => {
//     setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
//   };

//   if (loading) return (
//     <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc] dark:bg-[#05070a]">
//        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
//     </div>
//   );

//   return (
//     <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#05070a] p-4 md:p-10 space-y-8 font-sans transition-colors duration-500 relative">
      
//       {/* 🚀 LOGIN OVERLAY */}
//       {isSwitching && (
//         <div className="fixed inset-0 z-[999] bg-[#05070a]/80 backdrop-blur-xl flex flex-col items-center justify-center text-white">
//           <Loader2 className="w-14 h-14 text-indigo-500 animate-spin mb-6" />
//           <h2 className="text-3xl font-black italic uppercase tracking-tighter">Redirecting...</h2>
//         </div>
//       )}

//       {/* HEADER সেকশন আপনার ডিজাইন অনুযায়ী */}
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
//           <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 shadow-xl">
//             <Plus size={18} /> Add Member
//           </button>
//         </div>
//       </div>

//       {/* STAT CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard title="Total Users" value={customers.length} icon={<Users />} color="blue" trend="Live database" />
//         <StatCard title="Suspended" value={customers.filter(c => c.status === 'suspended').length} icon={<UserX />} color="rose" trend="Safety status" />
//         <StatCard title="Revenue" value="$2,540" icon={<DollarSign />} color="indigo" trend="Current Quarter" />
//       </div>

//       {/* TABLE SECTION */}
//       <div className="bg-white dark:bg-[#0f1117] rounded-[40px] shadow-2xl border border-slate-100 dark:border-slate-800/50 overflow-hidden">
        
//         {/* Search & Tabs */}
//         <div className="p-8 flex flex-col md:flex-row gap-6 justify-between items-center">
//           <div className="flex bg-slate-100 dark:bg-[#080a0f] p-1.5 rounded-2xl">
//             {["All", "Active", "Suspended"].map((tab) => (
//               <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm" : "text-slate-400"}`}>
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="relative w-full md:w-96">
//             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//             <input type="text" placeholder="Search Identity..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50/50 dark:bg-[#080a0f] dark:text-white outline-none border-2 border-transparent focus:border-indigo-500/50 transition-all font-bold text-sm" />
//           </div>
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
//                 <th className="px-8 py-5 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
//               {filteredCustomers.map((user) => (
//                 <tr key={user._id} className="group hover:bg-slate-50/80 dark:hover:bg-white/5 transition-all">
//                   <td className="px-8 py-6">
//                     <button onClick={() => toggleSelectOne(user._id)} className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedIds.includes(user._id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'}`}>
//                       {selectedIds.includes(user._id) && <Check size={12} />}
//                     </button>
//                   </td>
//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black">{user.name?.charAt(0)}</div>
//                       <div>
//                         <p className="font-black text-slate-800 dark:text-slate-100 text-[15px]">{user.name}</p>
//                         <p className="text-[11px] text-slate-400 font-bold">{user.email}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-8 py-6">
//                     <StatusBadge status={user.status || "Active"} />
//                   </td>
//                   <td className="px-8 py-6 text-right">
//                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
//                       <button onClick={() => handleImpersonate(user)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
//                         <ExternalLink size={14} /> Login
//                       </button>
//                       <button onClick={() => {setSelectedCustomer(user); setIsSidebarOpen(true);}} className="p-2.5 text-slate-400 hover:text-indigo-600">
//                         <Pencil size={18} />
//                       </button>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <button className="p-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white"><MoreVertical size={20} /></button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-60 rounded-2xl p-2 bg-white dark:bg-[#0f1117] shadow-2xl">
//                            <DropdownMenuItem onClick={() => handleImpersonate(user)} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-indigo-600"><ShieldCheck size={16}/> Impersonate User</DropdownMenuItem>
//                            <DropdownMenuSeparator />
//                            <DropdownMenuItem onClick={() => handleStatusChange(user._id, 'Active')} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-emerald-600"><CheckCircle2 size={16}/> Activate</DropdownMenuItem>
//                            <DropdownMenuItem onClick={() => handleStatusChange(user._id, 'Suspended')} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-rose-600"><ShieldAlert size={16}/> Suspend</DropdownMenuItem>
//                            <DropdownMenuItem onClick={() => handleDelete(user._id)} className="rounded-xl gap-2 font-bold text-xs p-3 cursor-pointer text-slate-500"><Trash2 size={16}/> Delete Account</DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- SIDEBAR পপআপ --- */}
//       {isSidebarOpen && selectedCustomer && (
//         <>
//           <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[99]" onClick={() => setIsSidebarOpen(false)} />
//           <div className="fixed inset-y-4 right-4 w-full md:w-[500px] bg-white dark:bg-[#0f1117] shadow-2xl z-[100] rounded-[40px] p-10 border border-slate-100 dark:border-slate-800 animate-in slide-in-from-right-full">
//             <div className="flex items-center justify-between mb-10">
//               <h2 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white">Profile <span className="text-indigo-600">Review</span></h2>
//               <button onClick={() => setIsSidebarOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-2xl"><X size={20}/></button>
//             </div>

//             <div className="bg-slate-50 dark:bg-[#080a0f] p-6 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-4 mb-8">
//                 <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-black">{selectedCustomer.name?.charAt(0)}</div>
//                 <div>
//                   <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">ID: #{selectedCustomer._id?.slice(-5)}</p>
//                   <h3 className="text-xl font-black dark:text-white">{selectedCustomer.name}</h3>
//                 </div>
//             </div>

//             <form onSubmit={handleUpdateUser} className="space-y-6">
//               <InputGroup label="Full Identity" name="name" defaultValue={selectedCustomer.name} />
//               <InputGroup label="Verified Email" name="email" defaultValue={selectedCustomer.email} />
              
//               <button type="button" onClick={() => handleImpersonate(selectedCustomer)} className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 mt-4">
//                 <ShieldCheck size={18} /> Login as this user
//               </button>

//               <div className="pt-6 grid grid-cols-2 gap-4">
//                 <button type="submit" className="bg-indigo-600 text-white p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"><Save size={18}/> Update</button>
//                 <button type="button" onClick={() => setIsSidebarOpen(false)} className="border-2 border-slate-100 dark:border-slate-800 p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest dark:text-white">Cancel</button>
//               </div>
//             </form>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // --- হেল্পার কম্পোনেন্ট ---
// function StatCard({ title, value, icon, color, trend }: any) {
//   const colors: any = {
//     blue: "text-blue-600 bg-blue-600/10",
//     rose: "text-rose-600 bg-rose-600/10",
//     indigo: "text-indigo-600 bg-indigo-600/10",
//   };
//   return (
//     <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800/50">
//       <div className={`w-14 h-14 rounded-2xl ${colors[color]} flex items-center justify-center mb-6`}>
//         {React.cloneElement(icon, { size: 24 })}
//       </div>
//       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
//       <h2 className="text-4xl font-black dark:text-white tracking-tighter italic">{value}</h2>
//       <p className="text-[10px] font-bold text-slate-400 mt-4 italic">{trend}</p>
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const isSuspended = status.toLowerCase() === 'suspended';
//   return (
//     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest inline-flex items-center gap-2 ${
//       isSuspended ? "text-rose-600 bg-rose-50 border-rose-100" : "text-emerald-600 bg-emerald-50 border-emerald-100"
//     }`}>
//       <div className={`w-1.5 h-1.5 rounded-full animate-pulse bg-current`} /> {status}
//     </span>
//   );
// }

// function InputGroup({ label, name, defaultValue }: any) {
//   return (
//     <div className="space-y-2">
//       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{label}</label>
//       <input name={name} defaultValue={defaultValue} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#080a0f] border-2 border-slate-50 dark:border-slate-800 dark:text-white outline-none focus:border-indigo-500 transition-all font-bold text-sm" />
//     </div>
//   );
// }





// 'use client';

// import React, { useState, useMemo, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   Search, Plus, MoreVertical, Users, DollarSign, 
//   Pencil, Trash2, ShieldAlert, X, Save, UserX, CheckCircle2, 
//   Clock, ArrowUpDown, ChevronLeft, ChevronRight, Check, Minus,
//   ExternalLink, Loader2, ShieldCheck, Eye
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import API from '@/app/lib/api'; 
// import { toast } from "sonner";

// export default function CustomerAdminPage() {
//   const router = useRouter();
//   const [customers, setCustomers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("All");
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isSwitching, setIsSwitching] = useState(false);

//   // --- ১. ব্যাকেন্ড থেকে ডাটা ফেচ করা ---
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         setLoading(true);
//         const res = await API.get('/auth/users'); 
//         const data = Array.isArray(res.data) ? res.data : res.data.users || [];
//         setCustomers(data);
//       } catch (error) {
//         toast.error("ডাটাবেসের সাথে কানেক্ট করা যাচ্ছে না");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   // --- ২. ফিক্সড লগইন লজিক (IMPERSONATION) ---
//   const handleImpersonate = async (user: any) => {
//     setIsSwitching(true);
//     try {
//       // ব্যাকেন্ডে এই এন্ডপয়েন্টটি নিশ্চিত করুন। এটি অ্যাডমিনকে ওই ইউজারের টোকেন দিবে।
//       const res = await API.post(`/auth/admin/switch-user/${user._id}`);
      
//       if (res.data.success && res.data.token) {
//         // বর্তমান অ্যাডমিন টোকেন চাইলে আলাদা রাখতে পারেন, অথবা ইউজারের টোকেন দিয়ে রিপ্লেস করুন
//         localStorage.setItem('token', res.data.token); 
        
//         toast.success(`${user.name} হিসেবে লগইন সফল!`);
        
//         // রিডাইরেক্ট করার আগে সামান্য ডিলে যাতে ইউজার এনিমেশন দেখে
//         setTimeout(() => {
//           router.push('/profile');
//           router.refresh(); // পেজ রিফ্রেশ করে নতুন টোকেন অ্যাপ্লাই করা
//         }, 1500);
//       } else {
//         throw new Error("Token not found");
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "লগইন লজিক কাজ করছে না। সার্ভার চেক করুন।");
//       setIsSwitching(false);
//     }
//   };

//   // --- ৩. অন্যান্য অ্যাকশনস ---
//   const handleStatusUpdate = async (id: string, status: string) => {
//     try {
//       await API.patch(`/auth/users/${id}/status`, { status });
//       setCustomers(prev => prev.map(c => c._id === id ? { ...c, status } : c));
//       toast.success(`User status: ${status}`);
//     } catch (err) {
//       toast.error("আপডেট করা যায়নি");
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure?")) return;
//     try {
//       await API.delete(`/auth/users/${id}`);
//       setCustomers(prev => prev.filter(c => c._id !== id));
//       toast.success("User deleted");
//     } catch (err) {
//       toast.error("ডিলিট করা যায়নি");
//     }
//   };

//   // --- ফিল্টারিং ---
//   const filteredCustomers = useMemo(() => {
//     return customers.filter(c => {
//       const matchesSearch = c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                            c.email?.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesTab = activeTab === "All" || (c.status || "active").toLowerCase() === activeTab.toLowerCase();
//       return matchesSearch && matchesTab;
//     });
//   }, [searchQuery, activeTab, customers]);

//   if (loading) return (
//     <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc] dark:bg-[#05070a]">
//        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
//     </div>
//   );

//   return (
//     <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#05070a] p-4 md:p-10 space-y-8 font-sans relative overflow-hidden">
      
//       {/* 🚀 LOGIN ANIMATION OVERLAY */}
//       {isSwitching && (
//         <div className="fixed inset-0 z-[999] bg-slate-900/90 backdrop-blur-2xl flex flex-col items-center justify-center text-white">
//           <div className="relative">
//             <Loader2 className="w-20 h-20 text-indigo-500 animate-spin" />
//             <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-8 h-8" />
//           </div>
//           <h2 className="text-3xl font-black italic uppercase mt-8 tracking-tighter">Initializing <span className="text-indigo-500">Session</span></h2>
//           <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em] mt-2">Accessing secure user matrix...</p>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//         <div className="space-y-1">
//           <div className="flex items-center gap-2">
//             <span className="w-8 h-[2px] bg-indigo-600"></span>
//             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Enterprise Control</span>
//           </div>
//           <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
//             User <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Intelligence</span>
//           </h1>
//         </div>
//         <button className="group flex items-center gap-3 bg-slate-900 dark:bg-indigo-600 hover:scale-105 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-2xl active:scale-95">
//           <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Member
//         </button>
//       </div>

//       {/* STAT CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <StatCard title="Active Network" value={customers.length} icon={<Users />} color="indigo" />
//         <StatCard title="Restricted" value={customers.filter(c => c.status === 'suspended').length} icon={<ShieldAlert />} color="rose" />
//         <StatCard title="Net Growth" value="14.5%" icon={<DollarSign />} color="emerald" />
//       </div>

//       {/* SEARCH & TABLE CONTAINER */}
//       <div className="bg-white/70 dark:bg-[#0f1117]/70 backdrop-blur-md rounded-[48px] border border-white dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
//         <div className="p-10 flex flex-col md:flex-row gap-8 justify-between items-center">
//           <div className="flex bg-slate-100/50 dark:bg-black/20 p-1.5 rounded-3xl border border-slate-200 dark:border-slate-800">
//             {["All", "Active", "Suspended"].map((tab) => (
//               <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xl" : "text-slate-400"}`}>
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="relative w-full md:w-[400px] group">
//             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
//             <input type="text" placeholder="Scan Database..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-16 pr-8 py-5 rounded-[24px] bg-white dark:bg-black/20 dark:text-white outline-none border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500/50 transition-all font-bold text-sm shadow-inner" />
//           </div>
//         </div>

//         <div className="overflow-x-auto px-4 pb-10">
//           <table className="w-full text-left min-w-[1000px] border-separate border-spacing-y-3">
//             <thead>
//               <tr className="text-slate-400 text-[10px] uppercase tracking-[0.25em] font-black italic">
//                 <th className="px-8 py-4">ID Reference</th>
//                 <th className="px-8 py-4">Identity</th>
//                 <th className="px-8 py-4">Status</th>
//                 <th className="px-8 py-4 text-right">Operational Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCustomers.map((user) => (
//                 <tr key={user._id} className="group bg-white dark:bg-slate-900/40 hover:bg-indigo-50 dark:hover:bg-indigo-500/5 transition-all duration-300 rounded-3xl shadow-sm border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/20">
//                   <td className="px-8 py-6 first:rounded-l-[24px]">
//                     <span className="font-mono text-[11px] font-bold text-slate-400 bg-slate-50 dark:bg-black/30 px-3 py-1.5 rounded-xl">
//                       #{user._id?.slice(-6).toUpperCase()}
//                     </span>
//                   </td>
//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-4">
//                       <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-200 dark:shadow-none">
//                         {user.name?.charAt(0)}
//                       </div>
//                       <div>
//                         <p className="font-black text-slate-800 dark:text-white text-lg tracking-tight">{user.name}</p>
//                         <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1"><Clock size={12}/> {user.email}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-8 py-6">
//                     <StatusBadge status={user.status || "active"} />
//                   </td>
//                   <td className="px-8 py-6 text-right last:rounded-r-[24px]">
//                     <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
//                       <button onClick={() => handleImpersonate(user)} className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg">
//                         <Eye size={14} /> View Profile
//                       </button>
//                       <button onClick={() => {setSelectedCustomer(user); setIsSidebarOpen(true);}} className="p-3 text-slate-400 hover:text-indigo-600 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
//                         <Pencil size={18} />
//                       </button>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <button className="p-3 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"><MoreVertical size={20} /></button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-64 rounded-[24px] p-3 bg-white dark:bg-[#0f1117] border-slate-100 dark:border-slate-800 shadow-2xl">
//                            <DropdownMenuItem onClick={() => handleImpersonate(user)} className="rounded-xl gap-3 font-bold text-xs p-4 cursor-pointer text-indigo-600 hover:bg-indigo-50"><ShieldCheck size={18}/> Impersonate Access</DropdownMenuItem>
//                            <DropdownMenuSeparator />
//                            <DropdownMenuItem onClick={() => handleStatusUpdate(user._id, 'active')} className="rounded-xl gap-3 font-bold text-xs p-4 cursor-pointer text-emerald-600 hover:bg-emerald-50"><CheckCircle2 size={18}/> Set Active</DropdownMenuItem>
//                            <DropdownMenuItem onClick={() => handleStatusUpdate(user._id, 'suspended')} className="rounded-xl gap-3 font-bold text-xs p-4 cursor-pointer text-rose-600 hover:bg-rose-50"><ShieldAlert size={18}/> Suspend User</DropdownMenuItem>
//                            <DropdownMenuItem onClick={() => handleDelete(user._id)} className="rounded-xl gap-3 font-bold text-xs p-4 cursor-pointer text-slate-500 hover:bg-slate-50"><Trash2 size={18}/> Purge Account</DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* --- SIDEBAR DRAWER --- */}
//       {isSidebarOpen && selectedCustomer && (
//         <>
//           <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99]" onClick={() => setIsSidebarOpen(false)} />
//           <div className="fixed inset-y-6 right-6 w-full md:w-[500px] bg-white dark:bg-[#0f1117] shadow-[0_0_100px_rgba(0,0,0,0.2)] z-[100] rounded-[48px] p-12 border border-slate-100 dark:border-slate-800 animate-in slide-in-from-right-full duration-500">
//             <div className="flex items-center justify-between mb-12">
//               <h2 className="text-3xl font-black italic uppercase tracking-tighter dark:text-white">Profile <span className="text-indigo-600">Review</span></h2>
//               <button onClick={() => setIsSidebarOpen(false)} className="p-4 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-3xl hover:rotate-90 transition-all"><X size={24}/></button>
//             </div>

//             <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-black/40 dark:to-black/10 p-8 rounded-[32px] border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-6 mb-10">
//                 <div className="w-20 h-20 rounded-3xl bg-indigo-600 text-white flex items-center justify-center text-3xl font-black shadow-2xl shadow-indigo-300">
//                   {selectedCustomer.name?.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Entity ID: #{selectedCustomer._id?.slice(-8).toUpperCase()}</p>
//                   <h3 className="text-2xl font-black dark:text-white tracking-tight">{selectedCustomer.name}</h3>
//                 </div>
//             </div>

//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Identity Name</label>
//                 <input defaultValue={selectedCustomer.name} className="w-full p-6 rounded-[24px] bg-slate-50 dark:bg-black/20 dark:text-white border-2 border-transparent focus:border-indigo-500 transition-all font-bold" />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Verified Email</label>
//                 <input defaultValue={selectedCustomer.email} className="w-full p-6 rounded-[24px] bg-slate-50 dark:bg-black/20 dark:text-white border-2 border-transparent focus:border-indigo-500 transition-all font-bold" />
//               </div>

//               <button 
//                 onClick={() => handleImpersonate(selectedCustomer)}
//                 className="w-full bg-slate-900 dark:bg-indigo-600 text-white p-6 rounded-[24px] font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl mt-4"
//               >
//                 <ShieldCheck size={20} /> Access Security Session
//               </button>

//               <div className="pt-8 grid grid-cols-2 gap-4">
//                 <button className="bg-indigo-600 text-white p-6 rounded-[24px] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-700 transition-all"><Save size={18}/> Commit Update</button>
//                 <button onClick={() => setIsSidebarOpen(false)} className="border-2 border-slate-100 dark:border-slate-800 p-6 rounded-[24px] font-black text-[11px] uppercase tracking-widest dark:text-white hover:bg-slate-50 transition-all">Discard</button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // --- হেল্পার কম্পোনেন্ট ---
// function StatCard({ title, value, icon, color }: any) {
//   const styles: any = {
//     indigo: "text-indigo-600 bg-indigo-600/10 shadow-indigo-100",
//     rose: "text-rose-600 bg-rose-600/10 shadow-rose-100",
//     emerald: "text-emerald-600 bg-emerald-600/10 shadow-emerald-100",
//   };
//   return (
//     <div className="bg-white dark:bg-[#0f1117] p-10 rounded-[48px] border border-white dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
//       <div className={`w-16 h-16 rounded-[20px] ${styles[color]} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
//         {React.cloneElement(icon, { size: 28 })}
//       </div>
//       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
//       <h2 className="text-4xl font-black dark:text-white tracking-tighter italic">{value}</h2>
//       <div className="absolute top-0 right-0 p-4 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 transition-opacity">
//          {React.cloneElement(icon, { size: 140 })}
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const isSuspended = status.toLowerCase() === 'suspended';
//   return (
//     <span className={`px-5 py-2 rounded-xl text-[9px] font-black border uppercase tracking-[0.2em] inline-flex items-center gap-2 ${
//       isSuspended ? "text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20" : "text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20"
//     }`}>
//       <span className={`w-2 h-2 rounded-full animate-pulse bg-current`} /> {status}
//     </span>
//   );
// }


// 'use client';

// import React, { useState, useMemo, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   Search, Plus, MoreVertical, Users, DollarSign, 
//   Pencil, Trash2, ShieldAlert, X, Save, UserX, CheckCircle2, 
//   Clock, ArrowUpDown, ChevronLeft, ChevronRight, Check, Minus,
//   ExternalLink, Loader2, ShieldCheck, Eye, TrendingUp, Activity,
//   Zap, Sparkles
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import API from '@/app/lib/api'; 
// import { toast } from "sonner";

// export default function CustomerAdminPage() {
//   const router = useRouter();
//   const [customers, setCustomers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("All");
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isSwitching, setIsSwitching] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   // Edit form refs
//   const nameRef = useRef<HTMLInputElement>(null);
//   const emailRef = useRef<HTMLInputElement>(null);

//   // --- ১. ব্যাকেন্ড থেকে ডাটা ফেচ করা ---
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         setLoading(true);
//         const res = await API.get('/auth/users'); 
//         const data = Array.isArray(res.data) ? res.data : res.data.users || [];
//         setCustomers(data);
//       } catch (error) {
//         toast.error("ডাটাবেসের সাথে কানেক্ট করা যাচ্ছে না");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   // --- ২. IMPERSONATION লগইন ---
//   const handleImpersonate = async (user: any) => {
//     setIsSwitching(true);
//     try {
//       const res = await API.post(`/auth/admin/switch-user/${user._id}`);
//       if (res.data.success && res.data.token) {
//         localStorage.setItem('token', res.data.token); 
//         toast.success(`${user.name} হিসেবে লগইন সফল!`);
//         setTimeout(() => {
//           router.push('/profile');
//           router.refresh();
//         }, 1500);
//       } else {
//         throw new Error("Token not found");
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "লগইন লজিক কাজ করছে না। সার্ভার চেক করুন।");
//       setIsSwitching(false);
//     }
//   };

//   // --- ৩. STATUS UPDATE ---
//   const handleStatusUpdate = async (id: string, status: string) => {
//     try {
//       await API.patch(`/auth/users/${id}/status`, { status });
//       setCustomers(prev => prev.map(c => c._id === id ? { ...c, status } : c));
//       if (selectedCustomer?._id === id) {
//         setSelectedCustomer((prev: any) => ({ ...prev, status }));
//       }
//       toast.success(`Status updated: ${status}`);
//     } catch (err) {
//       toast.error("আপডেট করা যায়নি");
//     }
//   };

//   // --- ৪. FIXED: UPDATE/SAVE ফাংশন ---
//   const handleUpdate = async () => {
//     if (!selectedCustomer) return;

//     const updatedName = nameRef.current?.value?.trim();
//     const updatedEmail = emailRef.current?.value?.trim();

//     if (!updatedName || !updatedEmail) {
//       toast.error("নাম ও ইমেইল খালি রাখা যাবে না");
//       return;
//     }

//     setIsSaving(true);
//     try {
//       const res = await API.put(`/auth/users/${selectedCustomer._id}`, {
//         name: updatedName,
//         email: updatedEmail,
//       });

//       const updatedUser = res.data?.user || { ...selectedCustomer, name: updatedName, email: updatedEmail };

//       // Local state update
//       setCustomers(prev =>
//         prev.map(c => c._id === selectedCustomer._id ? { ...c, name: updatedName, email: updatedEmail } : c)
//       );
//       setSelectedCustomer((prev: any) => ({ ...prev, name: updatedName, email: updatedEmail }));

//       toast.success("✅ প্রোফাইল সফলভাবে আপডেট হয়েছে!");
//       setIsSidebarOpen(false);
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "আপডেট করা যায়নি, সার্ভার চেক করুন।");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // --- ৫. DELETE ---
//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure?")) return;
//     try {
//       await API.delete(`/auth/users/${id}`);
//       setCustomers(prev => prev.filter(c => c._id !== id));
//       toast.success("User deleted");
//     } catch (err) {
//       toast.error("ডিলিট করা যায়নি");
//     }
//   };

//   // --- হেল্পার: Last Active ফরম্যাট ---
//   const formatLastActive = (dateStr: string) => {
//     if (!dateStr) return "N/A";
//     const date = new Date(dateStr);
//     const now = new Date();
//     const diffMs = now.getTime() - date.getTime();
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMins / 60);
//     const diffDays = Math.floor(diffHours / 24);
//     if (diffMins < 1) return "Just now";
//     if (diffMins < 60) return `${diffMins}m ago`;
//     if (diffHours < 24) return `${diffHours}h ago`;
//     if (diffDays < 7) return `${diffDays}d ago`;
//     return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//   };

//   // --- হেল্পার: Revenue ফরম্যাট ---
//   const formatRevenue = (amount: number) => {
//     if (!amount && amount !== 0) return "—";
//     if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}k`;
//     return `$${amount}`;
//   };

//   // --- ফিল্টারিং ---
//   const filteredCustomers = useMemo(() => {
//     return customers.filter(c => {
//       const matchesSearch = c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                            c.email?.toLowerCase().includes(searchQuery.toLowerCase());
//       const matchesTab = activeTab === "All" || (c.status || "active").toLowerCase() === activeTab.toLowerCase();
//       return matchesSearch && matchesTab;
//     });
//   }, [searchQuery, activeTab, customers]);

//   if (loading) return (
//     <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc] dark:bg-[#05070a]">
//       <div className="flex flex-col items-center gap-4">
//         <div className="relative">
//           <div className="w-16 h-16 rounded-full border-4 border-indigo-100 dark:border-indigo-900 animate-spin border-t-indigo-600" />
//           <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-600" />
//         </div>
//         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading Matrix...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#05070a] p-4 md:p-10 space-y-8 font-sans relative overflow-hidden">
      
//       {/* BG DECORATION */}
//       <div className="pointer-events-none fixed top-0 left-0 w-full h-full overflow-hidden z-0">
//         <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-3xl" />
//         <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-3xl" />
//       </div>

//       {/* 🚀 LOGIN ANIMATION OVERLAY */}
//       {isSwitching && (
//         <div className="fixed inset-0 z-[999] bg-slate-900/90 backdrop-blur-2xl flex flex-col items-center justify-center text-white">
//           <div className="relative">
//             <div className="w-24 h-24 rounded-full border-4 border-indigo-500/30 animate-spin border-t-indigo-500" />
//             <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-10 h-10" />
//           </div>
//           <h2 className="text-3xl font-black italic uppercase mt-8 tracking-tighter">Initializing <span className="text-indigo-500">Session</span></h2>
//           <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em] mt-2">Accessing secure user matrix...</p>
//           <div className="flex gap-2 mt-8">
//             {[0,1,2,3,4].map(i => (
//               <div key={i} className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//         <div className="space-y-1">
//           <div className="flex items-center gap-2">
//             <span className="w-8 h-[2px] bg-indigo-600"></span>
//             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Enterprise Control</span>
//           </div>
//           <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
//             User <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Intelligence</span>
//           </h1>
//           <p className="text-slate-400 text-sm font-medium pl-1">{customers.length} total members in the network</p>
//         </div>
//         <button className="group flex items-center gap-3 bg-slate-900 dark:bg-indigo-600 hover:scale-105 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-2xl active:scale-95 hover:shadow-indigo-500/25">
//           <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Add New Member
//         </button>
//       </div>

//       {/* STAT CARDS */}
//       <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//         <StatCard title="Active Network" value={customers.length} icon={<Users />} color="indigo" trend="+12%" />
//         <StatCard title="Restricted" value={customers.filter(c => c.status === 'suspended').length} icon={<ShieldAlert />} color="rose" trend="-3%" />
//         <StatCard title="Net Growth" value="14.5%" icon={<TrendingUp />} color="emerald" trend="+2.1%" />
//       </div>

//       {/* SEARCH & TABLE CONTAINER */}
//       <div className="relative z-10 bg-white/70 dark:bg-[#0f1117]/70 backdrop-blur-md rounded-[48px] border border-white dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
//         <div className="p-10 flex flex-col md:flex-row gap-8 justify-between items-center">
//           <div className="flex bg-slate-100/50 dark:bg-black/20 p-1.5 rounded-3xl border border-slate-200 dark:border-slate-800">
//             {["All", "Active", "Suspended"].map((tab) => (
//               <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xl" : "text-slate-400 hover:text-slate-600"}`}>
//                 {tab}
//                 <span className={`ml-2 px-2 py-0.5 rounded-full text-[8px] ${activeTab === tab ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
//                   {tab === "All" ? customers.length : customers.filter(c => (c.status || 'active').toLowerCase() === tab.toLowerCase()).length}
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div className="relative w-full md:w-[400px] group">
//             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
//             <input
//               type="text"
//               placeholder="Scan Database..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-16 pr-8 py-5 rounded-[24px] bg-white dark:bg-black/20 dark:text-white outline-none border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500/50 transition-all font-bold text-sm shadow-inner"
//             />
//             {searchQuery && (
//               <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
//                 <X size={16} />
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="overflow-x-auto px-4 pb-10">
//           <table className="w-full text-left min-w-[1200px] border-separate border-spacing-y-3">
//             <thead>
//               <tr className="text-slate-400 text-[10px] uppercase tracking-[0.25em] font-black italic">
//                 <th className="px-8 py-4">ID Reference</th>
//                 <th className="px-8 py-4">Identity</th>
//                 <th className="px-8 py-4">Status</th>
//                 {/* ✅ নতুন ২টি কলাম */}
//                 <th className="px-8 py-4">
//                   <span className="flex items-center gap-1.5"><Activity size={12} /> Last Active</span>
//                 </th>
//                 <th className="px-8 py-4">
//                   <span className="flex items-center gap-1.5"><DollarSign size={12} /> Revenue</span>
//                 </th>
//                 <th className="px-8 py-4 text-right">Operational Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCustomers.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="text-center py-20 text-slate-400 font-bold text-sm">
//                     No users found
//                   </td>
//                 </tr>
//               ) : filteredCustomers.map((user) => (
//                 <tr
//                   key={user._id}
//                   className="group bg-white dark:bg-slate-900/40 hover:bg-indigo-50/80 dark:hover:bg-indigo-500/5 transition-all duration-300 rounded-3xl shadow-sm border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/20 hover:shadow-md"
//                 >
//                   <td className="px-8 py-6 first:rounded-l-[24px]">
//                     <span className="font-mono text-[11px] font-bold text-slate-400 bg-slate-50 dark:bg-black/30 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
//                       #{user._id?.slice(-6).toUpperCase()}
//                     </span>
//                   </td>
//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-4">
//                       <div className="relative">
//                         <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-200 dark:shadow-none">
//                           {user.name?.charAt(0)}
//                         </div>
//                         {/* Online dot */}
//                         {(user.status || 'active') === 'active' && (
//                           <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
//                         )}
//                       </div>
//                       <div>
//                         <p className="font-black text-slate-800 dark:text-white text-lg tracking-tight">{user.name}</p>
//                         <p className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
//                           <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
//                           {user.email}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-8 py-6">
//                     <StatusBadge status={user.status || "active"} />
//                   </td>

//                   {/* ✅ Last Active কলাম */}
//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-2">
//                       <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
//                         user.lastActive
//                           ? 'bg-sky-50 dark:bg-sky-500/10 text-sky-500'
//                           : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
//                       }`}>
//                         <Clock size={14} />
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
//                           {formatLastActive(user.lastActive || user.updatedAt)}
//                         </p>
//                         <p className="text-[10px] text-slate-400 font-medium">Last seen</p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* ✅ Revenue কলাম */}
//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-2">
//                       <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
//                         user.revenue > 0
//                           ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600'
//                           : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
//                       }`}>
//                         <DollarSign size={14} />
//                       </div>
//                       <div>
//                         <p className={`text-sm font-black tracking-tight ${
//                           user.revenue > 0 ? 'text-emerald-600' : 'text-slate-400'
//                         }`}>
//                           {formatRevenue(user.revenue)}
//                         </p>
//                         <p className="text-[10px] text-slate-400 font-medium">Lifetime</p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-8 py-6 text-right last:rounded-r-[24px]">
//                     <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
//                       <button
//                         onClick={() => handleImpersonate(user)}
//                         className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/25"
//                       >
//                         <Eye size={14} /> View Profile
//                       </button>
//                       <button
//                         onClick={() => { setSelectedCustomer(user); setIsSidebarOpen(true); }}
//                         className="p-3 text-slate-400 hover:text-indigo-600 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-indigo-200 transition-all"
//                       >
//                         <Pencil size={18} />
//                       </button>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <button className="p-3 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-md">
//                             <MoreVertical size={20} />
//                           </button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-64 rounded-[24px] p-3 bg-white dark:bg-[#0f1117] border-slate-100 dark:border-slate-800 shadow-2xl">
//                           <DropdownMenuItem onClick={() => handleImpersonate(user)} className="rounded-xl gap-3 font-bold text-xs p-4 cursor-pointer text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
//                             <ShieldCheck size={18}/> Impersonate Access
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem onClick={() => handleStatusUpdate(user._id, 'active')} className="rounded-xl gap-3 font-bold text-xs p-4 cursor-pointer text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10">
//                             <CheckCircle2 size={18}/> Set Active
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => handleStatusUpdate(user._id, 'suspended')} className="rounded-xl gap-3 font-bold text-xs p-4 cursor-pointer text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10">
//                             <ShieldAlert size={18}/> Suspend User
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => handleDelete(user._id)} className="rounded-xl gap-3 font-bold text-xs p-4 cursor-pointer text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
//                             <Trash2 size={18}/> Purge Account
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

//         {/* TABLE FOOTER */}
//         <div className="px-10 pb-8 flex items-center justify-between text-slate-400 text-[11px] font-bold uppercase tracking-widest">
//           <span>Showing {filteredCustomers.length} of {customers.length} users</span>
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//             <span>Live sync active</span>
//           </div>
//         </div>
//       </div>

//       {/* --- SIDEBAR DRAWER --- */}
//       {isSidebarOpen && selectedCustomer && (
//         <>
//           <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99]" onClick={() => setIsSidebarOpen(false)} />
//           <div className="fixed inset-y-6 right-6 w-full md:w-[500px] bg-white dark:bg-[#0f1117] shadow-[0_0_100px_rgba(0,0,0,0.2)] z-[100] rounded-[48px] p-12 border border-slate-100 dark:border-slate-800 animate-in slide-in-from-right-full duration-500 overflow-y-auto">
//             <div className="flex items-center justify-between mb-12">
//               <h2 className="text-3xl font-black italic uppercase tracking-tighter dark:text-white">Profile <span className="text-indigo-600">Review</span></h2>
//               <button onClick={() => setIsSidebarOpen(false)} className="p-4 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-3xl hover:rotate-90 transition-all">
//                 <X size={24}/>
//               </button>
//             </div>

//             {/* Profile Card */}
//             <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-black/40 dark:to-black/10 p-8 rounded-[32px] border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-6 mb-10">
//               <div className="relative">
//                 <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-3xl font-black shadow-2xl shadow-indigo-300">
//                   {selectedCustomer.name?.charAt(0)}
//                 </div>
//                 <StatusBadgeDot status={selectedCustomer.status || 'active'} />
//               </div>
//               <div>
//                 <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">
//                   Entity ID: #{selectedCustomer._id?.slice(-8).toUpperCase()}
//                 </p>
//                 <h3 className="text-2xl font-black dark:text-white tracking-tight">{selectedCustomer.name}</h3>
//                 <div className="mt-1">
//                   <StatusBadge status={selectedCustomer.status || 'active'} />
//                 </div>
//               </div>
//             </div>

//             {/* Quick Stats in sidebar */}
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="bg-slate-50 dark:bg-black/20 rounded-[20px] p-5 border border-slate-100 dark:border-slate-800">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Clock size={14} className="text-sky-500" />
//                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Active</span>
//                 </div>
//                 <p className="text-lg font-black dark:text-white tracking-tight">
//                   {formatLastActive(selectedCustomer.lastActive || selectedCustomer.updatedAt)}
//                 </p>
//               </div>
//               <div className="bg-slate-50 dark:bg-black/20 rounded-[20px] p-5 border border-slate-100 dark:border-slate-800">
//                 <div className="flex items-center gap-2 mb-2">
//                   <DollarSign size={14} className="text-emerald-500" />
//                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Revenue</span>
//                 </div>
//                 <p className="text-lg font-black text-emerald-600 tracking-tight">
//                   {formatRevenue(selectedCustomer.revenue)}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Identity Name</label>
//                 <input
//                   ref={nameRef}
//                   defaultValue={selectedCustomer.name}
//                   className="w-full p-6 rounded-[24px] bg-slate-50 dark:bg-black/20 dark:text-white border-2 border-transparent focus:border-indigo-500 transition-all font-bold outline-none"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Verified Email</label>
//                 <input
//                   ref={emailRef}
//                   defaultValue={selectedCustomer.email}
//                   className="w-full p-6 rounded-[24px] bg-slate-50 dark:bg-black/20 dark:text-white border-2 border-transparent focus:border-indigo-500 transition-all font-bold outline-none"
//                 />
//               </div>

//               <button
//                 onClick={() => handleImpersonate(selectedCustomer)}
//                 className="w-full bg-slate-900 dark:bg-indigo-600 text-white p-6 rounded-[24px] font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl mt-4 hover:shadow-indigo-500/25"
//               >
//                 <ShieldCheck size={20} /> Access Security Session
//               </button>

//               <div className="pt-4 grid grid-cols-2 gap-4">
//                 {/* ✅ FIXED SAVE BUTTON */}
//                 <button
//                   onClick={handleUpdate}
//                   disabled={isSaving}
//                   className="bg-indigo-600 text-white p-6 rounded-[24px] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-indigo-500/30"
//                 >
//                   {isSaving ? (
//                     <><Loader2 size={18} className="animate-spin" /> Saving...</>
//                   ) : (
//                     <><Save size={18}/> Commit Update</>
//                   )}
//                 </button>
//                 <button
//                   onClick={() => setIsSidebarOpen(false)}
//                   className="border-2 border-slate-100 dark:border-slate-800 p-6 rounded-[24px] font-black text-[11px] uppercase tracking-widest dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
//                 >
//                   Discard
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // --- হেল্পার কম্পোনেন্ট ---
// function StatCard({ title, value, icon, color, trend }: any) {
//   const styles: any = {
//     indigo: {
//       icon: "text-indigo-600 bg-indigo-600/10 shadow-indigo-100",
//       trend: "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10",
//       glow: "group-hover:shadow-indigo-100 dark:group-hover:shadow-indigo-500/10",
//     },
//     rose: {
//       icon: "text-rose-600 bg-rose-600/10 shadow-rose-100",
//       trend: "text-rose-600 bg-rose-50 dark:bg-rose-500/10",
//       glow: "group-hover:shadow-rose-100 dark:group-hover:shadow-rose-500/10",
//     },
//     emerald: {
//       icon: "text-emerald-600 bg-emerald-600/10 shadow-emerald-100",
//       trend: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10",
//       glow: "group-hover:shadow-emerald-100 dark:group-hover:shadow-emerald-500/10",
//     },
//   };
//   return (
//     <div className={`bg-white dark:bg-[#0f1117] p-10 rounded-[48px] border border-white dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-2xl ${styles[color].glow} transition-all duration-500`}>
//       <div className="flex items-start justify-between mb-8">
//         <div className={`w-16 h-16 rounded-[20px] ${styles[color].icon} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
//           {React.cloneElement(icon, { size: 28 })}
//         </div>
//         {trend && (
//           <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black ${styles[color].trend} flex items-center gap-1`}>
//             <TrendingUp size={10} /> {trend}
//           </span>
//         )}
//       </div>
//       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
//       <h2 className="text-4xl font-black dark:text-white tracking-tighter italic">{value}</h2>
//       <div className="absolute bottom-0 right-0 p-4 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 transition-opacity">
//         {React.cloneElement(icon, { size: 140 })}
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const isSuspended = status.toLowerCase() === 'suspended';
//   return (
//     <span className={`px-5 py-2 rounded-xl text-[9px] font-black border uppercase tracking-[0.2em] inline-flex items-center gap-2 ${
//       isSuspended
//         ? "text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20"
//         : "text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20"
//     }`}>
//       <span className="w-2 h-2 rounded-full animate-pulse bg-current" /> {status}
//     </span>
//   );
// }

// // Sidebar-এ badge dot
// function StatusBadgeDot({ status }: { status: string }) {
//   const isSuspended = status.toLowerCase() === 'suspended';
//   return (
//     <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-[#0f1117] ${isSuspended ? 'bg-rose-500' : 'bg-emerald-500'}`} />
//   );
// }



// 'use client';

// import React, { useState, useMemo, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   Search, Plus, MoreVertical, Users, DollarSign,
//   Pencil, Trash2, ShieldAlert, X, Save,
//   CheckCircle2, Clock, Loader2, ShieldCheck, Eye,
//   TrendingUp, Activity, Mail, User, Lock, Phone,
//   Sparkles, Check, AlertCircle, ArrowRight
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import API from '@/app/lib/api';
// import { toast } from "sonner";

// // ─────────────────────────────────────────────
// // TYPES
// // ─────────────────────────────────────────────
// interface Customer {
//   _id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   status?: string;
//   role?: string;
//   revenue?: number;
//   lastActive?: string;
//   updatedAt?: string;
//   createdAt?: string;
// }

// interface NewUserForm {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
//   role: string;
// }

// // ─────────────────────────────────────────────
// // MAIN PAGE
// // ─────────────────────────────────────────────
// export default function CustomerAdminPage() {
//   const router = useRouter();

//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("All");

//   // Sidebar (edit)
//   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const nameRef = useRef<HTMLInputElement>(null);
//   const emailRef = useRef<HTMLInputElement>(null);

//   // Impersonate overlay
//   const [isSwitching, setIsSwitching] = useState(false);
//   const [switchingUser, setSwitchingUser] = useState<Customer | null>(null);

//   // Add Member Modal
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isCreating, setIsCreating] = useState(false);
//   const [createSuccess, setCreateSuccess] = useState(false);
//   const [formData, setFormData] = useState<NewUserForm>({
//     name: "", email: "", phone: "", password: "", role: "user"
//   });
//   const [formErrors, setFormErrors] = useState<Partial<NewUserForm>>({});

//   // ─── FETCH USERS ───────────────────────────
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         setLoading(true);
//         const res = await API.get('/auth/users');
//         const data = Array.isArray(res.data) ? res.data : res.data.users || [];
//         setCustomers(data);
//       } catch {
//         toast.error("ডাটাবেসের সাথে কানেক্ট করা যাচ্ছে না");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   // ─── IMPERSONATE ───────────────────────────
//   const handleImpersonate = async (user: Customer) => {
//     setSwitchingUser(user);
//     setIsSwitching(true);
//     setIsSidebarOpen(false);
//     try {
//       const res = await API.post(`/auth/admin/switch-user/${user._id}`);
//       if (res.data.success && res.data.token) {
//         localStorage.setItem('token', res.data.token);
//         toast.success(`${user.name} হিসেবে লগইন সফল!`);
//         setTimeout(() => {
//           router.push('/profile');
//           router.refresh();
//         }, 1800);
//       } else {
//         throw new Error("Token not found");
//       }
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "লগইন করা যায়নি।");
//       setIsSwitching(false);
//       setSwitchingUser(null);
//     }
//   };

//   // ─── STATUS UPDATE ─────────────────────────
//   const handleStatusUpdate = async (id: string, status: string) => {
//     try {
//       await API.patch(`/auth/users/${id}/status`, { status });
//       setCustomers(prev => prev.map(c => c._id === id ? { ...c, status } : c));
//       if (selectedCustomer?._id === id) setSelectedCustomer(p => p ? { ...p, status } : p);
//       toast.success(`Status → ${status}`);
//     } catch {
//       toast.error("আপডেট করা যায়নি");
//     }
//   };

//   // ─── UPDATE PROFILE (FIXED) ────────────────
//   const handleUpdate = async () => {
//     if (!selectedCustomer) return;
//     const updatedName = nameRef.current?.value?.trim();
//     const updatedEmail = emailRef.current?.value?.trim();
//     if (!updatedName || !updatedEmail) { toast.error("নাম ও ইমেইল খালি রাখা যাবে না"); return; }
//     setIsSaving(true);
//     try {
//       await API.put(`/auth/users/${selectedCustomer._id}`, { name: updatedName, email: updatedEmail });
//       setCustomers(prev => prev.map(c => c._id === selectedCustomer._id ? { ...c, name: updatedName, email: updatedEmail } : c));
//       setSelectedCustomer(p => p ? { ...p, name: updatedName, email: updatedEmail } : p);
//       toast.success("✅ প্রোফাইল আপডেট হয়েছে!");
//       setIsSidebarOpen(false);
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "আপডেট করা যায়নি।");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // ─── DELETE ────────────────────────────────
//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this user?")) return;
//     try {
//       await API.delete(`/auth/users/${id}`);
//       setCustomers(prev => prev.filter(c => c._id !== id));
//       toast.success("User deleted");
//     } catch {
//       toast.error("ডিলিট করা যায়নি");
//     }
//   };

//   // ─── CREATE USER ───────────────────────────
//   const validateForm = (): boolean => {
//     const errors: Partial<NewUserForm> = {};
//     if (!formData.name.trim()) errors.name = "Name is required";
//     if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email required";
//     if (!formData.password || formData.password.length < 6) errors.password = "Min 6 characters";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleCreateUser = async () => {
//     if (!validateForm()) return;
//     setIsCreating(true);
//     try {
//       const res = await API.post('/auth/admin/create-user', formData);
//       const newUser = res.data?.user || res.data;
//       setCustomers(prev => [newUser, ...prev]);
//       setCreateSuccess(true);
//       toast.success(`✅ ${formData.name} তৈরি হয়েছে!`);
//       setTimeout(() => {
//         setIsModalOpen(false);
//         setCreateSuccess(false);
//         setFormData({ name: "", email: "", phone: "", password: "", role: "user" });
//         setFormErrors({});
//       }, 1800);
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "User তৈরি করা যায়নি।");
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCreateSuccess(false);
//     setFormData({ name: "", email: "", phone: "", password: "", role: "user" });
//     setFormErrors({});
//   };

//   // ─── HELPERS ───────────────────────────────
//   const formatLastActive = (dateStr?: string) => {
//     if (!dateStr) return "N/A";
//     const diffMs = Date.now() - new Date(dateStr).getTime();
//     const m = Math.floor(diffMs / 60000);
//     const h = Math.floor(m / 60);
//     const d = Math.floor(h / 24);
//     if (m < 1) return "Just now";
//     if (m < 60) return `${m}m ago`;
//     if (h < 24) return `${h}h ago`;
//     if (d < 7) return `${d}d ago`;
//     return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//   };

//   const formatRevenue = (amount?: number) => {
//     if (!amount && amount !== 0) return "—";
//     if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}k`;
//     return `$${amount}`;
//   };

//   // ─── FILTER ────────────────────────────────
//   const filteredCustomers = useMemo(() => customers.filter(c => {
//     const matchesSearch =
//       c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       c.email?.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesTab = activeTab === "All" || (c.status || "active").toLowerCase() === activeTab.toLowerCase();
//     return matchesSearch && matchesTab;
//   }), [searchQuery, activeTab, customers]);

//   // ─────────────────────────────────────────────
//   // LOADING
//   // ─────────────────────────────────────────────
//   if (loading) return (
//     <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc] dark:bg-[#05070a]">
//       <div className="flex flex-col items-center gap-4">
//         <div className="relative">
//           <div className="w-16 h-16 rounded-full border-4 border-indigo-100 dark:border-indigo-900 animate-spin border-t-indigo-600" />
//           <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-600" />
//         </div>
//         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading Matrix...</p>
//       </div>
//     </div>
//   );

//   // ─────────────────────────────────────────────
//   // RENDER
//   // ─────────────────────────────────────────────
//   return (
//     <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#05070a] p-4 md:p-10 space-y-8 font-sans relative">

//       {/* BG GLOW */}
//       <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
//         <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-3xl" />
//         <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-3xl" />
//       </div>

//       {/* ════════════════════════════════════════
//           IMPERSONATE OVERLAY
//       ════════════════════════════════════════ */}
//       {isSwitching && switchingUser && (
//         <div className="fixed inset-0 z-[999] bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center text-white">
//           <div className="relative flex items-center justify-center mb-10">
//             <div className="absolute w-40 h-40 rounded-full border border-indigo-500/20 animate-ping" />
//             <div className="absolute w-28 h-28 rounded-full border border-indigo-500/30 animate-pulse" />
//             <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-4xl font-black shadow-2xl shadow-indigo-500/30">
//               {switchingUser.name?.charAt(0)}
//             </div>
//           </div>
//           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-3">Switching Identity</p>
//           <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-1">{switchingUser.name}</h2>
//           <p className="text-slate-500 text-sm font-bold mb-10">{switchingUser.email}</p>
//           <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10">
//             <div className="w-5 h-5 rounded-full border-2 border-indigo-500/40 border-t-indigo-500 animate-spin" />
//             <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Initializing secure session...</span>
//           </div>
//           <div className="flex gap-2 mt-8">
//             {[0,1,2,3,4].map(i => (
//               <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: `${i * 0.12}s` }} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ════════════════════════════════════════
//           ADD MEMBER MODAL
//       ════════════════════════════════════════ */}
//       {isModalOpen && (
//         <>
//           <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[200]" onClick={closeModal} />
//           <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
//             <div className="w-full max-w-lg bg-white dark:bg-[#0c0e14] rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-[0_40px_120px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-300">

//               {/* Modal Header */}
//               <div className="relative px-10 pt-10 pb-8 border-b border-slate-100 dark:border-slate-800/60">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
//                     <Plus size={22} className="text-white" />
//                   </div>
//                   <div>
//                     <p className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.4em]">Admin Panel</p>
//                     <h2 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white">
//                       New <span className="text-indigo-600">Member</span>
//                     </h2>
//                   </div>
//                 </div>
//                 <button
//                   onClick={closeModal}
//                   className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:rotate-90 transition-all"
//                 >
//                   <X size={18} />
//                 </button>
//               </div>

//               {/* SUCCESS */}
//               {createSuccess ? (
//                 <div className="px-10 py-16 flex flex-col items-center text-center">
//                   <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
//                     <Check size={36} className="text-emerald-500" />
//                   </div>
//                   <h3 className="text-2xl font-black italic uppercase dark:text-white tracking-tighter mb-2">Member Created!</h3>
//                   <p className="text-slate-400 font-bold text-sm">{formData.name} সফলভাবে যোগ হয়েছে।</p>
//                 </div>
//               ) : (
//                 /* FORM */
//                 <div className="px-10 py-8 space-y-5">

//                   <ModalField icon={<User size={16} />} label="Full Name" error={formErrors.name}>
//                     <input
//                       type="text"
//                       placeholder="John Doe"
//                       value={formData.name}
//                       onChange={e => { setFormData(p => ({ ...p, name: e.target.value })); setFormErrors(p => ({ ...p, name: "" })); }}
//                       className="w-full bg-transparent outline-none font-bold text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 text-sm"
//                     />
//                   </ModalField>

//                   <ModalField icon={<Mail size={16} />} label="Email Address" error={formErrors.email}>
//                     <input
//                       type="email"
//                       placeholder="john@example.com"
//                       value={formData.email}
//                       onChange={e => { setFormData(p => ({ ...p, email: e.target.value })); setFormErrors(p => ({ ...p, email: "" })); }}
//                       className="w-full bg-transparent outline-none font-bold text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 text-sm"
//                     />
//                   </ModalField>

//                   <ModalField icon={<Phone size={16} />} label="Phone (Optional)">
//                     <input
//                       type="tel"
//                       placeholder="+880 1X XX XXX XXX"
//                       value={formData.phone}
//                       onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
//                       className="w-full bg-transparent outline-none font-bold text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 text-sm"
//                     />
//                   </ModalField>

//                   <ModalField icon={<Lock size={16} />} label="Password" error={formErrors.password}>
//                     <input
//                       type="password"
//                       placeholder="Min. 6 characters"
//                       value={formData.password}
//                       onChange={e => { setFormData(p => ({ ...p, password: e.target.value })); setFormErrors(p => ({ ...p, password: "" })); }}
//                       className="w-full bg-transparent outline-none font-bold text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 text-sm"
//                     />
//                   </ModalField>

//                   {/* Role selector */}
//                   <div>
//                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 ml-1">Assign Role</p>
//                     <div className="grid grid-cols-2 gap-3">
//                       {["user", "admin"].map(role => (
//                         <button
//                           key={role}
//                           onClick={() => setFormData(p => ({ ...p, role }))}
//                           className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
//                             formData.role === role
//                               ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-none"
//                               : "bg-slate-50 dark:bg-black/20 text-slate-400 border-slate-100 dark:border-slate-800 hover:border-indigo-200"
//                           }`}
//                         >
//                           {role === "admin" ? "⚡ Admin" : "👤 User"}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleCreateUser}
//                     disabled={isCreating}
//                     className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-5 rounded-[20px] font-black text-[11px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
//                   >
//                     {isCreating
//                       ? <><Loader2 size={18} className="animate-spin" /> Creating Member...</>
//                       : <><Sparkles size={18} /> Create Member <ArrowRight size={16} /></>
//                     }
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </>
//       )}

//       {/* ════════════════════════════════════════
//           HEADER
//       ════════════════════════════════════════ */}
//       <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//         <div className="space-y-1">
//           <div className="flex items-center gap-2">
//             <span className="w-8 h-[2px] bg-indigo-600" />
//             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Enterprise Control</span>
//           </div>
//           <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
//             User <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">Intelligence</span>
//           </h1>
//           <p className="text-slate-400 text-sm font-medium pl-1">{customers.length} total members in the network</p>
//         </div>

//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="group flex items-center gap-3 bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 hover:scale-105 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-2xl active:scale-95 hover:shadow-indigo-500/25"
//         >
//           <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
//           Add New Member
//         </button>
//       </div>

//       {/* STAT CARDS */}
//       <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
//         <StatCard title="Active Network" value={customers.length} icon={<Users />} color="indigo" trend="+12%" />
//         <StatCard title="Restricted" value={customers.filter(c => c.status === 'suspended').length} icon={<ShieldAlert />} color="rose" trend="-3%" />
//         <StatCard title="Net Growth" value="14.5%" icon={<TrendingUp />} color="emerald" trend="+2.1%" />
//       </div>

//       {/* ════════════════════════════════════════
//           TABLE
//       ════════════════════════════════════════ */}
//       <div className="relative z-10 bg-white/70 dark:bg-[#0f1117]/70 backdrop-blur-md rounded-[48px] border border-white dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
//         <div className="p-10 flex flex-col md:flex-row gap-8 justify-between items-center">
//           <div className="flex bg-slate-100/50 dark:bg-black/20 p-1.5 rounded-3xl border border-slate-200 dark:border-slate-800">
//             {["All", "Active", "Suspended"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
//                   activeTab === tab ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-xl" : "text-slate-400 hover:text-slate-600"
//                 }`}
//               >
//                 {tab}
//                 <span className={`ml-2 px-2 py-0.5 rounded-full text-[8px] ${
//                   activeTab === tab ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
//                 }`}>
//                   {tab === "All" ? customers.length : customers.filter(c => (c.status || 'active').toLowerCase() === tab.toLowerCase()).length}
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div className="relative w-full md:w-[400px] group">
//             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
//             <input
//               type="text"
//               placeholder="Scan Database..."
//               value={searchQuery}
//               onChange={e => setSearchQuery(e.target.value)}
//               className="w-full pl-16 pr-10 py-5 rounded-[24px] bg-white dark:bg-black/20 dark:text-white outline-none border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500/50 transition-all font-bold text-sm shadow-inner"
//             />
//             {searchQuery && (
//               <button onClick={() => setSearchQuery("")} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
//                 <X size={16} />
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="overflow-x-auto px-4 pb-6">
//           <table className="w-full text-left min-w-[1200px] border-separate border-spacing-y-3">
//             <thead>
//               <tr className="text-slate-400 text-[10px] uppercase tracking-[0.25em] font-black italic">
//                 <th className="px-8 py-4">ID Reference</th>
//                 <th className="px-8 py-4">Identity</th>
//                 <th className="px-8 py-4">Status</th>
//                 <th className="px-8 py-4"><span className="flex items-center gap-1.5"><Activity size={11} /> Last Active</span></th>
//                 <th className="px-8 py-4"><span className="flex items-center gap-1.5"><DollarSign size={11} /> Revenue</span></th>
//                 <th className="px-8 py-4 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCustomers.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="text-center py-20 text-slate-400 font-bold text-sm">
//                     No users found.
//                   </td>
//                 </tr>
//               ) : filteredCustomers.map(user => (
//                 <tr
//                   key={user._id}
//                   className="group bg-white dark:bg-slate-900/40 hover:bg-indigo-50/80 dark:hover:bg-indigo-500/5 transition-all duration-300 shadow-sm border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/20 hover:shadow-md"
//                 >
//                   <td className="px-8 py-6 rounded-l-[24px]">
//                     <span className="font-mono text-[11px] font-bold text-slate-400 bg-slate-50 dark:bg-black/30 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
//                       #{user._id?.slice(-6).toUpperCase()}
//                     </span>
//                   </td>

//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-4">
//                       <div className="relative flex-shrink-0">
//                         <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-200 dark:shadow-none">
//                           {user.name?.charAt(0)}
//                         </div>
//                         {(user.status || 'active') === 'active' && (
//                           <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
//                         )}
//                       </div>
//                       <div>
//                         <p className="font-black text-slate-800 dark:text-white text-lg tracking-tight">{user.name}</p>
//                         <p className="text-[11px] text-slate-400 font-bold">{user.email}</p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-8 py-6">
//                     <StatusBadge status={user.status || "active"} />
//                   </td>

//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-2">
//                       <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-sky-50 dark:bg-sky-500/10 text-sky-500">
//                         <Clock size={14} />
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
//                           {formatLastActive(user.lastActive || user.updatedAt)}
//                         </p>
//                         <p className="text-[10px] text-slate-400 font-medium">Last seen</p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-8 py-6">
//                     <div className="flex items-center gap-2">
//                       <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
//                         (user.revenue ?? 0) > 0
//                           ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600'
//                           : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
//                       }`}>
//                         <DollarSign size={14} />
//                       </div>
//                       <div>
//                         <p className={`text-sm font-black tracking-tight ${(user.revenue ?? 0) > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
//                           {formatRevenue(user.revenue)}
//                         </p>
//                         <p className="text-[10px] text-slate-400 font-medium">Lifetime</p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-8 py-6 text-right rounded-r-[24px]">
//                     <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 duration-300">

//                       {/* 👁 EYE / IMPERSONATE */}
//                       <button
//                         onClick={() => handleImpersonate(user)}
//                         title={`Login as ${user.name}`}
//                         className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/30"
//                       >
//                         <Eye size={14} /> View As
//                       </button>

//                       {/* ✏ EDIT */}
//                       <button
//                         onClick={() => { setSelectedCustomer(user); setIsSidebarOpen(true); }}
//                         className="p-3 text-slate-400 hover:text-indigo-600 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-indigo-200 transition-all"
//                       >
//                         <Pencil size={18} />
//                       </button>

//                       {/* ⋮ MORE */}
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <button className="p-3 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
//                             <MoreVertical size={20} />
//                           </button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-64 rounded-[24px] p-3 bg-white dark:bg-[#0f1117] border-slate-100 dark:border-slate-800 shadow-2xl">
//                           <DropdownMenuItem onClick={() => handleImpersonate(user)} className="rounded-xl gap-3 font-bold text-xs p-4 cursor-pointer text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
//                             <ShieldCheck size={18} /> Impersonate Access
//                           </DropdownMenuItem>
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem onClick={() => handleStatusUpdate(user._id, 'active')} className="rounded-xl gap-3 font-bold text-xs p-4 cursor-pointer text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10">
//                             <CheckCircle2 size={18} /> Set Active
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => handleStatusUpdate(user._id, 'suspended')} className="rounded-xl gap-3 font-bold text-xs p-4 cursor-pointer text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10">
//                             <ShieldAlert size={18} /> Suspend User
//                           </DropdownMenuItem>
//                           <DropdownMenuItem onClick={() => handleDelete(user._id)} className="rounded-xl gap-3 font-bold text-xs p-4 cursor-pointer text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
//                             <Trash2 size={18} /> Purge Account
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

//         <div className="px-10 pb-8 flex items-center justify-between text-slate-400 text-[11px] font-bold uppercase tracking-widest">
//           <span>Showing {filteredCustomers.length} of {customers.length} users</span>
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//             <span>Live sync active</span>
//           </div>
//         </div>
//       </div>

//       {/* ════════════════════════════════════════
//           EDIT SIDEBAR
//       ════════════════════════════════════════ */}
//       {isSidebarOpen && selectedCustomer && (
//         <>
//           <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99]" onClick={() => setIsSidebarOpen(false)} />
//           <div className="fixed inset-y-6 right-6 w-full md:w-[500px] bg-white dark:bg-[#0f1117] shadow-[0_0_100px_rgba(0,0,0,0.2)] z-[100] rounded-[48px] p-12 border border-slate-100 dark:border-slate-800 animate-in slide-in-from-right-full duration-500 overflow-y-auto">

//             <div className="flex items-center justify-between mb-10">
//               <h2 className="text-3xl font-black italic uppercase tracking-tighter dark:text-white">
//                 Profile <span className="text-indigo-600">Review</span>
//               </h2>
//               <button onClick={() => setIsSidebarOpen(false)} className="p-4 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-3xl hover:rotate-90 transition-all">
//                 <X size={24} />
//               </button>
//             </div>

//             {/* Avatar card */}
//             <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-black/40 dark:to-black/10 p-8 rounded-[32px] border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-6 mb-8">
//               <div className="relative">
//                 <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-3xl font-black shadow-2xl shadow-indigo-200 dark:shadow-none">
//                   {selectedCustomer.name?.charAt(0)}
//                 </div>
//                 <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-[#0f1117] ${(selectedCustomer.status || 'active') === 'suspended' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
//               </div>
//               <div>
//                 <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">
//                   #{selectedCustomer._id?.slice(-8).toUpperCase()}
//                 </p>
//                 <h3 className="text-2xl font-black dark:text-white tracking-tight mb-1">{selectedCustomer.name}</h3>
//                 <StatusBadge status={selectedCustomer.status || 'active'} />
//               </div>
//             </div>

//             {/* Quick stats */}
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="bg-slate-50 dark:bg-black/20 rounded-[20px] p-5 border border-slate-100 dark:border-slate-800">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Clock size={13} className="text-sky-500" />
//                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Active</span>
//                 </div>
//                 <p className="text-base font-black dark:text-white tracking-tight">
//                   {formatLastActive(selectedCustomer.lastActive || selectedCustomer.updatedAt)}
//                 </p>
//               </div>
//               <div className="bg-slate-50 dark:bg-black/20 rounded-[20px] p-5 border border-slate-100 dark:border-slate-800">
//                 <div className="flex items-center gap-2 mb-2">
//                   <DollarSign size={13} className="text-emerald-500" />
//                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Revenue</span>
//                 </div>
//                 <p className="text-base font-black text-emerald-600 tracking-tight">
//                   {formatRevenue(selectedCustomer.revenue)}
//                 </p>
//               </div>
//             </div>

//             {/* Form */}
//             <div className="space-y-5">
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Identity Name</label>
//                 <input
//                   ref={nameRef}
//                   defaultValue={selectedCustomer.name}
//                   className="w-full p-5 rounded-[20px] bg-slate-50 dark:bg-black/20 dark:text-white border-2 border-transparent focus:border-indigo-500 transition-all font-bold outline-none"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Verified Email</label>
//                 <input
//                   ref={emailRef}
//                   defaultValue={selectedCustomer.email}
//                   className="w-full p-5 rounded-[20px] bg-slate-50 dark:bg-black/20 dark:text-white border-2 border-transparent focus:border-indigo-500 transition-all font-bold outline-none"
//                 />
//               </div>

//               {/* Access Secure / Impersonate from sidebar */}
//               <button
//                 onClick={() => handleImpersonate(selectedCustomer)}
//                 className="w-full bg-slate-900 dark:bg-indigo-600 text-white p-5 rounded-[20px] font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl hover:bg-indigo-700 hover:shadow-indigo-500/25"
//               >
//                 <ShieldCheck size={18} /> Access Secure Session
//               </button>

//               <div className="grid grid-cols-2 gap-4">
//                 <button
//                   onClick={handleUpdate}
//                   disabled={isSaving}
//                   className="bg-indigo-600 text-white p-5 rounded-[20px] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {isSaving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Commit Update</>}
//                 </button>
//                 <button
//                   onClick={() => setIsSidebarOpen(false)}
//                   className="border-2 border-slate-100 dark:border-slate-800 p-5 rounded-[20px] font-black text-[11px] uppercase tracking-widest dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
//                 >
//                   Discard
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// // MODAL FIELD
// // ─────────────────────────────────────────────
// function ModalField({ icon, label, error, children }: {
//   icon: React.ReactNode;
//   label: string;
//   error?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="space-y-1.5">
//       <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.35em] ml-1">{label}</label>
//       <div className={`flex items-center gap-3 px-5 py-4 rounded-[18px] bg-slate-50 dark:bg-black/20 border-2 transition-all ${
//         error ? 'border-rose-400' : 'border-transparent focus-within:border-indigo-500'
//       }`}>
//         <span className={`flex-shrink-0 ${error ? 'text-rose-400' : 'text-slate-400'}`}>{icon}</span>
//         {children}
//         {error && <AlertCircle size={16} className="flex-shrink-0 text-rose-400" />}
//       </div>
//       {error && <p className="text-[10px] text-rose-500 font-bold ml-2">{error}</p>}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// // STAT CARD
// // ─────────────────────────────────────────────
// function StatCard({ title, value, icon, color, trend }: any) {
//   const styles: any = {
//     indigo:  { icon: "text-indigo-600 bg-indigo-600/10",  trend: "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10",  glow: "group-hover:shadow-indigo-100 dark:group-hover:shadow-indigo-500/10" },
//     rose:    { icon: "text-rose-600 bg-rose-600/10",      trend: "text-rose-600 bg-rose-50 dark:bg-rose-500/10",        glow: "group-hover:shadow-rose-100" },
//     emerald: { icon: "text-emerald-600 bg-emerald-600/10",trend: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10",glow: "group-hover:shadow-emerald-100" },
//   };
//   return (
//     <div className={`bg-white dark:bg-[#0f1117] p-10 rounded-[48px] border border-white dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-2xl ${styles[color].glow} transition-all duration-500`}>
//       <div className="flex items-start justify-between mb-8">
//         <div className={`w-16 h-16 rounded-[20px] ${styles[color].icon} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
//           {React.cloneElement(icon, { size: 28 })}
//         </div>
//         {trend && (
//           <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black ${styles[color].trend} flex items-center gap-1`}>
//             <TrendingUp size={10} /> {trend}
//           </span>
//         )}
//       </div>
//       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
//       <h2 className="text-4xl font-black dark:text-white tracking-tighter italic">{value}</h2>
//       <div className="absolute bottom-0 right-0 p-4 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 transition-opacity">
//         {React.cloneElement(icon, { size: 140 })}
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────
// // STATUS BADGE
// // ─────────────────────────────────────────────
// function StatusBadge({ status }: { status: string }) {
//   const isSuspended = status.toLowerCase() === 'suspended';
//   return (
//     <span className={`px-5 py-2 rounded-xl text-[9px] font-black border uppercase tracking-[0.2em] inline-flex items-center gap-2 ${
//       isSuspended
//         ? "text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20"
//         : "text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20"
//     }`}>
//       <span className="w-2 h-2 rounded-full animate-pulse bg-current" /> {status}
//     </span>
//   );
// }


'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Plus, MoreVertical, Users, DollarSign,
  Pencil, Trash2, ShieldAlert, X, CheckCircle2,
  Clock, Loader2, ShieldCheck, Eye, TrendingUp,
  Activity, Sparkles
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import API from '@/app/lib/api';
import { toast } from "sonner";

// ── Sub-components ──
import AddMemberModal from '../components/AddMemberModal';
import EditUserSidebar from '../components/EditUserSidebar';
import ImpersonateOverlay from '../components/ImpersonateOverlay';

// ─────────────────────────────────────────────
// TYPE
// ─────────────────────────────────────────────
interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status?: string;
  role?: string;
  revenue?: number;
  lastActive?: string;
  updatedAt?: string;
  createdAt?: string;
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function CustomerAdminPage() {
  const router = useRouter();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  // Modal & sidebar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Impersonate
  const [isSwitching, setIsSwitching] = useState(false);
  const [switchingUser, setSwitchingUser] = useState<Customer | null>(null);

  // ── Fetch ─────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await API.get('/admin/users');
        const data = Array.isArray(res.data) ? res.data : res.data.users || [];
        setCustomers(data);
      } catch {
        toast.error('ডাটাবেসের সাথে কানেক্ট করা যাচ্ছে না');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── Impersonate ───────────────────────────
  const handleImpersonate = async (user: Customer) => {
    setSwitchingUser(user);
    setIsSwitching(true);
    try {
      const res = await API.post(`/auth/admin/switch-user/${user._id}`);
      if (res.data.success && res.data.token) {
        localStorage.setItem('token', res.data.token);
        toast.success(`${user.name} হিসেবে লগইন সফল!`);
        setTimeout(() => { router.push('/profile'); router.refresh(); }, 1800);
      } else throw new Error('Token not found');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'লগইন করা যায়নি।');
      setIsSwitching(false);
      setSwitchingUser(null);
    }
  };

  // ── Status ────────────────────────────────
  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await API.patch(`/admin/users/${id}/status`, { status });
      setCustomers(prev => prev.map(c => c._id === id ? { ...c, status } : c));
      toast.success(`Status → ${status}`);
    } catch {
      toast.error('আপডেট করা যায়নি');
    }
  };

  // ── Delete ────────────────────────────────
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await API.delete(`/admin/users/${id}`);
      setCustomers(prev => prev.filter(c => c._id !== id));
      toast.success('User deleted');
    } catch {
      toast.error('ডিলিট করা যায়নি');
    }
  };

  // ── Helpers ───────────────────────────────
  const formatLastActive = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const m = Math.floor(diffMs / 60000);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    if (m < 1) return 'Just now';
    if (m < 60) return `${m}m ago`;
    if (h < 24) return `${h}h ago`;
    if (d < 7) return `${d}d ago`;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatRevenue = (amount?: number) => {
    if (!amount && amount !== 0) return '—';
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}k`;
    return `$${amount}`;
  };

  // ── Filter ────────────────────────────────
  const filteredCustomers = useMemo(() => customers.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchSearch = c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q);
    const matchTab = activeTab === 'All' || (c.status || 'active').toLowerCase() === activeTab.toLowerCase();
    return matchSearch && matchTab;
  }), [searchQuery, activeTab, customers]);

  const tabCount = (tab: string) =>
    tab === 'All' ? customers.length : customers.filter(c => (c.status || 'active').toLowerCase() === tab.toLowerCase()).length;

  // ─────────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────────
  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc] dark:bg-[#05070a]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-4 border-indigo-100 dark:border-indigo-900 animate-spin border-t-indigo-600" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-indigo-600" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading Matrix...</p>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <div className="w-full min-h-screen bg-[#f8fafc] dark:bg-[#05070a] p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8 font-sans relative">

      {/* BG glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      {/* ── OVERLAYS & MODALS ── */}
      <ImpersonateOverlay user={switchingUser} isVisible={isSwitching} />

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={newUser => setCustomers(prev => [newUser, ...prev])}
      />

      <EditUserSidebar
        customer={selectedCustomer}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onUpdated={updated => setCustomers(prev => prev.map(c => c._id === updated._id ? updated : c))}
        onImpersonate={handleImpersonate}
      />

      {/* ════════════════════════════════════════
          HEADER
      ════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-6 sm:w-8 h-[2px] bg-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Enterprise Control</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
            User{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
              Intelligence
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-medium pl-1">
            {customers.length} total members in the network
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-2 sm:gap-3 self-start sm:self-auto bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
          Add New Member
        </button>
      </div>

      {/* ════════════════════════════════════════
          STAT CARDS
      ════════════════════════════════════════ */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <StatCard
          title="Active Network"
          value={customers.length}
          icon={<Users />}
          color="indigo"
          trend="+12%"
        />
        <StatCard
          title="Restricted"
          value={customers.filter(c => c.status === 'suspended').length}
          icon={<ShieldAlert />}
          color="rose"
          trend="-3%"
        />
        <StatCard
          title="Net Growth"
          value="14.5%"
          icon={<TrendingUp />}
          color="emerald"
          trend="+2.1%"
        />
      </div>

      {/* ════════════════════════════════════════
          TABLE SECTION
      ════════════════════════════════════════ */}
      <div className="relative z-10 bg-white/70 dark:bg-[#0f1117]/70 backdrop-blur-md rounded-[32px] sm:rounded-[40px] md:rounded-[48px] border border-white dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">

        {/* Toolbar */}
        <div className="p-5 sm:p-8 md:p-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs */}
          <div className="flex bg-slate-100/50 dark:bg-black/20 p-1.5 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
            {['All', 'Active', 'Suspended'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-xl'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[8px] ${
                  activeTab === tab
                    ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                }`}>
                  {tabCount(tab)}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-[320px] md:w-[380px] group">
            <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 sm:pl-14 pr-10 py-3.5 sm:py-4 rounded-[18px] sm:rounded-[22px] bg-white dark:bg-black/20 dark:text-white outline-none border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500/50 transition-all font-bold text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Table — desktop */}
        <div className="hidden md:block overflow-x-auto px-4 pb-6">
          <table className="w-full text-left min-w-[1100px] border-separate border-spacing-y-3">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-[0.25em] font-black italic">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Identity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"><span className="flex items-center gap-1.5"><Activity size={10} /> Last Active</span></th>
                <th className="px-6 py-4"><span className="flex items-center gap-1.5"><DollarSign size={10} /> Revenue</span></th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-slate-400 font-bold text-sm">No users found.</td>
                </tr>
              ) : filteredCustomers.map(user => (
                <DesktopRow
                  key={user._id}
                  user={user}
                  formatLastActive={formatLastActive}
                  formatRevenue={formatRevenue}
                  onImpersonate={handleImpersonate}
                  onEdit={() => { setSelectedCustomer(user); setIsSidebarOpen(true); }}
                  onStatusUpdate={handleStatusUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards — mobile */}
        <div className="md:hidden px-4 pb-5 space-y-3">
          {filteredCustomers.length === 0 ? (
            <p className="text-center py-16 text-slate-400 font-bold text-sm">No users found.</p>
          ) : filteredCustomers.map(user => (
            <MobileCard
              key={user._id}
              user={user}
              formatLastActive={formatLastActive}
              formatRevenue={formatRevenue}
              onImpersonate={handleImpersonate}
              onEdit={() => { setSelectedCustomer(user); setIsSidebarOpen(true); }}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-10 pb-6 sm:pb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
          <span>Showing {filteredCustomers.length} of {customers.length} users</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live sync active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// DESKTOP ROW
// ─────────────────────────────────────────────
function DesktopRow({ user, formatLastActive, formatRevenue, onImpersonate, onEdit, onStatusUpdate, onDelete }: any) {
  return (
    <tr className="group bg-white dark:bg-slate-900/40 hover:bg-indigo-50/80 dark:hover:bg-indigo-500/5 transition-all duration-300 shadow-sm border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/20 hover:shadow-md">
      <td className="px-6 py-5 rounded-l-[20px]">
        <span className="font-mono text-[11px] font-bold text-slate-400 bg-slate-50 dark:bg-black/30 px-2.5 py-1 rounded-xl border border-slate-100 dark:border-slate-800">
          #{user._id?.slice(-6).toUpperCase()}
        </span>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-black shadow-md shadow-indigo-200 dark:shadow-none">
              {user.name?.charAt(0)}
            </div>
            {(user.status || 'active') === 'active' && (
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            )}
          </div>
          <div>
            <p className="font-black text-slate-800 dark:text-white tracking-tight">{user.name}</p>
            <p className="text-[11px] text-slate-400 font-bold">{user.email}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5"><StatusBadge status={user.status || 'active'} /></td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-sky-50 dark:bg-sky-500/10 text-sky-500">
            <Clock size={13} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{formatLastActive(user.lastActive || user.updatedAt)}</p>
            <p className="text-[10px] text-slate-400 font-medium">Last seen</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${(user.revenue ?? 0) > 0 ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            <DollarSign size={13} />
          </div>
          <div>
            <p className={`text-sm font-black tracking-tight ${(user.revenue ?? 0) > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
              {formatRevenue(user.revenue)}
            </p>
            <p className="text-[10px] text-slate-400 font-medium">Lifetime</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5 text-right rounded-r-[20px]">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-3 group-hover:translate-x-0 duration-300">
          <button
            onClick={() => onImpersonate(user)}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-md"
          >
            <Eye size={13} /> View As
          </button>
          <button
            onClick={onEdit}
            className="p-2.5 text-slate-400 hover:text-indigo-600 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all"
          >
            <Pencil size={16} />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all">
                <MoreVertical size={17} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-[20px] p-2.5 bg-white dark:bg-[#0f1117] border-slate-100 dark:border-slate-800 shadow-2xl">
              <DropdownMenuItem onClick={() => onImpersonate(user)} className="rounded-xl gap-3 font-bold text-xs p-3.5 cursor-pointer text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
                <ShieldCheck size={16} /> Impersonate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onStatusUpdate(user._id, 'active')} className="rounded-xl gap-3 font-bold text-xs p-3.5 cursor-pointer text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10">
                <CheckCircle2 size={16} /> Set Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusUpdate(user._id, 'suspended')} className="rounded-xl gap-3 font-bold text-xs p-3.5 cursor-pointer text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10">
                <ShieldAlert size={16} /> Suspend
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(user._id)} className="rounded-xl gap-3 font-bold text-xs p-3.5 cursor-pointer text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
                <Trash2 size={16} /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────
// MOBILE CARD
// ─────────────────────────────────────────────
function MobileCard({ user, formatLastActive, formatRevenue, onImpersonate, onEdit, onStatusUpdate, onDelete }: any) {
  return (
    <div className="bg-white dark:bg-slate-900/50 rounded-[20px] border border-slate-100 dark:border-slate-800 p-4 shadow-sm">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-md">
              {user.name?.charAt(0)}
            </div>
            {(user.status || 'active') === 'active' && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            )}
          </div>
          <div className="min-w-0">
            <p className="font-black text-slate-800 dark:text-white tracking-tight truncate">{user.name}</p>
            <p className="text-[11px] text-slate-400 font-bold truncate">{user.email}</p>
          </div>
        </div>
        <StatusBadge status={user.status || 'active'} />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-slate-50 dark:bg-black/20 rounded-xl p-3 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-sky-50 dark:bg-sky-500/10 text-sky-500 flex-shrink-0">
            <Clock size={12} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-slate-400 font-bold">Last seen</p>
            <p className="text-xs font-black dark:text-white truncate">{formatLastActive(user.lastActive || user.updatedAt)}</p>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-black/20 rounded-xl p-3 flex items-center gap-2">
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${(user.revenue ?? 0) > 0 ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            <DollarSign size={12} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold">Revenue</p>
            <p className={`text-xs font-black ${(user.revenue ?? 0) > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>{formatRevenue(user.revenue)}</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onImpersonate(user)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all"
        >
          <Eye size={13} /> View As
        </button>
        <button
          onClick={onEdit}
          className="p-2.5 text-slate-400 hover:text-indigo-600 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800 transition-all"
        >
          <Pencil size={16} />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2.5 text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
              <MoreVertical size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52 rounded-[20px] p-2.5 bg-white dark:bg-[#0f1117] border-slate-100 dark:border-slate-800 shadow-2xl">
            <DropdownMenuItem onClick={() => onImpersonate(user)} className="rounded-xl gap-3 font-bold text-xs p-3.5 cursor-pointer text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
              <ShieldCheck size={15} /> Impersonate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onStatusUpdate(user._id, 'active')} className="rounded-xl gap-3 font-bold text-xs p-3.5 cursor-pointer text-emerald-600 hover:bg-emerald-50">
              <CheckCircle2 size={15} /> Set Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusUpdate(user._id, 'suspended')} className="rounded-xl gap-3 font-bold text-xs p-3.5 cursor-pointer text-rose-600 hover:bg-rose-50">
              <ShieldAlert size={15} /> Suspend
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(user._id)} className="rounded-xl gap-3 font-bold text-xs p-3.5 cursor-pointer text-slate-500 hover:bg-slate-50">
              <Trash2 size={15} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────
function StatCard({ title, value, icon, color, trend }: any) {
  const styles: any = {
    indigo:  { icon: 'text-indigo-600 bg-indigo-600/10',  trend: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10' },
    rose:    { icon: 'text-rose-600 bg-rose-600/10',      trend: 'text-rose-600 bg-rose-50 dark:bg-rose-500/10' },
    emerald: { icon: 'text-emerald-600 bg-emerald-600/10',trend: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' },
  };
  return (
    <div className="bg-white dark:bg-[#0f1117] p-6 sm:p-8 md:p-10 rounded-[28px] sm:rounded-[36px] md:rounded-[48px] border border-white dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] ${styles[color].icon} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
          {React.cloneElement(icon, { size: 22 })}
        </div>
        {trend && (
          <span className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black ${styles[color].trend} flex items-center gap-1`}>
            <TrendingUp size={9} /> {trend}
          </span>
        )}
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
      <h2 className="text-3xl sm:text-4xl font-black dark:text-white tracking-tighter italic">{value}</h2>
      <div className="absolute bottom-0 right-0 p-3 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-10 transition-opacity">
        {React.cloneElement(icon, { size: 110 })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// STATUS BADGE
// ─────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const isSuspended = status.toLowerCase() === 'suspended';
  return (
    <span className={`px-3 sm:px-4 py-1.5 rounded-lg text-[9px] font-black border uppercase tracking-[0.15em] inline-flex items-center gap-1.5 flex-shrink-0 ${
      isSuspended
        ? 'text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20'
        : 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20'
    }`}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-current" /> {status}
    </span>
  );
}
