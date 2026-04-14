'use client';

import { useEffect, useState } from 'react';
import { Globe, LogOut, Plus, ShieldCheck, Smartphone, Trash2 } from 'lucide-react';
import { securityService } from '@/app/lib/apiClient';

export default function AdminSecurityPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [whitelist, setWhitelist] = useState<any[]>([]);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [ip, setIp] = useState('');
  const [label, setLabel] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
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
      setError(err?.response?.data?.message || 'Failed to load security data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggle2FA = async () => {
    const next = !twoFactorEnabled;
    setTwoFactorEnabled(next);
    try {
      await securityService.toggle2FA(next);
    } catch (err: any) {
      setTwoFactorEnabled(!next);
      alert(err?.response?.data?.message || 'Failed to update 2FA');
    }
  };

  const killSession = async (id: string) => {
    try {
      await securityService.terminateSession(id);
      setSessions((prev) => prev.filter((item) => item._id !== id));
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to terminate session');
    }
  };

  const addIp = async () => {
    if (!ip.trim() || !label.trim()) return;
    try {
      const response = await securityService.addIP({ ip: ip.trim(), label: label.trim() });
      if (response?.entry) {
        setWhitelist((prev) => [response.entry, ...prev.filter((row) => row._id !== response.entry._id)]);
      }
      setIp('');
      setLabel('');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to add IP');
    }
  };

  const deleteIp = async (id: string) => {
    try {
      await securityService.deleteIP(id);
      setWhitelist((prev) => prev.filter((entry) => entry._id !== id));
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to remove IP');
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-slate-50 dark:bg-[#05070a] text-slate-900 dark:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter flex items-center gap-3">
              <ShieldCheck size={36} className="text-indigo-600" />
              Security Console
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-bold uppercase tracking-[0.2em]">
              Live security controls
            </p>
          </div>
          <button
            onClick={toggle2FA}
            className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest ${
              twoFactorEnabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-indigo-600 text-white'
            }`}
          >
            2FA: {twoFactorEnabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {loading ? (
          <div className="p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center font-bold text-slate-500">
            Loading security data...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
              <h2 className="font-black text-lg mb-4 flex items-center gap-2">
                <Smartphone size={18} className="text-indigo-500" /> Active Sessions
              </h2>
              {error ? <p className="text-sm text-rose-500 mb-4">{error}</p> : null}
              <div className="space-y-3">
                {sessions.length === 0 ? (
                  <p className="text-sm text-slate-500">No active sessions found.</p>
                ) : (
                  sessions.map((session) => (
                    <div key={session._id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center gap-3">
                      <div>
                        <p className="font-black text-sm">{session.device || 'Unknown Device'}</p>
                        <p className="text-xs text-slate-500">
                          {session.location || session.ip || 'Unknown'} •{' '}
                          {session.lastActive ? new Date(session.lastActive).toLocaleString() : 'Recent'}
                        </p>
                      </div>
                      {session.isCurrent ? (
                        <span className="text-[10px] font-black uppercase text-emerald-500">Current</span>
                      ) : (
                        <button
                          onClick={() => killSession(session._id)}
                          className="px-3 py-2 text-[10px] font-black uppercase rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400"
                        >
                          <LogOut size={12} className="inline-block mr-1" />
                          Kill
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
              <h2 className="font-black text-lg mb-4 flex items-center gap-2">
                <Globe size={18} className="text-indigo-500" /> Trusted IP Whitelist
              </h2>
              <div className="grid grid-cols-1 gap-3 mb-4">
                <input
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  placeholder="IP Address"
                  className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-800 px-3 bg-slate-50 dark:bg-slate-950"
                />
                <input
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Label"
                  className="w-full h-11 rounded-xl border border-slate-200 dark:border-slate-800 px-3 bg-slate-50 dark:bg-slate-950"
                />
                <button
                  onClick={addIp}
                  className="h-11 rounded-xl bg-indigo-600 text-white text-[11px] font-black uppercase tracking-widest"
                >
                  <Plus size={14} className="inline-block mr-1" />
                  Add Trusted IP
                </button>
              </div>
              <div className="space-y-2">
                {whitelist.length === 0 ? (
                  <p className="text-sm text-slate-500">No trusted IP entries.</p>
                ) : (
                  whitelist.map((entry) => (
                    <div key={entry._id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-between items-center gap-3">
                      <div>
                        <p className="font-black text-sm">{entry.label || 'Trusted Entry'}</p>
                        <p className="text-xs text-slate-500">{entry.ip}</p>
                      </div>
                      <button onClick={() => deleteIp(entry._id)} className="text-rose-400 hover:text-rose-300">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
