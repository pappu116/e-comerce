// // app/store/useCart.ts
// import { create } from 'zustand'

// export const useCart = create((set) => ({
//   items: [],
//   addToCart: (product: any) => set((state: any) => {
//     // চেক করা হচ্ছে প্রোডাক্টটি আগে থেকেই কার্টে আছে কি না
//     const existingItem = state.items.find((item: any) => item.id === product.id);
    
//     if (existingItem) {
//       return {
//         items: state.items.map((item: any) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         ),
//       };
//     }
//     // নতুন হলে কার্টে যোগ হবে
//     return { items: [...state.items, { ...product, quantity: 1 }] };
    
//   }),
// }));

// import { create } from 'zustand'

// export const useCart = create((set) => ({
//   items: [],

//   // ১. কার্টে প্রোডাক্ট যোগ করা (তোমার কোডটিই এখানে আছে)
//   addToCart: (product: any) => set((state: any) => {
//     const existingItem = state.items.find((item: any) => item.id === product.id);
    
//     if (existingItem) {
//       return {
//         items: state.items.map((item: any) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         ),
//       };
//     }
//     return { items: [...state.items, { ...product, quantity: 1 }] };
//   }),

//   // ২. কার্ট থেকে কোয়ান্টিটি বাড়ানো (+)
//   increase: (id: string) => set((state: any) => ({
//     items: state.items.map((item: any) =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     ),
//   })),

//   // ৩. কার্ট থেকে কোয়ান্টিটি কমানো (-)
//   decrease: (id: string) => set((state: any) => ({
//     items: state.items.map((item: any) =>
//       item.id === id && item.quantity > 1 
//         ? { ...item, quantity: item.quantity - 1 } 
//         : item
//     ),
//   })),

//   // ৪. কার্ট থেকে পুরোপুরি রিমুভ করা (Trash Icon এর জন্য)
//   removeFromCart: (id: string) => set((state: any) => ({
//     items: state.items.filter((item: any) => item.id !== id)
//   })),
// }));

import { create } from 'zustand'
import { persist } from 'zustand/middleware' // ১. পারসিস্ট ইমপোর্ট করো

export const useCart = create(
  persist(
    (set) => ({
      items: [],
      orders: [], // অর্ডার সেভ করার জন্য আলাদা অ্যারে

      // কার্টে প্রোডাক্ট যোগ করা
      addToCart: (product: any) => set((state: any) => {
        const existingItem = state.items.find((item: any) => item.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map((item: any) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }),

      // ২. কার্ট থেকে কোয়ান্টিটি বাড়ানো (+)
      increase: (id: string) => set((state: any) => ({
        items: state.items.map((item: any) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      })),

      // ৩. কার্ট থেকে কোয়ান্টিটি কমানো (-)
      decrease: (id: string) => set((state: any) => ({
        items: state.items.map((item: any) =>
          item.id === id && item.quantity > 1 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        ),
      })),

      // ৪. কার্ট থেকে পুরোপুরি রিমুভ করা
      removeFromCart: (id: string) => set((state: any) => ({
        items: state.items.filter((item: any) => item.id !== id)
      })),

      // ৫. অর্ডার সেভ করা এবং কার্ট খালি করা (এটি তোমার দরকার ছিল)
      completeOrder: (newOrder: any) => set((state: any) => ({
        orders: [...state.orders, newOrder], // অর্ডার হিস্ট্রিতে যোগ হবে
        items: [] // কার্ট খালি হয়ে যাবে
      })),

      // শুধু কার্ট খালি করার জন্য আলাদা ফাংশন (অপশনাল)
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'shopping-cart-storage', // ব্রাউজারের LocalStorage এ এই নামে সেভ হবে
    }
  )
);