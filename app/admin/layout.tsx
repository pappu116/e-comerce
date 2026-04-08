'use client';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminGuard from "./components/AdminGuard";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Theme persist kora
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setIsDark(false);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <AdminGuard>
    <div className="flex h-screen overflow-hidden bg-white dark:bg-[#080d17] transition-colors duration-500">
      
      {/* Sidebar */}
      <Sidebar 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative"> 
        
        {/* ================== Reverse Contrast Toggle Button ================== */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
          <motion.button
            onClick={() => setIsDark(!isDark)}
            // Hover Animation
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            
            /* IMPORTANT: 
               Light mode-e thakle (isDark false): bg-slate-900 (Dark)
               Dark mode-e thakle (isDark true): bg-white (Light)
            */
            className={`p-4 rounded-full shadow-2xl flex items-center justify-center transition-colors duration-500 border
              ${isDark 
                ? 'bg-white border-gray-200 text-slate-900' // Dark mode-e button hobe Light
                : 'bg-slate-900 border-slate-700 text-white' // Light mode-e button hobe Dark
              }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? "sun" : "moon"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? (
                  <Sun className="w-6 h-6 text-orange-500 fill-orange-500/20" />
                ) : (
                  <Moon className="w-6 h-6 text-blue-400 fill-blue-400/20" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
    </AdminGuard>
  );
}