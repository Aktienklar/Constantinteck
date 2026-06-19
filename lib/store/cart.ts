import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/lib/types";

interface CartState {
  items: CartItem[];
  addItem: (slug: string, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (slug, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.slug === slug);
        if (existing) {
          set({
            items: items.map((i) =>
              i.slug === slug ? { ...i, quantity: i.quantity + quantity } : i
            ),
          });
        } else {
          set({ items: [...items, { slug, quantity }] });
        }
      },
      removeItem: (slug) => {
        set({ items: get().items.filter((i) => i.slug !== slug) });
      },
      setQuantity: (slug, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.slug !== slug) });
          return;
        }
        set({
          items: get().items.map((i) =>
            i.slug === slug ? { ...i, quantity } : i
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "constantinteck-cart" }
  )
);
