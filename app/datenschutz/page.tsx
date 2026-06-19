import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Datenschutz — constantinteck" };

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <p>
        <strong>Platzhalter-Inhalt.</strong> Lass diese Seite vor dem
        Live-Gang von einem Datenschutz-Generator oder einer Rechtsberatung
        prüfen.
      </p>
      <h2>1. Verantwortlicher</h2>
      <p>
        Constantin [Nachname], [Anschrift], kontakt@constantinteck.com
      </p>
      <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
      <p>
        Beim Besuch dieser Website und beim Kauf von Produkten werden
        personenbezogene Daten (z. B. E-Mail-Adresse, Zahlungsdaten)
        verarbeitet. Die Zahlungsabwicklung erfolgt über unseren
        Zahlungsdienstleister Stripe Payments Europe, Ltd.
      </p>
      <h2>3. Cookies und Hosting</h2>
      <p>
        Diese Website wird über Vercel gehostet. Es können technisch
        notwendige Cookies zum Betrieb des Warenkorbs gesetzt werden.
      </p>
      <h2>4. Deine Rechte</h2>
      <p>
        Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung
        und Einschränkung der Verarbeitung deiner personenbezogenen Daten.
        Wende dich dazu an kontakt@constantinteck.com.
      </p>
    </LegalPage>
  );
}
