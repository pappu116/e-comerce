import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartService } from "@/app/lib/apiClient";

export interface CartItem {
  _id: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  images: string[];
  category?: string;
  stock?: number;
}

interface CartStore {
  items: CartItem[];
  orders: any[];
  hydrateCart: () => Promise<void>;
  addToCart: (product: any, quantity?: number) => Promise<void>;
  increase: (id: string) => Promise<void>;
  decrease: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  completeOrder: (newOrder: any) => void;
}

const isBrowser = () => typeof window !== "undefined";
const hasToken = () => isBrowser() && Boolean(localStorage.getItem("token"));

const getItemId = (item: any) =>
  String(item?._id || item?.id || item?.product?._id || item?.product?.id || "");

const normalizeProduct = (raw: any): CartItem | null => {
  const id = getItemId(raw);
  if (!id) return null;

  const product = raw?.product || raw;
  const image = product?.image || product?.images?.[0] || raw?.image || raw?.images?.[0] || "";
  const price =
    Number(raw?.price ?? product?.price ?? product?.discountPrice ?? 0) || 0;
  const quantity = Number(raw?.quantity ?? 1) || 1;

  return {
    _id: id,
    id,
    name: product?.name || "Product",
    price,
    quantity,
    image,
    images: Array.isArray(product?.images)
      ? product.images
      : image
        ? [image]
        : [],
    category: product?.category,
    stock: Number(product?.stock ?? 0) || 0,
  };
};

const normalizeBackendCart = (cart: any): CartItem[] => {
  const list = Array.isArray(cart?.items) ? cart.items : [];
  return list
    .map((entry: any) => normalizeProduct(entry))
    .filter(Boolean) as CartItem[];
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      orders: [],

      hydrateCart: async () => {
        if (!hasToken()) return;
        try {
          const data = await cartService.get();
          set({ items: normalizeBackendCart(data?.cart) });
        } catch {
          // Keep local cart if remote cart is unavailable.
        }
      },

      addToCart: async (product, quantity = 1) => {
        const normalized = normalizeProduct({ ...product, quantity });
        if (!normalized) return;

        set((state) => {
          const index = state.items.findIndex((item) => item.id === normalized.id);
          if (index < 0) {
            return { items: [...state.items, normalized] };
          }

          const next = [...state.items];
          next[index] = {
            ...next[index],
            quantity: next[index].quantity + quantity,
          };
          return { items: next };
        });

        if (!hasToken()) return;
        try {
          const data = await cartService.add(normalized.id, quantity);
          if (data?.cart) {
            set({ items: normalizeBackendCart(data.cart) });
          }
        } catch {
          // Keep optimistic local state.
        }
      },

      increase: async (id) => {
        const item = get().items.find((entry) => entry.id === id);
        if (!item) return;
        await get().updateQuantity(id, item.quantity + 1);
      },

      decrease: async (id) => {
        const item = get().items.find((entry) => entry.id === id);
        if (!item) return;
        if (item.quantity <= 1) {
          await get().removeFromCart(id);
          return;
        }
        await get().updateQuantity(id, item.quantity - 1);
      },

      updateQuantity: async (id, quantity) => {
        const nextQty = Math.max(1, Number(quantity) || 1);
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: nextQty } : item
          ),
        }));

        if (!hasToken()) return;
        try {
          const data = await cartService.update(id, nextQty);
          if (data?.cart) {
            set({ items: normalizeBackendCart(data.cart) });
          }
        } catch {
          // Keep optimistic local state.
        }
      },

      removeFromCart: async (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));

        if (!hasToken()) return;
        try {
          const data = await cartService.remove(id);
          if (data?.cart) {
            set({ items: normalizeBackendCart(data.cart) });
          }
        } catch {
          // Keep optimistic local state.
        }
      },

      clearCart: async () => {
        set({ items: [] });
        if (!hasToken()) return;
        try {
          await cartService.clear();
        } catch {
          // Cart is already cleared locally.
        }
      },

      completeOrder: (newOrder) =>
        set((state) => ({
          orders: [newOrder, ...state.orders],
          items: [],
        })),
    }),
    {
      name: "shopping-cart-storage",
      partialize: (state) => ({
        items: state.items,
        orders: state.orders,
      }),
    }
  )
);

