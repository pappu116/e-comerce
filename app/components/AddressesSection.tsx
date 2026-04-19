"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Edit3, MapPin, Plus, Trash2, X } from "lucide-react";
import { useAuth } from "@/app/store/authStore";

type AddressType = "Home" | "Office" | "Other";

type AddressItem = {
  id: string;
  type: AddressType;
  label: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  area: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

const createAddress = (): AddressItem => ({
  id:
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  type: "Home",
  label: "",
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  area: "",
  postalCode: "",
  country: "Bangladesh",
  isDefault: false,
});

const normalizeDefault = (items: AddressItem[]) => {
  if (!items.length) return [];
  const defaultIndex = items.findIndex((item) => item.isDefault);
  const resolvedDefault = defaultIndex >= 0 ? defaultIndex : 0;
  return items.map((item, index) => ({ ...item, isDefault: index === resolvedDefault }));
};

export default function AddressesSection() {
  const user = useAuth((state) => state.user);
  const updateProfile = useAuth((state) => state.updateProfile);
  const loading = useAuth((state) => state.loading);

  const [addresses, setAddresses] = useState<AddressItem[]>([]);
  const [editing, setEditing] = useState<AddressItem | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fromUser = Array.isArray(user?.addresses) ? user.addresses : [];
    setAddresses(
      normalizeDefault(
        fromUser.map((address) => ({
          id: String(address.id || createAddress().id),
          type: (address.type || "Home") as AddressType,
          label: address.label || "",
          fullName: address.fullName || user?.name || "",
          phone: address.phone || user?.phone || "",
          addressLine: address.addressLine || "",
          city: address.city || "",
          area: address.area || "",
          postalCode: address.postalCode || "",
          country: address.country || "Bangladesh",
          isDefault: Boolean(address.isDefault),
        }))
      )
    );
  }, [user?.addresses, user?.name, user?.phone]);

  const isEditing = Boolean(editing);
  const canSave = useMemo(() => {
    if (!editing) return false;
    return Boolean(
      editing.label.trim() &&
        editing.fullName.trim() &&
        editing.phone.trim() &&
        editing.addressLine.trim() &&
        editing.city.trim()
    );
  }, [editing]);

  const persistAddresses = async (nextAddresses: AddressItem[]) => {
    setSaving(true);
    setError("");
    setSuccess("");
    const result = await updateProfile({ addresses: normalizeDefault(nextAddresses) });
    setSaving(false);

    if (!result.success) {
      setError(result.message || "Failed to update addresses");
      return false;
    }

    setSuccess(result.message || "Addresses updated");
    return true;
  };

  const handleSaveAddress = async () => {
    if (!editing || !canSave) {
      setError("Please fill all required address fields.");
      return;
    }

    const exists = addresses.some((item) => item.id === editing.id);
    const next = exists
      ? addresses.map((item) => (item.id === editing.id ? editing : item))
      : [...addresses, editing];
    const normalized = normalizeDefault(next);

    const ok = await persistAddresses(normalized);
    if (!ok) return;
    setAddresses(normalized);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    const next = normalizeDefault(addresses.filter((item) => item.id !== id));
    const ok = await persistAddresses(next);
    if (!ok) return;
    setAddresses(next);
  };

  const handleSetDefault = async (id: string) => {
    const next = normalizeDefault(
      addresses.map((item) => ({ ...item, isDefault: item.id === id }))
    );
    const ok = await persistAddresses(next);
    if (!ok) return;
    setAddresses(next);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-black uppercase tracking-tight text-white">
            Saved Addresses
          </h3>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Fully synced with your account
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setError("");
            setSuccess("");
            setEditing(createAddress());
          }}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-indigo-500/20"
        >
          <Plus size={14} />
          Add Address
        </button>
      </div>

      {error ? <p className="text-sm font-bold text-rose-400">{error}</p> : null}
      {success ? <p className="text-sm font-bold text-emerald-400">{success}</p> : null}

      {!addresses.length ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <MapPin className="mx-auto mb-3 text-slate-600" size={24} />
          <p className="text-sm font-bold text-slate-300">No saved address found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                    {address.type}
                  </span>
                  {address.isDefault ? (
                    <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                      Default
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  {!address.isDefault ? (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(address.id)}
                      disabled={saving || loading}
                      className="rounded-xl border border-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-300"
                    >
                      Set Default
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setEditing(address)}
                    className="rounded-xl border border-white/10 p-2 text-slate-300"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(address.id)}
                    disabled={saving || loading}
                    className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-2 text-rose-300"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="text-lg font-black text-white">{address.label}</p>
              <p className="mt-1 text-sm font-bold text-slate-300">{address.fullName}</p>
              <p className="text-sm text-slate-400">{address.phone}</p>
              <p className="mt-3 text-sm text-slate-300">
                {address.addressLine}, {address.area ? `${address.area}, ` : ""}
                {address.city} {address.postalCode}
              </p>
              <p className="text-xs uppercase tracking-widest text-slate-500">{address.country}</p>
            </div>
          ))}
        </div>
      )}

      {isEditing && editing ? (
        <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="w-full max-w-2xl rounded-t-3xl border border-white/10 bg-[#0f172a] p-6 sm:rounded-3xl sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h4 className="text-xl font-black uppercase tracking-tight text-white">
                {addresses.some((item) => item.id === editing.id) ? "Edit Address" : "New Address"}
              </h4>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-xl border border-white/10 p-2 text-slate-300"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <select
                value={editing.type}
                onChange={(event) =>
                  setEditing((prev) =>
                    prev ? { ...prev, type: event.target.value as AddressType } : prev
                  )
                }
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>
              <input
                value={editing.label}
                onChange={(event) =>
                  setEditing((prev) => (prev ? { ...prev, label: event.target.value } : prev))
                }
                placeholder="Address label"
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
              />
              <input
                value={editing.fullName}
                onChange={(event) =>
                  setEditing((prev) => (prev ? { ...prev, fullName: event.target.value } : prev))
                }
                placeholder="Receiver full name"
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
              />
              <input
                value={editing.phone}
                onChange={(event) =>
                  setEditing((prev) => (prev ? { ...prev, phone: event.target.value } : prev))
                }
                placeholder="Phone number"
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
              />
              <input
                value={editing.city}
                onChange={(event) =>
                  setEditing((prev) => (prev ? { ...prev, city: event.target.value } : prev))
                }
                placeholder="City"
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
              />
              <input
                value={editing.area}
                onChange={(event) =>
                  setEditing((prev) => (prev ? { ...prev, area: event.target.value } : prev))
                }
                placeholder="Area"
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
              />
              <input
                value={editing.postalCode}
                onChange={(event) =>
                  setEditing((prev) =>
                    prev ? { ...prev, postalCode: event.target.value } : prev
                  )
                }
                placeholder="Postal code"
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
              />
              <input
                value={editing.country}
                onChange={(event) =>
                  setEditing((prev) => (prev ? { ...prev, country: event.target.value } : prev))
                }
                placeholder="Country"
                className="h-12 rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
              />
              <textarea
                value={editing.addressLine}
                onChange={(event) =>
                  setEditing((prev) =>
                    prev ? { ...prev, addressLine: event.target.value } : prev
                  )
                }
                placeholder="Full address line"
                rows={3}
                className="sm:col-span-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none"
              />
              <label className="sm:col-span-2 flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={editing.isDefault}
                  onChange={(event) =>
                    setEditing((prev) =>
                      prev ? { ...prev, isDefault: event.target.checked } : prev
                    )
                  }
                  className="h-4 w-4 accent-indigo-600"
                />
                Set as default address
              </label>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAddress}
                disabled={!canSave || saving || loading}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-black uppercase tracking-widest text-white disabled:opacity-60"
              >
                <CheckCircle2 size={14} />
                {saving ? "Saving..." : "Save Address"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
