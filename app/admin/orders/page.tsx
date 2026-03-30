'use client';
import { useState, useMemo } from 'react';
import { Download, Truck, ChevronDown, Check, Search, Eye, Trash2 } from 'lucide-react';
import DataTable from '../components/DataTable';
import OrderDetailsModal from '../components/OrderDetailsModal';
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'; // 1. Import Router

export default function OrdersPage() {
  const router = useRouter(); // 2. Initialize Router (Ei line-ta miss hoyeche)
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const [orders, setOrders] = useState([
    { id: "ORD-7842", customer: "Rahim Khan", product: "Sony WH-1000XM5", amount: "৳29,900", status: "Delivered", payment: "Paid" },
    { id: "ORD-7841", customer: "Sabrina Ahmed", product: "MacBook Air M3", amount: "৳1,45,000", status: "Processing", payment: "Paid" },
    { id: "ORD-7840", customer: "Tamim Iqbal", product: "iPhone 16 Pro", amount: "৳1,25,000", status: "Shipped", payment: "Paid" },
  ]);

  const statusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        let newPayment = order.payment;
        if (newStatus === "Cancelled") newPayment = "Refunded";
        else if (order.payment === "Refunded") newPayment = "Paid";
        return { ...order, status: newStatus, payment: newPayment };
      }
      return order;
    }));
    setOpenDropdownId(null);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, orders]);

  const columns = [
    { key: "id", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "product", label: "Product" },
    { 
      key: "amount", 
      label: "Amount",
      render: (amount: string) => <span className="font-bold text-slate-900 dark:text-white">{amount}</span>
    },
    { 
      key: "status", 
      label: "Status Update",
      render: (status: string, row: any) => {
        const currentIndex = filteredOrders.findIndex(o => o.id === row.id);
        const isNearBottom = currentIndex >= filteredOrders.length - 2;
        return (
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === row.id ? null : row.id); }}
              className={`flex items-center justify-between w-36 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all backdrop-blur-md
                ${status === 'Delivered' ? 'bg-emerald-50/50 border-emerald-200 text-emerald-700' : 
                  status === 'Cancelled' ? 'bg-red-50/50 border-red-200 text-red-700' : 
                  'bg-blue-50/50 border-blue-200 text-blue-700'}
              `}
            >
              {status}
              <ChevronDown size={14} className={openDropdownId === row.id ? 'rotate-180' : ''} />
            </button>
            {openDropdownId === row.id && (
              <>
                <div className="fixed inset-0 z-[60]" onClick={() => setOpenDropdownId(null)} />
                <div className={`absolute left-0 w-44 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border dark:border-slate-800 rounded-2xl shadow-2xl z-[70] overflow-hidden p-1.5
                  ${isNearBottom ? 'bottom-full mb-2' : 'top-full mt-2'}
                `}>
                  {statusOptions.map((opt) => (
                    <button key={opt} onClick={() => handleStatusChange(row.id, opt)} className="flex items-center justify-between w-full px-4 py-2.5 text-[10px] font-bold uppercase hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                      {opt} {status === opt && <Check size={14} className="text-blue-500" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      }
    },
    { 
        key: "payment", 
        label: "Payment",
        render: (payment: string) => (
          <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full 
            ${payment === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {payment}
          </span>
        )
    },
    { 
      key: "Tracker", 
      label: "Tracker",
      render: (_, row: any) => (
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Tracker</span>
          <button 
             onClick={() => router.push(`/admin/orders/track/${row.id}`)} // 3. Working Router
             className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-95"
          >
            <Truck size={14} /> Track
          </button>
        </div>
      )
    },
    { 
      key: "Action", 
      label: "Action",
      render: (_, row: any) => (
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Action</span>
          <div className="flex items-center gap-1.5 p-1 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl">
              <button onClick={() => { setSelectedOrder(row); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-all">
                  <Eye size={18} />
              </button>
              <button onClick={() => { if(confirm('Delete?')) setOrders(prev => prev.filter(o => o.id !== row.id)) }} className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-all">
                  <Trash2 size={18} />
              </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Orders List</h1>
          <p className="text-sm text-slate-500 font-medium">Manage and monitor all incoming shop orders</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm">
          <Download size={18} className="text-blue-600" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="h-14 pl-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold shadow-sm" />
        </div>
        <div className="md:col-span-4">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full h-14 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer">
            <option value="All">All Filter</option>
            {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-slate-800 shadow-2xl overflow-hidden p-2">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="min-w-[1350px]">
            <DataTable data={filteredOrders} columns={columns} />
          </div>
        </div>
      </div>

      <OrderDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} order={selectedOrder} />
    </div>
  );
}
// 'use client';
// import { useState, useMemo } from 'react';
// import { Download, Truck, ChevronDown, Check, Search, Eye, Trash2 } from 'lucide-react';
// import DataTable from '../components/DataTable';
// import OrderDetailsModal from '../components/OrderDetailsModal';
// import { Input } from "@/components/ui/input";

// export default function OrdersPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
  
//   // Modals and UI State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);
//   const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

//   const [orders, setOrders] = useState([
//     { id: "ORD-7842", customer: "Rahim Khan", product: "Sony WH-1000XM5", amount: "৳29,900", status: "Delivered", payment: "Paid", date: "Mar 29, 2026" },
//     { id: "ORD-7841", customer: "Sabrina Ahmed", product: "MacBook Air M3", amount: "৳1,45,000", status: "Processing", payment: "Paid", date: "Mar 29, 2026" },
//     { id: "ORD-7840", customer: "Tamim Iqbal", product: "iPhone 16 Pro", amount: "৳1,25,000", status: "Shipped", payment: "Paid", date: "Mar 28, 2026" },
//     { id: "ORD-7839", customer: "Nadia Islam", product: "Samsung Galaxy Watch 7", amount: "৳18,500", status: "Delivered", payment: "Paid", date: "Mar 28, 2026" },
//     { id: "ORD-7838", customer: "Karim Hossain", product: "Dell XPS 13", amount: "৳1,05,000", status: "Cancelled", payment: "Refunded", date: "Mar 27, 2026" },
//   ]);

//   const statusOptions = ["Processing", "Shipped", "Delivered", "Cancelled"];

//   const handleStatusChange = (orderId: string, newStatus: string) => {
//     setOrders(prev => prev.map(order => {
//       if (order.id === orderId) {
//         let newPayment = order.payment;
//         if (newStatus === "Cancelled") newPayment = "Refunded";
//         else if (order.payment === "Refunded") newPayment = "Paid";
//         return { ...order, status: newStatus, payment: newPayment };
//       }
//       return order;
//     }));
//     setOpenDropdownId(null);
//   };

//   const filteredOrders = useMemo(() => {
//     return orders.filter(order => {
//       const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           order.customer.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
//       return matchesSearch && matchesStatus;
//     });
//   }, [searchTerm, statusFilter, orders]);

//   const columns = [
//     { key: "id", label: "Order ID" },
//     { key: "customer", label: "Customer" },
//     { key: "product", label: "Product" },
//     { 
//       key: "amount", 
//       label: "Amount",
//       render: (amount: string) => <span className="font-bold text-slate-900 dark:text-white tracking-tight">{amount}</span>
//     },
//     { 
//       key: "status", 
//       label: "Status Update",
//       render: (status: string, row: any) => {
//         const currentIndex = filteredOrders.findIndex(o => o.id === row.id);
//         const isNearBottom = currentIndex >= filteredOrders.length - 2;

//         return (
//           <div className="relative">
//             <button
//               onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === row.id ? null : row.id); }}
//               className={`flex items-center justify-between w-36 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 backdrop-blur-sm
//                 ${status === 'Delivered' ? 'bg-emerald-50/50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : ''}
//                 ${status === 'Cancelled' ? 'bg-red-50/50 border-red-200 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-blue-50/50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'}
//               `}
//             >
//               {status}
//               <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdownId === row.id ? 'rotate-180' : ''}`} />
//             </button>

//             {openDropdownId === row.id && (
//               <>
//                 <div className="fixed inset-0 z-[60]" onClick={() => setOpenDropdownId(null)} />
//                 <div className={`absolute left-0 w-44 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-2xl shadow-2xl z-[70] overflow-hidden animate-in fade-in zoom-in-95 duration-200
//                   ${isNearBottom ? 'bottom-full mb-2' : 'top-full mt-2'}
//                 `}>
//                   {statusOptions.map((opt) => (
//                     <button key={opt} onClick={() => handleStatusChange(row.id, opt)} className="flex items-center justify-between w-full px-4 py-3 text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300 hover:bg-blue-50/50 dark:hover:bg-blue-900/30 transition-colors">
//                       {opt} {status === opt && <Check size={14} className="text-blue-500" />}
//                     </button>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         );
//       }
//     },
//     { 
//         key: "payment", 
//         label: "Payment",
//         render: (payment: string) => (
//           <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full backdrop-blur-md shadow-sm
//             ${payment === 'Paid' ? 'bg-green-100/50 text-green-700 dark:bg-green-900/30' : 'bg-red-100/50 text-red-700 dark:bg-red-900/30'}`}>
//             {payment}
//           </span>
//         )
//     },
//     { 
//       key: "Tracker", 
//       label: "Tracker",
//       render: (_, row: any) => (
//         <div className="flex flex-col items-center gap-1.5">
//           <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Tracker</span>
//           <button 
//              onClick={() => console.log('Tracking Order:', row.id)}
//              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-95 active:shadow-none"
//           >
//             <Truck size={14} /> Track
//           </button>
//         </div>
//       )
//     },
//     { 
//       key: "Action", 
//       label: "Action",
//       render: (_, row: any) => (
//         <div className="flex flex-col items-center gap-1.5">
//           <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Action</span>
//           <div className="flex items-center gap-1.5 p-1 bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-md rounded-xl border border-slate-200/50 dark:border-slate-700/50">
//               <button onClick={() => { setSelectedOrder(row); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all">
//                   <Eye size={18} />
//               </button>
//               {/* Edit Icon Removed as per request */}
//               <button onClick={() => { if(confirm('Delete this order?')) setOrders(prev => prev.filter(o => o.id !== row.id)) }} className="p-2 text-slate-400 hover:text-red-600 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all">
//                   <Trash2 size={18} />
//               </button>
//           </div>
//         </div>
//       )
//     }
//   ];

//   return (
//     <div className="space-y-8 max-w-[1600px] mx-auto pb-10 px-4">
//       {/* Page Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-8">
//         <div className="space-y-1">
//           <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Orders List</h1>
//           <p className="text-sm text-slate-500 font-medium">Manage and monitor all incoming shop orders</p>
//         </div>
//         <button className="flex items-center justify-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md transition-all active:scale-95">
//           <Download size={18} className="text-blue-600" /> Export CSV
//         </button>
//       </div>

//       {/* Filters Area */}
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
//         <div className="md:col-span-8 relative">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
//           <Input placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="h-14 pl-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 ring-blue-500/20 transition-all" />
//         </div>
//         <div className="md:col-span-4">
//           <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full h-14 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm cursor-pointer focus:ring-2 ring-blue-500/20 transition-all">
//             <option value="All">All Filter</option>
//             {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//           </select>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-slate-800 shadow-2xl overflow-hidden">
//         <div className="overflow-x-auto scrollbar-hide">
//           <div className="min-w-[1350px]">
//             <DataTable data={filteredOrders} columns={columns} />
//           </div>
//         </div>
//       </div>

//       <OrderDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} order={selectedOrder} />
//     </div>
//   );
// }