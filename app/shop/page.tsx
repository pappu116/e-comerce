"use client";

import { useDeferredValue, useEffect, useMemo, useState, useTransition } from "react";
import { ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { productService } from "@/app/lib/apiClient";

type Product = {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  discountPrice?: number;
  category?: string;
  images?: string[];
};

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A-Z", value: "name_asc" },
  { label: "Name: Z-A", value: "name_desc" },
  { label: "Top Rated", value: "rating_desc" },
];

const ProductSkeleton = () => (
  <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 p-4 animate-pulse">
    <div className="aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800" />
    <div className="mt-4 h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
    <div className="mt-2 h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
  </div>
);

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const deferredSearch = useDeferredValue(searchQuery.trim());

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await productService.getAll({
          page,
          limit: 12,
          search: deferredSearch || undefined,
          category: selectedCategory !== "All" ? selectedCategory : undefined,
          sort: sortBy,
          maxPrice,
        });

        if (!isMounted) return;

        setProducts(Array.isArray(response?.products) ? response.products : []);
        setCategories(
          Array.isArray(response?.categories)
            ? ["All", ...response.categories.filter(Boolean)]
            : ["All"]
        );
        setPages(Math.max(Number(response?.pages || 1), 1));
        setTotal(Number(response?.total || 0));
      } catch (err: any) {
        if (!isMounted) return;
        setError(err?.response?.data?.message || "Failed to load products");
        setProducts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [page, deferredSearch, selectedCategory, sortBy, maxPrice]);

  const canPrev = page > 1;
  const canNext = page < pages;
  const activeSortLabel = useMemo(
    () => SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || "Newest",
    [sortBy]
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 md:py-12">
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8 font-medium">
          <span>Home</span>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <span className="text-slate-900 dark:text-slate-200 uppercase tracking-tight">Shop</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-7">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    startTransition(() => {
                      setSearchQuery(value);
                      setPage(1);
                    });
                  }}
                  placeholder="Product name..."
                  className="pl-10 h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setPage(1);
                    }}
                    className={`px-3 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-colors ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                Max Price
              </label>
              <div className="text-xs font-bold text-indigo-500">BDT {maxPrice.toLocaleString()}</div>
              <input
                type="range"
                min="100"
                max="50000"
                step="100"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setPage(1);
                }}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                Sort
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="w-full h-11 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 text-sm font-bold"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500">Selected: {activeSortLabel}</p>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <div className="text-[11px] font-black bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full uppercase tracking-widest">
                {loading ? "Loading..." : `${total} products`}
              </div>
              {(isPending || loading) && (
                <div className="text-xs font-bold text-indigo-500">Updating...</div>
              )}
            </div>

            {error ? (
              <div className="rounded-3xl border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-900/10 p-8 text-center">
                <p className="font-bold text-rose-600 dark:text-rose-400">{error}</p>
              </div>
            ) : null}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <ProductSkeleton key={`skeleton-${idx}`} />
                ))}
              </div>
            ) : products.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id || product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                <SlidersHorizontal className="h-10 w-10 text-slate-300 dark:text-slate-700 mb-3" />
                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-2">No Products Found</h3>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSortBy("newest");
                    setMaxPrice(50000);
                    setPage(1);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-3">
              <Button variant="outline" disabled={!canPrev} onClick={() => setPage((p) => p - 1)}>
                Previous
              </Button>
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                Page {page} of {pages}
              </span>
              <Button variant="outline" disabled={!canNext} onClick={() => setPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
