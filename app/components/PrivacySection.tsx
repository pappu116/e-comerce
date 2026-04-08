

"use client";
import { Lock, ShieldCheck, Eye, EyeOff, Smartphone, Globe, Trash2, X, CheckCircle2, LogOut } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrivacySection() {
  const [showPass, setShowPass] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const [sessions, setSessions] = useState([
    { id: 1, device: "iPhone 15 Pro", location: "Dhaka, BD", status: "Current Session", isCurrent: true, icon: <Smartphone size={18} /> },
    { id: 2, device: "Chrome on Windows", location: "Sylhet, BD", status: "Last active: 2h ago", isCurrent: false, icon: <Globe size={18} /> }
  ]);

  const handle2FAToggle = () => {
    if (!is2FAEnabled) {
      setShowOTPModal(true);
    } else {
      if(confirm("Are you sure you want to disable 2FA? It reduces account security.")) {
        setIs2FAEnabled(false);
      }
    }
  };

  const verifyOTP = () => {
    setIs2FAEnabled(true);
    setShowOTPModal(false);
  };

  const handleLogoutAll = () => {
    if(confirm("Are you sure you want to log out from all other devices?")) {
      setSessions(prev => prev.filter(s => s.isCurrent));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 md:space-y-8 px-2 sm:px-0">
      <div className="p-6 md:p-10 bg-[#0a0f1d]/50 border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-5 mb-8 md:mb-12 text-center sm:text-left">
          <div className="p-3 md:p-4 bg-indigo-500/20 rounded-2xl md:rounded-[1.5rem] text-indigo-500 shadow-inner shrink-0">
            <ShieldCheck size={28} className="md:w-8 md:h-8" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase italic">Security & Privacy</h3>
            <p className="text-slate-500 font-bold text-[10px] md:text-sm uppercase tracking-widest mt-1">Manage encryption and sessions</p>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Two-Factor Authentication Card */}
          <div className="p-5 md:p-8 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col sm:flex-row justify-between items-center group transition-all hover:bg-white/[0.08] gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className={`p-4 rounded-2xl shrink-0 ${is2FAEnabled ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-400'}`}>
                <Smartphone size={24} />
              </div>
              <div>
                <p className="font-black text-lg md:text-xl text-slate-100 flex items-center justify-center sm:justify-start gap-2">
                  Two-Factor Auth 
                  {is2FAEnabled && <CheckCircle2 size={16} className="text-green-500" />}
                </p>
                <p className="text-xs text-slate-500 font-medium mt-1">Double the protection of your digital assets.</p>
              </div>
            </div>
            
            <div 
              onClick={handle2FAToggle}
              className={`w-14 h-7 md:w-16 md:h-8 rounded-full relative cursor-pointer transition-all duration-300 shrink-0 ${is2FAEnabled ? 'bg-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'bg-slate-800'}`}
            >
              <motion.div 
                animate={{ x: is2FAEnabled ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 28 : 34) : 4 }}
                className="absolute top-1 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full shadow-lg" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Change Password Section */}
            <div className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] space-y-6">
              <p className="font-black text-lg md:text-xl text-slate-100 flex items-center gap-2">
                <Lock size={18} className="text-indigo-400" /> Update Password
              </p>
              <div className="space-y-4">
                <div className="relative">
                  <input type={showPass ? "text" : "password"} placeholder="Current Password" className="w-full bg-white/5 border border-white/10 p-4 md:p-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-indigo-500 transition-all font-bold text-white text-xs md:text-sm outline-none" />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-400 transition-colors">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <input type="password" placeholder="New Password" className="w-full bg-white/5 border border-white/10 p-4 md:p-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-indigo-500 transition-all font-bold text-white text-xs md:text-sm outline-none" />
                <button className="w-full py-4 md:py-5 bg-indigo-600 text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-indigo-500 transition-all shadow-xl active:scale-95">Update Password</button>
              </div>
            </div>

            {/* Login Devices Section */}
            <div className="p-6 md:p-8 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <p className="font-black text-lg md:text-xl text-slate-100 flex items-center gap-2">
                  <Globe size={18} className="text-indigo-400" /> Active Sessions
                </p>
                {sessions.length > 1 && (
                  <button onClick={handleLogoutAll} className="text-[9px] md:text-[10px] font-black text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest flex items-center gap-1">
                    <LogOut size={12} /> Clear Other
                  </button>
                )}
              </div>

              <div className="space-y-3 flex-1">
                {sessions.map((session) => (
                  <div key={session.id} className={`flex items-center justify-between p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all ${!session.isCurrent ? 'opacity-70' : 'border-indigo-500/30 bg-indigo-500/5'}`}>
                    <div className="flex gap-3 md:gap-4 items-center min-w-0">
                      <div className={`p-2 rounded-lg md:rounded-xl shrink-0 ${session.isCurrent ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-500/10 text-slate-500'}`}>
                        {session.icon}
                      </div>
                      <div className="truncate">
                        <p className="text-[11px] md:text-xs font-black text-slate-100 truncate">{session.device}</p>
                        <p className={`text-[9px] font-bold uppercase tracking-tighter mt-0.5 ${session.isCurrent ? 'text-green-500' : 'text-slate-500'}`}>
                          {session.location} • {session.status}
                        </p>
                      </div>
                    </div>
                    {!session.isCurrent && (
                      <button className="text-[8px] md:text-[9px] font-black text-red-500/80 hover:text-red-400 uppercase tracking-widest px-2 py-1.5 bg-red-500/5 rounded-lg border border-red-500/10 shrink-0 ml-2">Kill</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="pt-8 border-t border-white/5">
             <div className="p-6 md:p-8 bg-red-500/5 border border-red-500/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-6">
                <div>
                   <p className="font-black text-lg md:text-xl text-red-500 flex items-center justify-center sm:justify-start gap-2 uppercase italic">
                     <Trash2 size={20} /> Delete Identity
                   </p>
                   <p className="text-[10px] md:text-xs text-slate-500 font-bold mt-1 uppercase tracking-tighter">This action is irreversible and wipes all order history.</p>
                </div>
                <button className="w-full sm:w-auto px-8 py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all active:scale-95">Deactivate</button>
             </div>
          </div>
        </div>
      </div>

      {/* Responsive OTP Modal */}
      <AnimatePresence>
        {showOTPModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowOTPModal(false)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }} 
              className="bg-[#0f172a] border border-white/10 w-full max-w-sm md:max-w-md rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 relative z-10 text-center shadow-2xl overflow-hidden"
            >
              <button onClick={() => setShowOTPModal(false)} className="absolute top-6 right-6 md:top-8 md:right-8 text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
              
              <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-500/20 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-indigo-500 mx-auto mb-6 md:mb-8">
                <Smartphone size={32} className="md:w-9 md:h-9" />
              </div>
              
              <h4 className="text-xl md:text-2xl font-black text-white uppercase italic">Verify Device</h4>
              <p className="text-slate-500 text-[10px] md:text-sm font-bold mt-2 uppercase tracking-widest">Code sent to: <span className="text-indigo-400">+880 1700-XXXXXX</span></p>
              
              <div className="flex justify-center gap-2 md:gap-4 my-8 md:my-10">
                {otp.map((_, idx) => (
                  <input key={idx} type="text" maxLength={1} className="w-12 h-14 md:w-14 md:h-18 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-center text-xl md:text-2xl font-black text-white focus:border-indigo-500 outline-none transition-all" />
                ))}
              </div>

              <button onClick={verifyOTP} className="w-full py-5 md:py-6 bg-indigo-600 text-white rounded-2xl md:rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-500 transition-all active:scale-95 text-xs md:text-sm">Authorize</button>
              
              <p className="mt-8 text-[9px] md:text-[10px] text-slate-500 font-black cursor-pointer hover:text-indigo-400 transition-colors uppercase tracking-[0.3em]">Resend Code</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}