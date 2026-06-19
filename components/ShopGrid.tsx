"use client";

import { useState } from "react";
import { Product, ProductCategory } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { categoryLabels } from "@/data/products";

export default function ShopGrid({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  const [active, setActive] = useState<ProductCategory | "all">("all");

  const filtered =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            active === "all"
              ? "bg-berry text-white"
              : "border border-border text-muted hover:text-foreground"
          }`}
        >
          Alle
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              active === cat
                ? "bg-berry text-white"
                : "border border-border text-muted hover:text-foreground"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted">
          Keine Produkte in dieser Kategorie.
        </p>
      )}
    </div>
  );
}
