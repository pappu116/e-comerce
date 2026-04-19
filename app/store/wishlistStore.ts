import { create } from "zustand";
import { persist } from "zustand/middleware";
import { wishlistService } from "@/app/lib/apiClient";

export interface WishlistItem {
  _id: string;
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  rating?: number;
  image: string;
  images: string[];
  category?: string;
  stock?: number;
}

interface WishlistState {
  wishlist: WishlistItem[];
  hydrateWishlist: () => Promise<void>;
  addToWishlist: (product: any) => Promise<void>;
  removeFromWishlist: (id: string) => Promise<void>;
  clearWishlist: () => void;
}

const isBrowser = () => typeof window !== "undefined";
const hasToken = () => isBrowser() && Boolean(localStorage.getItem("token"));

const getProductId = (item: any) =>
  String(item?._id || item?.id || item?.product?._id || item?.product?.id || "");

const normalizeWishlistItem = (raw: any): WishlistItem | null => {
  const id = getProductId(raw);
  if (!id) return null;

  const source = raw?.product || raw;
  const image = source?.image || source?.images?.[0] || "";

  return {
    _id: id,
    id,
    name: source?.name || "Product",
    price: Number(source?.price || 0),
    discountPrice: Number(source?.discountPrice || 0) || undefined,
    rating: Number(source?.rating || 0) || undefined,
    image,
    images: Array.isArray(source?.images) ? source.images : image ? [image] : [],
    category: source?.category,
    stock: Number(source?.stock || 0) || 0,
  };
};

const normalizeWishlist = (list: any[]): WishlistItem[] =>
  (Array.isArray(list) ? list : [])
    .map((entry) => normalizeWishlistItem(entry))
    .filter(Boolean) as WishlistItem[];

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      wishlist: [],

      hydrateWishlist: async () => {
        if (!hasToken()) return;
        try {
          const data = await wishlistService.getAll();
          set({ wishlist: normalizeWishlist(data?.wishlist || []) });
        } catch {
          // Keep local wishlist on failure.
        }
      },

      addToWishlist: async (product) => {
        const normalized = normalizeWishlistItem(product);
        if (!normalized) return;

        set((state) => {
          const exists = state.wishlist.some((item) => item.id === normalized.id);
          if (exists) return state;
          return { wishlist: [normalized, ...state.wishlist] };
        });

        if (!hasToken()) return;
        try {
          const data = await wishlistService.add(normalized.id);
          if (data?.wishlist) {
            set({ wishlist: normalizeWishlist(data.wishlist) });
          }
        } catch {
          // Keep optimistic local state.
        }
      },

      removeFromWishlist: async (id) => {
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== id),
        }));

        if (!hasToken()) return;
        try {
          const data = await wishlistService.remove(id);
          if (data?.wishlist) {
            set({ wishlist: normalizeWishlist(data.wishlist) });
          }
        } catch {
          // Keep optimistic local state.
        }
      },

      clearWishlist: () => {
        set({ wishlist: [] });
      },
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({ wishlist: state.wishlist }),
    }
  )
);
