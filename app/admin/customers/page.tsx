"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, ShieldCheck, ShieldX, Trash2, UserRoundPen } from "lucide-react";
import { adminService, handleApiError } from "@/app/lib/apiClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Customer = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role?: "admin" | "user" | "customer";
  status?: "active" | "suspended";
  createdAt?: string;
};

type PaginationState = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type EditUserForm = {
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user" | "customer";
};

const PAGE_SIZES = [10, 50, 100] as const;
const emptyForm: EditUserForm = { name: "", email: "", phone: "", role: "customer" };

const normalizePagination = (
  raw: any,
  fallbackPage: number,
  fallbackLimit: number
): PaginationState => ({
  page: Number(raw?.page || fallbackPage) || fallbackPage,
  limit: Number(raw?.limit || fallbackLimit) || fallbackLimit,
  total: Number(raw?.total || 0) || 0,
  totalPages: Math.max(1, Number(raw?.totalPages || 1) || 1),
  hasNextPage: Boolean(raw?.hasNextPage),
  hasPrevPage: Boolean(raw?.hasPrevPage),
});

export default function AdminCustomersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<Customer[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended">("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string>("");
  const [form, setForm] = useState<EditUserForm>(emptyForm);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await adminService.getAllUsers({
        page,
        limit,
        search: search || undefined,
        status: statusFilter === "all" ? undefined : statusFilter,
      });
      setUsers(Array.isArray(data?.users) ? data.users : []);
      setPagination(normalizePagination(data?.pagination, page, limit));
    } catch (err) {
      setError(handleApiError(err));
      setUsers([]);
      setPagination(normalizePagination(null, page, limit));
    } finally {
      setLoading(false);
    }
  }, [limit, page, search, statusFilter]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const startEdit = (user: Customer) => {
    setEditingId(user._id);
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: (user.role || "customer") as "admin" | "user" | "customer",
    });
    setError("");
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    setError("");
    try {
      await adminService.updateUser(editingId, form);
      setEditingId("");
      setForm(emptyForm);
      await loadUsers();
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id: string, status: "active" | "suspended") => {
    setError("");
    try {
      await adminService.updateUserStatus(id, status);
      await loadUsers();
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  const deleteUser = async (id: string) => {
    if (!window.confirm("Delete this user?")) return;
    setError("");
    try {
      await adminService.deleteUser(id);
      if (users.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await loadUsers();
      }
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  const impersonate = async (id: string) => {
    setError("");
    try {
      const data = await adminService.impersonate(id);
      if (data?.token) {
        localStorage.setItem("token", data.token);
        router.push("/profile");
      }
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  const stats = useMemo(
    () => ({
      total: pagination.total,
      active: users.filter((user) => (user.status || "active") === "active").length,
      suspended: users.filter((user) => user.status === "suspended").length,
    }),
    [pagination.total, users]
  );

  const startRow = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const endRow = pagination.total === 0 ? 0 : Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Customer Management</h1>
          <p className="text-xs text-muted-foreground">Live admin users endpoint data</p>
        </div>
        <Button variant="outline" onClick={loadUsers} disabled={loading}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : "Refresh"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-black">{stats.total}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active (Page)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-black text-emerald-600">{stats.active}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Suspended (Page)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-black text-rose-600">{stats.suspended}</CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[260px] flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search name, email or id"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value as "all" | "active" | "suspended");
                setPage(1);
              }}
              className="h-8 rounded-lg border border-input bg-background px-2 text-sm"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {error ? <p className="text-sm font-medium text-rose-500">{error}</p> : null}

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[860px] text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-3 py-2 text-left">User</th>
                  <th className="px-3 py-2 text-left">Role</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Joined</th>
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-3 py-8 text-center text-muted-foreground" colSpan={5}>
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td className="px-3 py-8 text-center text-muted-foreground" colSpan={5}>
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="border-t">
                      <td className="px-3 py-3">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </td>
                      <td className="px-3 py-3 uppercase text-xs">{user.role || "customer"}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                            (user.status || "active") === "active"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : "bg-rose-500/10 text-rose-600"
                          }`}
                        >
                          {user.status || "active"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-xs text-muted-foreground">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => startEdit(user)}>
                            <UserRoundPen size={14} />
                            Edit
                          </Button>
                          {(user.status || "active") === "active" ? (
                            <Button size="sm" variant="outline" onClick={() => updateStatus(user._id, "suspended")}>
                              <ShieldX size={14} />
                              Suspend
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => updateStatus(user._id, "active")}>
                              <ShieldCheck size={14} />
                              Activate
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => impersonate(user._id)}>
                            View As
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteUser(user._id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Rows:</span>
              <select
                value={limit}
                onChange={(event) => {
                  setLimit(Number(event.target.value));
                  setPage(1);
                }}
                className="h-8 rounded-md border bg-background px-2 text-xs"
                disabled={loading}
              >
                {PAGE_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span>
                Showing {startRow}-{endRow} of {pagination.total}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={loading || !pagination.hasPrevPage}
              >
                Previous
              </Button>
              <span className="text-xs text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((prev) => Math.min(pagination.totalPages, prev + 1))}
                disabled={loading || !pagination.hasNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {editingId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <CardTitle>Edit User</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Name" />
              <Input value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email" />
              <Input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Phone" />
              <select
                value={form.role}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, role: event.target.value as "admin" | "user" | "customer" }))
                }
                className="h-8 w-full rounded-lg border border-input bg-background px-2 text-sm"
              >
                <option value="customer">customer</option>
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingId("")}>Cancel</Button>
                <Button onClick={saveEdit} disabled={saving}>
                  {saving ? <Loader2 size={14} className="animate-spin" /> : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
