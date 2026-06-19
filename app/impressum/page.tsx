import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Impressum — constantinteck" };

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <p>
        <strong>Platzhalter-Inhalt.</strong> Bitte ersetze diese Angaben vor
        dem Live-Gang durch deine echten Daten gemäß § 5 TMG.
      </p>
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        Constantin [Nachname]
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ Ort]
        <br />
        Deutschland
      </p>
      <h2>Kontakt</h2>
      <p>
        E-Mail: kontakt@constantinteck.com
      </p>
      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:
        [USt-IdNr. einfügen]
      </p>
      <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
      <p>
        Constantin [Nachname], [Anschrift wie oben]
      </p>
    </LegalPage>
  );
}
