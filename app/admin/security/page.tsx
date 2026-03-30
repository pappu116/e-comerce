'use client';
import React, { useState } from 'react';
import { 
  ShieldCheck, ShieldAlert, Monitor, Smartphone, MapPin, 
  KeyRound, Fingerprint, Globe, Trash2, Plus, 
  RotateCcw, History, Navigation, Lock, CheckCircle2,
  AlertTriangle, LogOut, Info, Search, Filter, Mail, Shield, Download
} from 'lucide-react';

export default function UltimateSecurityPage() {
  const [ips, setIps] = useState([
    { id: 1, address: '103.145.2.10', label: 'Home Office', status: 'Active' },
    { id: 2, address: '192.168.43.1', label: 'Mobile Hotspot', status: 'Active' }
  ]);

  return (
    <div className="p-6 md:p-10 bg-[#f8fafc] dark:bg-[#05070a] min-h-screen text-slate-900 dark:text-white font-sans">
      
      {/* --- 1. HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter flex items-center gap-3">
            <ShieldCheck size={40} className="text-indigo-600" /> Security <span className="text-indigo-600">Protocol</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> System Shield: Grade A+ Active
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white dark:bg-[#0f1117] border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            <History size={14}/> Audit Logs
          </button>
          <button className="px-6 py-3 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-500/20 hover:scale-105 transition-all flex items-center gap-2">
            <LogOut size={14}/> Terminate All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN (MAP, SESSIONS, AUDIT) --- */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* GEOLOCATION RADAR MAP */}
          <div className="bg-white dark:bg-[#0f1117] rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-white/5">
              <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2 italic"><Navigation size={18} className="text-indigo-600"/> Real-time Geo-Tracking</h3>
              <span className="text-[9px] font-black bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 px-3 py-1 rounded-full uppercase">2 Active Clusters</span>
            </div>
            <div className="h-[350px] relative bg-slate-100 dark:bg-[#080a0f] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4f46e5 1.5px, transparent 1.5px)', backgroundSize: '35px 35px' }}></div>
              <div className="absolute w-[300px] h-[300px] border border-indigo-500/20 rounded-full animate-pulse"></div>
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-4 bg-indigo-600/20 rounded-full animate-ping"></div>
                <div className="w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow-2xl relative z-10"></div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-[#1a1d26] p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 min-w-[180px] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                   <p className="text-[9px] font-black text-indigo-600 uppercase">Current Session</p>
                   <p className="text-xs font-bold uppercase mt-1">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* SESSIONS TABLE */}
          <div className="bg-white dark:bg-[#0f1117] rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
             <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-black text-sm uppercase tracking-widest italic">Active Sessions</h3>
                <button className="text-slate-400 hover:text-indigo-600 transition-all"><RotateCcw size={16}/></button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-50 dark:border-slate-800">
                    <tr>
                      <th className="px-8 py-5 text-[9px] font-black uppercase text-slate-400 tracking-widest">Device / OS</th>
                      <th className="px-8 py-5 text-[9px] font-black uppercase text-slate-400 tracking-widest">Location</th>
                      <th className="px-8 py-5 text-[9px] font-black uppercase text-slate-400 tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                    <SessionRow device="MacBook Pro 16" os="macOS Sonoma" icon={<Monitor size={18}/>} loc="Dhaka, BD" time="Active Now" current={true} />
                    <SessionRow device="iPhone 15 Pro" os="iOS 17.4" icon={<Smartphone size={18}/>} loc="Chittagong, BD" time="2h ago" current={false} />
                  </tbody>
                </table>
             </div>
          </div>

          {/* AUDIT LOGS (MOVED INSIDE COLUMN) */}
          <div className="bg-white dark:bg-[#0f1117] rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-white/5">
               <h3 className="font-black text-sm uppercase tracking-widest italic flex items-center gap-2"><History size={18} className="text-amber-500"/> Activity Logs</h3>
               <Search size={16} className="text-slate-400 cursor-pointer"/>
            </div>
            <div className="p-4 space-y-4">
               <AuditRow event="Password Change" status="Success" ip="103.145.2.10" time="10:45 AM" color="text-emerald-500" />
               <AuditRow event="New Login" status="Blocked" ip="45.12.0.99" time="08:12 PM" color="text-rose-500" />
            </div>
          </div>
        </div>

        {/* --- 2. RIGHT COLUMN (CONTROLS & SETTINGS) --- */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* SECURITY SCORE */}
          <div className="bg-indigo-600 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/30 group">
             <ShieldAlert className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-125 transition-transform duration-700" size={200} />
             <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight mb-2">Security Score</h3>
             <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-black italic tracking-tighter">85</span>
                <span className="text-xl font-bold opacity-60 mb-2">/100</span>
             </div>
             <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:brightness-110 transition-all">Optimize Now</button>
          </div>

          {/* PASSWORD HEALTH (NEW) */}
          <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
              <Lock size={18} className="text-indigo-600" /> Auth Control
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent">
                 <p className="text-[9px] font-black text-slate-400 uppercase">Last Password Change</p>
                 <p className="text-xs font-bold uppercase italic">148 days ago <span className="text-rose-500 ml-2">(Weak)</span></p>
              </div>
              <button className="w-full py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                 <KeyRound size={14}/> Change Password
              </button>
            </div>
          </div>

          {/* 2FA SETUP */}
          <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
             <h3 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2"><Fingerprint size={18} className="text-emerald-500"/> Multi-Factor</h3>
             <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl mb-4 flex justify-between items-center">
                <div>
                   <p className="text-[10px] font-black text-emerald-600 uppercase italic">Status: Enabled</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 italic font-mono tracking-tighter italic">Google Authenticator</p>
                </div>
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20"><CheckCircle2 size={20}/></div>
             </div>
             <button className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-400 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
                <Download size={14}/> Download Recovery Codes
             </button>
          </div>

          {/* SECURITY ALERTS TOGGLES (NEW) */}
          <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="font-black text-sm uppercase tracking-widest mb-6">Security Alerts</h3>
            <div className="space-y-4">
              <ToggleItem label="Email for new logins" active={true} />
              <ToggleItem label="SMS for failed attempts" active={false} />
              <ToggleItem label="Biometric Access" active={true} />
            </div>
          </div>

          {/* IP WHITELISTING BOX */}
          <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2"><Globe size={18} className="text-indigo-600"/> IP Whitelist</h3>
                <button className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/20"><Plus size={14}/></button>
             </div>
             <div className="space-y-3">
                {ips.map(ip => (
                  <div key={ip.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-white/5 rounded-2xl group transition-all">
                    <div><p className="text-[10px] font-black uppercase">{ip.label}</p><p className="text-[9px] font-mono text-slate-400">{ip.address}</p></div>
                    <button className="p-2 text-slate-300 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"><Trash2 size={14}/></button>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- REUSABLE SUB-COMPONENTS ---

function SessionRow({ device, os, icon, loc, time, current }: any) {
  return (
    <tr className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all group">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
           <div className={`p-3 rounded-2xl ${current ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>{icon}</div>
           <div><p className="text-xs font-black uppercase">{device}</p><p className="text-[10px] font-bold text-slate-400 uppercase italic">{os}</p></div>
        </div>
      </td>
      <td className="px-8 py-6 text-[10px] font-bold uppercase tracking-tighter flex items-center gap-2">
        <MapPin size={12} className="text-indigo-500"/> {loc}
      </td>
      <td className="px-8 py-6 text-right">
        {!current && <button className="p-3 text-slate-300 hover:text-rose-600 transition-all opacity-0 group-hover:opacity-100"><LogOut size={18}/></button>}
        {current && <span className="text-[8px] font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded uppercase">Current Session</span>}
      </td>
    </tr>
  );
}

function AuditRow({ event, status, ip, time, color }: any) {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group">
       <div className="flex items-center gap-4">
          <div className="p-2 bg-white dark:bg-[#0f1117] rounded-xl text-slate-400 group-hover:text-indigo-600 transition-colors"><Shield size={14}/></div>
          <div><p className="text-[10px] font-black uppercase italic tracking-tight">{event}</p><p className="text-[8px] font-mono font-bold text-slate-400 mt-0.5">{ip}</p></div>
       </div>
       <div className="text-right">
          <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${color} bg-white dark:bg-black/20`}>{status}</span>
          <p className="text-[8px] font-black text-slate-400 uppercase mt-1 tracking-tighter">{time}</p>
       </div>
    </div>
  );
}

function ToggleItem({ label, active }: { label: string, active: boolean }) {
  return (
    <div className="flex justify-between items-center group cursor-pointer">
       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">{label}</span>
       <div className={`w-10 h-5 rounded-full transition-all relative ${active ? 'bg-indigo-600 shadow-lg shadow-indigo-500/20' : 'bg-slate-200 dark:bg-slate-800'}`}>
          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'left-6' : 'left-1'}`}></div>
       </div>
    </div>
  );
}