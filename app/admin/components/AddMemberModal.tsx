'use client';

import React, { useState } from 'react';
import {
  Plus, X, User, Mail, Lock, Phone,
  Loader2, Sparkles, ArrowRight, Check, AlertCircle
} from "lucide-react";
import API from '@/app/lib/api';
import { toast } from "sonner";

interface NewUserForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (user: any) => void;
}

export default function AddMemberModal({ isOpen, onClose, onCreated }: Props) {
  const [isCreating, setIsCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [formData, setFormData] = useState<NewUserForm>({
    name: '', email: '', phone: '', password: '', role: 'user',
  });
  const [formErrors, setFormErrors] = useState<Partial<NewUserForm>>({});

  const validateForm = (): boolean => {
    const errors: Partial<NewUserForm> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = 'Valid email required';
    if (!formData.password || formData.password.length < 6)
      errors.password = 'Min 6 characters';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;
    setIsCreating(true);
    try {
      const res = await API.post('/auth/admin/create-user', formData);
      const newUser = res.data?.user || res.data;
      onCreated(newUser);
      setCreateSuccess(true);
      toast.success(`✅ ${formData.name} তৈরি হয়েছে!`);
      setTimeout(() => {
        handleClose();
      }, 1800);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'User তৈরি করা যায়নি।');
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setCreateSuccess(false);
    setFormData({ name: '', email: '', phone: '', password: '', role: 'user' });
    setFormErrors({});
    onClose();
  };

  const setField = (field: keyof NewUserForm, value: string) => {
    setFormData(p => ({ ...p, [field]: value }));
    setFormErrors(p => ({ ...p, [field]: '' }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[200]"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white dark:bg-[#0c0e14] rounded-[32px] sm:rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-[0_40px_120px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-300">

          {/* Header */}
          <div className="relative px-6 sm:px-10 pt-8 sm:pt-10 pb-6 sm:pb-8 border-b border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none flex-shrink-0">
                <Plus size={20} className="text-white" />
              </div>
              <div>
                <p className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.4em]">Admin Panel</p>
                <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter dark:text-white">
                  New <span className="text-indigo-600">Member</span>
                </h2>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="absolute top-6 sm:top-8 right-6 sm:right-8 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl sm:rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:rotate-90 transition-all"
            >
              <X size={17} />
            </button>
          </div>

          {/* Success */}
          {createSuccess ? (
            <div className="px-6 sm:px-10 py-12 sm:py-16 flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-5 animate-in zoom-in duration-500">
                <Check size={30} className="text-emerald-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black italic uppercase dark:text-white tracking-tighter mb-2">Member Created!</h3>
              <p className="text-slate-400 font-bold text-sm">{formData.name} সফলভাবে যোগ হয়েছে।</p>
            </div>
          ) : (
            /* Form */
            <div className="px-6 sm:px-10 py-6 sm:py-8 space-y-4">

              <ModalField icon={<User size={15} />} label="Full Name" error={formErrors.name}>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setField('name', e.target.value)}
                  className="w-full bg-transparent outline-none font-bold text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 text-sm"
                />
              </ModalField>

              <ModalField icon={<Mail size={15} />} label="Email Address" error={formErrors.email}>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setField('email', e.target.value)}
                  className="w-full bg-transparent outline-none font-bold text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 text-sm"
                />
              </ModalField>

              <ModalField icon={<Phone size={15} />} label="Phone (Optional)">
                <input
                  type="tel"
                  placeholder="+880 1X XX XXX XXX"
                  value={formData.phone}
                  onChange={e => setField('phone', e.target.value)}
                  className="w-full bg-transparent outline-none font-bold text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 text-sm"
                />
              </ModalField>

              <ModalField icon={<Lock size={15} />} label="Password" error={formErrors.password}>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={formData.password}
                  onChange={e => setField('password', e.target.value)}
                  className="w-full bg-transparent outline-none font-bold text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 text-sm"
                />
              </ModalField>

                {/* Role Section - Fixed Version */}
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 ml-1">Assign Role</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button" // এটি নিশ্চিত করে যে ফর্ম সাবমিট হবে না
                      onClick={(e) => {
                        e.preventDefault();
                        setFormData(prev => ({ ...prev, role: 'user' }));
                      }}
                      className={`py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                        formData.role === 'user'
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200'
                          : 'bg-slate-50 dark:bg-black/20 text-slate-400 border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      👤 User
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFormData(prev => ({ ...prev, role: 'admin' }));
                      }}
                      className={`py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                        formData.role === 'admin'
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200'
                          : 'bg-slate-50 dark:bg-black/20 text-slate-400 border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      ⚡ Admin
                    </button>
                  </div>
                </div>

              <button
                onClick={handleCreate}
                disabled={isCreating}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 sm:py-5 rounded-[16px] sm:rounded-[20px] font-black text-[11px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isCreating
                  ? <><Loader2 size={17} className="animate-spin" /> Creating...</>
                  : <><Sparkles size={17} /> Create Member <ArrowRight size={15} /></>
                }
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ── Field wrapper ──
function ModalField({ icon, label, error, children }: {
  icon: React.ReactNode;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.35em] ml-1">{label}</label>
      <div className={`flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 rounded-[16px] sm:rounded-[18px] bg-slate-50 dark:bg-black/20 border-2 transition-all ${
        error ? 'border-rose-400' : 'border-transparent focus-within:border-indigo-500'
      }`}>
        <span className={`flex-shrink-0 ${error ? 'text-rose-400' : 'text-slate-400'}`}>{icon}</span>
        {children}
        {error && <AlertCircle size={15} className="flex-shrink-0 text-rose-400" />}
      </div>
      {error && <p className="text-[10px] text-rose-500 font-bold ml-2">{error}</p>}
    </div>
  );
}