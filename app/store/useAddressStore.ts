import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  id: string;
  type: "Home" | "Office";
  isDefault: boolean;
  title: string;
  addressLine: string;
  phone: string;
  zipCode?: string;
}

interface AddressState {
  addresses: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (id: string, updatedAddress: Address) => void;
  deleteAddress: (id: string) => void;
  setDefault: (id: string) => void;
}

const normalizeDefault = (addresses: Address[]): Address[] => {
  if (addresses.length === 0) return [];
  const hasDefault = addresses.some((address) => address.isDefault);
  if (hasDefault) return addresses;
  return addresses.map((address, index) => ({ ...address, isDefault: index === 0 }));
};

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: [],

      addAddress: (address) =>
        set((state) => {
          const willBeDefault = state.addresses.length === 0 || address.isDefault;
          const next = [
            ...state.addresses.map((item) =>
              willBeDefault ? { ...item, isDefault: false } : item
            ),
            { ...address, isDefault: willBeDefault },
          ];
          return { addresses: normalizeDefault(next) };
        }),

      updateAddress: (id, updatedAddress) =>
        set((state) => {
          const next = state.addresses.map((addr) => (addr.id === id ? { ...updatedAddress, id } : addr));
          return { addresses: normalizeDefault(next) };
        }),

      deleteAddress: (id) =>
        set((state) => {
          const next = state.addresses.filter((addr) => addr.id !== id);
          return { addresses: normalizeDefault(next) };
        }),

      setDefault: (id) =>
        set((state) => {
          const next = state.addresses.map((addr) => ({
            ...addr,
            isDefault: addr.id === id,
          }));
          return { addresses: normalizeDefault(next) };
        }),
    }),
    { name: "address-storage" }
  )
);
