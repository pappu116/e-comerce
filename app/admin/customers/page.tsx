'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, Plus, MoreVertical, Users, DollarSign,
  Pencil, Trash2, ShieldAlert, X, CheckCircle2,
  Clock, Sparkles, Eye, TrendingUp, ShieldCheck
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

import AddMemberModal from '../components/AddMemberModal';
import EditUserSidebar from '../components/EditUserSidebar';
import ImpersonateOverlay from '../components/ImpersonateOverlay';

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status?: string;
  revenue?: number;
  lastActive?: string;
  updatedAt?: string;
}

export default function CustomerAdminPage() {
  const router = useRouter();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Suspended'>('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isSwitching, setIsSwitching] = useState(false);
  const [switchingUser, setSwitchingUser] = useState<Customer | null>(null);

  // Fetch Users
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

  const handleImpersonate = async (user: Customer) => {
    setSwitchingUser(user);
    setIsSwitching(true);
    try {
      const res = await API.post(`/auth/admin/switch-user/${user._id}`);
      if (res.data.success && res.data.token) {
        localStorage.setItem('token', res.data.token);
        toast.success(`${user.name} হিসেবে লগইন সফল!`);
        setTimeout(() => { router.push('/profile'); router.refresh(); }, 1800);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'লগইন করা যায়নি।');
    } finally {
      setIsSwitching(false);
      setSwitchingUser(null);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await API.patch(`/admin/users/${id}/status`, { status });
      setCustomers(prev => prev.map(c => c._id === id ? { ...c, status } : c));
      toast.success(`Status → ${status}`);
    } catch {
      toast.error('আপডেট করা যায়নি');
    }
  };

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
    if (amount === undefined || amount === null) return '—';
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}k`;
    return `$${amount}`;
  };

  const filteredCustomers = useMemo(() => 
    customers.filter(c => {
      const q = searchQuery.toLowerCase();
      const matchSearch = c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q);
      const matchTab = activeTab === 'All' || (c.status || 'active').toLowerCase() === activeTab.toLowerCase();
      return matchSearch && matchTab;
    }), [searchQuery, activeTab, customers]);

  const tabCount = (tab: string) =>
    tab === 'All' ? customers.length : customers.filter(c => (c.status || 'active').toLowerCase() === tab.toLowerCase()).length;

  if (loading) {
    return (
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
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#05070a] p-4 sm:p-6 lg:p-10 space-y-8 font-sans relative">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <ImpersonateOverlay user={switchingUser} isVisible={isSwitching} />
      <AddMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreated={newUser => setCustomers(prev => [newUser, ...prev])} />
      <EditUserSidebar customer={selectedCustomer} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onUpdated={updated => setCustomers(prev => prev.map(c => c._id === updated._id ? updated : c))} onImpersonate={handleImpersonate} />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-[2px] bg-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">ENTERPRISE CONTROL</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
            User <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500">Intelligence</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">{customers.length} total members</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 bg-slate-900 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl"
        >
          <Plus size={18} /> ADD NEW MEMBER
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Active Network" value={customers.length} icon={<Users />} color="indigo" trend="+12%" />
        <StatCard title="Restricted" value={customers.filter(c => c.status === 'suspended').length} icon={<ShieldAlert />} color="rose" trend="-3%" />
        <StatCard title="Net Growth" value="14.5%" icon={<TrendingUp />} color="emerald" trend="+2.1%" />
      </div>

      {/* Main Table Container */}
      <div className="relative z-10 bg-white/70 dark:bg-[#0f1117]/70 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-6 lg:p-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
            {['All', 'Active', 'Suspended'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab 
                    ? 'bg-white dark:bg-slate-900 shadow text-indigo-600' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab} <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700">{tabCount(tab)}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-14 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:border-indigo-500 text-sm outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* === TABLE WITH PROPER HEADERS === */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                <th className="px-8 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">ID</th>
                <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">IDENTITY</th>
                <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">STATUS</th>
                <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">LAST ACTIVE</th>
                <th className="px-6 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400">REVENUE</th>
                <th className="px-8 py-5 text-right text-xs font-black uppercase tracking-widest text-slate-400">ACTIONS</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-20 text-slate-400 font-medium">No users found</td>
                </tr>
              ) : (
                filteredCustomers.map(user => (
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 text-xs text-slate-400 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
          <span>Showing {filteredCustomers.length} of {customers.length} users</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live sync active
          </div>
        </div>
      </div>
    </div>
  );
}

// Desktop Row (with better spacing)
function DesktopRow({ user, formatLastActive, formatRevenue, onImpersonate, onEdit, onStatusUpdate, onDelete }: any) {
  return (
    <tr className="group hover:bg-indigo-50/70 dark:hover:bg-indigo-500/5 transition-all duration-200">
      <td className="px-8 py-6">
        <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
          #{user._id?.slice(-6).toUpperCase()}
        </span>
      </td>

      <td className="px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-black">
              {user.name?.charAt(0)}
            </div>
            {(user.status || 'active') === 'active' && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            )}
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-6">
        <StatusBadge status={user.status || 'active'} />
      </td>

      <td className="px-6 py-6">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-sky-500" />
          <div>
            <p className="font-medium text-slate-700 dark:text-slate-200">{formatLastActive(user.lastActive || user.updatedAt)}</p>
            <p className="text-xs text-slate-400">Last seen</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-6">
        <div className="flex items-center gap-3">
          <DollarSign className={`w-5 h-5 ${(user.revenue ?? 0) > 0 ? 'text-emerald-600' : 'text-slate-400'}`} />
          <p className={`font-semibold ${(user.revenue ?? 0) > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
            {formatRevenue(user.revenue)}
          </p>
        </div>
      </td>

      <td className="px-8 py-6 text-right">
        <div className="flex items-center justify-end gap-3 opacity-90 group-hover:opacity-100 transition-all">
          <button
            onClick={() => onImpersonate(user)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-2xl text-xs font-bold transition-all"
          >
            <Eye size={16} /> View As
          </button>

          <button onClick={onEdit} className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            <Pencil size={18} className="text-slate-500" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                <MoreVertical size={18} className="text-slate-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
              <DropdownMenuItem onClick={() => onImpersonate(user)} className="rounded-xl py-3 text-indigo-600">
                <ShieldCheck className="mr-3" size={18} /> Impersonate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onStatusUpdate(user._id, 'active')} className="rounded-xl py-3 text-emerald-600">
                <CheckCircle2 className="mr-3" size={18} /> Set Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusUpdate(user._id, 'suspended')} className="rounded-xl py-3 text-rose-600">
                <ShieldAlert className="mr-3" size={18} /> Suspend
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(user._id)} className="rounded-xl py-3 text-rose-600">
                <Trash2 className="mr-3" size={18} /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isSuspended = status.toLowerCase() === 'suspended';
  return (
    <span className={`px-5 py-2 rounded-2xl text-xs font-bold border uppercase tracking-wider inline-flex items-center gap-2 ${
      isSuspended 
        ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400' 
        : 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400'
    }`}>
      <span className={`w-2 h-2 rounded-full animate-pulse ${isSuspended ? 'bg-rose-500' : 'bg-emerald-500'}`} />
      {status}
    </span>
  );
}

function StatCard({ title, value, icon, color, trend }: any) {
  const styles: any = {
    indigo: { icon: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30', trend: 'text-indigo-600' },
    rose: { icon: 'text-rose-600 bg-rose-100 dark:bg-rose-900/30', trend: 'text-rose-600' },
    emerald: { icon: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30', trend: 'text-emerald-600' },
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${styles[color].icon}`}>
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
      <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</h2>
      {trend && <p className={`text-sm mt-3 ${styles[color].trend}`}>{trend}</p>}
    </div>
  );
}