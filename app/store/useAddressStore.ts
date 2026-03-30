import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  id: string;
  type: "Home" | "Office";
  isDefault: boolean;
  title: string;
  addressLine: string;
  phone: string;
}

interface AddressState {
  addresses: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (id: string, updatedAddress: Address) => void;
  deleteAddress: (id: string) => void;
  setDefault: (id: string) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: [
        {
          id: "1",
          type: "Home",
          isDefault: true,
          title: "Dhanmondi, Dhaka",
          addressLine: "House #12/A, Road #05, Dhanmondi R/A, Dhaka 1209",
          phone: "+880 1711-223344",
        },
      ],

      addAddress: (address) => set((state) => ({ 
        addresses: [...state.addresses, address] 
      })),

      updateAddress: (id, updatedAddress) => set((state) => ({
        addresses: state.addresses.map((addr) => (addr.id === id ? updatedAddress : addr)),
      })),

      deleteAddress: (id) => set((state) => ({
        addresses: state.addresses.filter((addr) => addr.id !== id),
      })),

      setDefault: (id) => set((state) => ({
        addresses: state.addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === id,
        })),
      })),
    }),
    { name: "address-storage" }
  )
);