import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/data/products";
import { formatPrice } from "@/lib/format";
import AddToCart from "@/components/AddToCart";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — constantinteck`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          {product.bestseller && (
            <span className="absolute left-4 top-4 rounded-full bg-orange px-3 py-1 text-xs font-medium text-black">
              Bestseller
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-muted">
            {product.type === "digital" ? "Digitales E-Book" : "Produkt"}
          </span>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-medium text-lime">
            {formatPrice(product.priceCents)}
          </p>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          {product.pages && (
            <p className="mt-4 text-xs text-muted">{product.pages} Seiten · PDF-Download</p>
          )}

          <div className="mt-8">
            <AddToCart product={product} />
          </div>

          <p className="mt-4 text-xs text-muted">
            Nach erfolgreichem Kauf erhältst du den Download-Link sofort auf
            der Bestätigungsseite und per E-Mail.
          </p>
        </div>
      </div>
    </div>
  );
}
