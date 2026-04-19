"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CreditCard,
  DollarSign,
  Loader2,
  RefreshCw,
  RotateCcw,
  TrendingUp,
  Wallet,
} from "lucide-react";
import API, { handleApiError, orderService } from "@/app/lib/apiClient";

type FinanceStats = {
  totalSales: number;
  totalCost: number;
  totalProfit: number;
  totalRefunded: number;
};

type PaymentOrder = {
  _id: string;
  orderNumber?: string;
  createdAt?: string;
  totalAmount?: number;
  paymentMethod?: string;
  paymentStatus?: string;
  status?: string;
  user?: {
    name?: string;
    email?: string;
  };
};

type PaginationState = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type PaymentTab = "all" | "completed" | "pending" | "refunded";

const PAGE_SIZES = [10, 50, 100] as const;

const defaultStats: FinanceStats = {
  totalSales: 0,
  totalCost: 0,
  totalProfit: 0,
  totalRefunded: 0,
};

const defaultPagination: PaginationState = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
};

const normalizePagination = (raw: unknown, fallbackPage: number, fallbackLimit: number) => {
  const data = (raw || {}) as Record<string, unknown>;
  const totalPages = Math.max(1, Number(data.totalPages || 1));
  const page = Math.min(Math.max(1, Number(data.page || fallbackPage)), totalPages);
  return {
    page,
    limit: Number(data.limit || fallbackLimit) || fallbackLimit,
    total: Number(data.total || 0) || 0,
    totalPages,
    hasNextPage: Boolean(data.hasNextPage),
    hasPrevPage: Boolean(data.hasPrevPage),
  };
};

const formatCurrency = (value: number) =>
  `Tk ${Math.round(Number(value || 0)).toLocaleString("en-US")}`;

const tabToStatus = (tab: PaymentTab) => {
  switch (tab) {
    case "completed":
      return "delivered";
    case "pending":
      return "pending";
    case "refunded":
      return "refunded";
    default:
      return undefined;
  }
};

export default function AdminPaymentsPage() {
  const [activeTab, setActiveTab] = useState<PaymentTab>("all");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);

  const [stats, setStats] = useState<FinanceStats>(defaultStats);
  const [orders, setOrders] = useState<PaymentOrder[]>([]);
  const [pagination, setPagination] = useState<PaginationState>(defaultPagination);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refundLoadingId, setRefundLoadingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const loadStats = useCallback(async () => {
    const response = await API.get("/admin/dashboard");
    const payload = (response.data?.stats || {}) as Record<string, unknown>;
    setStats({
      totalSales: Number(payload.totalSales || 0),
      totalCost: Number(payload.totalCost || 0),
      totalProfit: Number(payload.totalProfit || 0),
      totalRefunded: Number(payload.totalRefunded || payload.refunded || 0),
    });
  }, []);

  const loadOrders = useCallback(async () => {
    const response = await orderService.getAll({
      status: tabToStatus(activeTab),
      page,
      limit,
      search: search || undefined,
    });
    const rows = Array.isArray(response?.orders) ? response.orders : [];
    setOrders(rows);
    setPagination(normalizePagination(response?.pagination, page, limit));
  }, [activeTab, limit, page, search]);

  const loadAll = useCallback(
    async (silent = false) => {
      if (silent) setRefreshing(true);
      else setLoading(true);
      setError("");

      try {
        await Promise.all([loadStats(), loadOrders()]);
      } catch (loadError) {
        setError(handleApiError(loadError));
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loadOrders, loadStats]
  );

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleRefund = async (order: PaymentOrder) => {
    const isConfirmed = window.confirm(
      `Refund order ${order.orderNumber || order._id.slice(-8).toUpperCase()}?`
    );
    if (!isConfirmed) return;

    setError("");
    setRefundLoadingId(order._id);
    try {
      await orderService.updateStatus(order._id, {
        status: "refunded",
        paymentStatus: "refunded",
        notes: "Refunded by admin from Finance dashboard",
      });
      await loadAll(true);
    } catch (refundError) {
      setError(handleApiError(refundError));
    } finally {
      setRefundLoadingId("");
    }
  };

  const liveFeeEstimate = useMemo(() => Number(stats.totalSales || 0) * 0.029, [stats.totalSales]);

  const summaryCards = useMemo(
    () => [
      {
        label: "Total Revenue",
        value: formatCurrency(stats.totalSales),
        icon: DollarSign,
        accent: "text-indigo-600",
      },
      {
        label: "Net Profit",
        value: formatCurrency(stats.totalProfit),
        icon: TrendingUp,
        accent: "text-emerald-600",
      },
      {
        label: "Gateway Fees (2.9%)",
        value: formatCurrency(liveFeeEstimate),
        icon: CreditCard,
        accent: "text-amber-600",
      },
      {
        label: "Refunded",
        value: formatCurrency(stats.totalRefunded),
        icon: RotateCcw,
        accent: "text-rose-600",
      },
    ],
    [liveFeeEstimate, stats.totalProfit, stats.totalRefunded, stats.totalSales]
  );

  const startRow = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const endRow =
    pagination.total === 0 ? 0 : Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Financial Operations</h1>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Real-time transaction ledger
          </p>
        </div>
        <button
          onClick={() => loadAll(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          disabled={refreshing}
        >
          {refreshing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          Refresh
        </button>
      </div>

      {error ? (
        <div className="flex items-center gap-2 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
          <AlertCircle size={16} />
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {card.label}
                </p>
                <Icon size={18} className={card.accent} />
              </div>
              <p className="text-2xl font-black">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {(["all", "completed", "pending", "refunded"] as PaymentTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setPage(1);
                }}
                className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="h-10 min-w-[240px] rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950"
            placeholder="Search order, customer, email..."
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950/60">
              <tr>
                <th className="px-3 py-2 text-left">Order</th>
                <th className="px-3 py-2 text-left">Customer</th>
                <th className="px-3 py-2 text-left">Method</th>
                <th className="px-3 py-2 text-right">Amount</th>
                <th className="px-3 py-2 text-right">Gateway Fee</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">
                    Loading transactions...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const amount = Number(order.totalAmount || 0);
                  const fee = amount * 0.029;
                  const canRefund =
                    String(order.status || "").toLowerCase() === "delivered" &&
                    String(order.paymentStatus || "").toLowerCase() === "paid";

                  return (
                    <tr key={order._id} className="border-t border-slate-200 dark:border-slate-800">
                      <td className="px-3 py-3">
                        <p className="font-semibold">
                          {order.orderNumber || `#${order._id.slice(-8).toUpperCase()}`}
                        </p>
                        <p className="text-xs text-slate-500">
                          {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
                        </p>
                      </td>
                      <td className="px-3 py-3">
                        <p className="font-medium">{order.user?.name || "Guest"}</p>
                        <p className="text-xs text-slate-500">{order.user?.email || "N/A"}</p>
                      </td>
                      <td className="px-3 py-3 uppercase text-xs">
                        {order.paymentMethod || "unknown"} / {order.paymentStatus || "pending"}
                      </td>
                      <td className="px-3 py-3 text-right font-semibold">{formatCurrency(amount)}</td>
                      <td className="px-3 py-3 text-right text-slate-500">{formatCurrency(fee)}</td>
                      <td className="px-3 py-3 uppercase text-xs">{order.status || "pending"}</td>
                      <td className="px-3 py-3 text-right">
                        {canRefund ? (
                          <button
                            onClick={() => handleRefund(order)}
                            disabled={refundLoadingId === order._id}
                            className="inline-flex items-center gap-2 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-100 disabled:opacity-70 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
                          >
                            {refundLoadingId === order._id ? (
                              <Loader2 size={13} className="animate-spin" />
                            ) : (
                              <Wallet size={13} />
                            )}
                            Refund
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400">N/A</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
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
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={loading || !pagination.hasPrevPage}
              className="rounded-lg border px-3 py-2 text-xs font-semibold disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-xs text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(pagination.totalPages, prev + 1))}
              disabled={loading || !pagination.hasNextPage}
              className="rounded-lg border px-3 py-2 text-xs font-semibold disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
