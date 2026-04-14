
// 'use client';
// import React, { useState } from 'react';
// import { 
//   DollarSign, ArrowUpRight, ArrowDownRight, Download, Search, 
//   CheckCircle2, Clock, AlertCircle, RotateCcw, FileText, 
//   ChevronRight, TrendingUp, Percent, Wallet, X, ShieldAlert, 
//   ArrowRight, Filter, Share2, FileJson, BarChart3, 
//   Info // <--- Ei line-e Info add kora hoyeche
// } from 'lucide-react';

// export default function ProfessionalPaymentPage() {
//   const [activeTab, setActiveTab] = useState('all');
//   const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
//   const [selectedTx, setSelectedTx] = useState<any>(null);
//   const [refundAmount, setRefundAmount] = useState<string>("");

//   const handleRefundClick = (tx: any) => {
//     setSelectedTx(tx);
//     setRefundAmount(tx.amount.replace(',', ''));
//     setIsRefundModalOpen(true);
//   };

//   return (
//     <div className="p-6 md:p-10 bg-[#f8fafc] dark:bg-[#05070a] min-h-screen relative text-slate-900 dark:text-white">
      
//       {/* 1. HEADER & EXPORT ACTIONS */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
//         <div>
//           <h1 className="text-3xl font-black uppercase italic tracking-tighter">
//             Financial <span className="text-indigo-600">Operations</span>
//           </h1>
//           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1 flex items-center gap-2">
//             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live System Status: Operational
//           </p>
//         </div>
        
//         <div className="flex flex-wrap gap-3">
//           <div className="flex bg-white dark:bg-[#0f1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-1 shadow-sm">
//             <button className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all border-r border-slate-100 dark:border-slate-800">
//               <FileText size={14} className="text-rose-500" /> PDF
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all border-r border-slate-100 dark:border-slate-800">
//               <Download size={14} className="text-emerald-500" /> Excel
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all">
//               <FileJson size={14} className="text-amber-500" /> JSON
//             </button>
//           </div>
//           <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">
//             <Wallet size={14} /> Payout Settings
//           </button>
//         </div>
//       </div>

//       {/* 2. KPI CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         <FinanceCard title="Total Revenue" value="$128,430.00" trend="+14.2%" icon={<DollarSign size={20}/>} color="indigo" />
//         <FinanceCard title="Net Profit" value="$94,120.50" trend="+10.5%" icon={<TrendingUp size={20}/>} color="emerald" />
//         <FinanceCard title="Gateway Fees" value="$3,240.12" trend="+2.1%" icon={<Percent size={20}/>} color="amber" />
//         <FinanceCard title="Refunded" value="$1,120.00" trend="-4.5%" icon={<RotateCcw size={20}/>} color="rose" />
//       </div>

//       {/* 3. DOUBLE CHART SECTION (REVENUE & GATEWAYS) */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        
//         {/* CHART 1: REVENUE ANALYSIS (BAR CHART) */}
//         <div className="lg:col-span-2 bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm relative group overflow-hidden">
//           <div className="flex justify-between items-center mb-10">
//             <div>
//               <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
//                 <BarChart3 size={18} className="text-indigo-600" /> Revenue Analysis
//               </h3>
//               <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 italic">Last 12 Months Performance</p>
//             </div>
//             <div className="flex gap-4 bg-slate-50 dark:bg-black/20 p-2 rounded-xl">
//               <div className="flex items-center gap-2 text-[9px] font-black uppercase"><span className="w-2.5 h-2.5 rounded-sm bg-indigo-600"></span> Gross</div>
//               <div className="flex items-center gap-2 text-[9px] font-black uppercase"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Net</div>
//             </div>
//           </div>
          
//           <div className="h-56 flex items-end gap-3 px-2">
//             {[40, 65, 45, 85, 55, 75, 100, 60, 90, 50, 70, 110].map((val, i) => (
//               <div key={i} className="flex-1 flex flex-col gap-1 items-center h-full justify-end group/bar">
//                 <div style={{ height: `${val * 0.6}%` }} className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 rounded-t-sm group-hover/bar:bg-emerald-500/40 transition-all duration-500"></div>
//                 <div style={{ height: `${val}%` }} className="w-full bg-indigo-600 rounded-t-md group-hover/bar:bg-indigo-400 transition-all duration-300 shadow-lg shadow-indigo-500/10"></div>
//                 <span className="text-[8px] font-bold text-slate-400 mt-2 opacity-0 group-hover/bar:opacity-100 transition-opacity">M{i+1}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* CHART 2: GATEWAY DISTRIBUTION (PROGRESS CHART) */}
//         <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
//           <div className="flex justify-between items-start mb-8">
//             <h3 className="font-black text-sm uppercase tracking-widest">Gateways</h3>
//             <button className="p-2 bg-slate-50 dark:bg-white/5 rounded-lg text-slate-400 hover:text-indigo-600 transition-all"><Share2 size={14}/></button>
//           </div>
//           <div className="space-y-7">
//             <MethodRow name="Stripe (Cards)" percent="65%" amount="$83,479" color="bg-indigo-600" />
//             <MethodRow name="PayPal Business" percent="20%" amount="$25,686" color="bg-blue-500" />
//             <MethodRow name="Apple/Google Pay" percent="10%" amount="$12,843" color="bg-slate-400" />
//             <MethodRow name="Crypto / BitPay" percent="5%" amount="$6,422" color="bg-amber-500" />
//           </div>
//           <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800/50">
//              <div className="flex items-center gap-3 p-4 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-2xl">
//                 <Info size={16} className="text-indigo-600 shrink-0" />
//                 <p className="text-[9px] font-bold text-indigo-600/80 leading-tight uppercase">Stripe is currently your most profitable gateway with 2.9% average fee.</p>
//              </div>
//           </div>
//         </div>
//       </div>

//       {/* 4. TRANSACTION LEDGER WITH ADVANCED FILTERS */}
//       <div className="bg-white dark:bg-[#0f1117] rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
//         <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex flex-wrap justify-between items-center gap-6">
//           <div className="flex gap-2 bg-slate-50 dark:bg-black/20 p-1.5 rounded-2xl">
//             {['all', 'completed', 'pending', 'refunded'].map((tab) => (
//               <button 
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white dark:bg-[#1a1d26] text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
          
//           <div className="flex flex-1 max-w-md gap-3">
//             <div className="relative flex-1">
//                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
//                <input type="text" placeholder="Search by Transaction ID, Name or Email..." className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#080a0f] rounded-2xl text-[10px] font-bold outline-none border-2 border-transparent focus:border-indigo-600 transition-all" />
//             </div>
//             <button className="p-3 bg-slate-50 dark:bg-[#080a0f] rounded-2xl text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100">
//               <Filter size={18} />
//             </button>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-50 dark:border-slate-800">
//               <tr>
//                 <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Client Ledger</th>
//                 <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Gateway</th>
//                 <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Gross Amount</th>
//                 <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
//                 <th className="px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Control</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
//                <TransactionItem name="Alex Murphy" id="TRX-99281" method="Visa •••• 4242" amount="1,200.00" fee="36.00" status="Completed" date="Mar 24, 2024" onRefund={() => handleRefundClick({name: "Alex Murphy", id: "TRX-99281", amount: "1,200.00"})} />
//                <TransactionItem name="Sarah Jenkins" id="TRX-99282" method="PayPal" amount="450.00" fee="13.50" status="Pending" date="Mar 23, 2024" onRefund={() => handleRefundClick({name: "Sarah Jenkins", id: "TRX-99282", amount: "450.00"})} />
//                <TransactionItem name="James Bond" id="TRX-99283" method="MasterCard" amount="5,000.00" fee="150.00" status="Refunded" date="Mar 22, 2024" />
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* 5. REFUND MODAL LOGIC */}
//       {isRefundModalOpen && selectedTx && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsRefundModalOpen(false)} />
//           <div className="relative w-full max-w-lg bg-white dark:bg-[#0f1117] rounded-[40px] shadow-2xl border border-slate-100 dark:border-slate-800 p-8 md:p-10 animate-in zoom-in duration-300">
//             <button onClick={() => setIsRefundModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-rose-600 transition-all"><X size={24} /></button>
//             <div className="flex items-center gap-4 mb-8">
//                 <div className="p-4 bg-rose-50 dark:bg-rose-500/10 text-rose-600 rounded-2xl"><ShieldAlert size={32} /></div>
//                 <div><h2 className="text-2xl font-black italic uppercase tracking-tighter">Process <span className="text-rose-600">Refund</span></h2><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedTx.id}</p></div>
//             </div>
//             <div className="space-y-6">
//                 <div className="p-5 bg-slate-50 dark:bg-[#080a0f] rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
//                     <div><p className="text-[10px] font-black text-slate-400 uppercase mb-1">Max Refundable</p><h3 className="text-2xl font-black tracking-tighter italic">${selectedTx.amount}</h3></div>
//                     <div className="text-right"><p className="text-[10px] font-black text-slate-400 uppercase mb-1">Customer</p><p className="text-xs font-bold uppercase">{selectedTx.name}</p></div>
//                 </div>
//                 <div className="space-y-3">
//                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Amount ($)</label>
//                     <input type="number" value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)} className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#080a0f] border-2 border-transparent focus:border-rose-500 text-lg font-black outline-none transition-all" />
//                 </div>
//                 <div className="p-4 bg-amber-50 dark:bg-amber-500/5 rounded-2xl border border-amber-100 dark:border-amber-900/30 flex gap-3">
//                     <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" /><p className="text-[9px] font-bold text-amber-700/80 uppercase leading-relaxed">This action will instantly reverse funds to the original gateway. Action is permanent.</p>
//                 </div>
//             </div>
//             <div className="flex gap-4 mt-8">
//                 <button onClick={() => setIsRefundModalOpen(false)} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Dismiss</button>
//                 <button onClick={() => { alert('Refund Initiated!'); setIsRefundModalOpen(false); }} className="flex-[2] py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-500/20 transition-all flex items-center justify-center gap-2">Confirm Refund <ArrowRight size={14}/></button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // --- SUB-COMPONENTS ---

// function FinanceCard({ title, value, trend, icon, color }: any) {
//   const colors: any = { indigo: "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10", emerald: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10", amber: "text-amber-600 bg-amber-50 dark:bg-amber-500/10", rose: "text-rose-600 bg-rose-50 dark:bg-rose-500/10" };
//   return (
//     <div className="bg-white dark:bg-[#0f1117] p-7 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
//       <div className="flex justify-between items-start mb-4">
//         <div className={`p-4 rounded-2xl ${colors[color]} group-hover:scale-110 transition-transform`}>{icon}</div>
//         <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{trend}</div>
//       </div>
//       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
//       <h2 className="text-2xl font-black mt-1 tracking-tighter italic">{value}</h2>
//     </div>
//   );
// }

// function MethodRow({ name, percent, amount, color }: any) {
//   return (
//     <div className="space-y-2">
//       <div className="flex justify-between text-[11px] font-black uppercase tracking-widest"><span className="text-slate-500">{name}</span><span>{amount}</span></div>
//       <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: percent }}></div></div>
//     </div>
//   );
// }

// function TransactionItem({ name, id, method, amount, fee, status, date, onRefund }: any) {
//   const statusStyles: any = { Completed: "bg-emerald-50 text-emerald-600", Pending: "bg-amber-50 text-amber-600", Refunded: "bg-rose-50 text-rose-600" };
//   return (
//     <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
//       <td className="px-8 py-5">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500">{name.charAt(0)}</div>
//           <div><p className="text-xs font-black group-hover:text-indigo-600 transition-colors">{name}</p><p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{id} • {date}</p></div>
//         </div>
//       </td>
//       <td className="px-8 py-5 text-xs font-bold">{method}</td>
//       <td className="px-8 py-5"><p className="text-sm font-black tracking-tighter">${amount}</p><p className="text-[9px] font-bold text-rose-500 uppercase italic">Fee: -${fee}</p></td>
//       <td className="px-8 py-5"><span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase ${statusStyles[status]}`}>{status}</span></td>
//       <td className="px-8 py-5 text-right">
//         <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-4">
//            {status === 'Completed' && (<button onClick={onRefund} className="p-2 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-all"><RotateCcw size={16} /></button>)}
//            <button className="p-2 text-slate-400 hover:bg-indigo-600 hover:text-white rounded-lg transition-all"><FileText size={16} /></button>
//         </div>
//       </td>
//     </tr>
//   );
// }


'use client';
import React, { useState, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, Wallet, RotateCcw, Percent,
  FileText, Download, X, FileJson, BarChart3, 
  ShieldAlert, ArrowRight 
} from 'lucide-react';
import API from '@/app/lib/apiClient';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [refundProcessing, setRefundProcessing] = useState(false);

  const [data, setData] = useState<any>({
    stats: { 
      totalRevenue: 0, 
      netProfit: 0, 
      totalCost: 0, 
      gatewayFees: 0, 
      refunded: 0 
    },
    transactions: [],
    gateways: []
  });

  // *********************** XL EXPORT CODE---------------------------------------
  const exportToExcel = () => {
    // ডাটা ফরম্যাট একটু সুন্দর করার জন্য (ঐচ্ছিক)
    const excelData = data.transactions.map((t: any) => ({
      Date: new Date(t.createdAt).toLocaleDateString(),
      Client: t.user?.name || "Guest",
      OrderID: t.orderNumber || t._id,
      Method: t.paymentMethod || "N/A",
      Amount: t.totalAmount,
      Status: t.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, `Financial_Report_${new Date().toLocaleDateString()}.xlsx`);
  };

  // --- ***********JSON Export ---************
  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(data.transactions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Financial_Report_${new Date().toISOString().slice(0,10)}.json`;
    link.click();
  };

  // --- **************PDF Export ---**********
 const exportToPDF = () => {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text('Financial Operations Report', 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Report Date: ${new Date().toLocaleString()}`, 14, 30);

  const tableColumn = ["Date", "Client", "Order ID", "Method", "Amount", "Status"];
  const tableRows = data.transactions.map((t: any) => [
    new Date(t.createdAt).toLocaleDateString(),
    t.user?.name || "Guest",
    t.orderNumber || t._id.slice(-8),
    t.paymentMethod || "COD",
    `Tk ${t.totalAmount}`,
    t.status
  ]);

  // ✅ (doc as any).autoTable এর বদলে সরাসরি autoTable(doc, { ... }) ব্যবহার করুন
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    theme: 'striped',
    headStyles: { fillColor: [79, 70, 229] },
    styles: { fontSize: 8 }
  });

  doc.save(`Financial_Report_${new Date().toISOString().slice(0,10)}.pdf`);
};

// Genarate Invocie 
const generateInvoice = (order: any) => {
  if (!order) {
    alert("Order data not found!");
    return;
  }

  const doc = new jsPDF();
  
  // ১. ইনভয়েস হেডার
  doc.setFontSize(20);
  doc.setTextColor(79, 70, 229); 
  doc.text('INVOICE', 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  // Optional Chaining (?.) ব্যবহার করা হয়েছে যাতে ডাটা না থাকলে এরর না দেয়
  doc.text(`Invoice No: #${order.orderNumber || order._id?.slice(-6) || 'N/A'}`, 14, 30);
  doc.text(`Order Date: ${order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}`, 14, 35);
  doc.text(`Payment Status: ${order.paymentStatus?.toUpperCase() || 'N/A'}`, 14, 40);

  // ২. কাস্টমার ডিটেইলস
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text('Bill To:', 14, 55);
  doc.setFontSize(10);
  doc.text(`Name: ${order.user?.name || order.shippingAddress?.fullName || "Customer"}`, 14, 62);
  doc.text(`Phone: ${order.phoneNumber || order.shippingAddress?.phone || "N/A"}`, 14, 67);
  doc.text(`Address: ${order.shippingAddress?.address || order.shippingAddress || "N/A"}`, 14, 72);

  // ৩. প্রোডাক্ট টেবিল (এটাই এররের মূল কারণ হতে পারে)
  const tableColumn = ["Product Name", "Qty", "Price", "Total"];
  
  // চেক করা হচ্ছে orderItems আছে কি না, না থাকলে খালি অ্যারে []
  const items = order.orderItems || order.products || []; 
  
  const tableRows = items.map((item: any) => [
    item.name || item.product?.name || "Product Name",
    item.quantity || 0,
    `Tk ${item.price || 0}`,
    `Tk ${(item.price || 0) * (item.quantity || 0)}`
  ]);

  autoTable(doc, {
    startY: 80,
    head: [tableColumn],
    body: tableRows,
    theme: 'grid',
    headStyles: { fillColor: [79, 70, 229] },
    styles: { fontSize: 9 }
  });

  // ৪. টোটাল হিসাব
  const finalY = (doc as any).lastAutoTable?.finalY || 100;
  doc.setFontSize(12);
  doc.text(`Total Amount: Tk ${order.totalAmount || 0}`, 14, finalY + 10);
  
  doc.save(`Invoice_${order.orderNumber || order._id?.toString().slice(-6) || 'N/A'}.pdf`);
};
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [refundAmount, setRefundAmount] = useState<string>("");

  useEffect(() => {
    fetchFinancialData();
  }, []);

const fetchFinancialData = async () => {
  try {
    setLoading(true);
    const res = await API.get('/admin/dashboard');
    
    if (res.data?.success) {
      const backendStats = res.data.stats;
      const orders = res.data.recentOrders || [];

      // ১. ডাটা এক্সট্র্যাক্ট করা
      const totalSales = backendStats.totalSales || 0;     // শুধুমাত্র Delivered Orders
      const totalProfit = backendStats.totalProfit || 0;   // Delivered Orders Profit (Revenue - Cost)
      const totalRefunded = backendStats.refunded || 0;   // মোট কত টাকা রিফান্ড করা হয়েছে
      
      // ২. গেটওয়ে ফি ক্যালকুলেশন (পুরো সেলের ওপর ২.৯%)
      const gatewayFees = totalSales * 0.029;

      // ৩. ✅ আসল নিট প্রফিট ক্যালকুলেশন:
      // লাভ = (বিক্রয় লাভ) - (গেটওয়ে ফি) - (রিফান্ড করা টাকার পরিমাণ)
      const netProfit = totalProfit - gatewayFees - totalRefunded;

      // ৪. গেটওয়ে ডিস্ট্রিবিউশন (আগের মতোই)
      const gatewayCounts: any = {};
      orders.forEach((order: any) => {
        const method = order.paymentMethod || 'Unknown';
        gatewayCounts[method] = (gatewayCounts[method] || 0) + (order.totalAmount || 0);
      });

     

      setData({
        stats: {
          totalRevenue: Math.round(totalSales),
          totalCost: Math.round(backendStats.totalCost || 0),
          gatewayFees: Math.round(gatewayFees),
          netProfit: Math.round(netProfit), // ✅ এখন রিফান্ড মাইনাস হয়ে আসবে
          refunded: Math.round(totalRefunded),
        },
        transactions: orders,
        gateways: Object.keys(gatewayCounts).map((key) => ({
          name: key.toUpperCase(),
          amount: gatewayCounts[key],
          percent: Math.round((gatewayCounts[key] / (totalSales || 1)) * 100) + '%'
        }))
      });
    }
  } catch (err) {
    console.error("Financial Data Fetch Error:", err);
  } finally {
    setLoading(false);
  }
};

  const handleConfirmRefund = async () => {
    if (!selectedTx) return;

    try {
      setRefundProcessing(true);
      
      const res = await API.put(`/admin/orders/${selectedTx._id}/status`, {
        status: 'cancelled', 
      });

      if (res.data?.success) {
        const updatedTransactions = data.transactions.map((t: any) => 
          t._id === selectedTx._id ? { ...t, status: 'cancelled' } : t
        );

        setData((prev: any) => ({
          ...prev,
          transactions: updatedTransactions,
          stats: {
            ...prev.stats,
            refunded: prev.stats.refunded + parseFloat(selectedTx.totalAmount || 0)
          }
        }));

        alert('✅ Refund Successful!');
        setIsRefundModalOpen(false);

        // ✅ পেজ নতুন করে রিলোড করবে
        fetchFinancialData();
      }
    } catch (err: any) {
      console.error("Refund Error:", err);
      alert(err.response?.data?.message || '❌ Refund Failed');
    } finally {
      setRefundProcessing(false);
    }
  };

  const handleRefundClick = (tx: any) => {
    setSelectedTx(tx);
    setRefundAmount((tx.totalAmount || 0).toString());
    setIsRefundModalOpen(true);
  };

  const filteredTransactions = data.transactions.filter((t: any) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'completed') return t.status === 'delivered' || t.status === 'shipped';
    if (activeTab === 'pending') return t.status === 'pending';
    if (activeTab === 'refunded') return t.status === 'cancelled';
    return true;
  });

  return (
    <div className="p-6 md:p-10 bg-[#f8fafc] dark:bg-[#05070a] min-h-screen relative text-slate-900 dark:text-white">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
            Financial <span className="text-indigo-600">Operations</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 
            Live System Status: Operational
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex bg-white dark:bg-[#0f1117] border border-slate-200 dark:border-slate-800 rounded-2xl p-1 shadow-sm">
            <button onClick={exportToPDF} className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all border-r border-slate-100 dark:border-slate-800">
              <FileText size={14} className="text-rose-500" /> PDF
            </button>
            <button onClick={exportToExcel} className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all border-r border-slate-100 dark:border-slate-800">
              <Download size={14} className="text-emerald-500" /> Excel
            </button>
            <button onClick={exportToJSON} className="flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all">
              <FileJson size={14} className="text-amber-500" /> JSON
            </button>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all">
            <Wallet size={14} /> Payout Settings
          </button>
        </div>
      </div>

      {/* ==================== KPI CARDS (5টা - Gateway Fees সহ) ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        
        <FinanceCard 
          title="Total Revenue" 
          value={`৳${Number(data.stats.totalRevenue || 0).toLocaleString()}`} 
          trend="+14.2%" 
          icon={<DollarSign size={22}/>} 
          color="indigo" 
        />

        <FinanceCard 
          title="Net Profit" 
          value={`৳${Math.round(Number(data.stats.netProfit || 0)).toLocaleString()}`} 
          trend="+10.5%" 
          icon={<TrendingUp size={22}/>} 
          color="emerald" 
        />

        <FinanceCard 
          title="Total Cost" 
          value={`৳${Number(data.stats.totalCost || 0).toLocaleString()}`} 
          trend="-3.2%" 
          icon={<Wallet size={22}/>} 
          color="amber" 
        />

        <FinanceCard 
          title="Gateway Fees" 
          value={`৳${Number(data.stats.gatewayFees || 0).toLocaleString()}`} 
          trend="+2.1%" 
          icon={<Percent size={22}/>} 
          color="orange" 
        />

        <FinanceCard 
          title="Refunded" 
          value={`৳${Number(data.stats.refunded || 0).toLocaleString()}`} 
          trend="-4.5%" 
          icon={<RotateCcw size={22}/>} 
          color="rose" 
        />
      </div>

      {/* 3. DOUBLE CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm relative group overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <BarChart3 size={18} className="text-indigo-600" /> Revenue Analysis
              </h3>
            </div>
          </div>
          <div className="h-56 flex items-end gap-3 px-2">
            {filteredTransactions.slice(0, 12).map((t: any, i: number) => (
              <div key={i} className="flex-1 flex flex-col gap-1 items-center h-full justify-end group/bar">
                <div 
                  style={{ 
                    height: `${(t.totalAmount / (data.stats.totalRevenue || 1)) * 100}%`, 
                    minHeight: '15%' 
                  }} 
                  className="w-full bg-indigo-600 rounded-t-md group-hover/bar:bg-indigo-400 transition-all duration-300"
                />
                <span className="text-[8px] font-bold text-slate-400 mt-2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                  ORD-{i}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="font-black text-sm uppercase tracking-widest mb-8">Gateways</h3>
          <div className="space-y-7">
            {data.gateways.length > 0 ? data.gateways.map((g: any, i: number) => (
              <MethodRow 
                key={i} 
                name={g.name} 
                percent={g.percent} 
                amount={`৳${g.amount.toLocaleString()}`} 
                color="bg-indigo-600" 
              />
            )) : <p className="text-xs text-slate-400 font-bold uppercase">No gateway data</p>}
          </div>
        </div>
      </div>

      {/* 4. TRANSACTION LEDGER */}
      <div className="bg-white dark:bg-[#0f1117] rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex flex-wrap justify-between items-center gap-6">
          <div className="flex gap-2 bg-slate-50 dark:bg-black/20 p-1.5 rounded-2xl">
            {['all', 'completed', 'pending', 'refunded'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)} 
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all 
                  ${activeTab === tab ? 'bg-white dark:bg-[#1a1d26] text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-50 dark:border-slate-800 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              <tr>
                <th className="px-8 py-5">Client Ledger</th>
                <th className="px-8 py-5">Gateway</th>
                <th className="px-8 py-5">Gross Amount</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {filteredTransactions.map((t: any, i: number) => (
                <TransactionItem 
                  key={i} 
                  name={t.user?.name || "Guest"} 
                  id={t.orderNumber || t._id.slice(-8)} 
                  method={t.paymentMethod || "COD"} 
                  amount={t.totalAmount?.toLocaleString() || '0'} 
                  fee={(t.totalAmount * 0.029).toFixed(2)} 
                  status={t.status === 'delivered' ? 'Completed' : t.status === 'cancelled' ? 'Refunded' : 'Pending'} 
                  date={new Date(t.createdAt).toLocaleDateString()} 
                  onRefund={() => handleRefundClick(t)} 
                  rawOrder={t}
                  onGenerateInvoice={generateInvoice}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. REFUND MODAL */}
      {isRefundModalOpen && selectedTx && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsRefundModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0f1117] rounded-[40px] p-10 shadow-2xl animate-in zoom-in duration-300">
            <button onClick={() => setIsRefundModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-rose-600"><X size={24} /></button>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-rose-50 dark:bg-rose-500/10 text-rose-600 rounded-2xl"><ShieldAlert size={32} /></div>
              <div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">Process <span className="text-rose-600">Refund</span></h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {selectedTx._id.slice(-8)}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-slate-50 dark:bg-[#080a0f] rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Max Refundable</p>
                  <h3 className="text-2xl font-black tracking-tighter italic">৳{selectedTx.totalAmount}</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Customer</p>
                  <p className="text-xs font-bold uppercase">{selectedTx.user?.name || "Guest"}</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Amount (৳)</label>
                <input 
                  type="number" 
                  value={refundAmount} 
                  onChange={(e) => setRefundAmount(e.target.value)} 
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#080a0f] border-2 border-transparent focus:border-rose-500 text-lg font-black outline-none transition-all" 
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setIsRefundModalOpen(false)} 
                disabled={refundProcessing} 
                className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400"
              >
                Dismiss
              </button>
              <button 
                onClick={handleConfirmRefund} 
                disabled={refundProcessing}
                className="flex-[2] py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-500/20 flex items-center justify-center gap-2"
              >
                {refundProcessing ? 'Processing...' : 'Confirm Refund'} <ArrowRight size={14}/>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== SUB COMPONENTS ====================

function FinanceCard({ title, value, trend, icon, color }: any) {
  const colors: any = {
    indigo: "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10",
    emerald: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10",
    amber: "text-amber-600 bg-amber-50 dark:bg-amber-500/10",
    orange: "text-orange-600 bg-orange-50 dark:bg-orange-500/10",
    rose: "text-rose-600 bg-rose-50 dark:bg-rose-500/10"
  };

  return (
    <div className="bg-white dark:bg-[#0f1117] p-7 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-4 rounded-2xl ${colors[color]} group-hover:scale-110 transition-transform`}>{icon}</div>
        <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend}
        </div>
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <h2 className="text-2xl font-black mt-1 tracking-tighter italic">{value}</h2>
    </div>
  );
}

function MethodRow({ name, percent, amount, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
        <span className="text-slate-500">{name}</span>
        <span>{amount}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: percent }}></div>
      </div>
    </div>
  );
}

function TransactionItem({ name, id, method, amount, fee, status, date, onRefund,rawOrder,onGenerateInvoice }: any) {
  const statusStyles: any = { 
    Completed: "bg-emerald-50 text-emerald-600", 
    Pending: "bg-amber-50 text-amber-600", 
    Refunded: "bg-rose-50 text-rose-600" 
  };

  return (
    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
      <td className="px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500">
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-xs font-black group-hover:text-indigo-600 transition-colors">{name}</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{id} • {date}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-5 text-xs font-bold uppercase">{method}</td>
      <td className="px-8 py-5">
        <p className="text-sm font-black tracking-tighter">৳{amount}</p>
        <p className="text-[9px] font-bold text-rose-500 uppercase italic">Fee: -৳{fee}</p>
      </td>
      <td className="px-8 py-5">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase ${statusStyles[status]}`}>
          {status}
        </span>
      </td>
      <td className="px-8 py-5 text-right">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
          {status === 'Completed' && (
            <button onClick={onRefund} className="p-2 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-all">
              <RotateCcw size={16} />
            </button>
          )}
          <button onClick={() => onGenerateInvoice(rawOrder)}
           className="p-2 text-slate-400 hover:bg-indigo-600 hover:text-white rounded-lg transition-all">
            <FileText size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
