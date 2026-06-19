import { Resend } from "resend";
import { Product } from "@/lib/types";
import { createDownloadToken } from "@/lib/download";
import { formatPrice } from "@/lib/format";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function sendPurchaseEmail(
  to: string,
  products: Product[],
  siteUrl: string
) {
  const items = products.map((product) => {
    const token = createDownloadToken(product.slug);
    return { product, downloadUrl: `${siteUrl}/api/download/${token}` };
  });

  const itemsHtml = items
    .map(
      ({ product, downloadUrl }) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #2a2a2a;">
          <p style="margin:0;font-weight:600;color:#f5f3ef;">${product.name}</p>
          <p style="margin:4px 0 0;font-size:13px;color:#a3a09a;">${formatPrice(product.priceCents)}</p>
          <a href="${downloadUrl}" style="display:inline-block;margin-top:8px;padding:10px 20px;background:#c0316d;color:#fff;border-radius:999px;font-size:13px;text-decoration:none;">PDF herunterladen</a>
        </td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="background:#0a0a0a;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:480px;margin:0 auto;background:#141414;border-radius:16px;padding:32px;">
        <h1 style="color:#f5f3ef;font-size:20px;margin:0 0 8px;">Danke für deinen Kauf! 🎉</h1>
        <p style="color:#a3a09a;font-size:14px;margin:0 0 24px;">
          Hier sind deine Download-Links. Die Links sind 7 Tage gültig.
        </p>
        <table style="width:100%;border-collapse:collapse;">${itemsHtml}</table>
        <p style="color:#a3a09a;font-size:12px;margin-top:24px;">
          Fragen? Antworte einfach auf diese E-Mail.<br/>— constantinteck
        </p>
      </div>
    </div>`;

  await resend.emails.send({
    from: "constantinteck <bestellung@constantinteck.com>",
    to,
    subject: "Dein Download ist bereit 🍋",
    html,
  });
}
