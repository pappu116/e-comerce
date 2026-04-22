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
  variant?: {
    key?: string;
    size?: string;
    color?: string;
    sku?: string;
    image?: string;
  } | null;
}

interface CartStore {
  items: CartItem[];
  orders: any[];
  hydrateCart: () => Promise<void>;
  mergeGuestCart: () => Promise<void>;
  addToCart: (product: any, quantity?: number) => Promise<void>;
  increase: (id: string, variantKey?: string) => Promise<void>;
  decrease: (id: string, variantKey?: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number, variantKey?: string) => Promise<void>;
  removeFromCart: (id: string, variantKey?: string) => Promise<void>;
  clearCart: () => Promise<void>;
  completeOrder: (newOrder: any) => void;
}

const isBrowser = () => typeof window !== "undefined";
const hasToken = () => isBrowser() && Boolean(localStorage.getItem("token"));

const getItemId = (item: any) =>
  String(item?._id || item?.id || item?.product?._id || item?.product?.id || "");
const getVariantKey = (item: any) => String(item?.variant?.key || "");
const lineKey = (id: string, variantKey = "") => `${String(id)}::${String(variantKey || "")}`;
const resolveVariantKey = (items: CartItem[], id: string, variantKey = "") =>
  String(variantKey || items.find((entry) => entry.id === id)?.variant?.key || "");
const validProductId = (id: string) => /^[0-9a-fA-F]{24}$/.test(String(id || ""));

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
    variant: raw?.variant || product?.variant || null,
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

      mergeGuestCart: async () => {
        if (!hasToken()) return;

        const localItems = [...get().items];
        if (!localItems.length) {
          await get().hydrateCart();
          return;
        }

        try {
          const remoteData = await cartService.get();
          const remoteItems = normalizeBackendCart(remoteData?.cart);
          const merged = new Map<
            string,
            { productId: string; quantity: number; variantKey: string }
          >();

          const pushLine = (item: any) => {
            const productId = String(getItemId(item) || "");
            if (!validProductId(productId)) return;
            const variantKey = String(getVariantKey(item) || "");
            const key = lineKey(productId, variantKey);
            const prev = merged.get(key);
            merged.set(key, {
              productId,
              variantKey,
              quantity: Math.min(99, (prev?.quantity || 0) + Math.max(1, Number(item?.quantity || 1))),
            });
          };

          remoteItems.forEach(pushLine);
          localItems.forEach(pushLine);

          await cartService.replace(Array.from(merged.values()));
          const synced = await cartService.get();
          set({ items: normalizeBackendCart(synced?.cart) });
        } catch {
          await get().hydrateCart();
        }
      },

      addToCart: async (product, quantity = 1) => {
        const normalized = normalizeProduct({ ...product, quantity });
        if (!normalized) return;
        const variantKey = getVariantKey(product);
        const target = lineKey(normalized.id, variantKey);

        set((state) => {
          const index = state.items.findIndex((item) => lineKey(item.id, getVariantKey(item)) === target);
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
          const data = await cartService.add(normalized.id, quantity, variantKey);
          if (data?.cart) {
            set({ items: normalizeBackendCart(data.cart) });
          }
        } catch {
          // Keep optimistic local state.
        }
      },

      increase: async (id, variantKey = "") => {
        const key = resolveVariantKey(get().items, id, variantKey);
        const item = get().items.find((entry) => lineKey(entry.id, getVariantKey(entry)) === lineKey(id, key));
        if (!item) return;
        await get().updateQuantity(id, item.quantity + 1, key);
      },

      decrease: async (id, variantKey = "") => {
        const key = resolveVariantKey(get().items, id, variantKey);
        const item = get().items.find((entry) => lineKey(entry.id, getVariantKey(entry)) === lineKey(id, key));
        if (!item) return;
        if (item.quantity <= 1) {
          await get().removeFromCart(id, key);
          return;
        }
        await get().updateQuantity(id, item.quantity - 1, key);
      },

      updateQuantity: async (id, quantity, variantKey = "") => {
        const nextQty = Math.max(1, Number(quantity) || 1);
        const key = resolveVariantKey(get().items, id, variantKey);
        const target = lineKey(id, key);
        set((state) => ({
          items: state.items.map((item) =>
            lineKey(item.id, getVariantKey(item)) === target ? { ...item, quantity: nextQty } : item
          ),
        }));

        if (!hasToken()) return;
        try {
          const data = await cartService.update(id, nextQty, key);
          if (data?.cart) {
            set({ items: normalizeBackendCart(data.cart) });
          }
        } catch {
          // Keep optimistic local state.
        }
      },

      removeFromCart: async (id, variantKey = "") => {
        const key = resolveVariantKey(get().items, id, variantKey);
        const target = lineKey(id, key);
        set((state) => ({
          items: state.items.filter((item) => lineKey(item.id, getVariantKey(item)) !== target),
        }));

        if (!hasToken()) return;
        try {
          const data = await cartService.remove(id, key);
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
