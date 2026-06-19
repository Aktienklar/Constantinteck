import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { getProductBySlug } from "@/data/products";
import { sendPurchaseEmail } from "@/lib/email/send-purchase-email";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;
  try {
    if (!signature) throw new Error("Missing stripe-signature header");
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;
    const slugs = session.metadata?.slugs?.split(",").filter(Boolean) ?? [];

    if (email && slugs.length > 0) {
      const uniqueSlugs = Array.from(new Set(slugs));
      const products = uniqueSlugs
        .map((slug) => getProductBySlug(slug))
        .filter((p): p is NonNullable<typeof p> => Boolean(p) && p?.type === "digital");

      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;

      if (products.length > 0) {
        try {
          await sendPurchaseEmail(email, products, siteUrl);
        } catch (err) {
          console.error("Failed to send purchase email", err);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
