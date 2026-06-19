"use client";

import { useMemo } from "react";
import { useCartStore } from "@/lib/store/cart";
import { getProductBySlug } from "@/data/products";

export function useCart() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const clear = useCartStore((s) => s.clear);

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProductBySlug(item.slug);
          if (!product) return null;
          return { product, quantity: item.quantity };
        })
        .filter((l): l is { product: NonNullable<ReturnType<typeof getProductBySlug>>; quantity: number } => l !== null),
    [items]
  );

  const totalCents = lines.reduce(
    (sum, l) => sum + l.product.priceCents * l.quantity,
    0
  );
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, lines, totalCents, count, addItem, removeItem, setQuantity, clear };
}
