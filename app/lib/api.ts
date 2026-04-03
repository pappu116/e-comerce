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

import axios from "axios";

// ================== Axios Instance ==================
const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "http://192.168.1.7:5000/api", // Apnar PC-r static IP
  withCredentials: true,
  timeout: 10000,
});

// ================== Request Interceptor (Token Attach) ==================
API.interceptors.request.use(
  (config) => {
    // login ba register chara baki shob request-e token jabe
    const noTokenRoutes = ["/login", "/register", "/auth/login"];
    const isNoTokenRoute = noTokenRoutes.some(route => config.url?.includes(route));

    if (!isNoTokenRoute) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ================== Response Interceptor (401 Handle) ==================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// --- ১. Image URL Helper ---
export function getImageUrl(imagePath: string | undefined): string {
  if (!imagePath) return "https://via.placeholder.com/400x400?text=No+Image";
  if (imagePath.startsWith("http")) return imagePath;
  
  // Apnar PC-r IP eikhaneu use korun
  const BASE_URL = "http://192.168.1.7:5000"; 
  return `${BASE_URL}${imagePath}`;
}

// --- ২. Cloudinary Upload Helper ---
// Note: your_preset_name ar your_cloud_name replace korun
export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "v6onivmu"); // replace with your actual preset
  formData.append("cloud_name", "dofm6n9un");   // replace with your actual cloud name

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dofm6n9un/image/upload`,
      formData
    );
    return res.data.secure_url;
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error.response?.data || error.message);
    throw error;
  }
};

// --- ৩. Product Service ---
export const productService = {
  // Public Routes
  getAllPublic: async () => {
    try {
      const response = await API.get("/products");
      return response.data.products || response.data;
    } catch (error) {
      return [];
    }
  },

  // Admin Routes
  getAll: async () => {
    const response = await API.get("/admin/products");
    return response.data.products || response.data;
  },

  create: async (productData: any) => {
    try {
      // Backend-e pathanor agey Price ar Stock-ke Number-e convert kora
      const formattedData = {
        ...productData,
        price: Number(productData.price),
        countInStock: Number(productData.countInStock || 0),
      };

      const response = await API.post("/admin/products", formattedData);
      return response.data;
    } catch (error) {
      console.error("Create Product Error:", error);
      throw error;
    }
  },

  update: async (id: string, data: any) => {
    const formattedData = {
      ...data,
      price: data.price ? Number(data.price) : undefined,
      countInStock: data.countInStock ? Number(data.countInStock) : undefined,
    };
    const response = await API.put(`/admin/products/${id}`, formattedData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await API.delete(`/admin/products/${id}`);
    return response.data;
  }
};

export default API;