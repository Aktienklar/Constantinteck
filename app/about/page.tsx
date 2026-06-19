import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über mich — constantinteck",
  description: "Hinter constantinteck: Home Cooking, Simple Food, einfache Rezepte für jeden Tag.",
};

const social = [
  { label: "Instagram", href: "https://instagram.com/constantinteck" },
  { label: "TikTok", href: "https://tiktok.com/@constantinteck" },
  { label: "YouTube", href: "https://youtube.com/@constantinteck" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[280px_1fr] sm:items-start">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
          <Image
            src="https://picsum.photos/seed/constantinteck-portrait/800/800"
            alt="constantinteck"
            fill
            sizes="280px"
            className="object-cover"
          />
        </div>

        <div>
          <span className="text-xs uppercase tracking-wide text-muted">
            Über mich
          </span>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Hi, ich bin Constantin 👋
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            Ich teile auf Instagram und TikTok einfache Rezepte für den
            Alltag — ohne komplizierte Zutaten, ohne stundenlanges Stehen am
            Herd. Home Cooking, Simple Food: das ist mein Versprechen an
            euch. Aus meiner Liebe zum unkomplizierten Kochen sind meine
            E-Books entstanden, in denen ich meine liebsten Rezepte
            gebündelt und Schritt für Schritt erklärt habe.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Wenn du Lust hast, noch mehr Rezepte, Behind-the-Scenes und
            Kochvideos zu sehen, folg mir gerne auf meinen Kanälen.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-lime hover:text-lime"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
