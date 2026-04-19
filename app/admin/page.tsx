"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  BarChart3,
  DollarSign,
  Package,
  RefreshCw,
  ShoppingCart,
  Users,
} from "lucide-react";
import API, { handleApiError } from "@/app/lib/apiClient";
import { useAuth } from "@/app/store/authStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AdminStats = {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type DashboardOrder = {
  _id: string;
  orderNumber?: string;
  user?: { name?: string; email?: string };
  status?: string;
  totalAmount?: number;
  createdAt?: string;
};

type DashboardUser = {
  _id: string;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  createdAt?: string;
};

const EMPTY_STATS: AdminStats = {
  totalUsers: 0,
  totalProducts: 0,
  totalOrders: 0,
  totalRevenue: 0,
};

const PAGE_SIZES = [10, 50, 100];

const toNumber = (value: unknown) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const defaultPagination = (limit: number): Pagination => ({
  page: 1,
  limit,
  total: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
});

const formatCount = (value: number) => new Intl.NumberFormat("en-US").format(value);
const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default function AdminDashboardPage() {
  const router = useRouter();
  const user = useAuth((state) => state.user);
  const [stats, setStats] = useState<AdminStats>(EMPTY_STATS);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState("");

  const [orders, setOrders] = useState<DashboardOrder[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersLimit, setOrdersLimit] = useState(10);
  const [ordersPagination, setOrdersPagination] = useState<Pagination>(defaultPagination(10));

  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState("");
  const [usersPage, setUsersPage] = useState(1);
  const [usersLimit, setUsersLimit] = useState(10);
  const [usersPagination, setUsersPagination] = useState<Pagination>(defaultPagination(10));

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    setStatsError("");
    try {
      const { data } = await API.get("/admin/stats");
      const payload = data?.stats || data || {};
      setStats({
        totalUsers: toNumber(payload.totalUsers),
        totalProducts: toNumber(payload.totalProducts),
        totalOrders: toNumber(payload.totalOrders),
        totalRevenue: toNumber(payload.totalRevenue),
      });
    } catch (error) {
      setStatsError(handleApiError(error));
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchOrders = useCallback(async (page: number, limit: number) => {
    setOrdersLoading(true);
    setOrdersError("");
    try {
      const { data } = await API.get("/admin/orders", { params: { page, limit } });
      setOrders(Array.isArray(data?.orders) ? data.orders : []);
      const pg = data?.pagination || {};
      setOrdersPagination({
        page: toNumber(pg.page) || page,
        limit: toNumber(pg.limit) || limit,
        total: toNumber(pg.total),
        totalPages: Math.max(1, toNumber(pg.totalPages) || 1),
        hasNextPage: Boolean(pg.hasNextPage),
        hasPrevPage: Boolean(pg.hasPrevPage),
      });
    } catch (error) {
      setOrdersError(handleApiError(error));
      setOrders([]);
      setOrdersPagination(defaultPagination(limit));
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async (page: number, limit: number) => {
    setUsersLoading(true);
    setUsersError("");
    try {
      const { data } = await API.get("/admin/users", { params: { page, limit } });
      setUsers(Array.isArray(data?.users) ? data.users : []);
      const pg = data?.pagination || {};
      setUsersPagination({
        page: toNumber(pg.page) || page,
        limit: toNumber(pg.limit) || limit,
        total: toNumber(pg.total),
        totalPages: Math.max(1, toNumber(pg.totalPages) || 1),
        hasNextPage: Boolean(pg.hasNextPage),
        hasPrevPage: Boolean(pg.hasPrevPage),
      });
    } catch (error) {
      setUsersError(handleApiError(error));
      setUsers([]);
      setUsersPagination(defaultPagination(limit));
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    void fetchOrders(ordersPage, ordersLimit);
  }, [ordersPage, ordersLimit, fetchOrders]);

  useEffect(() => {
    void fetchUsers(usersPage, usersLimit);
  }, [usersPage, usersLimit, fetchUsers]);

  const refreshAll = async () => {
    await Promise.all([
      fetchStats(),
      fetchOrders(ordersPage, ordersLimit),
      fetchUsers(usersPage, usersLimit),
    ]);
  };

  const cards = useMemo(
    () => [
      {
        title: "Total Revenue",
        value: formatMoney(stats.totalRevenue),
        subtitle: "Delivered orders",
        icon: DollarSign,
        accent: "from-emerald-500/20 to-cyan-500/10",
      },
      {
        title: "Total Orders",
        value: formatCount(stats.totalOrders),
        subtitle: "All order records",
        icon: ShoppingCart,
        accent: "from-indigo-500/20 to-violet-500/10",
      },
      {
        title: "Total Users",
        value: formatCount(stats.totalUsers),
        subtitle: "Registered members",
        icon: Users,
        accent: "from-blue-500/20 to-sky-500/10",
      },
      {
        title: "Total Products",
        value: formatCount(stats.totalProducts),
        subtitle: "Catalog inventory",
        icon: Package,
        accent: "from-amber-500/20 to-orange-500/10",
      },
    ],
    [stats]
  );

  if (statsLoading && !statsError) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-72 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-52 animate-pulse rounded-md bg-muted" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Card key={idx} className="border-border/60">
              <CardHeader>
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-8 w-28 animate-pulse rounded bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, {user?.name || "Admin"}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="gap-2"
            onClick={() => router.push("/admin/analyzing")}
          >
            <BarChart3 className="size-4" />
            Open Analyzing
          </Button>
          <Button variant="outline" className="gap-2" onClick={refreshAll}>
            <RefreshCw className="size-4" />
            Refresh
          </Button>
        </div>
      </div>

      {statsError ? (
        <Card className="border-destructive/30">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
            <p className="flex items-center gap-2 text-sm font-medium text-destructive">
              <AlertCircle className="size-4" />
              {statsError}
            </p>
            <Button size="sm" variant="outline" className="gap-2" onClick={fetchStats}>
              <RefreshCw className="size-4" />
              Retry stats
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className={`overflow-hidden border-border/60 bg-gradient-to-br ${card.accent}`}
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-sm text-muted-foreground">{card.title}</CardTitle>
                  <CardDescription className="pt-1 text-2xl font-black text-foreground">
                    {card.value}
                  </CardDescription>
                </div>
                <span className="rounded-xl border bg-background/60 p-2">
                  <Icon className="size-4 text-foreground/80" />
                </span>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">{card.subtitle}</CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <PaginatedOrdersCard
          orders={orders}
          loading={ordersLoading}
          error={ordersError}
          page={ordersPage}
          limit={ordersLimit}
          pagination={ordersPagination}
          onPrev={() => setOrdersPage((prev) => Math.max(1, prev - 1))}
          onNext={() => setOrdersPage((prev) => prev + 1)}
          onLimitChange={(value) => {
            setOrdersLimit(value);
            setOrdersPage(1);
          }}
        />

        <PaginatedUsersCard
          users={users}
          loading={usersLoading}
          error={usersError}
          page={usersPage}
          limit={usersLimit}
          pagination={usersPagination}
          onPrev={() => setUsersPage((prev) => Math.max(1, prev - 1))}
          onNext={() => setUsersPage((prev) => prev + 1)}
          onLimitChange={(value) => {
            setUsersLimit(value);
            setUsersPage(1);
          }}
        />
      </div>
    </div>
  );
}

function PaginationBar({
  page,
  limit,
  pagination,
  disabled,
  onPrev,
  onNext,
  onLimitChange,
}: {
  page: number;
  limit: number;
  pagination: Pagination;
  disabled: boolean;
  onPrev: () => void;
  onNext: () => void;
  onLimitChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Rows:</span>
        <select
          value={limit}
          onChange={(event) => onLimitChange(Number(event.target.value))}
          className="h-8 rounded-md border bg-background px-2 text-xs"
          disabled={disabled}
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>
          Page {page} of {pagination.totalPages}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onPrev}
          disabled={disabled || !pagination.hasPrevPage}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onNext}
          disabled={disabled || !pagination.hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function PaginatedOrdersCard({
  orders,
  loading,
  error,
  page,
  limit,
  pagination,
  onPrev,
  onNext,
  onLimitChange,
}: {
  orders: DashboardOrder[];
  loading: boolean;
  error: string;
  page: number;
  limit: number;
  pagination: Pagination;
  onPrev: () => void;
  onNext: () => void;
  onLimitChange: (value: number) => void;
}) {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Paginated live data from `/api/admin/orders`</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <p className="text-sm font-semibold text-rose-500">{error}</p> : null}
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-3 py-2 text-left">Order</th>
                <th className="px-3 py-2 text-left">Customer</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-muted-foreground">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-muted-foreground">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="px-3 py-3">
                      <p className="font-semibold">
                        {order.orderNumber || `#${String(order._id).slice(-8).toUpperCase()}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                      </p>
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-medium">{order.user?.name || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground">{order.user?.email || "N/A"}</p>
                    </td>
                    <td className="px-3 py-3 uppercase text-xs">{order.status || "pending"}</td>
                    <td className="px-3 py-3 text-right font-semibold">
                      {formatMoney(toNumber(order.totalAmount))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <PaginationBar
          page={page}
          limit={limit}
          pagination={pagination}
          disabled={loading}
          onPrev={onPrev}
          onNext={onNext}
          onLimitChange={onLimitChange}
        />
      </CardContent>
    </Card>
  );
}

function PaginatedUsersCard({
  users,
  loading,
  error,
  page,
  limit,
  pagination,
  onPrev,
  onNext,
  onLimitChange,
}: {
  users: DashboardUser[];
  loading: boolean;
  error: string;
  page: number;
  limit: number;
  pagination: Pagination;
  onPrev: () => void;
  onNext: () => void;
  onLimitChange: (value: number) => void;
}) {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
        <CardDescription>Paginated live data from `/api/admin/users`</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error ? <p className="text-sm font-semibold text-rose-500">{error}</p> : null}
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Role</th>
                <th className="px-3 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-muted-foreground">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-muted-foreground">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((member) => (
                  <tr key={member._id} className="border-t">
                    <td className="px-3 py-3">
                      <p className="font-semibold">{member.name || "N/A"}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : "N/A"}
                      </p>
                    </td>
                    <td className="px-3 py-3">{member.email || "N/A"}</td>
                    <td className="px-3 py-3 uppercase text-xs">{member.role || "user"}</td>
                    <td className="px-3 py-3 uppercase text-xs">{member.status || "active"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <PaginationBar
          page={page}
          limit={limit}
          pagination={pagination}
          disabled={loading}
          onPrev={onPrev}
          onNext={onNext}
          onLimitChange={onLimitChange}
        />
      </CardContent>
    </Card>
  );
}
