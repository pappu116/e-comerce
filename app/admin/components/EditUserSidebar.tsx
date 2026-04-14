'use client';

import React, { useRef, useState } from 'react';
import { X, Save, ShieldCheck, Loader2, Clock, DollarSign } from 'lucide-react';
import API from '@/app/lib/apiClient';
import { toast } from 'sonner';

interface Customer {
  _id: string;
  name: string;
  email: string;
  status?: string;
  revenue?: number;
  lastActive?: string;
  updatedAt?: string;
}

interface Props {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (updated: Customer) => void;
  onImpersonate: (user: Customer) => void;
}

export default function EditUserSidebar({ customer, isOpen, onClose, onUpdated, onImpersonate }: Props) {
  const [isSaving, setIsSaving] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

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

  const handleUpdate = async () => {
    if (!customer) return;
    const updatedName = nameRef.current?.value?.trim();
    const updatedEmail = emailRef.current?.value?.trim();
    if (!updatedName || !updatedEmail) {
      toast.error('নাম ও ইমেইল খালি রাখা যাবে না');
      return;
    }
    setIsSaving(true);
    try {
      await API.put(`/admin/users/${customer._id}`, { name: updatedName, email: updatedEmail });
      onUpdated({ ...customer, name: updatedName, email: updatedEmail });
      toast.success('✅ প্রোফাইল আপডেট হয়েছে!');
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'আপডেট করা যায়নি।');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !customer) return null;

  const isSuspended = (customer.status || 'active') === 'suspended';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99]"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 sm:inset-y-4 sm:inset-x-auto sm:right-4 sm:w-[460px] md:w-[500px] bg-white dark:bg-[#0f1117] shadow-[0_0_100px_rgba(0,0,0,0.2)] z-[100] rounded-t-[36px] sm:rounded-[40px] border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom sm:slide-in-from-right-full duration-400 overflow-y-auto max-h-[92vh] sm:max-h-none">

        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-4 sm:hidden">
          <div className="w-10 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="p-6 sm:p-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter dark:text-white">
              Profile <span className="text-indigo-600">Review</span>
            </h2>
            <button
              onClick={onClose}
              className="p-3 sm:p-4 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-2xl sm:rounded-3xl hover:rotate-90 transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Avatar card */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-black/40 dark:to-black/10 p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-4 sm:gap-6 mb-6">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-2xl sm:text-3xl font-black shadow-xl shadow-indigo-200 dark:shadow-none">
                {customer.name?.charAt(0)}
              </div>
              <span className={`absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white dark:border-[#0f1117] ${isSuspended ? 'bg-rose-500' : 'bg-emerald-500'}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1 truncate">
                #{customer._id?.slice(-8).toUpperCase()}
              </p>
              <h3 className="text-xl sm:text-2xl font-black dark:text-white tracking-tight truncate">{customer.name}</h3>
              <StatusBadge status={customer.status || 'active'} />
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-50 dark:bg-black/20 rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={12} className="text-sky-500" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Last Active</span>
              </div>
              <p className="text-sm sm:text-base font-black dark:text-white tracking-tight">
                {formatLastActive(customer.lastActive || customer.updatedAt)}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-black/20 rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={12} className="text-emerald-500" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Revenue</span>
              </div>
              <p className="text-sm sm:text-base font-black text-emerald-600 tracking-tight">
                {formatRevenue(customer.revenue)}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Identity Name</label>
              <input
                ref={nameRef}
                defaultValue={customer.name}
                className="w-full p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] bg-slate-50 dark:bg-black/20 dark:text-white border-2 border-transparent focus:border-indigo-500 transition-all font-bold outline-none text-sm sm:text-base"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Verified Email</label>
              <input
                ref={emailRef}
                defaultValue={customer.email}
                className="w-full p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] bg-slate-50 dark:bg-black/20 dark:text-white border-2 border-transparent focus:border-indigo-500 transition-all font-bold outline-none text-sm sm:text-base"
              />
            </div>

            {/* Impersonate */}
            <button
              onClick={() => onImpersonate(customer)}
              className="w-full bg-slate-900 dark:bg-indigo-600 text-white p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-xl hover:bg-indigo-700 hover:shadow-indigo-500/25"
            >
              <ShieldCheck size={17} /> Access Secure Session
            </button>

            {/* Save / Discard */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleUpdate}
                disabled={isSaving}
                className="bg-indigo-600 text-white p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving
                  ? <><Loader2 size={15} className="animate-spin" /> Saving...</>
                  : <><Save size={15} /> Save</>
                }
              </button>
              <button
                onClick={onClose}
                className="border-2 border-slate-100 dark:border-slate-800 p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] font-black text-[11px] uppercase tracking-widest dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isSuspended = status.toLowerCase() === 'suspended';
  return (
    <span className={`mt-1 px-3 py-1 rounded-lg text-[9px] font-black border uppercase tracking-[0.2em] inline-flex items-center gap-1.5 ${
      isSuspended
        ? 'text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20'
        : 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20'
    }`}>
      <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-current" /> {status}
    </span>
  );
}
