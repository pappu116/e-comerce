"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Search, Trash2 } from "lucide-react";
import { handleApiError, orderService } from "@/app/lib/apiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type OrderItem = {
  _id: string;
  orderNumber?: string;
  user?: { name?: string; email?: string };
  status?: string;
  paymentStatus?: string;
  totalAmount?: number;
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

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;
const PAGE_SIZES = [10, 50, 100] as const;

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

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
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
  const [updatingId, setUpdatingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await orderService.getAll({
        status: statusFilter === "all" ? undefined : statusFilter,
        page,
        limit,
        search: search || undefined,
      });
      const rows = Array.isArray(data?.orders) ? data.orders : [];
      setOrders(rows);
      setPagination(normalizePagination(data?.pagination, page, limit));
    } catch (err) {
      setError(handleApiError(err));
      setOrders([]);
      setPagination(normalizePagination(null, page, limit));
    } finally {
      setLoading(false);
    }
  }, [limit, page, search, statusFilter]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const updateStatus = async (id: string, nextStatus: string) => {
    setUpdatingId(id);
    setError("");
    try {
      await orderService.updateStatus(id, { status: nextStatus });
      await loadOrders();
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setUpdatingId("");
    }
  };

  const deleteOrder = async (id: string) => {
    if (!window.confirm("Delete this order?")) return;
    setError("");
    try {
      await orderService.delete(id);
      if (orders.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await loadOrders();
      }
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  const stats = useMemo(
    () => ({
      total: pagination.total,
      pending: orders.filter((order) => order.status === "pending").length,
      shipped: orders.filter((order) => order.status === "shipped").length,
      revenue: orders
        .filter((order) => order.status === "delivered")
        .reduce((sum, order) => sum + Number(order.totalAmount || 0), 0),
    }),
    [orders, pagination.total]
  );

  const startRow = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const endRow = pagination.total === 0 ? 0 : Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Order Management</h1>
          <p className="text-xs text-muted-foreground">Dynamic order flow and status control</p>
        </div>
        <Button variant="outline" onClick={loadOrders} disabled={loading}>
          {loading ? <Loader2 size={14} className="animate-spin" /> : "Refresh"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-black">{stats.total}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pending (Page)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-black text-amber-600">{stats.pending}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Shipped (Page)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-black text-indigo-600">{stats.shipped}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Delivered Revenue (Page)</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-black text-emerald-600">
            Tk {Math.round(stats.revenue).toLocaleString()}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[260px] flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search by order id, customer or email"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(1);
              }}
              className="h-8 rounded-lg border border-input bg-background px-2 text-sm"
            >
              <option value="all">all</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {error ? <p className="text-sm font-medium text-rose-500">{error}</p> : null}

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[980px] text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-3 py-2 text-left">Order</th>
                  <th className="px-3 py-2 text-left">Customer</th>
                  <th className="px-3 py-2 text-left">Amount</th>
                  <th className="px-3 py-2 text-left">Payment</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-3 py-8 text-center text-muted-foreground" colSpan={6}>
                      Loading orders...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td className="px-3 py-8 text-center text-muted-foreground" colSpan={6}>
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id} className="border-t">
                      <td className="px-3 py-3">
                        <p className="font-semibold">
                          #{String(order.orderNumber || order._id).slice(-8).toUpperCase()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
                        </p>
                      </td>
                      <td className="px-3 py-3">
                        <p className="font-medium">{order.user?.name || "Guest"}</p>
                        <p className="text-xs text-muted-foreground">{order.user?.email || "N/A"}</p>
                      </td>
                      <td className="px-3 py-3 font-semibold">
                        Tk {Math.round(Number(order.totalAmount || 0)).toLocaleString()}
                      </td>
                      <td className="px-3 py-3 uppercase text-xs">{order.paymentStatus || "pending"}</td>
                      <td className="px-3 py-3">
                        <select
                          value={order.status || "pending"}
                          onChange={(event) => updateStatus(order._id, event.target.value)}
                          disabled={updatingId === order._id}
                          className="h-8 rounded-md border border-input bg-background px-2 text-xs uppercase"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.push(`/admin/orders/track/${order._id}`)}
                          >
                            Track
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteOrder(order._id)}>
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
    </div>
  );
}
