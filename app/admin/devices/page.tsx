'use client';
import React, { useState } from 'react';
import { 
  Monitor, Smartphone, Tablet, Globe, MapPin, Clock, 
  ShieldCheck, LogOut, MoreVertical, AlertTriangle, 
  ChevronRight, RefreshCw, ShieldAlert, CheckCircle2,
  Lock, KeyRound, Fingerprint, Shield, Info, Plus, Trash2, 
  Navigation, Crosshair
} from 'lucide-react';

export default function AdvancedSecurityCenter() {
  const [whitelistedIPs, setWhitelistedIPs] = useState([
    { id: '1', ip: '103.145.2.10', label: 'Home Office', date: 'Mar 24, 2024' },
    { id: '2', ip: '192.168.1.1', label: 'Local Server', date: 'Mar 20, 2024' }
  ]);

  const [sessions, setSessions] = useState([
    { id: '1', device: 'MacBook Pro 16"', os: 'macOS Sonoma', browser: 'Chrome', location: 'Dhaka, BD', ip: '103.145.2.10', lastActive: 'Active Now', isCurrent: true },
    { id: '2', device: 'iPhone 15 Pro', os: 'iOS 17.4', browser: 'Safari', location: 'Chittagong, BD', ip: '27.147.190.5', lastActive: '2h ago', isCurrent: false },
  ]);

  return (
    <div className="p-6 md:p-10 bg-[#f8fafc] dark:bg-[#05070a] min-h-screen text-slate-900 dark:text-white">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            Security <span className="text-indigo-600">Protocol</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Advanced access control & threat detection</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">
            <Shield size={14} /> Run Security Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          
          {/* 2. LOGIN ACTIVITY MAP (VISUAL INTERFACE) */}
          <div className="bg-white dark:bg-[#0f1117] rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                <Navigation size={18} className="text-indigo-600" /> Geography Tracking
              </h3>
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 2 Active Locations
              </div>
            </div>
            <div className="relative h-[300px] bg-slate-100 dark:bg-[#080a0f] overflow-hidden flex items-center justify-center group">
              {/* Fake Map Background using CSS/Grid */}
              <div className="absolute inset-0 opacity-20 dark:opacity-10 grayscale" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', size: '20px 20px', backgroundSize: '30px 30px' }}></div>
              
              {/* Radar Effect for Login Points */}
              <div className="relative">
                 <div className="absolute -top-10 left-10 animate-ping w-8 h-8 bg-indigo-500/30 rounded-full"></div>
                 <div className="w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-slate-900 shadow-2xl relative z-10"></div>
                 <div className="absolute top-6 -left-12 bg-white dark:bg-[#1a1d26] p-3 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 min-w-[120px]">
                    <p className="text-[9px] font-black uppercase text-indigo-600">Current Session</p>
                    <p className="text-[10px] font-bold">Dhaka, Bangladesh</p>
                 </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl border border-white/20 flex justify-between items-center">
                 <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Crosshair size={14}/> Auto-detecting suspicious geofencing...
                 </p>
                 <button className="text-[9px] font-black text-indigo-600 uppercase hover:underline">View All Pins</button>
              </div>
            </div>
          </div>

          {/* 3. IP WHITELISTING SYSTEM */}
          <div className="bg-white dark:bg-[#0f1117] rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-white/5">
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest">IP Whitelisting</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 italic">Only allow access from these addresses</p>
              </div>
              <button className="p-3 bg-indigo-600 text-white rounded-2xl hover:scale-110 transition-all shadow-lg shadow-indigo-500/20">
                <Plus size={18} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {whitelistedIPs.map(ip => (
                <div key={ip.id} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0f1117] flex items-center justify-center text-indigo-600 shadow-sm">
                      <Globe size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black dark:text-white uppercase tracking-tight">{ip.label}</h4>
                      <p className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter">{ip.ip}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[9px] font-black text-slate-400 uppercase hidden md:block">Added {ip.date}</span>
                    <button className="p-2 text-slate-300 hover:text-rose-500 transition-all"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. ACTIVE DEVICES (RE-USED) */}
          <div className="bg-white dark:bg-[#0f1117] rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-black text-sm uppercase tracking-widest">Active Devices</h3>
              <button className="p-2 text-slate-400 hover:text-indigo-600 transition-all"><RefreshCw size={16}/></button>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {sessions.map(s => (
                <div key={s.id} className="p-8 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${s.isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      {s.device.includes('iPhone') ? <Smartphone size={20}/> : <Monitor size={20}/>}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase">{s.device} {s.isCurrent && <span className="ml-2 text-[8px] text-emerald-500 italic lowercase">(active)</span>}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{s.browser} • {s.ip}</p>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"><LogOut size={16}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. SIDEBAR CONTROLS */}
        <div className="space-y-8">
           {/* Security Score */}
           <div className="bg-indigo-600 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/30">
              <Shield className="absolute -right-6 -bottom-6 opacity-10" size={150} />
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4 leading-tight">Security <br/>Standing</h3>
              <div className="h-2 w-full bg-white/20 rounded-full mb-4 overflow-hidden">
                <div className="h-full bg-white w-[85%] rounded-full shadow-lg"></div>
              </div>
              <p className="text-[10px] font-bold opacity-80 uppercase mb-8">Score: 85/100 (Safe)</p>
              <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">Optimize Security</button>
           </div>

           {/* 2FA Card */}
           <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
             <h3 className="font-black text-[11px] uppercase tracking-widest mb-6 flex items-center gap-2"><Fingerprint size={16} className="text-emerald-500"/> Multi-Factor Auth</h3>
             <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl mb-6">
                <p className="text-[10px] font-black text-emerald-600 uppercase mb-1 flex items-center gap-2"><CheckCircle2 size={12}/> Status: Enabled</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase italic">Linked to Google Auth</p>
             </div>
             <button className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-400 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all">Regenerate Keys</button>
           </div>

           {/* Quick Settings */}
           <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="font-black text-[11px] uppercase tracking-widest mb-6 flex items-center gap-2"><Lock size={16} className="text-indigo-600"/> Quick Privacy</h3>
              <div className="space-y-4">
                 <ToggleItem label="Global Logout on Exit" active={false} />
                 <ToggleItem label="Biometric Login" active={true} />
                 <ToggleItem label="IP Anomaly Alerts" active={true} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// --- HELPERS ---
function ToggleItem({ label, active }: { label: string, active: boolean }) {
  return (
    <div className="flex justify-between items-center">
       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
       <div className={`w-10 h-5 rounded-full transition-all relative cursor-pointer ${active ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`}>
          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'left-6' : 'left-1'}`}></div>
       </div>
    </div>
  );
}


