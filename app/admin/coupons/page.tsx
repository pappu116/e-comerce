"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Plus, Search, Trash2 } from "lucide-react";
import { adminService, handleApiError } from "@/app/lib/apiClient";

type Coupon = {
  _id: string;
  code: string;
  type: "fixed" | "percent";
  value: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  usageLimit: number;
  usedCount: number;
  perUserLimit: number;
  startsAt?: string | null;
  expiresAt?: string | null;
  isActive: boolean;
};

const EMPTY_FORM = {
  code: "",
  type: "fixed",
  value: 0,
  minOrderAmount: 0,
  maxDiscountAmount: 0,
  usageLimit: 0,
  perUserLimit: 0,
  startsAt: "",
  expiresAt: "",
  isActive: true,
};

export default function AdminCouponsPage() {
  const [rows, setRows] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState<any>(EMPTY_FORM);

  useEffect(() => {
    const timer = window.setTimeout(() => setSearch(searchInput.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await adminService.getCoupons({ page: 1, limit: 100, search: search || undefined });
      setRows(Array.isArray(data?.coupons) ? data.coupons : []);
    } catch (err) {
      setError(handleApiError(err));
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    load();
  }, [load]);

  const resetForm = () => {
    setEditingId("");
    setForm(EMPTY_FORM);
  };

  const startEdit = (row: Coupon) => {
    setEditingId(row._id);
    setForm({
      code: row.code || "",
      type: row.type || "fixed",
      value: Number(row.value || 0),
      minOrderAmount: Number(row.minOrderAmount || 0),
      maxDiscountAmount: Number(row.maxDiscountAmount || 0),
      usageLimit: Number(row.usageLimit || 0),
      perUserLimit: Number(row.perUserLimit || 0),
      startsAt: row.startsAt ? String(row.startsAt).slice(0, 10) : "",
      expiresAt: row.expiresAt ? String(row.expiresAt).slice(0, 10) : "",
      isActive: Boolean(row.isActive),
    });
  };

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        code: String(form.code || "").toUpperCase().trim(),
        value: Number(form.value || 0),
        minOrderAmount: Number(form.minOrderAmount || 0),
        maxDiscountAmount: Number(form.maxDiscountAmount || 0),
        usageLimit: Number(form.usageLimit || 0),
        perUserLimit: Number(form.perUserLimit || 0),
      };
      if (editingId) {
        await adminService.updateCoupon(editingId, payload);
      } else {
        await adminService.createCoupon(payload);
      }
      resetForm();
      await load();
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this coupon?")) return;
    setDeleting(id);
    setError("");
    try {
      await adminService.deleteCoupon(id);
      await load();
      if (editingId === id) resetForm();
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setDeleting("");
    }
  };

  const activeCount = useMemo(() => rows.filter((row) => row.isActive).length, [rows]);

  return (
    <div className="mx-auto min-h-screen max-w-[1400px] space-y-6 p-4 md:p-8">
      <div className="rounded-[2rem] border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">Coupons</h1>
        <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">
          Total {rows.length} | Active {activeCount}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 rounded-[2rem] border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-black">{editingId ? "Edit Coupon" : "Create Coupon"}</h2>
          <div className="grid gap-3">
            <input className="rounded-xl border px-3 py-2 text-sm" placeholder="Code" value={form.code} onChange={(e) => setForm((p: any) => ({ ...p, code: e.target.value.toUpperCase() }))} />
            <div className="grid grid-cols-2 gap-3">
              <select className="rounded-xl border px-3 py-2 text-sm" value={form.type} onChange={(e) => setForm((p: any) => ({ ...p, type: e.target.value }))}>
                <option value="fixed">Fixed</option>
                <option value="percent">Percent</option>
              </select>
              <input className="rounded-xl border px-3 py-2 text-sm" type="number" min={0} placeholder="Value" value={form.value} onChange={(e) => setForm((p: any) => ({ ...p, value: Number(e.target.value) }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input className="rounded-xl border px-3 py-2 text-sm" type="number" min={0} placeholder="Min Order" value={form.minOrderAmount} onChange={(e) => setForm((p: any) => ({ ...p, minOrderAmount: Number(e.target.value) }))} />
              <input className="rounded-xl border px-3 py-2 text-sm" type="number" min={0} placeholder="Max Discount" value={form.maxDiscountAmount} onChange={(e) => setForm((p: any) => ({ ...p, maxDiscountAmount: Number(e.target.value) }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input className="rounded-xl border px-3 py-2 text-sm" type="number" min={0} placeholder="Usage Limit" value={form.usageLimit} onChange={(e) => setForm((p: any) => ({ ...p, usageLimit: Number(e.target.value) }))} />
              <input className="rounded-xl border px-3 py-2 text-sm" type="number" min={0} placeholder="Per User Limit" value={form.perUserLimit} onChange={(e) => setForm((p: any) => ({ ...p, perUserLimit: Number(e.target.value) }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input className="rounded-xl border px-3 py-2 text-sm" type="date" value={form.startsAt} onChange={(e) => setForm((p: any) => ({ ...p, startsAt: e.target.value }))} />
              <input className="rounded-xl border px-3 py-2 text-sm" type="date" value={form.expiresAt} onChange={(e) => setForm((p: any) => ({ ...p, expiresAt: e.target.value }))} />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p: any) => ({ ...p, isActive: e.target.checked }))} />
              Active
            </label>
          </div>
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              {editingId ? "Update" : "Create"}
            </button>
            {editingId ? (
              <button onClick={resetForm} className="rounded-xl border px-4 py-2 text-sm font-bold">
                Cancel
              </button>
            ) : null}
          </div>
        </div>

        <div className="space-y-4 rounded-[2rem] border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:col-span-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="w-full rounded-xl border py-2 pl-9 pr-3 text-sm" placeholder="Search coupon code..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          </div>
          {error ? <p className="text-sm font-semibold text-rose-500">{error}</p> : null}
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/40">
                <tr>
                  <th className="px-3 py-2 text-left">Code</th>
                  <th className="px-3 py-2 text-left">Rule</th>
                  <th className="px-3 py-2 text-left">Usage</th>
                  <th className="px-3 py-2 text-left">Window</th>
                  <th className="px-3 py-2 text-left">State</th>
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="px-3 py-8 text-center text-gray-500">Loading coupons...</td></tr>
                ) : rows.length === 0 ? (
                  <tr><td colSpan={6} className="px-3 py-8 text-center text-gray-500">No coupons found</td></tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row._id} className="border-t">
                      <td className="px-3 py-2 font-mono font-bold">{row.code}</td>
                      <td className="px-3 py-2">
                        {row.type === "percent" ? `${row.value}%` : `Tk ${row.value}`} | Min Tk {row.minOrderAmount}
                      </td>
                      <td className="px-3 py-2">{row.usedCount}/{row.usageLimit || "∞"}</td>
                      <td className="px-3 py-2 text-xs">
                        {row.startsAt ? new Date(row.startsAt).toLocaleDateString() : "Now"} - {row.expiresAt ? new Date(row.expiresAt).toLocaleDateString() : "No Expiry"}
                      </td>
                      <td className="px-3 py-2">
                        <span className={`rounded-full px-2 py-1 text-xs font-bold ${row.isActive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                          {row.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => startEdit(row)} className="rounded-lg border px-3 py-1 text-xs font-bold">Edit</button>
                          <button onClick={() => remove(row._id)} disabled={deleting === row._id} className="rounded-lg border border-rose-200 px-2 py-1 text-rose-600">
                            {deleting === row._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
