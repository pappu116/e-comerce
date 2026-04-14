'use client';

import { useState, useMemo, useEffect } from 'react';
import { 
  Truck, ChevronDown, Check, Search, Eye, 
  Trash2, MapPinned, Filter, X, ShoppingBag, AlertCircle 
} from 'lucide-react';
import DataTable from '../components/DataTable';
import OrderDetailsModal from '../components/OrderDetailsModal';
import ShippingModal from '../components/ShippingModal'; 
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';

// API Service import
import { orderService } from '@/app/lib/apiClient'; 

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.05)]",
  processing: "bg-blue-50 text-blue-700 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.05)]",
  shipped: "bg-purple-50 text-purple-700 border-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.05)]",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.05)]",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.05)]",
};

export default function OrdersPage() {
  const router = useRouter();
  
  // States
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Shipping Modal States
  const [isShipModalOpen, setIsShipModalOpen] = useState(false);
  const [pendingShipId, setPendingShipId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAll(); 
      const actualData = response.orders || (Array.isArray(response) ? response : []);
      setOrders(actualData);
    } catch (error: any) {
      console.error("Fetch Error:", error);
      setOrders([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const closeDropdown = () => setOpenDropdownId(null);
    window.addEventListener('click', closeDropdown);
    return () => window.removeEventListener('click', closeDropdown);
  }, []);

  const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  // ✅ Confirm Shipment (With full object spread to avoid backend validation errors)
  const confirmShipment = async (orderId: string, courierName: string, trackingId: string) => {
    try {
      const orderToUpdate = orders.find(o => o._id === orderId);
      if (!orderToUpdate) return;

      const updateData = {
        ...orderToUpdate, 
        status: 'shipped',
        trackingNumber: trackingId,
        paymentStatus: 'paid',
        notes: `Handover to ${courierName}. Trk: ${trackingId}`
      };

      const data = await orderService.updateStatus(orderId, updateData);

      if (data.success) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: 'shipped', trackingNumber: trackingId } : o));
        setIsShipModalOpen(false);
        alert("Order Dispatched Successfully!");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Shipment failed!");
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const formattedStatus = newStatus.toLowerCase();
    
    if (formattedStatus === 'shipped') {
      setPendingShipId(orderId);
      setIsShipModalOpen(true);
      return;
    }

    try {
      const data = await orderService.updateStatus(orderId, { status: formattedStatus });
      if (data.success) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: formattedStatus } : o));
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Status update failed!");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this order?')) return;
    try {
      const data = await orderService.delete(id);
      if (data.success) {
        setOrders(prev => prev.filter(o => o._id !== id));
      }
    } catch (error) {
      alert("Delete failed!");
    }
  };

  // ✅ Advanced Search & Filter Logic
  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    return orders.filter((order: any) => {
      const searchStr = searchTerm.toLowerCase();
      const idMatch = order._id?.toLowerCase().includes(searchStr);
      const nameMatch = (order.user?.name || order.shippingAddress?.fullName || "").toLowerCase().includes(searchStr);
      const emailMatch = (order.user?.email || "").toLowerCase().includes(searchStr);
      const statusMatch = statusFilter === 'All' || order.status?.toLowerCase() === statusFilter.toLowerCase();
      
      return (idMatch || nameMatch || emailMatch) && statusMatch;
    });
  }, [searchTerm, statusFilter, orders]);

  const columns = [
    { 
      key: "_id", 
      label: "Order ID", 
      render: (id: string) => (
        <span className="font-mono text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800">
          #{id.slice(-8).toUpperCase()}
        </span>
      ) 
    },
    { 
      key: "user", 
      label: "Customer", 
      render: (user: any, row: any) => (
        <div className="flex flex-col gap-0.5">
          <span className="font-black text-[12px] uppercase tracking-tight text-slate-800 dark:text-slate-200">
            {user?.name || row.shippingAddress?.fullName || "Guest User"}
          </span>
          <span className="text-[10px] text-slate-400 font-bold italic opacity-70">
            {user?.email || "Direct Order"}
          </span>
        </div>
      )
    },
    { 
      key: "totalAmount", 
      label: "Amount", 
      render: (val: number) => (
        <div className="flex flex-col">
          <span className="font-black text-slate-900 dark:text-white text-base tracking-tighter">৳{val?.toLocaleString()}</span>
          <span className="text-[8px] font-bold uppercase text-slate-400">Net Total</span>
        </div>
      )
    },
    { 
      key: "track", 
      label: "Logistics", 
      render: (_, row: any) => (
        <button 
          onClick={() => router.push(`/admin/orders/track/${row._id}`)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 text-slate-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 border border-slate-200 dark:border-slate-800 group shadow-sm active:scale-90"
        >
          <MapPinned size={14} className="group-hover:rotate-12 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-widest">Live Track</span>
        </button>
      )
    },
    { 
      key: "status", 
      label: "Status Control", 
      render: (status: string, row: any) => {
        const currentStatus = status?.toLowerCase() || 'pending';
        return (
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpenDropdownId(openDropdownId === row._id ? null : row._id)}
              className={`flex items-center justify-between w-44 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] border transition-all duration-500 shadow-sm
                ${statusStyles[currentStatus] || 'bg-slate-50 border-slate-200 text-slate-600'}`}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentStatus === 'delivered' ? 'bg-emerald-400' : currentStatus === 'cancelled' ? 'bg-rose-400' : 'bg-blue-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${currentStatus === 'delivered' ? 'bg-emerald-500' : currentStatus === 'cancelled' ? 'bg-rose-500' : 'bg-blue-500'}`}></span>
                </div>
                {status}
              </div>
              <ChevronDown size={14} className={`transition-transform duration-500 ${openDropdownId === row._id ? 'rotate-180' : ''}`} />
            </button>

            {openDropdownId === row._id && (
              <div className="absolute left-0 mt-3 w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-slate-200/50 dark:border-slate-800 rounded-[1.8rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.3)] z-[200] p-2.5 animate-in slide-in-from-top-4 duration-300">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] px-4 py-2">Quick Transition</p>
                {statusOptions.map((opt) => (
                  <button 
                    key={opt} 
                    onClick={() => { handleStatusChange(row._id, opt); setOpenDropdownId(null); }} 
                    className={`group flex items-center justify-between w-full px-4 py-3.5 text-[10px] font-black uppercase rounded-[1.2rem] transition-all duration-300 mb-1 last:mb-0
                      ${status.toLowerCase() === opt.toLowerCase() 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:translate-x-1'}`}
                  >
                    <span className="flex items-center gap-3">
                      {opt === 'Delivered' && <Check size={14} />}
                      {opt === 'Shipped' && <Truck size={14} />}
                      {opt === 'Cancelled' && <X size={14} />}
                      {opt}
                    </span>
                    {status.toLowerCase() === opt.toLowerCase() && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      }
    },
    { 
      key: "Action", 
      label: "Manage",
      render: (_, row: any) => (
        <div className="flex items-center gap-2">
            <button onClick={() => { setSelectedOrder(row); setIsModalOpen(true); }} className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all active:scale-75">
                <Eye size={18} />
            </button>
            <button onClick={() => handleDelete(row._id)} className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-rose-600 hover:border-rose-200 transition-all active:scale-75">
                <Trash2 size={18} />
            </button>
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6 bg-slate-50 dark:bg-black">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-[6px] border-blue-100 dark:border-slate-900 rounded-full"></div>
            <div className="absolute inset-0 border-[6px] border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            <ShoppingBag className="absolute inset-0 m-auto text-blue-600 animate-bounce" size={24} />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 animate-pulse">Syncing Order Stream</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto pb-20 px-8">
      {/* Header with Bento-style Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20">
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            <span className="text-white font-black text-[9px] uppercase tracking-widest">Live Ledger</span>
          </div>
          <h1 className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-tight">
            Order <span className="text-blue-600">Flow</span>
          </h1>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl flex items-center gap-6 min-w-[280px]">
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
                <Truck size={28} />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Managed</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">{orders.length}</span>
                    <span className="text-xs font-bold text-emerald-500 italic">Orders</span>
                </div>
            </div>
        </div>
      </div>

    {/* Dynamic Search & Filter Bar */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white dark:bg-slate-950 p-6 rounded-[3.5rem] border border-slate-100 dark:border-slate-900 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.15)] overflow-visible">
  
  {/* Modern Search Input with Iconic Feedback */}
  <div className="md:col-span-8 relative group">
    <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-blue-600 transition-colors duration-300" />
    <Input 
      placeholder="Type Order ID, Customer Name, or Email address..." 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)} 
      className="h-20 pl-16 pr-8 bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white dark:focus:bg-slate-800 rounded-[2rem] text-sm font-bold shadow-inner transition-all duration-300 placeholder:text-slate-300" 
    />
    {searchTerm && (
      <button onClick={() => setSearchTerm('')} className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 bg-slate-200 hover:bg-slate-300 rounded-full transition-all active:scale-90">
          <X size={12} className="text-slate-500" />
      </button>
    )}
  </div>

  {/* Premium Custom Status Filter Dropdown */}
  <div className="md:col-span-4 relative" onClick={(e) => e.stopPropagation()}>
    <button 
      onClick={() => setIsFilterOpen(!isFilterOpen)}
      className={`w-full h-20 px-8 rounded-[2rem] flex items-center justify-between shadow-inner transition-all duration-300 border-2 
        ${isFilterOpen ? 'border-blue-600 bg-white' : 'bg-slate-50 dark:bg-slate-900/50 border-transparent hover:bg-slate-100 hover:border-blue-100'}`}
    >
      <div className="flex items-center gap-4">
        <Filter className={`h-5 w-5 ${statusFilter !== 'All' ? 'text-blue-600 animate-pulse' : 'text-slate-400'}`} />
        <div className="flex flex-col items-start gap-0.5">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Order Ledger</span>
          <span className={`text-[11px] font-black uppercase tracking-widest ${statusFilter === 'All' ? 'text-slate-500' : 'text-blue-700 dark:text-blue-400'}`}>
            {statusFilter === 'All' ? 'Showing All Transactions' : statusFilter}
          </span>
        </div>
      </div>
      <ChevronDown className={`h-5 w-5 text-slate-300 transition-transform duration-500 ${isFilterOpen ? 'rotate-180' : ''}`} />
    </button>

    {/* Dropdown Menu Overlay */}
    {isFilterOpen && (
      <div className="absolute top-full left-0 mt-3 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-slate-200/50 dark:border-slate-800 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] z-[500] p-3 animate-in fade-in slide-in-from-top-4 duration-300">
        <button 
          onClick={() => { setStatusFilter('All'); setIsFilterOpen(false); }}
          className={`group flex items-center justify-between w-full px-6 py-4 text-[10px] font-black uppercase rounded-2xl transition-all mb-1
            ${statusFilter === 'All' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500'}`}
        >
          <span className="flex items-center gap-3">
            <ShoppingBag size={14} className={statusFilter === 'All' ? "text-white" : "text-slate-300"} />
            All neuralgia transactions
          </span>
          {statusFilter === 'All' && <Check size={14} />}
        </button>
        
        <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-2.5 mx-5" />

        {statusOptions.map((opt) => (
          <button 
            key={opt} 
            onClick={() => { setStatusFilter(opt); setIsFilterOpen(false); }} 
            className={`flex items-center justify-between w-full px-6 py-4.5 text-[10px] font-black uppercase rounded-2xl transition-all mb-1 last:mb-0
              ${statusFilter === opt ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:translate-x-1'}`}
          >
            <span className="flex items-center gap-4">
              <div className={`w-1.5 h-1.5 rounded-full ${statusFilter === opt ? 'bg-white' : 'bg-blue-500'}`} />
              {opt}
            </span>
            {statusFilter === opt && <Check size={14} />}
          </button>
        ))}
      </div>
    )}
  </div>
</div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-slate-950 rounded-[3.5rem] border border-slate-100 dark:border-slate-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden p-4">
        <DataTable data={filteredOrders} columns={columns} />
        
        {filteredOrders.length === 0 && (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-200">
                <AlertCircle size={40} />
            </div>
            <p className="text-slate-400 font-black uppercase text-[11px] tracking-[0.3em]">No matching neural records found</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedOrder && (
        <OrderDetailsModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          order={selectedOrder} 
        />
      )}

      <ShippingModal 
        isOpen={isShipModalOpen} 
        onClose={() => setIsShipModalOpen(false)} 
        onConfirm={confirmShipment} 
        orderId={pendingShipId} 
      />
    </div>
  ); 
}
