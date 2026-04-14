import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
};

const RAW_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");
const API_BASE_URL = RAW_BASE_URL.endsWith("/api") ? RAW_BASE_URL : `${RAW_BASE_URL}/api`;
const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const API_CLIENT = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 20000,
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string | null) => void> = [];

const subscribeTokenRefresh = (callback: (token: string | null) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (token: string | null) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

API_CLIENT.interceptors.request.use((config: RetryRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

API_CLIENT.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = (error.config || {}) as RetryRequestConfig;
    const status = error.response?.status;
    const isAuthCall =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh");

    if (status !== 401 || originalRequest.skipAuthRefresh || originalRequest._retry || isAuthCall) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newToken) => {
          if (!newToken) {
            reject(error);
            return;
          }

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(API_CLIENT(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshResponse = await API_CLIENT.post(
        "/auth/refresh",
        {},
        { skipAuthRefresh: true } as RetryRequestConfig
      );
      const newToken = refreshResponse.data?.token as string | undefined;

      if (!newToken) {
        throw new Error("Refresh token exchange failed");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("token", newToken);
      }

      onRefreshed(newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return API_CLIENT(originalRequest);
    } catch (refreshError) {
      onRefreshed(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("auth-storage");
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export const handleApiError = (error: any): string =>
  error?.response?.data?.message || error?.message || "Something went wrong";

export const authService = {
  register: async (payload: { name: string; email: string; password: string; phone?: string }) => {
    const response = await API_CLIENT.post("/auth/register", payload);
    return response.data;
  },
  login: async (payload: { email: string; password: string }) => {
    const response = await API_CLIENT.post("/auth/login", payload);
    return response.data;
  },
  logout: async () => {
    const response = await API_CLIENT.post("/auth/logout");
    return response.data;
  },
  getMe: async () => {
    const response = await API_CLIENT.get("/auth/me");
    return response.data;
  },
  refresh: async () => {
    const response = await API_CLIENT.post("/auth/refresh");
    return response.data;
  },
};

export const productService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const response = await API_CLIENT.get("/products", { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await API_CLIENT.get(`/products/${id}`);
    return response.data;
  },
  getReviews: async (id: string) => {
    const response = await API_CLIENT.get(`/products/${id}/reviews`);
    return response.data;
  },
  addReview: async (id: string, payload: { rating: number; comment?: string }) => {
    const response = await API_CLIENT.post(`/products/${id}/reviews`, payload);
    return response.data;
  },
  create: async (formData: FormData) => {
    const response = await API_CLIENT.post("/admin/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  update: async (id: string, formData: FormData) => {
    const response = await API_CLIENT.put(`/admin/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await API_CLIENT.delete(`/admin/products/${id}`);
    return response.data;
  },
};

export const cartService = {
  get: async () => {
    const response = await API_CLIENT.get("/cart");
    return response.data;
  },
  add: async (productId: string, quantity = 1) => {
    const response = await API_CLIENT.post("/cart/add", { productId, quantity });
    return response.data;
  },
  update: async (productId: string, quantity: number) => {
    const response = await API_CLIENT.put(`/cart/update/${productId}`, { quantity });
    return response.data;
  },
  remove: async (productId: string) => {
    const response = await API_CLIENT.delete(`/cart/remove/${productId}`);
    return response.data;
  },
  clear: async () => {
    const response = await API_CLIENT.delete("/cart/clear");
    return response.data;
  },
};

export const orderService = {
  create: async (payload: any) => {
    const response = await API_CLIENT.post("/orders", payload);
    return response.data;
  },
  getMyOrders: async () => {
    const response = await API_CLIENT.get("/orders/my-orders");
    return response.data;
  },
  getById: async (id: string) => {
    const response = await API_CLIENT.get(`/orders/${id}`);
    return response.data;
  },
  getTracking: async (id: string) => {
    const response = await API_CLIENT.get(`/orders/${id}/tracking`);
    return response.data;
  },
  cancel: async (id: string) => {
    const response = await API_CLIENT.put(`/orders/${id}/cancel`);
    return response.data;
  },
  getAll: async (status?: string) => {
    const response = await API_CLIENT.get("/admin/orders", {
      params: status ? { status } : undefined,
    });
    return response.data;
  },
  updateStatus: async (id: string, payload: any) => {
    const response = await API_CLIENT.put(`/admin/orders/${id}/status`, payload);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await API_CLIENT.delete(`/admin/orders/${id}`);
    return response.data;
  },
  getStats: async () => {
    const response = await API_CLIENT.get("/admin/dashboard");
    return response.data;
  },
};

export const paymentService = {
  init: async (orderId: string) => {
    const response = await API_CLIENT.post("/payment/init", { orderId });
    return response.data;
  },
};

export const wishlistService = {
  getAll: async () => {
    const response = await API_CLIENT.get("/wishlist");
    return response.data;
  },
  add: async (productId: string) => {
    const response = await API_CLIENT.post(`/wishlist/${productId}`);
    return response.data;
  },
  remove: async (productId: string) => {
    const response = await API_CLIENT.delete(`/wishlist/${productId}`);
    return response.data;
  },
};

export const securityService = {
  getSessions: async () => {
    const response = await API_CLIENT.get("/security/sessions");
    return response.data;
  },
  terminateSession: async (id: string) => {
    const response = await API_CLIENT.delete(`/security/sessions/${id}`);
    return response.data;
  },
  getIPs: async () => {
    const response = await API_CLIENT.get("/security/whitelist");
    return response.data;
  },
  addIP: async (payload: { ip: string; label: string }) => {
    const response = await API_CLIENT.post("/security/whitelist", payload);
    return response.data;
  },
  deleteIP: async (id: string) => {
    const response = await API_CLIENT.delete(`/security/whitelist/${id}`);
    return response.data;
  },
  get2FA: async () => {
    const response = await API_CLIENT.get("/security/2fa");
    return response.data;
  },
  toggle2FA: async (enabled: boolean) => {
    const response = await API_CLIENT.put("/security/2fa", { enabled });
    return response.data;
  },
};

export const adminService = {
  getAllUsers: async () => {
    const response = await API_CLIENT.get("/admin/users");
    return response.data;
  },
  updateUser: async (id: string, payload: any) => {
    const response = await API_CLIENT.put(`/admin/users/${id}`, payload);
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await API_CLIENT.delete(`/admin/users/${id}`);
    return response.data;
  },
  updateUserStatus: async (id: string, status: "active" | "suspended") => {
    const response = await API_CLIENT.patch(`/admin/users/${id}/status`, { status });
    return response.data;
  },
  impersonate: async (id: string) => {
    const response = await API_CLIENT.post(`/auth/admin/switch-user/${id}`);
    return response.data;
  },
};

export const getImageUrl = (path?: string): string => {
  if (!path) return "https://via.placeholder.com/400x400?text=No+Image";
  if (path.startsWith("http")) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BACKEND_BASE_URL}${normalizedPath}`;
};

export default API_CLIENT;
