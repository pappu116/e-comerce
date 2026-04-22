"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  CreditCard,
  Loader2,
  RefreshCw,
  Save,
  Settings2,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import { handleApiError } from "@/app/lib/apiClient";
import { adminSettingsService } from "@/app/lib/adminSettingsService";

type TabKey = "general" | "security" | "payments" | "notifications" | "system-log";
type PaymentMethod = "sslcommerz" | "cod" | "bkash" | "nagad";

type GeneralSettings = {
  storeName: string;
  supportEmail: string;
  supportPhone: string;
  timezone: string;
  defaultCurrency: string;
  defaultLanguage: string;
  logoUrl: string;
  storeAddress: string;
  maintenanceMode: boolean;
};

type SecuritySettings = {
  twoFactorForAdmins: boolean;
  enforceStrongPasswords: boolean;
  passwordRotationDays: number;
  maxLoginAttempts: number;
  sessionTimeoutMinutes: number;
  ipWhitelistOnly: boolean;
  allowedAdminIps: string[];
};

type PaymentsSettings = {
  sslcommerzEnabled: boolean;
  sslcommerzMode: "sandbox" | "live";
  storeId: string;
  storePasswordConfigured: boolean;
  gatewayCredentialsConfigured: boolean;
  codEnabled: boolean;
  allowedMethods: PaymentMethod[];
  autoCapture: boolean;
  refundWindowDays: number;
  taxPercent: number;
  shippingChargeFlat: number;
};

type NotificationSettings = {
  adminEmailAlerts: boolean;
  adminSmsAlerts: boolean;
  orderPlaced: boolean;
  orderPaid: boolean;
  orderFailed: boolean;
  dailySummary: boolean;
  weeklySummary: boolean;
  lowStockThreshold: number;
};

type SystemLogEntry = {
  _id: string;
  section: string;
  action: string;
  details: string;
  actorName: string;
  createdAt: string;
};

type PaginationState = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

const PAGE_SIZES = [10, 50, 100] as const;
const inputClass =
  "h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 dark:border-slate-700 dark:bg-slate-950";
const ghostButtonClass =
  "inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold transition-colors hover:bg-slate-100 disabled:opacity-70 dark:border-slate-700 dark:hover:bg-slate-800";
const pagerButtonClass =
  "rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold transition-colors hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800";

const readString = (value: unknown, fallback = "") =>
  typeof value === "string" ? value : fallback;
const readBool = (value: unknown, fallback = false) =>
  typeof value === "boolean" ? value : fallback;
const readNumber = (value: unknown, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};
const readArray = (value: unknown) =>
  Array.isArray(value) ? value.map((entry) => String(entry || "").trim()).filter(Boolean) : [];

const defaultGeneral: GeneralSettings = {
  storeName: "Premium Store",
  supportEmail: "support@example.com",
  supportPhone: "",
  timezone: "Asia/Dhaka",
  defaultCurrency: "BDT",
  defaultLanguage: "en",
  logoUrl: "",
  storeAddress: "",
  maintenanceMode: false,
};

const defaultSecurity: SecuritySettings = {
  twoFactorForAdmins: true,
  enforceStrongPasswords: true,
  passwordRotationDays: 90,
  maxLoginAttempts: 5,
  sessionTimeoutMinutes: 120,
  ipWhitelistOnly: false,
  allowedAdminIps: [],
};

const defaultPayments: PaymentsSettings = {
  sslcommerzEnabled: true,
  sslcommerzMode: "sandbox",
  storeId: "",
  storePasswordConfigured: false,
  gatewayCredentialsConfigured: false,
  codEnabled: true,
  allowedMethods: ["sslcommerz", "cod"],
  autoCapture: true,
  refundWindowDays: 7,
  taxPercent: 0,
  shippingChargeFlat: 0,
};

const defaultNotifications: NotificationSettings = {
  adminEmailAlerts: true,
  adminSmsAlerts: false,
  orderPlaced: true,
  orderPaid: true,
  orderFailed: true,
  dailySummary: true,
  weeklySummary: true,
  lowStockThreshold: 5,
};

const defaultPagination: PaginationState = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
};

const normalizeGeneral = (input: unknown): GeneralSettings => {
  const row = (input || {}) as Record<string, unknown>;
  return {
    storeName: readString(row.storeName, defaultGeneral.storeName),
    supportEmail: readString(row.supportEmail, defaultGeneral.supportEmail),
    supportPhone: readString(row.supportPhone),
    timezone: readString(row.timezone, defaultGeneral.timezone),
    defaultCurrency: readString(row.defaultCurrency, defaultGeneral.defaultCurrency).toUpperCase(),
    defaultLanguage: readString(row.defaultLanguage, defaultGeneral.defaultLanguage).toLowerCase(),
    logoUrl: readString(row.logoUrl),
    storeAddress: readString(row.storeAddress),
    maintenanceMode: readBool(row.maintenanceMode, defaultGeneral.maintenanceMode),
  };
};

const normalizeSecurity = (input: unknown): SecuritySettings => {
  const row = (input || {}) as Record<string, unknown>;
  return {
    twoFactorForAdmins: readBool(row.twoFactorForAdmins, defaultSecurity.twoFactorForAdmins),
    enforceStrongPasswords: readBool(
      row.enforceStrongPasswords,
      defaultSecurity.enforceStrongPasswords
    ),
    passwordRotationDays: readNumber(row.passwordRotationDays, defaultSecurity.passwordRotationDays),
    maxLoginAttempts: readNumber(row.maxLoginAttempts, defaultSecurity.maxLoginAttempts),
    sessionTimeoutMinutes: readNumber(
      row.sessionTimeoutMinutes,
      defaultSecurity.sessionTimeoutMinutes
    ),
    ipWhitelistOnly: readBool(row.ipWhitelistOnly, defaultSecurity.ipWhitelistOnly),
    allowedAdminIps: readArray(row.allowedAdminIps),
  };
};

const normalizePayments = (input: unknown): PaymentsSettings => {
  const row = (input || {}) as Record<string, unknown>;
  const methods = readArray(row.allowedMethods).filter((method): method is PaymentMethod =>
    ["sslcommerz", "cod", "bkash", "nagad"].includes(method)
  );
  return {
    sslcommerzEnabled: readBool(row.sslcommerzEnabled, defaultPayments.sslcommerzEnabled),
    sslcommerzMode: readString(row.sslcommerzMode, "sandbox") === "live" ? "live" : "sandbox",
    storeId: readString(row.storeId),
    storePasswordConfigured: readBool(
      row.storePasswordConfigured,
      defaultPayments.storePasswordConfigured
    ),
    gatewayCredentialsConfigured: readBool(
      row.gatewayCredentialsConfigured,
      defaultPayments.gatewayCredentialsConfigured
    ),
    codEnabled: readBool(row.codEnabled, defaultPayments.codEnabled),
    allowedMethods: methods.length ? methods : defaultPayments.allowedMethods,
    autoCapture: readBool(row.autoCapture, defaultPayments.autoCapture),
    refundWindowDays: readNumber(row.refundWindowDays, defaultPayments.refundWindowDays),
    taxPercent: readNumber(row.taxPercent, defaultPayments.taxPercent),
    shippingChargeFlat: readNumber(row.shippingChargeFlat, defaultPayments.shippingChargeFlat),
  };
};

const normalizeNotifications = (input: unknown): NotificationSettings => {
  const row = (input || {}) as Record<string, unknown>;
  return {
    adminEmailAlerts: readBool(row.adminEmailAlerts, defaultNotifications.adminEmailAlerts),
    adminSmsAlerts: readBool(row.adminSmsAlerts, defaultNotifications.adminSmsAlerts),
    orderPlaced: readBool(row.orderPlaced, defaultNotifications.orderPlaced),
    orderPaid: readBool(row.orderPaid, defaultNotifications.orderPaid),
    orderFailed: readBool(row.orderFailed, defaultNotifications.orderFailed),
    dailySummary: readBool(row.dailySummary, defaultNotifications.dailySummary),
    weeklySummary: readBool(row.weeklySummary, defaultNotifications.weeklySummary),
    lowStockThreshold: readNumber(row.lowStockThreshold, defaultNotifications.lowStockThreshold),
  };
};

const normalizePagination = (input: unknown, fallbackPage: number, fallbackLimit: number) => {
  const row = (input || {}) as Record<string, unknown>;
  const totalPages = Math.max(1, readNumber(row.totalPages, 1));
  const page = Math.min(Math.max(1, readNumber(row.page, fallbackPage)), totalPages);
  return {
    page,
    limit: readNumber(row.limit, fallbackLimit),
    total: readNumber(row.total, 0),
    totalPages,
    hasNextPage: readBool(row.hasNextPage),
    hasPrevPage: readBool(row.hasPrevPage),
  };
};

const formatDateTime = (value: string) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleString();
};

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<TabKey | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const [general, setGeneral] = useState<GeneralSettings>(defaultGeneral);
  const [security, setSecurity] = useState<SecuritySettings>(defaultSecurity);
  const [payments, setPayments] = useState<PaymentsSettings>(defaultPayments);
  const [notifications, setNotifications] = useState<NotificationSettings>(defaultNotifications);
  const [allowedIpsInput, setAllowedIpsInput] = useState("");
  const [storePasswordInput, setStorePasswordInput] = useState("");

  const [logs, setLogs] = useState<SystemLogEntry[]>([]);
  const [logSearchInput, setLogSearchInput] = useState("");
  const [logSearch, setLogSearch] = useState("");
  const [logPage, setLogPage] = useState(1);
  const [logLimit, setLogLimit] = useState<number>(10);
  const [logLoading, setLogLoading] = useState(false);
  const [logPagination, setLogPagination] = useState<PaginationState>(defaultPagination);

  const tabs = useMemo(
    () => [
      { key: "general" as const, label: "General", icon: Settings2 },
      { key: "security" as const, label: "Security", icon: ShieldCheck },
      { key: "payments" as const, label: "Payments", icon: CreditCard },
      { key: "notifications" as const, label: "Notifications", icon: Bell },
      { key: "system-log" as const, label: "System Log", icon: TerminalSquare },
    ],
    []
  );

  const loadSettings = useCallback(async (silent = false) => {
    if (silent) setRefreshing(true);
    else setLoading(true);

    setError("");
    setSuccess("");
    try {
      const data = await adminSettingsService.get();
      const settings = (data?.settings || {}) as Record<string, unknown>;
      const meta = (settings.meta || {}) as Record<string, unknown>;

      const nextGeneral = normalizeGeneral(settings.general);
      const nextSecurity = normalizeSecurity(settings.security);
      const nextPayments = normalizePayments(settings.payments);
      const nextNotifications = normalizeNotifications(settings.notifications);

      setGeneral(nextGeneral);
      setSecurity(nextSecurity);
      setPayments(nextPayments);
      setNotifications(nextNotifications);
      setAllowedIpsInput(nextSecurity.allowedAdminIps.join("\n"));
      setStorePasswordInput("");
      setUpdatedAt(readString(meta.updatedAt));
    } catch (fetchError) {
      setError(handleApiError(fetchError));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const loadSystemLog = useCallback(async () => {
    setLogLoading(true);
    setError("");
    try {
      const data = await adminSettingsService.getSystemLog({
        page: logPage,
        limit: logLimit,
        search: logSearch || undefined,
      });
      const rows = Array.isArray(data?.logs) ? data.logs : [];
      setLogs(
        rows.map((entry: unknown) => {
          const row = (entry || {}) as Record<string, unknown>;
          return {
            _id: readString(row._id),
            section: readString(row.section, "system"),
            action: readString(row.action, "Updated"),
            details: readString(row.details),
            actorName: readString(row.actorName),
            createdAt: readString(row.createdAt),
          };
        })
      );
      setLogPagination(normalizePagination(data?.pagination, logPage, logLimit));
    } catch (fetchError) {
      setError(handleApiError(fetchError));
      setLogs([]);
      setLogPagination(normalizePagination(null, logPage, logLimit));
    } finally {
      setLogLoading(false);
    }
  }, [logLimit, logPage, logSearch]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLogSearch(logSearchInput.trim());
      setLogPage(1);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [logSearchInput]);

  useEffect(() => {
    if (activeTab !== "system-log") return;
    loadSystemLog();
  }, [activeTab, loadSystemLog]);

  const persistSettings = async (tab: TabKey) => {
    setSaving(tab);
    setError("");
    setSuccess("");

    try {
      let response;
      if (tab === "general") {
        response = await adminSettingsService.updateGeneral(general);
      } else if (tab === "security") {
        const allowedAdminIps = [...new Set(allowedIpsInput.split(/[\n,]+/).map((ip) => ip.trim()).filter(Boolean))];
        const payload = { ...security, allowedAdminIps };
        response = await adminSettingsService.updateSecurity(payload);
        setSecurity(payload);
      } else if (tab === "payments") {
        response = await adminSettingsService.updatePayments({
          ...payments,
          allowedMethods: [...new Set(payments.allowedMethods)],
          ...(storePasswordInput.trim() ? { storePassword: storePasswordInput.trim() } : {}),
        });
        setPayments(normalizePayments((response?.settings || {}).payments));
        setStorePasswordInput("");
      } else {
        response = await adminSettingsService.updateNotifications(notifications);
      }

      setSuccess(response?.message || "Settings saved successfully.");
      setUpdatedAt(readString((response?.settings?.meta || {}).updatedAt));
    } catch (saveError) {
      setError(handleApiError(saveError));
    } finally {
      setSaving(null);
    }
  };

  const updateMethod = (method: PaymentMethod, enabled: boolean) => {
    setPayments((prev) => {
      const allowedMethods = enabled
        ? [...new Set([...prev.allowedMethods, method])]
        : prev.allowedMethods.filter((item) => item !== method);
      return { ...prev, allowedMethods: allowedMethods.length ? allowedMethods : ["sslcommerz"] };
    });
  };

  const logStart = logPagination.total === 0 ? 0 : (logPagination.page - 1) * logPagination.limit + 1;
  const logEnd =
    logPagination.total === 0 ? 0 : Math.min(logPagination.page * logPagination.limit, logPagination.total);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 size={16} className="animate-spin" />
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <header className="flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-slate-200 bg-gradient-to-r from-white to-slate-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
        <div>
          <h1 className="text-3xl font-black tracking-tight">System Settings</h1>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">AdminPro Control</p>
          <p className="mt-2 text-xs text-slate-500">Last updated: {updatedAt ? formatDateTime(updatedAt) : "N/A"}</p>
        </div>
        <button
          onClick={() => loadSettings(true)}
          disabled={refreshing}
          className={ghostButtonClass}
        >
          {refreshing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          Refresh
        </button>
      </header>

      {error ? <Message tone="error" text={error} /> : null}
      {success ? <Message tone="success" text={success} /> : null}

      <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
        <aside className="space-y-2 rounded-3xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                  active
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
          {activeTab === "general" ? (
            <div className="space-y-5">
              <h2 className="text-xl font-black tracking-tight">General</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Store Name"><input className={inputClass} value={general.storeName} onChange={(e) => setGeneral((p) => ({ ...p, storeName: e.target.value }))} /></Field>
                <Field label="Support Email"><input className={inputClass} type="email" value={general.supportEmail} onChange={(e) => setGeneral((p) => ({ ...p, supportEmail: e.target.value }))} /></Field>
                <Field label="Support Phone"><input className={inputClass} value={general.supportPhone} onChange={(e) => setGeneral((p) => ({ ...p, supportPhone: e.target.value }))} /></Field>
                <Field label="Timezone"><input className={inputClass} value={general.timezone} onChange={(e) => setGeneral((p) => ({ ...p, timezone: e.target.value }))} /></Field>
                <Field label="Currency"><input className={inputClass} value={general.defaultCurrency} onChange={(e) => setGeneral((p) => ({ ...p, defaultCurrency: e.target.value.toUpperCase() }))} /></Field>
                <Field label="Language"><input className={inputClass} value={general.defaultLanguage} onChange={(e) => setGeneral((p) => ({ ...p, defaultLanguage: e.target.value.toLowerCase() }))} /></Field>
                <Field label="Logo URL"><input className={inputClass} value={general.logoUrl} onChange={(e) => setGeneral((p) => ({ ...p, logoUrl: e.target.value }))} /></Field>
                <Field label="Store Address"><input className={inputClass} value={general.storeAddress} onChange={(e) => setGeneral((p) => ({ ...p, storeAddress: e.target.value }))} /></Field>
              </div>
              <SwitchRow label="Maintenance Mode" description="Temporarily disable storefront traffic." checked={general.maintenanceMode} onChange={(checked) => setGeneral((p) => ({ ...p, maintenanceMode: checked }))} />
              <SaveButton onClick={() => persistSettings("general")} loading={saving === "general"} />
            </div>
          ) : null}

          {activeTab === "security" ? (
            <div className="space-y-5">
              <h2 className="text-xl font-black tracking-tight">Security</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Password Rotation (days)"><input type="number" min={30} max={365} className={inputClass} value={security.passwordRotationDays} onChange={(e) => setSecurity((p) => ({ ...p, passwordRotationDays: Number(e.target.value) }))} /></Field>
                <Field label="Max Login Attempts"><input type="number" min={3} max={20} className={inputClass} value={security.maxLoginAttempts} onChange={(e) => setSecurity((p) => ({ ...p, maxLoginAttempts: Number(e.target.value) }))} /></Field>
                <Field label="Session Timeout (minutes)"><input type="number" min={5} max={1440} className={inputClass} value={security.sessionTimeoutMinutes} onChange={(e) => setSecurity((p) => ({ ...p, sessionTimeoutMinutes: Number(e.target.value) }))} /></Field>
              </div>
              <SwitchRow label="Enforce Strong Passwords" description="Require strict admin password policy." checked={security.enforceStrongPasswords} onChange={(checked) => setSecurity((p) => ({ ...p, enforceStrongPasswords: checked }))} />
              <SwitchRow label="Require 2FA for Admins" description="Force two-factor authentication for admin logins." checked={security.twoFactorForAdmins} onChange={(checked) => setSecurity((p) => ({ ...p, twoFactorForAdmins: checked }))} />
              <SwitchRow label="Admin IP Whitelist" description="Restrict admin access to trusted IPs only." checked={security.ipWhitelistOnly} onChange={(checked) => setSecurity((p) => ({ ...p, ipWhitelistOnly: checked }))} />
              <Field label="Allowed Admin IPs (comma or new line separated)">
                <textarea rows={5} className={`${inputClass} h-auto resize-y py-2`} value={allowedIpsInput} onChange={(e) => setAllowedIpsInput(e.target.value)} />
              </Field>
              <SaveButton onClick={() => persistSettings("security")} loading={saving === "security"} />
            </div>
          ) : null}

          {activeTab === "payments" ? (
            <div className="space-y-5">
              <h2 className="text-xl font-black tracking-tight">Payments</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="SSLCommerz Mode">
                  <select className={inputClass} value={payments.sslcommerzMode} onChange={(e) => setPayments((p) => ({ ...p, sslcommerzMode: e.target.value === "live" ? "live" : "sandbox" }))}>
                    <option value="sandbox">Sandbox</option>
                    <option value="live">Live</option>
                  </select>
                </Field>
                <Field label="Store ID"><input className={inputClass} value={payments.storeId} onChange={(e) => setPayments((p) => ({ ...p, storeId: e.target.value }))} /></Field>
                <Field label="Store Password (leave blank to keep current)">
                  <input type="password" className={inputClass} value={storePasswordInput} onChange={(e) => setStorePasswordInput(e.target.value)} />
                </Field>
                <Field label="Refund Window (days)"><input type="number" min={0} max={90} className={inputClass} value={payments.refundWindowDays} onChange={(e) => setPayments((p) => ({ ...p, refundWindowDays: Number(e.target.value) }))} /></Field>
                <Field label="Tax Percent (%)"><input type="number" min={0} max={100} className={inputClass} value={payments.taxPercent} onChange={(e) => setPayments((p) => ({ ...p, taxPercent: Number(e.target.value) }))} /></Field>
                <Field label="Flat Shipping Charge"><input type="number" min={0} className={inputClass} value={payments.shippingChargeFlat} onChange={(e) => setPayments((p) => ({ ...p, shippingChargeFlat: Number(e.target.value) }))} /></Field>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-700 dark:bg-slate-950/50">
                Gateway credentials configured: <strong>{payments.gatewayCredentialsConfigured ? "Yes" : "No"}</strong> | Store password configured: <strong>{payments.storePasswordConfigured ? "Yes" : "No"}</strong>
              </div>

              <SwitchRow label="Enable SSLCommerz" description="Allow SSLCommerz checkout payments." checked={payments.sslcommerzEnabled} onChange={(checked) => setPayments((p) => ({ ...p, sslcommerzEnabled: checked }))} />
              <SwitchRow label="Enable Cash On Delivery" description="Allow COD payment method in checkout." checked={payments.codEnabled} onChange={(checked) => setPayments((p) => ({ ...p, codEnabled: checked }))} />
              <SwitchRow label="Auto Capture Payment" description="Auto-mark validated payments as captured." checked={payments.autoCapture} onChange={(checked) => setPayments((p) => ({ ...p, autoCapture: checked }))} />

              <div className="space-y-2">
                <p className="text-sm font-semibold">Allowed Payment Methods</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(["sslcommerz", "cod", "bkash", "nagad"] as PaymentMethod[]).map((method) => (
                    <label key={method} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                      <span className="uppercase">{method}</span>
                      <input type="checkbox" className="h-4 w-4 accent-indigo-600" checked={payments.allowedMethods.includes(method)} onChange={(e) => updateMethod(method, e.target.checked)} />
                    </label>
                  ))}
                </div>
              </div>

              <SaveButton onClick={() => persistSettings("payments")} loading={saving === "payments"} />
            </div>
          ) : null}

          {activeTab === "notifications" ? (
            <div className="space-y-5">
              <h2 className="text-xl font-black tracking-tight">Notifications</h2>
              <Field label="Low Stock Threshold">
                <input type="number" min={1} max={500} className={`${inputClass} max-w-[220px]`} value={notifications.lowStockThreshold} onChange={(e) => setNotifications((p) => ({ ...p, lowStockThreshold: Number(e.target.value) }))} />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                {([
                  ["adminEmailAlerts", "Admin Email Alerts"],
                  ["adminSmsAlerts", "Admin SMS Alerts"],
                  ["orderPlaced", "Order Placed"],
                  ["orderPaid", "Order Paid"],
                  ["orderFailed", "Order Failed"],
                  ["dailySummary", "Daily Summary"],
                  ["weeklySummary", "Weekly Summary"],
                ] as const).map(([key, label]) => (
                  <SwitchCard key={key} label={label} checked={notifications[key]} onChange={(checked) => setNotifications((p) => ({ ...p, [key]: checked }))} />
                ))}
              </div>
              <SaveButton onClick={() => persistSettings("notifications")} loading={saving === "notifications"} />
            </div>
          ) : null}

          {activeTab === "system-log" ? (
            <div className="space-y-5">
              <h2 className="text-xl font-black tracking-tight">System Log</h2>
              <div className="flex flex-wrap items-center gap-3">
                <input className={`${inputClass} min-w-[260px] flex-1`} value={logSearchInput} onChange={(e) => setLogSearchInput(e.target.value)} placeholder="Search action, section, actor..." />
                <button onClick={loadSystemLog} disabled={logLoading} className={ghostButtonClass}>
                  {logLoading ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                  Refresh
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                <table className="w-full min-w-[780px] text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-950/60">
                    <tr>
                      <th className="px-3 py-2 text-left">Time</th>
                      <th className="px-3 py-2 text-left">Section</th>
                      <th className="px-3 py-2 text-left">Action</th>
                      <th className="px-3 py-2 text-left">Actor</th>
                      <th className="px-3 py-2 text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logLoading ? (
                      <tr><td colSpan={5} className="px-3 py-8 text-center text-muted-foreground">Loading logs...</td></tr>
                    ) : logs.length === 0 ? (
                      <tr><td colSpan={5} className="px-3 py-8 text-center text-muted-foreground">No log entries found.</td></tr>
                    ) : (
                      logs.map((entry) => (
                        <tr key={entry._id} className="border-t border-slate-200 dark:border-slate-800">
                          <td className="px-3 py-3 whitespace-nowrap">{formatDateTime(entry.createdAt)}</td>
                          <td className="px-3 py-3 uppercase text-xs">{entry.section}</td>
                          <td className="px-3 py-3 font-semibold">{entry.action}</td>
                          <td className="px-3 py-3">{entry.actorName || "System"}</td>
                          <td className="px-3 py-3 text-slate-500">{entry.details || "-"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Rows:</span>
                  <select className="h-8 rounded-md border bg-background px-2 text-xs" value={logLimit} onChange={(e) => { setLogLimit(Number(e.target.value)); setLogPage(1); }}>
                    {PAGE_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
                  </select>
                  <span>Showing {logStart}-{logEnd} of {logPagination.total}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className={pagerButtonClass} onClick={() => setLogPage((p) => Math.max(1, p - 1))} disabled={logLoading || !logPagination.hasPrevPage}>Previous</button>
                  <span className="text-xs text-muted-foreground">Page {logPagination.page} of {logPagination.totalPages}</span>
                  <button className={pagerButtonClass} onClick={() => setLogPage((p) => Math.min(logPagination.totalPages, p + 1))} disabled={logLoading || !logPagination.hasNextPage}>Next</button>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

function Message({ tone, text }: { tone: "error" | "success"; text: string }) {
  if (!text) return null;
  const isError = tone === "error";
  return (
    <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
      isError
        ? "border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
        : "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
    }`}>
      {isError ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
      {text}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-1">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</span>
      {children}
    </label>
  );
}

function SwitchRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950/50">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`h-7 w-14 rounded-full p-1 transition-all ${checked ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"}`}
      >
        <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-7" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

function SwitchCard({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-700">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-indigo-600" />
    </label>
  );
}

function SaveButton({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-colors hover:bg-indigo-500 disabled:opacity-70"
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
      Save Settings
    </button>
  );
}
