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

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware"; // devtools যোগ করা হয়েছে

interface AuthState {
  allUsers: any[];
  user: any | null;
  isLoggedIn: boolean;
  register: (newUser: any) => { success: boolean; message: string };
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  devtools( // DevTools দিয়ে আপনি ব্রাউজার এক্সটেনশনে স্টেট দেখতে পারবেন
    persist(
      (set, get) => ({
        allUsers: [], 
        user: null,
        isLoggedIn: false,

        // রেজিস্ট্রেশন লজিক
        register: (newUser: any) => {
          const users = get().allUsers || [];
          const exists = users.find((u: any) => u.email === newUser.email);
          
          if (exists) {
            console.log("Registration Failed: User already exists");
            return { success: false, message: "এই ইমেইল দিয়ে অলরেডি অ্যাকাউন্ট আছে! 📧" };
          }

          const updatedUsers = [...users, newUser];
          set({ allUsers: updatedUsers });
          
          console.log("✅ New User Registered:", newUser);
          console.log("📊 Total Users in Store:", updatedUsers);
          
          return { success: true, message: "Registration Successful! এবার লগইন করুন। 🎉" };
        },

        // লগইন লজিক
        login: (email: string, pass: string) => {
          const users = get().allUsers || [];
          const foundUser = users.find((u: any) => u.email === email && u.password === pass);
          
          if (foundUser) {
            set({ user: foundUser, isLoggedIn: true });
            console.log("🔑 Login Successful! Current User:", foundUser);
            return true;
          }
          
          console.log("❌ Login Failed: Incorrect email or password");
          return false;
        },

        // লগআউট লজিক
        logout: () => {
          set({ user: null, isLoggedIn: false });
          console.log("🚪 User Logged Out");
        },
      }),
      {
        name: "auth-storage", // LocalStorage name
      }
    )
  )
);