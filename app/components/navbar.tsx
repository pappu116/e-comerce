// "use client"

// import Link from "next/link"
// import { ShoppingCart, User } from "lucide-react" // User icon add kora hoyeche
// import { ThemeToggle } from "./theme-toggle"
// import { useCart } from "@/app/store/useCart"
// // import { useSession, signOut } from "next-auth/react" // Jodi NextAuth use koren

// export default function Navbar() {
//   const cartItemsCount = useCart((state) => state.items.length)
  
//   // Example-er jonno ekta fake login state (NextAuth thakle useSession() use korben)
//   const isLoggedIn = false; 

//   return (
//     <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
//       <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
//         {/* Logo */}
//         <Link href="/" className="text-xl font-extrabold tracking-tighter">
//           PREMIUM<span className="text-indigo-600">STORE</span>
//         </Link>

//         <div className="flex items-center gap-4 sm:gap-6">
          
//           {/* Cart Icon */}
//           <Link href="/cart" className="relative p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
//             <ShoppingCart size={22} />
//             {cartItemsCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-background">
//                 {cartItemsCount}
//               </span>
//             )}
//           </Link>

//           {/* Theme Toggle */}
//           <ThemeToggle />

//           {/* --- Login/Account Section --- */}
//           <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block" /> {/* Divider */}

//           {isLoggedIn ? (
//             <Link href="/profile" className="flex items-center gap-2 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
//                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-full flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
//                   <User size={18} />
//                </div>
//             </Link>
//           ) : (
//             <Link 
//               href="/login" 
//               className="text-sm font-semibold px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all shadow-md hover:shadow-indigo-500/20 active:scale-95"
//             >
//               Login
//             </Link>
//           )}

//         </div>
//       </div>
//     </nav>
//   )
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react"; 
import { ThemeToggle } from "./theme-toggle";
import { useCart } from "@/app/store/useCart";
import { useAuth } from "@/app/store/useAuth";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const cartItemsCount = useCart((state) => state.items.length);
  const { isLoggedIn, user, logout } = useAuth(); 
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-[100] transition-all">
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-1">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
            <span className="text-white font-black text-xl italic">P</span>
          </div>
          <span className="text-lg md:text-xl font-black tracking-tighter uppercase italic">
            PREMIUM<span className="text-indigo-600">STORE</span>
          </span>
        </Link>

        {/* Desktop Actions */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          
          {/* Cart Icon */}
          <Link 
            href="/cart" 
            className="relative p-2.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all text-foreground group"
          >
            <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
            {mounted && cartItemsCount > 0 && (
              <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-background animate-in zoom-in">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          <div className="h-6 w-[1px] bg-border hidden sm:block" />

          {/* Auth Section */}
          {mounted && (
            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <div className="flex items-center gap-2 md:gap-3">
                  <Link 
                    href="/profile" 
                    className="flex items-center gap-2 p-1 md:pr-4 bg-accent/50 hover:bg-accent rounded-full transition-all border border-border group"
                  >
                    <div className="w-8 h-8 md:w-9 md:h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                      <User size={18} />
                    </div>
                    <div className="hidden md:block leading-none">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter mb-0.5">Welcome</p>
                       <p className="text-sm font-bold text-foreground">
                        {user?.name?.split(' ')[0] || "User"}
                       </p>
                    </div>
                  </Link>

                  <button 
                    onClick={() => logout()}
                    className="p-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="hidden sm:flex items-center gap-2 text-sm font-black px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95 uppercase tracking-wider"
                >
                  Login
                </Link>
              )}
              
              {/* Mobile Menu Button (Only shown when not logged in on very small screens) */}
              {!isLoggedIn && (
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="sm:hidden p-2 text-foreground"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && !isLoggedIn && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden border-t bg-background overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <Link 
                href="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-lg"
              >
                Login to Account
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}