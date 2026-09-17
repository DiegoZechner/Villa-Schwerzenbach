import { SectionHeading } from '@/components/ui/SectionHeading';

export default function ImpressumPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <SectionHeading title="Impressum" />
        
        <div className="prose prose-lg prose-p:text-espresso/80 max-w-none bg-white p-8 md:p-12 rounded-lg border border-cream">
          <h2>Betreiber der Webseite</h2>
          <p>
            <strong>Villa Schwerzenbach by MIVA</strong><br />
            Römerstrasse 23<br />
            8603 Schwerzenbach<br />
            Schweiz
          </p>
          
          <h2>Kontakt</h2>
          <p>
            Telefon: +41 44 825 XX XX<br />
            E-Mail: info@villa-schwerzenbach.ch<br />
            Webseite: www.villa-schwerzenbach.ch
          </p>

          <h2>Handelsregistereintrag</h2>
          <p>
            Eingetragener Firmenname: [Platzhalter GmbH]<br />
            Nummer: CH-[Platzhalter]<br />
            Handelsregisteramt: Kanton Zürich
          </p>

          <h2>Mehrwertsteuernummer</h2>
          <p>
            CHE-[Platzhalter] MWST
          </p>

          <h2>Haftungsausschluss</h2>
          <p>
            Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.
          </p>
        </div>
      </div>
    </div>
  );
}
