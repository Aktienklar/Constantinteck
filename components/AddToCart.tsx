"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/store/use-cart";
import { Product } from "@/lib/types";

export default function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleAdd() {
    addItem(product.slug);
    setAdding(true);
    setTimeout(() => setAdding(false), 1500);
  }

  async function handleBuyNow() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ slug: product.slug, quantity: 1 }] }),
      });
      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      } else {
        setLoading(false);
        alert(data.error ?? "Checkout konnte nicht gestartet werden.");
      }
    } catch {
      setLoading(false);
      alert("Checkout konnte nicht gestartet werden.");
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handleBuyNow}
        disabled={loading}
        className="flex-1 rounded-full bg-berry px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-berry-light disabled:opacity-60"
      >
        {loading ? "Weiterleitung…" : "Jetzt kaufen"}
      </button>
      <button
        onClick={handleAdd}
        className="flex-1 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-lime hover:text-lime"
      >
        {adding ? "Hinzugefügt ✓" : "In den Warenkorb"}
      </button>
    </div>
  );
}
