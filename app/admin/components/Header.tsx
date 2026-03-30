// src/app/admin/components/Header.tsx
'use client';
import { Search, Moon, Sun, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Header({ isDark, setIsDark, setIsMobileOpen }: HeaderProps) {
  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
        >
          <Menu size={24} />
        </button>
        
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white capitalize">
          Admin Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative w-80 hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by Order ID or Product name..."
            className="w-full bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 pl-11 py-2.5 rounded-2xl text-sm focus:outline-none"
          />
        </div>

        {/* Dark Mode */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notification */}
        <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">3</span>
        </button>

        {/* Profile */}
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-semibold cursor-pointer hover:ring-2 hover:ring-blue-300">
          CP
        </div>
      </div>
    </header>
  );
}