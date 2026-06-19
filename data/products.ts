import { Product } from "@/lib/types";

/**
 * Local product catalog. Swap for a CMS/DB later without touching page code —
 * every page reads through getProducts()/getProductBySlug() below.
 */
export const products: Product[] = [
  {
    slug: "sorbet-rezepte",
    name: "Sorbet Rezepte E-Book",
    shortDescription: "12 cremige Sorbet-Rezepte für jede Saison",
    description:
      "Mein liebstes Sommer-E-Book: 12 erprobte Sorbet-Rezepte mit nur wenigen Zutaten, ganz ohne Eismaschine. Von klassisch Himbeere bis Mango-Passionsfrucht — Schritt-für-Schritt-Fotos, Mengenangaben in Gramm und Tipps für die perfekte Konsistenz.",
    category: "ebook",
    type: "digital",
    priceCents: 990,
    currency: "eur",
    images: [
      "https://picsum.photos/seed/sorbet1/1200/1200",
      "https://picsum.photos/seed/sorbet2/1200/1200",
    ],
    bestseller: true,
    fileKey: "sorbet-rezepte.pdf",
    pages: 28,
  },
  {
    slug: "simple-pasta-basics",
    name: "Simple Pasta Basics",
    shortDescription: "10 Pasta-Gerichte, die jeder hinbekommt",
    description:
      "Pasta ohne Stress: 10 unkomplizierte Gerichte, die in unter 30 Minuten auf dem Tisch stehen. Perfekt für alle, die einfach und lecker kochen wollen — inklusive meiner Lieblings-Sauce-Basics, die man immer im Kopf behält.",
    category: "ebook",
    type: "digital",
    priceCents: 790,
    currency: "eur",
    images: [
      "https://picsum.photos/seed/pasta1/1200/1200",
      "https://picsum.photos/seed/pasta2/1200/1200",
    ],
    bestseller: true,
    fileKey: "simple-pasta-basics.pdf",
    pages: 22,
  },
  {
    slug: "meal-prep-starter",
    name: "Meal Prep Starter Guide",
    shortDescription: "5 Wochenpläne für entspannte Wochen",
    description:
      "Der schnellste Weg aus dem 'Was koche ich heute?'-Chaos: 5 fertige Wochenpläne mit Einkaufslisten, Vorbereitungstipps und Aufbewahrungs-Hacks. Ideal für alle, die Home Cooking lieben, aber wenig Zeit haben.",
    category: "ebook",
    type: "digital",
    priceCents: 1290,
    currency: "eur",
    images: [
      "https://picsum.photos/seed/mealprep1/1200/1200",
      "https://picsum.photos/seed/mealprep2/1200/1200",
    ],
    bestseller: true,
    fileKey: "meal-prep-starter.pdf",
    pages: 34,
  },
  {
    slug: "fruehstuecks-bowls",
    name: "Frühstücks-Bowls",
    shortDescription: "8 bunte Bowls für den perfekten Start",
    description:
      "Acht bunte, sättigende Frühstücks-Bowls — von Beeren-Joghurt bis herzhaft mit Avocado. Jedes Rezept in 10 Minuten fertig, mit Variationen für unterwegs.",
    category: "ebook",
    type: "digital",
    priceCents: 690,
    currency: "eur",
    images: [
      "https://picsum.photos/seed/bowls1/1200/1200",
      "https://picsum.photos/seed/bowls2/1200/1200",
    ],
    fileKey: "fruehstuecks-bowls.pdf",
    pages: 18,
  },
  {
    slug: "grill-saison",
    name: "Grill-Saison E-Book",
    shortDescription: "Marinaden, Sides & Dips für den Sommer",
    description:
      "Alles für die Grill-Saison: 6 Marinaden, 5 Sides und 4 Dips, die garantiert ankommen. Inklusive veggie Optionen und Tipps für die richtige Grilltemperatur.",
    category: "ebook",
    type: "digital",
    priceCents: 890,
    currency: "eur",
    images: [
      "https://picsum.photos/seed/grill1/1200/1200",
      "https://picsum.photos/seed/grill2/1200/1200",
    ],
    fileKey: "grill-saison.pdf",
    pages: 24,
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.bestseller);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategories(): ProductCategoryOption[] {
  const cats = Array.from(new Set(products.map((p) => p.category)));
  return cats.map((value) => ({
    value,
    label: categoryLabels[value] ?? value,
  }));
}

export interface ProductCategoryOption {
  value: Product["category"];
  label: string;
}

export const categoryLabels: Record<Product["category"], string> = {
  ebook: "E-Books",
  merch: "Merch",
  kitchenware: "Küchenhelfer",
};
