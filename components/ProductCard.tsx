import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-surface">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.bestseller && (
          <span className="absolute left-3 top-3 rounded-full bg-orange px-3 py-1 text-xs font-medium text-black">
            Bestseller
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium text-foreground">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted">{product.shortDescription}</p>
        </div>
        <span className="whitespace-nowrap text-sm font-medium text-lime">
          {formatPrice(product.priceCents)}
        </span>
      </div>
    </Link>
  );
}
