"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/store/useAuth";

// ================== InputField Component ==================
const InputField = ({ type, placeholder, value, onChange }: any) => (
  <motion.div whileFocus={{ scale: 1.02 }} className="relative w-full mb-4 group">
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white outline-none 
                 transition-all placeholder:text-slate-500 
                 focus:border-blue-500 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20"
      required
    />
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity blur-md pointer-events-none" />
  </motion.div>
);

// ================== Main Login Page ==================
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginAction = useAuth((state: any) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const result = await loginAction(email, password);

    if (result.success) {
      // একটু সময় দিয়ে store আপডেট হতে দাও
      await new Promise(resolve => setTimeout(resolve, 100));

      const currentUser = useAuth.getState().user;

      if (!currentUser) {
        setError("User data not found after login");
        return;
      }

      console.log("✅ Login successful - Role:", currentUser.role);

      const redirectPath = currentUser.role === "admin" ? "/admin" : "/profile";

      router.replace(redirectPath);   // replace ব্যবহার করা হয়েছে
    } else {
      setError(result.message || "Login failed");
    }
  } catch (err: any) {
    console.error("Login error:", err);
    setError("লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-6 relative overflow-hidden">
      
      {/* Background Animated Blobs */}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 15, repeat: Infinity }} className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[100px] pointer-events-none opacity-40" />
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 18, repeat: Infinity }} className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[100px] pointer-events-none opacity-40" />

      {/* Glassmorphism Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md p-10 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl"
      >
        <div className="absolute top-0 left-10 right-10 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-[0_0_15px_#3b82f6]" />

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tighter mb-2">
            Welcome <span className="text-blue-400">Back</span>
          </h1>
          <p className="text-slate-400">Log in to your account and explore</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <InputField
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mb-4 w-full text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-all shadow-lg"
          >
            {loading ? "Signing In..." : "Sign In"}
          </motion.button>
        </form>

        <div className="text-center mt-10">
          <p className="text-slate-400 text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-purple-400 hover:text-purple-300 font-medium">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>

      <p className="text-slate-600 text-xs mt-10">
        &copy; 2026 YourAwesomeApp. All rights reserved.
      </p>
    </div>
  );
}