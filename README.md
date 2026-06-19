# constantinteck — Shop

E-Commerce-Seite für die Marke **constantinteck** (Home Cooking / Simple
Food). Verkauft digitale E-Books (Rezepte) per Stripe Checkout, baut so,
dass physische Produkte später ergänzt werden können.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Stripe Checkout (Redirect-Flow, keine eigene Zahlungsmaske)
- Zustand (Cart-State, in localStorage persistiert)
- Resend (Versand der Download-Links per E-Mail)

## Setup

```bash
npm install
cp .env.example .env.local
```

Trage in `.env.local` ein:

- `STRIPE_SECRET_KEY` — Stripe Test-Secret-Key
- `STRIPE_WEBHOOK_SECRET` — Signing-Secret für den Webhook (siehe unten)
- `RESEND_API_KEY` — für den E-Mail-Versand der Download-Links
- `DOWNLOAD_TOKEN_SECRET` — beliebiger langer Zufallsstring (`openssl rand -hex 32`)
- `NEXT_PUBLIC_SITE_URL` — z. B. `http://localhost:3000`

```bash
npm run dev
```

### Stripe-Webhook lokal testen

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Den dabei ausgegebenen `whsec_...`-Wert in `STRIPE_WEBHOOK_SECRET` eintragen.

## Produkte verwalten

Produkte liegen in [`data/products.ts`](data/products.ts) als einfaches
Array (`Product[]`, Typen in [`lib/types.ts`](lib/types.ts)). Neues Produkt
hinzufügen:

1. Eintrag in `data/products.ts` ergänzen (Slug, Preis, Bilder, Kategorie).
2. Für digitale Produkte: PDF unter `private/products/<fileKey>.pdf`
   ablegen (dieser Ordner ist **nicht** öffentlich erreichbar — Downloads
   laufen ausschließlich über signierte, zeitlich begrenzte Tokens via
   `/api/download/[token]`).
3. Für physische Produkte: `type: "physical"` setzen — Versandkosten/-logik
   kann später in der Checkout-Route ergänzt werden (aktuell ist nur
   digitaler Checkout ohne Versand implementiert).

Platzhalter-PDFs lassen sich erneut erzeugen mit:

```bash
node scripts/generate-placeholder-pdfs.mjs
```

## Bezahlvorgang

1. Produktdetailseite oder Warenkorb → Checkout-API erstellt eine Stripe
   Checkout Session mit `price_data` direkt aus den lokalen Produktdaten
   (keine vorab in Stripe angelegten Price-IDs nötig).
2. Nach Zahlung: Redirect zu `/success?session_id=...`. Diese Seite liest
   die Session direkt von Stripe aus und zeigt sofort Download-Links für
   digitale Produkte.
3. Parallel verarbeitet `/api/webhook` das `checkout.session.completed`
   Event und verschickt die Download-Links zusätzlich per E-Mail (Resend) —
   als Backup, falls der Kunde den Tab schließt.

## Deploy (Vercel)

1. Repo zu Vercel verbinden, Env-Variablen aus `.env.example` im
   Projekt-Dashboard eintragen.
2. Stripe-Webhook im Dashboard auf `https://<domain>/api/webhook` für das
   Event `checkout.session.completed` registrieren, Signing-Secret in
   `STRIPE_WEBHOOK_SECRET` übernehmen.
3. `NEXT_PUBLIC_SITE_URL` auf die finale Domain setzen.

## Rechtliches

`/impressum`, `/datenschutz` und `/agb` enthalten nur Platzhaltertexte —
vor dem Live-Gang durch rechtsgeprüfte Inhalte ersetzen.
