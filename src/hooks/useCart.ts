import { Product } from "@/payload-types";
import { create, createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product: Product;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => {
      return {
        items: [],
        addItem: (product: Product) =>
          set((state) => {
            return {
              items: [...state.items, { product }],
            };
          }),
        removeItem: (productId: string) =>
          set((state) => {
            return {
              items: state.items.filter(
                (item) => item.product.id !== productId
              ),
            };
          }),
        clearCart: () => set({ items: [] }),
      };
    },
    {
      name: "cartStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
