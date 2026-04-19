"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Globe, LogOut, Plus, RefreshCw, Shield, ShieldCheck, Smartphone, Trash2 } from "lucide-react";
import { securityService } from "@/app/lib/apiClient";

export default function AdminDevicesLive() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [whitelist, setWhitelist] = useState<any[]>([]);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ip, setIp] = useState("");
  const [label, setLabel] = useState("");

  const activeCount = useMemo(() => sessions.filter((s) => Boolean(s?.isCurrent)).length, [sessions]);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [sessionsRes, whitelistRes, twoFactorRes] = await Promise.all([
        securityService.getSessions(),
        securityService.getIPs(),
        securityService.get2FA(),
      ]);
      setSessions(Array.isArray(sessionsRes?.sessions) ? sessionsRes.sessions : []);
      setWhitelist(Array.isArray(whitelistRes?.ips) ? whitelistRes.ips : []);
      setTwoFactorEnabled(Boolean(twoFactorRes?.twoFactor?.enabled));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load device tracking data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const terminateSession = async (id: string) => {
    try {
      await securityService.terminateSession(id);
      setSessions((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to terminate session");
    }
  };

  const addTrustedIp = async () => {
    if (!ip.trim() || !label.trim()) return;
    try {
      const response = await securityService.addIP({ ip: ip.trim(), label: label.trim() });
      if (response?.entry) {
        setWhitelist((prev) => [response.entry, ...prev.filter((row) => row._id !== response.entry._id)]);
      }
      setIp("");
      setLabel("");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to add trusted IP");
    }
  };

  const deleteTrustedIp = async (id: string) => {
    try {
      await securityService.deleteIP(id);
      setWhitelist((prev) => prev.filter((entry) => entry._id !== id));
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete trusted IP");
    }
  };

  const toggleTwoFactor = async () => {
    const next = !twoFactorEnabled;
    setTwoFactorEnabled(next);
    try {
      await securityService.toggle2FA(next);
    } catch (err: any) {
      setTwoFactorEnabled(!next);
      alert(err?.response?.data?.message || "Failed to update 2FA");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-[#f8fafc] dark:bg-[#05070a] min-h-screen text-slate-900 dark:text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">
            Device <span className="text-indigo-600">Tracking</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">
            Live sessions, trusted IPs, and account hardening
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={load}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={toggleTwoFactor}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
              twoFactorEnabled
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            }`}
          >
            <ShieldCheck size={14} />
            2FA {twoFactorEnabled ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-10 bg-white dark:bg-[#0f1117] border border-slate-100 dark:border-slate-800 rounded-[2rem] text-center font-bold text-slate-500">
          Loading security telemetry...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#0f1117] rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                  <Smartphone size={18} className="text-indigo-600" /> Active Sessions
                </h3>
                <span className="text-[10px] font-bold uppercase text-slate-500">
                  {sessions.length} session{sessions.length === 1 ? "" : "s"}
                </span>
              </div>

              {error ? (
                <div className="p-5 text-sm text-rose-500 border-t border-rose-500/20 bg-rose-500/10">{error}</div>
              ) : null}

              <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {sessions.length === 0 ? (
                  <div className="p-6 text-sm text-slate-500">No active sessions found.</div>
                ) : (
                  sessions.map((session) => (
                    <div key={session._id} className="p-6 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-black uppercase">
                          {session.device || "Unknown Device"} {session.isCurrent ? "(current)" : ""}
                        </p>
                        <p className="text-[11px] text-slate-500 font-semibold">
                          {session.browser || "Browser"} | {session.os || "OS"} | {session.ip || "Unknown IP"}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Last active:{" "}
                          {session.lastActive ? new Date(session.lastActive).toLocaleString() : "N/A"}
                        </p>
                      </div>
                      {session.isCurrent ? (
                        <span className="text-[10px] font-black uppercase text-emerald-500 flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Current
                        </span>
                      ) : (
                        <button
                          onClick={() => terminateSession(session._id)}
                          className="px-3 py-2 text-[10px] font-black uppercase rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400"
                        >
                          <LogOut size={12} className="inline-block mr-1" />
                          Terminate
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-[#0f1117] rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2">
                    <Globe size={18} className="text-indigo-600" /> Trusted IP Whitelist
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Allow only approved endpoints</p>
                </div>
              </div>

              <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-3 border-b border-slate-50 dark:border-slate-800">
                <input
                  value={ip}
                  onChange={(event) => setIp(event.target.value)}
                  placeholder="IP address"
                  className="h-11 rounded-xl border border-slate-200 dark:border-slate-800 px-3 bg-slate-50 dark:bg-slate-950"
                />
                <input
                  value={label}
                  onChange={(event) => setLabel(event.target.value)}
                  placeholder="Label"
                  className="h-11 rounded-xl border border-slate-200 dark:border-slate-800 px-3 bg-slate-50 dark:bg-slate-950"
                />
                <button
                  onClick={addTrustedIp}
                  className="h-11 rounded-xl bg-indigo-600 text-white text-[11px] font-black uppercase tracking-widest"
                >
                  <Plus size={14} className="inline-block mr-1" />
                  Add Trusted IP
                </button>
              </div>

              <div className="p-4 space-y-3">
                {whitelist.length === 0 ? (
                  <p className="text-sm text-slate-500">No trusted IP entries yet.</p>
                ) : (
                  whitelist.map((entry) => (
                    <div
                      key={entry._id}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all"
                    >
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-tight">{entry.label || "Trusted Endpoint"}</h4>
                        <p className="text-[11px] font-bold text-slate-400 font-mono tracking-tight">{entry.ip}</p>
                      </div>
                      <button
                        onClick={() => deleteTrustedIp(entry._id)}
                        className="p-2 text-slate-300 hover:text-rose-500 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/30">
              <Shield className="absolute -right-6 -bottom-6 opacity-10" size={140} />
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4 leading-tight">Security Standing</h3>
              <div className="h-2 w-full bg-white/20 rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-white rounded-full shadow-lg"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(35, sessions.length * 20 + (twoFactorEnabled ? 20 : 0) + whitelist.length * 10)
                    )}%`,
                  }}
                />
              </div>
              <p className="text-[10px] font-bold opacity-80 uppercase mb-6">
                {activeCount > 0 ? `${activeCount} current session active` : "No active session found"}
              </p>
              <button
                onClick={load}
                className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all"
              >
                Recalculate Score
              </button>
            </div>

            <div className="bg-white dark:bg-[#0f1117] p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="font-black text-[11px] uppercase tracking-widest mb-3">Hardening Summary</h3>
              <div className="space-y-3 text-[11px] text-slate-500">
                <p>2FA: {twoFactorEnabled ? "enabled" : "disabled"}</p>
                <p>Trusted IP entries: {whitelist.length}</p>
                <p>Total sessions tracked: {sessions.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
