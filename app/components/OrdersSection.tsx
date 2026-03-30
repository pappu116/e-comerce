"use client";
import { useState } from "react";
import Link from 'next/link';
import { 
  Package, Truck, FileText, CheckCircle2, Clock, 
  X, MapPin, RefreshCcw, Send, ChevronDown, 
  ShoppingBag, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";



export default function OrdersSection() {
  const [orderList] = useState([
    { 
      id: "10241", 
      date: "28 Mar, 2026", 
      status: "In Transit", 
      total: 1250, 
      address: "House #12, Road #04, Sector #09, Uttara, Dhaka",
      payment: "Cash on Delivery",
      items: [{ name: "Premium Oversized Hoodie", price: 1250, qty: 1, size: "XL" }]
    },
    { 
      id: "10238", 
      date: "20 Mar, 2026", 
      status: "Delivered", 
      total: 850, 
      address: "Mirpur 10, Block C, Dhaka",
      payment: "Paid (bKash)",
      items: [{ name: "Luxury Quartz Watch", price: 850, qty: 1, size: "OS" }] 
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<null | any>(null);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnOrder, setReturnOrder] = useState<null | any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [returnReason, setReturnReason] = useState("Wrong Size");
  const reasons = ["Wrong Size", "Product Damage", "Quality Issues", "Not as described"];

  // ১. ইনভয়েস ডাউনলোড ফাংশন
  const handleDownloadInvoice = (orderId: string) => {
    alert(`Downloading Invoice for Order #PREM-${orderId}...`);
  };

  // ২. রিটার্ন সাবমিট ফাংশন (যেটি মিসিং ছিল)
  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Return request submitted for Order #PREM-${returnOrder?.id || 'N/A'}`);
    setIsReturnModalOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-8 md:space-y-10 px-2 sm:px-0">
      
      {/* Quick Status Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="p-6 md:p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group">
            <Package className="absolute -right-4 -bottom-4 text-indigo-500/10 group-hover:scale-110 transition-transform duration-700" size={100} />
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2">Current Shipment</p>
            <h4 className="text-xl md:text-2xl font-black text-white italic">#PREM-10241</h4>
        </div>
        
        <div className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-row sm:flex-col justify-between sm:justify-center items-center text-center">
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 sm:mb-2">Total Orders</p>
            <h4 className="text-2xl md:text-3xl font-black text-white">{orderList.length}</h4>
        </div>

        <div className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-row sm:flex-col justify-between sm:justify-center items-center text-center sm:col-span-2 md:col-span-1">
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 sm:mb-2">Total Spent</p>
            <h4 className="text-2xl md:text-3xl font-black text-indigo-400 leading-none">৳2,100</h4>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase italic">Purchase History</h3>
        <div className="h-px flex-1 bg-white/5 mx-6 hidden sm:block" />
      </div>

      <div className="space-y-6">
        {orderList.map((order) => (
          <motion.div 
            key={order.id} 
            whileHover={{ y: -5 }}
            className="p-6 md:p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] group hover:bg-white/[0.07] transition-all relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div className="flex gap-4 items-center">
                  <div className="p-3 md:p-4 bg-white/5 rounded-2xl text-indigo-500 border border-white/5 shadow-inner">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                      <h4 className="font-black text-lg md:text-xl text-slate-100 uppercase italic">Order #PREM-{order.id}</h4>
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-0.5">Placed on {order.date}</p>
                  </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-2 self-start md:self-center ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}>
                {order.status === 'Delivered' ? <CheckCircle2 size={12} /> : <Clock size={12} />} {order.status}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-white/5 gap-6">
              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                <button 
                  onClick={() => setSelectedOrder(order)} 
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 rounded-xl md:rounded-2xl text-[10px] font-black text-white hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 uppercase tracking-widest"
                >
                  <Truck size={14} /> Track Order
                </button>
                {order.status === "Delivered" && (
                  <button 
                    onClick={() => { setReturnOrder(order); setIsReturnModalOpen(true); }} 
                    className="w-full sm:w-auto px-6 py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-[10px] font-black text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                  >
                     <RefreshCcw size={14} /> Return
                  </button>
                )}
              </div>
              <div className="w-full sm:w-auto text-center sm:text-right border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Total Paid</p>
                  <p className="text-2xl md:text-3xl font-black text-white leading-none">৳{order.total}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* TRACKING MODAL */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div 
              initial={{ scale: 0.95, y: 30 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.95, y: 30 }} 
              className="bg-[#0f172a] border border-white/10 w-full max-w-2xl rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 relative z-10 shadow-2xl overflow-y-auto max-h-[95vh] scrollbar-hide"
            >
              <div className="flex justify-between items-start mb-8 md:mb-10">
                <div>
                  <h4 className="text-2xl md:text-3xl font-black leading-tight text-white uppercase italic">Shipment Status</h4>
                  <p className="text-indigo-400 font-black text-[10px] md:text-xs tracking-widest uppercase mt-1">Ref: #PREM-{selectedOrder.id}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 md:p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-slate-400"><X size={20} /></button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                <div className="space-y-8 relative ml-2 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
                  <div className="flex gap-6 items-start relative">
                    <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-[#0f172a] z-10 shrink-0"><CheckCircle2 size={10} className="text-white" /></div>
                    <div className="flex-1"><p className="font-black text-slate-100 text-xs md:text-sm uppercase tracking-tight">Order Confirmed</p><p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">{selectedOrder.date}</p></div>
                  </div>
                  <div className="flex gap-6 items-start relative">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-4 border-[#0f172a] z-10 shrink-0 ${selectedOrder.status !== 'Delivered' ? 'bg-indigo-600 animate-pulse' : 'bg-indigo-600'}`}><Truck size={10} className="text-white" /></div>
                    <div className="flex-1"><p className="font-black text-slate-100 text-xs md:text-sm uppercase tracking-tight">In Transit</p><p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">Package out for delivery</p></div>
                  </div>
                  <div className={`flex gap-6 items-start relative ${selectedOrder.status !== 'Delivered' ? 'opacity-20' : ''}`}>
                    <div className={`w-6 h-6 rounded-full border-4 border-[#0f172a] z-10 shrink-0 ${selectedOrder.status === 'Delivered' ? 'bg-indigo-600' : 'bg-slate-800'}`}></div>
                    <div className="flex-1"><p className="font-black text-slate-100 text-xs md:text-sm uppercase tracking-tight">Delivered</p></div>
                  </div>
                </div>

                <div className="space-y-5 bg-white/5 border border-white/5 rounded-[2rem] p-5 md:p-6 text-white">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Shipping Destination</p>
                    <p className="text-xs md:text-sm text-slate-300 font-bold leading-relaxed">{selectedOrder.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Payment</p><p className="text-xs md:text-sm text-slate-100 font-black">{selectedOrder.payment}</p></div>
                    <div><p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Estimated</p><p className="text-xs md:text-sm text-green-500 font-black uppercase">Next 24 Hours</p></div>
                  </div>
                  <hr className="border-white/5" />
                  <div className="space-y-3">
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Item Summary</p>
                    {selectedOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                        <span className="text-[11px] font-bold text-slate-300">{item.name} <span className="text-indigo-500 ml-1">x{item.qty}</span></span>
                        <span className="text-[11px] font-black text-white">৳{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <button onClick={() => handleDownloadInvoice(selectedOrder.id)} className="flex-1 py-4 md:py-5 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-[10px] font-black hover:bg-white/10 text-white flex items-center justify-center gap-2 uppercase tracking-[0.2em] transition-all">
                  <FileText size={16} /> Invoice
                </button>
                <Link href="/Contact" className="flex-1">
                <button className="w-full py-4 md:py-5 bg-indigo-600 rounded-xl md:rounded-2xl text-[10px] font-black text-white hover:bg-indigo-500 uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-2 transition-all">
                  <Send size={16} /> Help Center
                </button>
              </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RETURN MODAL */}
      <AnimatePresence>
        {isReturnModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsReturnModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }} 
              className="bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 relative z-20 text-white"
            >
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-xl md:text-2xl font-black uppercase italic tracking-tight">Return Gateway</h4>
                <button onClick={() => setIsReturnModalOpen(false)} className="p-2 bg-white/5 rounded-full"><X size={20} /></button>
              </div>

              {/* সংশোধিত ফর্ম */}
              <form onSubmit={handleReturnSubmit} className="space-y-5">
                <div className="relative">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-3 px-1">Reason for request</label>
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className="w-full bg-white/5 border border-white/10 p-4 md:p-5 rounded-xl md:rounded-2xl text-white flex justify-between items-center cursor-pointer hover:bg-white/[0.08] transition-all"
                  >
                    <span className="font-bold text-xs md:text-sm">{returnReason}</span>
                    <ChevronDown className={`text-slate-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} size={18} />
                  </div>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} 
                        className="absolute z-50 w-full mt-2 bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
                      >
                        {reasons.map((reason) => (
                          <div 
                            key={reason} 
                            onClick={() => { setReturnReason(reason); setIsDropdownOpen(false); }} 
                            className="p-4 text-xs font-bold text-slate-300 hover:bg-indigo-600 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-none"
                          >
                            {reason}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <textarea 
                  placeholder="Additional details about the issue..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 h-28 md:h-32 resize-none focus:border-indigo-500 outline-none text-xs md:text-sm font-medium transition-all" 
                  required 
                />

                <button type="submit" className="w-full py-4 md:py-5 bg-indigo-600 rounded-xl md:rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all active:scale-95">
                  <ArrowRight size={16} /> Confirm Return
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


// "use client";
// import { Package, Truck, FileText, CheckCircle2, Clock } from "lucide-react";
// import { motion } from "framer-motion";

// const orders = [
//   { id: "10241", date: "28 Mar, 2026", status: "In Transit", total: 1250, items: 2 },
//   { id: "10238", date: "20 Mar, 2026", status: "Delivered", total: 850, items: 1 }
// ];

// export default function OrdersSection() {
//   return (
//     <div className="space-y-6">
//       <h3 className="text-3xl font-black tracking-tight mb-6">My Orders</h3>
//       {orders.map((order) => (
//         <motion.div key={order.id} whileHover={{ y: -5 }} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/[0.08] transition-all group">
//           <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
//             <div>
//               <p className="text-indigo-400 font-black text-sm uppercase tracking-widest">Order #PREM-{order.id}</p>
//               <h4 className="text-slate-500 font-bold text-sm mt-1">{order.date} • {order.items} Items</h4>
//             </div>
//             <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
//               {order.status === 'Delivered' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
//               {order.status}
//             </span>
//           </div>
          
//           <div className="flex justify-between items-center pt-6 border-t border-white/5">
//             <p className="text-2xl font-black text-white">৳{order.total}</p>
//             <div className="flex gap-3">
//               <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 rounded-2xl text-xs font-black hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">
//                 <Truck size={16} /> Track
//               </button>
//               <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-black hover:bg-white/10 transition-all">
//                 <FileText size={16} /> Invoice
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { 
//   Package, Truck, FileText, CheckCircle2, Clock, 
//   Trash2, X, MapPin, AlertCircle, RefreshCcw, ChevronRight 
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function OrdersSection() {
//   const [orderList, setOrderList] = useState([
//     { 
//       id: "10241", 
//       date: "28 Mar, 2026", 
//       status: "In Transit", 
//       total: 1250, 
//       shipping: 60,
//       tax: 50,
//       items: [
//         { name: "Premium Oversized Hoodie", price: 1250, qty: 1, color: "Black", size: "XL" }
//       ]
//     },
//     { 
//       id: "10238", 
//       date: "20 Mar, 2026", 
//       status: "Delivered", 
//       total: 850, 
//       shipping: 60,
//       tax: 30,
//       items: [
//         { name: "Luxury Quartz Watch", price: 850, qty: 1, color: "Silver", size: "OS" }
//       ] 
//     }
//   ]);

//   const [selectedOrder, setSelectedOrder] = useState<null | any>(null);

//   const handleDelete = (id: string) => {
//     if (confirm("Are you sure you want to remove this order from history?")) {
//       setOrderList(orderList.filter(o => o.id !== id));
//     }
//   };

//   const handleCancel = (id: string) => {
//     alert(`Order #${id} cancellation request sent. Our team will contact you shortly.`);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between mb-8">
//         <h3 className="text-3xl font-black tracking-tight text-white">Purchase History</h3>
//         <div className="text-right">
//             <p className="text-indigo-400 font-black text-xl leading-none">{orderList.length}</p>
//             <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Total Orders</p>
//         </div>
//       </div>
      
//       {orderList.length === 0 && (
//         <div className="py-20 text-center bg-white/5 rounded-[3rem] border border-dashed border-white/10">
//           <Package size={48} className="mx-auto text-slate-700 mb-4" />
//           <p className="text-slate-500 font-bold text-lg">You haven't ordered anything yet!</p>
//         </div>
//       )}

//       {orderList.map((order) => (
//         <motion.div 
//           key={order.id} 
//           layout
//           className="p-8 bg-white/5 border border-white/10 rounded-[3rem] group hover:bg-white/[0.07] transition-all relative overflow-hidden"
//         >
//           {/* Top Info */}
//           <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
//             <div className="flex gap-4 items-center">
//                 <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-500">
//                     <Package size={24} />
//                 </div>
//                 <div>
//                     <h4 className="font-black text-xl text-slate-100">Order #PREM-{order.id}</h4>
//                     <p className="text-slate-500 font-bold text-xs uppercase tracking-tighter">Placed on {order.date}</p>
//                 </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
//                 order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
//               }`}>
//                 {order.status === 'Delivered' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
//                 {order.status}
//               </span>
//               <button onClick={() => handleDelete(order.id)} className="p-2.5 bg-white/5 text-slate-500 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all">
//                 <Trash2 size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Items Summary */}
//           <div className="space-y-4 mb-8">
//             {order.items.map((item, idx) => (
//                 <div key={idx} className="flex justify-between items-center bg-white/[0.02] p-4 rounded-2xl border border-white/5">
//                     <div className="flex gap-4">
//                         <div className="w-12 h-12 bg-zinc-800 rounded-xl border border-white/10 shrink-0" />
//                         <div>
//                             <p className="font-black text-slate-200 text-sm">{item.name}</p>
//                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Size: {item.size} • Color: {item.color} • Qty: {item.qty}</p>
//                         </div>
//                     </div>
//                     <p className="font-black text-indigo-400">৳{item.price}</p>
//                 </div>
//             ))}
//           </div>
          
//           {/* Actions & Price */}
//           <div className="flex flex-wrap justify-between items-center pt-8 border-t border-white/5 gap-6">
//             <div className="flex gap-3">
//               <button 
//                 onClick={() => setSelectedOrder(order)}
//                 className="px-8 py-3.5 bg-indigo-600 rounded-2xl text-xs font-black hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2 uppercase tracking-widest"
//               >
//                 <Truck size={16} /> Track Order
//               </button>
              
//               {order.status === "Delivered" ? (
//                 <button className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-xs font-black hover:bg-white/10 transition-all flex items-center gap-2 uppercase tracking-widest">
//                    <RefreshCcw size={14} /> Request Return
//                 </button>
//               ) : (
//                 <button onClick={() => handleCancel(order.id)} className="px-6 py-3.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl text-xs font-black hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest">
//                    Cancel Order
//                 </button>
//               )}
//             </div>

//             <div className="text-right">
//                 <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Total Amount</p>
//                 <p className="text-3xl font-black text-white leading-none">৳{order.total}</p>
//             </div>
//           </div>
//         </motion.div>
//       ))}

//       {/* Advanced Tracking Modal */}
//       <AnimatePresence>
//         {selectedOrder && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
//             <motion.div initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }} className="bg-[#0f172a] border border-white/10 w-full max-w-xl rounded-[3.5rem] p-10 relative z-10 shadow-[0_0_100px_rgba(99,102,241,0.1)]">
              
//               <div className="flex justify-between items-start mb-10">
//                 <div>
//                     <h4 className="text-3xl font-black text-white leading-tight">Shipment Tracking</h4>
//                     <p className="text-indigo-400 font-bold text-sm tracking-widest uppercase mt-1">Order #PREM-{selectedOrder.id}</p>
//                 </div>
//                 <button onClick={() => setSelectedOrder(null)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-slate-400"><X size={20} /></button>
//               </div>

//               {/* Timeline */}
//               <div className="space-y-10 relative ml-2 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-indigo-500 before:to-slate-800">
//                 <div className="flex gap-6 items-start relative">
//                   <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-[#0f172a] z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]"><CheckCircle2 size={12} className="text-white" /></div>
//                   <div className="flex-1">
//                     <div className="flex justify-between"><p className="font-black text-slate-100">Order Placed</p><span className="text-[10px] font-bold text-slate-500">28 MAR, 10:00 AM</span></div>
//                     <p className="text-xs text-slate-500 mt-1">Your order was successfully received by the warehouse.</p>
//                   </div>
//                 </div>

//                 <div className="flex gap-6 items-start relative">
//                   <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-[#0f172a] z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]"><Truck size={12} className="text-white" /></div>
//                   <div className="flex-1">
//                     <div className="flex justify-between"><p className="font-black text-slate-100">Package Dispatched</p><span className="text-[10px] font-bold text-slate-500">29 MAR, 02:30 PM</span></div>
//                     <p className="text-xs text-slate-500 mt-1">Assigned to Hero Rider (Pathao Express). Hub: Dhaka North.</p>
//                   </div>
//                 </div>

//                 <div className={`flex gap-6 items-start relative ${selectedOrder.status !== 'Delivered' ? 'opacity-40' : ''}`}>
//                   <div className={`w-6 h-6 rounded-full flex items-center justify-center border-4 border-[#0f172a] z-10 ${selectedOrder.status === 'Delivered' ? 'bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`}>
//                     <MapPin size={12} className="text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex justify-between"><p className="font-black text-slate-100">Delivered</p><span className="text-[10px] font-bold text-slate-500">ESTIMATED: 31 MAR</span></div>
//                     <p className="text-xs text-slate-500 mt-1">Package will be delivered to your Dhanmondi address.</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Order Summary In Modal */}
//               <div className="mt-12 p-6 bg-white/5 rounded-[2rem] border border-white/5">
//                 <div className="flex justify-between text-xs font-bold text-slate-500 mb-2"><span>Subtotal</span><span>৳{selectedOrder.total - selectedOrder.shipping - selectedOrder.tax}</span></div>
//                 <div className="flex justify-between text-xs font-bold text-slate-500 mb-2"><span>Shipping Fee</span><span>৳{selectedOrder.shipping}</span></div>
//                 <div className="flex justify-between text-xs font-bold text-slate-500 mb-4"><span>Vat/Tax</span><span>৳{selectedOrder.tax}</span></div>
//                 <div className="flex justify-between font-black text-white text-lg pt-4 border-t border-white/5"><span>Total Paid</span><span>৳{selectedOrder.total}</span></div>
//               </div>

//               <div className="mt-8 flex gap-4">
//                  <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black hover:bg-white/10 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
//                     <FileText size={16} /> Get Invoice
//                  </button>
//                  <button className="flex-1 py-4 bg-indigo-600 rounded-2xl text-xs font-black hover:bg-indigo-500 transition-all uppercase tracking-widest shadow-xl shadow-indigo-600/20">
//                     Need Help?
//                  </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


// "use client";
// import { useState } from "react";
// import { 
//   Package, Truck, FileText, CheckCircle2, Clock, 
//   Trash2, X, MapPin, AlertCircle, RefreshCcw, Send,
//   ArrowRight, ExternalLink
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function OrdersSection() {
//   const [orderList, setOrderList] = useState([
//     { 
//       id: "10241", 
//       date: "28 Mar, 2026", 
//       status: "In Transit", 
//       total: 1250, 
//       shipping: 60,
//       tax: 50,
//       items: [
//         { name: "Premium Oversized Hoodie", price: 1250, qty: 1, color: "Black", size: "XL" }
//       ]
//     },
//     { 
//       id: "10238", 
//       date: "20 Mar, 2026", 
//       status: "Delivered", 
//       total: 850, 
//       shipping: 60,
//       tax: 30,
//       items: [
//         { name: "Luxury Quartz Watch", price: 850, qty: 1, color: "Silver", size: "OS" }
//       ] 
//     }
//   ]);

//   const [selectedOrder, setSelectedOrder] = useState<null | any>(null);
//   const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
//   const [returnOrder, setReturnOrder] = useState<any>(null);

//   // --- Functions ---
//   const handleDownloadInvoice = (order: any) => {
//     alert(`Generating Invoice for Order #PREM-${order.id}...`);
//   };

//   const handleSupport = (orderId: string) => {
//     window.open(`https://wa.me/YOUR_NUMBER?text=Help%20with%20Order%20${orderId}`, "_blank");
//   };

//   const handleReturnSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert("Return request submitted successfully!");
//     setIsReturnModalOpen(false);
//   };

//   return (
//     <div className="space-y-10">
      
//       {/* --- ১. Quick Status Preview (নতুন যোগ করা হয়েছে) --- */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-[2.5rem] relative overflow-hidden group">
//             <Package className="absolute -right-4 -bottom-4 text-indigo-500/10 group-hover:scale-110 transition-transform" size={120} />
//             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2">Ongoing Delivery</p>
//             <h4 className="text-2xl font-black text-white">#PREM-10241</h4>
//             <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-400">
//                <Clock size={14} /> Expected: 31 Mar
//             </div>
//         </div>

//         <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col justify-center">
//             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Total Spent</p>
//             <h4 className="text-3xl font-black text-white">৳2,100</h4>
//             <p className="text-[10px] text-green-500 font-bold mt-2 flex items-center gap-1 uppercase tracking-tighter">
//               <CheckCircle2 size={10} /> All payments cleared
//             </p>
//         </div>

//         <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col justify-center">
//             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Voucher Used</p>
//             <h4 className="text-3xl font-black text-indigo-400">02</h4>
//             <p className="text-[10px] text-slate-500 font-bold mt-2 uppercase">Save more on next order</p>
//         </div>
//       </div>

//       <hr className="border-white/5" />

//       {/* --- ২. Purchase History List --- */}
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h3 className="text-3xl font-black tracking-tight text-white">Purchase History</h3>
//           <div className="text-right">
//               <p className="text-indigo-400 font-black text-xl leading-none">{orderList.length}</p>
//               <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Total Orders</p>
//           </div>
//         </div>

//         <AnimatePresence>
//           {orderList.map((order) => (
//             <motion.div 
//               key={order.id} 
//               layout 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="p-8 bg-white/5 border border-white/10 rounded-[3rem] group hover:bg-white/[0.07] transition-all relative overflow-hidden"
//             >
//               {/* Order Header */}
//               <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
//                 <div className="flex gap-4 items-center">
//                     <div className="p-4 bg-white/5 rounded-2xl text-indigo-500 border border-white/5"><Package size={24} /></div>
//                     <div>
//                         <h4 className="font-black text-xl text-slate-100 flex items-center gap-2">
//                           Order #PREM-{order.id}
//                           <ExternalLink size={14} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
//                         </h4>
//                         <p className="text-slate-500 font-bold text-xs uppercase tracking-tighter">Placed on {order.date}</p>
//                     </div>
//                 </div>
//                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
//                   {order.status === 'Delivered' ? <CheckCircle2 size={12} /> : <Clock size={12} />} {order.status}
//                 </span>
//               </div>

//               {/* Item Details */}
//               <div className="space-y-4 mb-8">
//                 {order.items.map((item, idx) => (
//                     <div key={idx} className="flex justify-between items-center bg-white/[0.02] p-5 rounded-2xl border border-white/5">
//                         <div className="flex gap-4 items-center">
//                             <div className="w-14 h-14 bg-zinc-900 rounded-xl border border-white/10 flex items-center justify-center text-slate-700 font-black text-xs">IMG</div>
//                             <div>
//                                 <p className="font-black text-slate-200 text-sm">{item.name}</p>
//                                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Size: {item.size} • Qty: {item.qty}</p>
//                             </div>
//                         </div>
//                         <p className="font-black text-white">৳{item.price}</p>
//                     </div>
//                 ))}
//               </div>
              
//               {/* Footer Actions */}
//               <div className="flex flex-wrap justify-between items-center pt-8 border-t border-white/5 gap-6">
//                 <div className="flex gap-3">
//                   <button onClick={() => setSelectedOrder(order)} className="px-8 py-4 bg-indigo-600 rounded-2xl text-xs font-black text-white hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2 uppercase tracking-widest">
//                     <Truck size={16} /> Track Order
//                   </button>
                  
//                   {order.status === "Delivered" && (
//                     <button onClick={() => { setReturnOrder(order); setIsReturnModalOpen(true); }} className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-white hover:bg-white/10 transition-all flex items-center gap-2 uppercase tracking-widest">
//                        <RefreshCcw size={14} /> Return
//                     </button>
//                   )}
//                 </div>
//                 <div className="text-right">
//                     <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Total Amount</p>
//                     <p className="text-3xl font-black text-white leading-none">৳{order.total}</p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>

//       {/* --- TRACKING MODAL --- */}
//       <AnimatePresence>
//         {selectedOrder && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
//             <motion.div initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }} className="bg-[#0f172a] border border-white/10 w-full max-w-xl rounded-[3.5rem] p-10 relative z-10 shadow-2xl">
//               <div className="flex justify-between items-start mb-10">
//                 <div>
//                     <h4 className="text-3xl font-black leading-tight">Shipment Status</h4>
//                     <p className="text-indigo-400 font-bold text-sm tracking-widest uppercase mt-1">Order #PREM-{selectedOrder.id}</p>
//                 </div>
//                 <button onClick={() => setSelectedOrder(null)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-slate-400"><X size={20} /></button>
//               </div>

//               {/* Timeline */}
//               <div className="space-y-10 relative ml-2 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-indigo-500/20">
//                 <div className="flex gap-6 items-start relative">
//                   <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-[#0f172a] z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]"><CheckCircle2 size={12} className="text-white" /></div>
//                   <div className="flex-1">
//                     <p className="font-black text-slate-100">Order Confirmed</p>
//                     <p className="text-xs text-slate-500 mt-1">Your payment has been verified.</p>
//                   </div>
//                 </div>

//                 <div className="flex gap-6 items-start relative">
//                   <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-[#0f172a] z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]"><Truck size={12} className="text-white" /></div>
//                   <div className="flex-1">
//                     <p className="font-black text-slate-100">In Transit</p>
//                     <p className="text-xs text-slate-500 mt-1">Rider picked up your package from the hub.</p>
//                   </div>
//                 </div>

//                 <div className="flex gap-6 items-start relative opacity-30">
//                   <div className="w-6 h-6 bg-slate-800 rounded-full border-4 border-[#0f172a] z-10"></div>
//                   <div className="flex-1">
//                     <p className="font-black text-slate-100">Delivered</p>
//                     <p className="text-xs text-slate-500 mt-1">Package reaching to your doorstep soon.</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-12 flex gap-4">
//                  <button onClick={() => handleDownloadInvoice(selectedOrder)} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black hover:bg-white/10 transition-all text-white flex items-center justify-center gap-2 uppercase tracking-[0.2em]">
//                     <FileText size={16} /> Invoice
//                  </button>
//                  <button onClick={() => handleSupport(selectedOrder.id)} className="flex-1 py-4 bg-indigo-600 rounded-2xl text-[10px] font-black text-white hover:bg-indigo-500 transition-all uppercase tracking-[0.2em] shadow-xl">
//                     Live Chat
//                  </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* --- RETURN FORM MODAL --- */}
//       <AnimatePresence>
//         {isReturnModalOpen && (
//           <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsReturnModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
//             <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-[3.5rem] p-10 relative z-20 text-white">
//               <div className="flex justify-between items-center mb-8">
//                 <h4 className="text-2xl font-black uppercase tracking-tight">Request Return</h4>
//                 <button onClick={() => setIsReturnModalOpen(false)} className="p-2 bg-white/5 rounded-full"><X size={20} /></button>
//               </div>
//               <form onSubmit={handleReturnSubmit} className="space-y-6">
//                 <div>
//                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Reason for Return</label>
//                   <select required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer font-bold text-sm">
//                     <option className="bg-[#0f172a]">Wrong Size</option>
//                     <option className="bg-[#0f172a]">Product Damage</option>
//                     <option className="bg-[#0f172a]">Quality Issues</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Message</label>
//                   <textarea placeholder="Describe the issue in detail..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 h-32 resize-none focus:border-indigo-500 transition-all outline-none font-medium text-sm" required />
//                 </div>
//                 <button type="submit" className="w-full py-5 bg-indigo-600 rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all">
//                   <Send size={16} /> Submit Request
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
// import { 
//   Package, Truck, FileText, CheckCircle2, Clock, 
//   X, MapPin, RefreshCcw, Send, ChevronDown, 
//   ExternalLink, ShoppingBag
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function OrdersSection() {
//   const [orderList, setOrderList] = useState([
//     { 
//       id: "10241", 
//       date: "28 Mar, 2026", 
//       status: "In Transit", 
//       total: 1250, 
//       items: [{ name: "Premium Oversized Hoodie", price: 1250, qty: 1, size: "XL" }]
//     },
//     { 
//       id: "10238", 
//       date: "20 Mar, 2026", 
//       status: "Delivered", 
//       total: 850, 
//       items: [{ name: "Luxury Quartz Watch", price: 850, qty: 1, size: "OS" }] 
//     }
//   ]);

//   // --- Modal States ---
//   const [selectedOrder, setSelectedOrder] = useState<null | any>(null); // For Tracking
//   const [isReturnModalOpen, setIsReturnModalOpen] = useState(false); // For Return Form
//   const [returnOrder, setReturnOrder] = useState<null | any>(null); // Selected order for return
  
//   // Custom Dropdown State for Return
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [returnReason, setReturnReason] = useState("Wrong Size");
//   const reasons = ["Wrong Size", "Product Damage", "Quality Issues", "Not as described"];

//   const handleReturnSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert(`Return request for #${returnOrder?.id} submitted: ${returnReason}`);
//     setIsReturnModalOpen(false);
//     setReturnOrder(null);
//   };

//   return (
//     <div className="space-y-10">
      
//       {/* --- ১. Quick Preview Cards --- */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="p-8 bg-indigo-500/10 border border-indigo-500/20 rounded-[2.5rem] relative overflow-hidden group">
//             <Package className="absolute -right-4 -bottom-4 text-indigo-500/10 group-hover:scale-110 transition-transform" size={120} />
//             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2">Ongoing Delivery</p>
//             <h4 className="text-2xl font-black text-white">#PREM-10241</h4>
//             <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-400">
//                <Clock size={14} /> Expected: 31 Mar
//             </div>
//         </div>

//         <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col justify-center text-center">
//             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Total Orders</p>
//             <h4 className="text-3xl font-black text-white">{orderList.length}</h4>
//         </div>

//         <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col justify-center text-center">
//             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Total Spent</p>
//             <h4 className="text-3xl font-black text-indigo-400">৳2,100</h4>
//         </div>
//       </div>

//       <hr className="border-white/5" />

//       {/* --- ২. Purchase History List --- */}
//       <div className="space-y-6">
//         <h3 className="text-3xl font-black tracking-tight text-white px-2">Purchase History</h3>
        
//         {orderList.map((order) => (
//           <motion.div 
//             key={order.id} 
//             layout 
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="p-8 bg-white/5 border border-white/10 rounded-[3rem] group hover:bg-white/[0.07] transition-all relative overflow-hidden"
//           >
//             <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
//               <div className="flex gap-4 items-center">
//                   <div className="p-4 bg-white/5 rounded-2xl text-indigo-500 border border-white/5"><ShoppingBag size={24} /></div>
//                   <div>
//                       <h4 className="font-black text-xl text-slate-100 flex items-center gap-2">
//                         Order #PREM-{order.id}
//                         <ExternalLink size={14} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
//                       </h4>
//                       <p className="text-slate-500 font-bold text-xs uppercase tracking-tighter">Placed on {order.date}</p>
//                   </div>
//               </div>
//               <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
//                 {order.status === 'Delivered' ? <CheckCircle2 size={12} /> : <Clock size={12} />} {order.status}
//               </span>
//             </div>

//             <div className="flex flex-wrap justify-between items-center pt-8 border-t border-white/5 gap-6">
//               <div className="flex gap-3">
//                 <button 
//                     onClick={() => setSelectedOrder(order)} 
//                     className="px-8 py-4 bg-indigo-600 rounded-2xl text-xs font-black text-white hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-2 uppercase tracking-widest"
//                 >
//                   <Truck size={16} /> Track Order
//                 </button>
                
//                 {order.status === "Delivered" && (
//                   <button 
//                     onClick={() => { setReturnOrder(order); setIsReturnModalOpen(true); }} 
//                     className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-white hover:bg-white/10 transition-all flex items-center gap-2 uppercase tracking-widest"
//                   >
//                      <RefreshCcw size={14} /> Return
//                   </button>
//                 )}
//               </div>
//               <div className="text-right">
//                   <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">Total Paid</p>
//                   <p className="text-3xl font-black text-white leading-none">৳{order.total}</p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* --- ৩. TRACKING MODAL (পপ-আপ ১) --- */}

//       {/* <AnimatePresence> */}
//         {/* {selectedOrder && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOrder(null)} className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />
//             <motion.div initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }} className="bg-[#0f172a] border border-white/10 w-full max-w-xl rounded-[3.5rem] p-10 relative z-10 shadow-2xl">
//               <div className="flex justify-between items-start mb-10">
//                 <div>
//                     <h4 className="text-3xl font-black leading-tight">Shipment Status</h4>
//                     <p className="text-indigo-400 font-bold text-sm tracking-widest uppercase mt-1">Order #PREM-{selectedOrder.id}</p>
//                 </div>
//                 <button onClick={() => setSelectedOrder(null)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-slate-400"><X size={20} /></button>
//               </div> */}

//               {/* Timeline Visuals */}
//               {/* <div className="space-y-10 relative ml-2 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-indigo-500/20">
//                 <div className="flex gap-6 items-start relative">
//                   <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-[#0f172a] z-10"><CheckCircle2 size={12} className="text-white" /></div>
//                   <div><p className="font-black text-slate-100">Order Confirmed</p><p className="text-xs text-slate-500">Processing in warehouse.</p></div>
//                 </div>
//                 <div className="flex gap-6 items-start relative">
//                   <div className={`w-6 h-6 rounded-full flex items-center justify-center border-4 border-[#0f172a] z-10 ${selectedOrder.status !== 'Delivered' ? 'bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`}><Truck size={12} className="text-white" /></div>
//                   <div><p className="font-black text-slate-100">In Transit</p><p className="text-xs text-slate-500">Package is on the way.</p></div>
//                 </div>
//                 <div className="flex gap-6 items-start relative opacity-30">
//                    <div className="w-6 h-6 bg-slate-800 rounded-full border-4 border-[#0f172a] z-10"></div>
//                    <div><p className="font-black text-slate-100">Delivered</p></div>
//                 </div>
//               </div>

//               <div className="mt-12 flex gap-4">
//                  <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest">Invoice</button>
//                  <button className="flex-1 py-4 bg-indigo-600 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest">Support</button>
//               </div>
//             </motion.div>
//           </div>
//         )} */}
//       {/* </AnimatePresence> */}

//       /* --- ৩. TRACKING MODAL (Updated with Details) --- */
// <AnimatePresence>
//   {selectedOrder && (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       <motion.div 
//         initial={{ opacity: 0 }} 
//         animate={{ opacity: 1 }} 
//         exit={{ opacity: 0 }} 
//         onClick={() => setSelectedOrder(null)} 
//         className="absolute inset-0 bg-black/95 backdrop-blur-2xl" 
//       />
//       <motion.div 
//         initial={{ scale: 0.95, y: 30 }} 
//         animate={{ scale: 1, y: 0 }} 
//         exit={{ scale: 0.95, y: 30 }} 
//         className="bg-[#0f172a] border border-white/10 w-full max-w-2xl rounded-[3.5rem] p-8 md:p-12 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
//       >
//         {/* Header */}
//         <div className="flex justify-between items-start mb-8">
//           <div>
//             <h4 className="text-3xl font-black leading-tight text-white">Shipment Status</h4>
//             <p className="text-indigo-400 font-bold text-sm tracking-widest uppercase mt-1">Order #PREM-{selectedOrder.id}</p>
//           </div>
//           <button onClick={() => setSelectedOrder(null)} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-slate-400">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {/* Left Side: Timeline */}
//           <div className="space-y-10 relative ml-2 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-indigo-500/20">
//             <div className="flex gap-6 items-start relative">
//               <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-[#0f172a] z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
//                 <CheckCircle2 size={12} className="text-white" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-black text-slate-100 text-sm">Order Confirmed</p>
//                 <p className="text-[11px] text-slate-500 mt-1">28 Mar, 2026 - 10:30 AM</p>
//               </div>
//             </div>

//             <div className="flex gap-6 items-start relative">
//               <div className={`w-6 h-6 rounded-full flex items-center justify-center border-4 border-[#0f172a] z-10 ${selectedOrder.status !== 'Delivered' ? 'bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`}>
//                 <Truck size={12} className="text-white" />
//               </div>
//               <div className="flex-1">
//                 <p className="font-black text-slate-100 text-sm">In Transit</p>
//                 <p className="text-[11px] text-slate-500 mt-1">Package is on the way to your city hub.</p>
//               </div>
//             </div>

//             <div className={`flex gap-6 items-start relative ${selectedOrder.status !== 'Delivered' ? 'opacity-30' : ''}`}>
//                <div className={`w-6 h-6 rounded-full border-4 border-[#0f172a] z-10 ${selectedOrder.status === 'Delivered' ? 'bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`}></div>
//                <div className="flex-1">
//                   <p className="font-black text-slate-100 text-sm">Delivered</p>
//                   <p className="text-[11px] text-slate-500 mt-1">Expected by 31 Mar, 2026</p>
//                </div>
//             </div>
//           </div>

//           {/* Right Side: Details Summary */}
//           <div className="space-y-6 bg-white/5 border border-white/5 rounded-[2rem] p-6">
//             <div>
//                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Shipping Address</p>
//                <p className="text-sm text-slate-300 font-medium leading-relaxed">
//                   House #12, Road #04, Sector #09, Uttara, Dhaka-1230
//                </p>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//                <div>
//                   <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Payment Method</p>
//                   <p className="text-sm text-slate-100 font-bold">Cash on Delivery</p>
//                </div>
//                <div>
//                   <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Est. Delivery</p>
//                   <p className="text-sm text-slate-100 font-bold text-green-500">31 Mar, 2026</p>
//                </div>
//             </div>

//             <hr className="border-white/5" />

//             <div>
//                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">Item Summary</p>
//                <div className="space-y-3">
//                   {selectedOrder.items.map((item: any, idx: number) => (
//                      <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
//                         <span className="text-xs font-bold text-slate-300">{item.name} <span className="text-indigo-400">x{item.qty}</span></span>
//                         <span className="text-xs font-black text-white">৳{item.price}</span>
//                      </div>
//                   ))}
//                </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="mt-10 flex flex-wrap md:flex-nowrap gap-4">
//           <button 
//             onClick={() => handleDownloadInvoice(selectedOrder)}
//             className="flex-1 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black hover:bg-indigo-600 hover:border-indigo-600 transition-all text-white flex items-center justify-center gap-2 uppercase tracking-[0.2em]"
//           >
//             <FileText size={16} /> Download Invoice
//           </button>
          
//           <button 
//             onClick={() => window.location.href = '/contact'}
//             className="flex-1 py-5 bg-indigo-600 rounded-2xl text-[10px] font-black text-white hover:bg-indigo-500 transition-all uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
//           >
//             <Send size={16} /> Contact Support
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   )}
// </AnimatePresence>

//       {/* --- ৪. কাস্টম ড্রপডাউন সহ রিটার্ন মোডাল (পপ-আপ ২) --- */}
//       <AnimatePresence>
//         {isReturnModalOpen && (
//           <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsReturnModalOpen(false); setIsDropdownOpen(false); }} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
//             <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-[3.5rem] p-10 relative z-20 text-white">
//               <div className="flex justify-between items-center mb-8">
//                 <h4 className="text-2xl font-black uppercase tracking-tight">Return Request</h4>
//                 <button onClick={() => { setIsReturnModalOpen(false); setIsDropdownOpen(false); }} className="p-2 bg-white/5 rounded-full hover:text-white transition-colors"><X size={20} /></button>
//               </div>

//               <form onSubmit={handleReturnSubmit} className="space-y-6">
//                 <div className="relative">
//                   <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-3 px-1">Reason for Return</label>
//                   <div 
//                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                     className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white flex justify-between items-center cursor-pointer hover:bg-white/[0.08] transition-all"
//                   >
//                     <span className="font-bold text-sm">{returnReason}</span>
//                     <ChevronDown className={`text-slate-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} size={20} />
//                   </div>

//                   <AnimatePresence>
//                     {isDropdownOpen && (
//                       <motion.div 
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         className="absolute z-50 w-full mt-2 bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
//                       >
//                         {reasons.map((reason) => (
//                           <div 
//                             key={reason}
//                             onClick={() => { setReturnReason(reason); setIsDropdownOpen(false); }}
//                             className="p-4 text-sm font-bold text-slate-300 hover:bg-indigo-600 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-none"
//                           >
//                             {reason}
//                           </div>
//                         ))}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 <textarea placeholder="Tell us more..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 h-32 resize-none focus:border-indigo-500 transition-all outline-none text-sm" required />

//                 <button type="submit" className="w-full py-5 bg-indigo-600 rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all">
//                   <Send size={16} /> Submit Return
//                 </button>
//               </form>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
