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

// app/lib/api.ts// app/lib/api.ts
// app/lib/api.ts// app/lib/api.ts

// app/lib/api.ts


import axios from "axios";

// ✅ আপনার বর্তমান পিসি/নেটওয়ার্কের IP ব্যবহার করুন
const BASE_URL = "http://192.168.1.7:5000"; 

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
      const isAuthRoute = config.url?.match(/\/login|\/register|\/auth/);
      
      if (token && !isAuthRoute) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// app/lib/api.ts ফাইলে এটি আপডেট করুন
    export const authService = {
      register: async (userData: any) => {
        // আগে ছিল "/register", এখন হবে "/auth/register"
        const response = await API.post("/auth/register", userData); 
        return response.data;
      },

      login: async (credentials: any) => {
        // আগে ছিল "/login", এখন হবে "/auth/login"
        const response = await API.post("/auth/login", credentials);
        return response.data;
      }
    };

// ================== Response Interceptor ==================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // যদি ব্যাকএন্ড থেকে কোনো এরর মেসেজ আসে সেটি কনসোলে সুন্দর করে দেখাবে
    if (error.response) {
      console.error("Backend Error Data:", error.response.data);
    }
    
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// --- Helpers ---
export function getImageUrl(imagePath: string | undefined): string {
  if (!imagePath) return "https://via.placeholder.com/400x400?text=No+Image";
  if (imagePath.startsWith("http")) return imagePath; 
  return `${BASE_URL}${imagePath}`; 
}

// --- Product Service ---
export const productService = {
  // ✅ ব্যাকএন্ডের নতুন রাউট অনুযায়ী পাথগুলো আপডেট করা হলো
  getAll: async () => {
    const response = await API.get("/admin/products/all");
    return response.data; 
  },

    // ✅ সঠিক এবং আপডেট করা ফাংশন
    getById: async (id: string) => {
      try {
        // '/admin/products' এর বদলে সাধারণ '/products' ব্যবহার করুন
        const response = await API.get(`/products/${id}`); 
        return response.data;
      } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
      }
    },
  create: async (formData: FormData) => {
    // ✅ নোট: আপনার ব্যাকএন্ডে '/api/admin/products' সরাসরি এই পাথে POST রিকোয়েস্ট যাবে
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

// --- Order Service ---
export const orderService = {
  getAll: async () => {
    const response = await API.get("/admin/orders");
    return response.data;
  },

// দ্বিতীয় প্যারামিটার হিসেবে 'status: string' এর বদলে 'updateData: any' ব্যবহার করুন
updateStatus: async (id: string, updateData: any) => {
  let payload;

  // যদি শুধু স্ট্যাটাস স্ট্রিং পাঠানো হয় (পুরানো কোডের জন্য)
  if (typeof updateData === 'string') {
    payload = { status: updateData.toLowerCase() };
  } 
  // যদি অবজেক্ট পাঠানো হয় (যেমন শিপিং মোডাল থেকে আসছে)
  else {
    payload = {
      ...updateData,
      status: updateData.status?.toLowerCase() // সেফলি স্ট্যাটাস ছোট হাতের করা হচ্ছে
    };
  }

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

export default API;