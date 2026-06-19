import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductBySlug } from "@/data/products";

interface CheckoutRequestItem {
  slug: string;
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { items } = (await req.json()) as { items: CheckoutRequestItem[] };

    if (!items?.length) {
      return NextResponse.json({ error: "Warenkorb ist leer." }, { status: 400 });
    }

    const line_items: Array<{
      price_data: {
        currency: string;
        unit_amount: number;
        product_data: { name: string; description?: string; images?: string[] };
      };
      quantity: number;
    }> = [];

    const metadataSlugs: string[] = [];

    for (const item of items) {
      const product = getProductBySlug(item.slug);
      if (!product) {
        return NextResponse.json(
          { error: `Produkt "${item.slug}" nicht gefunden.` },
          { status: 400 }
        );
      }
      const quantity = Math.max(1, Math.min(item.quantity ?? 1, 10));

      line_items.push({
        price_data: {
          currency: product.currency,
          unit_amount: product.priceCents,
          product_data: {
            name: product.name,
            description: product.shortDescription,
            images: [product.images[0]],
          },
        },
        quantity,
      });

      for (let i = 0; i < quantity; i++) metadataSlugs.push(product.slug);
    }

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        slugs: metadataSlugs.join(","),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error", err);
    return NextResponse.json(
      { error: "Checkout konnte nicht erstellt werden." },
      { status: 500 }
    );
  }
}
