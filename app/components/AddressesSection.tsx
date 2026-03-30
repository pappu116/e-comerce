// "use client";
// import { MapPin, Plus, Edit3, Trash2, Phone, Home, Briefcase } from "lucide-react";
// import { motion } from "framer-motion";

// export default function AddressesSection() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-3xl font-black tracking-tight">Saved Addresses</h3>
//         <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-lg hover:scale-105 transition-all">
//           <Plus size={16} /> New Address
//         </button>
//       </div>

//       <div className="grid gap-6">
//         <div className="p-8 bg-white/5 border border-white/10 rounded-[3rem] relative group hover:bg-white/[0.08] transition-all">
//           <div className="absolute top-8 right-8 flex gap-2">
//             <button className="p-2 bg-white/5 rounded-xl text-slate-400 hover:text-indigo-400"><Edit3 size={18} /></button>
//             <button className="p-2 bg-white/5 rounded-xl text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
//           </div>
//           <div className="flex items-center gap-4 mb-4 text-indigo-500">
//             <div className="p-3 bg-indigo-500/10 rounded-2xl"><Home size={24} /></div>
//             <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white px-3 py-1 rounded-full shadow-lg">Default Home</span>
//           </div>
//           <h4 className="text-2xl font-black text-slate-100">Dhanmondi, Dhaka</h4>
//           <p className="text-slate-500 font-medium mt-2 leading-relaxed">House #12/A, Road #05, Dhanmondi R/A, Dhaka 1209</p>
//           <div className="mt-6 flex items-center gap-4 text-slate-400 font-bold text-sm">
//             <Phone size={14} className="text-indigo-400" /> +880 1711-223344
//           </div>
//         </div>

//         <div className="p-8 bg-white/5 border border-white/10 rounded-[3rem] group opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
//           <div className="flex items-center gap-4 mb-4 text-slate-500">
//             <div className="p-3 bg-white/5 rounded-2xl"><Briefcase size={24} /></div>
//             <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Office</span>
//           </div>
//           <h4 className="text-2xl font-black text-slate-100">Banani, Dhaka</h4>
//           <p className="text-slate-500 font-medium mt-2 leading-relaxed">Level 4, Safura Tower, 20 Kemal Ataturk Ave, Dhaka 1213</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { MapPin, Plus, Edit3, Trash2, Phone, Home, Briefcase, X, Save } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// // টাইপ ডিফিনিশন
// interface Address {
//   id: string;
//   type: "Home" | "Office";
//   isDefault: boolean;
//   title: string;
//   addressLine: string;
//   phone: string;
// }

// export default function AddressesSection() {
//   // ১. স্টেট ম্যানেজমেন্ট (প্রাথমিক ডাটা)
//   const [addresses, setAddresses] = useState<Address[]>([
//     {
//       id: "1",
//       type: "Home",
//       isDefault: true,
//       title: "Dhanmondi, Dhaka",
//       addressLine: "House #12/A, Road #05, Dhanmondi R/A, Dhaka 1209",
//       phone: "+880 1711-223344",
//     },
//     {
//       id: "2",
//       type: "Office",
//       isDefault: false,
//       title: "Banani, Dhaka",
//       addressLine: "Level 4, Safura Tower, 20 Kemal Ataturk Ave, Dhaka 1213",
//       phone: "+880 1911-556677",
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingAddress, setEditingAddress] = useState<Address | null>(null);

//   // ২. ডিলিট ফাংশন
//   const handleDelete = (id: string) => {
//     if (confirm("Are you sure you want to delete this address?")) {
//       setAddresses(addresses.filter((addr) => addr.id !== id));
//     }
//   };

//   // ৩. এডিট মোড ওপেন করা
//   const openEditModal = (address: Address) => {
//     setEditingAddress({ ...address });
//     setIsModalOpen(true);
//   };

//   // ৪. সেভ ফাংশন
//   const handleSave = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (editingAddress) {
//       setAddresses(
//         addresses.map((addr) => (addr.id === editingAddress.id ? editingAddress : addr))
//       );
//       setIsModalOpen(false);
//       setEditingAddress(null);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-3xl font-black tracking-tight text-white">Saved Addresses</h3>
//         <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-lg hover:scale-105 transition-all">
//           <Plus size={16} /> New Address
//         </button>
//       </div>

//       {/* Address Cards */}
//       <div className="grid gap-6">
//         {addresses.map((addr) => (
//           <motion.div
//             layout
//             key={addr.id}
//             className={`p-8 bg-white/5 border border-white/10 rounded-[3rem] relative group hover:bg-white/[0.08] transition-all ${
//               !addr.isDefault ? "opacity-70 hover:opacity-100" : ""
//             }`}
//           >
//             <div className="absolute top-8 right-8 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//               <button
//                 onClick={() => openEditModal(addr)}
//                 className="p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-indigo-400 border border-white/5"
//               >
//                 <Edit3 size={18} />
//               </button>
//               <button
//                 onClick={() => handleDelete(addr.id)}
//                 className="p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-red-500 border border-white/5"
//               >
//                 <Trash2 size={18} />
//               </button>
//             </div>

//             <div className="flex items-center gap-4 mb-4 text-indigo-500">
//               <div className="p-3 bg-indigo-500/10 rounded-2xl">
//                 {addr.type === "Home" ? <Home size={24} /> : <Briefcase size={24} />}
//               </div>
//               <span
//                 className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg ${
//                   addr.isDefault ? "bg-indigo-600 text-white" : "bg-white/10 text-slate-400"
//                 }`}
//               >
//                 {addr.isDefault ? `Default ${addr.type}` : addr.type}
//               </span>
//             </div>

//             <h4 className="text-2xl font-black text-slate-100">{addr.title}</h4>
//             <p className="text-slate-500 font-medium mt-2 leading-relaxed">{addr.addressLine}</p>
//             <div className="mt-6 flex items-center gap-4 text-slate-400 font-bold text-sm">
//               <Phone size={14} className="text-indigo-400" /> {addr.phone}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* --- EDIT MODAL --- */}
//       <AnimatePresence>
//         {isModalOpen && editingAddress && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsModalOpen(false)}
//               className="absolute inset-0 bg-black/80 backdrop-blur-xl"
//             />

//             {/* Modal Content */}
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-[3.5rem] p-10 relative z-20 shadow-2xl"
//             >
//               <div className="flex justify-between items-center mb-8">
//                 <h4 className="text-2xl font-black text-white">Edit Address</h4>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="p-2 bg-white/5 rounded-full text-slate-400 hover:text-white"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>

//               <form onSubmit={handleSave} className="space-y-6">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Location Title</label>
//                   <input
//                     type="text"
//                     value={editingAddress.title}
//                     onChange={(e) => setEditingAddress({ ...editingAddress, title: e.target.value })}
//                     className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-indigo-500 transition-all"
//                     placeholder="e.g. Dhanmondi, Dhaka"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Full Address</label>
//                   <textarea
//                     value={editingAddress.addressLine}
//                     onChange={(e) => setEditingAddress({ ...editingAddress, addressLine: e.target.value })}
//                     className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-indigo-500 transition-all h-24 resize-none"
//                     placeholder="House, Road, Area details..."
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Phone Number</label>
//                   <input
//                     type="text"
//                     value={editingAddress.phone}
//                     onChange={(e) => setEditingAddress({ ...editingAddress, phone: e.target.value })}
//                     className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-indigo-500 transition-all"
//                     placeholder="+880"
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 rounded-[2rem] text-xs font-black text-white uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-600/20"
//                 >
//                   <Save size={16} /> Save Changes
//                 </button>
//               </form>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { Plus, Edit3, Trash2, Phone, Home, Briefcase, X, Save, CheckCircle2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAddressStore, Address } from "@/app/store/useAddressStore";

// export default function AddressesSection() {
//   const { addresses, addAddress, updateAddress, deleteAddress, setDefault } = useAddressStore();
  
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingAddress, setEditingAddress] = useState<Address | null>(null);

//   // এডিট মোড ওপেন
//   const handleEdit = (addr: Address) => {
//     setEditingAddress({ ...addr });
//     setIsModalOpen(true);
//   };

//   // নতুন অ্যাড্রেস মোড ওপেন
//   const handleAddNew = () => {
//     setEditingAddress({
//       id: Math.random().toString(36).substr(2, 9),
//       type: "Home",
//       isDefault: false,
//       title: "",
//       addressLine: "",
//       phone: "",
//     });
//     setIsModalOpen(true);
//   };

//   // সেভ করার লজিক
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (editingAddress) {
//       const exists = addresses.some(a => a.id === editingAddress.id);
//       if (exists) {
//         updateAddress(editingAddress.id, editingAddress);
//       } else {
//         addAddress(editingAddress);
//       }
//       setIsModalOpen(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between mb-8">
//         <h3 className="text-3xl font-black tracking-tight text-white">Saved Addresses</h3>
//         <button 
//           onClick={handleAddNew}
//           className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black shadow-lg hover:scale-105 transition-all"
//         >
//           <Plus size={16} /> New Address
//         </button>
//       </div>

//       <div className="grid gap-6">
//         <AnimatePresence mode="popLayout">
//           {addresses.map((addr) => (
//             <motion.div 
//               layout key={addr.id}
//               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
//               className={`p-8 bg-white/5 border border-white/10 rounded-[3rem] relative group hover:bg-white/[0.08] transition-all ${!addr.isDefault && 'opacity-70'}`}
//             >
//               {/* Action Buttons */}
//               <div className="absolute top-8 right-8 flex gap-2">
//                 <button onClick={() => handleEdit(addr)} className="p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-indigo-400 border border-white/5"><Edit3 size={18} /></button>
//                 <button onClick={() => deleteAddress(addr.id)} className="p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-red-500 border border-white/5"><Trash2 size={18} /></button>
//               </div>

//               <div className="flex items-center gap-4 mb-4">
//                 <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-500">
//                   {addr.type === "Home" ? <Home size={24} /> : <Briefcase size={24} />}
//                 </div>
//                 {addr.isDefault ? (
//                   <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white px-3 py-1 rounded-full shadow-lg">Default {addr.type}</span>
//                 ) : (
//                   <button onClick={() => setDefault(addr.id)} className="text-[10px] font-black uppercase tracking-widest bg-white/10 text-slate-400 px-3 py-1 rounded-full hover:bg-white/20">Set as Default</button>
//                 )}
//               </div>

//               <h4 className="text-2xl font-black text-slate-100">{addr.title}</h4>
//               <p className="text-slate-500 font-medium mt-2 leading-relaxed max-w-lg">{addr.addressLine}</p>
              
//               <div className="mt-6 flex items-center gap-4 text-slate-400 font-bold text-sm">
//                 <Phone size={14} className="text-indigo-400" /> {addr.phone}
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//       {/* --- Dynamic Edit/Add Modal --- */}
//       <AnimatePresence>
//         {isModalOpen && editingAddress && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
//             <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-[3.5rem] p-10 relative z-20 shadow-2xl">
//               <div className="flex justify-between items-center mb-8">
//                 <h4 className="text-2xl font-black text-white">{addresses.some(a => a.id === editingAddress.id) ? 'Edit Address' : 'Add New Address'}</h4>
//                 <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 rounded-full text-slate-400 hover:text-white"><X size={20} /></button>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div className="grid grid-cols-2 gap-4">
//                    <button type="button" onClick={() => setEditingAddress({...editingAddress, type: 'Home'})} className={`p-4 rounded-2xl font-bold flex items-center justify-center gap-2 border transition-all ${editingAddress.type === 'Home' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}><Home size={18}/> Home</button>
//                    <button type="button" onClick={() => setEditingAddress({...editingAddress, type: 'Office'})} className={`p-4 rounded-2xl font-bold flex items-center justify-center gap-2 border transition-all ${editingAddress.type === 'Office' ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-500'}`}><Briefcase size={18}/> Office</button>
//                 </div>

//                 <input type="text" placeholder="Location Title (e.g. Dhanmondi)" value={editingAddress.title} onChange={e => setEditingAddress({...editingAddress, title: e.target.value})} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-indigo-500 font-bold" required />
//                 <textarea placeholder="Full Address Details" value={editingAddress.addressLine} onChange={e => setEditingAddress({...editingAddress, addressLine: e.target.value})} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-indigo-500 font-bold h-32 resize-none" required />
//                 <input type="text" placeholder="Phone Number" value={editingAddress.phone} onChange={e => setEditingAddress({...editingAddress, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-indigo-500 font-bold" required />

//                 <button type="submit" className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-600/20">
//                   <Save size={18} /> Save Address
//                 </button>
//               </form>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { 
  Plus, Edit3, Trash2, Phone, Home, Briefcase, 
  X, Save, CheckCircle2, MapPin, Star 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAddressStore, Address } from "@/app/store/useAddressStore";

export default function AddressesSection() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefault } = useAddressStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | any>(null);

  const handleEdit = (addr: Address) => {
    setEditingAddress({ ...addr });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingAddress({
      id: Math.random().toString(36).substr(2, 9),
      type: "Home",
      isDefault: false,
      title: "",
      addressLine: "",
      phone: "",
      zipCode: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      const exists = addresses.some(a => a.id === editingAddress.id);
      if (exists) {
        updateAddress(editingAddress.id, editingAddress);
      } else {
        addAddress(editingAddress);
      }
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 px-1 md:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase italic">Saved Addresses</h3>
          <p className="text-[9px] md:text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Manage your delivery locations</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] md:text-xs font-black shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
        >
          <Plus size={16} /> New Address
        </button>
      </div>

      {/* Address Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <AnimatePresence mode="popLayout">
          {addresses.map((addr) => (
            <motion.div 
              layout key={addr.id}
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-6 md:p-8 bg-white/[0.03] border border-white/10 rounded-[2rem] md:rounded-[3rem] relative group hover:bg-white/[0.06] transition-all overflow-hidden ${!addr.isDefault && 'opacity-80'}`}
            >
              {/* Action Buttons - Mobile Responsive */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 flex gap-2">
                <button onClick={() => handleEdit(addr)} className="p-2 md:p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-indigo-400 border border-white/5 transition-colors backdrop-blur-sm"><Edit3 size={16} /></button>
                <button onClick={() => deleteAddress(addr.id)} className="p-2 md:p-2.5 bg-white/5 rounded-xl text-slate-400 hover:text-red-500 border border-white/5 transition-colors backdrop-blur-sm"><Trash2 size={16} /></button>
              </div>

              {/* Type Badge & Default Status */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 shrink-0">
                  {addr.type === "Home" ? <Home size={20} /> : addr.type === "Office" ? <Briefcase size={20} /> : <Star size={20} />}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg ${addr.type === 'Primary' ? 'bg-amber-500 text-black' : 'bg-indigo-600 text-white'}`}>
                    {addr.type}
                  </span>
                  {addr.isDefault ? (
                    <span className="text-[9px] font-black uppercase tracking-widest bg-white/10 text-indigo-400 border border-indigo-500/30 px-3 py-1.5 rounded-full">Default</span>
                  ) : (
                    <button onClick={() => setDefault(addr.id)} className="text-[9px] font-black uppercase tracking-widest bg-white/5 text-slate-500 px-3 py-1.5 rounded-full hover:bg-white/20 hover:text-slate-300 transition-all border border-white/5">Set as Default</button>
                  )}
                </div>
              </div>

              {/* Address Details */}
              <h4 className="text-xl md:text-2xl font-black text-slate-100 mb-2 truncate pr-20">{addr.title}</h4>
              <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed mb-6 line-clamp-2 md:line-clamp-none">{addr.addressLine}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                  <Phone size={14} className="text-indigo-500" /> {addr.phone}
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                  <MapPin size={14} className="text-indigo-500" /> Zip: {addr.zipCode || "N/A"}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- Modal - Responsive Optimized --- */}
      <AnimatePresence>
        {isModalOpen && editingAddress && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            
            <motion.div 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              exit={{ y: "100%" }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0f172a] border-t sm:border border-white/10 w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 relative z-20 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#0f172a] py-2 z-10">
                <h4 className="text-xl md:text-2xl font-black text-white uppercase italic">{addresses.some(a => a.id === editingAddress.id) ? 'Edit Address' : 'Add New'}</h4>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 rounded-full text-slate-400 hover:text-white border border-white/5"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 pb-6">
                {/* Type Selection Grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                   {[
                     {id: 'Home', icon: Home}, 
                     {id: 'Office', icon: Briefcase}, 
                     {id: 'Primary', icon: Star}
                   ].map((btn) => (
                     <button 
                      key={btn.id}
                      type="button" 
                      onClick={() => setEditingAddress({...editingAddress, type: btn.id})} 
                      className={`py-4 rounded-2xl font-black flex flex-col items-center justify-center gap-2 border transition-all text-[9px] uppercase tracking-widest ${editingAddress.type === btn.id ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'}`}
                     >
                        <btn.icon size={18}/> {btn.id}
                     </button>
                   ))}
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-indigo-400 tracking-widest ml-4">Title</label>
                    <input type="text" placeholder="e.g. My Flat" value={editingAddress.title} onChange={e => setEditingAddress({...editingAddress, title: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl text-white outline-none focus:border-indigo-500 font-bold transition-all text-sm" required />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-indigo-400 tracking-widest ml-4">Full Address</label>
                    <textarea placeholder="Street, House No, Area..." value={editingAddress.addressLine} onChange={e => setEditingAddress({...editingAddress, addressLine: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl text-white outline-none focus:border-indigo-500 font-bold h-24 resize-none transition-all text-sm" required />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-indigo-400 tracking-widest ml-4">Phone</label>
                      <input type="text" placeholder="Phone" value={editingAddress.phone} onChange={e => setEditingAddress({...editingAddress, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl text-white outline-none focus:border-indigo-500 font-bold transition-all text-sm" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-indigo-400 tracking-widest ml-4">Zip Code</label>
                      <input type="text" placeholder="Zip" value={editingAddress.zipCode || ""} onChange={e => setEditingAddress({...editingAddress, zipCode: e.target.value})} className="w-full bg-white/5 border border-white/10 p-4 sm:p-5 rounded-2xl text-white outline-none focus:border-indigo-500 font-bold transition-all text-sm" required />
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 transition-all shadow-2xl shadow-indigo-600/30 active:scale-95">
                  <Save size={18} /> Save Address
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}