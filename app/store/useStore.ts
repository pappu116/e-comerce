// @ts-nocheck
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      cart: [], // তোমার বর্তমান কার্ট
      orders: [], // যেখানে সাকসেসফুল অর্ডার সেভ হবে

      // অর্ডার সেভ করার ফাংশন
      addOrder: (newOrder) => set((state) => ({
        orders: [...state.orders, newOrder],
        cart: [], // অর্ডার সেভ হয়ে গেলে কার্ট খালি করে দেওয়া
      })),

      // কার্টে প্রোডাক্ট অ্যাড করার ফাংশন (আগে থেকেই হয়তো আছে)
      addToCart: (product) => set((state) => ({
        cart: [...state.cart, product]
      })),
    }),
    {
      name: 'local-store', // এই নামে ব্রাউজারের LocalStorage-এ সেভ হবে
    }
  )
);

export default useStore;
