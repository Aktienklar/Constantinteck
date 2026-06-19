"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/store/use-cart";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { lines, totalCents, setQuantity, removeItem, items } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
        alert(data.error ?? "Checkout konnte nicht gestartet werden.");
      }
    } catch {
      setLoading(false);
      alert("Checkout konnte nicht gestartet werden.");
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Dein Warenkorb ist leer
        </h1>
        <p className="mt-3 text-sm text-muted">
          Schau dich im Shop um und finde dein nächstes Lieblingsrezept.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-berry px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-berry-light"
        >
          Zum Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Warenkorb</h1>

      <div className="mt-8 divide-y divide-border">
        {lines.map(({ product, quantity }) => (
          <div key={product.slug} className="flex items-center gap-4 py-5">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-surface">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{product.name}</p>
              <p className="mt-1 text-xs text-muted">
                {formatPrice(product.priceCents)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(product.slug, quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-sm hover:border-lime hover:text-lime"
              >
                −
              </button>
              <span className="w-6 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(product.slug, quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-sm hover:border-lime hover:text-lime"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeItem(product.slug)}
              className="ml-2 text-xs text-muted hover:text-berry-light"
            >
              Entfernen
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <span className="text-sm text-muted">Gesamt</span>
        <span className="text-lg font-semibold text-lime">
          {formatPrice(totalCents)}
        </span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 w-full rounded-full bg-berry px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-berry-light disabled:opacity-60"
      >
        {loading ? "Weiterleitung…" : "Zur Kasse"}
      </button>
    </div>
  );
}
