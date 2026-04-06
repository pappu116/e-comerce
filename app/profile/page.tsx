// "use client";

// import { motion } from "framer-motion";
// import { useAuth } from "@/app/store/useAuth";
// import { useRouter } from "next/navigation";
// import { 
//   User, 
//   Package, 
//   MapPin, 
//   Settings, 
//   LogOut, 
//   ShieldCheck, 
//   Bell 
// } from "lucide-react";
// import { useEffect } from "react";

// export default function ProfilePage() {
//   const { user, isLoggedIn, logout } = useAuth();
//   const router = useRouter();

//   // যদি লগইন না থাকে, তবে লগইন পেজে পাঠিয়ে দিবে
//   useEffect(() => {
//     if (!isLoggedIn) {
//       router.push("/login");
//     }
//   }, [isLoggedIn, router]);

//   if (!isLoggedIn || !user) return null;

//   const handleLogout = () => {
//     logout();
//     router.push("/login");
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 relative overflow-hidden">
//       {/* Background Glows */}
//       <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      
//       <div className="max-w-6xl mx-auto relative z-10">
//         <header className="mb-10">
//           <h1 className="text-3xl font-black tracking-tight">My <span className="text-indigo-500">Account</span></h1>
//           <p className="text-slate-400">Manage your orders and personal information</p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
//           {/* Left Side: Sidebar/Quick Info */}
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="lg:col-span-4 space-y-6"
//           >
//             {/* User Card */}
//             <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl text-center">
//               <div className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold border-4 border-white/10 shadow-xl shadow-indigo-500/20">
//                 {user.name?.charAt(0).toUpperCase() || "U"}
//               </div>
//               <h2 className="text-xl font-bold">{user.name}</h2>
//               <p className="text-slate-400 text-sm mb-6">{user.email}</p>
//               <button 
//                 onClick={handleLogout}
//                 className="flex items-center justify-center gap-2 w-full py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all font-semibold border border-red-500/20"
//               >
//                 <LogOut size={18} /> Logout
//               </button>
//             </div>

//             {/* Quick Links */}
//             <div className="p-4 bg-white/5 border border-white/10 rounded-[2rem] space-y-1">
//               {[
//                 { icon: Package, label: "My Orders", active: true },
//                 { icon: MapPin, label: "Addresses", active: false },
//                 { icon: Bell, label: "Notifications", active: false },
//                 { icon: ShieldCheck, label: "Privacy & Security", active: false },
//                 { icon: Settings, label: "Settings", active: false },
//               ].map((item, index) => (
//                 <button 
//                   key={index}
//                   className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${item.active ? 'bg-indigo-600 text-white' : 'hover:bg-white/5 text-slate-400'}`}
//                 >
//                   <item.icon size={20} />
//                   <span className="font-medium">{item.label}</span>
//                 </button>
//               ))}
//             </div>
//           </motion.div>

//           {/* Right Side: Content Area */}
//           <motion.div 
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="lg:col-span-8 space-y-8"
//           >
//             {/* Order Statistics */}
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {[
//                 { label: "Total Orders", value: "12" },
//                 { label: "Pending", value: "01" },
//                 { label: "Completed", value: "11" },
//               ].map((stat, i) => (
//                 <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl">
//                   <p className="text-slate-400 text-sm">{stat.label}</p>
//                   <p className="text-2xl font-black mt-1">{stat.value}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Recent Orders Section */}
//             <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem]">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold">Recent Orders</h3>
//                 <button className="text-indigo-400 text-sm font-semibold hover:underline">View All</button>
//               </div>

//               {/* Fake Order List */}
//               <div className="space-y-4">
//                 {[1, 2].map((order) => (
//                   <div key={order} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl gap-4">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-500">
//                         <Package size={24} />
//                       </div>
//                       <div>
//                         <p className="font-bold tracking-tight">Order #PREM-1024{order}</p>
//                         <p className="text-xs text-slate-500">March 28, 2026 • 2 Items</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center justify-between md:justify-end gap-6">
//                       <p className="font-black text-indigo-400">$129.00</p>
//                       <span className="px-4 py-1.5 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">
//                         Delivered
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Personal Details Update */}
//             <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem]">
//               <h3 className="text-xl font-bold mb-6">Account Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="text-xs text-slate-500 uppercase tracking-widest font-bold ml-1">Full Name</label>
//                   <div className="mt-2 p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-300">
//                     {user.name}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-xs text-slate-500 uppercase tracking-widest font-bold ml-1">Email Address</label>
//                   <div className="mt-2 p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-300">
//                     {user.email}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import { useAuth } from "@/app/store/useAuth";
// import { useRouter } from "next/navigation";
// import { 
//   User, Package, MapPin, Settings, LogOut, 
//   ShieldCheck, Bell, Plus, Trash2, Phone, Calendar, ChevronRight
// } from "lucide-react";

// export default function ProfilePage() {
//   const { user, logout, isLoggedIn } = useAuth();
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("My Orders");

//   // প্রোটেকশন: লগইন না থাকলে লগইন পেজে পাঠিয়ে দিবে
//   useEffect(() => {
//     if (!isLoggedIn) {
//       router.push("/login");
//     }
//   }, [isLoggedIn, router]);

//   if (!isLoggedIn || !user) return null;

//   const menuItems = [
//     { icon: Package, label: "My Orders" },
//     { icon: MapPin, label: "Addresses" },
//     { icon: Bell, label: "Notifications" },
//     { icon: ShieldCheck, label: "Privacy & Security" },
//     { icon: Settings, label: "Settings" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#020617] text-white p-4 md:p-12 relative overflow-hidden">
//       {/* Background Decor */}
//       <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

//       <div className="max-w-6xl mx-auto relative z-10">
//         <header className="mb-10">
//           <h1 className="text-3xl font-black tracking-tight">My <span className="text-indigo-500">Profile</span></h1>
//           <p className="text-slate-400">Manage your orders and account settings</p>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
//           {/* --- LEFT SIDEBAR --- */}
//           <aside className="lg:col-span-4 space-y-6">
//             <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl text-center">
//               <div className="w-20 h-20 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold shadow-xl shadow-indigo-500/20 border-2 border-white/10">
//                 {user?.name?.charAt(0).toUpperCase()}
//               </div>
//               <h2 className="text-xl font-bold">{user?.name}</h2>
//               <p className="text-slate-500 text-sm mb-6">{user?.email}</p>
//               <button 
//                 onClick={() => { logout(); router.push("/login"); }} 
//                 className="w-full py-3 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all font-bold border border-red-500/20"
//               >
//                 <LogOut size={18} /> Logout
//               </button>
//             </div>

//             <nav className="p-3 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-1">
//               {menuItems.map((item) => (
//                 <button 
//                   key={item.label}
//                   onClick={() => setActiveTab(item.label)}
//                   className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all ${activeTab === item.label ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-white/5'}`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <item.icon size={20} />
//                     <span className="font-semibold">{item.label}</span>
//                   </div>
//                   {activeTab === item.label && <ChevronRight size={16} />}
//                 </button>
//               ))}
//             </nav>
//           </aside>

//           {/* --- RIGHT CONTENT AREA --- */}
//           <main className="lg:col-span-8">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeTab}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -20 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 {activeTab === "My Orders" && <OrdersSection />}
//                 {activeTab === "Addresses" && <AddressesSection />}
//                 {activeTab === "Settings" && <SettingsSection user={user} />}
//                 {/* অন্যগুলোর জন্য পরে কম্পোনেন্ট অ্যাড করতে পারবেন */}
//               </motion.div>
//             </AnimatePresence>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- My Orders Section ---
// function OrdersSection() {
//   const stats = [
//     { label: "Total Orders", value: "12" },
//     { label: "Pending", value: "01" },
//     { label: "Completed", value: "11" },
//   ];

//   return (
//     <div className="space-y-8">
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {stats.map((stat, i) => (
//           <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-3xl">
//             <p className="text-slate-400 text-sm">{stat.label}</p>
//             <p className="text-2xl font-black mt-1 text-indigo-400">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem]">
//         <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
//         <div className="space-y-4">
//           {[1, 2].map((order) => (
//             <div key={order} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl gap-4 hover:bg-white/10 transition-colors cursor-pointer">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center text-indigo-500">
//                   <Package size={24} />
//                 </div>
//                 <div>
//                   <p className="font-bold tracking-tight">Order #PREM-1024{order}</p>
//                   <p className="text-xs text-slate-500 font-medium">March 28, 2026 • 2 Items</p>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between md:justify-end gap-6">
//                 <p className="font-black text-indigo-400">$129.00</p>
//                 <span className="px-4 py-1.5 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-500/20">
//                   Delivered
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Addresses Section ---
// function AddressesSection() {
//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h3 className="text-2xl font-bold">Shipping Addresses</h3>
//         <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 rounded-full text-sm font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30">
//           <Plus size={18} /> Add New Address
//         </button>
//       </div>
//       <div className="grid gap-4">
//         {[
//           { id: 1, type: "Home", detail: "House #12, Road #05, Dhanmondi, Dhaka", phone: "+880 1700-000000" },
//         ].map((addr) => (
//           <div key={addr.id} className="p-6 bg-white/5 border border-white/10 rounded-3xl flex justify-between items-start group hover:border-indigo-500/50 transition-all">
//             <div className="flex gap-4">
//               <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-500"><MapPin size={24} /></div>
//               <div>
//                 <span className="text-[10px] uppercase tracking-widest font-black text-indigo-400">{addr.type}</span>
//                 <p className="font-medium mt-1 text-slate-200">{addr.detail}</p>
//                 <p className="text-slate-500 text-sm mt-1 font-medium">{addr.phone}</p>
//               </div>
//             </div>
//             <button className="p-2 text-slate-500 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
//               <Trash2 size={20} />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // --- Settings Section ---
// function SettingsSection({ user }: any) {
//   return (
//     <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-8">
//       <h3 className="text-2xl font-bold">Account Settings</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <InfoField label="Full Name" value={user?.name} icon={User} />
//         <InfoField label="Email Address" value={user?.email} icon={Bell} />
//         <InfoField label="Phone Number" value="+880 1XXX-XXXXXX" icon={Phone} />
//         <InfoField label="Date of Birth" value="Not Set" icon={Calendar} />
//       </div>
//       <button className="px-8 py-4 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">
//         Update Profile Information
//       </button>
//     </div>
//   );
// }

// function InfoField({ label, value, icon: Icon }: any) {
//   return (
//     <div className="space-y-2">
//       <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">{label}</label>
//       <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-300">
//         <Icon size={18} className="text-indigo-500" />
//         <span className="font-medium">{value}</span>
//       </div>
//     </div>
//   );
// }


// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Package, Heart, MapPin, Bell, ShieldCheck, Settings } from "lucide-react";
// import { useAuth } from "@/app/store/useAuth";

// // আলাদা কম্পোনেন্টগুলো ইমপোর্ট
// import WishlistSection from "../components/WishlistSection";
// import OrdersSection from "../components/OrdersSection";
// import AddressesSection from "../components/AddressesSection";
// import NotificationsSection from "../components/NotificationsSection";
// import PrivacySection from "../components/PrivacySection";
// import SettingsSection from "../components/SettingsSection";
// import QuickStar from "./quick-stats"; 
// // আপনার ওয়ালেট এবং রিওয়ার্ড কম্পোনেন্টগুলো ইমপোর্ট করুন (যদি আলাদা ফাইল থাকে)
// import WalletHistory from "./WalletHistory";
// import RewardRedeem from "./RewardRedeem";

// export default function ProfilePage() {
//   const { user, logout, isLoggedIn } = useAuth();
  
//   // ট্যাব স্টেট
//   const [activeTab, setActiveTab] = useState("My Orders");

//   // ডাইনামিক কম্পোনেন্ট ম্যাপিং
//   const TABS_MAP: Record<string, React.ReactNode> = {
//     "My Orders": <OrdersSection />,
//     "Wishlist": <WishlistSection />,
//     "Addresses": <AddressesSection />,
//     "Notifications": <NotificationsSection />,
//     "Security & Privacy": <PrivacySection />, // কি-টি মেনু লেবেলের সাথে মিল থাকতে হবে
//     "Settings": <SettingsSection user={user} />,
//     "Wallet": <WalletHistory />, // কুইক স্ট্যাট থেকে এখানে আসবে
//     "Rewards": <RewardRedeem />, // কুইক স্ট্যাট থেকে এখানে আসবে
//   };

//   const menu = [
//     { icon: Package, label: "My Orders" },
//     { icon: Heart, label: "Wishlist" },
//     { icon: MapPin, label: "Addresses" },
//     { icon: Bell, label: "Notifications" },
//     { icon: ShieldCheck, label: "Security & Privacy" },
//     { icon: Settings, label: "Settings" },
//   ];

//   if (!isLoggedIn) return (
//     <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-black italic uppercase tracking-widest">
//       Loading...
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#020617] text-white p-4 md:p-12">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        
//         {/* --- Sidebar --- */}
//         <aside className="lg:col-span-4 space-y-6">
//           {/* User Profile Card */}
//           <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] text-center backdrop-blur-xl relative overflow-hidden group">
//              <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
//              <div className="w-24 h-24 mx-auto mb-4 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-black shadow-2xl shadow-indigo-600/40 border-4 border-white/10 relative z-10">
//                 {user?.name?.charAt(0).toUpperCase()}
//              </div>
//              <h2 className="text-xl font-black uppercase italic tracking-tight relative z-10">{user?.name}</h2>
//              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 mb-6">{user?.email}</p>
             
//              <button 
//                onClick={logout} 
//                className="relative z-10 w-full py-4 bg-red-500/10 text-red-500 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all active:scale-95"
//              >
//                Logout Account
//              </button>
//           </div>

//           {/* Navigation Menu */}
//           <nav className="p-3 bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] space-y-1 backdrop-blur-md">
//             {menu.map((item) => (
//               <button 
//                 key={item.label} 
//                 onClick={() => setActiveTab(item.label)} 
//                 className={`flex items-center gap-4 w-full p-4 md:p-5 rounded-2xl md:rounded-[1.8rem] transition-all relative overflow-hidden group ${
//                   activeTab === item.label ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-white/5'
//                 }`}
//               >
//                 <item.icon size={20} className={activeTab === item.label ? "text-white" : "group-hover:text-indigo-400 transition-colors"} />
//                 <span className="font-black uppercase italic text-xs tracking-wider">{item.label}</span>
//                 {activeTab === item.label && (
//                   <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-6 bg-white rounded-full" />
//                 )}
//               </button>
//             ))}
//           </nav>
//         </aside>

//         {/* --- Main Content Area --- */}
//         <main className="lg:col-span-8 space-y-8">
          
//           {/* Quick Stats: Pass setActiveTab as a prop */}
//           <QuickStar setActiveTab={setActiveTab} />
          
//           <div className="relative">
//             <AnimatePresence mode="wait">
//               <motion.div 
//                 key={activeTab} 
//                 initial={{ opacity: 0, y: 20 }} 
//                 animate={{ opacity: 1, y: 0 }} 
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3, ease: "easeOut" }}
//                 className="min-h-[400px]"
//               >
//                 {/* Dynamic Component Rendering */}
//                 {TABS_MAP[activeTab] || (
//                   <div className="p-20 text-center border border-white/5 rounded-[3rem] bg-white/5">
//                     <p className="text-slate-500 font-black uppercase tracking-widest">Select a section to view</p>
//                   </div>
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Package, Heart, MapPin, Bell, ShieldCheck, Settings, LayoutDashboard } from "lucide-react";
// import { useAuth } from "@/app/store/useAuth";

// // আলাদা কম্পোনেন্টগুলো ইমপোর্ট
// import WishlistSection from "../components/WishlistSection";
// import OrdersSection from "../components/OrdersSection";
// import AddressesSection from "../components/AddressesSection";
// import NotificationsSection from "../components/NotificationsSection";
// import PrivacySection from "../components/PrivacySection";
// import SettingsSection from "../components/SettingsSection";
// import QuickStar from "./quick-stats"; 
// import WalletHistory from "./WalletHistory";
// import RewardRedeem from "./RewardRedeem";
// import DashboardOverview from "./DashboardOverview"; // আপনার নতুন ওভারভিউ কম্পোনেন্ট

// export default function ProfilePage() {
//   const { user, logout, isLoggedIn } = useAuth();
  
//   // ১. ডিফল্ট ট্যাব এখন "dashboard"
//   const [activeTab, setActiveTab] = useState("dashboard");

//   // ২. ডাইনামিক কম্পোনেন্ট ম্যাপিং (Dashboard যুক্ত করা হয়েছে)
//   const TABS_MAP: Record<string, React.ReactNode> = {
//     "dashboard": <DashboardOverview setActiveTab={setActiveTab} />,
//     "My Orders": <OrdersSection />,
//     "Wishlist": <WishlistSection />,
//     "Addresses": <AddressesSection />,
//     "Notifications": <NotificationsSection />,
//     "Security & Privacy": <PrivacySection />,
//     "Settings": <SettingsSection user={user} />,
//     "Wallet": <WalletHistory />, 
//     "Rewards": <RewardRedeem />, 
//   };

//   const menu = [
//     { icon: LayoutDashboard, label: "dashboard" }, // মেনুতে ড্যাশবোর্ড যোগ করা হলো
//     { icon: Package, label: "My Orders" },
//     { icon: Heart, label: "Wishlist" },
//     { icon: MapPin, label: "Addresses" },
//     { icon: Bell, label: "Notifications" },
//     { icon: ShieldCheck, label: "Security & Privacy" },
//     { icon: Settings, label: "Settings" },
//   ];

//   if (!isLoggedIn) return (
//     <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-black italic uppercase tracking-widest">
//       Loading...
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#020617] text-white p-4 md:p-12 font-sans">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        
//         {/* --- Sidebar --- */}
//         <aside className="lg:col-span-4 space-y-6">
//           {/* User Profile Card */}
//           <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] text-center backdrop-blur-xl relative overflow-hidden group">
//              <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
//              <div className="w-24 h-24 mx-auto mb-4 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-black shadow-2xl shadow-indigo-600/40 border-4 border-white/10 relative z-10">
//                 {user?.name?.charAt(0).toUpperCase()}
//              </div>
//              <h2 className="text-xl font-black uppercase italic tracking-tight relative z-10">{user?.name}</h2>
//              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 mb-6">{user?.email}</p>
             
//              <button 
//                onClick={logout} 
//                className="relative z-10 w-full py-4 bg-red-500/10 text-red-500 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all active:scale-95"
//              >
//                Logout Account
//              </button>
//           </div>

//           {/* Navigation Menu */}
//           <nav className="p-3 bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] space-y-1 backdrop-blur-md">
//             {menu.map((item) => (
//               <button 
//                 key={item.label} 
//                 onClick={() => setActiveTab(item.label)} 
//                 className={`flex items-center gap-4 w-full p-4 md:p-5 rounded-2xl md:rounded-[1.8rem] transition-all relative overflow-hidden group ${
//                   activeTab === item.label ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-white/5'
//                 }`}
//               >
//                 <item.icon size={20} className={activeTab === item.label ? "text-white" : "group-hover:text-indigo-400 transition-colors"} />
//                 <span className="font-black uppercase italic text-xs tracking-wider capitalize">{item.label}</span>
//                 {activeTab === item.label && (
//                   <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-6 bg-white rounded-full" />
//                 )}
//               </button>
//             ))}
//           </nav>
//         </aside>

//         {/* --- Main Content Area --- */}
//         <main className="lg:col-span-8 space-y-8">
          
//           {/* Quick Stats */}
//           <QuickStar setActiveTab={setActiveTab} />
          
//           <div className="relative">
//             <AnimatePresence mode="wait">
//               <motion.div 
//                 key={activeTab} 
//                 initial={{ opacity: 0, y: 20 }} 
//                 animate={{ opacity: 1, y: 0 }} 
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3, ease: "easeOut" }}
//                 className="min-h-[400px]"
//               >
//                 {/* ৩. ডাইনামিক কন্টেন্ট রেন্ডারিং */}
//                 {TABS_MAP[activeTab]}
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, LayoutDashboard, Package, Heart, MapPin, Bell, ShieldCheck, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from "@/app/store/useAuth";

import QuickStar from "./quick-stats";
import DashboardOverview from "./DashboardOverview";
import OrdersSection from "../components/OrdersSection";
import WishlistSection from "../components/WishlistSection";
import AddressesSection from "../components/AddressesSection";
import NotificationsSection from "../components/NotificationsSection";
import PrivacySection from "../components/PrivacySection";
import SettingsSection from "../components/SettingsSection";

export default function ProfilePage() {
  const { user, isLoggedIn, logout, checkAuth, loading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // যদি এখনো loading চলছে তাহলে অপেক্ষা করো
    if (authLoading) return;

    if (isLoggedIn && user) {
      setIsChecking(false);

      // অ্যাডমিন হলে অ্যাডমিনে পাঠাও
      if (user.role === "admin") {
        router.replace("/admin");
      }
    } 
    else if (!isLoggedIn && !isChecking && !authLoading) {
      router.replace("/login?redirect=/profile");
    }
  }, [isLoggedIn, user, authLoading, router, isChecking]);

  if (isChecking || authLoading || !isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl font-medium">Loading your profile...</p>
          <p className="text-sm text-slate-400 mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  const menu = [
    { icon: LayoutDashboard, label: "dashboard" },
    { icon: Package, label: "My Orders" },
    { icon: Heart, label: "Wishlist" },
    { icon: MapPin, label: "Addresses" },
    { icon: Bell, label: "Notifications" },
    { icon: ShieldCheck, label: "Security & Privacy" },
    { icon: Settings, label: "Settings" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardOverview setActiveTab={setActiveTab} />;
      case "My Orders": return <OrdersSection />;
      case "Wishlist": return <WishlistSection />;
      case "Addresses": return <AddressesSection />;
      case "Notifications": return <NotificationsSection />;
      case "Security & Privacy": return <PrivacySection />;
      case "Settings": return <SettingsSection user={user} />;
      default: return <DashboardOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar - তোমার আগের কোড একই রাখো */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-center backdrop-blur-xl">
            <div className="w-24 h-24 mx-auto mb-4 bg-indigo-600 rounded-full flex items-center justify-center text-4xl font-black border-4 border-white/20">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-slate-400 mt-1">{user.email}</p>

            <button
              onClick={() => { logout(); router.push("/login"); }}
              className="mt-8 w-full py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          <nav className="p-4 bg-white/5 border border-white/10 rounded-3xl space-y-1">
            {menu.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${
                  activeTab === item.label ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-white/10"
                }`}
              >
                <item.icon size={20} />
                <span className="font-semibold">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="lg:col-span-8">
          <QuickStar setActiveTab={setActiveTab} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}