// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useState } from "react";
// import { User, Mail, Lock, Phone } from "lucide-react"; // Icons for input

// const InputField = ({ type, placeholder, icon: Icon, value, onChange }: any) => (
//   <motion.div
//     whileFocus={{ scale: 1.01 }}
//     className="relative w-full mb-4 group"
//   >
//     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">
//       <Icon size={20} />
//     </div>
//     <input
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none 
//                  transition-all placeholder:text-slate-500 
//                  focus:border-indigo-500 focus:bg-white/10 focus:ring-4 focus:ring-indigo-500/10"
//       required
//     />
//   </motion.div>
// );

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Oops! Password mile nai. Mathar tar abar chire jabe to!");
//       return;
//     }
//     console.log("Registering:", formData);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] p-6 relative overflow-hidden">
      
//       {/* Background Glows */}
//       <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="relative w-full max-w-lg p-8 md:p-12 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl"
//       >
//         {/* Top Accent Line */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-b-full shadow-[0_0_20px_rgba(99,102,241,0.5)]" />

//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-black text-white tracking-tight mb-3">
//             Join the <span className="text-indigo-500">Squad</span>
//           </h1>
//           <p className="text-slate-400">Create your account to start shopping</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-2">
//           <InputField
//             type="text"
//             placeholder="Full Name"
//             icon={User}
//             value={formData.name}
//             onChange={(e: any) => setFormData({...formData, name: e.target.value})}
//           />
//           <InputField
//             type="email"
//             placeholder="Email Address"
//             icon={Mail}
//             value={formData.email}
//             onChange={(e: any) => setFormData({...formData, email: e.target.value})}
//           />
//           <InputField
//             type="password"
//             placeholder="Create Password"
//             icon={Lock}
//             value={formData.password}
//             onChange={(e: any) => setFormData({...formData, password: e.target.value})}
//           />
//           <InputField
//             type="password"
//             placeholder="Confirm Password"
//             icon={Lock}
//             value={formData.confirmPassword}
//             onChange={(e: any) => setFormData({...formData, confirmPassword: e.target.value})}
//           />

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/30"
//           >
//             Create Account
//           </motion.button>
//         </form>

//         <p className="text-center mt-8 text-slate-400 text-sm">
//           Already have an account?{" "}
//           <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4">
//             Sign In
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { User, Mail, Lock } from "lucide-react"; 
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/store/useAuth";

// Reusable Input Component
const InputField = ({ type, placeholder, icon: Icon, value, onChange }: any) => (
  <motion.div whileFocus={{ scale: 1.01 }} className="relative w-full mb-4 group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">
      <Icon size={20} />
    </div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none transition-all placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white/10 focus:ring-4 focus:ring-indigo-500/10"
      required
    />
  </motion.div>
);

export default function RegisterPage() {
  const router = useRouter();
  // স্টোর থেকে সরাসরি register ফাংশনটি নেওয়া হচ্ছে
  const registerAction = useAuth((state: any) => state.register);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ১. পাসওয়ার্ড ম্যাচিং চেক
    if (formData.password !== formData.confirmPassword) {
      alert("Oops! Password mile nai. Mathar tar abar chire jabe to! 🤯");
      return;
    }

    // ২. স্টোরে ডাটা সেভ করা
    const result = registerAction({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    // ৩. রেজাল্ট অনুযায়ী রেসপন্স
    if (result.success) {
      alert(result.message);
      router.push("/login"); // সফল হলে লগইন পেজে পাঠিয়ে দিবে
    } else {
      alert(result.message); // ইমেইল অলরেডি থাকলে এরর দেখাবে
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] p-6 relative overflow-hidden">
      
      {/* Background Glows (ডিজাইন সুন্দর করার জন্য) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-lg p-8 md:p-12 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl"
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-b-full shadow-[0_0_20px_rgba(99,102,241,0.5)]" />

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white tracking-tight mb-3">
            Join the <span className="text-indigo-500">Squad</span>
          </h1>
          <p className="text-slate-400 font-medium">Create your account to start shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <InputField
            type="text"
            placeholder="Full Name"
            icon={User}
            value={formData.name}
            onChange={(e: any) => setFormData({...formData, name: e.target.value})}
          />
          <InputField
            type="email"
            placeholder="Email Address"
            icon={Mail}
            value={formData.email}
            onChange={(e: any) => setFormData({...formData, email: e.target.value})}
          />
          <InputField
            type="password"
            placeholder="Create Password"
            icon={Lock}
            value={formData.password}
            onChange={(e: any) => setFormData({...formData, password: e.target.value})}
          />
          <InputField
            type="password"
            placeholder="Confirm Password"
            icon={Lock}
            value={formData.confirmPassword}
            onChange={(e: any) => setFormData({...formData, confirmPassword: e.target.value})}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/30"
          >
            Create Account
          </motion.button>
        </form>

        <p className="text-center mt-8 text-slate-400 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}