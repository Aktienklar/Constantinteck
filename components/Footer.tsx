import Link from "next/link";

const social = [
  { label: "Instagram", href: "https://instagram.com/constantinteck" },
  { label: "TikTok", href: "https://tiktok.com/@constantinteck" },
  { label: "YouTube", href: "https://youtube.com/@constantinteck" },
];

const legal = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              constantin<span className="text-berry-light">teck</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Home Cooking | Simple Food. Einfache Rezepte für den Alltag —
              zum Nachkochen, Genießen und Teilen.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <p className="text-sm font-medium text-foreground">Social</p>
              <ul className="mt-3 space-y-2">
                {social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted transition-colors hover:text-lime"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground">Rechtliches</p>
              <ul className="mt-3 space-y-2">
                {legal.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-lime"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-12 text-xs text-muted">
          © {new Date().getFullYear()} constantinteck. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
