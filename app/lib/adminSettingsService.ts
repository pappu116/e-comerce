import API from "@/app/lib/apiClient";

export const adminSettingsService = {
  get: async () => {
    const response = await API.get("/admin/settings");
    return response.data;
  },
  updateGeneral: async (payload: {
    storeName: string;
    supportEmail: string;
    supportPhone?: string;
    timezone: string;
    defaultCurrency: string;
    defaultLanguage: string;
    logoUrl?: string;
    storeAddress?: string;
    maintenanceMode: boolean;
  }) => {
    const response = await API.put("/admin/settings/general", payload);
    return response.data;
  },
  updateSecurity: async (payload: {
    twoFactorForAdmins: boolean;
    enforceStrongPasswords: boolean;
    passwordRotationDays: number;
    maxLoginAttempts: number;
    sessionTimeoutMinutes: number;
    ipWhitelistOnly: boolean;
    allowedAdminIps: string[];
  }) => {
    const response = await API.put("/admin/settings/security", payload);
    return response.data;
  },
  updatePayments: async (payload: {
    sslcommerzEnabled: boolean;
    sslcommerzMode: "sandbox" | "live";
    storeId?: string;
    codEnabled: boolean;
    allowedMethods: Array<"sslcommerz" | "cod" | "bkash" | "nagad">;
    autoCapture: boolean;
    refundWindowDays: number;
    taxPercent: number;
    shippingChargeFlat: number;
  }) => {
    const response = await API.put("/admin/settings/payments", payload);
    return response.data;
  },
  updateNotifications: async (payload: {
    adminEmailAlerts: boolean;
    adminSmsAlerts: boolean;
    orderPlaced: boolean;
    orderPaid: boolean;
    orderFailed: boolean;
    dailySummary: boolean;
    weeklySummary: boolean;
    lowStockThreshold: number;
  }) => {
    const response = await API.put("/admin/settings/notifications", payload);
    return response.data;
  },
  getSystemLog: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    section?: string;
  }) => {
    const response = await API.get("/admin/settings/system-log", { params });
    return response.data;
  },
};
