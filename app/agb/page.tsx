import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "AGB — constantinteck" };

export default function AgbPage() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen">
      <p>
        <strong>Platzhalter-Inhalt.</strong> Bitte vor dem Live-Gang durch
        rechtsgeprüfte AGB ersetzen (z. B. via IT-Recht Kanzlei o. Ä.).
      </p>
      <h2>1. Geltungsbereich</h2>
      <p>
        Diese AGB gelten für alle Bestellungen digitaler und physischer
        Produkte über den Online-Shop von constantinteck.
      </p>
      <h2>2. Vertragsschluss</h2>
      <p>
        Mit Abschluss des Bestellvorgangs über Stripe Checkout kommt ein
        Kaufvertrag zwischen dir und constantinteck zustande.
      </p>
      <h2>3. Digitale Produkte</h2>
      <p>
        E-Books werden nach Zahlungseingang als Download-Link
        bereitgestellt. Mit Beginn des Downloads stimmst du der
        Bereitstellung digitaler Inhalte zu, wodurch dein Widerrufsrecht
        gemäß § 356 Abs. 5 BGB vorzeitig erlischt.
      </p>
      <h2>4. Preise und Zahlung</h2>
      <p>
        Alle Preise verstehen sich in Euro inklusive der gesetzlichen
        Umsatzsteuer, soweit anwendbar. Die Zahlung erfolgt über Stripe.
      </p>
      <h2>5. Widerrufsrecht</h2>
      <p>
        Für physische Produkte gilt das gesetzliche 14-tägige
        Widerrufsrecht. Details werden bei Einführung physischer Produkte
        ergänzt.
      </p>
    </LegalPage>
  );
}
