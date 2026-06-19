export type ProductCategory = "ebook" | "merch" | "kitchenware";

export type ProductType = "digital" | "physical";

export interface Product {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  category: ProductCategory;
  type: ProductType;
  priceCents: number;
  currency: "eur";
  images: string[];
  bestseller?: boolean;
  /** Stripe Price ID — set once products are created in the Stripe Dashboard */
  stripePriceId?: string;
  /** Filename of the PDF stored in a private bucket / lib/files, used by the download route */
  fileKey?: string;
  pages?: number;
}

export interface CartItem {
  slug: string;
  quantity: number;
}
