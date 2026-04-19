export * from "./apiClient";
export { default } from "./apiClient";

/*
// app/lib/api.ts
// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// Named export kora hocche jate page.tsx-e { productService } kaj kore
// export const productService = {
//   getAll: async () => {
//     const response = await API.get("/products");
//     return response.data;
//   },
//   getById: async (id: string) => {
//     const response = await API.get(`/products/${id}`);
//     return response.data;
//   },
// };





// // app/lib/api.ts
// import axios from "axios";

// const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, ""); 

// const API = axios.create({
//   baseURL: `${BASE_URL}/api`, 
//   withCredentials: true,
//   timeout: 15000,
// });

// // ================== Request Interceptor ==================
// API.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
      
//       // শুধু লগইন এবং রেজিস্ট্রেশন ছাড়া বাকি সব রিকোয়েস্টে টোকেন পাঠানো হবে
//       const isAuthRoute = config.url?.includes("/auth/login") || config.url?.includes("/auth/register");
      
//       if (token && !isAuthRoute) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ================== Response Interceptor ==================
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       // ব্যাকএন্ড থেকে আসা মেসেজ বের করা
//       const serverMessage = error.response.data?.message || 
//                             error.response.data?.error || 
//                             "Unknown Server Error";
      
//       // কনসোলে ডিটেইল লগ (এটি এখন আর {} দেখাবে না)
//       console.error("--- Backend Error ---");
//       console.log("Status Code:", error.response.status);
//       console.log("Message:", serverMessage);

//       // ৪০১ (Unauthorized) হ্যান্ডেল করা
//       if (error.response.status === 401) {
//         if (typeof window !== "undefined") {
//           localStorage.removeItem("token");
//           if (!window.location.pathname.includes("/login")) {
//             window.location.href = "/login";
//           }
//         }
//       }
//     } else if (error.request) {
//       // সার্ভার রেসপন্স দেয়নি (Network Error)
//       console.error("Network Error: No response received from server.");
//     } else {
//       // রিকোয়েস্ট সেটআপে ভুল
//       console.error("Request Error:", error.message);
//     }

//     return Promise.reject(error);
//   }
// );

// // ================== 1. Auth Service ==================
// export const authService = {
//   register: async (userData: any) => {
//     const response = await API.post("/auth/register", userData); 
//     return response.data;
//   },
//   login: async (credentials: any) => {
//     const response = await API.post("/auth/login", credentials);
//     return response.data;
//   },
//   getMe: async () => {
//     const response = await API.get("/auth/me");
//     return response.data;
//   }
// };

// // ================== 2. Admin Service (নতুন যোগ করা হয়েছে) ==================
// export const adminService = {
//   // সব ইউজার লিস্ট (টেবিলে দেখানোর জন্য)
//   getAllUsers: async () => {
//     const response = await API.get("/admin/users");
//     return response.data;
//   },
//   // ইউজার প্রোফাইল আপডেট
//   updateUser: async (id: string, userData: any) => {
//     const response = await API.put(`/admin/users/${id}`, userData);
//     return response.data;
//   },
//   // ইউজার ডিলিট করা
//   deleteUser: async (id: string) => {
//     const response = await API.delete(`/admin/users/${id}`);
//     return response.data;
//   },
//   // ইউজার স্ট্যাটাস (Suspend/Active)
//   updateUserStatus: async (id: string, status: string) => {
//     const response = await API.patch(`/admin/users/${id}/status`, { status });
//     return response.data;
//   },
//   // ইমপার্সোনেট (Login as User)
//   impersonate: async (id: string) => {
//     const response = await API.post(`/auth/impersonate/${id}`);
//     return response.data;
//   }
// };

// // ================== 3. Product Service ==================
// export const productService = {
//   getAll: async () => {
//     const response = await API.get("/products");
//     return response.data; 
//   },
//   getById: async (id: string) => {
//     const response = await API.get(`/products/${id}`); 
//     return response.data;
//   },
//   create: async (formData: FormData) => {
//     const response = await API.post("/admin/products", formData);
//     return response.data;
//   },
//   update: async (id: string, formData: FormData) => {
//     const response = await API.put(`/admin/products/${id}`, formData);
//     return response.data;
//   },
//   delete: async (id: string) => {
//     const response = await API.delete(`/admin/products/${id}`);
//     return response.data;
//   }
// };

// // ================== 4. Order Service ==================
// export const orderService = {
//   getAll: async () => {
//     const response = await API.get("/admin/orders");
//     return response.data;
//   },
//   updateStatus: async (id: string, updateData: any) => {
//     let payload = typeof updateData === 'string' 
//       ? { status: updateData.toLowerCase() } 
//       : { ...updateData, status: updateData.status?.toLowerCase() };

//     const response = await API.put(`/admin/orders/${id}/status`, payload);
//     return response.data;
//   },
//   getStats: async () => {
//     const response = await API.get("/admin/dashboard");
//     return response.data;
//   },
//   delete: async (id: string) => {
//     const response = await API.delete(`/admin/orders/${id}`);
//     return response.data;
//   },
// };

// // --- Helpers ---
// export function getImageUrl(imagePath: string | undefined): string {
//   if (!imagePath) return "https://via.placeholder.com/400x400?text=No+Image";
//   if (imagePath.startsWith("http")) return imagePath; 
//   return `${BASE_URL}${imagePath}`; 
// }

// export default API;

// app/lib/api.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// ================== BASE URL ==================
const RAW_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
const API_BASE_URL = RAW_BASE_URL
  ? (RAW_BASE_URL.endsWith("/api") ? RAW_BASE_URL : `${RAW_BASE_URL}/api`)
  : "/api";
const BACKEND_BASE_URL = RAW_BASE_URL
  ? (RAW_BASE_URL.endsWith("/api") ? RAW_BASE_URL.replace(/\/api\/?$/, "") : RAW_BASE_URL)
  : "";

// ================== AXIOS INSTANCE ==================
const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

// ================== REQUEST INTERCEPTOR ==================
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      const isAuthRoute =
        config.url?.includes("/auth/login") ||
        config.url?.includes("/auth/register");

      if (token && !isAuthRoute) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================== RESPONSE INTERCEPTOR ==================
API.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Unknown error";

    console.error("🚨 API ERROR:", {
      url: error.config?.url,
      method: error.config?.method,
      status,
      message,
    });

    // 🔐 AUTO LOGOUT (401)
    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject({ status, message });
  }
);

// ================== HELPER ==================
export const handleApiError = (err: any): string => {
  return err?.message || "Something went wrong";
};

// ================== AUTH SERVICE ==================
export const authService = {
  register: async (data: any) => {
    const res = await API.post("/auth/register", data);
    return res.data;
  },

  login: async (data: any) => {
    const res = await API.post("/auth/login", data);
    return res.data;
  },

  getMe: async () => {
    const res = await API.get("/auth/me");
    return res.data;
  },
};

// ================== ADMIN SERVICE ==================
export const adminService = {
  getAllUsers: async () => {
    const res = await API.get("/admin/users");
    return res.data;
  },

  updateUser: async (id: string, data: any) => {
    const res = await API.put(`/admin/users/${id}`, data);
    return res.data;
  },

  deleteUser: async (id: string) => {
    const res = await API.delete(`/admin/users/${id}`);
    return res.data;
  },

  updateUserStatus: async (id: string, status: string) => {
    const res = await API.patch(`/admin/users/${id}/status`, { status });
    return res.data;
  },

  impersonate: async (id: string) => {
    const res = await API.post(`/auth/impersonate/${id}`);
    return res.data;
  },
};

// ================== PRODUCT SERVICE ==================
export const productService = {
  getAll: async () => {
    const res = await API.get("/products");
    return res.data;
  },

  getById: async (id: string) => {
    const res = await API.get(`/products/${id}`);
    return res.data;
  },

  create: async (formData: FormData) => {
    const res = await API.post("/admin/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  update: async (id: string, formData: FormData) => {
    const res = await API.put(`/admin/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  delete: async (id: string) => {
    const res = await API.delete(`/admin/products/${id}`);
    return res.data;
  },
};

// ================== ORDER SERVICE ==================
export const orderService = {
  getAll: async () => {
    const res = await API.get("/admin/orders");
    return res.data;
  },

  updateStatus: async (id: string, data: any) => {
    const payload =
      typeof data === "string"
        ? { status: data.toLowerCase() }
        : { ...data, status: data.status?.toLowerCase() };

    const res = await API.put(`/admin/orders/${id}/status`, payload);
    return res.data;
  },

  getStats: async () => {
    const res = await API.get("/admin/dashboard");
    return res.data;
  },

  delete: async (id: string) => {
    const res = await API.delete(`/admin/orders/${id}`);
    return res.data;
  },
};

// ================== 🔐 SECURITY SERVICE ==================
export const securityService = {
  // Sessions
  getSessions: async () => {
    const res = await API.get("/security/sessions");
    return res.data;
  },

  terminateSession: async (id: string) => {
    const res = await API.delete(`/security/sessions/${id}`);
    return res.data;
  },

  // IP Whitelist
  getIPs: async () => {
    const res = await API.get("/security/whitelist");
    return res.data;
  },

  addIP: async (data: { ip: string; label: string }) => {
    const res = await API.post("/security/whitelist", data);
    return res.data;
  },

  deleteIP: async (id: string) => {
    const res = await API.delete(`/security/whitelist/${id}`);
    return res.data;
  },

  // 2FA
  get2FA: async () => {
    const res = await API.get("/security/2fa");
    return res.data;
  },

  toggle2FA: async (enabled: boolean) => {
    const res = await API.put("/security/2fa", { enabled });
    return res.data;
  },
};

// ================== IMAGE HELPER ==================
export const getImageUrl = (path?: string): string => {
  if (!path) return "https://via.placeholder.com/400x400?text=No+Image";
  if (path.startsWith("http")) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return BACKEND_BASE_URL ? `${BACKEND_BASE_URL}${normalizedPath}` : normalizedPath;
};

export default API;

export const getSessions = securityService.getSessions;
export const getIPs = securityService.getIPs;
export const addIP = securityService.addIP;
export const deleteIP = securityService.deleteIP;
export const update2FA = securityService.toggle2FA;
*/
