import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { getProductBySlug } from "@/data/products";
import { createDownloadToken } from "@/lib/download";
import { formatPrice } from "@/lib/format";
import ClearCartOnMount from "@/components/ClearCartOnMount";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Keine Bestellung gefunden
        </h1>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-berry px-6 py-3 text-sm font-medium text-white hover:bg-berry-light"
        >
          Zum Shop
        </Link>
      </div>
    );
  }

  let slugs: string[] = [];
  let customerEmail: string | null = null;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    slugs = Array.from(
      new Set(session.metadata?.slugs?.split(",").filter(Boolean) ?? [])
    );
    customerEmail = session.customer_details?.email ?? null;
  } catch (err) {
    console.error("Failed to retrieve checkout session", err);
  }

  const products = slugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <ClearCartOnMount />
      <span className="text-sm font-medium text-lime">Zahlung erfolgreich</span>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Danke für deinen Kauf! 🎉
      </h1>
      <p className="mt-3 text-sm text-muted">
        {customerEmail
          ? `Wir haben dir die Download-Links außerdem an ${customerEmail} geschickt.`
          : "Deine Download-Links findest du unten."}
      </p>

      <div className="mt-10 divide-y divide-border rounded-2xl border border-border">
        {products.map((product) => {
          const token = createDownloadToken(product.slug);
          return (
            <div
              key={product.slug}
              className="flex items-center justify-between gap-4 p-5"
            >
              <div>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="mt-1 text-xs text-muted">
                  {formatPrice(product.priceCents)}
                </p>
              </div>
              <a
                href={`/api/download/${token}`}
                className="whitespace-nowrap rounded-full bg-berry px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-berry-light"
              >
                Download
              </a>
            </div>
          );
        })}
      </div>

      <Link
        href="/shop"
        className="mt-10 inline-block text-sm text-muted transition-colors hover:text-berry-light"
      >
        ← Weiter shoppen
      </Link>
    </div>
  );
}
