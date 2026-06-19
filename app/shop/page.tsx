import { Metadata } from "next";
import { getProducts, getCategories } from "@/data/products";
import ShopGrid from "@/components/ShopGrid";

export const metadata: Metadata = {
  title: "Shop — constantinteck",
  description: "Alle E-Books und Produkte von constantinteck.",
};

export default function ShopPage() {
  const products = getProducts();
  const categories = getCategories().map((c) => c.value);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Shop</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Alle E-Books zum direkten Download. Mehr Produktkategorien folgen
        bald.
      </p>

      <div className="mt-10">
        <ShopGrid products={products} categories={categories} />
      </div>
    </div>
  );
}
