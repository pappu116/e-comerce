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





// app/lib/api.ts
import axios from "axios";

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, ""); 

const API = axios.create({
  baseURL: `${BASE_URL}/api`, 
  withCredentials: true,
  timeout: 15000,
});

// ================== Request Interceptor ==================
API.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      
      // শুধু লগইন এবং রেজিস্ট্রেশন ছাড়া বাকি সব রিকোয়েস্টে টোকেন পাঠানো হবে
      const isAuthRoute = config.url?.includes("/auth/login") || config.url?.includes("/auth/register");
      
      if (token && !isAuthRoute) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================== Response Interceptor ==================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // ব্যাকএন্ড থেকে আসা মেসেজ বের করা
      const serverMessage = error.response.data?.message || 
                            error.response.data?.error || 
                            "Unknown Server Error";
      
      // কনসোলে ডিটেইল লগ (এটি এখন আর {} দেখাবে না)
      console.error("--- Backend Error ---");
      console.log("Status Code:", error.response.status);
      console.log("Message:", serverMessage);

      // ৪০১ (Unauthorized) হ্যান্ডেল করা
      if (error.response.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          if (!window.location.pathname.includes("/login")) {
            window.location.href = "/login";
          }
        }
      }
    } else if (error.request) {
      // সার্ভার রেসপন্স দেয়নি (Network Error)
      console.error("Network Error: No response received from server.");
    } else {
      // রিকোয়েস্ট সেটআপে ভুল
      console.error("Request Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// ================== 1. Auth Service ==================
export const authService = {
  register: async (userData: any) => {
    const response = await API.post("/auth/register", userData); 
    return response.data;
  },
  login: async (credentials: any) => {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  },
  getMe: async () => {
    const response = await API.get("/auth/me");
    return response.data;
  }
};

// ================== 2. Admin Service (নতুন যোগ করা হয়েছে) ==================
export const adminService = {
  // সব ইউজার লিস্ট (টেবিলে দেখানোর জন্য)
  getAllUsers: async () => {
    const response = await API.get("/admin/users");
    return response.data;
  },
  // ইউজার প্রোফাইল আপডেট
  updateUser: async (id: string, userData: any) => {
    const response = await API.put(`/admin/users/${id}`, userData);
    return response.data;
  },
  // ইউজার ডিলিট করা
  deleteUser: async (id: string) => {
    const response = await API.delete(`/admin/users/${id}`);
    return response.data;
  },
  // ইউজার স্ট্যাটাস (Suspend/Active)
  updateUserStatus: async (id: string, status: string) => {
    const response = await API.patch(`/admin/users/${id}/status`, { status });
    return response.data;
  },
  // ইমপার্সোনেট (Login as User)
  impersonate: async (id: string) => {
    const response = await API.post(`/auth/impersonate/${id}`);
    return response.data;
  }
};

// ================== 3. Product Service ==================
export const productService = {
  getAll: async () => {
    const response = await API.get("/products");
    return response.data; 
  },
  getById: async (id: string) => {
    const response = await API.get(`/products/${id}`); 
    return response.data;
  },
  create: async (formData: FormData) => {
    const response = await API.post("/admin/products", formData);
    return response.data;
  },
  update: async (id: string, formData: FormData) => {
    const response = await API.put(`/admin/products/${id}`, formData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await API.delete(`/admin/products/${id}`);
    return response.data;
  }
};

// ================== 4. Order Service ==================
export const orderService = {
  getAll: async () => {
    const response = await API.get("/admin/orders");
    return response.data;
  },
  updateStatus: async (id: string, updateData: any) => {
    let payload = typeof updateData === 'string' 
      ? { status: updateData.toLowerCase() } 
      : { ...updateData, status: updateData.status?.toLowerCase() };

    const response = await API.put(`/admin/orders/${id}/status`, payload);
    return response.data;
  },
  getStats: async () => {
    const response = await API.get("/admin/dashboard");
    return response.data;
  },
  delete: async (id: string) => {
    const response = await API.delete(`/admin/orders/${id}`);
    return response.data;
  },
};

// --- Helpers ---
export function getImageUrl(imagePath: string | undefined): string {
  if (!imagePath) return "https://via.placeholder.com/400x400?text=No+Image";
  if (imagePath.startsWith("http")) return imagePath; 
  return `${BASE_URL}${imagePath}`; 
}

export default API;
