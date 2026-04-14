
"use client";

import { useEffect, useState } from "react";
import { Globe, Lock, LogOut, ShieldCheck, Smartphone, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { securityService } from "@/app/lib/apiClient";

export default function PrivacySection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sessions, setSessions] = useState<any[]>([]);
  const [whitelist, setWhitelist] = useState<any[]>([]);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [ip, setIp] = useState("");
  const [label, setLabel] = useState("");

  const fetchSecurityData = async () => {
    setLoading(true);
    setError("");
    try {
      const [sessionRes, whitelistRes, twoFaRes] = await Promise.all([
        securityService.getSessions(),
        securityService.getIPs(),
        securityService.get2FA(),
      ]);

      setSessions(Array.isArray(sessionRes?.sessions) ? sessionRes.sessions : []);
      setWhitelist(Array.isArray(whitelistRes?.ips) ? whitelistRes.ips : []);
      setTwoFactorEnabled(Boolean(twoFaRes?.twoFactor?.enabled));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load security settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecurityData();
  }, []);

  const toggle2FA = async () => {
    const next = !twoFactorEnabled;
    setTwoFactorEnabled(next);
    try {
      await securityService.toggle2FA(next);
    } catch (err: any) {
      setTwoFactorEnabled(!next);
      alert(err?.response?.data?.message || "Failed to update 2FA");
    }
  };

  const terminateSession = async (id: string) => {
    try {
      await securityService.terminateSession(id);
      setSessions((prev) => prev.filter((session) => session._id !== id));
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to terminate session");
    }
  };

  const addIp = async () => {
    if (!ip.trim() || !label.trim()) return;
    try {
      const response = await securityService.addIP({ ip: ip.trim(), label: label.trim() });
      if (response?.entry) {
        setWhitelist((prev) => [response.entry, ...prev.filter((row) => row._id !== response.entry._id)]);
      }
      setIp("");
      setLabel("");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to add IP");
    }
  };

  const deleteIp = async (id: string) => {
    try {
      await securityService.deleteIP(id);
      setWhitelist((prev) => prev.filter((entry) => entry._id !== id));
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete IP");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 md:space-y-8 px-2 sm:px-0">
      <div className="p-6 md:p-10 bg-[#0a0f1d]/50 border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] backdrop-blur-3xl shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-5 mb-8 md:mb-12 text-center sm:text-left">
          <div className="p-3 md:p-4 bg-indigo-500/20 rounded-2xl md:rounded-[1.5rem] text-indigo-500 shadow-inner shrink-0">
            <ShieldCheck size={28} className="md:w-8 md:h-8" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase italic">Security & Privacy</h3>
            <p className="text-slate-500 font-bold text-[10px] md:text-sm uppercase tracking-widest mt-1">
              Manage sessions, trusted IPs and 2FA
            </p>
          </div>
        </div>

        {loading ? (
          <div className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center text-slate-400 font-bold">
            Loading security settings...
          </div>
        ) : (
          <div className="space-y-6">
            {error ? (
              <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-300 text-sm font-bold">
                {error}
              </div>
            ) : null}

            <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${twoFactorEnabled ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-300"}`}>
                  <Smartphone size={22} />
                </div>
                <div>
                  <p className="font-black text-slate-100 uppercase text-sm">Two Factor Authentication</p>
                  <p className="text-xs text-slate-400">{twoFactorEnabled ? "Enabled" : "Disabled"}</p>
                </div>
              </div>
              <button
                onClick={toggle2FA}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                  twoFactorEnabled ? "bg-emerald-500/20 text-emerald-300" : "bg-indigo-600 text-white"
                }`}
              >
                {twoFactorEnabled ? "Disable" : "Enable"}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-4">
                <p className="font-black text-lg text-slate-100 flex items-center gap-2">
                  <Globe size={18} className="text-indigo-400" /> Active Sessions
                </p>
                <div className="space-y-3">
                  {sessions.length === 0 ? (
                    <p className="text-slate-400 text-sm">No active sessions found.</p>
                  ) : (
                    sessions.map((session) => (
                      <div key={session._id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                        <div>
                          <p className="text-sm font-black text-slate-100">{session.device || "Unknown Device"}</p>
                          <p className="text-xs text-slate-400">
                            {session.location || session.ip || "Unknown location"} •{" "}
                            {session.lastActive ? new Date(session.lastActive).toLocaleString() : "Recent"}
                          </p>
                        </div>
                        {session.isCurrent ? (
                          <span className="text-[10px] font-black text-emerald-300 uppercase">Current</span>
                        ) : (
                          <button
                            onClick={() => terminateSession(session._id)}
                            className="px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-500/10 border border-rose-500/20 text-rose-300"
                          >
                            <LogOut size={12} className="inline-block mr-1" />
                            End
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-4">
                <p className="font-black text-lg text-slate-100 flex items-center gap-2">
                  <Lock size={18} className="text-indigo-400" /> IP Whitelist
                </p>

                <div className="grid grid-cols-1 gap-3">
                  <input
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    placeholder="IP address"
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm text-white outline-none"
                  />
                  <input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Label (Home, Office)"
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm text-white outline-none"
                  />
                  <button
                    onClick={addIp}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest"
                  >
                    Add IP
                  </button>
                </div>

                <div className="space-y-2">
                  {whitelist.length === 0 ? (
                    <p className="text-slate-400 text-sm">No trusted IPs added yet.</p>
                  ) : (
                    whitelist.map((entry) => (
                      <div key={entry._id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                        <div>
                          <p className="text-sm font-black text-slate-100">{entry.label || "Trusted"}</p>
                          <p className="text-xs text-slate-400">{entry.ip}</p>
                        </div>
                        <button
                          onClick={() => deleteIp(entry._id)}
                          className="text-rose-300 hover:text-rose-200"
                          aria-label="Delete trusted IP"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
