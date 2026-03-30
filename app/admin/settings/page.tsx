'use client';

import React, { useState } from 'react';
import { 
  Settings, User, Lock, Bell, Globe, CreditCard, 
  Database, Shield, Save, Moon, Sun, Camera,
  Mail, Smartphone, Languages, Eye, EyeOff
} from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('General');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sidebar Menu Items
  const menuItems = [
    { id: 'General', icon: <Settings size={18} />, label: 'General' },
    { id: 'Security', icon: <Lock size={18} />, label: 'Security' },
    { id: 'Billing', icon: <CreditCard size={18} />, label: 'Payments' },
    { id: 'Notifications', icon: <Bell size={18} />, label: 'Notifications' },
    { id: 'System', icon: <Database size={18} />, label: 'System Log' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#05070a] p-4 md:p-10 font-sans transition-colors duration-500">
      
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
          System <span className="text-indigo-600">Settings</span>
        </h1>
        <p className="text-slate-500 font-bold text-xs mt-2 uppercase tracking-[0.3em]">Configure your platform engine</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDEBAR NAVIGATION */}
        <div className="w-full lg:w-72 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${
                activeTab === item.id 
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none" 
                : "bg-white dark:bg-[#0f1117] text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-100 dark:border-slate-800"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* RIGHT CONTENT AREA */}
        <div className="flex-1 bg-white dark:bg-[#0f1117] rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-12">
          
          {/* 1. GENERAL SETTINGS */}
          {activeTab === 'General' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SectionHeader title="Platform Identity" subtitle="Manage your site basic information" />
              
              {/* Logo Upload */}
              <div className="flex items-center gap-8 p-6 bg-slate-50 dark:bg-[#080a0f] rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white relative group cursor-pointer">
                  <Camera size={30} />
                  <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <span className="text-[8px] font-black uppercase">Edit</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-black dark:text-white mb-1">Platform Logo</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">PNG, SVG or JPEG. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Site Name" placeholder="e.g. My Admin Portal" value="AdminX Pro" />
                <InputGroup label="Support Email" placeholder="support@site.com" value="admin@company.com" />
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Timezone</label>
                  <select className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#080a0f] border-2 border-slate-50 dark:border-slate-800 dark:text-white outline-none focus:border-indigo-500 transition-all font-bold text-sm appearance-none">
                    <option>(GMT+06:00) Dhaka</option>
                    <option>(GMT+00:00) London</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Theme Mode</label>
                  <div className="flex bg-slate-100 dark:bg-[#080a0f] p-1 rounded-2xl">
                    <button onClick={() => setIsDarkMode(false)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${!isDarkMode ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}><Sun size={14}/> Light</button>
                    <button onClick={() => setIsDarkMode(true)} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${isDarkMode ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400'}`}><Moon size={14}/> Dark</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. SECURITY SETTINGS */}
          {activeTab === 'Security' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SectionHeader title="Security & Privacy" subtitle="Keep your admin panel safe" />
              
              <div className="space-y-6">
                <ToggleItem 
                  title="Two-Factor Authentication" 
                  desc="Add an extra layer of security to your account." 
                  enabled={true} 
                  icon={<Shield className="text-emerald-500"/>}
                />
                <ToggleItem 
                  title="Maintenance Mode" 
                  desc="Stop all public traffic to the site while updating." 
                  enabled={false} 
                  icon={<Settings className="text-amber-500"/>}
                />
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Change Admin Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="Current Password" type="password" placeholder="••••••••" />
                  <InputGroup label="New Password" type="password" placeholder="••••••••" />
                </div>
              </div>
            </div>
          )}

          {/* FOOTER ACTIONS */}
          <div className="mt-12 pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-end gap-4">
            <button className="px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
              Reset Changes
            </button>
            <button className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all shadow-xl shadow-indigo-200 dark:shadow-none active:scale-95">
              <Save size={18} /> Save Settings
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

function SectionHeader({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-black italic uppercase tracking-tighter dark:text-white">{title}</h2>
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{subtitle}</p>
    </div>
  );
}

function InputGroup({ label, placeholder, value, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{label}</label>
      <input 
        type={type}
        defaultValue={value} 
        placeholder={placeholder}
        className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-[#080a0f] border-2 border-slate-50 dark:border-slate-800 dark:text-white outline-none focus:border-indigo-500 transition-all font-bold text-sm" 
      />
    </div>
  );
}

function ToggleItem({ title, desc, enabled, icon }: any) {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-[#080a0f] rounded-3xl border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm italic">
          {icon}
        </div>
        <div>
          <h4 className="font-black text-sm dark:text-white">{title}</h4>
          <p className="text-[10px] text-slate-400 font-bold">{desc}</p>
        </div>
      </div>
      <button className={`w-12 h-6 rounded-full transition-all relative ${enabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${enabled ? 'right-1' : 'left-1'}`} />
      </button>
    </div>
  );
}