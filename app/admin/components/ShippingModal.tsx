'use client';
import { useState, useRef, useEffect } from 'react';
import { Truck, X, Hash, Globe, ChevronDown, Check, ShieldCheck } from 'lucide-react';

export default function ShippingModal({ isOpen, onClose, onConfirm, orderId }: any) {
  const [courier, setCourier] = useState('Pathao');
  const [trackingId, setTrackingId] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const couriers = [
    { id: 'Pathao', name: 'Pathao Express', icon: '🚚' },
    { id: 'Steadfast', name: 'Steadfast Logistics', icon: '⚡' },
    { id: 'RedX', name: 'RedX Delivery', icon: '🔴' },
    { id: 'Paperfly', name: 'Paperfly Ltd', icon: '📦' },
    { id: 'Sundarban', name: 'Sundarban Courier', icon: '🌳' },
  ];

  // ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[250] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-md overflow-visible shadow-[0_32px_80px_-20px_rgba(0,0,0,0.4)] border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
        
        {/* Header Section */}
        <div className="p-10 pb-6 relative">
          <button 
            onClick={onClose} 
            className="absolute right-8 top-8 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
          >
            <X size={22} className="text-slate-400" />
          </button>
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-full">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Logistics Portal</span>
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
              Dispatch <span className="text-blue-600">Order</span>
            </h2>
          </div>
        </div>

        <div className="px-10 pb-10 space-y-8">
          
          {/* Custom Courier Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">
              <Globe size={13} className="text-blue-500" /> Select Courier Service
            </label>
            
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full h-16 px-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 transition-all flex items-center justify-between group ${isDropdownOpen ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-transparent hover:bg-slate-100'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{couriers.find(c => c.id === courier)?.icon}</span>
                <span className="font-black text-sm uppercase tracking-wide">
                  {couriers.find(c => c.id === courier)?.name}
                </span>
              </div>
              <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown List */}
            {isDropdownOpen && (
              <div className="absolute top-[calc(100%+10px)] left-0 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-[300] overflow-hidden p-2 animate-in slide-in-from-top-2">
                {couriers.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCourier(item.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all mb-1 last:mb-0 ${courier === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-[11px] font-black uppercase tracking-wider">{item.name}</span>
                    </div>
                    {courier === item.id && <Check size={16} className="animate-pulse" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tracking ID Input */}
          <div>
            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">
              <Hash size={13} className="text-blue-500" /> Tracking / Waybill Number
            </label>
            <div className="relative group">
              <input 
                type="text" 
                value={trackingId} 
                onChange={(e) => setTrackingId(e.target.value)} 
                placeholder="Paste Tracking Code Here" 
                className="w-full h-16 px-6 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 rounded-2xl text-sm font-bold outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            onClick={() => onConfirm(orderId, courier, trackingId)} 
            disabled={!trackingId}
            className="group w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:shadow-none flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <span>Handover to Courier</span>
            <Truck size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="bg-slate-50 dark:bg-slate-800/50 px-10 py-6 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Auto-Tracking Active</span>
          </div>
          <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full uppercase">Order: {orderId?.slice(-6).toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}