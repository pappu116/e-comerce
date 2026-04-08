
"use client";
import { useState, useRef } from "react";
import { 
  User, Phone, Calendar, Mail, Settings, Camera, 
  ShieldCheck, Globe, Save, CheckCircle2, UserCircle2,
  Fingerprint, Smartphone, Link as LinkIcon, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsSection({ user }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // ড্রপডাউন স্টেট
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Male");
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English (US)");

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  return (
    <div className="relative p-6 md:p-10 bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] space-y-8 md:space-y-10 shadow-2xl backdrop-blur-3xl overflow-hidden">
      
      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: -100, x: "-50%", opacity: 0 }} 
            animate={{ y: 0, x: "-50%", opacity: 1 }} 
            exit={{ y: -100, x: "-50%", opacity: 0 }}
            className="fixed md:absolute top-6 left-1/2 bg-green-500 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl z-[100] font-black text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap"
          >
            <CheckCircle2 size={16} /> Changes Saved Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Profile Photo */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-500 hidden md:block">
                <Settings size={30} />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase italic">Account Profile</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Manage your identity and privacy</p>
            </div>
        </div>

        {/* Profile Picture */}
        <div className="relative group">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2rem] overflow-hidden border-2 border-indigo-500/30 bg-zinc-900 flex items-center justify-center shadow-2xl">
            {previewImage || user?.image ? (
              <img src={previewImage || user?.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <UserCircle2 size={40} className="text-slate-700" />
            )}
          </div>
          <button 
            onClick={handlePhotoClick}
            className="absolute -bottom-1 -right-1 p-3 bg-indigo-600 rounded-2xl text-white shadow-xl hover:bg-indigo-500 transition-all border-4 border-[#0a0a0a] active:scale-90"
          >
            <Camera size={16} />
          </button>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {[
            { label: "Legal Name", val: user?.name, icon: User, dis: false, placeholder: "Enter your full name" },
            { label: "Email Address", val: user?.email, icon: Mail, dis: true, placeholder: "Email cannot be changed" },
            { label: "Phone Number", val: "+880 1700-000000", icon: Phone, dis: false, placeholder: "+880" },
            { label: "Alternative Phone", val: "", icon: Smartphone, dis: false, placeholder: "Secondary number for courier" },
            { label: "Nationality / NID", val: "", icon: Fingerprint, dis: false, placeholder: "NID or Passport number" },
            { label: "Date of Birth", val: "1998-06-12", icon: Calendar, dis: false, type: "date" }
        ].map((field, i) => (
            <div key={i} className="space-y-2">
                <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">{field.label}</label>
                <div className={`flex items-center gap-4 p-4 md:p-5 bg-white/5 border border-white/10 rounded-2xl transition-all focus-within:border-indigo-500/50 ${field.dis && 'opacity-50 cursor-not-allowed'}`}>
                    <field.icon size={18} className="text-indigo-400 shrink-0" />
                    <input 
                      type={field.type || "text"} 
                      defaultValue={field.val} 
                      disabled={field.dis} 
                      placeholder={field.placeholder}
                      className="bg-transparent border-none outline-none font-bold w-full text-white placeholder:text-slate-600 text-sm" 
                    />
                </div>
            </div>
        ))}

        {/* Custom Gender Select */}
        <div className="space-y-2 relative">
          <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">Gender</label>
          <div 
            onClick={() => setIsGenderOpen(!isGenderOpen)}
            className="flex items-center justify-between p-4 md:p-5 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:border-indigo-500/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <User size={18} className="text-indigo-400 shrink-0" />
              <span className="font-bold text-white text-sm">{selectedGender}</span>
            </div>
            <ChevronDown size={18} className={`text-slate-500 transition-transform ${isGenderOpen ? 'rotate-180' : ''}`} />
          </div>
          <AnimatePresence>
            {isGenderOpen && (
              <motion.div initial={{opacity:0, y: -10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="absolute z-20 w-full mt-2 bg-[#121826] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
                {["Male", "Female", "Other"].map((opt) => (
                  <div key={opt} onClick={() => {setSelectedGender(opt); setIsGenderOpen(false);}} className="p-4 hover:bg-indigo-600 text-white text-sm font-bold cursor-pointer transition-colors border-b border-white/5 last:border-none">{opt}</div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Custom Language Preference */}
        <div className="space-y-2 relative">
          <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">Language Preference</label>
          <div 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center justify-between p-4 md:p-5 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:border-indigo-500/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <Globe size={18} className="text-indigo-400 shrink-0" />
              <span className="font-bold text-white text-sm">{selectedLang}</span>
            </div>
            <ChevronDown size={18} className={`text-slate-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
          </div>
          <AnimatePresence>
            {isLangOpen && (
              <motion.div initial={{opacity:0, y: -10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="absolute z-20 w-full mt-2 bg-[#121826] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
                {["English (US)", "Bengali (BD)"].map((opt) => (
                  <div key={opt} onClick={() => {setSelectedLang(opt); setIsLangOpen(false);}} className="p-4 hover:bg-indigo-600 text-white text-sm font-bold cursor-pointer transition-colors border-b border-white/5 last:border-none">{opt}</div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social Connection */}
        <div className="space-y-2">
          <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">Social Connection</label>
          <div className="flex items-center justify-between p-4 md:p-5 bg-white/5 border border-white/10 rounded-2xl border-dashed border-indigo-500/20">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
               </div>
               <div>
                  <p className="text-xs font-black text-white">Google Account</p>
                  <p className="text-[9px] text-green-500 font-bold uppercase tracking-widest">Verified</p>
               </div>
            </div>
            <CheckCircle2 size={18} className="text-green-500" />
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-slate-500 order-2 md:order-1">
           <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><ShieldCheck size={16} /></div>
           <p className="text-[10px] md:text-xs font-bold uppercase tracking-tighter">Your data is encrypted and secure.</p>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full md:w-auto px-12 py-5 bg-indigo-600 text-white rounded-[1.5rem] md:rounded-[2rem] font-black hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs order-1 md:order-2"
        >
          {isSaving ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><Settings size={18} /></motion.div>
          ) : <Save size={18} />}
          {isSaving ? "Processing..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}