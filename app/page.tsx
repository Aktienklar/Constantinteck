import Link from "next/link";
import Image from "next/image";
import { getBestsellers } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const bestsellers = getBestsellers();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://picsum.photos/seed/heronwood/1920/1080"
            alt=""
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-28 sm:px-6 sm:py-36">
          <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wide text-muted">
            Home Cooking · Simple Food
          </span>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Einfache Rezepte,{" "}
            <span className="text-berry-light">die wirklich gelingen.</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-muted sm:text-lg">
            Ich teile unkomplizierte Rezepte für jeden Tag — von Sorbet bis
            Meal Prep. In meinen E-Books bekommst du alles gebündelt: zum
            Nachkochen, Speichern und Genießen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-berry px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-berry-light"
            >
              Jetzt shoppen
            </Link>
            <a
              href="https://instagram.com/constantinteck"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-lime hover:text-lime"
            >
              Auf Instagram folgen
            </a>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          <div className="text-center">
            <p className="text-2xl font-semibold text-lime">120K+</p>
            <p className="mt-1 text-sm text-muted">Follower auf Instagram &amp; TikTok</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-orange">5.000+</p>
            <p className="mt-1 text-sm text-muted">verkaufte E-Books</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-berry-light">4.9 / 5</p>
            <p className="mt-1 text-sm text-muted">durchschnittliche Bewertung</p>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Bestseller</h2>
          <Link
            href="/shop"
            className="text-sm text-muted transition-colors hover:text-berry-light"
          >
            Alle Produkte →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-3">
          {bestsellers.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
