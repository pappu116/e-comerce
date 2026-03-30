"use client";

import React, { useState, useMemo } from 'react';
import ProductCard from "../components/product-card"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ChevronRight, 
  SlidersHorizontal,
  Check,
  ChevronDown
} from "lucide-react";

// Dummy Data
const products = [
  { id: 1, name: "Minimalist Watch", price: 120, category: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400", isNew: true },
  { id: 2, name: "Wireless Earbuds", price: 80, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400", isNew: false },
  { id: 3, name: "Leather Backpack", price: 150, category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400", isNew: true },
  { id: 4, name: "Mechanical Keyboard", price: 95, category: "Tech", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400", isNew: false },
  { id: 5, name: "Smart Glasses", price: 210, category: "Tech", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=400", isNew: true },
];

const categories = ["All", "Accessories", "Electronics", "Fashion", "Tech"];
const sortOptions = [
  { label: "New Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "low" },
  { label: "Price: High to Low", value: "high" },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(300);
  const [sortBy, setSortBy] = useState("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesPrice = p.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === "low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "high") result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [searchQuery, selectedCategory, maxPrice, sortBy]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 md:py-12">
        
        {/* --- Breadcrumbs --- */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-10 font-medium">
          <span className="hover:text-blue-600 transition-colors cursor-pointer">Home</span>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <span className="text-slate-900 dark:text-slate-200 uppercase tracking-tighter">Collections</span>
        </nav>

        {/* --- Info Bar --- */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-widest hidden md:block">Shop</h2>
          <div className="text-[10px] font-black bg-slate-100 dark:bg-[#0b1120] px-4 py-1 rounded-full border border-slate-200 dark:border-slate-800 uppercase tracking-widest">
            Showing {filteredProducts.length} Results
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* --- Sidebar (Filter & Sort) --- */}
          <aside className="lg:col-span-1 space-y-10">
            
            {/* Search Section */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Find Product</label>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input 
                  placeholder="Type here..." 
                  className="pl-10 h-12 bg-slate-50 dark:bg-[#0b1120] border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Category</label>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      selectedCategory === cat 
                      ? "bg-blue-600 text-white shadow-xl shadow-blue-900/30 translate-x-1" 
                      : "bg-slate-50 dark:bg-[#0b1120] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Price Range</label>
                <span className="text-xs font-bold text-blue-500 tracking-tighter">${maxPrice}</span>
              </div>
              <input 
                type="range" min="50" max="300" step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* Custom Sort Dropdown (Fixed the issue) */}
            <div className="space-y-4 relative">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Sort By</label>
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="w-full flex items-center justify-between h-12 px-4 bg-slate-50 dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  {sortOptions.find(o => o.value === sortBy)?.label}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSortOpen && (
                  <div className="absolute top-full left-0 w-full mt-2 py-2 bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setIsSortOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        {opt.label}
                        {sortBy === opt.value && <Check className="h-3 w-3 text-blue-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* --- Product Grid --- */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((item) => (
                  <div key={item.id} className="group transition-transform duration-500 hover:-translate-y-2">
                    <ProductCard product={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 bg-slate-50/50 dark:bg-slate-900/10 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                <SlidersHorizontal className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
                <h3 className="text-sm font-black uppercase tracking-[0.2em]">No Match Found</h3>
                <Button 
                  variant="link" 
                  className="mt-2 text-blue-500 font-bold text-xs uppercase"
                  onClick={() => {setSearchQuery(""); setSelectedCategory("All"); setMaxPrice(300);}}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}