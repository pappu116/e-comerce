'use client';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-[#080d17]">
      
      {/* Sidebar fixed */}
      <Sidebar 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0"> 
        
        {/* Header (Jodi thake) */}
        {/* <Header /> */}

        {/* SCROLL AREA: 
          'flex-1' ebong 'overflow-y-auto' deya hoyeche jate sidebar fix thake 
          ar shudhu content area scroll hoy.
        */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* Ekhane 'w-full' use kora hoyeche jate content pura width niye thake. 
             'mx-auto' ba choto 'max-w' thakle width boro hobe na.
          */}
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}