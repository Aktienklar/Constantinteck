import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { verifyDownloadToken } from "@/lib/download";
import { getProductBySlug } from "@/data/products";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const payload = verifyDownloadToken(token);

  if (!payload) {
    return NextResponse.json(
      { error: "Download-Link ist ungültig oder abgelaufen." },
      { status: 403 }
    );
  }

  const product = getProductBySlug(payload.slug);
  if (!product?.fileKey) {
    return NextResponse.json({ error: "Datei nicht gefunden." }, { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), "private", "products", product.fileKey);
    const file = await readFile(filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${product.fileKey}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Datei nicht gefunden." }, { status: 404 });
  }
}
