import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  wishlist: any[];
  addToWishlist: (product: any) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      wishlist: [],

      // উইশলিস্টে যোগ করা
      addToWishlist: (product) => set((state) => {
        const exists = state.wishlist.find((item) => item.id === product.id);
        if (exists) return state; // অলরেডি থাকলে আর যোগ হবে না
        return { wishlist: [...state.wishlist, product] };
      }),

      // রিমুভ করা
      removeFromWishlist: (id) => set((state) => ({
        wishlist: state.wishlist.filter((item) => item.id !== id),
      })),

      clearWishlist: () => set({ wishlist: [] }),
    }),
    { name: "wishlist-storage" } // LocalStorage key
  )
);