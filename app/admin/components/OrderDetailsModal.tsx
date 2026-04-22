'use client';
/* eslint-disable @next/next/no-img-element */
import { X, Package, Truck, CreditCard, User, MapPin, Phone, Hash, Calendar } from 'lucide-react';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

export default function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  if (!isOpen || !order) return null;

  // ✅ [FIXED] Case-sensitivity ফিক্স করার জন্য স্ট্যাটাসকে lowercase করে চেক করা হয়েছে
  const getStatusStyle = (status: string) => {
    const s = status?.toLowerCase();
    switch(s) {
      case 'delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.1)]';
      case 'shipped': return 'bg-purple-50 text-purple-700 border-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.1)]';
      case 'processing': return 'bg-blue-50 text-blue-700 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.1)]';
      case 'cancelled': return 'bg-rose-50 text-rose-700 border-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.1)]';
      default: return 'bg-amber-50 text-amber-700 border-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.1)]';
    }
  };

  return (
    // ✅ [ADDED] জড-ইনডেক্স বাড়াতে z-[150] করা হয়েছে যাতে অন্য সব এলিমেন্টের উপরে থাকে
    <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[150] flex items-center justify-center p-4 transition-all duration-500 animate-in fade-in">
      <div className="bg-white dark:bg-slate-950 rounded-[3.5rem] w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] border border-white dark:border-slate-800 flex flex-col scale-in-center animate-in zoom-in-95">
        
        {/* ✅ [IMPROVED] Header Section - আরও ক্লিন এবং মডার্ন করা হয়েছে */}
        <div className="flex items-start justify-between px-10 py-8 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                <Package size={20} />
              </span>
              <h2 className="text-3xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">Order Summary</h2>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Hash size={12} className="text-slate-400" />
              <p className="text-blue-600 font-mono text-[10px] font-black uppercase tracking-[0.2em]">{order._id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-100 dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-900/30 text-slate-400 hover:text-rose-600 rounded-full transition-all duration-300 hover:rotate-90">
            <X size={20} />
          </button>
        </div>

        {/* ✅ [FIXED] Scrollbar লুকানোর জন্য এবং স্মুথ স্ক্রলিং এর জন্য ক্লাস অ্যাড করা হয়েছে */}
        <div className="p-10 space-y-10 overflow-y-auto custom-scrollbar flex-1">
          
          {/* ✅ [IMPROVED] Status Badge - পালসিং ডট সহ ডিজাইন */}
          <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem]">
            <div className="flex items-center gap-3">
               <Calendar size={16} className="text-slate-400" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Order Timeline</span>
            </div>
            <div className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border flex items-center gap-3 transition-all ${getStatusStyle(order.status)}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              {order.status}
            </div>
          </div>

          {/* ✅ [IMPROVED] Info Cards - শ্যাডো এবং বর্ডার রেডিয়াস বাড়ানো হয়েছে */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 px-1">
                 <User size={12} className="text-blue-500" /> Customer Data
               </h3>
               <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow">
                 <p className="font-black text-lg text-slate-800 dark:text-slate-200 uppercase tracking-tight">{order.user?.name || order.shippingAddress?.fullName || "Guest User"}</p>
                 <p className="text-xs text-slate-400 font-bold mt-1 lowercase italic">{order.user?.email || "direct-checkout@store.com"}</p>
               </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 px-1">
                 <MapPin size={12} className="text-rose-500" /> Dispatch Location
               </h3>
               <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow">
                 <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed uppercase tracking-wide">
                   {order.shippingAddress?.address || order.shippingAddress?.addressLine1}, {order.shippingAddress?.city}
                 </p>
                 <div className="flex items-center gap-2 mt-3 text-blue-600">
                    <Phone size={12} />
                    <p className="text-xs font-black italic tracking-widest">{order.shippingAddress?.phoneNumber || order.shippingAddress?.phone}</p>
                 </div>
               </div>
            </div>
          </div>

          {/* ✅ [FIXED] Order Items - ইমেজ এবং টেক্সট অ্যালাইনমেন্ট ফিক্স করা হয়েছে */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5 flex items-center gap-2 px-1">
              <Package size={14} className="text-purple-500" /> Manifest Items
            </h3>
            <div className="border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden bg-slate-50/30 dark:bg-slate-900/20">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {(order.orderItems || order.items || []).map((item: any, idx: number) => (
                  <div key={idx} className="p-6 flex justify-between items-center group hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 p-1 bg-white dark:bg-slate-950">
                        <img src={item.image || '/api/placeholder/100/100'} alt="prod" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-blue-600 transition-colors">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-black mt-1 uppercase tracking-widest">
                          Qty: <span className="text-slate-900 dark:text-slate-200">{item.quantity}</span> 
                          <span className="mx-2">×</span> 
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-xl font-black text-slate-900 dark:text-white italic tracking-tighter">${(item.quantity * item.price).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ [IMPROVED] Payment Info - ডার্ক মোড এবং কালার স্কিম আপডেট করা হয়েছে */}
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -mr-32 -mt-32 transition-all group-hover:bg-blue-600/30" />
            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-5">
              <CreditCard size={18} className="text-blue-400" />
              <h4 className="font-black uppercase tracking-[0.3em] text-[10px] text-blue-400">Financial Summary</h4>
            </div>
            <div className="space-y-5 relative z-10">
               <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                 <span>Subtotal</span>
                 <span>${(order.totalPrice || order.totalAmount).toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-[11px] font-black uppercase tracking-widest opacity-40">
                 <span>Shipping Logistics</span>
                 <span className="text-emerald-400">FREE</span>
               </div>
               <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 block mb-1">Final Payable</span>
                    <span className="text-lg font-bold text-blue-400 uppercase tracking-tighter">Verified Amount</span>
                 </div>
                 <span className="text-5xl font-black text-white italic tracking-tighter">
                   ${(order.totalPrice || order.totalAmount).toLocaleString()}
                 </span>
               </div>
            </div>
            {/* ✅ [ADDED] পেমেন্ট স্ট্যাটাস ব্যাজ আরও সুন্দর করা হয়েছে */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_rgba(0,0,0,1)] ${order.isPaid ? 'bg-emerald-400' : 'bg-rose-500'}`}></div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                    Payment Status: <span className={order.isPaid ? 'text-emerald-400' : 'text-rose-400'}>{order.isPaid ? 'Settled' : 'Unpaid'}</span>
                  </p>
                </div>
                <Truck size={20} className="text-white/10" />
            </div>
          </div>
        </div>

        {/* ✅ [IMPROVED] Footer - বাটনগুলোকে আরও আই-ক্যাচিং করা হয়েছে */}
        <div className="border-t border-slate-100 dark:border-slate-800 p-8 flex gap-5 bg-white dark:bg-slate-950 backdrop-blur-md">
          <button 
            onClick={onClose}
            className="flex-1 py-5 border-2 border-slate-100 dark:border-slate-800 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all active:scale-95 shadow-sm"
          >
            Return to Dashboard
          </button>
          {order.status?.toLowerCase() !== 'delivered' && order.status?.toLowerCase() !== 'cancelled' && (
            <button className="flex-[1.5] py-5 bg-blue-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 shadow-[0_15px_30px_-10px_rgba(37,99,235,0.4)] transition-all active:scale-95 group flex items-center justify-center gap-3">
              <Truck size={14} className="group-hover:translate-x-1 transition-transform" />
              Manifest Logistics
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
