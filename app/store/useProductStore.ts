import { create } from "zustand";
import API from "@/app/lib/api";

export const useProductStore = create((set) => ({
  products: [],

  fetchProducts: async () => {
    try {
      const { data } = await API.get("/products");
      set({ products: data.products });
    } catch (error) {
      console.log(error);
    }
  },
}));
