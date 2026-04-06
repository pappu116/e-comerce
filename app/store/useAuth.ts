// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface AuthState {
//   allUsers: any[];      // সব ইউজারের ডাটা রাখার জন্য
//   user: any | null;
//   isLoggedIn: boolean;
//   register: (newUser: any) => { success: boolean; message: string }; // রেজিস্ট্রেশন ফাংশন
//   login: (email: string, pass: string) => boolean; // ইমেইল ও পাসওয়ার্ড দিয়ে লগইন
//   logout: () => void;
// }

// export const useAuth = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       allUsers: [], // শুরুতে খালি অ্যারে
//       user: null,
//       isLoggedIn: false,

//       // রেজিস্ট্রেশন লজিক
//       register: (newUser: any) => {
//         const users = get().allUsers || [];
//         const exists = users.find((u: any) => u.email === newUser.email);
        
//         if (exists) {
//           return { success: false, message: "এই ইমেইল দিয়ে অলরেডি অ্যাকাউন্ট আছে! 📧" };
//         }

//         set({ allUsers: [...users, newUser] });
//         return { success: true, message: "Registration Successful! এবার লগইন করুন। 🎉" };
//       },

//       // লগইন লজিক
//       login: (email: string, pass: string) => {
//         const users = get().allUsers || [];
//         const foundUser = users.find((u: any) => u.email === email && u.password === pass);
        
//         if (foundUser) {
//           set({ user: foundUser, isLoggedIn: true });
//           return true;
//         }
//         return false;
//       },

//       logout: () => set({ user: null, isLoggedIn: false }),
//     }),
//     {
//       name: "auth-storage", 
//     }
//   )
// );

// import { create } from "zustand";
// import { persist, devtools } from "zustand/middleware"; // devtools যোগ করা হয়েছে

// interface AuthState {
//   allUsers: any[];
//   user: any | null;
//   isLoggedIn: boolean;
//   register: (newUser: any) => { success: boolean; message: string };
//   login: (email: string, pass: string) => boolean;
//   logout: () => void;
// }

// export const useAuth = create<AuthState>()(
//   devtools( // DevTools দিয়ে আপনি ব্রাউজার এক্সটেনশনে স্টেট দেখতে পারবেন
//     persist(
//       (set, get) => ({
//         allUsers: [], 
//         user: null,
//         isLoggedIn: false,

//         // রেজিস্ট্রেশন লজিক
//         register: (newUser: any) => {
//           const users = get().allUsers || [];
//           const exists = users.find((u: any) => u.email === newUser.email);
          
//           if (exists) {
//             console.log("Registration Failed: User already exists");
//             return { success: false, message: "এই ইমেইল দিয়ে অলরেডি অ্যাকাউন্ট আছে! 📧" };
//           }

//           const updatedUsers = [...users, newUser];
//           set({ allUsers: updatedUsers });
          
//           console.log("✅ New User Registered:", newUser);
//           console.log("📊 Total Users in Store:", updatedUsers);
          
//           return { success: true, message: "Registration Successful! এবার লগইন করুন। 🎉" };
//         },

//         // লগইন লজিক
//         login: (email: string, pass: string) => {
//           const users = get().allUsers || [];
//           const foundUser = users.find((u: any) => u.email === email && u.password === pass);
          
//           if (foundUser) {
//             set({ user: foundUser, isLoggedIn: true });
//             console.log("🔑 Login Successful! Current User:", foundUser);
//             return true;
//           }
          
//           console.log("❌ Login Failed: Incorrect email or password");
//           return false;
//         },

//         // লগআউট লজিক
//         logout: () => {
//           set({ user: null, isLoggedIn: false });
//           console.log("🚪 User Logged Out");
//         },
//       }),
//       {
//         name: "auth-storage", // LocalStorage name
//       }
//     )
//   )
// );
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import API from "@/app/lib/api";

// ইউজারের ডাটা টাইপ
interface User {
  _id?: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

// অথেনটিকেশন স্টেটের টাইপ
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        // --- ইনিশিয়াল স্টেট ---
        user: null,
        isLoggedIn: false,
        loading: false,
        error: null,

        // --- লগইন ফাংশন ---
        login: async (email, password) => {
          set({ loading: true, error: null });

          try {
            const response = await API.post("/auth/login", { email, password });
            const { token, user, success, message } = response.data;

            if (success && token) {
              // ব্রাউজারের লোকাল স্টোরেজে টোকেন রাখা (Axios Interceptor এর জন্য)
              localStorage.setItem("token", token);
              
              set({
                user,
                isLoggedIn: true,
                loading: false,
                error: null,
              });

              return { success: true };
            } else {
              const failMsg = message || "লগইন ব্যর্থ হয়েছে";
              set({ error: failMsg, loading: false });
              return { success: false, message: failMsg };
            }
          } catch (err: any) {
            const errorMsg = err.response?.data?.message || 
                            (err.message === "Network Error" ? "সার্ভার কানেকশন এরর" : "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");

            set({ error: errorMsg, loading: false });
            return { success: false, message: errorMsg };
          }
        },

        // --- লগআউট ফাংশন ---
        logout: () => {
          localStorage.removeItem("token");
          // স্টেট রিসেট করা
          set({ user: null, isLoggedIn: false, error: null });
          console.log("🚪 User Logged Out");
        },

        // --- অথেনটিকেশন চেক (পেজ রিফ্রেশ দিলে ইউজার ডাটা ফিরে পেতে) ---
        checkAuth: async () => {
          const token = localStorage.getItem("token");
          
          if (!token) {
            set({ isLoggedIn: false, user: null });
            return;
          }

          try {
            // ব্যাকেন্ড থেকে ইউজারের কারেন্ট ডাটা নিয়ে আসা
            const response = await API.get("/auth/me"); 
            set({ 
              user: response.data.user || response.data, 
              isLoggedIn: true 
            });
          } catch (err) {
            console.log("Session expired or invalid token");
            localStorage.removeItem("token");
            set({ user: null, isLoggedIn: false });
          }
        },
      }),
      {
        name: "auth-storage", // LocalStorage কী (Key) নাম
        // আমরা শুধু ইউজার এবং লগইন স্ট্যাটাস সেভ রাখবো
        partialize: (state) => ({ 
          user: state.user, 
          isLoggedIn: state.isLoggedIn 
        }),
      }
    )
  )
);