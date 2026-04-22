"use client";
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";
import DataTable from "../components/DataTable";
import ProductModal from "../components/ProductModal";
import { adminProductService, getImageUrl, productService } from "@/app/lib/apiClient";

type Product = {
  _id: string;
  id?: string;
  name: string;
  category: string;
  price: string;
  costPrice?: string;
  stock: number;
  status: string;
  description?: string;
  image?: string;
  images?: string[];
};

type PaginationState = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

const PAGE_SIZES = [10, 50, 100] as const;

export default function ProductsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await adminProductService.getAll({
        page,
        limit,
        search: search || undefined,
      });

      const rows = Array.isArray(response?.products)
        ? response.products.map((row: any) => ({
            ...row,
            id: row._id,
            price: String(row?.price ?? ""),
            costPrice: String(row?.costPrice ?? ""),
            status: row?.status || (Number(row?.stock || 0) > 0 ? "In Stock" : "Out of Stock"),
          }))
        : Array.isArray(response)
          ? response.map((row: any) => ({
              ...row,
              id: row._id,
              price: String(row?.price ?? ""),
              costPrice: String(row?.costPrice ?? ""),
              status: row?.status || (Number(row?.stock || 0) > 0 ? "In Stock" : "Out of Stock"),
            }))
          : [];
      const total = Number(response?.total || rows.length || 0);
      const totalPages = Math.max(1, Number(response?.pages || Math.ceil(total / limit) || 1));
      const currentPage = Math.min(Math.max(Number(response?.page || page) || page, 1), totalPages);

      setProducts(rows);
      setPagination({
        page: currentPage,
        limit: Number(limit),
        total,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
      setPagination({
        page: 1,
        limit,
        total: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      });
    } finally {
      setLoading(false);
    }
  }, [limit, page, search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const columns = useMemo(
    () => [
      {
        key: "images",
        label: "Image",
        render: (images: string[]) => (
          <div className="h-12 w-12 overflow-hidden rounded-xl border bg-gray-100 shadow-sm dark:border-white/10">
            <img
              src={getImageUrl(images?.[0])}
              alt="product"
              className="h-full w-full object-cover"
              onError={(event) => {
                const image = event.currentTarget as HTMLImageElement;
                image.src = "/no-image.png";
                image.onerror = null;
              }}
            />
          </div>
        ),
      },
      {
        key: "_id",
        label: "ID",
        render: (id: string) => (
          <span className="font-mono text-[10px] text-gray-400">#{id?.slice(-6).toUpperCase()}</span>
        ),
      },
      { key: "name", label: "Product Name" },
      { key: "category", label: "Category" },
      {
        key: "price",
        label: "Price",
        render: (price: string) => (
          <span className="font-bold text-gray-900 dark:text-white">Tk {Number(price || 0).toLocaleString()}</span>
        ),
      },
      {
        key: "stock",
        label: "Stock",
        render: (stock: number) => (
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              stock < 10 ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"
            }`}
          >
            {stock} in stock
          </span>
        ),
      },
    ],
    []
  );

  const handleSaveProduct = async (formData: FormData) => {
    try {
      setIsSaving(true);
      let response;

      if (editingProduct) {
        response = await productService.update(editingProduct._id, formData);
      } else {
        response = await productService.create(formData);
      }

      if (response?.success) {
        setIsModalOpen(false);
        setEditingProduct(null);
        await fetchProducts();
      }
    } catch (error: any) {
      console.error("Save Error:", error);
      const message = error?.response?.data?.message || error?.message || "Failed to save product";
      alert(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    try {
      const response = await productService.delete(product._id);
      if (!response?.success) return;

      if (products.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await fetchProducts();
      }
    } catch {
      alert("Could not delete product!");
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-[1400px] space-y-8 p-4 md:p-8">
      <div className="flex flex-col gap-6 rounded-[2.5rem] border bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">Products</h1>
          <p className="mt-1 text-xs font-medium uppercase tracking-widest text-gray-500">
            Inventory Management System
          </p>
        </div>

        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          disabled={loading || isSaving}
          className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white shadow-xl shadow-blue-500/20 transition-all active:scale-95 hover:bg-blue-700 disabled:bg-gray-300"
        >
          {isSaving ? <Loader2 className="animate-spin" size={22} /> : <Plus size={22} strokeWidth={3} />}
          Add Product
        </button>
      </div>

      <div className="group relative">
        <input
          type="text"
          placeholder="Search by product name or unique ID..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="w-full rounded-[2rem] border-2 border-gray-100 bg-white py-5 pl-14 text-sm shadow-sm transition-all group-hover:border-gray-200 focus:border-blue-500 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:group-hover:border-gray-700"
        />
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-blue-500" size={20} />
      </div>

      <DataTable
        title={`Store Inventory (${pagination.total})`}
        data={products}
        columns={columns}
        loading={loading}
        emptyMessage="No products found."
        onEdit={(product: Product) => {
          setEditingProduct(product);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
        pagination={{
          ...pagination,
          pageSizeOptions: PAGE_SIZES,
          onPageChange: (nextPage) => setPage(nextPage),
          onPageSizeChange: (size) => {
            setLimit(size);
            setPage(1);
          },
        }}
      />

      {isModalOpen ? (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          product={editingProduct}
          onSave={handleSaveProduct}
          isLoading={isSaving}
        />
      ) : null}
    </div>
  );
}
